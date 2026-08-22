$ExportPath = ".\ibIdFix_Report.csv"
# Regex basique (inspiré de IdFix)
$InvalidChars = '[^a-zA-Z0-9.\-@+:]'

function Test-InvalidCharacters {
    param($Value)
    if ($null -eq $Value) { return $false }
    return ($Value -match $InvalidChars)}

function Clean-Value {
    param($Value)
    if ($null -eq $Value) { return $null }
    return ($Value -replace $InvalidChars, "")}

function Get-DuplicateValues {
    param($Users, $Attribute)
    $filtered = $Users | Where-Object {
        $value = $_.$Attribute
        $null -ne $value -and
        $value -ne "" -and
        $value -ne " "}
    $duplicates = $filtered | Group-Object -Property $Attribute | Where-Object { $_.Count -gt 1 }
    return $duplicates}

function Is-TechnicalMailbox {
    param($User)
    return ($User.proxyAddresses -like "SMTP:SystemMailbox*" -or $User.mail -like "SystemMailbox*" -or $user.proxyAddresses -like "SMTP:DiscoverySearchMailbox*")}

function Test-UPNSuffix {
    param($UPN)
    if (-not $UPN -or $UPN -notmatch "@") {return $false}
    $suffix = $UPN.Split("@")[1].ToLower()
    return $script:ValidUPNSuffixes -contains $suffix}

function Test-MultipleAtSymbol {
    param($Value)
    if ($null -eq $Value) { return $false }
    $count = ($Value.ToCharArray() | Where-Object { $_ -eq '@' }).Count
    return ($count -gt 1)}


# Collecte des utilisateurs
Write-Host "Collecte des objets AD..."
$Users = Get-ADUser -Filter 'enabled -eq $true' -Properties UserPrincipalName, ProxyAddresses, mail, emailAddress
$Report = @()
# Collecte des informations de suffixes UPN
write-host "Collecte des informations de suffixes UPN..."
$ValidUPNSuffixes = (get-ADForest).UPNSuffixes
$ValidUPNSuffixes += (get-ADForest).RootDomain
$ValidUPNSuffixes = $ValidUPNSuffixes | Sort-Object -Unique

# Analyse des attributs
foreach ($user in $Users) { 
    if (Is-TechnicalMailbox $user) { continue } #Compte de boite Exchange


    if (Test-MultipleAtSymbol $user.UserPrincipalName) { #--UPN avec plusieurs @--
        $Report += [pscustomobject]@{
            Issue          = "MultipleAtSymbol"
            SamAccountName = $user.SamAccountName
            Attribute      = "UserPrincipalName"
            Value          = $user.UserPrincipalName}
        continue}

    if (Test-InvalidCharacters $user.UserPrincipalName) { # --UPN--
        $Report += [pscustomobject]@{
            Issue          = "InvalidCharacters"
            SamAccountName = $user.SamAccountName
            Attribute      = "UserPrincipalName"
            Value          = $user.UserPrincipalName}
        continue}

    if (-not (Test-UPNSuffix $user.UserPrincipalName)) { # --UPN Suffix--
    $currentSuffix = $user.UserPrincipalName.Split("@")[1]
    $Report += [pscustomobject]@{
        Issue          = "InvalidUPNSuffix"
        SamAccountName = $user.SamAccountName
        Attribute      = "UserPrincipalName"
        Value          = $user.UserPrincipalName}}

    if (Test-InvalidCharacters $user.mail) { # --MAIL--
        $Report += [pscustomobject]@{
            Issue          = "InvalidCharacters"
            SamAccountName = $user.SamAccountName
            Attribute      = "mail"
            Value          = $user.mail}}

    foreach ($proxy in $user.ProxyAddresses) { # --PROXY ADDRESSES--
        if (Test-InvalidCharacters $proxy) {
            $Report += [pscustomobject]@{
                Issue          = "InvalidCharacters"
                SamAccountName = $user.SamAccountName
                Attribute      = "proxyAddresses"
                Value          = $proxy}}}}

# Recherche de doublons
Write-Host "Analyse des doublons UPN..."
$dupUPN = Get-DuplicateValues $Users "UserPrincipalName"
foreach ($group in $dupUPN) {
    foreach ($user in $group.Group) {
        $Report += [pscustomobject]@{
            Issue          = "Duplicate"
            SamAccountName = $user.SamAccountName
            Attribute      = "UserPrincipalName"
            Value          = $user.UserPrincipalName}}}
Write-Host "Analyse des doublons email..."
$dupEmail = Get-DuplicateValues $Users "emailAddress"
foreach ($group in $dupEmail) {
    foreach ($user in $group.Group) {
        $Report += [pscustomobject]@{
            Issue          = "Duplicate"
            SamAccountName = $user.SamAccountName
            Attribute      = "emailAddress"
            Value          = $user.emailAddress}}}        

# Export du rapport
$Report | Export-Csv -Path $ExportPath -NoTypeInformation -Encoding UTF8
Write-Host "Rapport généré : $ExportPath"
$Report | out-gridview
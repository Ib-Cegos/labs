#Ce script fait l'équivalent du contenu de l'exercice 4 de l'atelier 2 pour ceux que les commandes powershell n'intéressent pas.
#Il permet d'avoir le nécessaire de réalisé pour les ateliers 

Connect-MgGraph -scopes User.ReadWrite.All,Group.ReadWrite.All,Domain.ReadWrite.All,Organization.Read.All,UserAuthenticationMethod.ReadWrite.All -noWelcome
$wwlDomain = (get-MgDomain | where id -like "*.onmicrosoft.com").id
$labDomain = (get-MgDomain | where id -like "lab*.godeploylabs.com").id
$user1 = New-MGuser –UserPrincipalName "catherine@$wwlDomain" –DisplayName "Catherine Richard" -GivenName Catherine -SurName Richard -PasswordProfile @{password='Pa55w.rd';ForceChangePasswordNextSignIn=$false} -UsageLocation CH -AccountEnabled -MailNickname catherine
$user2 = New-MGuser –UserPrincipalName "tameka@$wwlDomain" –DisplayName "Tameka Reed" -GivenName Tameka -SurName Reed -PasswordProfile @{password='Pa55w.rd';ForceChangePasswordNextSignIn=$false} -UsageLocation CH -AccountEnabled -MailNickname tameka
$license = Get-MgSubscribedSku|where SkuPartNumber -like "*_365_E5*"
$user1.Id,$user2.Id | foreach-object {Set-MgUserLicense -userId $_ -AddLicenses @{SkuId=$license.SkuId} -RemoveLicenses @()}
Invoke-WebRequest "https://raw.githubusercontent.com/renaudwangler/ib-labs/master/resources/users.csv" | Select-Object -ExpandProperty Content | Out-File ".\users.csv"
(Get-Content .\users.csv).Replace('labxxxxx.godeploylabs.com', $labDomain) | Set-Content .\users.csv
Import-Csv -Path .\users.csv | ForEach-Object {New-MGuser –UserPrincipalName $_.UPN –DisplayName $_.DisplayName -GivenName $_.LastName -SurName $_.FirstName -PasswordProfile @{password='Pa55w.rd';ForceChangePasswordNextSignIn=$false} -UsageLocation $_.UsageLocation -AccountEnabled -MailNickname $_.FirstName -jobTitle $_.Title -Department $_.department -StreetAddress $_.StreetAddress -City $_.city -PostalCode $_.PostalCode -Country $_.Country}
$mktGroup = New-MgGroup -DisplayName Marketing -Description 'Marketing department users' -groupTypes unified -MailEnabled -securityEnabled -mailNickName marketing
$user1.Id,$user2.id | foreach-object { New-MgGroupMember -groupId $mktGroup.Id -DirectoryObjectId $_ }
Get-MgDomain | ForEach-Object { update-MgDomain -DomainId $_.Id -PasswordNotificationWindowInDays 10 -PasswordValidityPeriodInDays 90 }
Reset-MgUserAuthenticationMethodPassword -UserId $user2.id -NewPassword 'P@$$w0rd' -AuthenticationMethodId (Get-MgUserAuthenticationPasswordMethod -userId $user2.Id).id
Get-MGuser -All | ForEach-Object { Update-MgUser -UserId $_.Id -PasswordPolicies None}
write-host -ForegroundColor Yellow 'L''équivalent de l''exercice 4 a été réalisé : vous pouvez passer à l''exercice 5.'
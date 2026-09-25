# Mise à jour de 'Klemen'
$upn = Get-ADUser Klemen | Select UserPrincipalName
If ($upn.UserPrincipalName -notlike '*@@*'){
	$arrupn = $upn.UserPrincipalName -split '@'
	$newUPN = $arrUPN[0] + '@@' + $arrUPN[1]
	Set-ADUser Klemen -UserPrincipalName $newUPN
	Write-Host 'Traintement de Klemen.'}

# mise à jour de l'attribut emailAddress de 'Lara'
$emailLara = Get-ADUser Lara -Properties emailAddress | Select emailAddress
If ($emailLara.emailAddress -notlike 'Lara@adatum.com'){
	Set-ADUser Lara -emailAddress Lara@adatum.com
	Write-Host 'Traitement de Lara.'}

# mise à jour de l'attribut emailAddress de 'Logan'
$emailLogan = Get-ADUser Logan -Properties emailAddress | Select emailAddress
If ($emailLogan.emailAddress -notlike 'Lara@adatum.com'){
	Set-ADUser Logan -emailAddress Lara@adatum.com
	Write-Host 'Traitement de Logan.'}
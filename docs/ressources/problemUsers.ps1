# Mise à jour de 'Klemen'
$upn = Get-ADUser Klemen | Select UserPrincipalName
If ($upn.UserPrincipalName -notlike '*@@*'){
	$arrupn = $upn.UserPrincipalName -split '@'
	$newUPN = $arrUPN[0] + '@@' + $arrUPN[1]
	Set-ADUser Klemen -UserPrincipalName $newUPN
	Write-Host 'Klemen modifié.'}
Else { Write-Host 'Klemen était déjà à jour.'}

# mise à jour de l'attribut emailAddress de 'Lara'
$emailLara = Get-ADUser Lara -Properties emailAddress | Select emailAddress
If ($emailLara.emailAddress -notlike 'Lara@adatum.com'){
	Set-ADUser Lara -emailAddress Lara@adatum.com
	Write-Host 'Lara mise à jour.'}
Else { Write-Host 'Lara était déjà à jour.' }

# mise à jour de l'attribut emailAddress de 'Logan'
$emailLogan = Get-ADUser Logan -Properties emailAddress | Select emailAddress
If ($emailLogan.emailAddress -notlike 'Lara@adatum.com'){
	Set-ADUser Logan -emailAddress Lara@adatum.com
	Write-Host 'Logan modifié.'}
Else { Write-Host 'Logan était déjà à jour.' }
var onmicrosoftDomain,godeployDomain
//Récupération des nomms de domaine, si stockés dans la base du navigateur
if (localStorage.getItem('ms365-onmicrosoftDomain')) { onmicrosoftDomain = localStorage.getItem('ms365-onmicrosoftDomain') }
else { onmicrosoftDomain = 'M365xxxxxx' }
if (localStorage.getItem('ms365-godeployDomain')) { godeployDomain = localStorage.getItem('ms365-godeployDomain') }
else { godeployDomain = 'labxxxxxx' }
if (localStorage.getItem('ms365-MODPassword')) { MODPassword = localStorage.getItem('ms365-MODPassword') }
else { MODPassword = 'MOD Admin Password' }
//CRéation du div de saisie des données
if (typeof domainInput === 'undefined') {
    domainInput = document.createElement('div')
    domainInput.id = "domainInput"
    domainInput.style.cssText = 'width:50%; background:white; border:solid 2px blue; position:fixed; top:5%; left:25%; display:none;'
    domainInput.innerHTML = '<div style="width:100%; height:25px; background: blue;color: white; font-weight:bold">&nbsp;Données de l\'atelier <div style="width:21px; height:21px; line-height:21px; position:absolute; top:2px; right:2px; background:red; display:block; text-align:center; cursor: pointer;" onclick = "document.getElementById(\'domainInput\').style.display=\'none\'">X</div></div><div style="padding: 5px;">Ici, vous pouvez saisir les informations de votre instance d\'atelier afin de vous en faciliter la réalisation.<br/><ul><li>Domaine original Microsoft 365 :<br/>(correspond à la première partie du suffixe (nom de domaine) de l\'administrateur "Office 365 Tenant Credentials" trouvable dans l\'onglet "Home" du volet de gauche de votre environnement goDeploy)<br/><input type="text" id="onmicrosoftDomainNew" value="' + onmicrosoftDomain + '">.onmicrosoft.com</li><br/><li>Mot de passe de MOD Administrator :<br/>(mot de passe trouvable dans la section "Office 365 Tenant Credentials" de l\'onglet "Home" du volet de gauche de votre environnement goDeploy)<br/><input type="text" id="MODPasswordNew" value="' + MODPassword + '"></li><br/><li>Domaine de l\'atelier goDeploy :<br/>(première partie du nom de domaine trouvable sous le nom "Lab Domain" dans l\'onglet "DNS" du volet de gauche de votre environnement goDeploy)<br/><input type="text" id="godeployDomainNew" value="' + godeployDomain + '">.godeploylabs.com <a href="#" onclick="newDomains(); return false"><img src="../resources/enterKey.png"></a><br/></li></ul></div>'}

function updateDomains() {
    document.body.innerHTML = document.body.innerHTML.replaceAll('[onmicrosoftDomain]',onmicrosoftDomain)
    document.body.innerHTML = document.body.innerHTML.replaceAll('[MODPassword]',MODPassword)
    document.body.innerHTML = document.body.innerHTML.replaceAll('[godeployDomain]',godeployDomain) }

function newDomains() {
    localStorage.setItem('ms365-onmicrosoftDomain',document.getElementById('onmicrosoftDomainNew').value.split(".")[0])
    localStorage.setItem('ms365-godeployDomain',document.getElementById('godeployDomainNew').value.split(".")[0])
    localStorage.setItem('ms365-MODPassword',document.getElementById('MODPasswordNew').value)
    document.getElementById('domainInput').style.display = 'none'
    document.body.innerHTML = document.body.innerHTML.replaceAll(onmicrosoftDomain,document.getElementById('onmicrosoftDomainNew').value)
    document.body.innerHTML = document.body.innerHTML.replaceAll(godeployDomain,document.getElementById('godeployDomainNew').value)
    document.body.innerHTML = document.body.innerHTML.replaceAll(MODPassword,document.getElementById('MODPasswordNew').value)
    onmicrosoftDomain = document.getElementById('onmicrosoftDomainNew').value
    MODPassword = focument.getElementById('MODPasswordNew').value
    godeployDomain = document.getElementById('godeployDomainNew').value}

document.addEventListener('DOMContentLoaded', function () { updateDomains(); document.body.appendChild(domainInput) })
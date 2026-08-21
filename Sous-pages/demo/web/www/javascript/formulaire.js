const nom = document.querySelector("#lastname");
const prenom = document.querySelector("#firstname");
const email = document.querySelector("#useremail");
const motDePasse = document.querySelector("#userpwd");
const nomUtilisateur = document.querySelector("#username");
const dateNaissance = document.querySelector("#birthdate");
const bouton = document.querySelector("button");



var aujourdhui = new Date().toJSON().slice(0,10).replace(/-/g,'/');
const dateValideMin = new Date(aujourdhui);
const validerNomPrenom = (inputNomPrenom)=> inputNomPrenom.value.match(/^(([A-Za-z][A-Za-z\- ]*[A-Za-z])|([a-zA-Z]+))$/); // Est valide si le début est suivi d'une suite de lettre, suivie elle-même par une suite de 0,1 ou plusieurs lettre ou un tiret ou une espace , suivie d'une lettre, OU d'une ou plusieurs lettres, suivie de la fin. Cela permet d'éviter les nom/prénoms finissant par un tiret ou une espace. Les doubles(ou plus) tirets ou espaces sont acceptés s'ils sont suivis d'une lettre.
const validerEmail = (inputEmail)=> inputEmail.value.match(/^[A-Za-z\d.%+-]+@[A-Za-z-]+(\.[A-Za-z\d]+)*\.[A-Za-z\d]{2,4}$/);// Est valide si le début est suivi d'un ou plusieurs caractères, suivi d'un @, suivi d'un ou plusieurs caractères, suivi d'un point, suivi de 2 à 4 lettres, suivi de la fin.
const validerMotDePasse = (inputMotDePasse)=> inputMotDePasse.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{12,}$/);
/**  Le mot de passe est valide si elle est suivie d'une chaîne valide de taille au moins 12 suivie de la fin. Une chaîne est valide si le début de l'expression est suivie :
 * - d'une séquence quelconque suivie d'une majuscule
 * - d'une séquence quelconque suivie d'une minuscule
 * - d'une séquence quelconque suivie d'un chiffre
 * - d'une séquence quelconque suivie d'un caractère qui n'est ni une lettre (majuscule ou minuscule) ni un chiffre
 */
const validerUsername = (inputUsername)=> inputUsername.value.match(/^[\w]{6,}$/);// Est valide si le début est sivi de 6 ou plus lettres(majuscule ou minuscules)


const validerAnneeNaissance = (inputDate)=> (dateValideMin.getFullYear()-inputDate.getFullYear()) > 18;
const validerMoisNaissance = (inputDate)=> (dateValideMin.getFullYear()-inputDate.getFullYear()) == 18 && dateValideMin.getMonth() > inputDate.getMonth();
const validerJourNaissance = (inputDate)=> (dateValideMin.getFullYear()-inputDate.getFullYear()) == 18 && dateValideMin.getMonth() == inputDate.getMonth() && dateValideMin.getDate() >= inputDate.getDate();
const validerDate = (inputDate)=> (validerAnneeNaissance(inputDate) || validerMoisNaissance(inputDate) || validerJourNaissance(inputDate))
const testValiditeFormulaire = ()=> validerNomPrenom(nom) && validerNomPrenom(prenom) && validerEmail(email) && validerMotDePasse(motDePasse) && validerUsername(nomUtilisateur);

bouton.disabled = true

nom.addEventListener("input", () => {
    if(!validerNomPrenom(nom)){
        nom.style.borderColor = "red";
        nom.setCustomValidity("Veuillez entrer un nom valide");
    }
    else{
        nom.style.borderColor = "yellowgreen";
        nom.setCustomValidity("");
    }
    if(testValiditeFormulaire()){
        bouton.disabled = false;
    }
    else{
        bouton.disabled = true;
    }
});

prenom.addEventListener("input", () => {
    if(!validerNomPrenom(prenom)){
        prenom.style.borderColor = "red";
        prenom.setCustomValidity(`Veuillez entrer un prénom valide`);
    }
    else{
        prenom.style.borderColor = "yellowgreen";
        prenom.setCustomValidity("");
    }
    if(testValiditeFormulaire()){
        bouton.disabled = false;
    }
    else{
        bouton.disabled = true;
    }
});

email.addEventListener("input", () => {
    if(!validerEmail(email)){
        email.style.borderColor = "red";
        email.setCustomValidity(`Veuillez entrer un adresse mail valide`);
    }
    else{
        email.style.borderColor = "yellowgreen";
        email.setCustomValidity("");
    }
    if(testValiditeFormulaire()){
        bouton.disabled = false;
    }
    else{
        bouton.disabled = true;
    }
});

motDePasse.addEventListener("input", () => {
    if(!validerMotDePasse(motDePasse)){
        motDePasse.style.borderColor = "red";
        if(motDePasse.value.length < 12){
            motDePasse.setCustomValidity(`Le mot de passe doit contenir au moins 12 caractères.`);
        }
        else{
            motDePasse.setCustomValidity(`Le mot de passe doit contenir au moins :\n- Une majuscule\n- Une minuscule\n- Un chiffre\n- Un caractère ascii quelconque`);
        }

    }
    else{
        motDePasse.style.borderColor = "yellowgreen";
        motDePasse.setCustomValidity(``);
    }
    if(testValiditeFormulaire()){
        bouton.disabled = false;
    }
    else{
        bouton.disabled = true;
    }
});

nomUtilisateur.addEventListener("input", () => {
    if(!validerUsername(nomUtilisateur)){
        nomUtilisateur.style.borderColor = "red";
        nomUtilisateur.setCustomValidity(`Pseudo trop court ou il contient d'autres caractères que des chiffres, lettres ou "_" `);
    }
    else{
        nomUtilisateur.style.borderColor = "yellowgreen";
        nomUtilisateur.setCustomValidity("");
    }
    if(testValiditeFormulaire()){
        bouton.disabled = false;
    }
    else{
        bouton.disabled = true;
    }
});

dateNaissance.addEventListener("input", () => {
    testDate = new Date(dateNaissance.value);
    if(!validerDate(testDate)){
        dateNaissance.style.borderColor = "red";
        dateNaissance.setCustomValidity(`Vous devez être majeur pour vous inscrire`);
    }
    else{
        dateNaissance.style.borderColor = "yellowgreen";
        dateNaissance.setCustomValidity("");
    }
    if(testValiditeFormulaire() && validerDate(testDate)){
        bouton.disabled = false;
    }
    else{
        bouton.disabled = true;
    }
});





const nom = document.querySelector("#lastname");
const prenom = document.querySelector("#firstname");
const email = document.querySelector("#useremail");
const motDePasse = document.querySelector("#userpwd");
const confirmMotDePasse = document.querySelector("#confirmpwd");
const nomUtilisateur = document.querySelector("#username");
const dateNaissance = document.querySelector("#birthdate");



var aujourdhui = new Date().toJSON().slice(0,10).replace(/-/g,'/');
const dateValideMin = new Date(aujourdhui);
const validerNomPrenom = (inputNomPrenom)=> inputNomPrenom.value.match(/^(([A-Za-z][A-Za-z\- ]*[A-Za-z])|([a-zA-Z]+))$/);
const validerEmail = (inputEmail)=> inputEmail.value.match(/^[A-Za-z\d.%+-]+@[A-Za-z-]+(\.[A-Za-z\d]+)*\.[A-Za-z\d]{2,4}$/);
const validerMotDePasse = (inputMotDePasse)=> inputMotDePasse.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{12,}$/);
const confirmerMotDePasse = (cMDP, MDP)=> cMDP.value==MDP.value;
const validerUsername = (inputUsername)=> inputUsername.value.match(/[\w]{6,}/);
const validerAnneeNaissance = (inputDate)=> (dateValideMin.getFullYear()-inputDate.getFullYear()) > 18;
const validerMoisNaissance = (inputDate)=> (dateValideMin.getFullYear()-inputDate.getFullYear()) == 18 && dateValideMin.getMonth() > inputDate.getMonth();
const validerJourNaissance = (inputDate)=> (dateValideMin.getFullYear()-inputDate.getFullYear()) == 18 && dateValideMin.getMonth() == inputDate.getMonth() && dateValideMin.getDate() >= inputDate.getDate();

confirmMotDePasse.disabled = true;
confirmMotDePasse.style.borderColor = "white"


nom.addEventListener("input", () => {
    if(!validerNomPrenom(nom)){
        nom.style.borderColor = "red";
        nom.setCustomValidity("Veuillez entrer un nom valide");
    }
    else{
        nom.style.borderColor = "yellowgreen";
        nom.setCustomValidity("");
    }
});

prenom.addEventListener("input", () => {
    if(!validerNomPrenom(prenom)){
        prenom.style.borderColor = "red";
        prenom.setCustomValidity(`Non, "${prenom.value}" n'est pas un prénom`);
    }
    else{
        prenom.style.borderColor = "yellowgreen";
        prenom.setCustomValidity("");
    }
});

email.addEventListener("input", () => {
    if(!validerEmail(email)){
        email.style.borderColor = "red";
        email.setCustomValidity(`En écrivant à "${email.value}", il sera difficile de vous contacter`);
    }
    else{
        email.style.borderColor = "yellowgreen";
        email.setCustomValidity("");
    }
});

motDePasse.addEventListener("input", () => {
    if(!validerMotDePasse(motDePasse)){
        motDePasse.style.borderColor = "red";
        confirmMotDePasse.disabled = true;
        confirmMotDePasse.style.borderColor = "white";
        confirmMotDePasse.value = "";
        motDePasse.setCustomValidity(`Je préfère vous prévenir, si vous utilisez "${motDePasse.value}" comme mot de passe, il sera trouvé en un rien de temps`);

    }
    else{
        motDePasse.style.borderColor = "yellowgreen";
        confirmMotDePasse.disabled = false;
        confirmMotDePasse.style.borderColor = "gray";
        motDePasse.setCustomValidity(``);
    }
});

confirmMotDePasse.addEventListener("input", () => {
    if(!(confirmerMotDePasse(confirmMotDePasse, motDePasse) && validerMotDePasse(confirmMotDePasse))){
        confirmMotDePasse.style.borderColor = "red";
        confirmMotDePasse.setCustomValidity(`Les mots de passe ne correspondent pas`);

    }
    else{
        confirmMotDePasse.style.borderColor = "yellowgreen";
        confirmMotDePasse.setCustomValidity(``);

    }
});


nomUtilisateur.addEventListener("input", () => {
    if(!validerUsername(nomUtilisateur)){
        nomUtilisateur.style.borderColor = "red";
        nomUtilisateur.setCustomValidity(`"${nomUtilisateur.value}" n'est pas un bon pseudo, il est trop court ou contient d'autres caractères que des chiffres, lettres ou "_" `);
    }
    else{
        nomUtilisateur.style.borderColor = "yellowgreen";
        nomUtilisateur.setCustomValidity("");
    }
});

dateNaissance.addEventListener("input", () => {
    testDate = new Date(dateNaissance.value)
    if(!(validerAnneeNaissance(testDate) || validerMoisNaissance(testDate) || validerJourNaissance(testDate))){
        dateNaissance.style.borderColor = "red";
        var mois = ["janvier", "février", "mars", "avril", "aai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
        dateNaissance.setCustomValidity(`Avec cette date de naissance, il n'est possible de s'inscrire qu'à partir du ${testDate.getDate()} ${mois[testDate.getMonth()]} ${testDate.getFullYear()+18}`);
    }
    else{
        dateNaissance.style.borderColor = "yellowgreen";
        dateNaissance.setCustomValidity("");
    }
});
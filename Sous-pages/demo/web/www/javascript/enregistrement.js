const boutonFormulaire = document.querySelector("button");
const chemin = "../htbin/register.py";

document.querySelector("article").style.display = "None";

async function envoiDonnees(donnees){
    try {
        const reponse = await fetch(chemin, {
            method: "POST",
            body: donnees,
        });
        if (!reponse.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
            boutonFormulaire.textContent = "Soumettre";
            boutonFormulaire.disabled = false;

        }
        console.log(reponse);
        document.querySelector("#erreur").textContent = reponse;
        boutonFormulaire.textContent = "Réussite";
        document.querySelector("form").style.display = "None";
        document.querySelector("article").style.display = "Flex";
        document.querySelector("article>h2").textContent = `Merci ${document.querySelector("#firstname").value} ${document.querySelector("#lastname").value}`;

    } catch (erreur) {
        console.error(erreur.message);
        document.querySelector("#erreur").textContent = erreur;
        boutonFormulaire.textContent = "Soumettre"
        boutonFormulaire.disabled = false;
    }
}


function presseBouton(evt) {
    evt.preventDefault();
    boutonFormulaire.disabled = true;
    boutonFormulaire.textContent = "Envoi en cours...";
    var donneesFormulaire = new FormData();
    donneesFormulaire.append("username", document.querySelector("#username").value)
    donneesFormulaire.append("useremail", document.querySelector("#useremail").value)
    donneesFormulaire.append("userpwd", document.querySelector("#userpwd").value)
    donneesFormulaire.append("firstname", document.querySelector("#firstname").value)
    donneesFormulaire.append("lastname", document.querySelector("#lastname").value)
    donneesFormulaire.append("birthdate", document.querySelector("#birthdate").value)    
    console.log(donneesFormulaire);
    envoiDonnees(donneesFormulaire);
}
boutonFormulaire.addEventListener("click", presseBouton, false);
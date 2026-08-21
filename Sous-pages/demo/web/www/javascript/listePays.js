const pays = document.querySelector("tbody");



document.querySelector("aside").style.display = "none";
document.querySelector("#P-FR").style.display = "flex";


function selectionne(indice){
    if(indice.tagName !== "tr" && indice.tagName !== "TR" && indice.tagName !== "tbody" && indice.tagName !== "TBODY"){
        indice = indice.parentNode;
        var asides = document.querySelectorAll("aside");
        asides.forEach(function(i){i.style.display = "none";});
        document.querySelector(`#P-${indice.id}`).style.display = "flex";
    }
}

pays.addEventListener("click", (e) => {selectionne(e.target)}, false);
const pays = document.querySelector("ul");



document.querySelector("article").style.display = "none";
document.querySelector("#P-FR").style.display = "flex";


function selectionne(indice){
    if(indice.tagName !== "ul" && indice.tagName !== "UL"){
        if(indice.tagName === "H3" || indice.tagName === "IMG" || indice.tagName === "h3" || indice.tagName === "img"){
            indice = indice.parentNode;
        }    
        var articles = document.querySelectorAll("article");
        articles.forEach(function(i){i.style.display = "none";});
        document.querySelector(`#P-${indice.id}`).style.display = "flex";
    }
}

pays.addEventListener("click", (e) => {selectionne(e.target)}, false);

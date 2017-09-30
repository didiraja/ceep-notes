(function(){ /* Comeco da IIFE */
    "use strict";
var mural = document.querySelector(".mural");

// Troca o Layout entre Linhas e Colunas {flex}
document.querySelector("#mudaLayout").addEventListener("click",function() {

    var mural = document.querySelector(".mural");

    mural.classList.toggle("mural--linhas");

    if (mural.classList.contains("mural--linhas")) {
        this.textContent = "Blocos";
    } else {
        this.textContent = "Linhas";
    }

});

// Remover os cartoes no click
var botoes = document.querySelectorAll(".opcoesDoCartao-remove");
for (var i = 0; i < botoes.length; i++) {

    botoes[i].addEventListener("click",removeCartao);

}

})();
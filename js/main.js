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

// Funcao que remove os cartoes
function removeCartao() {
    
    var cartao = this.closest(".cartao");

    cartao.classList.add("cartao--some");

    setTimeout(function(){
        cartao.remove();
    }, 400);
    
}

// Inclui um novo cartao
$(".novoCartao").submit(function(event){

    event.preventDefault();

    var campoConteudo = $(".novoCartao-conteudo");
    var conteudo = campoConteudo.val().trim().replace(/\n/g,"<br>").replace(/\*\*([^*]+)\*\*/g, "<b>$1<\/b>");
    // .replace(/\*([^*]+)\*/g, "<i>$1<\/i>")
    var contador = $(".cartao").length;

    if (conteudo) {

        var conteudoTag = $("<p>").addClass("cartao-conteudo").append(conteudo);

        var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove").attr("data-ref", "cartao_" + contador).addClass("opcoesDoCartao-opcao").text("Remover").click(removeCartao);
        
        var opcoes = $("<div>").addClass("opcoesDoCartao").append(botaoRemove);

        var tipoCartao = decideTipoCartao(conteudo);

        var conteudoTag = $("<p>").addClass("cartao-conteudo").append(conteudo);

        $("<div>").attr("id","cartao_" + contador).addClass("cartao").addClass(tipoCartao).append(opcoes).append(conteudoTag).prependTo(".mural");

        contador++;
        
    }

    campoConteudo.val("");

});

// Verifica tamanho do cartáo
function decideTipoCartao(conteudo) {
    
    var quebras = conteudo.split("<br>").length;

    var totalDeLetras = conteudo.replace(/<br>/g, " ").length;

    var ultimoMaior = " ";

    conteudo.replace(/<br>/g, " ").split(" ")
        .forEach(function(palavra) {
            
            if (palavra.length > ultimoMaior.length) {
                ultimoMaior = palavra;
            }

        });

    var tamMaior = ultimoMaior.length;

    var tipoCartao = "cartao--textoPequeno";

    if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
        
        tipoCartao = "cartao--textoGrande";

    } else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 75) {
        
        tipoCartao = "cartao--textoMedio";

    }

    return tipoCartao;

}

//Busca conteúdo do Note
$("#busca").on("input", function () {
    
    var busca = $(this).val().trim();

    if (busca.length) {
        $(".cartao").hide().filter(function () {
            return $(this).find(".cartao-conteudo").text().match(new RegExp(busca, "i"));
        }).show();
    } else {
        $(".cartao").show();
    }
});

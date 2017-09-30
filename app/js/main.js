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

        adicionaCartao(conteudo, "#EBEF40");
        
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

// Requisicao JSON
$("#ajuda").click(function() {

    $.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes",
        function(res) {
            console.log(res);

            res.instrucoes.forEach(function (instrucao) {
                adicionaCartao(instrucao.conteudo, instrucao.cor);
            });
        });

        console.log("Enviada requisicão. Aguardando resposta.");    
    
})

// Novo Cartao através da Requisicao
function adicionaCartao(conteudo, cor){

    var contador = $(".cartao").length;
    
        contador++;
 
        var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove").
        attr("data-ref", "cartao_" + contador).addClass("opcoesDoCartao-opcao").
        text("Remover").click(removeCartao);
        
        var opcoes = $("<div>").addClass("opcoesDoCartao").append(botaoRemove);
        
        var tipoCartao = decideTipoCartao(conteudo);
        
        var conteudoTag = $("<p>").addClass("cartao-conteudo").append(conteudo);
    
        $("<div>").attr("id","cartao_" + contador).addClass("cartao").addClass(tipoCartao).
        append(opcoes).append(conteudoTag).css("background-color",cor).prependTo(".mural");
            
};

(function(){

var usuario = "dico@caelum.com.br"

$("#sync").click(function(){

    $("#sync").removeClass("botaoSync--sincronizado");
    $("#sync").addClass("botaoSync--esperando");

    var cartoes = [];

    $(".cartao").each(function(){
        
        var cartao = {};
        cartao.conteudo = $(this).find(".cartao-conteudo").html();
        cartoes.push(cartao);

    });

    var mural = {
        usuario: usuario,
        cartoes: cartoes
    }

    console.log("Enviada requisicão. Aguardando resposta.");

    $.ajax({
        url: "https://ceep.herokuapp.com/cartoes/salvar",
        method: "POST",
        data: mural,
        success: function(res) {

            $("#sync").addClass("botaoSync--sincronizado");
            console.log(res.quantidade + " cartões salvos em " + res.usuario);
        },
        error: function() {
            $("#sync").addClass("botaoSync--deuRuim");
            console.log("Não foi possível salvar o mural");
        },
        complete: function() {
            $("#sync").removeClass("botaoSync--esperando");
        }
    });

});

$.getJSON("https://ceep.herokuapp.com/cartoes/carregar?callback=?",{usuario: usuario}, function(res){
        var cartoes = res.cartoes;
        console.log(cartoes.length + " carregados em " + res.usuario);
        cartoes.forEach(function(cartao){
            adicionaCartao(cartao.conteudo);
        });
    }
);

})();

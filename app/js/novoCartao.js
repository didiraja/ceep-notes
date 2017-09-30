(function(adiciona) {

    "use strict";

    // Inclui um novo cartao
$(".novoCartao").submit(function(event){
    
        event.preventDefault();
    
        var campoConteudo = $(".novoCartao-conteudo");
        var conteudo = campoConteudo.val().trim().replace(/\n/g,"<br>").replace(/\*\*([^*]+)\*\*/g, "<b>$1<\/b>");
        // .replace(/\*([^*]+)\*/g, "<i>$1<\/i>")
        var contador = $(".cartao").length;
    
        if (conteudo) {
    
            adiciona.adicionaCartao(conteudo, "#EBEF40");
            
        }
    
        campoConteudo.val("");
    
    });
    
    

})(controladorDeCartoes);
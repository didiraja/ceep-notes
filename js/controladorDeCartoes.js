var controladorDeCartoes = (function(){

    "use strict";

    // Funcao que remove os cartoes
    function removeCartao() {
        
        var cartao = this.closest(".cartao");

        cartao.classList.add("cartao--some");

        setTimeout(function(){
            cartao.remove();
            $(document).trigger("precisaSincronizar");
        }, 400);
        
    }

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

    var contador = 0;

    function adicionaCartao(conteudo, cor){
        
        contador++;

        var opcoes = criaOpcoesDoCartao(contador);
        
        var tipoCartao = decideTipoCartao(conteudo);
        
        var conteudoTag = $("<p>").addClass("cartao-conteudo").attr("contenteditable", true)
        .on("input",editaCartaoHandler).append(conteudo);
    
        $("<div>").attr("id","cartao_" + contador).attr("tabindex",0).addClass("cartao").addClass(tipoCartao).
        append(opcoes).append(conteudoTag).css("background-color",cor).prependTo(".mural");
                        
    }

    var intervaloSyncEdicao;

    function editaCartaoHandler(event){
        clearTimeout(intervaloSyncEdicao);

        intervaloSyncEdicao = setTimeout(function(){
            $(document).trigger("precisaSincronizar");
        }, 1000);
    }

    return {
        adicionaCartao: adicionaCartao,
        idUltimoCartao: function(){
            return contador;
        }
    }

})();

/*(function(){

})();*/
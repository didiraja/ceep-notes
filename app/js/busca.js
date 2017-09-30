(function(){
    "use strict";
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

})();


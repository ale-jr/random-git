$(document).ready(function(){
var reultados_por_pagina = 30;

  //esconde div que exibe dados do repo
  $("#container").hide();
  $("#label_erro").hide();

  //click do botão buscar
  $("#bt_buscar").click(function(){
    //se usuário selecionar linguagem
    if($("#select_linguagem")[0].selectedIndex > 0){
      //esconde label de erro
      $("#label_erro").hide();

      //define o total de páginas
      var paginas = 0;
      $.get("https://api.github.com/search/repositories?q=language:"+$("#select_linguagem").val(), function(data){
          //obter página aleatória

          //como o git só exibe os mil primeiros resultados, quando total de repos for maior que 1000, o valor para o calculo do total de páginas será de mil
          if(data.total_count<1000){
            paginas = Math.ceil(data.total_count / reultados_por_pagina);
          }
          else {
              paginas = Math.ceil(1000 / reultados_por_pagina);
          }
          var url_pagina = "https://api.github.com/search/repositories?q=language:"+$("#select_linguagem").val() + "&page="+ Math.floor(Math.random() * paginas);
          console.log(url_pagina);
          $.get(url_pagina, function(data){

          })
          //caso haja um erro, exibe na label
          .fail(function(){
            $("#label_erro").text("Ocorreu um erro, tente novamente");
            $("#label_erro").show("slow");
          });


          console.log(paginas);
      },"json")
      //caso haja um erro, exibe na label o erro
      .fail(function() {
        $("#label_erro").text("Ocorreu um erro, tente novamente");
        $("#label_erro").show("slow");
      });

    }
    else {
      //exibe label de erro
      $("#label_erro").text("Você precisa selecionar uma linguagem");
      $("#label_erro").show("slow");
    }
  });
});

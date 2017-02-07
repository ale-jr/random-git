$(document).ready(function(){
var reultados_por_pagina = 30;

  //esconde div que exibe dados do repo
  $("#container").hide();
  $("#label_erro").hide();

  //click do botão buscar
  $(".bt_buscar").click(function(){
    //se usuário selecionar linguagem
    if($("#select_linguagem")[0].selectedIndex > 0){
      //esconde label de erro
      $("#label_erro").hide();

      //define o total de páginas como 34, pois o git so exibe mil projetos, 30 or página o que são aproximadamente 34 páginas
      var paginas = 34;
      var url_pagina = "https://api.github.com/search/repositories?q=language:"+$("#select_linguagem").val() + "&page="+ Math.floor(Math.random() * paginas);
      console.log(url_pagina);
      $.get("https://api.github.com/search/repositories?q=language:"+$("#select_linguagem").val(), function(data){
          //caso o total de projetos seja menor que mil, executa um get com menos páginas
          if(data.total_count<1000){
            paginas = Math.ceil(data.total_count / reultados_por_pagina);
            url_pagina = "https://api.github.com/search/repositories?q=language:"+$("#select_linguagem").val() + "&page="+ Math.floor(Math.random() * paginas);
            $.get("https://api.github.com/search/repositories?q=language:"+$("#select_linguagem").val(), function(data2){
              data = data2;
            })
            //caso haja um erro, exibe na label
            .fail(function(){
              $("#label_erro").text("Ocorreu um erro, tente novamente");
              $("#label_erro").show("slow");
            });
          }
          console.log(data.items.length);
          var i = Math.floor(data.items.length * Math.random());
          var repositorio = data.items[i];
          console.log(repositorio);
          //define dados do container
          $("#img_repo").attr("src",repositorio.owner.avatar_url);
          $("#nome_repo").text(repositorio.name);
          $("#dono_repo").text(repositorio.owner.login);
          $("#dono_repo").attr("href",repositorio.owner.html_url);
          $("#sobre_repo").text(repositorio.description);
          $("#bt_ver_repo").attr("href",repositorio.html_url);
          $("#container").show("slow");
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

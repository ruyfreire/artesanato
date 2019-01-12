$(document).ready(function(){
    docesCarregado = false;
    artesanatoCarregado = false;
    trabalhoCarregado = false;




    //================= mostrar/esconder menu  =====================
    $("#botao-menu").click(function(){
        var tela = $(window).width();
        if(tela < 576) {
            $("#lista-menu").toggleClass("exibe");
            $("#lista-menu").triggerHandler( "focus" );
        }
    });
    $("#lista-menu").focusout(function(){
        var tela = $(window).width();
        if(tela < 576) {
            $("#lista-menu").toggleClass("exibe");
        }
    });


    //==========   evento scroll na janela   =====================
    $(window).scroll(function(){

        //exibir ou ocultar botao top
        var sessao = $("#doces").offset().top;
        $.fx.off = false;
        if( $(window).scrollTop() >= sessao ) {
            $("#botao-topo").removeClass("oculta-botao");
        }
        else {
            $("#botao-topo").addClass("oculta-botao");
        }
        $("#botao-topo").click(function(event){
            event.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            },300);
            $.fx.off = true;
        });


        // carregar resto da página - lazy load
        var basePagina = $(window).scrollTop() + $(window).height();
        var sessaoDoce = $(".doces-lista").offset().top;
        var sessaoArtesanato = $(".artesanato-lista").offset().top;        

        if(basePagina >= sessaoDoce && !docesCarregado){
            carregaNaPagina( $("#doces .janela-sessao") );
            docesCarregado = true
        }
        if(basePagina >= sessaoArtesanato && !artesanatoCarregado) {
            carregaNaPagina( $("#artesanato .janela-sessao") );
            artesanatoCarregado = true;
        }
    });
    

    function carregaNaPagina(item){
        var caminho = item.find("img").attr("data-caminho-img");
        item.find("img").attr("src", caminho);
    }


    //======= evento click botao top, chamando scrollsuave =========
    $("#lista-menu a").click(function(){
        var clicado = $(this).attr('href');
        scrollSuave(clicado, event);
    });


    // =============  executar scroll suave  ================
    function scrollSuave(clicado, event) {
        event.preventDefault();
        $.fx.off = false;
        $("html, body").animate({
            scrollTop: $(clicado).offset().top
        }, 1000);
        
    }    
     
    
    //=============  formata o campo de telefone  ===============
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };
    $('#telefone').mask(SPMaskBehavior, spOptions);


    //================  janela descricao de itens =================
    // coloca evento em toda lista de doces e artesanato
    $(".lista-itens > div").click(function(){
        // exibe a janela de acordo com o item clicado
        var item = $( this ).data("item");
        $(".j-"+item).toggleClass( "janela-off" );
        $(".j-"+item).toggleClass( "janela-on" );

        // coloca uma div para usar evento de fechar a janela aberta
        $("body").append('<div class="menu-aberto"></div>');
        setTimeout(function(){
            $(".menu-aberto").click(function(){
                $(".janela-sessao").addClass( "janela-off" );
                $(".janela-sessao").removeClass( "janela-on" );
                $(".menu-aberto").remove();
            });
        },300);
    });

    // coloca evento em cada item da janela que foi exibida
    $(".lista-subitem").click(function(){
        var item = $(this);
        var tipoItem = item.attr("data-tipo-item");

        // limpa qualquer um que estiver exibindo
        $(".janela-on .lista-subitem").removeClass("item-ativo");
        $(".janela-on .descricao-subitem").addClass("item-descricao-off");

        // coloca como ativo apenas o que foi clicado
        item.addClass("item-ativo");
        $(".janela-on div[data-descricao=" + tipoItem + "]").removeClass("item-descricao-off");
    });
});
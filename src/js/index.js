$(document).ready(function(){

    let basePagina;

    const sessaoDoce = $(".doces-lista").offset().top;
    const sessaoArtesanato = $(".artesanato-lista").offset().top;
    const sessaoTrabalho = $("#trabalhos").offset().top;
    lazyLoadSessoes();
    
    let docesCarregado = false;
    let artesanatoCarregado = false;
    let trabalhoCarregado = false; 
    
    const botaoMenu = document.querySelector("#lista-menu");
    const botaoTopo = $("#botao-topo");
    botaoTop();



    //================= mostrar/esconder menu  =====================
    $("#botao-menu").click(function() {
        botaoMenu.classList.toggle("exibe");
        botaoMenu.triggerHandler( "focus" );
    });


    //==========   evento scroll na janela   =====================´

    $(window).scroll(function(){

        botaoTop();

        if(!docesCarregado || !artesanatoCarregado || !trabalhoCarregado)
            lazyLoadSessoes();
    });

    function botaoTop() {
        // exibir ou ocultar botao top
        $.fx.off = false;
        if( $(window).scrollTop() > sessaoDoce )
            botaoTopo.removeClass("oculta-botao");
        else
            botaoTopo.addClass("oculta-botao");    
    }

    function lazyLoadSessoes() {
        
        basePagina = $(window).scrollTop() + $(window).height();
        if(basePagina > sessaoDoce && !docesCarregado){
            carregaNaPagina( $("#doces .janela-sessao") );
            docesCarregado = true
        }
        if(basePagina > sessaoArtesanato && !artesanatoCarregado) {
            carregaNaPagina( $("#artesanato .janela-sessao") );
            artesanatoCarregado = true;
        }
        if(basePagina > sessaoTrabalho && !trabalhoCarregado) {
            carregaNaPagina( $("#artesanato .janela-sessao") );
            trabalhoCarregado = true;
        }
    }
    function carregaNaPagina(item){
        var caminho = item.find("img").attr("data-caminho-img");
        item.find("img").attr("src", caminho);
    }


    // ==========  scroll botao topo  =================
    botaoTopo.click(function(event){
        event.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        },300);
        $.fx.off = true;
    });



    //======= evento click menu topo, chamando scrollsuave =========
    $("#lista-menu a").click(function(){
        var clicado = $(this).attr('href');
        scrollSuave(clicado, event);
    });
    function scrollSuave(clicado, event) {
        event.preventDefault();
        $.fx.off = false;
        $("html, body").animate({
            scrollTop: $(clicado).offset().top
        }, 1000);        
    }
    


    //================  janela descricao de itens =================

    // coloca evento em toda lista de doces e artesanato
    $(".lista-itens > div").click(function(){
        // exibe a janela de acordo com o item clicado
        var item = $( this ).data("item");
        $(".j-"+item).toggleClass( "janela-off" );
        $(".j-"+item).toggleClass( "janela-on" );

        // coloca uma div para usar evento de fechar a janela aberta
        $("body").append('<div class="janela-aberta"></div>');
        //evento que fecha janela aberta, ao clicar fora dela
        $(".janela-aberta").click(function(){
            $(".janela-sessao").addClass( "janela-off" );
            $(".janela-sessao").removeClass( "janela-on" );
            $(".janela-aberta").remove();
        });
    });


    // coloca evento em cada subitem da janela que foi aberta
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

});
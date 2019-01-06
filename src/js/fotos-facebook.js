    var numFotos = 0;
    var proxFotos = "";
    listaFotos = 0;

    //Configura e executa API, para carregar fotos
    window.fbAsyncInit = function() {
        FB.init({
        appId            : '171251193689555',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v3.1'
        });
        // pega as fotos da pasta
        FB.api(
            '/1445965122374092/photos',
            'GET',
            {"fields":"source",
            "limit":"12",
            "access_token" : "171251193689555|0kdlqVfnbuCeT2aacYy1epxLGUk"},
            
            function(response) {
                if(response.paging.next != null) 
                    proxFotos = response.paging.next;
                else proxFotos = "";
                
                inserirFotos(response);
                organizaQuadro();
            }
        ); //fecha face api
            
    }; // fecha fbAsyncInit face
        
    //inserir fotos na pagina
    function inserirFotos(album){
        for(var i = 0; i < album.data.length; i++) {
            $('#trabalhos div.fotos').append(
                '<div><a ' +
                'href="' + album.data[i].source + '" ' +
                'data-lightbox="' + listaFotos + '">' +
                '<img ' +
                'class="item-foto" ' +
                'src="' + album.data[i].source + '">' +
                '</a></div>'
            );
        }
        numFotos += album.data.length;
    }//fecha função


    //carregar mais fotos
    function maisFotos(){
        var total = numFotos / 4;
        var atual = $(".slick-current").attr("data-slick-index");
        if(proxFotos != "" && atual >= total){
            $.getJSON(proxFotos, function(response){
                if(response.paging.next != null) 
                proxFotos = response.paging.next;
                else proxFotos = "";
                
                numFotos += response.data.length;

                for(var i = 0; i < response.data.length; i++) {
                    $('#trabalhos div.fotos').slick('slickAdd',
                    '<div><a ' +
                    'href="' + response.data[i].source + '" ' +
                    'data-lightbox="' + listaFotos + '">' +
                    '<img ' +
                    'class="item-foto" ' +
                    'src="' + response.data[i].source + '">' +
                    '</a></div>'
                    );
                }
            });        
        }
    }

    //insere script do facebook para usar API, setinterval forçando esperar 2s depois de carregar a tela.
    (function(d, s, id){
        setInterval(function(){

            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/pt_BR/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);

            }, 2000
        );
    }(document, 'script', 'facebook-jssdk'));


    // =============  slider da sessao trabalhos  ================
    function organizaQuadro(){
        $(".fotos").slick({
            prevArrow: '<buttom type="buttom" id="botao-voltar" class="botao-fotos"><img src="img/icon/left.png"/></buttom>',
            nextArrow: '<buttom type="buttom" id="botao-prox" class="botao-fotos" onclick="maisFotos()"><img src="img/icon/right.png"/></buttom>',
            infinite: false,
            // range: 992 a full
            slidesToShow: 5,
            slidesToScroll: 5,
            vertical: false,
            speed: 1000,
            responsive: [
                {
                    // range: 768 a 992
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        vertical: false
                    }
                },
                {
                    // range: 576 a 768
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        vertical: false
                    }
                },
                {
                    // range: 0 a 576
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        vertical: true
                    }
                }
            ]
        });    
    }

    //=============  ampliar fotos dos trabalhos ================
    lightbox.option({
        showImageNumberLabel: false
    });
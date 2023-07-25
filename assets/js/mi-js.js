jQuery(document).ready(function ($) {
    var algo = GridStack.init();
    function grid() {
      if ($(window).width() > 999) {
        $("#fondo .row").addClass("grid-stack");
        $(
          "#card-menu, #registrate, #izquierda, #principal, #artista, #info-cancion, #footer"
        )
          .addClass("grid-stack-item")
          .removeClass("mt-2 mb-3");
          $(".mover").show();
        algo.enable();
      } else if ($(window).width() < 999) {
        if ($("#fondo .row").hasClass("grid-stack") || $("#fondo .row").attr("style")
        ) {
          $("#fondo .row").removeClass("grid-stack").removeAttr("style");
          $("#card-menu, #registrate, #izquierda, #principal, #artista, #info-cancion, #footer").removeClass("grid-stack-item").addClass("mt-2 mb-3");
          console.log("funciono");
          $(".mover").hide();
          algo.disable();
        }
      }
    }
    $(window).resize(function () {
      grid();
    });
    // llamada inicial a la función
    grid();
    //temas
    $("#selector-tema .seleccion").click(function () {
      $(".seleccion").removeClass("shadow op");
      $(this).addClass("shadow op");
    });
  
    $("#tema-blanco").click(function () {
      $("body").removeClass("tema-oscuro tema-amoled").addClass("tema-blanco");
      $("#confirmar").removeClass("disabled btn-primary").addClass("bg-tema");
    });
  
    $("#tema-oscuro").click(function () {
      $("body").removeClass("tema-claro tema-amoled").addClass("tema-oscuro");
      $("#confirmar").removeClass("disabled btn-primary").addClass("bg-tema");
    });
    $("#tema-amoled").click(function () {
      $("body").removeClass("tema-oscuro tema-claro").addClass("tema-amoled");
      $("#confirmar").removeClass("disabled btn-primary").addClass("bg-tema");
    });
    $("#confirmar").click(function () {
      $("#selector-tema").fadeOut("1000", function () {
        $(this).remove();
        $("*").removeClass("transparente");
        $("*").removeClass("placeholder");
        $(".efecto-texto").codex({
          duration: 500,
        });
      });
    });
    // Obtenemos la altura y anchura de la ventana del navegador
    var alturaVentana = $(window).height();
    var anchoVentana = $(window).width();
    // Obtenemos la altura y anchura del elemento que queremos centrar
    var alturaSelector = $("#selector-tema").outerHeight();
    var anchoSelector = $("#selector-tema").outerWidth();
    // Calculamos la posición en la que debemos mover el elemento para centrarlo
    var margenSuperior = (alturaVentana - alturaSelector) / 2;
    var margenIzquierda = (anchoVentana - anchoSelector) / 2;
    // Movemos el elemento al centro de la pantalla
    $("#selector-tema").css({
      "margin-top": margenSuperior,
      "margin-left": margenIzquierda,
    });
    //evitar formulario
    $("form").on("submit", function (event) {
      event.preventDefault();
    });
    //navegacion
    var contenidoAnterior = "";
    var inicioCancion = "";
    var inicioArtista = "";
    var clickLoop = false;
    var clickCancion = false;
    var clickArtista = false;
    //navegacion playlist
    $(document).on("click", ".loop", function (event) {
      clickLoop = true;
      contenidoAnterior = $("#contenido .card-body").html();
      event.preventDefault();
      var href = $(this).attr("href");
      $("#contenido .card-body").fadeOut("slow", function () {
        $("#contenido .card-body").css("opacity", "0");
        $(this).load(href , function () {
          $("#contenido .card-body").css("opacity", "1");
          $(this).fadeIn("fast");
          cargarCancion();
        });
      });
    });
    //navegacion cancion
    $(document).on("click", ".enlace-cancion, #titulo-cancion", function (event) {
      clickCancion = true;
      inicioCancion = $("#info-cancion .card-body").html();
      event.preventDefault();
      var href = $(this).attr("href");
      $.get(href,function(data,status){
        $("#info-cancion .card-body").html(data);
        $('html, body').animate({
          scrollTop: $("#info-cancion").offset().top
        }, 10);
      });
    });
    //navegacion cancion
    $(document).on("click", ".perfil, #artista-cancion", function (event) {
      clickArtista = true;
      inicioArtista = $("#artista .card-body").html();
      event.preventDefault();
      var href = $(this).attr("href");
      $.get(href,function(data,status){
        $("#artista .card-body").html(data);
        $('html, body').animate({
          scrollTop: $("#artista").offset().top
        }, 10);
      });
    });
    $("#volver").click(function () {
      if (clickLoop) {
        $("#contenido .card-body").fadeOut("fast", function () {
          $(this).html(contenidoAnterior).fadeIn("fast"); // Restaura el contenido anterior
        });
      }
      if (clickCancion) {
        $("#info-cancion .card-body").fadeOut("fast", function () {
          $(this).html(inicioCancion).fadeIn("fast"); // Restaura el contenido anterior
        });
      }
      if (clickArtista) {
        $("#artista .card-body").fadeOut("fast", function () {
          $(this).html(inicioArtista).fadeIn("fast"); // Restaura el contenido anterior
        });
      }
    });
    //girar discos
    function girar() {
      $(".no-hay").animate({ rotate: "360deg" }, 90000);
    }
    girar();
    //carrusel playlist
    $("#carrusel-playlist").slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      dots: false,
      pauseOnHover: true,
      infinite: true,
      edgeFriction: 1,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 4000,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 4000,
          },
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
          },
        },
      ],
    });
    //carrusel spotify
    $("#carrusel-spotify").slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      dots: false,
      pauseOnHover: true,
      infinite: true,
      edgeFriction: 1,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 4000,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 4000,
          },
        },
        {
          breakpoint: 375,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
          },
        },
      ],
    });
    $(".slick-next").html('<i class="fs-3 text-tema  fa-solid fa-angle-right"></i>');
    $(".slick-prev").html('<i class="fs-3 text-tema  fa-solid fa-angle-left"></i>');
  
    //reproductor
    var posicion = 0;
    var repetir = false;
    var mix = false;
    var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    function cargarCancion() {
      var audioCancion = $('#contenido .song').eq(posicion).data('src');
      var infoCancion = $('#contenido .song').eq(posicion).data('info');
      var nombre = $('#contenido .song').eq(posicion).data('title');
      var artista = $('#contenido .song').eq(posicion).data('artista');
      var enlaceArtista = $('#contenido .song').eq(posicion).data('enlace-artista');
      var imagen = $('#contenido .song').eq(posicion).data('img');
      // Colocar los valores en los elementos correspondientes del reproductor de audio
      $('#info-reproduccion img').attr('src', imagen);
      $('#info-reproduccion audio').attr('src', audioCancion);
      $('#info-reproduccion #titulo-cancion').attr('href', infoCancion);
      $('#info-reproduccion #artista-cancion').attr('href', enlaceArtista);
      $('#info-reproduccion #titulo-cancion').text(nombre);
      $('#info-reproduccion #artista-cancion').text(artista);
      $("#info-reproduccion .efecto-texto").codex({
        duration: 680,
      });
    }
    $("#play").click(function () {
      var audio = $("#cancion");
      var icono = $(this).find("i");
      if (icono.hasClass("fa-circle-pause")) {
        audio[0].pause();
        icono.removeClass("fa-circle-pause").addClass("fa-circle-play");
      } else {
        audio[0].play();
        icono.removeClass("fa-circle-play").addClass("fa-circle-pause");
      }
    });
    //siguiente cancion
    $("#siguiente").click(function () {
      if (mix) {
        posicion = Math.floor(Math.random() * nums.length);
      } else {
        posicion++;
      }
      cargarCancion();
      $("#cancion")[0].play();
      $("#play").find("i").removeClass("fa-circle-play").addClass("fa-circle-pause");
      $("#repetir").removeClass("bg-tema");
      repetir = false;
    });
    //cancion anterrior
    $("#atras").click(function () {
      if (mix) {
        posicion = Math.floor(Math.random() * nums.length);
      } else {
        posicion--;
      }
      cargarCancion();
      $("#cancion")[0].play();
      $("#play").find("i").removeClass("fa-circle-play").addClass("fa-circle-pause");
      $("#repetir").removeClass("bg-tema");
      repetir = false;
    });
    //mezclar
    $("#mix").click(function () {
      $(this).toggleClass("bg-tema");
      $("#repetir").removeClass("bg-tema");
      mix = !mix;
    });
    $("#repetir").click(function () {
      $(this).toggleClass("bg-tema");
      $("#mix").removeClass("bg-tema");
      repetir = !repetir;
    });
    //tiempo reproduccion
    $("#cancion").on("timeupdate", function () {
      var audio = this;
      $("#tiempo-reproduccion").val((this.currentTime / this.duration) * 100);
      $("#tiempo-actual").text(formatTime(audio.currentTime));
      $("#duracion").text(formatTime(audio.duration));
    });
    function formatTime(time) {
      var minutosTotales = Math.floor(time / 60);
      var segundosTotales = Math.floor(time % 60);
      var minutos = Math.floor(minutosTotales % 60);
      var segundos = segundosTotales < 10 ? "0" + segundosTotales : segundosTotales;
      return minutos + ":" + segundos;
    }
    // Agregar evento "input" al input para permitir al usuario seleccionar una posición en la canción
    $("#tiempo-reproduccion").on("input", function () {
      var audio = $("#cancion")[0];
      audio.currentTime = ($(this).val() / 100) * audio.duration;
      $("#tiempo-actual").text(formatTime(audio.currentTime));
    });
    //siguiente automatico
    $("#cancion").on("ended", function () {
      if (repetir) {
        $("#cancion")[0].play();
      } else {
        posicion++;
        cargarCancion();
        $("#cancion")[0].play();
        $("#play").find("i").removeClass("fa-circle-play").addClass("fa-circle-pause");
      }
    });
    //me gusta
    $(document).on("click", ".corazon", function () {
      $(this).find("i").toggleClass("fa-regular fa-heart fa-solid fa-heart");
    });
    //cargar cancion directamente
    $(document).on('click', '.img-cancion', function() {
      posicion = $(this).parent().parent().parent().index();
      cargarCancion();
    });
  });
$(document).ready(function(){

  var pallete = ["#2D4D86", "#006496", "#4A78A9", "#6884B3", "#337AB7"];

  var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
   $('ul.nav a').each(function() {
    if (this.href === path) {
     $(this).parent().addClass('active');
    }
  });

  $("#main-categories li").click(function(){
    var data = $(this).attr("data-attr");
    $("div.cat-details").hide();
    $("div[data-id='"+data+"']").fadeIn();
  });
  // var tile = $(".kategori-ligjore").width();

  //merr second child sepse i pari eshte col-md-6
  // var tile = $(".kategori-container:nth-child(2)").width();

  if($(window).width()>767){

    var tile = $("#ref").width();
    $(".kategori-container").height(tile);
    $(".kategori-ligjore").height(tile);
    $(".double-height").height(2*tile);
    $(".double-height .kategori-ligjore").height(2*tile);

    $(".kategori-details").each(function(){
      $(this).width($(this).parent().width()-20);
      $(this).height($(this).parent().height()-20);
    });
    $(".double-height .kategori-details").each(function(){
      $(this).height($(this).parent().height()-20);
    });

    $(".kategori-container").hover(
      function () {
         $(this).find(".kategori-details").animate({
           left: '0',
           opacity: 1
         }, 200);
         $(this).find(".kategori-ligjore").animate({
           'color': '#273D73',
         }, 200);
      },
      function () {
        $(this).find(".kategori-details").animate({
          left: '-100%',
          opacity: 0
        }, 100);
        $(this).find(".kategori-ligjore").animate({
          'color': '#fff',
        }, 100);
      }
    );
  } else {
    $(".kategori-container").height(100);
    $(".kategori-ligjore").height(100);
  }

  $(".kategori-ligjore").each(function(){
      var nuance = pallete[Math.floor(Math.random()*5)];
      // alert(nuance);
      $(this).css("background-color", nuance);
      $(this).find(".kategori-details").css("background-color", nuance);
      // $(this).parent(".kategori-container").css("background-color", nuance);
  });

  $(".kategori-container").click(function(){
    $(this).css("transform", "rotateX( 0deg ) rotateY( 0deg ) translateZ( -30px );");
    var loc = $(this).find(".kategori-details ul li:first a").attr("href");
    window.location.href=loc;
  });

  // if($(document).width()>1200 && path=="http://localhost:4000/"){
  //   $(".kategori-details#puna").append("<div class='col-lg-6' id='col1'></div><div class='col-lg-6' id='col2'></div>");
  //   $("#lista-punes").children("li").each(function(i){
  //      if(i<5){
  //
  //     } else {
  //       $("#kolona2").append("<li>"+$(this).html()+"</li>");
  //       $(this).remove();
  //     }
  //   });
  //   $("#col1").append("<ul></ul>");
  //   $("#col2").append("<ul></ul>");
  //   $("#col1 ul").append($("#lista-punes").html());
  //   $("#col2 ul").append($("#kolona2").html());
  //   $(".kategori-details#puna>ul").remove();
  // }

  $(".page-parts-images").height($(".page-parts-images").width());
  //
  // window.addEventListener("orientationchange", function() {
  //   // Announce the new orientation number
  //   // alert(window.orientation);
  // }, false);
  window.addEventListener("resize", function() {
  	// Get screen size (inner/outerWidth, inner/outerHeight)
    tile = $("#ref").width();
    $(".kategori-container").height(tile);
    $(".kategori-ligjore").height(tile);
    $(".double-height").height(2*tile);
    $(".double-height .kategori-ligjore").height(2*tile);

    $(".kategori-details").each(function(){
      $(this).width($(this).parent().width()-20);
      $(this).height($(this).parent().height()-20);
    });
    $(".double-height .kategori-details").each(function(){
      $(this).height($(this).parent().height()-20);
    });
  }, false);

  $("#search-input").keyup(function() {
    //alert( "Handler for .keyup() called." );
    if($(this).val()==""){
      $("#results-container *").remove();
    }

    if($("#results-container *").length == 0){
      $("#results-container").hide();
    } else {
      $("#results-container").show();
    }

  });
  $("#results-container").hide();

  $("#search-results").css({
    "top": function(){
      return $("#search-input").offset().top + +$("#search-input").css("height").substring(0, 2);
    },
    "left": $("#search-input").offset().left,
    "width": 26 + +$("#search-input").width()
  });


  //submit i formes se kontaktit
  $("#submit-form").click(function() {
    $.ajax({
      url: 'http://formspree.io/g.malo@commprog.com',
      method: 'POST',
      data: $("#contact-form").serialize(),
      dataType: 'json',
      beforeSend: function() {
        // $("body").append('<div class="alert alert--loading">Sending message…</div>');
      },
      success: function(data) {
        // $("body").find('.alert--loading').hide();
        // $("body").append('<div class="alert alert--success">Message sent!</div>');
        $("input").each(function(){ $(this).val(""); });
        $("textarea").val("");
        $("#submit-form").remove();
        $("main").append('<div class="alert alert-success" role="alert">Mesazhi juaj u dergua me sukses.</div>');
      },
      error: function(err) {
        // $("body").find('.alert--loading').hide();
        $("body").append('<div class="alert alert-error" role="alert">Oops, një gabim i vogël. Ringarko faqen dhe provo përsëri.</div>');
      }
    });
  });

  //submit i formes se kontaktit
  $("#submit-pyetsor").click(function() {
    $.ajax({
      url: 'http://formspree.io/g.malo@commprog.com',
      method: 'POST',
      data: $("#pyetsori-form").serialize(),
      dataType: 'json',
      beforeSend: function() {
      },
      success: function(data) {
        $("#myModal").modal("hide");
        $('#success-modal').modal('show');
      },
      error: function(err) {
      }
    });
  });

  if(window.location.href.indexOf("search") > -1){
    var url = window.location.href;
    var start = url.indexOf("kerkimi") + 8;
    var q = url.substring(start, url.length);
    q = q.replace("+", " ");
    $("#search-input").val(q);
    setTimeout(function(){
      var matches = repository.search(q);
      if(matches.length>0){
        for(var i=0; i<matches.length; i++){
          $("#results").append("<div class='search-result'><a href='"+matches[i].url+"' ><h4>"
          +matches[i].title+"</h4></a>Kategoria: <a href='/"+matches[i].category+"'> "+matches[i].category+"</a><p>"+matches[i].content.substring(0, 77)+"...</p></div>");
            console.log(matches[i]);
        }
      } else {
        $("#results").append("<p>Nuk u gjet asnje rezultat per kërkimin tuaj. Provoni me nje tjeter fjalë kyçe.</p>");
        console.log(matches);
      }

    }, 200);
  }

  // font-size controls
  $(".controls button").click(function(){
    if($(this).attr("name")=="inc"){
      $("main.container").find("*").not(".controls, button").each(function(){
        var fs = $(this).css("font-size");
        fs = fs.substr(0, fs.length-2);
        fs++;
        $(this).css("font-size", fs+"px");
      });
    } else if($(this).attr("name")=="dec"){
      $("main.container").find("*").not(".controls, button").each(function(){
        var fs = $(this).css("font-size");
        fs = fs.substr(0, fs.length-2);
        fs--;
        $(this).css("font-size", fs+"px");
      });
    }
  });


  //feedback for website
  setTimeout(function(){
    $(".feedback-popup").css({
      right             : "10px",
      WebkitTransition : 'right 0.5s ease-in-out',
      MozTransition    : 'right 0.5s ease-in-out',
      MsTransition     : 'right 0.5s ease-in-out',
      OTransition      : 'right 0.5s ease-in-out',
      transition       : 'right 0.5s ease-in-out'
    });
    $("#feedback").removeClass("hidden");
  }, 30000);

  $("#later").click(function(){
    $(".feedback-popup").css({
      right             : "-300px",
      WebkitTransition : 'right 0.5s ease-in-out',
      MozTransition    : 'right 0.5s ease-in-out',
      MsTransition     : 'right 0.5s ease-in-out',
      OTransition      : 'right 0.5s ease-in-out',
      transition       : 'right 0.5s ease-in-out'
    });
    $("#feedback").css({
        right             : "-25px",
        WebkitTransition : 'right 0.7s ease-in-out',
        MozTransition    : 'right 0.7s ease-in-out',
        MsTransition     : 'right 0.7s ease-in-out',
        OTransition      : 'right 0.7s ease-in-out',
        transition       : 'right 0.7s ease-in-out'
      });
  });
  $("#feedback").click(function(){
    $(".feedback-popup").css({
      right             : "10px",
      WebkitTransition : 'right 0.5s ease-in-out',
      MozTransition    : 'right 0.5s ease-in-out',
      MsTransition     : 'right 0.5s ease-in-out',
      OTransition      : 'right 0.5s ease-in-out',
      transition       : 'right 0.5s ease-in-out'
    });
    $(this).css({
      right             : "-70px",
      WebkitTransition : 'right 0.1s ease-in-out',
      MozTransition    : 'right 0.1s ease-in-out',
      MsTransition     : 'right 0.1s ease-in-out',
      OTransition      : 'right 0.1s ease-in-out',
      transition       : 'right 0.1s ease-in-out'
    });
  });

  if($(".custom-nav-tabs li").html()!=undefined){
    if(window.location.href.indexOf("#")!=-1){
      var index = window.location.href.substring(window.location.href.indexOf("#")+1, window.location.href.length);
      $(".custom-nav-tabs li:eq("+index+")").addClass("active");
      $("#"+index+"").addClass("active in");
    } else {
      $(".custom-nav-tabs li:first-child").addClass("active");
      $("#0").addClass("active in");
    }
  }

  $(".note").click(function(){
    var $a = $(this).find("a");
    window.location.href = $a.attr("href");
  });

});

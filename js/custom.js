$(document).ready(function(){
  $("#main-categories li").click(function(){
    var data = $(this).attr("data-attr");
    $("div.cat-details").hide();
    $("div[data-id='"+data+"']").fadeIn();
  });
  // var tile = $(".kategori-ligjore").width();

  //merr second child sepse i pari eshte col-md-6
  var tile = $(".kategori-container:nth-child(2)").width();
  $(".kategori-container").height(tile);
  $(".kategori-ligjore").height(tile);

  $(".kategori-details").each(function(){
    $(this).width($(this).parent().width()-20);
    $(this).height($(this).parent().height()-20);
  })

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
  //
  // window.addEventListener("orientationchange", function() {
  //   // Announce the new orientation number
  //   // alert(window.orientation);
  // }, false);
  window.addEventListener("resize", function() {
  	// Get screen size (inner/outerWidth, inner/outerHeight)
    tile = $(".kategori-container:nth-child(2)").width();
    $(".kategori-container").height(tile);
    $(".kategori-ligjore").height(tile);

    $(".kategori-details").each(function(){
      $(this).width($(this).parent().width()-20);
      $(this).height($(this).parent().height()-20);
    })
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
      console.log($("#search-input").offset().top + $("#search-input").css("height").substring(0, 2));
      // var top = substring($("#search-input").offset().top, 0, $("#search-input").offset().top.length-2);
      //top += substring($("#search-input").height(), 0, $("#search-input").height-2);
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
        $("body").append('<div class="alert alert--loading">Sending message…</div>');
      },
      success: function(data) {
        $("body").find('.alert--loading').hide();
        $("body").append('<div class="alert alert--success">Message sent!</div>');
      },
      error: function(err) {
        $("body").find('.alert--loading').hide();
        $("body").append('<div class="alert alert--error">Ops, there was an error.</div>');
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
      for(var i=0; i<matches.length; i++){
        $("#results").append("<p>"+matches[i].title+"</p>");
          console.log(matches[i]);
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
      right             : "50px",
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
      right             : "50px",
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

  if(!window.location.href=="http://localhost:4000/"){

  }

});

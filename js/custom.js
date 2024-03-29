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
    // $(".kategori-container").height(100);
    // $(".kategori-ligjore").height(100);
  }

  $(".kategori-ligjore").mouseup(function(e){
    if(e.which == 1){
      $(this).css("transform", "rotateX( 0deg ) rotateY( 0deg ) translateZ( -30px );");
      var loc = $(this).find(".kategori-details ul li:first a").attr("href");
      window.location.href=loc;
    }
  });


  $(".page-parts-images").height($(".page-parts-images").width());

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
    if($(window).width()<767){
      $(".kategori-container").height(100);
      $(".kategori-ligjore").height(100);
    }
    searchResultsDimensions();
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

  function searchResultsDimensions(){
    $("#search-results").css({
      "top": function(){
        // return $("#search-input").offset().top + +$("#search-input").css("height").substring(0, 2);
        return $(".site-search div.input-group").offset().top + +$(".site-search div.input-group").css("height").substring(0, 2);
      },
      "right": ($(window).width() - ($(".site-search div.input-group").offset().left + $(".site-search div.input-group").outerWidth())),
      "width": function(){
        return $(".site-search div.input-group").width();
        // if($(window).width()>700) { return 526; }
        // else return $(".site-search div.input-group").width();
      }
    });
  }
  searchResultsDimensions();
  $("#search-input").focus(function(){
    if($(window).width()>767){
      $(this).animate({'width': '500px'}, 500, function() { searchResultsDimensions(); });
    }
  });
  $("#search-input").blur(function(){
    if($(window).width()>767){
      $(this).animate({'width': '200px'}, 500, function() { searchResultsDimensions(); });
    }
  });

  $("span.buton-kerkimi").click(function(){
    $(".site-search").submit();
  });

  //submit i formes se kontaktit
  $("#submit-form").click(function() {
    $.ajax({
      url: 'http://formspree.io/njohligjin@gmail.com',
      method: 'POST',
      data: $("#contact-form").serialize(),
      dataType: 'json',
      beforeSend: function() {
        // $("body").append('<div class="alert alert--loading">Sending message…</div>');
      },
      success: function(data) {
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
      url: 'http://formspree.io/njohligjin@gmail.com',
      method: 'POST',
      data: $("#pyetsori-form").serialize(),
      dataType: 'json',
      beforeSend: function() {
      },
      success: function(data) {
        $("#myModal").modal("hide");
        $('#success-modal').modal('show');
        document.cookie="pyetsori=plotesuar";
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

    }, 10);
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
      $(".custom-nav-tabs li:eq("+(index-1)+")").addClass("active");
      console.log(index);
      // setTimeout(function(){
        $(".tab-pane").removeClass("active in");
        $("#"+index+"").addClass("active in");
      // }, 1000);
    } else {
      $(".custom-nav-tabs li:first-child").addClass("active");
      $("#1").addClass("active in");
    }
  }
  $("#link-kategorite").on("click", function(){
    $(".custom-nav-tabs li:eq(0)").removeClass("active");
    $(".custom-nav-tabs li:eq(1)").addClass("active");
  });
  $("li.dropdown").click(function(){
    //alert();
    $("#dropdown-menu").toggle();
  })

  $(".note").click(function(){
    var $a = $(this).find("a");
    window.location.href = $a.attr("href");
  });

  $(".dropdown-menu").width($("#menu ul").width());

  //popullimi dinamik i referencave ligjore
  if(window.location.href.indexOf("puna/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligji Nr. 10237 “Për Sigurinë dhe Shëndetin në Punë“ datë 18.2.2010, i ndryshuar.</li></ul>")
  } 
  else if(window.location.href.indexOf("/puna/siguria-ne-pune/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 7703, datë 11.05.1993, “Për sigurimet shoqërore në Republikën e Shqipërisë”, i ndryshuar.</li></ul>")
  } else if(window.location.href.indexOf("/kodi-rrugor/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 8378, datë 22.07.1998, “Kodi Rrugor i Republikës së Shqipërisë”, i ndyshuar.</li></ul>")
  } else if(window.location.href.indexOf("/mjedisi/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 9774, datë 12.07.2007, “Për vlerësimin dhe administrimin e zhurmës në mjedis”, i ndryshuar.</li><li>Ligjin Nr. 111/2012, datë 15.11.2012, “Për menaxhimin e integruar të burimeve ujore”.</li><li>Ligjin Nr. 10 463, datë 22.09.2011, “Për menaxhimin e integruar të mbetjeve”, i ndryshuar.</li><li>Ligjin Nr. 8897, datë 16.5.2002, “Për mbrojtjen e ajrit nga ndotja”, i ndryshuar</li></ul>")
  } else if(window.location.href.indexOf("/ankimi-administrativ/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 44/2015, datë 30.04.2015, “Kodi i Procedurave Administrative”, i cili hyn në fuqi në maj 2016.</li><li>Ligjin Nr. 49/2012, datë 03.05.2012, “Për organizimin dhe funksionimin e gjykatave administrative dhe gjykimin e mosmarrëveshjeve administrative”, i ndryshuar.</li></ul>")
  } else if(window.location.href.indexOf("/informimi-publik/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligji nr. 146/2014 datë 30.10.2014 “Per njoftimin dhe konsultimin publik“</li></ul>")
  } else if(window.location.href.indexOf("/familja/")!=-1){
    if(window.location.href.indexOf("bashkejetesa")!=-1){
      $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 9062, datë 08.05.2003, “Kodi i Familjes dhe legjislacioni për birësimet i Republikës së Shqipërisë”, i ndryshuar.</li><li>Ligjin Nr. 7850, datë 29.07.1994, “Kodi Civil i Republikës së Shqipërisë”, i ndryshuar.</li></ul>")
    } else if(window.location.href.indexOf("amesia")!=-1){
      $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 9062, datë 08.05.2003, “Kodi i Familjes dhe legjislacioni për birësimet i Republikës së Shqipërisë”, i ndryshuar.</li><li>Ligjin Nr. 10129, datë 11.05.2009, “ Për Gjendjen Civile”, i ndryshuar.</li></ul>")
    }else if(window.location.href.indexOf("biresimi")!=-1){
      $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 9062, datë 08.05.2003, “Kodi i Familjes dhe legjislacioni për birësimet i Republikës së Shqipërisë”, i ndryshuar.</li><li>Ligjin Nr. 9695, datë 19.03.2007, “Për procedurat e birësimit dhe Komitetin Shqiptar të Birësimit”, i ndryshuar.</li></ul>")
    }else if(window.location.href.indexOf("dhuna")!=-1){
      $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 9669, datë 18.12.2006, “Për masa ndaj dhunës në marrëdhëniet familjare”, i ndryshuar.</li></ul>")
    } else {
      $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 9062, datë 08.05.2003, “Kodi i Familjes dhe legjislacioni për birësimet i Republikës së Shqipërisë”, i ndryshuar.</li><li>Ligjin Nr. 10129, datë 11.05.2009, “Për Gjendjen Civile”, i ndryshuar.</li></ul>")
    }
  } else if(window.location.href.indexOf("/ndihma-juridike/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligji Nr. 111/2017 “Për Ndihmën Juridike të Garantuar nga Shteti”.”, i ndryshuar.</li></ul>")
  } else if(window.location.href.indexOf("/konsumatori/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 9902, datë 17.4.2008, “Për mbrojtjen e konsumatorëve”, i ndryshuar.</li><li>Ligjin Nr. 9779, datë 16.7.2007, ”Për sigurinë e përgjithshme, kërkesat thelbësore dhe vlerësimin e konformitetit të produkteve joushqimore”, i ndryshuar.</li></ul>")
  } else if(window.location.href.indexOf("/pasuria-e-paluajtshme/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>•	Ligji 111/2018 date 07.02.2019, “Per Kadastren”.</li></ul>")
  } else if(window.location.href.indexOf("/bashkepronesia-ne-ndertesa/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 10112, datë 09.04.2009, “Për administrimin e bashkëpronësisë në ndërtesat e banimit”.</li></ul>")
  } else if(window.location.href.indexOf("/tatimet-dhe-taksat/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 9920, datë 19.05.2008, “Për procedurat tatimore në Republikën e Shqipërisë”, i ndryshuar.</li><li>Ligjin Nr. 9975, datë 28.07.2008, “Për taksat kombëtare”, i ndryshuar.</li><li>Ligjin Nr. 8438, datë 28.12.1998, “Për tatimin mbi të ardhurat”, i ndryshuar.</li><li>Ligjin Nr. 9632, datë 30.10.2006, “Për sistemin e taksave vendore”, i ndryshuar.</li></ul>")
  } else if(window.location.href.indexOf("/procesi-civil/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 8116, datë 29.03.1996, “Kodi i Procedurës Civile i Republikës së Shqipërisë”, i ndryshuar.</li></ul>")
  } else if(window.location.href.indexOf("/shkaktimi-i-demit/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligjin Nr. 7850, datë 29.07.1994, “Kodi Civil i Republikës së Shqipërisë”, i ndryshuar.</li><li>Ligjin Nr. 9109, datë 17.07.2003, “Për profesionin e avokatit në Republikën e Shqipërisë”, i ndryshuar.</li></ul>")
  } else if(window.location.href.indexOf("/sigurimet-shoqerore/pensionet/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligji nr. 7703, datë 11.05.1993 “Për sigurimet shoqërore në Republikën e Shqipërisë”, i ndryshuar. • Ligji Nr.9136, Datë 11.9.2003, “Për Mbledhjen e Kontributeve të Detyrueshme të Sigurimeve Shoqërore dhe Shëndetësore në Republikën e Shqipërisë”.</li><li>Ligji Nr.10383, Datë 24.2.2011, “Për Sigurimin e Detyrueshëm të Kujdesit Shëndetësor në Republikën e Shqipërisë” i ndryshuar.</li><li>Ligj Nr. 9705, Datë 02.04.2007, “Për Faljen e Kamatëvonesave të Papaguara të Kontributeve të Sigurimeve të Detyrueshme Shoqërore Dhe Shëndetësore”.</li></ul>")
  } else if(window.location.href.indexOf("/diskriminimi/")!=-1){
    $(".legal-reference").html("Bazuar në: <ul><li>Ligji nr. 10 221 datë 04.02.2010 “Për mbrojtjen nga diskriminimi” i ndryshuar.</li></ul>")
  }
  

  //korrigjimi i emrit te kategorive duke shtuar ë
  if($("span.kat a").length > 0){
    if($("span.kat a").text()=="Sigurimet shoqerore"){
      $("span.kat a").text("Sigurimet shoqërore");
    } else if($("span.kat a").text()=="Bashkepronesia ne ndertesa"){
       $("span.kat a").text("Bashkëpronësia në ndërtesa");
    } else if($("span.kat a").text()=="Procesi gjyqesor civil"){
       $("span.kat a").text("Procesi gjyqësor civil");
    }
  }

  if($(window).width()<767){
    // var submenu = $("#dropdown-menu").clone();
    // submenu.wrap("<div></div>");
    // console.log(submenu.html());
    // $("#dropdown-menu").remove();
    // $("li.dropdown").after(submenu);
  }

});

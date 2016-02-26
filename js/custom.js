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
    $("#search-input").val(q);
    setTimeout(function(){
      var matches = repository.search(q);
      for(var i=0; i<matches.length; i++){
        $("#results").append("<p>"+matches[i].title+"</p>");
          console.log(matches[i]);
      }
    }, 1000);
  }


  function search(crit){
    console.log("Gotcha!");
    if( !crit ){
      return []
    }
    return findMatches(data,crit,opt.searchStrategy,opt)
  }

  function setOptions(_opt){
    opt = _opt || {}

    opt.fuzzy = _opt.fuzzy || false
    opt.limit = _opt.limit || 10
    opt.searchStrategy = _opt.fuzzy ? FuzzySearchStrategy : LiteralSearchStrategy
  }

  function findMatches(data,crit,strategy,opt){
    var matches = []
    for(var i = 0; i < data.length && matches.length < opt.limit; i++) {
      var match = findMatchesInObject(data[i],crit,strategy,opt)
      if( match ){
        matches.push(match)
      }
    }
    return matches
  }

  function findMatchesInObject(obj,crit,strategy,opt){
    for(var key in obj) {
      if( !isExcluded(obj[key], opt.exclude) && strategy.matches(obj[key], crit) ){
        return obj
      }
    }
  }

  function isExcluded(term, excludedTerms){
    var excluded = false
    excludedTerms = excludedTerms || []
    for (var i = 0; i<excludedTerms.length; i++) {
      var excludedTerm = excludedTerms[i]
      if( !excluded && new RegExp(term).test(excludedTerm) ){
        excluded = true
      }
    }
    return excluded
  }

});

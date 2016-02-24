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

});

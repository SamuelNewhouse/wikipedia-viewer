$(document).ready(function() {
  $("#userSearchInp").keypress( function(e) {
    if (e.which=="13")
      doSearch();
  });
  $("#userSearchBut").on("click", function() {
    doSearch();
  });
  $("#randomSearch").on("click", function() {
    doRandomSearch();
  });
  
  function getAndDisplay(url) {
    $("#resultsDiv").html("");
    var resultsDiv = document.getElementById("resultsDiv");
    
    $.getJSON(url, function(result) {
      var pages = result.query.pages;
      for (var k in pages) {
        if (pages.hasOwnProperty(k)) {          
          var title = pages[k].title;
          var extract = pages[k].extract;
          var url = "http://www.wikipedia.com/wiki/" + title;
          var panelHTML =
            '<div class="outBox">' +
              '<div class="headingBox">' +
                '<h3><a href="' + url + '" target="_blank">' + title + "</a></h3>" +
              "</div>" +
              '<div class="bodyBox">' + extract +            
              '</div>';
            '</div>';
          resultsDiv.insertAdjacentHTML("beforeend", panelHTML);
        }
      }
    });
  }
  
  function doSearch() {
    if( !$("#userSearchInp").val() )
      return;    
    var url =
      "https://en.wikipedia.org/w/api.php" +
      "?format=json&action=query&generator=search&prop=extracts" +
      "&gsrlimit=10&pilimit=max&exintro&explaintext&exchars=500&exlimit=max" +
      "&origin=*&gsrsearch=" + $("#userSearchInp").val();
    getAndDisplay(url);
  }
  
  function doRandomSearch() {  
    var url =
      "https://en.wikipedia.org/w/api.php" +
      "?format=json&action=query&generator=random&grnnamespace=0&prop=extracts" +
      "&grnlimit=10&pilimit=max&exintro&explaintext&exchars=500&exlimit=max" +
      "&origin=*";
    getAndDisplay(url);
  }
});
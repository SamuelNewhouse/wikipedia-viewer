$(function () {
  $("#search-input").keypress(function (e) {
    if (e.which == "13")
      doSearch();
  });
  $("#search-button").on("click", function () {
    doSearch();
  });
  $("#random-search").on("click", function () {
    doRandomSearch();
  });
  $("#results").on("click", ".search-title", function () {
    doTitleSearch(this.value);
  });


  function getAndDisplay(url) {
    $("#results").html("");
    var resultsDiv = document.getElementById("results");

    $.getJSON(url, function (result) {
      var pages = result.query.pages;
      for (var k in pages) {
        if (pages.hasOwnProperty(k)) {
          var title = pages[k].title;
          var extract = pages[k].extract;
          var url = "http://www.wikipedia.com/wiki/" + title;
          var panelHTML =
            '<div class="out-box">' +
              '<div class="heading-box">' +
                '<h3><a class="extra-hover" href="' + url + '" target="_blank">' + title + "</a></h3>" +
                '<button type="button" class="btn btn-secondary search-title" value="' + title + '">&larr; search title</button>' +
              "</div>" +
            '<div class="body-box">' +
              extract +
            '</div>';
          '</div>';
          resultsDiv.insertAdjacentHTML("beforeend", panelHTML);
        }
      }
    });
  }

  function doSearch() {
    if (!$("#search-input").val())
      return;
    var url =
      "https://en.wikipedia.org/w/api.php" +
      "?format=json&action=query&generator=search&prop=extracts" +
      "&gsrlimit=10&pilimit=max&exintro&explaintext&exchars=500&exlimit=max" +
      "&origin=*&gsrsearch=" + $("#search-input").val();
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

  function doTitleSearch(value) {
    if (!value)
      return;
    var url =
      "https://en.wikipedia.org/w/api.php" +
      "?format=json&action=query&generator=search&prop=extracts" +
      "&gsrlimit=10&pilimit=max&exintro&explaintext&exchars=500&exlimit=max" +
      "&origin=*&gsrsearch=" + value;
    getAndDisplay(url);
  }
});
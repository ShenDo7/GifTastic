$(document).ready(function () {
  //1 make var composed of own array to personal taste
  let arr = ["cat", "dog", "bird", "lion"];
  //2 create function that takes array and creates buttons for each element on the DOM
  function gifer(arr) {
    $(".gifbtn").html("");
    arr.forEach(function (animal) {
      console.log(animal);
      $(".gifbtn").append(
        `<button class='animal' keyword='${animal}'>${animal}</button>`
      );
    });
  }

  gifer(arr);

  //3 create function that runs when button clicked - hit up API and grab 10 GIFs display statically on DOM
  $(document).on("click", ".animal", function (e) {
    console.log(e.target.getAttribute("keyword"));
    let APIkey = "1frPvNUYUl1jwAYUTiFpH9aJE8G7Qa2O";
    let gifArr = [];
    let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${e.target.getAttribute(
      "keyword"
    )}&limit=10`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (result) {
      console.log(result);
      result.data.forEach(function (gif) {
        gifArr.push({
          urlStill: gif.images.fixed_width_still.url,
          urlAnimate: gif.images.fixed_width.url,
          rating: gif.rating
        });
      });
      console.log(gifArr);
      gifArr.forEach(function (gif) {
        $(".gifDisplay").append(
          `<div class="imgdiv"><img class="clickable" urlStill = ${
          gif.urlStill
          } urlAnimate =${gif.urlAnimate} data-state="still" src=${
          gif.urlStill
          } style="width:200px, height:auto">
          <h1 class="rating">Rating : ${gif.rating}</h1></div>
          `
        );
      });
      $(document).on("click", ".clickable", function () {
        console.log($(this).attr("data-state"));
        if ($(this).attr("data-state") === "still") {
          $(this).attr("data-state", "animate");
          $(this).attr("src", $(this).attr("urlAnimate"));
        } else {
          $(this).attr("data-state", "still");
          $(this).attr("src", $(this).attr("urlStill"));
        }
      });
    });
  });
  //4 when GIF is clicked, start animation, when clicked again, stop animation

  //5 display rating of Gif

  //6 add form to page that takes user input on search word
  $(".btn-primary").on("click", function (e) {
    e.preventDefault();
    let newWord = $("#keyword")
      .val()
      .trim();
    if (arr.includes(newWord) || newWord.length < 1) {
      return null;
    } else {
      arr.push(newWord);
      gifer(arr);
      $("#keyword").val("");
    }
  });
});

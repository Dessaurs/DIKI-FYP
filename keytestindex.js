const catYellow = "#f9e2af";
const catBlue = "#1e66f5";

// KEYCAP COLORS
function allBlackKeycap() {
  $(".keycap-style").css("background-color", "black");
  $(".keycap-style").css("color", "white");
}

function allWhiteKeycap() {
  $(".keycap-style").css("background-color", "white");
  $(".keycap-style").css("color", "black");
}

function singleYellowKeycap(e) {
  $("#" + e.code).css("background-color", catYellow);
  $("#" + e.code).css("color", "black");
}

function singleBlueKeycap(e) {
  $("#" + e.code).css("background-color", catBlue);
  $("#" + e.code).css("color", "white");
}

// TIMEOUT BUTTON
let timeout = true;
$("#timeout").click(function (e) {
  $(this).toggleClass("disabled-button");
  if (timeout) {
    $(this).html("Timeout OFF");
  } else {
    $(this).html("Timeout ON");
  }
  if (timeout) {
    allBlackKeycap();
  } else {
    allWhiteKeycap();
  }
  timeout = !timeout;
});

// KEYCAP PRESSED
$(document).keydown(function (e) {
  e.preventDefault();
  if (timeout) {
    singleYellowKeycap(e);
  } else {
    singleBlueKeycap(e);
  }

  console.log("Key: " + e.code + " Code: " + e.keyCode);
});

// KEYCAP NOT PRESSED
$(document).keyup(function (e) {
  if (timeout) {
    allWhiteKeycap();
  }
});

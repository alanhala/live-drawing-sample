$(document).ready(function() {
  paint = [];
  points = [];
  var canvas = $("#myCanvas");
  var context = canvas.get(0).getContext("2d");
  var clicked = false;

  function sendPoints() {
    $.ajax({
      url: "/drawings",
      method: "post",
      data: { points: points }
    });
    points = [];
  }

  canvas.mousedown(function(event) {
    clicked = true;
  });
  canvas.mousemove(function(event) {
    if (clicked) {
      points.push({ x: event.clientX, y: event.clientY });
    }
  });
  canvas.mouseup(function(event) {
    clicked = false;
    sendPoints();
  });
});

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
  }

  canvas.mousedown(function(event) {
    context.beginPath();
    context.moveTo(event.clientX, event.clientY);
    clicked = true;
  });
  canvas.mousemove(function(event) {
    if (clicked) {
      context.lineTo(event.clientX, event.clientY);
      points.push({ x: event.clientX, y: event.clientY });
      context.stroke();
    }
  });
  canvas.mouseup(function(event) {
    clicked = false;
    sendPoints();
  });
});

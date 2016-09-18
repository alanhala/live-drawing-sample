$(document).ready(function() {
  var canvas = $("#myCanvas")
  var context = canvas.get(0).getContext("2d");
  var clicked = false;

  function drawPoint(x, y) {
    context.lineTo(x, y);
    context.stroke();
  }

  function sendPoint(move_phase, x, y) {
    App.drawingsChannel.send({ move_phase: move_phase, x: x, y: y });
  }

  App.drawingsChannel = App.cable.subscriptions.create({
    channel: "DrawingsChannel",
    room: "Test"
  }, {
    received: function(data) {
      if (data["move_phase"] == "start") {
        context.beginPath();
        context.moveTo(data["x"], data["y"]);
      } else if (data["move_phase"] == "move") {
        drawPoint(data["x"], data["y"]);
      }
    }
  });

  canvas.mousedown(function(event) {
    clicked = true;
    sendPoint("start", event.clientX, event.clientY);
  });
  canvas.mousemove(function(event) {
    if (clicked) {
      sendPoint("move", event.clientX, event.clientY);
    }
  });
  canvas.mouseup(function(event) {
    clicked = false;
    sendPoint("end", 0, 0);
  });
});

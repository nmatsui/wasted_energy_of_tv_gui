define(["jquery", "jcanvas"], function($) {
  "use strict";
  function decideColor(item) {
    if (item.count === 0) {
      return "hsl(0, 0%, 50%)";
    }
    else {
      var hue = Math.round(item.val / item.count) * 60 - 60;
      return "hsl(" + hue + ", 80%, 50%)";
    }
  }

  return {
    clearChart: function($wrapper, $canvas) {
      console.log("clearChart");
      var w = $wrapper.width();
      var h = $wrapper.height();
      $canvas.attr({"width":w, "height":h});
      $canvas.width(w);
      $canvas.height(h);
      $canvas.clearCanvas();
    },
    loading: function($canvas) {
      console.log("loading");
      var color = "hsl(0, 0%, 10%)";
      $canvas.drawText({
        fillStyle: color,
        fontSize: 24,
        fontFamily: "Arial",
        align: "left",
        respectAlign: true,
        x: 10,
        y: 20,
        text: "now loading..."
      });
    },
    drawChart: function($canvas, watchedList) {
      console.log("showChart");
      var w = $canvas.width();
      var h = $canvas.height();
      var uw = 1;

      $canvas.clearCanvas();

      $.each(watchedList, function(i, item) {
        $canvas.drawRect({
          fillStyle: decideColor(item),
          x: uw * i,
          y: 0,
          width: uw,
          height: h/2,
          fromCenter: false
        }); 
        if (i % 30 === 0) {
          var color = "hsl(0, 0%, 10%)";
          $canvas.drawLine({
            strokeStyle: color,
            strokeWidth: 1,
            x1: uw * i, y1: h/2 - 5,
            x2: uw * i, y2: h/2 + 5
          });
          $canvas.drawText({
            fillStyle: color,
            fontSize: 12,
            fontFamily: "Arial",
            align: "left",
            respectAlign: true,
            x: uw * i,
            y: h/2 + 15,
            text: "" + i / 30 + "時"
          });
        }
      });
    }
  };
});

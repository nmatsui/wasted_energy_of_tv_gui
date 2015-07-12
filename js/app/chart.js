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

  function getOffset(w, h, i) {
    var offset = {};
    var result = {};
    if (720 <= w) {
      offset = {x1:0, y1:0, x2:0, y2:0, x3:0, y3:0, x4:0, y4:0};
      result.h = h/2;
      result.m = (w - 720)/2;
    }
    else if (360 <= w && w < 720) {
      offset = {x1:0, y1:0, x2:0, y2:0, x3:-360, y3:h/2, x4:-360, y4:h/2};
      result.h = h/4;
      result.m = (w - 360)/2;
    }
    else {
      offset = {x1:0, y1:0, x2:-180, y2:h/4, x3:-360, y3:h/2, x4:-540, y4:h*3/4};
      result.h = h/8;
      result.m = (w - 180)/2;
    }

    if (0 <= i && i < 180) {
      result.x = offset.x1;
      result.y = offset.y1;
    }
    else if (180 <= i && i < 360) {
      result.x = offset.x2;
      result.y = offset.y2;
    }
    else if (360 <= i && i < 540) {
      result.x = offset.x3;
      result.y = offset.y3;
    }
    else {
      result.x = offset.x4;
      result.y = offset.y4;
    }
    return result;
  }

  return {
    clearChart: function($wrapper, $canvas) {
      var w = $wrapper.width();
      var h = $wrapper.height();
      $canvas.attr({"width":w, "height":h});
      $canvas.width(w);
      $canvas.height(h);
      $canvas.clearCanvas();
    },
    loading: function($canvas) {
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
      var w = $canvas.width();
      var h = $canvas.height();

      $canvas.clearCanvas();

      $.each(watchedList, function(i, item) {
        var offset = getOffset(w, h, i);

        $canvas.drawRect({
          fillStyle: decideColor(item),
          x: i + offset.x + offset.m,
          y: 0 + offset.y,
          width: 1,
          height: offset.h,
          fromCenter: false
        }); 
        if (i % 30 === 0) {
          var color = "hsl(0, 0%, 10%)";
          $canvas.drawLine({
            strokeStyle: color,
            strokeWidth: 1,
            x1: i + offset.x + offset.m, y1: offset.y + offset.h - 5,
            x2: i + offset.x + offset.m, y2: offset.y + offset.h + 5
          });
          $canvas.drawText({
            fillStyle: color,
            fontSize: 12,
            fontFamily: "Arial",
            align: "left",
            respectAlign: true,
            x: i + offset.x + offset.m,
            y: offset.y + offset.h + 15,
            text: "" + i / 30 + "時"
          });
        }
      });
    }
  };
});

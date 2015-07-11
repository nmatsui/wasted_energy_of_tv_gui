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
    drawChart: function($wrapper, $canvas, watchedList) {
      console.log("showChart");
      var w = $wrapper.width();
      var h = $wrapper.height();

      $canvas.attr({"width":w, "height":h});
      $canvas.width(w);
      $canvas.height(h);

      $canvas.clearCanvas();

      var uw = Math.round(w/watchedList.length);

      $.each(watchedList, function(i, item) {
        $canvas.drawRect({
          fillStyle: decideColor(item),
          x: uw * i,
          y: 0,
          width: uw,
          height: h,
          fromCenter: false
        }); 
      });
    }
  };
});

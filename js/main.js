$(function() {
  "use strict";
  var form_cnt = 1;

  function insertFunc($e) {
    $e.on("submit", showChart)
      .find(".remove_form_btn").on("click", removeForm);
    $e.find(".target_date").datepicker({
         format: "yyyy/mm/dd",
         orientation: "top auto",
         autoclose: true,
         todayHighlight: true
    });
  }

  $("#duplicate_form_btn").on("click", function() {
    console.log("duplicate form");
    var $original = $("#datepick_form_1");
    var $last = $(".datepick_form:last");
    form_cnt++;
    
    var $clone = $original.clone().insertAfter($last);
    $clone.attr("id", "datepick_form_" + form_cnt)
          .find("*").each(function(ignore_1, e) {
            $.each(["id", "name", "for"], function(ignore_2, item) {
              var attr = $(e).attr(item);
              if (attr) {
                $(e).attr(item, attr.replace(/_[0-9]+$/, "_" + form_cnt));
                $(e).val("");
              }
            });
          });
    $clone.find(".remove_form_btn").removeAttr("disabled");

    insertFunc($clone);
  });

  insertFunc($(".datepick_form"));
});

function showChart(e) {
  "use strict";
  console.log("showChart");
  var $target = $(e.target);
  var pickedDate = $target.find(".target_date").val();
  if (pickedDate && $.trim(pickedDate) !== "") {
    console.log("pickedDate=" + pickedDate);
    var $wrapper = $target.find(".chart");
    var $canvas = $target.find(".chart canvas");
    var watchedList = getWatchedList(pickedDate);
    drawChart($wrapper, $canvas, watchedList);
  }
  return false;
}

function removeForm(e) {
  "use strict";
  console.log("removeForm");
  e.target.closest("form").remove();
}

function getWatchedList(targetDate) {
  "use strict";
  console.log("getWatchedList");
  return testData;
}

function drawChart($wrapper, $canvas, watchedList) {
  "use strict";
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

function decideColor(item) {
  "use strict";
  var hue;
  if (item.count === 0) {
    return "hsl(0, 0%, 50%)";
  }
  else {
    hue = Math.round(item.val / item.count) * 60 - 60;
    return "hsl(" + hue + ", 80%, 50%)";
  }
}

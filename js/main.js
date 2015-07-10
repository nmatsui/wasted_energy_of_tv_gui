$(function() {
  "use strict";
  var form_cnt = 1;

  function insertFunc(element) {
    element.on("submit", showChart)
           .find(".remove_form_btn").on("click", removeForm);
    element.find(".target_date").datepicker({
             format: "yyyy/mm/dd",
             orientation: "top auto",
             autoclose: true,
             todayHighlight: true
           });
  }

  insertFunc($(".datepick_form"));

  $("#duplicate_form_btn").on("click", function() {
    console.log("duplicate form");
    var original = $("#datepick_form_1");
    var last = $(".datepick_form:last");
    form_cnt++;
    
    var clone = $(original).clone().insertAfter(last);
    $(clone).attr("id", "datepick_form_" + form_cnt)
            .find("*").each(function(i, elem) {
              $.each(["id", "name", "for"], function(j, item) {
                if ($(elem).attr(item)) {
                  $(elem).attr(item, $(elem).attr(item).replace(/_[0-9]+$/, "_" + form_cnt)).val("");
                }
              });
            });
    $(clone).find(".remove_form_btn").removeAttr("disabled");

    insertFunc($(clone));
  });

  function showChart(e) {
    console.log("showChart");
    console.log($(e.target).find(".target_date").val());
    var pickedDate = $(e.target).find(".target_date").val();
    if (pickedDate && $.trim(pickedDate) !== "") {
      console.log("pickedDate=" + pickedDate);
      var watchedList = getWatchedList(pickedDate);
      var wrapper = $(e.target).find(".chart");
      var canvas = $(e.target).find(".chart canvas");
      drawChart(wrapper, canvas, watchedList);
    }
    return false;
  }

  function removeForm(e) {
    console.log("removeForm");
    e.target.closest("form").remove();
  }

  function getWatchedList(targetDate) {
    console.log("getWatchedList");
    return testData;
  }

  function drawChart(wrapper, canvas, watchedList) {
    console.log("showChart");
    var w = wrapper.width();
    var h = wrapper.height();

    canvas.attr({"width":w, "height":h});
    canvas.width(w);
    canvas.height(h);

    canvas.clearCanvas();

    var uw = Math.round(w/watchedList.length);

    $.each(watchedList, function(i, item) {
      canvas.drawRect({
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
    var hue;
    if (item.count === 0) {
      return "hsl(0, 0%, 0%)";
    }
    else {
      hue = Math.round(item.val / item.count) * 60 - 60;
      return "hsl(" + hue + ", 100%, 50%)";
    }
  }
});

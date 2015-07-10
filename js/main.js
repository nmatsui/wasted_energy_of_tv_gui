$(function() {
  var form_cnt = 1;

  $.isBlank = function(obj) {
    return (!obj || $.trim(obj) === "");
  };

  insertFunc($(".datepick_form"));

  $("#add_form_btn").click(function() {
    console.log("add form");
    var original = $("#datepick_form_" + form_cnt);
    form_cnt++;
    
    var clone = $(original).clone().insertAfter(original);
    $(clone).attr("id", "datepick_form_" + form_cnt)
            .find("*").each(function(i, elem) {
              $.each(["id", "name", "for"], function(j, item) {
                if ($(elem).attr(item)) {
                  $(elem).attr(item, $(elem).attr(item).replace(/_[0-9]+$/, "_" + form_cnt)).val("");
                }
              });
            });

    insertFunc($(clone));
  });

  function insertFunc(element) {
    element.on("submit", showChart)
           .find(".target_date").datepicker({
             format: "yyyy/mm/dd",
             orientation: "top auto",
             autoclose: true,
             todayHighlight: true
           });
  }

  function showChart() {
    console.log(".datepick_form submit");
    console.log($(this).find(".target_date").val());
    var pickedDate = $(this).find(".target_date").val();
    if (!($.isBlank(pickedDate))) {
      console.log("pickedDate=" + pickedDate);
      watchedList = getWatchedList(pickedDate);
      wrapper = $(this).find(".chart")
      canvas = $(this).find(".chart canvas")
      drawChart(wrapper, canvas, watchedList);
    }
    return false;
  }

  function getWatchedList(targetDate) {
    console.log("getWatchedList");
    return testData;
  }

  function drawChart(wrapper, canvas, watchedList) {
    console.log("showChart");
    var w = wrapper.width();
    var h = wrapper.height();
    console.log("w:" + w + ":h:" + h);

    canvas.attr({"width":w, "height":h});
    canvas.width(w);
    canvas.height(h);

    canvas.clearCanvas();

    var uw = Math.round(w/watchedList.length);
    console.log(uw);

    $.each(watchedList, function(i, item) {
      canvas.drawRect({
        fillStyle: "rgb(" + i + "," + i + "," + i + ")",
        x: uw * i,
        y: 0,
        width: uw,
        height: h,
        fromCenter: false
      }); 
    });
  }
});

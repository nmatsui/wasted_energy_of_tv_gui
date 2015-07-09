$(function() {
  $.isBlank = function(obj) {
    return (!obj || $.trim(obj) === "");
  };

  $(".datepick_form .target_date").datepicker({
    format: "yyyy/mm/dd",
    orientation: "top auto",
    autoclose: true,
    todayHighlight: true
  });

  $(".datepick_form").submit(function() {
    console.log(".datepick_form submit");
    console.log($(this).find(".target_date").val());
    var pickedDate = $(this).find(".target_date").val();
    if (!($.isBlank(pickedDate))) {
      console.log("pickedDate=" + pickedDate);
      watchedList = getWatchedList(pickedDate);
      wrapper = $(this).find(".chart")
      canvas = $(this).find(".chart canvas")
      showChart(wrapper, canvas, watchedList);
    }
    return false;
  });

  function getWatchedList(targetDate) {
    console.log("getWatchedList");
    return testData;
  }

  function showChart(wrapper, canvas, watchedList) {
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

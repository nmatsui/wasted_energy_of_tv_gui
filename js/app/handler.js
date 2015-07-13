define(["jquery", "app/chart", "app/ajax"], function($, chart, ajax) {
  "use strict";
  return {
    showChart: function($e) {
      var $target = $($e.target);
      var pickedDate = $target.find(".target_date").val();
      if (pickedDate && $.trim(pickedDate) !== "") {
        var $wrapper = $target.find(".chart");
        var $canvas = $target.find(".chart canvas");
        chart.clearChart($wrapper, $canvas);
        chart.loading($canvas);
        var watchedList = ajax.getWatchedList(pickedDate);
        chart.drawChart($canvas, watchedList);
      }
      return false;
    },
    removeForm: function($e) {
      var formid = $($e.target).attr("formid");
      $("#"+formid).remove();
      //$e.target.closest("form").remove();
    }
  };
});

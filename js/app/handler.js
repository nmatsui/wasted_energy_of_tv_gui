define(["jquery", "app/chart", "app/ajax"], function($, chart, ajax) {
  "use strict";
  return {
    showChart: function($e) {
      var $target = $($e.target);
      var pickedDate = $target.find(".target_date").val();
      if (pickedDate && $.trim(pickedDate) !== "") {
        console.log("pickedDate=" + pickedDate);
        var $wrapper = $target.find(".chart");
        var $canvas = $target.find(".chart canvas");
        var watchedList = ajax.getWatchedList(pickedDate);
        chart.drawChart($wrapper, $canvas, watchedList);
      }
      return false;
    },
    removeForm: function($e) {
      console.log("removeForm");
      $e.target.closest("form").remove();
    }
  };
});

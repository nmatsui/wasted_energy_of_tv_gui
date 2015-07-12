define(["jquery"], function($) {
  "use strict";

  var ENDPOINT = "http://wasted-energy-of-tv-iot.mybluemix.net/day_data";

  function getDateData(startDate, endDate) {
    var result;
    $.ajax({
      type: "GET",
      url: ENDPOINT,
      dataType: "json",
      async: false,
      data: {
        "st": formatISODate(startDate),
        "ed": formatISODate(endDate)
      }
    }).done(function (data) {
      result = data;
    });
    return result;
  }

  function formatISODate(dt) {
    var yyyy = dt.getFullYear();
    var mm = dt.getMonth() + 1;
    var dd = dt.getDate();
    var hh = dt.getHours();
    var mi = dt.getMinutes();
    var ss = dt.getSeconds();
    var pad = function(num) {
      var norm = Math.abs(Math.floor(num));
      return (norm < 10 ? '0' : '') + norm;
    };
    var datestr = yyyy + "-" + pad(mm) + "-" + pad(dd);
    var timestr = pad(hh) + ":" + pad(mi) + ":" + pad(ss);
    return datestr + "T" + timestr + "+09:00";
  }
  
  return {
    getWatchedList: function(targetDate) {
      var startDate = new Date(targetDate + "T00:00:00+09:00");
      var endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      var result = getDateData(startDate, endDate);
      return result;
    }
  };
});

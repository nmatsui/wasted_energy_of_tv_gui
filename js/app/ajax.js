define(["jquery"], function($) {
  "use strict";

  var ENDPOINT_DAY_DATA = "http://wasted-energy-of-tv-iot.mybluemix.net/day_data";
  var ENDPOINT_CONFIG = "http://wasted-energy-of-tv-iot.mybluemix.net/config";

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
    getWatchedList: function(targetDate, drawFunc, $drawElem) {
      var startDate = new Date(targetDate + "T00:00:00+09:00");
      var endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      $.ajax({
        type: "GET",
        url: ENDPOINT_DAY_DATA,
        dataType: "json",
        data: {
          "st": formatISODate(startDate),
          "ed": formatISODate(endDate)
        }
      }).done(function (data) {
        drawFunc($drawElem, data);
      });
    },
    getConfig: function(callback) {
      $.ajax({
        type: "GET",
        url: ENDPOINT_CONFIG
      }).done(function (data) {
        callback(data);
      });
    },
    postConfig: function(data) {
      $.ajax({
        type: "POST",
        url: ENDPOINT_CONFIG,
        data: data
      }).done(function(data) {
        console.log(data);
      });
    }
  };
});

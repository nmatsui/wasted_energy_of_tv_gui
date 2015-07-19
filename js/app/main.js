define(["jquery", "app/handler", "app/ajax", "bootstrap", "datepicker"], function($, handler, ajax) {
  "use strict";
  $(function() {
    var form_cnt = 1;

    function setHandler($e) {
      $e.on("submit", handler.showChart)
        .find(".remove_form_btn").on("click", handler.removeForm).end()
        .find(".target_date").datepicker({
           format: "yyyy-mm-dd",
           orientation: "top auto",
           autoclose: true,
           todayHighlight: true
      });
    }

    setHandler($(".datepick_form"));

    function setAutoPoweroffPeriod(period) {
      console.log(period);
      var msg = "";
      if (period.enable) {
        msg = period.minutes + " minutes";
        $("#auto_poweroff_minutes").val(period.minutes);
        $("#auto_poweroff_label_true").addClass("active");
        $("#auto_poweroff_label_false").removeClass("active");
        $("input[name=auto_poweroff_options]:eq(0)").prop("checked", true);
      }
      else {
        msg = "disabled";
        $("#auto_poweroff_minutes").val("");
        $("#auto_poweroff_label_true").removeClass("active");
        $("#auto_poweroff_label_false").addClass("active");
        $("input[name=auto_poweroff_options]:eq(1)").prop("checked", true);
      }
      $("#auto_poweroff_indicator").html(msg);
    }

    ajax.getConfig(function(data) {
      setAutoPoweroffPeriod(data.period);
    });

    $("#duplicate_form_btn").on("click", function() {
      var $original = $("#datepick_form_1");
      var $last = $(".datepick_form:last");
      form_cnt++;
      
      var $clone = $original.clone().insertAfter($last);
      $clone.attr("id", "datepick_form_" + form_cnt)
            .find("*").each(function(ignore_1, e) {
              $.each(["id", "name", "for","formid"], function(ignore_2, item) {
                var attr = $(e).attr(item);
                if (attr) {
                  $(e).attr(item, attr.replace(/_[0-9]+$/, "_" + form_cnt));
                  $(e).val("");
                }
              });
            });
      $clone.find(".remove_form_btn").removeAttr("disabled");
      setHandler($clone);
    });
    
    $("#auto_poweroff_submit").on("click", function() {
      var enable = ($("input[name=auto_poweroff_options]:checked").val() === "true") ? true : false;
      var minutes = $("#auto_poweroff_minutes").val();
      if (enable && !minutes.match(/^\d+$/)) {
        $("#auto_poweroff_alert").html("input positive integer").show();
        return;
      }

      var msg = {period:{}};
      msg.period.enable = enable;
      if (enable) {
        msg.period.minutes = minutes;
      }
      ajax.postConfig(msg);
      setAutoPoweroffPeriod(msg.period);
      $("#auto_poweroff_alert").html("").hide();
      $("#auto_poweroff_modal").modal("hide");
    });
  });
});

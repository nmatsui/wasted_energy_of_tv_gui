define(["jquery", "app/handler", "bootstrap", "datepicker"], function($, handler) {
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
  });
});

$(function() {
  $.isBlank = function(obj) {
    return (!obj || $.trim(obj) === "");
  };

  $("#target_date").datepicker({
    format: "yyyy/mm/dd",
    orientation: "top auto",
    autoclose: true,
    todayHighlight: true
  });

  $("#datepick_form").submit(function() {
    var picked = $("#target_date").val();
    if (!($.isBlank(picked))) {
      console.log(picked);
    }
    return true;
  });
});

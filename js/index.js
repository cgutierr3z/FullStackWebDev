
$(function(){
  $("[data-toggle='tooltip']").tooltip();
  $("[data-toggle='popover']").popover();
  $(".carousel").carousel({
    interval: 3333
  });

  $('#exampleModal').on('show.bs.modal', function(event){
    console.log('modal is show, button is disabled');

    $('#contactoBtn').removeClass('btn-outline-success');
    $('#contactoBtn').addClass('btn-primary');
    $('#contactoBtn').prop('disabled', true)
  })

  $('#exampleModal').on('hidden.bs.modal', function(event){
    console.log('modal is hidden, button is enabled');

    $('#contactoBtn').removeClass('btn-primary');
    $('#contactoBtn').addClass('btn-outline-success');
    $('#contactoBtn').prop('disabled', false)
  })

});

$( document ).ready(function() {
  function toggleMenu() {
      $('#floating-menu').toggleClass('hide');
  };
  function toggleHide(id) {
      $(id).toggleClass('hide');
  };
  function toggleDisplay(id) {
      $(id).css('display:block');
  };
    if (screen.width <= 375){
        $('#icon').click(function() {
            $(this).toggleClass('open');
            $('#mobile-menu').toggleClass('hide');
        });
        $('#mobile-menu').click(function() {
            $(this).toggleClass('hide');
            $('#icon').toggleClass('open');
        });
        $('#arrow').click(function() {
            // $(this).toggleClass('open');
            $("a[href='#body-top']").click(function() {
            $("html, body").animate({ scrollTop: 0 }, "fast");
            return false;
          });

        });
    }
});

$(document).ready(function () {
    function toggleHide(id) {
        $(id).toggleClass('hide');
    }

    function toggleMenu() {
        $('#floating-menu').toggleClass('hide');
    }

    if (screen.width <= 375) {
        $('#icon').click(function () {
            $(this).toggleClass('open');
            $('.menu-circle.right').toggleClass('hide');
            $('#mobile-menu').toggleClass('hide');
        });
        $('#mobile-menu').click(function () {
            $(this).toggleClass('hide');
            $('#icon').toggleClass('open');
            $('.menu-circle.right').toggleClass('hide');
        });
        $('#arrow').click(function () {
            // $(this).toggleClass('open');
            $("a[href='#body-top']").click(function () {
                $("html, body").animate({scrollTop: 0}, "fast");
                return false;
            });

        });
    }
});
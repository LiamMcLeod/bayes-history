$(document).ready(function () {
    function toggleMenu() {
        $('#floating-menu').toggleClass('hide');
    }

    function toggleHide(id) {
        $(id).toggleClass('hide');
    }

    //TODO FIX
    // function toggleDisable(id) {
    //     if ($(id).attr("disabled")) {
    //         $(id).removeAttr("disabled")
    //     } else {
    //         $(id).attr("disabled")
    //     }
    // }

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

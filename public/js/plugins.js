$(document).ready(function () {

    function toggleDisable(role) {
        var $norm = $('.norm-toggle');
        var $mod = $('.mod-toggle');
        var $ad = $('.ad-toggle');
        
        switch (role) {
            case 'user':
            /* falls through */
            default:
                if ($norm.attr("disabled")) {
                    $norm.removeAttr("disabled")
                } else {
                    $norm.attr("disabled")
                }
                break;
            /* falls through */
            case 'moderator':
                if ($mod.attr("disabled")) {
                    $mod.removeAttr("disabled")
                } else {
                    $mod.attr("disabled")
                }
            /* falls through */
            case 'admin':
                if ($ad.attr("disabled")) {
                    $ad.removeAttr("disabled")
                } else {
                    $ad.attr("disabled")
                }
                break;
        }
    }

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

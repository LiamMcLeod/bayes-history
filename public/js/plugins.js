function toggleDisable(role) {
    var $norm = $('.norm-toggle');
    var $mod = $('.mod-toggle');
    var $ad = $('.ad-toggle');

    switch (role) {
        case 'admin':
            if ($ad.attr("disabled")) {
                $ad.removeAttr("disabled")
            } else {
                $ad.attr("disabled")
            }
        /* falls through */
        case 'moderator':
            if ($mod.attr("disabled")) {
                $mod.removeAttr("disabled")
            } else {
                $mod.attr("disabled")
            }
        /* falls through */
        case 'user':
        /* falls through */
        default:
            if ($norm.attr("disabled")) {
                $norm.removeAttr("disabled")
            } else {
                $norm.attr("disabled")
            }
            break;
    }

    $('#edit-user').toggleClass('fa-edit');
}
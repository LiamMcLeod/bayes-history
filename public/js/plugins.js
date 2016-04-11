function toggleDisable(role) {
    var $norm = $('.norm-toggle');
    var $mod = $('.mod-toggle');
    var $ad = $('.ad-toggle');
    switch (role) {
        case 'admin':
            if ($ad.attr("disabled")) {
                $ad.prop("disabled", false)
            } else {
                $ad.prop("disabled", true)
            }
        /* falls through */
        case 'moderator':
            if ($mod.attr("disabled")) {
                $mod.prop("disabled", false)
            } else {
                $mod.prop("disabled", true)
            }
        /* falls through */
        case 'user':
        /* falls through */
        default:
            if ($norm.attr("disabled")) {
                $norm.prop("disabled", false)
            } else {
                $norm.prop("disabled", true)
            }
            break;
    }

    $('#edit-user').toggleClass('fa-edit');
}
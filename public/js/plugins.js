function toggleDisable(role) {
    var $norm = $('.norm-toggle');
    var $mod = $('.mod-toggle');
    var $ad = $('.ad-toggle');
    switch (role) {
        case 'admin':
            if ($ad.attr("disabled")) {
                $ad.prop("disabled", false)
            } else {
                if (checkInput($ad))
                    $ad.prop("disabled", true)
            }
        /* falls through */
        case 'moderator':
            if ($mod.attr("disabled")) {
                $mod.prop("disabled", false)
            } else {
                if (checkInput($mod))
                    $mod.prop("disabled", true)
            }
        /* falls through */
        case 'user':
        default:
            if ($norm.attr("disabled")) {
                $norm.prop("disabled", false)
            } else {
                if (checkInput($norm))
                    $norm.prop("disabled", true)
            }
            break;
    }
    $('#edit-user').toggleClass('fa-edit');
}

function checkInput(input) {
    var valid = false;
    input.each(function () {
        if (valid) {
            return valid;
        }
        valid = !$.trim($(this).val());
    });
    return valid;
}
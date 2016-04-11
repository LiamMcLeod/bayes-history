function toggleDisable(role) {
    var $norm = $('.norm-toggle');
    var $mod = $('.mod-toggle');
    var $ad = $('.ad-toggle');

    //todo toggle colour
    //todo fix that check input
    switch (role) {
        case 'admin':
            if ($ad.attr("disabled")) {
                $ad.prop("disabled", false);
                  $ad.toggleClass('enabled');
            } else {
                if (checkInput($ad)) {
                    $ad.prop("disabled", true);
                    $ad.toggleClass('enabled');
                  }
            }
        /* falls through */
        case 'moderator':
            if ($mod.attr("disabled")) {
                $mod.prop("disabled", false);
                  $mod.toggleClass('enabled');
            } else {
                if (checkInput($mod)) {
                    $mod.prop("disabled", true);
                    $mod.toggleClass('enabled');
                  }
            }
        /* falls through */
        case 'user':
        default:
            if ($norm.attr("disabled")) {
                $norm.prop("disabled", false);
                $norm.toggleClass('enabled');
            } else {
                if (checkInput($norm)) {
                    $norm.prop("disabled", true)
                    $norm.toggleClass('enabled');
                  }
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

function toggleHide(id) {
    $(id).toggleClass('hide');
}

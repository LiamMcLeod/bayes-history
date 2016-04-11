function toggleDisable(role) {
    var $norm = $('.norm-toggle');
    var $mod = $('.mod-toggle');
    var $ad = $('.ad-toggle');

    //todo toggle colour
    //todo fix that check input

    if (checkInput()) {
        switch (role) {
            case 'admin':
                if ($ad.attr("disabled")) {
                    $ad.prop("disabled", false);
                    $ad.toggleClass('enabled');
                } else {
                    $ad.prop("disabled", true);
                    $ad.toggleClass('enabled');
                }
            /* falls through */
            case 'moderator':
                if ($mod.attr("disabled")) {
                    $mod.prop("disabled", false);
                    $mod.toggleClass('enabled');
                } else {
                    $mod.prop("disabled", true);
                    $mod.toggleClass('enabled');
                }
            /* falls through */
            case 'user':
            default:
                if ($norm.attr("disabled")) {
                    $norm.prop("disabled", false);
                    $norm.toggleClass('enabled');
                } else {
                    $norm.prop("disabled", true);
                    $norm.toggleClass('enabled');
                }
                break;
        }
        $('.pen-icon a').toggleClass('fa-edit');
    }
}

function checkInput() {
    var valid=false;
    $("#edit-user input").each(function () {
        valid = ($(this).val.length != 0);
        if (!valid)
            return valid
    });

}

function toggleHide(id) {
    $(id).toggleClass('hide');
}

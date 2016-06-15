function toggleMenu() {
    $('#mobile-menu').toggleClass('hide');
}


var $norm = $('.norm-toggle');
var $mod = $('.mod-toggle');
var $ad = $('.ad-toggle');

function toggleDisable(role) {
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
                    $('#edit-user').submit();
                }
                break;
        }
        $('.pen-icon a').toggleClass('fa-edit');
    }
}

function checkInput() {
    var valid = true;
    if($.trim($norm.val()).length === 0 || $.trim($mod.val()).length === 0 || $.trim($ad.val()).length === 0){
        valid=false;
        return valid;
    } else if ($norm.val().length === 0 || $mod.val().length === 0  || $ad.val().length === 0){
        valid = false;
        return valid;
    }
    if (!valid) {
        return valid;
    }
    return valid;
}

function toggleHide(id) {
    $(id).toggleClass('hide');
}



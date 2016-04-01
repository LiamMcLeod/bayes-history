$( document ).ready(function() {

    if (screen.width <= 375){
        $('#icon').click(function() {
            $(this).toggleClass('open');
        });
        //TODO account for offscreen dimensions and stop it
        $.fn.draggable = function() {
            var offset = null;
            var start = function(e) {
                var orig = e.originalEvent;
                var pos = $(this).position();
                offset = {
                    x: orig.changedTouches[0].pageX - pos.left
                };
            };
            var moveMe = function(e) {
                e.preventDefault();
                var orig = e.originalEvent;
                $(this).css({
                    left: orig.changedTouches[0].pageX - offset.x
                });
            };
            this.bind("touchstart", start);
            this.bind("touchmove", moveMe);
        };
        // TODO LEFT CANNOT BE < 0 or > 375
        $("#hamburger").draggable({ containment: "body" });
    }

});

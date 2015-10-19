/**
 * Сделать иконки двойными
 * @param  {[type]} icon1Id       [description]
 * @param  {[type]} icon2Id       [description]
 * @param  {[type]} iconWrapperId [description]
 * @return {[type]}               [description]
 */
function makeDoubleIcon(icon1Id, icon2Id, iconWrapperId) {
    $(iconWrapperId).data("toggler", true).click(toogleSomeIcon);

    function loadSVGFromUrl(url, onSuccess, onError) {
        try {
            return Snap.load(url, onSuccess);
        } catch (e) {
            if (onError === undefined) {
                console.log("error in LoadSvgFromURL: " + e);
            } else {
                onError();
            }
        }
    }
    /**
     * Переключает иконки
     * @param  {[type]} handler [description]
     * @return {[type]}         [description]
     */
    function toogleSomeIcon(handler) {
        try {
            var toggler = $(handler.currentTarget).data("toggler");
            $(handler.currentTarget).data("toggler", !toggler);
        } catch (e) {
            console.log("error in toogleSomeIcon: " + e);
        }
    }
}
/**
 * Событие при клике по кнопке
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function toggleAlbumArt(event) {
        var tr1 = $(".hideleft");
        var tr2 = $(".showleft");
        $(".player-cover").fadeOut("fast", function() {
            $(this).css("background-image", "url('http://172.42.3.126:8000/playingart?sid=1?"+new Date().getTime()+"')," +
            "url('http://cs629228.vk.me/v629228729/141b/xhjvUx0je3s.jpg')");
        }).fadeIn("fast");

        $(".player-bg").fadeOut("fast", function() {
            $(this).css("background-image", "url('http://172.42.3.126:8000/playingart?sid=1?"+new Date().getTime()+"')," +
            "url('http://cs629228.vk.me/v629228729/141b/xhjvUx0je3s.jpg')");
        }).fadeIn("fast");

        tr1.removeClass("hideleft").addClass("make_transist").addClass("showleft");
        tr2.removeClass("showleft").addClass("make_transist").addClass("hideleft");
    }

$(function() {
    /*Initilize*/
    makeDoubleIcon("#mute-icon", "#unmute-icon", "#volume-tumbler");
    makeDoubleIcon("#play-icon", "#pause-icon", "#play-tumbler");

    $("#slider").slider({
        animate: "fast",
        range: "min",
        value: 0,
        min: 0,
        max: 1,
        step: 0.01
    });
    /*Loading indicator*/
    var opts = {
        lines: 10,
        length: 5,
        width: 4,
        radius: 4,
        scale: 1,
        corners: 1,
        color: '#FFF',
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 0.9,
        trail: 60,
        fps: 20,
        zIndex: 2e9,
        className: 'spinner',
        top: '50%',
        left: '50%',
        shadow: false,
        hwaccel: false,
        position: 'absolute'
    }
    var target = document.getElementById('loading_indicator');
    var spinner = new Spinner(opts).spin(target);
    $(".player-bg")
        .css('background-image', "url('http://172.42.3.126:8000/playingart?sid=1')," +
            "url('http://cs629228.vk.me/v629228729/141b/xhjvUx0je3s.jpg')");
    $(".player-cover")

    .css('background-image',
        "url('http://172.42.3.126:8000/playingart?sid=1')," +
        "url('http://cs629228.vk.me/v629228729/141b/xhjvUx0je3s.jpg')");
})

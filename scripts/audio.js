var radio_src = "http://172.42.3.126:8000/;";

/**
 * Получает информацию о песне
 * @param  {[type]} onSuccess [description]
 * @return {[type]}           [description]
 */
function getSongInfo(onSuccess) {

    $.ajax({
        type: 'GET',
        headers: "GET",
        dataType: 'jsonp',
        jsonp: "callback",
        url: "http://172.42.3.126:8000/stats?sid=1&json=1",
        error: function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
        },
        success: function(data) {
            if (typeof onSuccess == "function") {
                var jsonData = JSON.stringify(data);
                var objData = $.parseJSON(jsonData);

                if (objData !== undefined) {
                    onSuccess(objData);
                }
            }
        }
    });
};

/**
 * [setterSongInfo description]
 * @param  {[type]} inData [description]
 * @return {[type]}        [description]
 */
function setterSongInfo(inData) {
    var songtitle = inData.songtitle;
    var currentArtist = $(".showleft").children(".tracking-group").text();
    var currentSong = $(".showleft").children(".track-song").text();
    var newArtist = songtitle.slice(0, songtitle.indexOf('-')).trim();
    var newSong = songtitle.substring(songtitle.indexOf('-') + 1).trim();
    if (currentArtist != newArtist || newSong != currentSong) {
        $(".hideleft").children(".tracking-group").text(newArtist);
        $(".hideleft").children(".track-song").text(newSong);
        toggleAlbumArt();
    }
}

/**
 * Конструктор аудио
 * @return {[type]} [description]
 */
function audioConstructor() {
    var a = $("#my-audio-id").get(0);
    a.src = radio_src;
    if (!a.canPlayType('audio/mpeg; codecs="mp3"')) {
        alert("Извините, ваш браузер не поддерживает аудио поток!" +
            "Попробуйте использовать скачать m3u, чтобы слушать радио в плеере");
    };
    a.preload = "none";
    return a;
}

$(function() {
    var audio = $("#my-audio-id").get(0);
    var playedInterval;

    /*Play/Pause*/
    var playPauseToggler = $("#play-tumbler");
    var playIcon = playPauseToggler.children().eq(0);
    var pauseIcon = playPauseToggler.children().eq(1);

    if (!($.cookie('radio_volume_cookie'))) {
        $(audio).get(0).volume = 0.5;
        $("#slider").slider('value', 0.5);
    } else {
        $(audio).get(0).volume = $.cookie('radio_volume_cookie');
        $("#slider").slider('value',$.cookie('radio_volume_cookie'));
    }
    /*Обработчик клика на проигрование*/
    playPauseToggler.click(function() {
        if ($(this).data("toggler")) {
            //Пауза
            clearInterval(playedInterval);
            $("#loading_indicator").animate({
                opacity: 0
            }, 200);
            pauseIcon.animate({
                opacity: 0
            }, 200);
            playIcon.animate({
                opacity: 1
            }, 200);
            $(audio).get(0).pause();
            audio.pause();
            audio.src = "---";
        } else {
            //Плэй
            playIcon.animate({
                opacity: 0
            }, 200);
            $(audio).attr("src", radio_src);
            audio.play();
            $("#loading_indicator").animate({
                opacity: 1
            }, 200);
            playedInterval = setInterval(function() {
	        getSongInfo(setterSongInfo);
	    	}, 5000);
        }
    });

    /*Изменение громкости*/
    $("#slider").on("slide", function(event, ui) {
        $(audio).get(0).volume = ui.value;
    });
    $( "#slider" ).on( "slidechange", function( event, ui ) {
    	$.cookie('radio_volume_cookie', ui.value);
    } );

    /*Обработчик клика на попытку замьютить*/
    $("#volume-tumbler").click(function(handler) {
        var sender = $(handler.currentTarget);
        var unmuteIco = sender.children().eq(0),
            muteIco = sender.children().eq(1);

        $(audio).get(0).muted = !sender.data("toggler");

        if ($(audio).get(0).muted == false) {
            muteIco.animate({
                opacity: 1
            }, 200);
            unmuteIco.animate({
                opacity: 0
            }, 200);
        } else if ($(audio).get(0).muted) {
            muteIco.animate({
                opacity: 0
            }, 200);
            unmuteIco.animate({
                opacity: 1
            }, 200);
        }
    });
    /*Обработчик начала воспроизведения потока*/
    $(audio).get(0).addEventListener('loadeddata', function() {
        $("#loading_indicator").animate({
            opacity: 0
        }, 200);
        pauseIcon.animate({
            opacity: 1
        }, 200);
    }, false);
    /*Обработчик ошибок воспроизведения*/
    $(audio).get(0).addEventListener('error', function(e) {
        if (this.src != "---") {
            console.log('error loading audio:' + e);
            alert(e);
        }
    }, false);
    getSongInfo(setterSongInfo);
})

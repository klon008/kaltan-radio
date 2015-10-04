    $(function() {

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

            function toogleSomeIcon(handler) {
                try {
                    var Sender = $(handler.currentTarget),
                        toggler = $(handler.currentTarget).data("toggler");

                    if (Sender) {
                        var firstSVG = Sender.children().eq(0),
                            secondSVG = Sender.children().eq(1);

                        if (toggler) {
                            firstSVG.animate({
                                opacity: 0
                            }, 200);
                            secondSVG.animate({
                                opacity: 1
                            }, 200);
                        } else if (!toggler) {
                            firstSVG.animate({
                                opacity: 1
                            }, 200);
                            secondSVG.animate({
                                opacity: 0
                            }, 200);
                        }
                    }
                    $(Sender).data("toggler", !toggler);
                } catch (e) {
                    console.log("error in toogleSomeIcon: " + e);
                }
            }


        }

        makeDoubleIcon("#mute-icon", "#unmute-icon", "#volume-tumbler");
        makeDoubleIcon("#play-icon", "#pause-icon", "#play-tumbler");
        $("#slider").slider({
            animate: "fast",
            range: "min",
            value: 50,
            min: 0,
            max: 100,
            step: 1
            });
    })

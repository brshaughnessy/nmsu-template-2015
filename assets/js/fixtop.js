function animateTopWide() {
    $("#navbar-dept-link").finish()
        .animate({
            "margin-left": 90
        }, {
            duration: 200,
            queue: false
        });
    $("#nmsu-logo").finish()
        .attr("src", "assets/images/nmsu-logo.png")
        .css({"width": "270", "height": "28"})
        .animate({
            width: 427,
            height: 90
        }, {
            duration: 200,
            queue: false,
            complete: function() {
                $("#nmsu-logo").attr("src","assets/images/nmsu-logo.png")
                    .css({"width": "", "height": ""});
                $(window).trigger("nmsu.scrollShift.topWide");
            }
        });
}
function animateBottomWide() {
    $("#navbar-dept-link").finish()
        .animate({
            marginLeft: 31
        }, {
            duration: 200,
            queue: false
        });
    $("#nmsu-logo").finish()
        .animate({
            width: 270,
            height: 28
        }, {
            duration: 200,
            queue: false,
            complete: function() {
                $("#nmsu-logo").attr("src","assets/images/nmsu-logo-small.png")
                    .css({"width": "", "height": ""});
                $(window).trigger("nmsu.scrollShift.bottomWide");
            }
        });
}
function animateTop() {
    $("#navbar-dept-link")
        .animate({
            height: "show"
        }, {
            duration: 200,
            queue: true,
            complete: function() {
                updateMargin();
            }
        });
}
function animateBottom() {
    $("#navbar-dept-link")
        .animate({
            height: "hide"
        }, {
            duration: 200,
            queue: true
        });
}
function scrollShift(event) {
    var position = $(window).scrollTop();
    var view_is_xs = $("#nmsu-logo-xs").is(":visible");
    if (position === 0) {
        $("#scroll-top").hide();
        if ($("body").hasClass("fix-top-scroll")) {
            if (!view_is_xs) {
                animateTopWide();
            } 
            animateTop();
            $("body").removeClass("fix-top-scroll");
            $("body").addClass("fix-top");
            $("#search-query").removeClass("input-sm");
        }
    } else {
        $("#scroll-top").show();
        if (position > 0 && $("body").hasClass("fix-top")) {
            if (!view_is_xs) {
                animateBottomWide();
            }
            animateBottom();
            $("body").removeClass("fix-top");
            $("body").addClass("fix-top-scroll");
            $("#search-query").addClass("input-sm");
        }
    }

    
    $(window).one("scroll", scrollShift);
}

var resize_timeout = null;
function getUpperMargin() {
    return $("#fixed-masthead").innerHeight();
}
function marginShift(event) {
    window.clearTimeout(resize_timeout);
    resize_timeout = window.setTimeout(updateMargin, 100);
    $(window).one("resize", marginShift);
}
function updateMargin() {
    var newMargin = getUpperMargin();
    $("body").css({marginTop: newMargin});
}

$(document).ready(function() {
    $("body").css({marginTop: getUpperMargin});
    scrollShift();
    $(window).one("resize", marginShift);

    $('#scroll-top').click(function () {
        $(window).off("scroll", scrollShift);
        $('body,html').animate({
            scrollTop: 0
        }, {
            duration: 200, 
            queue: true, 
            complete: function() {
                scrollShift();
            }
        });
    });
});
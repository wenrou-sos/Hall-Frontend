var BK = BK || {};
BK.WIN_WIDTH=1280;
BK.WIN_HEIGHT=768;

//mode = 0  橫式 , mode = 1  直式
BK.DEVICE_MODE=(BK.WIN_WIDTH>BK.WIN_HEIGHT)?0:1;
BK.WIN_CENTER_X=BK.WIN_WIDTH/2;
BK.WIN_CENTER_Y=BK.WIN_HEIGHT/2;
BK.TESTMODE = 0;
BK.Only_Vertical = false;

var ORIENTATION=-1;

var GetOrientation = function () {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === "ori")
        {
            ORIENTATION = sParameterName[1];
        }
    }
}();

var DEF_TEST_LOADING_BAR = false;
var resizeTimer = null;
$(document).ready(function() {
    console.log( "ready!");
    ui_init_Size();
    // $(window).resize(function() {
    //     if (resizeTimer) clearTimeout(resizeTimer);
    //
    //     resizeTimer = setTimeout(function () {
    //         if(ORIENTATION>=0)
    //         {
    //             // BK.DEVICE_MODE=ORIENTATION;
    //             return;
    //         }
    //
    //         ui_init_Size();
    //     }, 20);
    // });
    var width=0;
    resizeTimer = window.setInterval( function () {
        var height = $(window).height();
        if (width != $(window).width() ){
            width = $(window).width();
            ui_init_Size();
        }
    },20)

});

function ui_init_Size() {
    var width = $(window).width();
    var height = $(window).height();
    var last_device_mode=BK.DEVICE_MODE;
    BK.DEVICE_MODE = (width > height) ? 0 : 1;
    if (BK.Only_Vertical) BK.DEVICE_MODE = 1;
    var is_different_device_mode = (last_device_mode!==BK.DEVICE_MODE)? true:false;
    var is_different_size = (is_different_device_mode|| (width!==BK.WIN_WIDTH || height!==BK.WIN_HEIGHT))? true:false;

    if(ORIENTATION>=0) {
        BK.DEVICE_MODE=ORIENTATION;
    }
    if (BK.DEVICE_MODE == 0) {
        BK.WIN_WIDTH = 1280;
        BK.WIN_HEIGHT = 720;
    } else {
        BK.WIN_WIDTH = 720;
        BK.WIN_HEIGHT = 1280;
    }

    BK.WIN_CENTER_X = BK.WIN_WIDTH / 2;
    BK.WIN_CENTER_Y = BK.WIN_HEIGHT / 2;

    BK.SCALE = function () {
        var scale = 1;
        if (BK.DEVICE_MODE == 1 && BK.Only_Vertical == false) {
            scale = BK.WIN_WIDTH / BK.REEL_BG_WIDTH ;
        }
        return scale;
    }();

    if(is_different_size){
        ui_call_canvas_resize();
    }
}

var CANVAS_RESIZE=false;
function ui_call_canvas_resize() {
    CANVAS_RESIZE=true;
}

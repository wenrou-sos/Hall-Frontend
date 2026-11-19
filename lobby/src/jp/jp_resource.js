/**
 * Created by chiyung on 2020/01/22.
 */

// var RES_LANGUAGE="eng";

var GetResLanguage = function () {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === "lang")
        {
            RES_LANGUAGE = sParameterName[1];
        }
    }
}();

var jp_res = {
    close_up_png:"",
    close_down_png:"",

    win_number_png:"",
    win_number_big_png:"",

    banner_close_png:"",
    banner_png:"",
    banner_atlas:"",
    banner_json:"",
    banner_m_json:"",



    redenvelope_atlas:"",
    redenvelope_png:"",
    pickone_json:"",
    board_json:"",
    board_m_json:"",
    symbol_png:"",
    symbol_1_json:"",
    symbol_2_json:"",
    symbol_3_json:"",
    symbol_4_json:"",
    symbol_5_json:"",
    symbol_6_json:"",
    symbol_7_json:"",
    symbol_8_json:"",

    sound_open_mp3:"",
    sound_close_mp3:"",
    sound_big_show_mp3:"",
    sound_small_show_mp3:"",
};

if(ps.GetPSImages[ps.SERVER_PS_IMAGNE_ENUM.RedPacket]){


    var RedPacket_res_LANGUAGE = "eng";
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === "lang")
            RedPacket_res_LANGUAGE = sParameterName[1];
        // if(RedPacket_res_LANGUAGE !== "eng" && RedPacket_res_LANGUAGE !== "esp" && RedPacket_res_LANGUAGE !== "ind" && RedPacket_res_LANGUAGE !== "kor"
        //     && RedPacket_res_LANGUAGE !== "mys" && RedPacket_res_LANGUAGE !== "sch" && RedPacket_res_LANGUAGE !== "tai" && RedPacket_res_LANGUAGE !== "tch"
        //     && RedPacket_res_LANGUAGE!== "vie")
        //         RedPacket_res_LANGUAGE = "eng";
    }

    jp_res.close_up_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/common/pic/close_up.png";
    jp_res.close_down_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/common/pic/close_down.png";

    jp_res.win_number_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/common/num/number_envelope.png";
    jp_res.win_number_big_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/common/num/number_envelope.png";

    jp_res.banner_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+RedPacket_res_LANGUAGE+"/anm/banner/banner.png";
    jp_res.banner_atlas = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+RedPacket_res_LANGUAGE+"/anm/banner/banner.atlas";
    jp_res.banner_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+RedPacket_res_LANGUAGE+"/anm/banner/banner.json";
    jp_res.banner_m_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+RedPacket_res_LANGUAGE+"/anm/banner/banner_m.json";
    jp_res.banner_close_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/common/anm/banner/close.png";

    jp_res.redenvelope_atlas = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/redenvelope.atlas";
    jp_res.redenvelope_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/redenvelope.png";
    jp_res.pickone_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/pickone.json";
    jp_res.board_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/board.json";
    jp_res.board_m_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/board_m.json";
    jp_res.symbol_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/symbol.png";
    jp_res.symbol_1_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/symbol_1.json";
    jp_res.symbol_2_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/symbol_2.json";
    jp_res.symbol_3_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/symbol_3.json";
    jp_res.symbol_4_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/symbol_4.json";
    jp_res.symbol_5_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/symbol_5.json";
    jp_res.symbol_6_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/symbol_6.json";
    jp_res.symbol_7_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/symbol_7.json";
    jp_res.symbol_8_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/"+"common"+"/anm/redenvelope/symbol_8.json";

    jp_res.sound_open_mp3 = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/common/sound/open.mp3";
    jp_res.sound_close_mp3 = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/common/sound/close.mp3";
    jp_res.sound_big_show_mp3 = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/common/sound/bigshow.mp3";
    jp_res.sound_small_show_mp3 = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.RedPacket + "/common/sound/smallshow.mp3";

}
else if(ps.GetPSImages[ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw]){

    var LuckyDraw_res_LANGUAGE = "eng";
    if(RES_LANGUAGE != "eng" && RES_LANGUAGE!= "tai")
        LuckyDraw_res_LANGUAGE = "eng";
    else
        LuckyDraw_res_LANGUAGE = RES_LANGUAGE;

    jp_res.banner_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/banner/banner.png";
    jp_res.banner_atlas = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/banner/banner.atlas";
    jp_res.banner_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/banner/banner.json";
    jp_res.banner_m_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/banner/banner_m.json";
    jp_res.banner_close_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/banner/close.png";

    // 紅包刮刮樂動畫
    jp_res.redenvelope_atlas = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/"+LuckyDraw_res_LANGUAGE+"/redenvelope.atlas";
    jp_res.redenvelope_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/"+LuckyDraw_res_LANGUAGE+"/redenvelope.json";
    jp_res.redenvelope_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/"+LuckyDraw_res_LANGUAGE+"/redenvelope.png";
    jp_res.par_open_0_plist = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_open_0.plist";
    jp_res.par_open_0_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_open_0.png";
    jp_res.par_open_1_plist = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_open_1.plist";
    jp_res.par_open_1_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_open_1.png";
    jp_res.par_open_2_plist = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_open_2.plist";
    jp_res.par_open_2_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_open_2.png";
    jp_res.par_open_3_plist = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_open_3.plist";
    jp_res.par_open_3_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_open_3.png";
    jp_res.par_loop_0_plist = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_loop_0.plist";
    jp_res.par_loop_0_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_loop_0.png";
    jp_res.par_loop_1_plist = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_loop_1.plist";
    jp_res.par_loop_1_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_loop_1.png";
    jp_res.par_loop_2_plist = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_loop_2.plist";
    jp_res.par_loop_2_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_loop_2.png";
    jp_res.par_loop_3_plist = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_loop_3.plist";
    jp_res.par_loop_3_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/par_loop_3.png";
    jp_res.bar_plist = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/bar.plist";
    jp_res.bar_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/bar.png";
    jp_res.light_loop_plist = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/light_loop.plist";
    jp_res.light_loop_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/anm/light_loop.png";

    jp_res.sound_close_mp3 = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/sound/Close.mp3";
    jp_res.sound_open_mp3 = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/sound/Open.mp3";
    jp_res.sound_Scratch_mp3 = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/sound/Scratch.mp3";
    jp_res.sound_show_mp3 = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/sound/Show.mp3";

    //按鈕圖片
    jp_res.bar_alpha_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/bar_alpha.png";
    jp_res.bar_big_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/bar_big.png";

    //訊息頁面
    jp_res.title_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/game_into.png";
    jp_res.title_png_m = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/game_into_m.png";
    jp_res.close_down_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/close_down.png";
    jp_res.close_up_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/close_up.png";
    jp_res.black_bg = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.LuckyDraw + "/black.png";
}
else if(ps.GetPSImages[ps.SERVER_PS_IMAGNE_ENUM.Ranking]){

    var RedPacket_res_LANGUAGE = "eng";
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === "lang")
            RedPacket_res_LANGUAGE = sParameterName[1];
        // if(RedPacket_res_LANGUAGE !== "eng" && RedPacket_res_LANGUAGE !== "esp" && RedPacket_res_LANGUAGE !== "ind" && RedPacket_res_LANGUAGE !== "kor"
        //     && RedPacket_res_LANGUAGE !== "mys" && RedPacket_res_LANGUAGE !== "sch" && RedPacket_res_LANGUAGE !== "tai" && RedPacket_res_LANGUAGE !== "tch"
        //     && RedPacket_res_LANGUAGE!== "vie")
        //         RedPacket_res_LANGUAGE = "eng";
    }

    jp_res.banner_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.Ranking + "/"+RedPacket_res_LANGUAGE+"/anm/banner/banner.png";
    jp_res.banner_atlas = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.Ranking + "/"+RedPacket_res_LANGUAGE+"/anm/banner/banner.atlas";
    jp_res.banner_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.Ranking + "/"+RedPacket_res_LANGUAGE+"/anm/banner/banner.json";
    jp_res.banner_m_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.Ranking + "/"+RedPacket_res_LANGUAGE+"/anm/banner/banner_m.json";
    jp_res.banner_close_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.Ranking + "/common/anm/banner/close.png";

    jp_res.event_btn_atlas = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.Ranking + "/common/anm/eventbtn/event_btn.atlas";
    jp_res.event_btn_png = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.Ranking + "/common/anm/eventbtn/event_btn.png";
    jp_res.event_btn_json = ps.PsImagesPath + ps.SERVER_PS_IMAGNE_ENUM.Ranking + "/common/anm/eventbtn/event_btn.json";

}


function LoadJackPotResource(g_resources){
    return; // PSImages publish pack absent; skip preload
}
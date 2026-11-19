pslb.MedalSystem = pslb.MedalSystem || {};

pslb.MedalSystem.res = {
    week_bg_png:"res/common/PsReward/week/bg.png",
    week_close_png:"res/common/PsReward/week/close.png",
    week_close_down_png:"res/common/PsReward/week/close_down.png",
    week_tile_png:"res/common/PsReward/week/tile.png",
    week_num_png:"res/common/PsReward/week/week_num.png",
    week_blue_png:"res/common/PsReward/week/blue.png",
    week_green_png:"res/common/PsReward/week/green.png",
    week_red_png:"res/common/PsReward/week/red.png",
    week_coin_png:"res/common/PsReward/week/coin.png",
    week_psreward_logo_png:"res/"+pslb.Language+"/PsReward/week/psreward_logo.png",
    week_total_text_png:"res/"+pslb.Language+"/PsReward/week/total_text.png",
    week_num_x_png:"res/common/PsReward/week/week_num_x.png",
    sound_PSBanner: "res/common/sound/PsReward/PSBanner.mp3",
    sound_PSBannerBackground:    "res/common/sound/PsReward/PSBannerBackground.mp3"
};


var g_resources = g_resources || [];

for (var i in pslb.MedalSystem.res) {
    g_resources.push(pslb.MedalSystem.res[i]);
}

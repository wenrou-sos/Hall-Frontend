
pslb.JpSupplier = (function(){
    if(typeof getHostName == "function")
        return getHostName().toLowerCase();
    else
        return "ps";
})();


var res = {

    main_page_bg_png:"res/common/pic/bg.png",
    main_page_bg_m_png:"res/common/pic/bg_m.png",


    //Lobby  Carousel Banner
    banner_top_01:"res/" + pslb.Language + "/pic/banner/banner_top_01.png",
    banner_bottom_01:"res/common/pic/banner/banner_bottom.png",
    banner_bottom_02:"res/common/pic/banner/banner_bottom1.png",
    banner_bottom_03:"res/common/pic/banner/banner_bottom2.png",
    banner_bottom_04:"res/common/pic/banner/banner_bottom.png",

    // only for red envelope use, only sch language
    banner_bottom_05:"res/sch/pic/banner/banner_bottom_05.png",

    //GameItem of GameWall
    ///GameItem Tag
    lock:"res/common/pic/lock.png",
    new:"res/" + pslb.Language + "/pic/games/new.png",
    challenge:"res/" + pslb.Language + "/pic/games/challenge.png",
    hot:"res/" + pslb.Language + "/pic/games/hot.png",
    jackpot:"res/" + pslb.Language + "/pic/games/jackpot.png",

    //User for GameItem Play Type
    freeplay_up:"res/" + pslb.Language + "/pic/games/freeplay_up.png",
    freeplay_down:"res/" + pslb.Language + "/pic/games/freeplay_down.png",
    coming_soon:"res/" + pslb.Language + "/pic/games/coming_soon.png",

    // favorite & realplay btn
    faverite_up : "res/common/pic/ui_btn/btn_favorite_up.png",
    faverite_down : "res/common/pic/ui_btn/btn_favorite_down.png",

    realplay_up: "res/common/pic/ui_btn/btn_play_up.png",
    realplay_down: "res/common/pic/ui_btn/btn_play_down.png",

    //Reword Bar of Interface
    // reward_1:"res/common/pic/reward_1.png",
    // reward_2:"res/common/pic/reward_2.png",
    // reward_3:"res/common/pic/reward_3.png",
    // reward_gold:"res/common/pic/reward_gold.png",
    // reward_selever:"res/common/pic/reward_selever.png",
    // reward_copper:"res/common/pic/reward_copper.png",
    //Use for GameItem mark
    web_down: "res/common/pic/web_down.png",

    //Reward Banner
    // prompt:"res/common/pic/prompt/prompt.png",
    // banner_reward_0:"res/common/pic/prompt/reward_gold_banner.png",
    // banner_reward_1:"res/common/pic/prompt/reward_selever_banner.png",
    // banner_reward_2:"res/common/pic/prompt/reward_copper_banner.png",
    // banner_reward_coin:"res/common/pic/prompt/reward_coin.png",

    //Lobby Level Up
    // levelup_bg_png:"res/common/pic/levelup_bg.png",
    // levelup_text_png:"res/"+ pslb.Language + "/pic/levelup_txt.png",

    //Lobby Button Vertical
    btn_menu_down:"res/common/pic/vertical_ui/btn_menu_down.png",
    btn_menu_up:"res/common/pic/vertical_ui/btn_menu_up.png",

    btn_menu01_down:"res/common/pic/vertical_ui/btn_menu01_down.png",
    btn_menu01_up:"res/common/pic/vertical_ui/btn_menu01_up.png",

    btn_top_down:"res/common/pic/vertical_ui/btn_top_down.png",
    btn_top_up:"res/common/pic/vertical_ui/btn_top_up.png",

    //Lobby Button - Customer
    banking_up:"res/common/pic/banking/banking_"+pslb.JpSupplier+"_up.png",
    banking_down:"res/common/pic/banking/banking_"+pslb.JpSupplier+"_down.png",

    banking_up_PS:"res/common/pic/banking/banking_up.png",
    banking_down_PS:"res/common/pic/banking/banking_down.png",

    //Lobby Button - Help
    help_up:"res/common/pic/help_up.png",
    help_down:"res/common/pic/help_down.png",
    //Lobby Button - Small Wheel
    needle_png:"res/common/pic/smallWheel/needle.png",
    wheel_png:"res/common/pic/smallWheel/wheel.png",
    wheel_up_png:"res/common/pic/smallWheel/wheel_light.png",
    wheel_down_png:"res/common/pic/smallWheel/wheel_2.png",
    bt_wheel_up_png:"res/common/pic/smallWheel/wheel_bt_lght.png",
    bt_wheel_down_png:"res/common/pic/smallWheel/wheel_bt.png",
    wheel_coin:"res/common/pic/smallWheel/wheel_coin.png",
    ps_logo:"res/"+ pslb.Language + "/pic/PSC_logo.png",

    //Lobby Button - Mail
    inbox_new_png:"res/common/pic/inbox_new.png",
    inbox_up_png:"res/common/pic/inbox_up.png",
    inbox_down_png:"res/common/pic/inbox_down.png",

    inbox_m_up:"res/common/pic/inbox_m_up.png",
    inbox_m_down_png:"res/common/pic/inbox_m_down.png",

    //Mail System
    inbox_bg:"res/common/pic/inbox/inbox_bg.png",
    inbox_bg_m:"res/common/pic/inbox/inbox_bg_m.png",
    scrollbar_bg_png:"res/common/pic/inbox/scrollbar_bg.png",
    scrollbar_bg_m_png:"res/common/pic/inbox/scrollbar_bg_m.png",
    scrollbar_thumb_png:"res/common/pic/inbox/scrollbar_thumb.png",
    inbox_close_up:"res/common/pic/inbox/close_up.png",
    inbox_close_down:"res/common/pic/inbox/close_down.png",
    //Mail System-List
    inbox_title:"res/" + pslb.Language + "/pic/inbox/inbox_title.png",
    mail_new:"res/" + pslb.Language + "/pic/inbox/mail_new.png",
    mail_review:"res/" + pslb.Language + "/pic/inbox/mail_review.png",
    mail_bg_up_bg:"res/common/pic/inbox/mail_bg_up.png",
    mail_bg_down_bg:"res/common/pic/inbox/mail_bg_down.png",

    mail_bg_m_up:"res/common/pic/inbox/mail_bg_m_up.png",
    mail_bg_m_down:"res/common/pic/inbox/mail_bg_m_down.png",

    //Mail System-Contentlock
    okay_down:"res/" + pslb.Language + "/pic/inbox/okay_down.png",
    okay_up:"res/" + pslb.Language + "/pic/inbox/okay_up.png",
    takeit_down:"res/" + pslb.Language + "/pic/inbox/takeit_down.png",
    takeit_up:"res/" + pslb.Language + "/pic/inbox/takeit_up.png",


    //LEVEL Text
    // bar_text_diamand:"res/" + pslb.Language + "/pic/level/diamand.png",
    // bar_text_ruby:"res/" + pslb.Language + "/pic/level/ruby.png",
    // bar_text_panther:"res/" + pslb.Language + "/pic/level/panther.png",
    // bar_text_double:"res/" + pslb.Language + "/pic/level/double.png",
    // //LEVEL Bar
    // bar_black_png : "res/common/pic/bar_black.png",
    // bar_ruby_png : "res/common/pic/bar_ruby.png",
    // bar_gold_png : "res/common/pic/bar_gold.png",
    // bar_silver_png : "res/common/pic/bar_silver.png",
    // //LEVEL Background
    // level_black_png:"res/common/pic/level_black.png",
    // level_gold_png:"res/common/pic/level_gold_ruby.png",
    // level_silver_png:"res/common/pic/level_silver.png",
    // black_png:"res/common/pic/black.png",
    // ruby_png:"res/common/pic/ruby.png",
    // gold_png:"res/common/pic/gold.png",
    // silver_png:"res/common/pic/silver.png",

    // new
    top_bg_png:"res/common/pic/top_bg.png",
    top_bg_m_png:"res/common/pic/top_bg_m.png",

    //Game Page Button
    // all_game_up:"res/" + pslb.Language + "/pic/pages/all_game_up.png",
    // all_game_down:"res/" + pslb.Language + "/pic/pages/all_game_down.png",

    ps_reward_up:"res/" + pslb.Language + "/pic/pages/ps_reward_up.png",
    ps_reward_down:"res/" + pslb.Language + "/pic/pages/ps_reward_down.png",
    today_up:"res/" + pslb.Language + "/pic/pages/today_up.png",
    today_down:"res/" + pslb.Language + "/pic/pages/today_down.png",

    // new page buuton
    all_down:"res/" + pslb.Language + "/pic/pages/new/all_down.png",
    all_up:"res/" + pslb.Language + "/pic/pages/new/all_up.png",
    favorite_up:"res/" + pslb.Language + "/pic/pages/new/favorite_up.png",
    favorite_down:"res/" + pslb.Language + "/pic/pages/new/favorite_down.png",
    hot_game_up:"res/" + pslb.Language + "/pic/pages/new/hot_game_up.png",
    hot_game_down:"res/" + pslb.Language + "/pic/pages/new/hot_game_down.png",
    slot_up:"res/" + pslb.Language + "/pic/pages/new/slot_up.png",
    slot_down:"res/" + pslb.Language + "/pic/pages/new/slot_down.png",
    jackpot_up:"res/" + pslb.Language + "/pic/pages/new/jackpot_up.png",
    jackpot_down:"res/" + pslb.Language + "/pic/pages/new/jackpot_down.png",
    featured_up:"res/common/pic/pages/btn_next_up.png",
    featured_down:"res/common/pic/pages/btn_next_down.png",

    event_down:"res/" + pslb.Language + "/pic/pages/new/event_down.png",
    event_up  :"res/" + pslb.Language + "/pic/pages/new/event_up.png",
    arcade_up:"res/" + pslb.Language + "/pic/pages/new/arcade_up.png",
    arcade_down:"res/" + pslb.Language + "/pic/pages/new/arcade_down.png",
    card_up:"res/" + pslb.Language + "/pic/pages/new/card_up.png",
    card_down:"res/" + pslb.Language + "/pic/pages/new/card_down.png",
    fish_up:"res/" + pslb.Language + "/pic/pages/new/fishing_up.png",
    fish_down:"res/" + pslb.Language + "/pic/pages/new/fishing_down.png",
    featured_up:"res/common/pic/pages/btn_next_up.png",
    featured_down:"res/common/pic/pages/btn_next_down.png",
    close_up:"res/common/pic/pages/btn_previous_up.png",
    close_down:"res/common/pic/pages/btn_previous_down.png",

    //Game Page Button no use
    challenge_up:"res/" + pslb.Language + "/pic/pages/challenge_up.png",
    challenge_down:"res/" + pslb.Language + "/pic/pages/challenge_down.png",


    //Lobby Help
    help_bg: "res/common/pic/help/help_bg.png",
    help_txt:"res/" + pslb.Language + "/pic/help/help_txt.png",
    help_bg_01: "res/common/pic/help/help_bg_01.png",
    help_bg_02: "res/common/pic/help/help_bg_02.png",
    help_bg_03: "res/common/pic/help/help_bg_03.png",
    help_bg_04: "res/common/pic/help/help_bg_04.png",
    help_colse: "res/common/pic/help/help_colse.png",
    //

    paging_bt_down_png:"res/common/pic/Paging_bt_down.png",
    paging_bt_up_png:"res/common/pic/Paging_bt_up.png",

    bg_dark:"res/common/pic/bg_dark.png",
    bg_dark100:"res/common/pic/bg_dark100.png",
    // bgw_center: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_top.png",

    //board_jackpot
    // bgw_board_jackpot_money_0:"res/common/num/board_jackpot_money.png",
    // bgw_board_jackpot_number_0:"res/common/num/board_jackpot_number.png",
    bgw_board_jackpot_money_1:"res/common/num/board_jackpot_money_1.png",
    bgw_board_jackpot_number_1:"res/common/num/board_jackpot_number_1.png",
    // bgw_board_jackpot_money_2:"res/common/num/board_jackpot_money_2.png",
    // bgw_board_jackpot_number_2:"res/common/num/board_jackpot_number_2.png",
    board_bet_money:"res/common/num/board_bet_money.png",
    board_bet_number:"res/common/num/board_bet_number.png",

    //Big Challenge Level
    // bgw_level_1:"res/common/pic/bigChallengeWheel/board_level_1.png",
    // bgw_level_2:"res/common/pic/bigChallengeWheel/board_level_2.png",
    // bgw_level_3:"res/common/pic/bigChallengeWheel/board_level_3.png",
    // bgw_level_4:"res/common/pic/bigChallengeWheel/board_level_4.png",
    // bgw_level_text_1:"res/"+ pslb.Language +"/pic/bigChallengeWheel/board_level_1.png",
    // bgw_level_text_2:"res/"+ pslb.Language +"/pic/bigChallengeWheel/board_level_2.png",
    // bgw_level_text_3:"res/"+ pslb.Language +"/pic/bigChallengeWheel/board_level_3.png",
    // bgw_level_text_4:"res/"+ pslb.Language +"/pic/bigChallengeWheel/board_level_4.png",
    // bgw_board_jp_bg_1:"res/common/pic/bigChallengeWheel/board_jp_bg_1.png",
    // bgw_board_jp_bg_2:"res/common/pic/bigChallengeWheel/board_jp_bg_2.png",
    // bgw_board_jp_bg_3:"res/common/pic/bigChallengeWheel/board_jp_bg_3.png",
    // bgw_board_jp_bg_4:"res/common/pic/bigChallengeWheel/board_jp_bg_4.png",
    //

    bgw_jackpot_bg:"res/common/pic/bigChallengeWheel/bg.png",
    bgw_jackpot_title:"res/common/pic/bigChallengeWheel/tile.png",

    // new
    challenge_bg:"res/common/pic/bigChallengeWheel/new/challenge_bg.png",

    // board_title_sp:"res/"+ pslb.Language +"/pic/bigChallengeWheel/board_title_sp.png",
    // bgw_wheel_award_1: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_award_1.png",
    // bgw_wheel_award_game1: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_award_2.png",
    // bgw_wheel_award_game2: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_award_3.png",
    // bgw_wheel_award_game3: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_award_4.png",
    // bgw_wheel_award_game4: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_award_5.png",
    // bgw_wheel_award_game5: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_award_6.png",
    // bgw_wheel_award_7: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_award_7.png",
    //
    // bgw_wheel_awesome_1: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_awesome_1.png",
    // bgw_wheel_awesome_2: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_awesome_2.png",
    // bgw_wheel_awesome_game1: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_awesome_3.png",
    // bgw_wheel_awesome_game2: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_awesome_4.png",
    // bgw_wheel_awesome_5: "res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_awesome_5.png",


    bgw_wheel_money:"res/common/num/wheel_money.png",
    bgw_wheel_number:"res/common/num/wheel_number.png",
    bgw_wheel_bonus_money:"res/common/num/wheel_bonus_money.png",
    bgw_wheel_bonus_number:"res/common/num/wheel_bonus_number.png",
    bgw_wheel_jackpot_money:"res/common/num/wheel_jackpot_money.png",
    bgw_wheel_jackpot_number:"res/common/num/wheel_jackpot_number.png",

    bgw_wheel_award_bg:"res/common/pic/bigChallengeWheel/wheel_award_bg.png",
    bgw_wheel_award_black:"res/common/pic/bigChallengeWheel/wheel_award_black.png",
    bgw_wheel_award_black_1:"res/common/pic/bigChallengeWheel/wheel_award_black_1.png",
    bgw_wheel_awesome_black_80:"res/common/pic/bigChallengeWheel/wheel_awesome_black_80.png",
    bgw_wheel_award_frame:"res/common/pic/bigChallengeWheel/wheel_award_frame.png",
    bgw_wheel_award_line:"res/common/pic/bigChallengeWheel/wheel_award_line.png",
    bgw_wheel_awesome_bg:"res/common/pic/bigChallengeWheel/wheel_awesome_bg.png",
    bgw_wheel_awesome_black:"res/common/pic/bigChallengeWheel/wheel_awesome_black.png",
    bgw_wheel_awesome_frame:"res/common/pic/bigChallengeWheel/wheel_awesome_frame.png",
    bgw_wheel_awesome_line:"res/common/pic/bigChallengeWheel/wheel_awesome_line.png",
    bgw_wheel_bg:"res/common/pic/bigChallengeWheel/wheel_bg.png",
    bgw_wheel_jackpot_black:"res/common/pic/bigChallengeWheel/wheel_jackpot_black.png",
    bgw_wheel_jackpot_hole:"res/common/pic/bigChallengeWheel/wheel_jackpot_hole.png",
    bgw_wheel_jackpot_line:"res/common/pic/bigChallengeWheel/wheel_jackpot_line.png",
    bgw_wheel_jackpot_bg:"res/common/pic/bigChallengeWheel/wheel_jackpot_bg.png",
    bgw_wheel_jackpot_1:"res/" + pslb.Language + "/pic/bigChallengeWheel/wheel_jackpot_1.png",

    bgw_board_bet_1:"res/common/pic/bigChallengeWheel/board_bet_1.png",
    bgw_board_bet_2:"res/common/pic/bigChallengeWheel/board_bet_2.png",
    bgw_board_bet_3:"res/common/pic/bigChallengeWheel/board_bet_3.png",
    bgw_board_bet_6:"res/common/pic/bigChallengeWheel/board_bet_6.png",
    bgw_board_bet_7:"res/common/pic/bigChallengeWheel/board_bet_7.png",
    bgw_board_bet_8:"res/common/pic/bigChallengeWheel/board_bet_8.png",
    bgw_board_bg:"res/common/pic/bigChallengeWheel/board_bg.png",

    bgw_btn_spin_down:"res/"+ pslb.Language +"/pic/bigChallengeWheel/board_spin_bt_down.png",
    bgw_btn_spin_up:"res/"+ pslb.Language +"/pic/bigChallengeWheel/board_spin_bt_up.png",
    bgw_btn_bet_down:"res/"+ pslb.Language +"/pic/bigChallengeWheel/board_bet_bt_down.png",
    bgw_btn_bet_up:"res/"+ pslb.Language +"/pic/bigChallengeWheel/board_bet_bt_up.png",
    bgw_btn_help_down:"res/"+ pslb.Language +"/pic/bigChallengeWheel/board_help_bt_down.png",
    bgw_btn_help_up:"res/"+ pslb.Language +"/pic/bigChallengeWheel/board_help_bt_up.png",
    bgw_btn_sound_off:"res/common/pic/bigChallengeWheel/board_voice_off.png",
    bgw_btn_sound_on:"res/common/pic/bigChallengeWheel/board_voice_on.png",
    // bgw_btn_home_down:"res/common/pic/bigChallengeWheel/board_home_down.png",
    // bgw_btn_home_up:"res/common/pic/bigChallengeWheel/board_home_up.png",


    help_money_png:"res/common/num/help_money.png",
    help_number_png:"res/common/num/help_number.png",
    help_info_number_png:"res/common/num/help_info_number.png",
    // help_1000X:"res/common/pic/bigChallengeWheel/1000X.png",
    // help_2000X:"res/common/pic/bigChallengeWheel/2000X.png",
    // help_3000X:"res/common/pic/bigChallengeWheel/3000X.png",

    //new bigWheel help
    bgw_help_close_up:"res/common/pic/bigChallengeWheel/help/close_up.png",
    bgw_help_close_down:"res/common/pic/bigChallengeWheel/help/close_down.png",
    ui_help_next_up_png: "res/common/pic/bigChallengeWheel/help/next.png",
    ui_help_next_down_png: "res/common/pic/bigChallengeWheel/help/next.png",
    ui_help_prev_up_png: "res/common/pic/bigChallengeWheel/help/prev.png",
    ui_help_prev_down_png: "res/common/pic/bigChallengeWheel/help/prev.png",
    ui_history_up_png:"res/common/pic/bigChallengeWheel/help/history_up.png",
    ui_history_down_png:"res/common/pic/bigChallengeWheel/help/history_down.png",
    info_bg_png :"res/common/pic/bigChallengeWheel/help/info_bg.png",
    //
    // ui_help_page_0:"res/"+ pslb.Language +"/pic/bigChallengeWheel/help/help_01.png",
    // ui_help_page_1:"res/"+ pslb.Language +"/pic/bigChallengeWheel/help/help_02.png",
    // ui_help_page_2:"res/"+ pslb.Language +"/pic/bigChallengeWheel/help/help_03.png",
    // ui_help_page_3:"res/"+ pslb.Language +"/pic/bigChallengeWheel/help/help_04.png",
    // notice:"res/"+ pslb.Language +"/pic/bigChallengeWheel/help/notice.png",
    //

    ui_insuf_balance_bg:"res/common/ui/insuf_balance_bg.png",
    ui_insuf_balance:"res/"+ pslb.Language +"/ui/insuf_balance.png",
    ui_insuf_daily_limit:"res/"+ pslb.Language +"/ui/insuf_daily_limit.png",

    token1_png:"res/common/pic/token_01.png",
    token2_png:"res/common/pic/token_02.png",
    token3_png:"res/common/pic/token_03.png",

    button_sound:"res/common/sound/Button.mp3",
    gold_sound:"res/common/sound/Gold.mp3",
    rolling01_sound:"res/common/sound/Rolling01.mp3",
    rolling02_sound:"res/common/sound/Rolling02.mp3",
    rolling03_sound:"res/common/sound/Rolling03.mp3",
    trans_sound:"res/common/sound/Trans.mp3",

    //jp
    number_jp: "res/common/jp/JP_Number.png",
    number_dot: "res/common/jp/JP_Number_Mark-1.png",
    number_comma: "res/common/jp/JP_Number_Mark-2.png",
    banner_jp:"res/" + pslb.Language + "/pic/banner/banner_jp.png",
    banner_jp_1:"res/" + pslb.Language + "/pic/banner/banner_jp_1.png",
    banner_jp_bg:"res/common/pic/banner/banner_jp_bg.png",
    banner_jp_bg_1:"res/common/pic/banner/banner_jp_bg_1.png",

    currency_plist: "res/common/ui/currency.plist",
    currency_png: "res/common/ui/currency.png",

    enent     : "res/common/ps_activity/enent.png"

};

if(pslb.JpSupplier == "dev"){
    res.banking_up = res.banking_up_PS;
    res.banking_down = res.banking_down_PS;
}

if(!pslb.SUPPORT_CARDGAME){
    //Game Page Button in Featured
    res.asia_up="res/" + pslb.Language + "/pic/pages/jackpot_up_1.png";
    res.asia_down="res/" + pslb.Language + "/pic/pages/jackpot_down_1.png";
    res.hot_game_up="res/" + pslb.Language + "/pic/pages/hot_game_up.png";
    res.hot_game_down="res/" + pslb.Language + "/pic/pages/hot_game_down_1.png";
    res.new_game_up="res/" + pslb.Language + "/pic/pages/new_game_up_1.png";
    res.new_game_down="res/" + pslb.Language + "/pic/pages/new_game_down_1.png";
    res.challenge_up="res/" + pslb.Language + "/pic/pages/challenge_up_1.png";
    res.challenge_down="res/" + pslb.Language + "/pic/pages/challenge_down_1.png";
}


var font = cc.sys.isMobile?
{
    "Myriad Pro-Bold": "res/common/font/mobile/Myriad Pro-Bold.woff",
    "Microsoft JhengHei":"res/common/font/mobile/msjh.woff"
}:
{
    "Myriad Pro-Bold": "res/common/font/desktop/Myriad Pro-Bold.ttf",
    "Microsoft JhengHei":"res/common/font/desktop/msjh.ttf"
};



var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

for (var i in font) {
    g_resources.push(font[i]);
}

LoadJackPotResource(g_resources);

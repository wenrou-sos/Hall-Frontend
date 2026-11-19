/*
activity 2021/07/30
*/
var uid = "";
var lang = "";
var token = "";
var hostid = "";
var sPageURL = window.location.search.substring(1);
var sURLVariables = sPageURL.split('&');
for (var i = 0; i < sURLVariables.length; i += 1) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === 'uid') {
        uid = sParameterName[1];
    } else if (sParameterName[0] === 'lang') {
        lang = sParameterName[1];
    } else if  (sParameterName[0] === 'access_token') {
        token = sParameterName[1]
    }
}
var hostid_num = token.indexOf("(*--)");

hostid = token.substr(hostid_num + 5, token.length);

var accessToken = token.slice(0, hostid_num);

var WebUid = uid;

var WebLang = lang;

var WebHostid = hostid;

var URL =  window.location.href;

var ActivityURL = URL.replace(DEF_GAMEID, "PSS-EVENT01");

ps.Activity = "ps_Activity";

ps.ActivityID = "WEB_Activity";

if (ps.Activity){
    res.checkBtn   = "res/common/ps_activity/btn_event_00.png";
    res.checkBtn_h = "res/common/ps_activity/btn_event_00_h.png";

    res.ticketBtn   = "res/common/ps_activity/btn_event_01.png";
    res.ticketBtn_h = "res/common/ps_activity/btn_event_01_h.png";

    res.inforBtn = "res/common/ps_activity/btn_event_02.png";
    res.inforBtn_h = "res/common/ps_activity/btn_event_02_h.png";

    res.event_close_down_png = "res/common/ps_activity/btn_close.png";
    res.event_close_up_png = "res/common/ps_activity/btn_close_h.png";

    res.banner_00 = "res/common/ps_activity/banner_00.png";
    res.banner_01 = "res/common/ps_activity/banner_01.png";
    res.banner_02 = "res/common/ps_activity/banner_02.png";
    res.banner_03 = "res/common/ps_activity/banner_03.png";
    res.banner_04 = "res/common/ps_activity/banner_04.png";
    res.banner_05 = "res/common/ps_activity/banner_05.png";
    res.banner_06 = "res/common/ps_activity/banner_06.png";
}

ps.WebPos = [
    cc.p(640, 340), cc.p(360, 665),
];

ps.WebPosContextSize = [
    cc.size(550, 552), cc.size(612, 1090),
];

ps.WebGameContextSize = [
    cc.size(1024, 576), cc.size(612, 1090),
];

ps.WebvCheckButtonPos = [
    cc.p(687, 679), cc.p(344, 1211),
];

ps.WebvTicketButtonPos = [
    cc.p(773, 679), cc.p(440, 1211),
];

ps.WebvInforButtonPos = [
    cc.p(859, 679), cc.p(536, 1211),
];

ps.WebvCloseButtonPos = [
    cc.p(1197, 581), cc.p(360, 84),
];

ps.WebvCloseButtonPos2 = [
    cc.p(949, 591), cc.p(360, 84),
];

ps.WebvCloseButtonScale = [1, 1];

ps.ActivtityTimePos = [
    cc.p(166, 492), cc.p(85, 973),
];

ps.ActivityLayer = 18;  // must < Ly_Tile_message zorder

ps.DrawNode_HW = [
    [cc.p(0, 720), cc.p(1280, 0)],
    [cc.p(0, 1280), cc.p(720, 0)]
];

ps.ActivtityText = [
    "LOOK!"
];

ps.ClickCheck = {
    Auto:0,
    Manual:1
};

ps.WebViewIndex = {
    Check:0,
    Ticket:1,
    Infor: 2,
};

ps.TimeState = {
    notice_time:0,
    start_time:1,
    end_time:2,
    discontinued_time:3
};

ps.PSEvents = (function(){
    if(typeof getPSEvents == "function") {
        cc.log(" ps.getPSEvents" + getPSEvents());
        return getPSEvents();
    } else{
        cc.log("no get PsEventdata");
    }
})();

//fake data
// ps.PSEvents = [
//     {"event_id":"01121cf8-7050-48ff-bc19-0a3926cc348f",
//         "type":"IDX",
//         "url":"https://dev.iplaystar.net/",
//         "notice_time":"2021-08-09T16:25:59",
//         "start_time":"2022-06-22T16:25:59",
//         "end_time":"2022-07-19T16:27:59",
//         "discontinued_time":"2022-07-25T06:23:59",
//         "game_id":"PSS-ON-00019,PSS-ON-00025,PSS-ON-00044,PSS-ON-00083,PSS-ON-00091,PSS-ON-00107,PSS-ON-00108,PSS-ON-00112,PSS-ON-00127,PSS-ON-00135",
//         "kind":0},
//     {"event_id":"091eb1c4-7578-4af1-8e93-6215b7726b70",
//         "type":"UFA",
//         "url":"https://dev.iplaystar.net/",
//         "start_time":"2021-07-29T23:59:59",
//         "end_time":"2021-07-29T23:59:59",
//         "notice_time":"2021-07-30T00:00:00",
//         "discontinued_time":"2021-07-31T23:59:59",
//         "kind":0}];

if (ps.PSEvents !== undefined && ps.PSEvents.length > 0){
    var uuid = ps.PSEvents[0].event_id;
    var type = ps.PSEvents[0].type;
    var url = ps.PSEvents[0].url;
    var notice_time = ps.PSEvents[0].notice_time;
    var start_time = ps.PSEvents[0].start_time;
    var end_time = ps.PSEvents[0].end_time;
    var discontinued_time = ps.PSEvents[0].discontinued_time;
    var time_array = [];
    var game_id = ps.PSEvents[0].game_id;
    time_array.push(notice_time);
    time_array.push(start_time);
    time_array.push(end_time);
    time_array.push(discontinued_time);
    var kind = ps.PSEvents[0].kind;
}

var Ps_Activity = cc.Layer.extend({
    _uuid:"",
    _type:"",
    _url:"",
    _url2:"",
    _kind:"",
    _start_time:"",
    _end_time:"",
    _notice_time:"",
    _discontinued_time:"",
    _click_index :0,
    _first_enter:true,
    _time_array:[],
    _win_check:false,
    ctor:function(){
        this._super();
        this._initActivityParameter();

        this._drawNode = new cc.DrawNode();
        this._drawNode.setVisible(false);
        this.addChild(this._drawNode);

        this._webvCheckButton = new ccui.Button(res.checkBtn, res.checkBtn_h);
        this.addChild(this._webvCheckButton);

        this._webvTicketButton = new ccui.Button(res.ticketBtn, res.ticketBtn_h);
        this.addChild(this._webvTicketButton);

        this._webvInforButton = new ccui.Button(res.inforBtn, res.inforBtn_h);
        this.addChild(this._webvInforButton);

        this._webViewCloseBtn = new ccui.Button(res.event_close_down_png, res.event_close_up_png);
        this._webViewCloseBtn.setVisible(false);
        this.addChild(this._webViewCloseBtn);

        this._ActivityTime = new cc.LabelTTF("","Arial", 18);
        this._ActivityTime.setColor(new cc.color("#fff799"));
        this._ActivityTime.setAnchorPoint(0.5,0.5);
        this._ActivityTime.lineWidth = 0.5;
        // this.addChild(this._ActivityTime);

        this._setListener();
    },

    reset_position:function(){
        this._webvCheckButton.setPosition(ps.WebvCheckButtonPos[BK.DEVICE_MODE]);
        this._webvTicketButton.setPosition(ps.WebvTicketButtonPos[BK.DEVICE_MODE]);
        this._webvInforButton.setPosition(ps.WebvInforButtonPos[BK.DEVICE_MODE]);
        this._webViewCloseBtn.setScale(ps.WebvCloseButtonScale[BK.DEVICE_MODE]);
        this._ActivityTime.setPosition(ps.ActivtityTimePos[BK.DEVICE_MODE]);
        this.DrawMask();
        if (this._webView){
            if (this._webVIndex === 0 || this._webVIndex === 1) {
                this._webView.setContentSize(ps.WebGameContextSize[BK.DEVICE_MODE]);
                this._webViewCloseBtn.setPosition(ps.WebvCloseButtonPos[BK.DEVICE_MODE]);
            } else {
                this._webView.setContentSize(ps.WebPosContextSize[BK.DEVICE_MODE]);
                this._webViewCloseBtn.setPosition(ps.WebvCloseButtonPos2[BK.DEVICE_MODE]);
            }
            this._webView.setPosition(ps.WebPos[BK.DEVICE_MODE]);
            if (!cc.sys.isMobile && DEF_GAMEID.indexOf("PSTM") !== -1){
                this._webView.setPositionX(ps.WebPos[BK.DEVICE_MODE].x - 215);
                this._webView.setPositionY(ps.WebPos[BK.DEVICE_MODE].y - 405);
            }
        }
    },
    _setData:function(uuid,type,url,time,status,kind){
        this._uuid = uuid;
        this._type = type;
        this._url = url;
        this._setTime(time);
        this._time_array = time;
        this._status = status;
        this._kind = kind;
        if (this._url == ""){
            this.setVisible(false);
        }
    },
    _setTime:function(time){
        this._notice_time = time[0];
        this._start_time = time[1];
        this._end_time = time[2];
        this._discontinued_time = time[3];
    },
    _setUrl:function(url, index){
        if (index === ps.WebViewIndex.Check) {
            url =  ActivityURL +
                "?lang="        + "tai" +
                "&curScene="    + index +
                "&click="       + this._click_index;
        } else if (index === ps.WebViewIndex.Ticket) {
            url =  ActivityURL +
                "?lang="        + "tai" +
                "&curScene="    + index +
                "&click="       + this._click_index;
        } else if (index === ps.WebViewIndex.Infor) {
            url = url +
                "?lang="        + "tai"     +
                "&uid="         + accessToken +
                "&host_ext_id=" + WebHostid   +
                "&type="        + this._type  +
                "&click="       + this._click_index;
        }

        this._url2 = url;
    },
    _setListener:function(){
        // for avoid to click lower layer
        this._listener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(){
                return this.isVisible();
            }.bind(this)
        }, this);
        this._listener.setEnabled(false);
        this._webvInforButton.addTouchEventListener(function(touch,type){
            if (type === ccui.Widget.TOUCH_ENDED){
                this._addWebView(ps.ClickCheck.Manual, ps.WebViewIndex.Infor);
            }
        },this);
        this._webvCheckButton.addTouchEventListener(function(touch,type){
            if (type === ccui.Widget.TOUCH_ENDED){
                this._addWebView(ps.ClickCheck.Manual, ps.WebViewIndex.Check);
            }
        },this);
        this._webvTicketButton.addTouchEventListener(function(touch,type){
            if (type === ccui.Widget.TOUCH_ENDED){
                this._addWebView(ps.ClickCheck.Auto, ps.WebViewIndex.Ticket);
            }
        },this);
        this._webViewCloseBtn.addTouchEventListener(function(touch,type){
            if (type === ccui.Widget.TOUCH_ENDED){
                this._removeWebView();
            }
        },this);
    },
    _enableListener:function(enable) {
        this._webvInforButton.setTouchEnabled(!enable);
        this._webViewCloseBtn.setEnabled(enable);
        this._listener.setEnabled(enable);
    },
    _addWebView:function(click_index, webVIndex){
        if (click_index === undefined) click_index = 0;
        this._click_index = click_index;
        this._url2 = "";
        this._drawNode.setVisible(true);
        this.DrawMask();
        this._cleanWebView();
        this._enableListener(true);
        this._webViewCloseBtn.setVisible(true);
        this._webView = new ccui.WebView();
        this._setUrl(this._url, webVIndex);
        cc.log(this._url2);
        this.scheduleOnce(function () {
            this._webView.loadURL(this._url2);
        },0.5);
        this._webVIndex = webVIndex;
        if (this._webVIndex === 0 || this._webVIndex === 1) {
            this._webView.setContentSize(ps.WebGameContextSize[BK.DEVICE_MODE]);
            this._webViewCloseBtn.setPosition(ps.WebvCloseButtonPos[BK.DEVICE_MODE]);
        } else {
            this._webView.setContentSize(ps.WebPosContextSize[BK.DEVICE_MODE]);
            this._webViewCloseBtn.setPosition(ps.WebvCloseButtonPos2[BK.DEVICE_MODE]);
        }
        this._webView.setPosition(ps.WebPos[BK.DEVICE_MODE]);
        if (!cc.sys.isMobile && (DEF_GAMEID.indexOf("PSTM") !== -1 || DEF_GAMEID.indexOf("133") !== -1)){
            this._webView.setPositionX(ps.WebPos[BK.DEVICE_MODE].x - 215);
            this._webView.setPositionY(ps.WebPos[BK.DEVICE_MODE].y - 405);
        }
        this.addChild(this._webView);
    },
    _removeWebView:function(){
        this._cleanWebView();
        this._enableListener(false);
        this._webViewCloseBtn.setVisible(false);
        this._drawNode.setVisible(false);
    },
    _cleanWebView:function(){
        if (this._webView) {
            this._webView.cleanup();
            this._webView.removeFromParent();
        }
    },
    _initActivityParameter:function(){
        this._ActivityTime = null;
        this._webView = null;
        this._webvInforButton = null;
        this._webViewCloseBtn = null;

        this._uuid = "";
        this._type = '';
        this._url = '';
        this._status = -1;
        this._start_time = "";
        this._end_time = "";
        this._notice_time = "";
        this._discontinued_time = "";
        this._kind = -1;
    },
    handle_broadcast:function(data){
        this._setData(uuid, type, url, time_array,"", kind);
        this.scheduleUpdate();
        this._addWebView(ps.ClickCheck.Manual, ps.WebViewIndex.Infor);
        // if (data._eventid == BK.EVENTID[BK.EVENTTYPE.COMMON].eNETREADY) {
        //     // this._addWebView(ps.ClickCheck.Auto);
        //     this._setData(uuid, type, url, time_array,"", kind);
        //     this.scheduleUpdate();
        // }
        // if(data._eventid ==BK.EVENTID[BK.EVENTTYPE.OTHER].eTILEMSSAGE){
        //     this.handle_tilemsg(data._string,data._userdata);
        // }
    },
    handle_tilemsg:function(str,type){
        switch (type){
            case BK.TILEMSGTYPE.ALARM:
                this._removeWebView();
                break;
        }
    },
    update:function(){
        this._ActivityTime.setString(this.DateDifference(this._start_time,this._end_time,this._discontinued_time,this._time_array));
        if(this._ActivityTime.getContentSize().width > this._webvInforButton.getContentSize().width*0.7){
            var rate = this._webvInforButton.getContentSize().width*0.7/this._ActivityTime.getContentSize().width;
            this._ActivityTime.setScale(rate);
        }else{
            this._ActivityTime.setScale(1);
        }
    },
    DrawMask:function(show){
        this._drawNode.clear();
        var color = cc.color(0, 0, 0, 150);
        this._drawNode.drawRect(ps.DrawNode_HW[BK.DEVICE_MODE][0], ps.DrawNode_HW[BK.DEVICE_MODE][1],color, 1, color);
    },
    _cleanWebvShow:function(){
        if (this._first_enter) {
            this._first_enter = false;
            this._webvInforButton.setVisible(false);
            this._ActivityTime.setVisible(false);
            this._removeWebView();
            this._webvTicketButton.setVisible(false);
            this._webvCheckButton.setVisible(false);
        }
    },
    _enter:true,
    _FirstEnterPre:function(){
        if (this._enter){
            res.banner_bottom_02 = "res/common/pic/banner/banner_bottom1.png";
            cc.director.getRunningScene()._layer.main.banner.BANNER_RES = [
                res.banner_bottom_01,
                res.banner_bottom_02,
            ]
            this._enter = false;
        }
    },

    _enter1:true,
    _FirstEnterAct:function(){
        if (this._enter1){
            res.banner_bottom_02 = "res/common/pic/banner/banner_bottom2.png";
            cc.director.getRunningScene()._layer.main.banner.BANNER_RES = [
                res.banner_bottom_01,
                res.banner_bottom_02,
            ]
            this._enter1 = false;
        }
    },

    DateDifference:function(startime, endtime, discontinuetime, TimeArr){
        var Nowtime = new Date();
        var offset  = Nowtime.getTimezoneOffset(); // => 格林尼治时间與本地时间差(單位 分鐘)
        var UTCtime = Nowtime.getTime() + offset*60*1000;

        var Startime = new Date(startime).getTime();
        var Endtime = new Date(endtime).getTime();
        var OffActivityTime = new Date(discontinuetime).getTime();
        var Activity_StartToNow = Startime - UTCtime;
        var Activity_EndtoNow = Endtime - UTCtime;
        var Activity_off = OffActivityTime - UTCtime;
        for (var i = 0 ; i < TimeArr.length;i++){
            if (UTCtime < new Date(TimeArr[ps.TimeState.notice_time]).getTime()){
                this._cleanWebvShow(); //未到預熱時間點 關閉按鈕
                return;
            }
            else if (UTCtime < new Date(TimeArr[ps.TimeState.start_time]).getTime()){ //預熱開始時間
                this._FirstEnterPre();
                this._webvTicketButton.setEnabled(false);
                this._webvCheckButton.setEnabled(false);
                this._webvInforButton.setVisible(true);
                this._ActivityTime.setVisible(true);
                this._ActivityTime.setFontSize(16);
                return "Coming Soon";
            }
            else if (UTCtime < new Date(TimeArr[ps.TimeState.end_time]).getTime()){ //活動開始時間
                this._FirstEnterAct();
                this._webvInforButton.setVisible(true);
                this._ActivityTime.setVisible(true);
                this._ActivityTime.setFontSize(18);

                var days = Math.floor(Activity_EndtoNow/(24*60*60*1000));   //天

                var hours = Math.floor(Activity_EndtoNow/(60*60*1000) % 24);//小时
                if (hours < 10) hours = "0" + hours;

                var minutes = Math.floor(Activity_EndtoNow/(60*1000) % 60); //分鐘
                if (minutes < 10) minutes = "0" + minutes;

                var second = Math.floor(Activity_EndtoNow/ (1000) % 60);    //秒數
                if (second < 10) second = "0" + second;

                // var time = days + "天"+hours+"時"+minutes+"分"+second+"秒";
                // var time = this._lang_text(days,hours);

                if (pslb.Language === "tai"){
                    var time = days + "วัน " + hours + "ชม." + minutes + "น.";
                }  else {
                    var time = days + "D " + hours + "H " + minutes + "M";
                }

                if (days <= 0){
                    time = hours + ":" + minutes + ":" + second;
                }
                return time;
            }
            else if (UTCtime < new Date(TimeArr[ps.TimeState.discontinued_time]).getTime()){ //查榜時間
                if (pslb.Language === "tai"){
                    this._ActivityTime.setFontSize(13);
                    return "ยินดีด้วย!";
                }  else {
                    return "Congratulations!";
                }

            }
            else {    //超過下架時間 活動結束
                this._cleanWebvShow();
                return;
            }
        }
    },
    _lang_text:function(days,hours){
        switch (pslb.Language) {
            case 'tch':
                return days + "D" + hours + "H";
                break;
            case 'sch':
                return days + "D" + hours + "H";
                break;
            case 'eng':
                return days + "D" + hours + "H";
                break;
            case 'tai':
                return days + "D" + hours + "H";
                break;
            default:
                break;
        }
    }
});

ccui.WebView.prototype.visit = function(){
    var cmd = this._renderCmd,
        div = cmd._div,
        container = cc.container,
        eventManager = cc.eventManager;
    if (this._visible) {
        if (!this._hasVisit)container.appendChild(div);
        if (this._listener === null)
            this._listener = eventManager.addCustomListener(cc.game.EVENT_RESIZE, function () {
                cmd.resize();
            });
    } else {
        var hasChild = false;
        if ('contains' in container) {
            hasChild = container.contains(div);
        } else {
            hasChild = container.compareDocumentPosition(div) % 16;
        }
        if (hasChild)
            container.removeChild(div);
        var list = eventManager._listenersMap[cc.game.EVENT_RESIZE].getFixedPriorityListeners();
        eventManager._removeListenerInVector(list, cmd._listener);
        cmd._listener = null;
    }
    cmd.updateStatus();
    cmd.resize(cc.view);
    this._hasVisit = true;
};
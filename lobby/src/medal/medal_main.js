pslb.MedalSystem = pslb.MedalSystem || {};

pslb.MedalSystem.MedalID = {
    green: 0,
    blue : 1,
    red  : 2
};

pslb.WeekEndBillboard = cc.Layer.extend({
    _medal:{},
    _medalNum:{},

    _medalWidth:{},
    ICON_ANCHOR_POINT: cc.p(-2, -78),
    FLOW_ORDER:["red","blue","green"],
    PADDING_WIDTH: 22,
    _effect:null,
    _music:null,

    ctor:function () {
        this._super();
        var self=this;
        self.setName("WeekEndBillboard");

        this.setPosition(cc.winSize.width/2,cc.winSize.height/2);

        var MedalID=pslb.MedalSystem.MedalID;

        var black=new cc.Sprite(res.bg_dark);
        this.addChild(black);

        var bg2 = new cc.Sprite(pslb.MedalSystem.res.week_bg_png);
        bg2.setPosition(-6, -4);
        this.addChild(bg2);

        var bg = new cc.Sprite(pslb.MedalSystem.res.week_tile_png);
        this.addChild(bg);

        var logo = new cc.Sprite(pslb.MedalSystem.res.week_psreward_logo_png);
        logo.setPosition(-237, 190);
        this.addChild(logo);

        var win_word = new cc.Sprite(pslb.MedalSystem.res.week_total_text_png);
        win_word.setPosition(0, 68);
        this.addChild(win_word);

        var redMedal = new cc.Sprite(pslb.MedalSystem.res.week_red_png);
        redMedal.setPosition(this.ICON_ANCHOR_POINT);
        this.addChild(redMedal);
        redMedal.setVisible(false);
        this._medal[MedalID.red] = redMedal;
        this._medalWidth[MedalID.red] = redMedal.getContentSize().width;

        var rXNum = new cc.Sprite(pslb.MedalSystem.res.week_num_x_png);
        rXNum.setPosition(31, 71);
        redMedal.addChild(rXNum);

        var redMedalNum = new pslb.NumberAtlas("", pslb.MedalSystem.res.week_num_png, 12, 32);
        redMedalNum._map_char={
            '0' : 'AB',
            '1' : 'CD',
            '2' : 'EF',
            '3' : 'GH',
            '4' : 'IJ',
            '5' : 'KL',
            '6' : 'MN',
            '7' : 'OP',
            '8' : 'QR',
            '9' : 'ST',
            '.' : 'U',
            ',' : 'V'
        };
        redMedalNum.setAnchorPoint(0.5, 0.5);
        redMedalNum.setPosition(31, 23);
        redMedal.addChild(redMedalNum);
        this._medalNum[MedalID.red] = redMedalNum;

        var blueMedal = new cc.Sprite(pslb.MedalSystem.res.week_blue_png);
        blueMedal.setPosition(this.ICON_ANCHOR_POINT);
        this.addChild(blueMedal);
        blueMedal.setVisible(false);
        this._medal[MedalID.blue] = blueMedal;
        this._medalWidth[MedalID.blue] = blueMedal.getContentSize().width;

        var bXNum = new cc.Sprite(pslb.MedalSystem.res.week_num_x_png);
        bXNum.setPosition(31, 71);
        blueMedal.addChild(bXNum);

        var blueMedalNum = new pslb.NumberAtlas("", pslb.MedalSystem.res.week_num_png, 12, 32);
        blueMedalNum._map_char={
            '0' : 'AB',
            '1' : 'CD',
            '2' : 'EF',
            '3' : 'GH',
            '4' : 'IJ',
            '5' : 'KL',
            '6' : 'MN',
            '7' : 'OP',
            '8' : 'QR',
            '9' : 'ST',
            '.' : 'U',
            ',' : 'V'
        };
        blueMedalNum.setAnchorPoint(0.5, 0.5);
        blueMedalNum.setPosition(31, 23);
        blueMedal.addChild(blueMedalNum);
        this._medalNum[MedalID.blue] = blueMedalNum;

        var greenMedal = new cc.Sprite(pslb.MedalSystem.res.week_green_png);
        greenMedal.setPosition(this.ICON_ANCHOR_POINT);
        this.addChild(greenMedal);
        greenMedal.setVisible(false);
        this._medal[MedalID.green] = greenMedal;
        this._medalWidth[MedalID.green] = greenMedal.getContentSize().width;

        var gXNum = new cc.Sprite(pslb.MedalSystem.res.week_num_x_png);
        gXNum.setPosition(31, 71);
        greenMedal.addChild(gXNum);

        var greenMedalNum = new pslb.NumberAtlas("", pslb.MedalSystem.res.week_num_png, 12, 32);
        greenMedalNum._map_char={
            '0' : 'AB',
            '1' : 'CD',
            '2' : 'EF',
            '3' : 'GH',
            '4' : 'IJ',
            '5' : 'KL',
            '6' : 'MN',
            '7' : 'OP',
            '8' : 'QR',
            '9' : 'ST',
            '.' : 'U',
            ',' : 'V'
        };
        greenMedalNum.setAnchorPoint(0.5, 0.5);
        greenMedalNum.setPosition(31, 23);
        greenMedal.addChild(greenMedalNum);
        this._medalNum[MedalID.green] = greenMedalNum;


        var coin = new cc.Sprite(pslb.MedalSystem.res.week_coin_png);
        coin.setPosition(this.ICON_ANCHOR_POINT);
        this.addChild(coin);
        coin.setVisible(false);
        this._medalCoin = coin;
        this._medalWidthCoin = coin.getContentSize().width;

        var cXNum = new cc.Sprite(pslb.MedalSystem.res.week_num_x_png);
        cXNum.setPosition(31, 71);
        coin.addChild(cXNum);

        var coinNum = new pslb.NumberAtlas("",pslb.MedalSystem.res.week_num_png, 12, 32);
        coinNum._map_char={
            '0' : 'AB',
            '1' : 'CD',
            '2' : 'EF',
            '3' : 'GH',
            '4' : 'IJ',
            '5' : 'KL',
            '6' : 'MN',
            '7' : 'OP',
            '8' : 'QR',
            '9' : 'ST',
            '.' : 'U',
            ',' : 'V'
        };
        coinNum.setAnchorPoint(0.5, 0.5);
        coinNum.setPosition(31, 23);
        coin.addChild(coinNum);
        this._medalNumCoin = coinNum;


        this.setVisible(false);

    },
    setListener:function () {
        var self=this;
        cc.eventManager.removeListener(this);
        // for avoid to click lower layer
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(){
                var visible=this.isVisible();
                cc.log(self.getName()+" visible="+visible);
                return visible;
            }.bind(this)
        }, this);
    },
    _createCloseBtn:function () {
        var self=this;
        this.removeChild(this._btnClose);
        this._btnClose=new ccui.Button(
            pslb.MedalSystem.res.week_close_png,
            pslb.MedalSystem.res.week_close_down_png,
            pslb.MedalSystem.res.week_close_down_png);
        this._btnClose.setPosition(254, 224);
        this._btnClose.setTouchEnabled(true);
        this._btnClose.addTouchEventListener(function (touch,type) {
            if(type == ccui.Widget.TOUCH_ENDED)
            {
                self.close();
            }
        },this);
        this.addChild(this._btnClose);

    },
    auto_layout:function () {
        var elementWidths = {};
        var totalWidth = 0;

        for(var prop in this._medal){
            if(this._medal[prop].isVisible()) {
                var width = Math.max(this._medalNum[prop].getContentSize().width + this.PADDING_WIDTH, this._medalWidth[prop]);
                elementWidths[prop] = width;
                totalWidth += width;
            }
        }

        var elementWidthsCoin = 0;
        if(this._medalCoin.isVisible()){
            var width = Math.max(this._medalNumCoin.getContentSize().width + this.PADDING_WIDTH, this._medalWidthCoin);
            elementWidthsCoin = width;
            totalWidth += width;
        }

        var curX = 0;
        for(var i = 0; i < this.FLOW_ORDER.length; i++){
            var id = pslb.MedalSystem.MedalID[this.FLOW_ORDER[i]];
            if(elementWidths[id] === undefined)
                continue;

            var startX = this.ICON_ANCHOR_POINT.x - totalWidth/2 + curX;
            this._medal[id].setPositionX(startX + elementWidths[id]/2);
            curX += elementWidths[id];
        }

        if(this._medalCoin.isVisible()) {
            var startX = this.ICON_ANCHOR_POINT.x - totalWidth / 2 + curX;
            this._medalCoin.setPositionX(startX + elementWidthsCoin / 2);
        }
    },
    setMedal:function (medal,psCoin) {
        var self=this;
        medal=medal || [];

        // medal=[{code:2,count:3},
        //        {code:1,count:4},
        //        {code:0,count:5}];
       // psCoin=2;



        var hasData = false;
        var coin = psCoin || 0;
        medal.forEach(function (e) {
            if (e.count > 0) {
                self._medalNum[e.code].setNumber(e.count);
                self._medalNum[e.code].setVisible(true);
                self._medal[e.code].setVisible(true);
                hasData = true;
            }
            else {

                self._medalNum[e.code].setNumber(0);
                self._medalNum[e.code].setVisible(false);
                self._medal[e.code].setVisible(false);
            }
        });

        if(coin > 0){
            this._medalCoin.setVisible(true);
            this._medalNumCoin.setNumber(coin);
            hasData = true;
        }


        if(hasData)
        {
            this.schedule(this._schedule_wheelTurning);
        }
        else
        {
            pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                {
                    id:pslb.PageId.ps_reward_week,
                    enabled: false
                });
            cc.log("Hide week reward ( No data ).");
        }


    },
    open:function () {
        this.setListener();
        this.setVisible(true);
        this._createCloseBtn();
        if(this._effect)
            cc.audioEngine.stopEffect(this._effect);
        if(this._music)
            cc.audioEngine.stopMusic(this._music);


        this._effect= cc.audioEngine.playEffect(pslb.MedalSystem.res.sound_PSBanner);
        cc.audioEngine.playMusic(pslb.MedalSystem.res.sound_PSBannerBackground,true);
        this.auto_layout();
    },
    close:function () {
        pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
            {
                id:pslb.PageId.ps_reward_week,
                enabled: false
            });
        if(this._effect)
            cc.audioEngine.stopEffect(this._effect);

        cc.audioEngine.stopMusic(true);
    },
    _schedule_wheelTurning:function () {
        if(!pslb.isWheelTurning)
        {
            this.open();
            cc.log("Show week reward.");
            this.unschedule(this._schedule_wheelTurning);
        }
    }
});

//*************************************************************
// add ps namespace for new loading (load images from server)
// 2019/05/16
// add by chiyung
//*************************************************************
var ps = ps || {};
ps.SERVER_LOADING_IMAGNE_ENUM= {
    LOADING:0,
    BANNER:1
};

ps.SERVER_PS_IMAGNE_ENUM= {
    General : 0,
    Jackpot : 1,
    LuckyDraw : 2,
    RedPacket: 3,
    Ranking: 4
};
ps.PsImagesPath = "../PSImages/";
ps.GetPSImages = (function() {
    if (typeof getPSImages == "function")
        return getPSImages();
    ps.PsImagesPath = "res/PSImages/";
    return [0, 0, 0, 1, 0];
})();

ps.LoadingTextPath = "../HostImages/" +ps.SERVER_LOADING_IMAGNE_ENUM.LOADING + "/common/" + pslb.Language + "/loading_text.png";
ps.LoadingBar00Path = "../HostImages/" +ps.SERVER_LOADING_IMAGNE_ENUM.LOADING + "/common/loading_bar00.png";
ps.LoadingBar01Path = "../HostImages/" +ps.SERVER_LOADING_IMAGNE_ENUM.LOADING + "/common/loading_bar01.png";
ps.GetHostImages = (function(){
    if(typeof getHostImages == "function") {
        console.log("HostImages" + getHostImages());
        return getHostImages();
    }
    else{
        return;
        //*******************************************************************
        // for test images path
        // 新Loading模式由Server讀取圖檔，透過getHostImages抓取圖檔路徑
        // 沒有透過API連線遊戲，無法使用此功能，因此開發端會進入else判斷內。
        // 為了配合新、舊UI都能使用此功能，開發端預設皆為舊版的Loading頁面(星星Logo)
        // 如需測試新版Loading，請將圖檔放入專案內，並自行設定下方路徑
        //*******************************************************************
        // ps.LoadingTextPath = "loading_text.png";
        // ps.LoadingBar00Path = "loading_bar00.png";
        // ps.LoadingBar01Path = "loading_bar01.png";
        // return {
        //     0:{"h":["loading_ad_2.png"],"v":["loading_ad_m_2.png"]},
        //     1:{"h":["banner_00.png"],"v":["banner_m_00.png"]}
        // };
    }
})();

ps.NewLoadingPosition = {
    LoadingMode:["h", "v"],
    LoadingBg:[cc.p(640, 360), cc.p(360, 640)],
    LoadBarDown:[cc.p(640, 149), cc.p(360, 210)],
    LoadBarUp:[cc.p(390, 140), cc.p(35, 200)],
    LoadLabel:[cc.p(642, 179), cc.p(370, 254)],
    LoadText:[cc.p(604, 179), cc.p(325, 253)],
    LoadBanner:[cc.p(640, 70), cc.p(360, 95)],
    LoadingScale:[1, 1.2],
};

ps.New_loading = cc.Node.extend({
    ctor: function () {
        this._super();

        var HostImages = ps.GetHostImages;
        console.log("GetPSImages = " + ps.GetPSImages);
        if (HostImages !== undefined) {
            var BannerImageClass = ps.GetHostImages[ps.SERVER_LOADING_IMAGNE_ENUM.BANNER];
            var LoadingImageClass = ps.GetHostImages[ps.SERVER_LOADING_IMAGNE_ENUM.LOADING];
            console.log("GetHostImages BANNER = " + BannerImageClass);
            if(BannerImageClass !== undefined && LoadingImageClass !== undefined){
                var LoadingImageObject = BannerImageClass[ps.NewLoadingPosition.LoadingMode[ps.DEVICE_MODE]];
                console.log("BANNER = " + LoadingImageObject);
                var LoadingImageNum = Math.floor(Math.random()*LoadingImageObject.length);
                var LoadingImagePath = LoadingImageObject[LoadingImageNum];
                if(LoadingImagePath !== undefined) {
                    this.bar_text = new cc.Sprite(LoadingImagePath);
                    this.bar_text.setPosition(ps.NewLoadingPosition.LoadBanner[ps.DEVICE_MODE]);
                    this.addChild(this.bar_text,0);
                }
            }

            if(LoadingImageClass !== undefined) {
                this.loading_text = new cc.Sprite(ps.LoadingTextPath);
                this.loading_text.setPosition(ps.NewLoadingPosition.LoadText[ps.DEVICE_MODE]);
                this.loading_text.setScale(ps.NewLoadingPosition.LoadingScale[ps.DEVICE_MODE]);
                this.addChild(this.loading_text,0);
            }
        }
    }
});

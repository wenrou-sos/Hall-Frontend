var pslb = pslb || {};

pslb.MobilePosAdjustValue=5;

pslb.PIC_POS_VAR={
    CBW:{
        W_posX: 580,
        W_posY: 723,
        W_fontSize: 48
    },
    TILE:{

    }
};

pslb.ErrorLayer = cc.Node.extend({
    sprite:null,
    _bg:null,
    _text:null,
    ctor:function () {
        this._super();
    },

    showError:function(error_code){
        !cc.isNumber(error_code)|| function(){
            var size = cc.winSize;
            var bg = new cc.DrawNode();
            bg.drawRect(
                cc.p(size.width / 2 - 450, size.height / 2 - 70),
                cc.p(size.width / 2 + 450, size.height / 2 + 70),
                cc.color(0,0,255,255), 1, cc.color(0,0,255,255)
            );
            this._bg = bg;
            this.addChild(bg);
            var str = pslb.Text.Error + "(" + error_code + ")";
            var text = new cc.LabelTTF(str, pslb.TTFName, 48);
            text.setAnchorPoint(0.5,0.5);
            text.setColor(cc.color(255,255,255,255));
            text.setPosition(size.width/2, size.height/2);
            this.addChild(text);
            this._text = text;
        }.call(this);
    },

    reset_position:function(){
        var size = cc.winSize;
        this._text.setPosition(size.width/2, size.height/2);

        this._bg.clear();

        this._bg.drawRect(
            cc.p(size.width / 2 - 450, size.height / 2 - 70),
            cc.p(size.width / 2 + 450, size.height / 2 + 70),
            cc.color(0,0,255,255), 1, cc.color(0,0,255,255)
        );

    },

    closeError:function(){
        this.removeAllChildren();
    }

});

var LobbyLayer = cc.Layer.extend({
    sprite:null,
    _model:null,
    _webView:null,
    _error_layer:null,
    ctor:function () {
        this._super();

        this.main = new pslb.mainPage();
        this.addChild(this.main);

        this.bcw = null;
        this.help = null;
        this.mail =null;
        this.bgwhelp = null;
        this.levelup = null;
        this.jpwin=null;
        this.ps_reward_week=null;

        // //load first
        // this.mail = new pslb.MailPageNode();
        // this.mail.setVisible(false);
        // this.addChild(this.mail);


        this._listenerErrorEvent();
        this._listenerPageEnabled();

        //If last game not finished
        if(pslb.bigChallengeResult.container.length>0){
            var result=pslb.bigChallengeResult.container[0];
            var game=result.trigger_game;
            this._open_game(game.game_id,game.subgame_id);
        }
        //

        this.schedule(this.update,0.05);

        this.handle_canvas_resize();

        return true;
    },
    _open_game:function (gameId, subgame_id) {
        // cc.log("FUNC:_Open_game_power cycle");
        if(!gameId || !subgame_id) return;
        // Open Game
        var url=pslb.BuildLaunchURL(gameId, subgame_id);

        this._webView= new ccui.WebView(url);
        this._webView.setContentSize(cc.winSize.width+5, cc.winSize.height+5);
        var iframe = this._webView;
        iframe.scheduleUpdate();
        iframe.update=function () {
            iframe.width=cc.winSize.width+5;
            iframe.heigt=cc.winSize.height+5;
        };

        this.addChild(this._webView);

        pslb.isWheelTurning=true; //playing

        this.schedule(this._close_game);
    },
    _close_game:function () {
        if(pslb.isCloseGame)
        {
            // cc.log("FUNC:_Close_game_power cycle");
            pslb.isCloseGame=false;
            pslb.isWheelTurning=false;
            this.unschedule(this._close_game);
            if(this._webView)
            {
                this._webView.cleanup();
                this.removeChild(this._webView);
            }
        }
    },

    _listenerErrorEvent: function(){
        this._listenerError = cc.EventListener.create({
            event:cc.EventListener.CUSTOM,
            eventName:pslb.CustomEvent.Error,

            callback:function(event){
                var target = event.getCurrentTarget();
                var error_code = event.getUserData();
                var self = this;
                target.getChildren().forEach(function(node){
                    cc.eventManager.pauseTarget(node,true);
                });

                var el = new pslb.ErrorLayer();
                el.showError(error_code);
                target._error_layer = el;
                target.addChild(el);
            }

        });
        cc.eventManager.addListener( this._listenerError  ,this);
    },
    _listenerPageEnabled: function(){
        this._listenerBCEnabled = cc.EventListener.create({
            event:cc.EventListener.CUSTOM,
            eventName:pslb.CustomEvent.PageEnabled,
            callback:function(event){
                var target = event.getCurrentTarget();
                var data = event.getUserData();
                if(data.id == pslb.PageId.bigChallenge)
                    target.bigChallengeEnabled(data.enabled);
                else if (data.id == pslb.PageId.help)
                    target.helpEnabled(data.enabled);
                else if (data.id == pslb.PageId.mail)
                    target.mailEnabled(data.enabled);
                else if (data.id == pslb.PageId.bgwhelp)
                    target.bgwhelpEnabled(data.enabled);
                else if (data.id == pslb.PageId.levelup)
                    target.levelupEnabled(data.enabled);
                else if (data.id == pslb.PageId.jpwin)
                    target.jpwinEnabled(data.enabled,data.jp,data.time);
                else if (data.id == pslb.PageId.ps_reward_week)
                    target.ps_reward_weekEnabled(data.enabled);
            }

        });
        cc.eventManager.addListener( this._listenerBCEnabled  ,this);
    },

    bigChallengeEnabled:function(enabled){
        if(enabled){
            if(pslb.isBigChallenge == true){
                console.log("isBigChallenge = true");
                return;
            }
            pslb.isChallengeHelpOn = false;
            // cc.eventManager.pauseTarget(this.main,true);
            this.removeChild(this.bcw);
            this.bcw = new pslb.bigChallenge(pslb.bigChallengeBet);
            this.addChild(this.bcw);

            this.bcw.setVisible(true);
            pslb.isBigChallenge = true;

            if (this._bg){
                this.removeChild(this._bg);
            }

            cc.eventManager.addListener({
                event : cc.EventListener.KEYBOARD,
                onKeyPressed : function (keycode, event) {
                    if(keycode == 27) {
                        console.log("esc");
                        // event.getCurrentTarget().bcw.setVisible(!event.getCurrentTarget().bcw.isVisible());
                        pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                            {
                                id: pslb.PageId.bigChallenge,
                                enabled: false
                            });
                    }
                }
            },this)
        }else{
            // cc.eventManager.resumeTarget(this.main,true);
            if(this.bcw){
                if (!pslb.isChallengeHelpOn)
                    this.bcw.setVisible(false);
                else {
                    this.removeChild(this._bg);
                    var size=cc.winSize;
                    this._bg = new cc.Sprite(res.bg_dark);
                    this._bg.setPosition(size.width/2,size.height/2);
                    this.addChild(this._bg);
                }
                pslb.isBigChallenge = false;
            }

        }
    },

    helpEnabled:function(enabled){
        if(pslb.isBigChallenge == true){
            console.log("isBigChallenge = true");
            return;
        }
        if(enabled){
            // cc.eventManager.pauseTarget(this.main,true);
            this.removeChild(this.help);
            this.help = new pslb.help();
            this.addChild(this.help);

            this.help.setVisible(true);
            this.help._createCloseBtn();
        }else{
            // cc.eventManager.resumeTarget(this.main,true);
            if(this.help)
                this.help.setVisible(false);
        }
    },
    mailEnabled:function(enabled){
        if(pslb.isBigChallenge == true){
            console.log("isBigChallenge = true");
            return;
        }
        if(enabled){
            // cc.eventManager.pauseTarget(this.main,true);
            if(this.mail)
                this.removeChild(this.mail);
            this.mail = new pslb.MailPageNode();
            this.addChild(this.mail);
            this.mail.openMailList();
            this.mail.reset_position();

        }else{
            // cc.eventManager.resumeTarget(this.main,true);
            if(this.mail)
                this.removeChild(this.mail);
        }
    },


    update:function(){
        if(CANVAS_RESIZE){
            CANVAS_RESIZE=false;
            this.handle_canvas_resize();
        }
    },

    handle_canvas_resize:function(){
        if (BK.DEVICE_MODE === 0){
            cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);
        } else {
            cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.SHOW_ALL);
        }
        this.main.reset_position();
        if( this._error_layer)
            this._error_layer.reset_position();
        if(this.mail)
            this.mail.reset_position();
    },

    bgwhelpEnabled:function(enabled) {
        if(enabled){
            //cc.eventManager.pauseTarget(this.bcw,true);
            this.removeChild(this.bgwhelp);
            this.bgwhelp = new pslb.UIHelp();
            if(pslb.PayTableConfig[pslb.Language] !== undefined)
            {
                this.bgwhelp.initPayLabel(pslb.PayTableConfig[pslb.Language]);
                // this.bgwhelp.setPayLabelNum(pslb.PayTableConfig[pslb.Language].reference_bet*pslb.bigChallengeBet);
            }
            this.bgwhelp.changePage(0);

            this.addChild(this.bgwhelp,1);
            this.bgwhelp.setVisible(true);

            this.bigChallengeEnabled(false);
        }else{
            // cc.eventManager.resumeTarget(this.bcw,true);
            if(this.bgwhelp)
                this.bgwhelp.setVisible(false);

            this.bigChallengeEnabled(true);
        }
    },

    levelupEnabled:function(enabled){
        if(enabled){
            // cc.eventManager.pauseTarget(this.main,true);
            if(!this.levelup) {
                this.levelup = new pslb.LevelUp();
                this.addChild(this.levelup);
            }
            this.levelup.setVisible(true);
        }else{
            // cc.eventManager.resumeTarget(this.main,true);
            if(this.levelup){
                this.levelup.setVisible(false);
                // cc.log("location reload()");
                location.reload();
            }
        }
    },
    jpwinEnabled:function(enabled,jp,time){
        if(enabled){
            cc.eventManager.pauseTarget(this.bcw,true);
            this.removeChild(this.jpwin);
            this.jpwin = new pslb.bigChallengeJackpotWin();
            this.jpwin.runAniFadeOut(0);
            this.addChild(this.jpwin);

            this.jpwin.setLevel(pslb.memberInfo.level.code,jp);
            this.jpwin.runAniFadeIn(time);
        }else{
            cc.eventManager.resumeTarget(this.bcw,true);
            if(this.jpwin)
                this.jpwin.runAniFadeOut(time);
        }
    },
    ps_reward_weekEnabled:function(enabled){
        if(enabled){
            // cc.eventManager.pauseTarget(this.main,true);
            this.removeChild(this.ps_reward_week);
            this.ps_reward_week = new pslb.WeekEndBillboard();
            this.addChild(this.ps_reward_week);

            this.ps_reward_week.setMedal(pslb.memberInfo.week_medal_group,pslb.memberInfo.week_ps_coin);
        }else{
            // cc.eventManager.resumeTarget(this.main,true);
            if(this.ps_reward_week)
                this.ps_reward_week.setVisible(false);
        }
    }
});

var LobbyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LobbyLayer();
        this.addChild(layer);
        this._layer = layer;
    },

    onExit:function(){
        this._super();

    }
});


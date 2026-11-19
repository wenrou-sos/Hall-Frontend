var pslb = pslb || {};

pslb.createProgressBar = function(res_file){
    var ret = new cc.ProgressTimer(new cc.Sprite(res_file));
    ret.setType(cc.ProgressTimer.TYPE_BAR);
    ret.setBarChangeRate(cc.p(1, 0));
    ret.setMidpoint(cc.p(0, 0));
    return ret;
};

pslb.mainPage = cc.Node.extend({
    _banner_anim:null,
    ctor:function(){
        this._super();
        var self=this;

        this._draw_node = new cc.DrawNode();
        this.addChild(this._draw_node,2);

        // for avoid to click lower layer
        this._clickListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(){
                return self._draw_node.isVisible();
            }.bind(this),
        });
        cc.eventManager.addListener(this._clickListener, this._draw_node);
        this._clickListener.setEnabled(false);

        var bg = new cc.Sprite(res.main_page_bg_png);
        bg.setAnchorPoint(0,0);
        this.addChild(bg);
        this._bg = bg;

        var interface = new pslb.interface();
        this.addChild(interface, 1);
        this._interface = interface;

        if(res.banking_up == "res/common/pic/banking/banking_dev_up.png" ||
            res.banking_up == "res/common/pic/banking/banking_ps_up.png"){
            res.banking_up = res.banking_up_PS;
        }
        if(res.banking_down == "res/common/pic/banking/banking_dev_down.png" ||
            res.banking_down == "res/common/pic/banking/banking_ps_down.png"){
            res.banking_down = res.banking_down_PS;
        }
        var bank_button = new ccui.Button(res.banking_up,res.banking_down,res.banking_down);
        if(bank_button._normalTextureLoaded == false){
            bank_button = new ccui.Button(res.banking_up_PS,res.banking_down_PS,res.banking_down_PS);
        }

        bank_button.setPosition(131,9);
        bank_button.setAnchorPoint(0,0);
        bank_button.setTouchEnabled(true);
        bank_button.addTouchEventListener(function(touch, type){
            if(ccui.Widget.TOUCH_ENDED == type){
                pslb.OpenBank();
            }
        });
        this._bank_button = bank_button;
        this.addChild(bank_button);

        var help_button = new ccui.Button(res.help_up,res.help_down,res.help_down);
        help_button.setPosition(104,9);
        help_button.setAnchorPoint(0,0);
        help_button.addTouchEventListener(function(touch, type){
            if(type == ccui.Widget.TOUCH_ENDED)
                pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                    {
                        id:pslb.PageId.help,
                        enabled: true
                    });
        },this);
        // this.addChild(help_button);

        this._bg_dark = new cc.Sprite(res.bg_dark);
        this._bg_dark.setAnchorPoint(0,0);
        this._bg_dark.setPosition(720,1280);
        this.addChild(this._bg_dark);

        this._inbox =new ccui.Button(res.inbox_up_png,res.inbox_down_png,res.inbox_down_png);
        this._inbox.setAnchorPoint(0,0);
        // inbox.setBright(false);
        this._inbox.setPosition(6,9);
        this._inbox.addTouchEventListener(function(touch, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                    {
                        id:pslb.PageId.mail,
                        enabled: true
                    });
            }
        },this);
        this._bg_dark.addChild(this._inbox,3);

        this.inbox_new = new cc.Sprite(res.inbox_new_png);
        this.inbox_new.scheduleUpdate();
        this.inbox_new.update=function () {
            var isNewMsg=false;
            pslb.mailBox.container.forEach(function (e) {
                if(!e.is_read) isNewMsg=true;
            });
            this.setVisible(isNewMsg);
        };
        this.inbox_new.runAction(cc.sequence(
            cc.moveTo(0.4,cc.p(80,88)).easing(cc.easeBezierAction(0,0.8,1,1))
            ,cc.moveTo(0.45,cc.p(80,73)).easing(cc.easeBezierAction(0,0.5,1,1))
        ).repeatForever());
        this.inbox_new.setVisible(false);
        this._inbox.addChild(this.inbox_new);

        this._btn_menu01 = new ccui.Button(res.btn_menu01_up,res.btn_menu01_down,res.btn_menu01_down);
        this.addChild(this._btn_menu01,3);
        this._btn_menu01.setVisible(false);
        this._btn_menu01.setPosition(642,1211);
        this._btn_menu01.addTouchEventListener(function(touch , type){
            if(type == ccui.Widget.TOUCH_ENDED){
                 touch.setVisible(false);
                 this._btn_menu.setVisible(true);
                 this._bg_dark.runAction(cc.moveTo(0.4,720,1280));
                 this._clickListener.setEnabled(false);
            }
        }, this);

        this._btn_menu =new ccui.Button(res.btn_menu_up,res.btn_menu_down,res.btn_menu_down);
        this.addChild(this._btn_menu,2);
        this._btn_menu.setPosition(642,1211);
        this._btn_menu.addTouchEventListener(function(touch , type){
            if(type == ccui.Widget.TOUCH_ENDED){
                this._btn_menu01.setVisible(true);
                touch.setVisible(false);
                this._bg_dark.runAction(cc.moveTo(0.4,260,1280));
                this._clickListener.setEnabled(true);
            }
        }, this);

        //Banner Start
        this.banner = new pslb.BannerAnimation(); //new cc.Sprite(res.banner_challenge);
        this.addChild(this.banner);

        this.banner_text = new pslb.BannerInfoAnimation();
        this.banner_text.setVisible(false);
        this.addChild(this.banner_text);

        this.banner_jp = new pslb.BannerJackpot();
        this.banner_jp.setVisible(false);
        this.banner_jp.scheduleUpdate();
        this.banner_jp.update=function () {
            if(pslb.jackpotResult.isJackpotShow)
            {
                if(pslb.gameWallFocusId === pslb.gameWall.AsiaGame)
                {
                    if(self._banner_anim){
                        self.handle_banner_animation(false);

                        self.handle_bannner_Jp_Visible(true);
                        self.banner.stopAnim();
                        self.banner_text.stopAnim();
                        self.banner_jp.playAnim(true);
                    }
                }
                else
                {
                    if(self._banner_anim==null){
                        self.banner_jp.stopAnim();
                        self.banner_jp.setVisible(false);
                        self._timeacc=self._randomDelay;
                        self.handle_banner_animation(true);
                    }

                }
            }
        };
        this.addChild(this.banner_jp);

        if(self._banner_anim==null){
            self.handle_banner_animation(true);
        }

        //Banner End

        var game_wall = new pslb.gameWall();
        this.addChild(game_wall);
        this._game_wall = game_wall;

        this.wheel = new pslb.btnSmallWheel();
        this.wheel.setAnchorPoint(0,0);
        this.wheel.setPosition(972,0);
        this.wheel.setTouchEnabled(false);
        this.wheel.setMouseEnabled(false);
        // if(pslb.UrlVariables[pslb.UrlVariablesName.Currency] == "CNY"){
        //     this.wheel.setTouchEnabled(false);
        //     this.wheel.setMouseEnabled(false);
        // }
        if (typeof getLobbyTurntable == 'function') {
            if (Number(getLobbyTurntable())){
                this.wheel.setTouchEnabled(true);
                this.wheel.setMouseEnabled(true);
            }
        }
        this.wheel.setTouchEnabled(true);
        this.wheel.setMouseEnabled(true);
        // this.addChild(this.wheel);

        cc.log(ps.PSEvents);
        if (ps.PSEvents !== undefined && ps.PSEvents.length > 0){
            if (ps.Activity){
                var Activity_btn = new Ps_Activity();
                Activity_btn.setName(ps.ActivityID);
                this.addChild(Activity_btn,ps.ActivityLayer + 100);
                this._ps_Activity = Activity_btn;
                // this._ps_Activity.setVisible(false);
                this._ps_Activity.handle_broadcast();

                if(ps.GetPSImages[ps.SERVER_PS_IMAGNE_ENUM.RedPacket]) {
                    this._jpBannerLayer = new jp_ly_banner();
                    this.addChild(this._jpBannerLayer, ps.ActivityLayer + 99);
                }
            }
        }

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

                target._ps_Activity._cleanWebView();
            }

        });
        cc.eventManager.addListener( this._listenerError  ,this);


        this.reset_position();
    },

    reset_position:function () {
        this._bank_button.setVisible(!BK.DEVICE_MODE);
        if (this._ps_Activity)
            this._ps_Activity.reset_position();
        if (this._jpBannerLayer)
            this._jpBannerLayer.reset_position();
        if (BK.DEVICE_MODE == 0){
            this._bg_dark.setOpacity(0);
            this._bg_dark.setRotation(0);
            this._bg_dark.setPosition(0,0);
            this._bg_dark.setLocalZOrder(0);
            this._inbox.setRotation(0);
            this._inbox.loadTextureNormal(res.inbox_up_png);
            this._inbox.loadTexturePressed(res.inbox_down_png);
            this._inbox.setPosition(6,9);
            this.inbox_new.setPosition(80,73);

            this.banner_jp.setPosition(369,8);
            this.banner_jp.setAnchorPoint(0,0);

            this.banner_text.setPosition(369,8);
            this.banner_text.setAnchorPoint(0,0);

            this.banner.setPosition(369,8);
            this.banner.setAnchorPoint(0,0);

            this.banner.setScale(1);
            this.banner_jp.setScale(1);
            this.banner_text.setScale(1);

            this._draw_node.clear();
            this._draw_node.setVisible(false);

            this._bg.setTexture(res.main_page_bg_png);
        } else {
            this._bg_dark.setRotation(90);
            this._bg_dark.setOpacity(255);
            this._bg_dark.setLocalZOrder(2);
            this._inbox.loadTextureNormal(res.inbox_m_up);
            this._inbox.loadTexturePressed(res.inbox_m_down_png);
            this._inbox.setPosition(306,100);
            this._inbox.setRotation(-90);
            this.inbox_new.setPosition(225,83);

            this.banner_jp.setPosition(360,1084);
            this.banner_jp.setAnchorPoint(0.5,0.5);
            this.banner_jp.setScale(1.33);

            this.banner_text.setAnchorPoint(0.5,0.5);
            this.banner_text.setPosition(0,1024);
            this.banner_text.setScale(1.33);

            this.banner.setAnchorPoint(0.5,0.5);
            this.banner.setPosition(360,1084);
            this.banner.setScale(1.33);

            var color=cc.color(0,0,0,255*0.0);
            this._draw_node.setVisible(true);
            this._draw_node.drawRect(cc.p(0, 1280), cc.p( BK.WIN_HEIGHT,0)
                , color, 1, color);

            if (this._clickListener.isEnabled() === true) {
                this._btn_menu01.setVisible(true);
                this._btn_menu.setVisible(false);
                this._bg_dark.setPosition(260,1280);
            } else {
                this._btn_menu01.setVisible(false);
                this._btn_menu.setVisible(true);
                this._bg_dark.setPosition(720,1280);
            }
            this._bg.setTexture(res.main_page_bg_m_png);
        }
        this._interface.reset_position();
        this.banner_jp.reset_position();
        this.banner.reset_position();
        this.banner_text.reset_position();
        this._game_wall.reset_position();
    },

    handle_banner_animation:function (bool) {
        if(bool)
            this._banner_anim=this.runAction(cc.sequence(cc.callFunc(this._handle_banner,this),cc.delayTime(1)).repeatForever());
        else
        {
            this.stopAction(this._banner_anim);
            this._banner_anim=null;
        }

    },
    _timeacc:0,
    _randomDelay:10,
    _banner_text_staytime:10,
    _show_idx:0,
    _show_count:1,
    _show_array:[],
    _handle_banner:function () {
        var self=this;
        this._show_count=1;
        this._show_array=[0];

        if(pslb.bannerInfo.container.length>0)
            this._show_array.push(1);

        if(pslb.jackpotResult.isJackpotShow)
            this._show_array.push(2);

        this._show_count=this._show_array.length-1;

        if(this._show_count>0){
            this._timeacc++;
            if(this._timeacc>=this._randomDelay)
            {
                this._timeacc=0;
                this._show_idx++;
                if(this._show_idx> this._show_count) this._show_idx=0;
                switch (this._show_array[this._show_idx])
                {
                    case 0:
                    {
                        this.handle_bannner_Pic_Visible(true);
                        this._randomDelay=this.random_number();
                        this.banner_jp.stopAnim();
                        this.banner_text.stopAnim();
                        this.banner.playAnim();
                    }
                        break;
                    case 1:
                    {
                        this.handle_bannner_Text_Visible(true);
                        this._randomDelay= this._banner_text_staytime;
                        this.banner_jp.stopAnim();
                        this.banner.stopAnim();
                        this.banner_text.playAnim();
                    }
                        break;
                    case 2:
                    {
                        this.handle_bannner_Jp_Visible(true);
                        this._randomDelay= this._banner_text_staytime;
                        this.banner.stopAnim();
                        this.banner_text.stopAnim();
                        this.banner_jp.playAnim();
                    }
                        break;

                }
            }
        }
        else
            this.stopAllActions();

    },
    random_number:function () {
        var maxNum = 20;
        var minNum = 11;
        var n = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

        return n;
    },
    handle_bannner_Pic_Visible:function (bool) {
        var self=this;
        self.banner.setVisible(bool);
        self.banner_text.setVisible(!bool);
        self.banner_jp.setVisible(!bool);
    },
    handle_bannner_Text_Visible:function (bool) {
        var self=this;
        self.banner.setVisible(!bool);
        self.banner_text.setVisible(bool);
        self.banner_jp.setVisible(!bool);
    },
    handle_bannner_Jp_Visible:function (bool) {
        var self=this;
        self.banner.setVisible(!bool);
        self.banner_text.setVisible(!bool);
        self.banner_jp.setVisible(bool);
    }

});

pslb.smallWheel= ccui.Button.extend({
    wheel_rotation:null,
    rotation_angle_range: 1080,

    ctor:function () {
        this._super(res.wheel_up_png,res.wheel_down_png,res.wheel_down_png);
        this.setBright(false);
        this.turnOn(Math.random() * 5);

        this.setTouchEnabled(true);
        this.addTouchEventListener(function(touch, type){
            if(type == ccui.Widget.TOUCH_ENDED)
                pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                    {
                        id:pslb.PageId.bigChallenge,
                        enabled: true
                    });
        },this);
    },

    setRange:function (range) {
        this.rotation_angle_range= 360 * range;
    },

    turnOn:function(time) {
        var self=this;
        var random = Math.round(Math.random() * this.rotation_angle_range);
        var total_angle = (random - (random % 45)) % 360;
        self.runAction(cc.sequence(
            cc.delayTime(time),
            cc.rotateBy(3, total_angle).easing(cc.easeElasticOut(0.8)),
            cc.callFunc(function () {
                self.turnOn(Math.random() * 5);
            })
        ));
    },

    turnOff:function () {
        this.stopAllActions();
    }
});

pslb.btnSmallWheel = cc.Sprite.extend({
    _mouse_enabled: false,
    _mouse_listener:null,

    _focus_node:null,
    _button_node:null,

    _label_ndoe:null,
    _focus:false,
    _spin_times:null,
    _play_by:null,

    ctor:function(){
        this._super();

        this._ininFocusNode();
        this.setMouseEnabled(true);
        this.setTouchEnabled(true);

        this._spin_times = new pslb.SpinTimes();
        this._spin_times.setPosition(25,71);
        this._spin_times.scheduleUpdate();
        this._spin_times.update=function () {
            this.setSpinTimes(pslb.memberInfo.spin_times);
        };


        if (typeof getLobbyTurntable == 'function') {
            if (!Number(getLobbyTurntable())){
                this._spin_times.setComingSoon(0);
            }
        }

        this.addChild(this._spin_times,100);
    },

    _ininFocusNode:function(){

        this.wheel_btn = new cc.Sprite(res.bt_wheel_down_png);
        this.wheel_btn.setAnchorPoint(0,0);
        this.wheel_btn.setPosition(0,8); // wheel_btn.setPosition(972,8);
        // this.wheel_btn.setBright(this._focus);
        this.addChild(this.wheel_btn);

        this._button_node=new cc.Node();
        this._button_node.setContentSize(500,150);
        this._button_node.setAnchorPoint(0,0);
        this.addChild(this._button_node);

        this.wheel_bg = new cc.Sprite(res.wheel_png);
        this.wheel_bg.setAnchorPoint(0,0);
        this.wheel_bg.setPosition(172,0);
        this._button_node.addChild(this.wheel_bg);

        this.wheel_rotation = new pslb.smallWheel();
        this.wheel_rotation.setAnchorPoint(0.5,0.5);  // wheel_rotation.setAnchorPoint(0.5,0.5);
        this.wheel_rotation.setPosition(240.5,73.6);  // wheel_rotation.setPosition(1213,72);

        this._button_node.addChild(this.wheel_rotation);

        var needle=new cc.Sprite(res.needle_png);
        needle.setAnchorPoint(0,0);   // needle.setAnchorPoint(0.5,0.5);
        needle.setPosition(225,101);  // needle.setPosition(1213,121);
        this._button_node.addChild(needle);

        var logo=new cc.Sprite(res.ps_logo);
        logo.setAnchorPoint(0.5,0.5);
        logo.setPosition(240.5,73.6);
        this._button_node.addChild(logo);

    },

    setWheelFocus:function (boolean) {
        boolean? this._focus=true: this._focus=false;
        this.wheel_rotation.setBright(boolean);
        // this.wheel_btn.setBright(boolean);

        if(boolean == true)
            this.wheel_btn.setTexture(res.bt_wheel_up_png);
        else
            this.wheel_btn.setTexture(res.bt_wheel_down_png);
    },

    setMouseEnabled:function(enable){
        if (this._mouse_enabled === enable)
            return;
        var self=this;
        this._mouse_enabled = enable;
        if (this._mouse_enabled) {
            if(!this._mouse_listener)
                this._mouse_listener = cc.EventListener.create({
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function(event){
                        var target = event.getCurrentTarget()._button_node;
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var rect = cc.rect(0, 0, target.getContentSize().width, target.getContentSize().height);
                        var contains = cc.rectContainsPoint(rect, locationInNode);
                        if (self._focus !==contains)
                            self.setWheelFocus(contains);
                    }
                });
            cc.eventManager.addListener(this._mouse_listener, this);
        } else {
            cc.eventManager.removeListener(this._mouse_listener);
        }
    },

    setTouchEnabled:function(enable){
        this.wheel_rotation.setTouchEnabled(enable);
        // this.wheel_btn.setTouchEnabled(enable);
    },

    addTouchEventListener:function(selector, target){
        this.wheel_rotation.addTouchEventListener(selector, target);
        // this.wheel_btn.addTouchEventListener(selector, target);
    },

});


/*Banner*/
pslb.BannerAnimation = cc.Sprite.extend({
    _bgNode:null,
    _sp1:null,
    _sp2:null,
    STAY_TIME: 3,
    _logoIdx:0,
    _height:0,
    _isVisibe:true,

    ctor:function () {
        this._super();
        if (ps.GetPSImages[ps.SERVER_PS_IMAGNE_ENUM.RedPacket]) {
            this._logoIdx=
                this.BANNER_RES = [
                    res.banner_bottom_01,
                    res.banner_bottom_02,
                ];
        } else {
            this._logoIdx=
                this.BANNER_RES = [
                    res.banner_bottom_01,
                ];
        }
        this._logoIdx=this.BANNER_RES.length-1;
        this._bgNode = new cc.Node();
        this._bgNode.setOpacity(0);
        this.addChild(this._bgNode);

        var sp1 = new cc.Sprite(this.BANNER_RES[this._logoIdx]);
        sp1.setAnchorPoint(cc.p(0 ,0));
        this._bgNode.addChild(sp1);
        this._sp1 = sp1;
        this._height = this._sp1.getContentSize().height;

        if(this.BANNER_RES.length > 1){
            var sp2 = new cc.Sprite(this.BANNER_RES[this._logoIdx]);
            sp2.setAnchorPoint(cc.p(0,0));
            this._bgNode.addChild(sp2);
            this._sp2 = sp2;
            var rect2 = this._sp2.getTextureRect();
            rect2.height = this._sp2.getContentSize().height;
            this._sp2.setTextureRect(rect2);
        }

        this.playAnim();
    },

    reset_position:function(){
        if (BK.DEVICE_MODE === 0){
            this._sp1.setAnchorPoint(0,0);
            if(this._sp2)
                this._sp2.setAnchorPoint(0,0);
        } else {
            this._sp1.setAnchorPoint(0.5,0.5);
            if(this._sp2)
                this._sp2.setAnchorPoint(0.5,0.5);
        }
    },

    playAnim: function () {
        if(this.BANNER_RES.length<=1) return;
        var changeLogo = function(){
            this._bgNode.setPosition(0, 0);
            this._sp1.setTexture(this.BANNER_RES[Math.abs(this._logoIdx-1) % this.BANNER_RES.length]);
            if(this._sp2)
                this._sp2.setTexture(this.BANNER_RES[Math.abs(this._logoIdx--) % this.BANNER_RES.length]);
        };

        this.runAction(cc.sequence(
            cc.callFunc(changeLogo, this),
            cc.actionTween(0.5 , "_move", 0 , 100).easing(cc.easeQuarticActionOut()),
            cc.delayTime(this.STAY_TIME)
        ).repeatForever());
    },
    stopAnim:function () {
        this.stopAllActions();
    },
    updateTweenAction: function (value, key) {
        if (key === "_move")
            var rect = this._sp1.getTextureRect();
        rect.height = this._height * (value /100) ;
        rect.y =0 ;
        this._sp1.setTextureRect(rect);

        if(this._sp2) {
            var rect2 = this._sp2.getTextureRect();
            rect2.height = this._height * (1-value /100) ;
            rect2.y = this._height-rect2.height  ;
            this._sp2.setTextureRect(rect2);
            this._sp2.setPosition(0, rect.height);
        }
    },
    setVisible:function (boolean) {
        // this._bgNode.setVisible(boolean);
        this._isVisibe=boolean;
        if(boolean)
        {
            this._bgNode.runAction(cc.fadeIn(0.5));
            this._sp1.runAction(cc.fadeIn(0.5));
            // this._sp2.runAction(cc.fadeIn(0.5));
        }
        else
        {
            this._bgNode.runAction(cc.fadeOut(0.5));
            this._sp1.runAction(cc.fadeOut(0.5));
            // this._sp2.runAction(cc.fadeOut(0.5));
        }

    },
    isVisible:function () {
        return this._isVisibe;
    }
});

pslb.BannerInfoAnimation = cc.Sprite.extend({
    _bgNode:null,
    _sp1:null,
    _top_stars:null,

    STAY_TIME:5.1,
    _logoIdx:0,
    _text_arr:[],
    _Row:3,
    _Col:2,
    _Qty:8,
    _Top_gap:10,
    _Item_height:15,
    _Item_head:5,
    _Col_gap:0,

    _isVisibe:true,

    ctor:function () {
        this._super();

        this._Row= 3;
        this._Col=(pslb.Language==pslb.LanguageGroup.eng)?  1:2;
        this._Qty= this._Row * this._Col;
        this._Top_gap=6;
        this._Item_height=18;
        this._Item_head=(pslb.Language==pslb.LanguageGroup.eng)? 10:5;
        this._Col_gap=(pslb.Language==pslb.LanguageGroup.eng)? 0:5;

        var setting=pslb.BANNERINFO_SETTING[pslb.Language];

        this._testData=[
            {type:0,member_id:"1AAAAAAAAA",game_name:"DINOSAUR CENTURY",jp_win:"1000000",win:"100000",bet:3000},
            {type:0,member_id:"2BBBBBBBBB",game_name:"Lighthouse of Alexandria",jp_win:"1000000",win:"200000",bet:3000},
            {type:0,member_id:"3CCCCCCCCCC",game_name:"Lighthouse of Alexandria",jp_win:"1000000",win:"306000",bet:3000},
            {type:0,member_id:"4DDDDDDD",game_name:"Lighthouse of Alexandria",jp_win:"1000000",win:"455005",bet:3000},
            {type:0,member_id:"5AAAAAAAAA",game_name:"Lighthouse of Alexandria",jp_win:"1000000",win:"50000",bet:3000},
            {type:0,member_id:"6BBBBBBBBB",game_name:"Lighthouse of Alexandria",jp_win:"1000000",win:"15000",bet:3000},
            {type:0,member_id:"7CCCCCCCCCC",game_name:"Lighthouse of Alexandria",jp_win:"1000000",win:"20000",bet:3000},
            {type:0,member_id:"8DDDDDDD",game_name:"TheEmpire_BONUS",jp_win:"1000000",win:"300000",bet:3000},
            {type:0,member_id:"9AAAAAAAAA",game_name:"TheEmpire_BONUS",jp_win:"1000000",win:"40000",bet:3000},
            {type:0,member_id:"10BBBBBBBBB",game_name:"Lighthouse of Alexandria",jp_win:"1000000",win:"200000",bet:3000},
            {type:0,member_id:"11CCCCCCCCCC",game_name:"Lighthouse of Alexandria",jp_win:"1000000",win:"257000",bet:3000},
            {type:0,member_id:"12DDDDDDD",game_name:"TheEmpire_BONUS",jp_win:"1000000",win:"2356000",bet:3000},
            {type:0,member_id:"13AAAAAAAAA",game_name:"777_BONUS",jp_win:"1000000",win:"4770000",bet:3000},
            {type:0,member_id:"14BBBBBBBBB",game_name:"Lighthouse of Alexandria",jp_win:"1000000",win:"2000000",bet:3000},
            {type:0,member_id:"15CCCCCCCCCC",game_name:"TheEmpire_BONUS",jp_win:"1000000",win:"3060000",bet:3000},
            {type:0,member_id:"16DDDDDDD",game_name:"Lighthouse of Alexandria",jp_win:"1000000",win:"4510000",bet:3000}
        ];

        this._bgNode = new cc.Node();
        this.addChild(this._bgNode);

        var sp1 = new cc.Sprite(res.banner_bottom_01);
        sp1.setAnchorPoint(cc.p(0,0));
        sp1.setOpacity(0);
        this._bgNode.addChild(sp1);

        var top_stars = new cc.LabelTTF(setting.top.str, pslb.TTFNamebyLanguage, 16);
        top_stars.setAnchorPoint(0.5,1);
        top_stars.setPosition((sp1.width-20)/2,sp1.height-3);
        this._top_stars=top_stars;
        sp1.addChild(top_stars);

        var itme_posY=sp1.height-top_stars.height-this._Top_gap;
        for(var i=0;i<this._Row;i++) {
            for (var j = 0; j < this._Col; j++) {
                var item = new pslb.BannerInfoItem();
                item.setAnchorPoint(0, 0);
                item.setPosition(this._Item_head +j * ((sp1.width+this._Col_gap)/2), itme_posY - (i +1) * this._Item_height);
                this._text_arr.push(item);
                sp1.addChild(item);
            }
        }
        // this._changeData();
        // this.playAnim();

        this.setVisible(false);
    },

    reset_position:function(){
        // if (BK.DEVICE_MODE === 0){
        //     this._text_arr.forEach(function(e){
        //         e.reset_position()
        //     })
        // } else {
        //     this._text_arr.forEach(function(e){
        //         e.reset_position()
        //     })
        // }
    },

    playAnim:function () {
        this.runAction(cc.sequence(
            cc.callFunc(this._changeData, this),
            cc.delayTime(this.STAY_TIME)).repeatForever());
    },
    stopAnim:function () {
        this.stopAllActions();
    },
    _changeData:function () {
        var UserWinData=pslb.bannerInfo.container;
        var Qty=this._Qty;

        for (var i = 0; i < Qty; i++) {
            if(UserWinData[this._logoIdx+i])
            {
                var data=UserWinData[this._logoIdx+i];
                var multiplier=Math.ceil(data.win/data.bet);

                var type=1;
                var win=data.win;

                cc.log("member_id="+data.member_id);
                cc.log("game_name="+data.game_name);
                cc.log("bet="+data.bet);
                cc.log("jp_win="+data.jp_win);

                //Jackpot
                if(data.jp_win >=30000 )
                {
                    type=1;
                    win=data.jp_win;
                }
                //Win
                if(data.win>=50000 && multiplier >=80)
                    type=2;

                //Multiplier (Win X)
                if(multiplier >=150)
                    type=3;

                this._text_arr[i].setInfo(data.member_id, data.game_name, data.bet, win, type);
            }
            else
            {
                this._text_arr[i].setInfoVisible(false);
            }

        }

        this._logoIdx+=Qty;
        if(this._logoIdx>=UserWinData.length) this._logoIdx=0;

    },
    setVisible:function (boolean) {
        this._bgNode.setVisible(boolean);
        this._isVisibe=boolean;
        if(boolean)
        {
            this._bgNode.runAction(cc.fadeIn(0.5));
            this._top_stars.runAction(cc.fadeIn(0.5));
        }
        else
        {
            this._bgNode.runAction(cc.fadeOut(0.5));
            this._top_stars.runAction(cc.fadeOut(0.5));
        }
        //
        this._text_arr.forEach(function (e) {
            e.setVisible(boolean);
        });

    },
    isVisible:function () {
        return  this._isVisibe;
    }

});

pslb.BannerInfoItem=cc.Node.extend({
    _memberid:"",
    _game_name:"",
    _bet:"",
    _win:null,
    _muti:null,
    _bannerString:null,
    _TTsize:12,
    _anchor:[0,0.5],
    ctor:function () {
        this._super();
        this._TTsize= (pslb.Language==pslb.LanguageGroup.eng)? 15:12;

        var TTsize=this._TTsize;
        var setting=pslb.BANNERINFO_SETTING[pslb.Language];

        var bannerString = new cc.LabelTTF("", pslb.TTFNamebyLanguage, TTsize);
        bannerString.setAnchorPoint(this._anchor[0], this._anchor[1]);
        bannerString.setPosition(setting.memberId.pos[0],setting.memberId.pos[1]);
        this.addChild(bannerString);
        this._bannerString=bannerString;


        this._memberid="";
        this._bet="";
        this._game_name="";

        var win = new cc.LabelTTF("", pslb.TTFName, TTsize);
        win.setAnchorPoint(1, this._anchor[1]);
        win.setPosition(setting.win.pos[0],setting.win.pos[1]);
        win.setColor(cc.color(255,255,0,0));
        this.addChild(win);
        this._win=win;

        var muti = new cc.LabelTTF("", pslb.TTFName, TTsize);
        muti.setAnchorPoint(1,  this._anchor[1]);
        muti.setPosition(setting.muti.pos[0],setting.muti.pos[1]);
        muti.setColor(cc.color(255,0,0,0));
        this._muti=muti;
        this.addChild(muti);

        var ch_x = new cc.LabelTTF(" 倍 ", pslb.TTFNamebyLanguage, TTsize);
        ch_x.setAnchorPoint(0,  this._anchor[1]);
        ch_x.setPosition(setting.muti.pos[0],setting.muti.pos[1]);
        ch_x.setColor(cc.color(255,255,255,0));
        this._ch_x=ch_x;
        this.addChild(ch_x);

        this.setInfoVisible(false);
    },

    reset_position:function(){
        if (BK.DEVICE_MODE === 0){
            this._bannerString.setAnchorPoint(1, this._anchor[1]);
            this._win.setAnchorPoint(1, this._anchor[1]);
            this._muti.setAnchorPoint(1, this._anchor[1]);
            this._ch_x.setAnchorPoint(1, this._anchor[1]);

        } else {
            this._bannerString.setAnchorPoint(0.5,0.5);
            this._win.setAnchorPoint(0.5,0.5);
            this._muti.setAnchorPoint(0.5,0.5);
            this._ch_x.setAnchorPoint(0.5,0.5);
        }
    },

    setInfo:function (memberid,name,bet,win,type) {
        this._setMemberId(memberid);
        this._setGameName(name);
        this._setBet(bet);
        this._setWin(win);
        this._setMuti(win,bet);

        this._setType(memberid,name,bet,win,type);
    },
    setInfoVisible:function (bool) {

        this._bannerString.setVisible(bool);
        this._win.setVisible(bool);
        this._muti.setVisible(bool);
        this._ch_x.setVisible(bool);
        this.setVisible(bool);
    },
    _setMemberId:function (memberid) {
        this._memberid="*"+memberid.substr(memberid.length-4,4);
    },
    _setGameName:function (name) {
        if(pslb.Language==pslb.LanguageGroup.tch || pslb.Language==pslb.LanguageGroup.sch)
        {
            if(name)
            {
                // name=name+"(豐功偉業)";
                var end_idx=name.indexOf("(");
                if(end_idx>0)
                {
                    cc.log("end_idx="+end_idx);
                    name=name.substr(0,end_idx);
                }
            }

        }
        this._game_name=name;
    },
    _setBet:function (bet) {
        this._bet=(bet/100).toString();
    },
    _setWin:function (win) {
        this._win.setString(win/100);
    },
    _setMuti:function (win,bet) {
        var muti=Math.ceil(win/bet);
        this._muti.setString(muti.toString());
    },
    _setColor:function (color) {
        this._bannerString.setColor(color);
        this._win.setColor(color);
    },
    _setType:function (memberid,name,bet,win,type) {

        this.setInfoVisible(true);
        this._setColor(cc.color(255,255,255,0));
        var setting=pslb.BANNERINFO_SETTING[pslb.Language];
        switch (type)
        {
            case 1:
                this._setColor(cc.color(255,255,0,0));
                this._muti.setVisible(false);
                this._ch_x.setVisible(false);
                this._bannerString.setString(this._memberid+" "+setting.text_win.str+" "+setting.jackpot.str+" ");
                this._win.setPosition(this._bannerString.width+this._win.width ,setting.win.pos[1]);

                break;
            case 2:
                this._muti.setVisible(false);
                this._ch_x.setVisible(false);
                this._bannerString.setString(this._memberid+" "+setting.text_playing.str+" "+this._game_name+" "
                    +setting.text_atbet.str+" "+this._bet+" "+setting.text_win.str+" ");
                this._win.setPosition(this._bannerString.width+this._win.width ,setting.win.pos[1]);
                this._win.setColor(cc.color(255,255,0,0));

                break;
            case 3:
                this._win.setVisible(false);
                this._ch_x.setVisible(false);
                this._bannerString.setString(
                    this._memberid+" "+setting.text_playing.str+" "+
                    this._game_name+" "+setting.text_muti.str+" ");
                this._muti.setPosition(this._bannerString.width+this._muti.width ,setting.muti.pos[1]);

                if(pslb.Language!=pslb.LanguageGroup.eng)
                {
                    this._ch_x.setVisible(true);
                    this._ch_x.setPosition(this._bannerString.width+this._muti.width ,setting.muti.pos[1]);
                }

                break;
            default:
                this.setInfoVisible(false);
                break;
        }
    },
    setVisible:function (boolean) {
        if(boolean){
            this._bannerString.runAction(cc.fadeIn(0.5));
            this._win.runAction(cc.fadeIn(0.5));
            this._muti.runAction(cc.fadeIn(0.5));
            this._ch_x.runAction(cc.fadeIn(0.5));
            this.runAction(cc.fadeIn(0.5));
        }
        else{
            this._bannerString.runAction(cc.fadeOut(0.5));
            this._win.runAction(cc.fadeOut(0.5));
            this._muti.runAction(cc.fadeOut(0.5));
            this._ch_x.runAction(cc.fadeOut(0.5));
            this.runAction(cc.fadeOut(0.5));
        }

    }
});

pslb.BANNERINFO_SETTING= {
    eng:{

        top:{str:" TOP WINNERS ",pos:[0,10]},
        memberId:{str:" member id ",pos:[0,10]},
        text_playing:{str:" playing ",pos:[85,10]},
        gamename:{str:" ",pos:[120,10]},
        text_win:{str:" win ",pos:[85,10]},
        win:{str:" ",pos:[400,10]},
        text_atbet:{str:" at bet ",pos:[300,10]},
        atbet:{str:" ",pos:[370,10]},
        text_muti:{str:" win X",pos:[340,10]},
        muti:{str:" ",pos:[400,10]},
        jackpot:{str:"Jackpot",pos:[120,10]}
    },
    sch:{
        top:{str:" 开大奖 ",pos:[0,10]},
        memberId:{str:" ",pos:[0,10]},
        text_playing:{str:" 玩 ",pos:[50,10]},
        gamename:{str:" 亚历山大灯塔 ",pos:[60,10]},
        text_win:{str:" 赢 ",pos:[50,10]},
        win:{str:" ",pos:[260,8]},
        text_atbet:{str:" 押注 ",pos:[158,10]},
        atbet:{str:" ",pos:[195,10]},
        text_muti:{str:" 中 ",pos:[215,10]},
        muti:{str:" ",pos:[260,8]},
        jackpot:{str:"彩金",pos:[60,10]}
    },
    tch:{
        top:{str:" 開大獎 ",pos:[0,10]},
        memberId:{str:" ",pos:[0,10]},
        text_playing:{str:" 玩 ",pos:[50,10]},
        gamename:{str:" 亞歷山大燈塔 ",pos:[60,10]},
        text_win:{str:" 赢 ",pos:[50,10]},
        win:{str:" ",pos:[260,8]},
        text_atbet:{str:" 押注 ",pos:[158,10]},
        atbet:{str:" ",pos:[195,10]},
        text_muti:{str:" 中 ",pos:[215,10]},
        muti:{str:" ",pos:[260,8]},
        jackpot:{str:"彩金",pos:[60,10]}
    },
    esp:{
        top:{str:" TOP WINNERS ",pos:[0,10]},
        memberId:{str:" member id ",pos:[0,10]},
        text_playing:{str:" playing ",pos:[85,10]},
        gamename:{str:" ",pos:[120,10]},
        text_win:{str:" win ",pos:[85,10]},
        win:{str:" ",pos:[400,10]},
        text_atbet:{str:" at bet ",pos:[300,10]},
        atbet:{str:" ",pos:[370,10]},
        text_muti:{str:" win X",pos:[340,10]},
        muti:{str:" ",pos:[400,10]},
        jackpot:{str:"Jackpot",pos:[120,10]}
    },
    mys:{
        top:{str:" TOP WINNERS ",pos:[0,10]},
        memberId:{str:" member id ",pos:[0,10]},
        text_playing:{str:" playing ",pos:[85,10]},
        gamename:{str:" ",pos:[120,10]},
        text_win:{str:" win ",pos:[85,10]},
        win:{str:" ",pos:[400,10]},
        text_atbet:{str:" at bet ",pos:[300,10]},
        atbet:{str:" ",pos:[370,10]},
        text_muti:{str:" win X",pos:[340,10]},
        muti:{str:" ",pos:[400,10]},
        jackpot:{str:"Jackpot",pos:[120,10]}
    },
    tai:{
        top:{str:" TOP WINNERS ",pos:[0,10]},
        memberId:{str:" member id ",pos:[0,10]},
        text_playing:{str:" playing ",pos:[85,10]},
        gamename:{str:" ",pos:[120,10]},
        text_win:{str:" win ",pos:[85,10]},
        win:{str:" ",pos:[400,10]},
        text_atbet:{str:" at bet ",pos:[300,10]},
        atbet:{str:" ",pos:[370,10]},
        text_muti:{str:" win X",pos:[340,10]},
        muti:{str:" ",pos:[400,10]},
        jackpot:{str:"Jackpot",pos:[120,10]}
    },
    ind:{
        top:{str:" TOP WINNERS ",pos:[0,10]},
        memberId:{str:" member id ",pos:[0,10]},
        text_playing:{str:" playing ",pos:[85,10]},
        gamename:{str:" ",pos:[120,10]},
        text_win:{str:" win ",pos:[85,10]},
        win:{str:" ",pos:[400,10]},
        text_atbet:{str:" at bet ",pos:[300,10]},
        atbet:{str:" ",pos:[370,10]},
        text_muti:{str:" win X",pos:[340,10]},
        muti:{str:" ",pos:[400,10]},
        jackpot:{str:"Jackpot",pos:[120,10]}
    },
    kor:{
        top:{str:" TOP WINNERS ",pos:[0,10]},
        memberId:{str:" member id ",pos:[0,10]},
        text_playing:{str:" playing ",pos:[85,10]},
        gamename:{str:" ",pos:[120,10]},
        text_win:{str:" win ",pos:[85,10]},
        win:{str:" ",pos:[400,10]},
        text_atbet:{str:" at bet ",pos:[300,10]},
        atbet:{str:" ",pos:[370,10]},
        text_muti:{str:" win X",pos:[340,10]},
        muti:{str:" ",pos:[400,10]},
        jackpot:{str:"Jackpot",pos:[120,10]}
    },
    vie:{
        top:{str:" TOP WINNERS ",pos:[0,10]},
        memberId:{str:" member id ",pos:[0,10]},
        text_playing:{str:" playing ",pos:[85,10]},
        gamename:{str:" ",pos:[120,10]},
        text_win:{str:" win ",pos:[85,10]},
        win:{str:" ",pos:[400,10]},
        text_atbet:{str:" at bet ",pos:[300,10]},
        atbet:{str:" ",pos:[370,10]},
        text_muti:{str:" win X",pos:[340,10]},
        muti:{str:" ",pos:[400,10]},
        jackpot:{str:"Jackpot",pos:[120,10]}
    },

};

pslb.BannerJackpot=cc.Sprite.extend({

    ctor : function () {
        var self = this;
        this._super(res.banner_jp_bg);

        this._jp_name = new cc.Sprite(res.banner_jp);
        this._jp_name.setPosition(272,64);
        this.addChild(this._jp_name);

        this._jackpotly = new Jp_ly_Nums();
        this._jackpotly.handle_updatenums(pslb.jackpotResult.jackpotList);
        this._jackpotly.scheduleUpdate();
        this._jackpotly.update = function () {
            if (pslb.JPupdateFlag) {
                self._jackpotly.handle_updatenums(pslb.jackpotResult.jackpotList);
                pslb.JPupdateFlag = false;
            }
        };
        this.addChild(this._jackpotly);
    },

    reset_position: function(){
      if (BK.DEVICE_MODE === 0){

      } else {

      }
    },

    playAnim : function (repeat) {
        var act0 = cc.callFunc(function () {
            this.setTexture(res.banner_jp_bg);
            this._jp_name.setTexture(res.banner_jp);
            this.runAction(cc.fadeIn(0.5));
            this._jp_name.runAction(cc.fadeIn(0.5));
            this._jackpotly.runFadeInAction(0.5, 0);
            this._jp_index = 0;
        }, this);
        var act1 = cc.delayTime(4.5);
        var act2 = cc.callFunc(function () {
            this.runAction(cc.fadeOut(0.5));
            this._jp_name.runAction(cc.fadeOut(0.5));
            this._jackpotly.runFadeOutAction(0.5, 0);
        }, this);
        var act3 = cc.delayTime(0.5);
        var act4 = cc.callFunc(function () {
            this.setTexture(res.banner_jp_bg_1);
            this._jp_name.setTexture(res.banner_jp_1);
            this.runAction(cc.fadeIn(0.5));
            this._jp_name.runAction(cc.fadeIn(0.5));
            this._jackpotly.runFadeInAction(0.5, 1);
            this._jp_index = 1;
        }, this);
        var act5 = cc.callFunc(function () {
            this.runAction(cc.fadeOut(0.5));
            this._jp_name.runAction(cc.fadeOut(0.5));
            this._jackpotly.runFadeOutAction(0.5, 1);
        }, this);
        this.stopAllActions();
        if (repeat) {
            var seq0 = cc.sequence(act0, act1, act2, act3, act4, act1, act5, act3).repeatForever();
            var seq1 = cc.sequence(act4, act1, act5, act3, act0, act1, act2, act3).repeatForever();
            this.runAction(this._jp_index === 0 ? seq0 : seq1);
        } else {
            this.runAction(cc.sequence(act0, act1, act2, act3, act4));
        }
    },

    stopAnim : function () {
        var act0 = cc.callFunc(function () {
            this.runAction(cc.fadeOut(0.5));
            this._jp_name.runAction(cc.fadeOut(0.5));
            this._jackpotly.runFadeOutAction(0.5, 1);
        }, this);
        var act1 = cc.delayTime(0.5);
        this.stopAllActions();
        this.runAction(cc.sequence(act0, act1));
    }
});




/*SpinTimes*/
pslb.SpinTimes=cc.Node.extend({
    ctor:function (fontSize,psCoinScale,color) {
        this._super();
        fontSize=fontSize || 26;
        psCoinScale=psCoinScale||1;
        color=color||cc.color(255,255,255,0);
        this._spin_times = new cc.LabelTTF("1 SPIN LEFT", pslb.TTFName, fontSize);
        this._spin_times.setColor(color);
        this._spin_times.setAnchorPoint(0.5,0.5);
        this._spin_times.setPosition(this._spin_times.width/2,0);
        if(cc.sys.isMobile)
            this._spin_times.y=this._spin_times.getPosition().y-pslb.MobilePosAdjustValue;
        this._spin_times.setVisible(false);
        this.addChild(this._spin_times);

        this._play_by = new cc.LabelTTF("PLAY BY", pslb.TTFName, fontSize);
        this._play_by.setColor(color);
        this._play_by.setAnchorPoint(0,0.5);
        this._play_by.setPosition(0,0);
        if(cc.sys.isMobile)
            this._play_by.y=this._play_by.getPosition().y-pslb.MobilePosAdjustValue;
        this._play_by.setVisible(true);
        this.addChild(this._play_by);

        this._ps_coin=new cc.Sprite(res.wheel_coin);
        this._ps_coin.setColor(color);
        this._ps_coin.setScale(psCoinScale);
        this._ps_coin.setAnchorPoint(0,0.5);
        this._ps_coin.setPosition(this._play_by.width,0);
        this._ps_coin.setVisible(true);
        this.addChild(this._ps_coin);

        this._realplay = new cc.LabelTTF("REAL PLAY ONLY", pslb.TTFNamebyLanguage, fontSize);
        this._realplay.setColor(color);
        this._realplay.setAnchorPoint(0.5,0.5);
        this._realplay.setPosition(70,0);
        if(cc.sys.isMobile)
            this._realplay.y=this._realplay.getPosition().y-pslb.MobilePosAdjustValue;
        this._realplay.setVisible(false);
        this.addChild(this._realplay);

    },
    setSpinTimes:function (spin,pos_type) {
        if(pslb.isRealPlay)
        {
            spin = spin || 0;
            if(spin==1)
            {
                this._spin_times.setString(" 1 SPIN LEFT ");
                this._setPlaybyVisible(false);
            }
            else if(spin>1)
            {
                this._spin_times.setString(spin+" SPINS LEFT");
                this._setPlaybyVisible(false);
            }
            else if (spin== -1)   //VIP
            {
                this._spin_times.setString(" VIP SPIN ");
                this._setPlaybyVisible(false);

            }
            else
            {
                this._setPlaybyVisible(true);
            }
        }
        else
        {

            this._realplay.setString(pslb.SpinTimesRealPlaySetting(pslb.Language).word);
            this._realplay.setFontSize(pslb.SpinTimesRealPlaySetting(pslb.Language).fontsize);
            this._realplay.setVisible(true);
            if(pos_type==1)
                this._realplay.setPosition(50,0);
            else
                this._realplay.setPosition(70,0);
            this._spin_times.setVisible(false);
            this._play_by.setVisible(false);
            this._ps_coin.setVisible(false);
        }

    },
    _setPlaybyVisible:function (bool) {
        this._spin_times.setVisible(!bool);
        this._play_by.setVisible(bool);
        this._ps_coin.setVisible(bool);
        if (typeof getLobbyTurntable == 'function') {
            if (!Number(getLobbyTurntable())){
                this._spin_times.setVisible(false);
            }
        }
    },

    //for ccy != CNY
    setComingSoon:function(pos_type){
        this._realplay.setString(pslb.TextGroup[pslb.Language].ComingSoon);
        this._realplay.setFontSize(pslb.TextGroup[pslb.Language].FontSize);
        this._realplay.setVisible(true);
        if(pos_type==1)
            this._realplay.setPosition(50,0);
        else
            this._realplay.setPosition(70,0);
        this._spin_times.setVisible(false);
        this._play_by.setVisible(false);
        this._ps_coin.setVisible(false);
    }
});

pslb.SpinTimesRealPlaySetting = function (lang) {
    switch (lang) {
        case 'sch':
            return {
                word:"未开放",
                fontsize:26
            }
        case 'tch':
            return {
                word:"未開放",
                fontsize:26
            }
        default:
            return {
                word:"NO ENTRY",
                fontsize:20
            }
    }
}

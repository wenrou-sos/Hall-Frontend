var pslb = pslb || {};

pslb.LevelUp=cc.Layer.extend({
    ctor:function () {
        this._super();
        this.setName("LevelUp");

        var bg_dark=new cc.Sprite(res.bg_dark);
        bg_dark.setAnchorPoint(0.5,0.5);
        bg_dark.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.addChild(bg_dark);

        var lv_bg=new cc.Sprite(res.levelup_bg_png);
        lv_bg.setAnchorPoint(0.5,0.5);
        lv_bg.setPosition(640,365);
        this.addChild(lv_bg);

        var levelup=new cc.Sprite(res.levelup_text_png);
        levelup.setAnchorPoint(0.5,0.5);
        levelup.setPosition(640,480);
        this.addChild(levelup);

        this.setListener();

        this._createCloseBtn();
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
        this.removeChild(this._close_btn);
        this._close_btn=new ccui.Button(res.inbox_close_up, res.inbox_close_down, res.inbox_close_down);
        this._close_btn.addTouchEventListener(function(touch, type){
            if(type == ccui.Widget.TOUCH_ENDED)
                pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                    {
                        id:pslb.PageId.levelup,
                        enabled: false
                    });
        },this);
        this._close_btn.setAnchorPoint(0.5,0.5);
        this._close_btn.setPosition(980,550);
        this.addChild(this._close_btn);
    }
});

var interface_userData={
    id:"Mark",
    level:{
        code:91,    // VIP01 = 4//Max VIP88 =91
        percentage:78
    },
    medal_group:[
        {code:2,count:1},
        {code:1,count:2},
        {code:0,count:4}
    ],
    cent:200000,
    ps_coin:35,
    psaward_deadline:1508483226000 + 3456000000,  //1508716799  //2017-10-22 23:59:59
};

pslb.BADGE = {
    RED:3,
    BLUE:5,
    GREEN:8
};

pslb.PROMPT_LEVEL = {
    0:[0,0,0],
    1:[3,2,1],
    2:[4,2,1],
    3:[5,2,1]
};

pslb.PROMPT_SETTING={
    eng:{
        0:{str:"",Anchor:[1,0.5],pos:[-55,14]},
        1:{str:" (num) ",Anchor:[1,0.5],pos:[-48,14]},
        2:{str:" more ",Anchor:[1,0.5],pos:[-2,14]},
        3:{str:" to WIN ",Anchor:[0,0.5],pos:[28,14]},
        4:{str:" (pscoin) ",Anchor:[0,0.5],pos:[83,14]},
        5:{str:" x 1 ",Anchor:[0,0.5],pos:[115,14]},
        center:20
    },
    sch:{
        0:{str:" 再 ",Anchor:[1,0.5],pos:[-40,14]},
        1:{str:" (num) ",Anchor:[1,0.5],pos:[-28,13]},
        2:{str:" 个 ",Anchor:[1,0.5],pos:[-2,14]},
        3:{str:" 贏 ",Anchor:[0,0.5],pos:[28,14]},
        4:{str:" (pscoin) ",Anchor:[0,0.5],pos:[55,14]},
        5:{str:" x 1 ",Anchor:[0,0.5],pos:[88,13]},
        center:10
    },
    tch:{
        0:{str:" 再 ",Anchor:[1,0.5],pos:[-40,14]},
        1:{str:" (num) ",Anchor:[1,0.5],pos:[-28,13]},
        2:{str:" 個 ",Anchor:[1,0.5],pos:[-2,14]},
        3:{str:" 贏 ",Anchor:[0,0.5],pos:[28,14]},
        4:{str:" (pscoin) ",Anchor:[0,0.5],pos:[55,14]},
        5:{str:" x 1 ",Anchor:[0,0.5],pos:[88,13]},
        center:10
    },
    esp:{
        0:{str:"",Anchor:[1,0.5],pos:[-55,14]},
        1:{str:" (num) ",Anchor:[1,0.5],pos:[-48,14]},
        2:{str:" more ",Anchor:[1,0.5],pos:[-2,14]},
        3:{str:" to WIN ",Anchor:[0,0.5],pos:[28,14]},
        4:{str:" (pscoin) ",Anchor:[0,0.5],pos:[83,14]},
        5:{str:" x 1 ",Anchor:[0,0.5],pos:[115,14]},
        center:20
    },
    mys:{
        0:{str:"",Anchor:[1,0.5],pos:[-55,14]},
        1:{str:" (num) ",Anchor:[1,0.5],pos:[-48,14]},
        2:{str:" more ",Anchor:[1,0.5],pos:[-2,14]},
        3:{str:" to WIN ",Anchor:[0,0.5],pos:[28,14]},
        4:{str:" (pscoin) ",Anchor:[0,0.5],pos:[83,14]},
        5:{str:" x 1 ",Anchor:[0,0.5],pos:[115,14]},
        center:20
    },
    tai:{
        0:{str:"",Anchor:[1,0.5],pos:[-55,14]},
        1:{str:" (num) ",Anchor:[1,0.5],pos:[-48,14]},
        2:{str:" more ",Anchor:[1,0.5],pos:[-2,14]},
        3:{str:" to WIN ",Anchor:[0,0.5],pos:[28,14]},
        4:{str:" (pscoin) ",Anchor:[0,0.5],pos:[83,14]},
        5:{str:" x 1 ",Anchor:[0,0.5],pos:[115,14]},
        center:20
    },
    ind:{
        0:{str:"",Anchor:[1,0.5],pos:[-55,14]},
        1:{str:" (num) ",Anchor:[1,0.5],pos:[-48,14]},
        2:{str:" more ",Anchor:[1,0.5],pos:[-2,14]},
        3:{str:" to WIN ",Anchor:[0,0.5],pos:[28,14]},
        4:{str:" (pscoin) ",Anchor:[0,0.5],pos:[83,14]},
        5:{str:" x 1 ",Anchor:[0,0.5],pos:[115,14]},
        center:20
    },
    kor:{
        0:{str:"",Anchor:[1,0.5],pos:[-55,14]},
        1:{str:" (num) ",Anchor:[1,0.5],pos:[-48,14]},
        2:{str:" more ",Anchor:[1,0.5],pos:[-2,14]},
        3:{str:" to WIN ",Anchor:[0,0.5],pos:[28,14]},
        4:{str:" (pscoin) ",Anchor:[0,0.5],pos:[83,14]},
        5:{str:" x 1 ",Anchor:[0,0.5],pos:[115,14]},
        center:20
    },
    vie:{
        0:{str:"",Anchor:[1,0.5],pos:[-55,14]},
        1:{str:" (num) ",Anchor:[1,0.5],pos:[-48,14]},
        2:{str:" more ",Anchor:[1,0.5],pos:[-2,14]},
        3:{str:" to WIN ",Anchor:[0,0.5],pos:[28,14]},
        4:{str:" (pscoin) ",Anchor:[0,0.5],pos:[83,14]},
        5:{str:" x 1 ",Anchor:[0,0.5],pos:[115,14]},
        center:20
    },
};

pslb.medalNode = cc.Node.extend({
    medal:null,
    bar:null,
    _qty:0,
    _total_qty:0,
    ctor:function(medal, bar){
        this._super();
        this.bar = pslb.createProgressBar(bar);
        this.bar.setAnchorPoint(0,0);
        this.bar.setPosition(40,5);
        this.bar.percentage = 0;
        this.addChild(this.bar);

        this.medal = new cc.Sprite(medal);
        this.medal.setAnchorPoint(0,0);
        this.medal.setPosition(0,0);
        this.addChild(this.medal);

        this.num = new cc.LabelTTF("0", pslb.TTFName, 28);
        this.num.setPosition(75,25);
        this.addChild(this.num);
    },

    setTotalQty:function(total_qty){
        this._total_qty = total_qty;
        this._qty = Math.min(this._total_qty, this._qty);
        this.num.setString(this._qty);
        this._restBar();
    },

    setQty:function(qty){
        this._qty = Math.min(this._total_qty, qty);
        this.num.setString(this._qty);
        this._restBar();
    },

    _restBar:function(){
        if(this._total_qty)
            this.bar.percentage = 100 / this._total_qty * this._qty;
        else
            this.bar.percentage = 0;
    },
    setNumVisible:function (boolean) {
        this.num.setVisible(boolean);
    }
});

pslb.promptBadge=cc.Sprite.extend({
    _num:null,
    ctor:function (pic,badge_id,member_level) {
        this._super(pic);
        var fontSize=16;
        var setting=pslb.PROMPT_SETTING[pslb.Language];

        var str=setting[0];
        var more_text0=new cc.LabelTTF(str.str,pslb.TTFNamebyLanguage, fontSize);
        more_text0.setAnchorPoint(str.Anchor[0],str.Anchor[1]);
        more_text0.setPosition(str.pos[0],str.pos[1]);
        this.addChild(more_text0);

        str=setting[1];
        this._num=new cc.LabelTTF("",pslb.TTFName, fontSize);
        this._num.setAnchorPoint(str.Anchor[0],str.Anchor[1]);
        this._num.setPosition(str.pos[0],str.pos[1]);
        this.addChild(this._num);

        str=setting[2];
        var more_text=new cc.LabelTTF(str.str,pslb.TTFNamebyLanguage, fontSize);
        more_text.setAnchorPoint(str.Anchor[0],str.Anchor[1]);
        more_text.setPosition(str.pos[0],str.pos[1]);
        this.addChild(more_text);

        //
        //Sprite
        //

        str=setting[3];
        var to_win=new cc.LabelTTF(str.str,pslb.TTFNamebyLanguage, fontSize);
        to_win.setAnchorPoint(str.Anchor[0],str.Anchor[1]);
        to_win.setPosition(str.pos[0],str.pos[1]);
        this.addChild(to_win);

        str=setting[4];
        var pscoin=new cc.Sprite(res.banner_reward_coin);
        pscoin.setAnchorPoint(str.Anchor[0],str.Anchor[1]);
        pscoin.setPosition(str.pos[0],str.pos[1]);
        this.addChild(pscoin);


        str=setting[5];

        var mutiStr="x "+pslb.PROMPT_LEVEL[member_level>3? 3:member_level][badge_id];
        this._muti=new cc.LabelTTF(mutiStr,pslb.TTFName, fontSize);
        this._muti.setAnchorPoint(str.Anchor[0],str.Anchor[1]);
        this._muti.setPosition(str.pos[0],str.pos[1]);
        this.addChild(this._muti);


    },
    setString:function (str) {
        this._num.setString(str);
    }

});

pslb.isPromptShow=false;

pslb.promptTime=function () {
    var rule_hr=48;
    var rule_min=0;
    var rule_sec=0;

    var limit_time=(rule_hr*(1000*60*60))+(rule_min*(60*1000))+(rule_sec*1000);
    cc.log("limit_time="+limit_time);
    return limit_time;
}();

pslb.prompt = cc.Node.extend({
    _hr:0,
    _min:0,
    _sec:0,
    _deadline:0,
    _text:null,
    _timeleft:null,
    _centerpointX:0,
    _badge_arr:[],
    ctor:function () {
        this._super();
        this.scheduleUpdate();

        var prompt_png=new cc.Sprite(res.prompt);
        prompt_png.setAnchorPoint(0,0);
        prompt_png.setPosition(0,0);
        prompt_png.scheduleUpdate();
        prompt_png.update=function () {
            this.setVisible(pslb.isPromptShow);
        };
        this.addChild(prompt_png);
        this._centerpointX=prompt_png.width/2;

        var timeFormat = function (expire_time) {
            var elapsed=expire_time;

            if(elapsed < 0)
                elapsed = 0;

            elapsed = Math.floor(elapsed/1000);  // millisec to sec
            var hour = Math.floor(elapsed / 3600);
            var min = (Math.floor(elapsed / 60)) % 60;
            var sec = elapsed % 60;

            this._hr=hour;
            this._min=min;
            this._sec=sec;

            var text=" " + (hour < 10 ? ("0" + hour) : hour) + ":" + (min < 10 ? ("0" + min) : min) + ":" + (sec < 10 ? ("0" + sec) : sec) + " LEFT";
            cc.log(text);
            return text;
        };

        this._timeleft=new pslb.NumberTTF("" ,pslb.TTFName, 16);
        this._timeleft.NumberFormat = timeFormat;
        this._timeleft.setAnchorPoint(1,0);
        this._timeleft.setPosition(prompt_png.width-15,12);//(419,12);
        this.addChild(this._timeleft);

        // this._badge_arr=[];
        // for(var i = 0; i < 3; i++){
        //     var badge=new pslb.promptBadge(res["banner_reward_"+i],i,pslb.memberInfo.level.code);
        //     this._badge_arr.push(badge);
        //     this.addChild(badge);
        // }
    },

    setPrompt:function (meadl_group,deadline) {
        if(this._TIME<0)
        {
            pslb.isPromptShow=false;
            this._timeleft.setVisible(true);
        }


        deadline && this._setPrompt_timeLeft(deadline);
        meadl_group && this._setPrompt_text(meadl_group);
    },

    _setPrompt_text:function (meadl_group) {
        var self=this;
        var code = pslb.proto.Medal.Code;
        var rule=[];
        rule.push(pslb.BADGE.RED);
        rule.push(pslb.BADGE.BLUE);
        rule.push(pslb.BADGE.GREEN);

        meadl_group.forEach(function(meadl){
            if(meadl.code == code.kGold)
                rule[0] -= meadl.count;
            else if(meadl.code == code.kSilver)
                rule[1] -= meadl.count;
            else if(meadl.code == code.kBrown)
                rule[2] -= meadl.count;

        });
        this._badge_arr_visible=[];
        //User has more than meadl.count ,  _badge_arr[index] setVisible(true)
        var visible_condition=[pslb.BADGE.RED-1,pslb.BADGE.BLUE-3,pslb.BADGE.GREEN-4];
        this._badge_arr.forEach(function (e,index) {
            e.setString(rule[index]);
            e.setTag(rule[index]);
            e.setVisible(false);
            if(e.getTag()<=visible_condition[index])
                self._badge_arr_visible.push(e);
        });

        var isScheduled=cc.director.getScheduler().isScheduled(this._schedule_prompt,this);
        if(isScheduled)
            this.unschedule(this._schedule_prompt);

        this._schedule_prompt(); //0 sec
        this.schedule(this._schedule_prompt,5);
    },
    visible_index:0,
    _schedule_prompt:function () {
        var self=this;
        var isChange=false;
        var data=this._badge_arr_visible;
        var timeleft=this._timeleft;
        var LanguageCenter=pslb.PROMPT_SETTING[pslb.Language].center;
        var centerPoint=this._centerpointX-LanguageCenter;

        data.forEach(function (e,index) {

            if(index==self.visible_index && !isChange){
                pslb.isPromptShow=true;
                e.setVisible(true);

                if(timeleft.isVisible())
                    e.setPosition(centerPoint-self._timeleft.width/2,22);
                else
                    e.setPosition(centerPoint-e.width/2,22);

                isChange=true;
                if(self.visible_index>=(data.length-1))
                    self.visible_index=0;
                else
                    self.visible_index++;
            }
            else
                e.setVisible(false);
        });
    },
    _TIME:0,
    _setPrompt_timeLeft:function (time) {
        this._TIME=time;
        this._timeleft.setVisible(false);

        if(this._TIME>0 && this._TIME <= pslb.promptTime) {

            this._timeleft.setNumber(this._TIME);
            this._timeleft.setVisible(true);
            pslb.isPromptShow=true;
            this._timeacc=0;
        }
    },
    _timeacc:0,
    update:function (dt) {
        // cc.log("this._TIME="+this._TIME);
        this._timeacc+=dt;
        if(this._timeacc>=1) {
            if(this._TIME>0 && this._TIME <= pslb.promptTime)
            {
                this._TIME=this._TIME-this._timeacc*1000;
                this._timeleft.setNumber(this._TIME);

                // cc.log("this._TIME="+this._TIME);
                this._timeleft.setVisible(true);
                pslb.isPromptShow=true;

                var self=this;
                var LanguageCenter=pslb.PROMPT_SETTING[pslb.Language].center;
                var centerPoint=this._centerpointX-LanguageCenter;
                var data=this._badge_arr_visible;
                data.forEach(function (e) {
                    e.setPosition(centerPoint-self._timeleft.width/2,22);
                });

            }
            else
            {
                // cc.log("Time's up!");
                // this._timeleft.setVisible(false);
            }

            this._timeacc=0;
        }
    }
});

pslb.LEVEL_PIC_SETTING= {
    // 0:[res.level_silver_png, res.silver_png, res.bar_silver_png,res.bar_text_double], //Lv 0
    // 0:[res.level_silver_png, res.silver_png, res.bar_silver_png,res.bar_text_double], //Lv 1 SILVER
    // 1:[res.level_gold_png, res.gold_png, res.bar_gold_png,res.bar_text_panther],    //Lv 2  Gold
    // 2:[res.level_gold_png, res.ruby_png, res.bar_ruby_png,res.bar_text_ruby],    //Lv 3  Red
    // 3:[res.level_black_png, res.black_png, res.bar_black_png,res.bar_text_diamand]     //Lv 4  Black
};

pslb.interface = cc.Node.extend({

    ctor:function(res_package){
        this._super();
        var fontsize=28;
        var self=this;

        cc.spriteFrameCache.addSpriteFrames(res.currency_plist);

        this.level_frame = new cc.Sprite(res.top_bg_png);
        this.addChild(this.level_frame);

        this.name = new cc.LabelTTF("User" , pslb.TTFName, fontsize);
        this.name.setPosition(291,680);
        if(cc.sys.isMobile)
            this.name.y=this.name.getPosition().y-pslb.MobilePosAdjustValue;
        this.name.setAnchorPoint(1,0.5);
        this.addChild(this.name);

        this._centMaxWidth = 170;
        this.cent=new cc.LabelTTF("0.00" , pslb.TTFName, fontsize);
        this.cent.setPosition(618,680);
        if(cc.sys.isMobile)
            this.cent.y=this.cent.getPosition().y-pslb.MobilePosAdjustValue;
        this.cent.setAnchorPoint(1,0.5);
        this.cent.scheduleUpdate();
        this.cent.update = function(){
            // if(pslb.ishome)
            // {
            //     pslb.ishome=false;
            // }
            self._setCent(pslb.MEMBERINFO_CENT);
        };
        this.addChild(this.cent);

        this.ps_coin=new cc.LabelTTF("0" ,pslb.TTFName, fontsize);
        this.ps_coin.setAnchorPoint(0.5,0.5);
        this.ps_coin.setPosition(774,680);
        if(cc.sys.isMobile)
            this.ps_coin.y=this.ps_coin.getPosition().y-pslb.MobilePosAdjustValue;
        this.ps_coin.scheduleUpdate();
        this.ps_coin.update = function(){
            // if(pslb.ishome)
            // {
            //     pslb.ishome=false;
            // }
            self._setPs_coin(pslb.memberInfo.ps_coin);
        };
        // this.addChild(this.ps_coin);

        // this.gold_medal = new pslb.medalNode(res.reward_gold, res.reward_1);
        // this.gold_medal.setPosition(744,659);
        // if(cc.sys.isMobile)
        //     this.gold_medal.y=this.gold_medal.getPosition().y-pslb.MobilePosAdjustValue;
        // this.gold_medal.setTotalQty(3);
        // this.gold_medal.setQty(2);
        // this.addChild(this.gold_medal);
        //
        // this.selever_medal = new pslb.medalNode(res.reward_selever, res.reward_2);
        // this.selever_medal.setPosition(875,659);
        // if(cc.sys.isMobile)
        //     this.selever_medal.y=this.selever_medal.getPosition().y-pslb.MobilePosAdjustValue;
        // this.selever_medal.setTotalQty(5);
        // this.selever_medal.setQty(3);
        // this.addChild(this.selever_medal);

        // this.copper_medal = new pslb.medalNode(res.reward_copper, res.reward_3);
        // this.copper_medal.setPosition(1006,659);
        // if(cc.sys.isMobile)
        //     this.copper_medal.y=this.copper_medal.getPosition().y-pslb.MobilePosAdjustValue;
        // this.copper_medal.setTotalQty(8);
        // this.copper_medal.setQty(7.5);
        // this.addChild(this.copper_medal);

        // this.prompt=new pslb.prompt();
        // this.prompt.setAnchorPoint(0,0);
        // this.prompt.setPosition(720,617);
        // this.addChild(this.prompt);

        // this.level_bar = pslb.createProgressBar(res.bar_silver_png);
        // this.level_bar.setAnchorPoint(0,0);
        // this.level_bar.setPosition(79,654);
        // this.level_bar.percentage =  100/3*2;
        // this.addChild(this.level_bar);

        // this.level = new cc.LabelTTF("LEVEL" , pslb.TTFName, 20);
        // this.level.setAnchorPoint(0,0);
        // this.level.setPosition(92,653);
        // if(cc.sys.isMobile)
        //     this.level.y=this.level.getPosition().y-pslb.MobilePosAdjustValue;
        // this.addChild(this.level);

        // this.level_badge = new cc.Sprite(res.silver_png);
        // this.level_badge.setPosition(3,634);
        // this.level_badge.setAnchorPoint(0,0);
        // this.addChild(this.level_badge);

        // this.level_bar_text =  new cc.Sprite(res.bar_text_double);
        // this.level_bar_text.setAnchorPoint(0,0);
        // this.level_bar_text.setPosition(89,687);
        // this.addChild(this.level_bar_text);


        // this.banner = new cc.Sprite(res.banner_top_01);
        // this.banner.setAnchorPoint(0,0);
        // this.banner.setPosition(746,638);
        // this.addChild(this.banner);

        this.setUserData(pslb.memberInfo);
        // this.setUserData(interface_userData);

        this.schedule(self.updateUserData);

        if(!pslb.isRealPlay){
            this._demo_mode_str = new cc.LabelTTF(pslb.TextGroup[pslb.Language].DemoMode, "Arial", 20);
            this._demo_mode_str._setFontWeight("bold");
            this._demo_mode_str.setAnchorPoint(0,0.5);
            this._demo_mode_str.setColor(new cc.Color(255,255,255,255));
            // if(cc.sys.isMobile)
            //     demo_mode_str.y=demo_mode_str.getPosition().y-pslb.MobilePosAdjustValue;
            this._demo_mode_str.setVisible(true);
            this.addChild(this._demo_mode_str);
        }

    },

    reset_position:function(){
        if (this._demo_mode_str){
            if (BK.DEVICE_MODE == 0){
                this._demo_mode_str.setPosition(645, 683);
            } else {
                this._demo_mode_str.setPosition(285, 1183);
            }
        }

        if (BK.DEVICE_MODE == 0){
            this.level_frame.setPosition(0,638);
            this.level_frame.setAnchorPoint(0,0);
            this.level_frame.setTexture(res.top_bg_png);
            this.name.setPosition(291,680);
            this.cent.setPosition(618,680);
        } else {
            this.level_frame.setPosition(360,1210);
            this.level_frame.setAnchorPoint(0.5,0.5);
            this.level_frame.setTexture(res.top_bg_m_png);
            this.name.setPosition(260,1239);
            this.cent.setPosition(260,1183);
        }

    },

    setUserData:function (userdata) {
        this._setMemberId(userdata.id);
        this._setLevel(userdata.level.code);
        this._setLevelProgress(userdata.level.percentage%100);
        this._setCent(userdata.cent);

        if(userdata.level.code >= pslb.proto.Level.Code.kGold){
            // this._setVisible_Medal_PsCoin(true);
            // this._setMedalQty(userdata.medal_group);
            // this._setPs_coin(userdata.ps_coin);
            // this._setPrompt(userdata.medal_group,userdata.psaward_deadline);
            // this.banner.setVisible(false);
        }
        else {
            // this._setVisible_Medal_PsCoin(false);
            // this.banner.setVisible(true);
        }

    },

    updateUserData:function () {
        if(pslb.updateFlag)
        {
            pslb.updateFlag=false;

            var userdata=pslb.memberInfo;
            this._setMemberId(userdata.id);
            this._setLevel(userdata.level.code);
            this._setLevelProgress(userdata.level.percentage%100);

            if(userdata.level.code >=pslb.proto.Level.Code.kGold)
            {
                this._setVisible_Medal_PsCoin(true);
                this._setMedalQty(userdata.medal_group);
                this._setPs_coin(userdata.ps_coin);
                this._setPrompt(userdata.medal_group,userdata.psaward_deadline);

                // if (userdata.week_medal_group.length > 0) {
                //
                // }
                // else
                //     this._setPrompt(userdata.medal_group);

                // this.banner.setVisible(false);
            }
            else {
                // this._setVisible_Medal_PsCoin(false);
                // this.banner.setVisible(true);
            }
        }
    },
    _setMemberId:function(id){
        this.name.setString(id);
    },
    _setLevel:function (level) {
        if(level===undefined) return;

        var vip=pslb.proto.Level.Code.kDiamond;
        var settingVal=level>vip?vip:level;

        // this.level_frame.setTexture(res.top_bg_png);
        // this.level_badge.setTexture(pslb.LEVEL_PIC_SETTING[settingVal][1]);
        // this.level_bar._sprite.setTexture(pslb.LEVEL_PIC_SETTING[settingVal][2]);
        // this.level_bar_text.setTexture(pslb.LEVEL_PIC_SETTING[settingVal][3]);

        // settingVal<3? this.level.setString("LEVEL"):
        //     level-3>0? this.level.setString("VIP"+padLeft(level-3,2)):this.level.setString("VIP");
    },
    _setLevelProgress:function (levelprogress) {
        // this.level_bar.percentage=levelprogress;
    },
    _setMedalQty:function (meadl_group) {
        var self = this;
        var code = pslb.proto.Medal.Code;

        // meadl_group.forEach(function(meadl){
        //     if(meadl.code == code.kBrown)
        //         self.copper_medal.setQty(meadl.count);
        //     else if(meadl.code == code.kSilver)
        //         self.selever_medal.setQty(meadl.count);
        //     else if(meadl.code == code.kGold)
        //         self.gold_medal.setQty(meadl.count);
        // })
    },
    _setPs_coin:function (num) {
        this.ps_coin.setString(addComma(num));
    },
    _setCent:function (num) {
        var flag = {
            digitK: 7,
        };
        if (g_getCreditmode() === pslb.CREDITMODE.CREDIT) {
            this.cent.setString(g_format_accountion_unit(num, flag));
        } else {
            this.cent.setString(g_format_cent(num, flag));
        }
        adjustObjSize(this.cent, this._centMaxWidth);
    },
    _setPrompt:function (group,time) {
        // this.prompt.setPrompt(group,time);
    },
    _setVisible_Medal_PsCoin:function(boolean){
        // this.gold_medal.setVisible(boolean);
        // this.selever_medal.setVisible(boolean);
        // this.copper_medal.setVisible(boolean);
        // this.prompt.setVisible(boolean);

    }
});

pslb.NumberTTF = cc.LabelTTF.extend({
    _number: null,

    ctor:function(num, fontName, fontSize){
        cc.LabelTTF.prototype.ctor.call(this, "", fontName, fontSize);
        this.setNumber(num);
    },

    getNumber:function(){
        return this._number;
    },

    setNumber:function(num, prefix, postfix){
        num = Number(num) ;
        prefix = prefix || "";
        postfix = postfix || "";

        var str = String(prefix) + this.NumberFormat(num) + String(postfix);

        cc.LabelTTF.prototype.setString.call(this, str);
        this._number = num;
    },

    NumberFormat:function(num){
        return num;
    }
});

function addComma(num){
    num = num.toString()||0;
    var pattern = /(-?\d+)(\d{3})/;

    while(pattern.test(num))
    {
        num = num.replace(pattern, "$1,$2");
    }
    return num;
}

/* Left  add 0 */
function padLeft(str, len) {
    str = '' + str;
    if (str.length >= len) {
        return str;
    } else {
        return padLeft("0" + str, len);
    }
}
/* Right add 0 */
function padRight(str, len) {
    str = '' + str;
    return str.length >= len ? str : str + new Array(len - str.length + 1).join("0");
}


/*pslb.interface.proto.goldRes = {

}

pslb.interface.proto.silverRes = {

}

pslb.interface.proto.copperRes = {

}*/

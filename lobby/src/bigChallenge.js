var pslb = pslb || {};


pslb.createWheelSoundBtn= function(){
    var ret = new ccui.Button(res.bgw_btn_sound_on,res.bgw_btn_sound_off,res.bgw_btn_sound_off);
    ret.setTouchEnabled(true);
    ret.addTouchEventListener(function(touch, type){
        if(ccui.Widget.TOUCH_ENDED == type){
            var volume = cc.audioEngine.getMusicVolume();
            if(volume == 0){
                ret.setBright(true);
                cc.audioEngine.setMusicVolume(1);
                cc.audioEngine.setEffectsVolume(1);
                pslb.Volume=1;
            }
            else{
                ret.setBright(false);
                cc.audioEngine.setMusicVolume(0);
                cc.audioEngine.setEffectsVolume(0);
                pslb.Volume=0;
            }
        }
    });
    ret.scheduleUpdate();
    ret.update=function () {
        if( pslb.Volume == 1){
            ret.setBright(true);
            cc.audioEngine.setMusicVolume(1);
            cc.audioEngine.setEffectsVolume(1);
        }
        else{
            ret.setBright(false);
            cc.audioEngine.setMusicVolume(0);
            cc.audioEngine.setEffectsVolume(0);
            pslb.Volume=0;
        }
    };
    return ret;
};

pslb.createWheelHelpBtn=function () {

    var ret =new ccui.Button(res.bgw_btn_help_up,res.bgw_btn_help_down,res.bgw_btn_help_down);
    ret.setTouchEnabled(true);
    ret.addTouchEventListener(function (sender,type) {
        if(!pslb.isWheelTurning)
        {
            if(type==ccui.Widget.TOUCH_BEGAN)
                cc.audioEngine.playEffect(res.button_sound);
            if(type==ccui.Widget.TOUCH_ENDED){
                pslb.isChallengeHelpOn = true;
                pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                    {
                        id:pslb.PageId.bgwhelp,
                        enabled: true
                    });
            }

        }
    });


    return ret;
};


pslb.BET_BOARD= [
    [res.bgw_board_bet_6,res.bgw_board_bet_7,res.bgw_board_bet_8], //cent
    [res.bgw_board_bet_1,res.bgw_board_bet_2,res.bgw_board_bet_3]  //ps coin
];

pslb.INSUF_BALANCE=cc.Node.extend({
    ctor:function(type) {
        this._super();
        var size=cc.winSize;
        this.setVisible(true);

        var bg=new ccui.Button(res.bg_dark,res.bg_dark,res.bg_dark);
        bg.setPosition(size.width/2,size.height/2);
        bg.setTouchEnabled(true);
        bg.addTouchEventListener(function(touch, type){
            if(type == ccui.Widget.TOUCH_ENDED)
                this.setVisible(false)
        },this);
        this.addChild(bg);


        var insuf_bg=new cc.Sprite(res.ui_insuf_balance_bg);
        insuf_bg.setPosition(size.width/2,size.height/2);
        bg.addChild(insuf_bg);

        var word_pic = (type == 1) ? res.ui_insuf_balance:res.ui_insuf_balance;

        var word=new cc.Sprite(word_pic);
        word.setPosition(insuf_bg.width/2,insuf_bg.height/2-5);
        insuf_bg.addChild(word);

        // for avoid to click lower layer
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function () {
                return false;
            }.bind(this),
            onTouchEnded: function(){
                return this.isVisible();
            }.bind(this)
        }, this);

        cc.log("show INSUF_BALANCE");

    }
});

// pslb.ishome=false;
pslb.bigChallengeBet=1;
pslb.bigChallengeBetNum = [30, 60, 90];
pslb.bigChallenge = cc.Node.extend({
    level:0,
    isSound:true,
    arr_bet:[],
    ctor:function(playbet){
        this._super();
        var size=cc.winSize;
        var self=this;
        self.setName("bigChallenge");


        pslb.bigChallengeBetNum.forEach(function (num, index) {
            pslb.bigChallengeBetNum[index] = 30 * (index + 1) * pslb.systemInfo.ps_coin_mult;
        });

        //Background
        var bg = new cc.Sprite(res.challenge_bg);
        bg.setPosition(size.width/2,size.height/2);
        this.addChild(bg);

        //Black
        this.black_in=new cc.Sprite(res.bg_dark100);
        this.black_in.setOpacity(0);
        this.black_in.setAnchorPoint(0,0);
        this.addChild(this.black_in);

        //Wheel
        this.wheel = new pslb.bigChallengeWheel();
        this.wheel.setPosition(440,359);
        this.addChild(this.wheel,10);


        this.right_node=new cc.Node();
        this.addChild(this.right_node);
        //-------Right ---------------
        this._bgw_board = new cc.Sprite(res.bgw_board_bg);
        this._bgw_board.setAnchorPoint(0.5,0.5);
        this._bgw_board.setPosition(980,360);
        this.right_node.addChild( this._bgw_board);

        //Right Node
        // this.right_node = new cc.Sprite(res.bgw_board_bg);
        // this.right_node.setAnchorPoint(0.5,0.5);
        // this.right_node.setPosition(980,360);
        // this.addChild(this.right_node);

        this.gamed=true;
        var gamed=this.gamed;

        this._board_title_sp = new cc.Sprite(res.board_title_sp);
        this._board_title_sp.setScale(0.4);
        this._bgw_board.addChild(this._board_title_sp);
        this._board_title_sp.setPosition(190,629);

        this.account=new pslb.bigChallengeAccountInfo();
        this.account.setAnchorPoint(0,0);
        this.account.setPosition(0,0);
        this.account.scheduleUpdate();
        this.account.update = function(){
            self.account.setPs_coin(pslb.memberInfo.ps_coin);
            self.account.setCent(pslb.MEMBERINFO_CENT);
        };
        this._bgw_board.addChild(this.account);

        //SPIN LEFT
        this._spin_times = new pslb.SpinTimes(20,0.8,cc.color(255, 235, 180,0));
        this._spin_times.setAnchorPoint(0.5,0.5);
        this._spin_times.setPosition(930,434);
        this._spin_times.scheduleUpdate();
        this._spin_times.update=function () {
            self._spin_times.setSpinTimes(pslb.memberInfo.spin_times,1);
        };
        this.right_node.addChild(this._spin_times);

        //Bet
        this.bet=new ccui.Button(res.bgw_btn_bet_up,res.bgw_btn_bet_down,res.bgw_btn_bet_down);
        this.bet.setTag(0);
        this.bet.setAnchorPoint(0.5,0.5);
        this.bet.setPosition(980,367);
        this.bet.setTouchEnabled(true);
        this.bet.addTouchEventListener(this.btnBetClick,this);
        this.right_node.addChild(this.bet);
        this.bet.scheduleUpdate();
        this.bet.update = function(){
            self.bet.setEnabled(!pslb.isWheelTurning);
        };

        pslb.bigChallengeBet= playbet || 1;
        this.bet_num=new cc.Sprite(res["bgw_board_bet_"+pslb.bigChallengeBet]);
        this.bet.setTag(pslb.bigChallengeBet-1);
        this.bet_num.setPosition(990,352);
        this.right_node.addChild(this.bet_num);

        this._betNumber = new pslb.NumberAtlas('', res.board_bet_number, 11, 38);
        this._betNumber.NumberFormat = pslb.DollarFormat;
        this._betNumber.setAnchorPoint(0.5, 0.5);
        this._betNumber.setPosition(990,352);
        this._betNumber.setNumber(pslb.bigChallengeBetNum[pslb.bigChallengeBet - 1]);
        this.right_node.addChild(this._betNumber);

        var currency = pslb.UrlVariables[pslb.UrlVariablesName.Currency];
        if (checkMultiCurrency(currency)) {
            this._bet_currency = new SpriteInPlist(currency + '_sm.png');
            this._bet_currency.setAnchorPoint(0.5, 0.5);
        } else {
            this._bet_currency=new pslb.CurrencyAtlas(res.board_bet_money,22,38);
            this._bet_currency.setAnchorPoint(0.5,0.5);
            this._bet_currency.setCurrency();
        }
        this.right_node.addChild(this._bet_currency);

        //Spin
        this.spin=new ccui.Button(res.bgw_btn_spin_up,res.bgw_btn_spin_down,res.bgw_btn_spin_down);
        this.spin.setAnchorPoint(0.5,0.5);
        this.spin.setPosition(980,249);
        this.spin.setTouchEnabled(true);
        this.spin.addTouchEventListener(this.btnSpinClick,this);
        this.right_node.addChild(this.spin);
        this.spin.scheduleUpdate();
        this.spin.update = function(){
            if(pslb.isRealPlay){
               self.spin.setEnabled(!pslb.isWheelTurning);
                self.spin.setTouchEnabled(!pslb.isWheelTurning);
            }
            else
            {
                //Free Play
                self.spin.setEnabled(false);
                self.spin.setTouchEnabled(false);
            }
        };

        var spin=this.spin;
        this.spin_blink=new cc.Sprite(res.bgw_btn_spin_down);
        this.spin_blink.setAnchorPoint(0.5,0.5);
        this.spin_blink.setPosition(980,249);
        this.spin_blink_runAction(gamed);
        this.right_node.addChild(this.spin_blink);
        this.spin_blink.scheduleUpdate();
        this.spin_blink.update = function(){
            if(gamed == !spin.isEnabled()){
                self.spin_blink_runAction(!gamed);
                gamed=spin.isEnabled();
                if(gamed){
                    var ps_coin=self.account.getPs_coin();

                    if(ps_coin<= (pslb.bigChallengeBet-1) )
                    {
                        if(ps_coin>0){
                            pslb.bigChallengeBet=ps_coin;
                            self.updateBetNumber(ps_coin,pslb.bigChallengeBet-1,true);
                        }
                        else if(ps_coin==0 && pslb.hastoResetWheel){
                            pslb.bigChallengeBet=1;
                            self.updateBetNumber(ps_coin,pslb.bigChallengeBet-1,true);
                        }
                    }
                }
            }

            if(pslb.setBetNumber)
            {
                cc.log("setBetNumber");
                pslb.setBetNumber=false;
                self.updateBetNumber(pslb.memberInfo.ps_coin,pslb.bigChallengeBet-1,false);
            }
        };

        this.ui=new pslb.bigChallengUI();
        this.ui.setAnchorPoint(0,0);
        this.ui.setPosition(0,0);
        this.right_node.addChild(this.ui);
        this.ui.scheduleUpdate();
        this.ui.update = function(){
            self.ui.setEnabled(!pslb.isWheelTurning);
        };

        //Black
        this.black_out=new cc.Sprite(res.bg_dark100);
        this.black_out.setOpacity(0);
        this.black_out.setAnchorPoint(0,0);
        this.addChild(this.black_out);

        this._insuf=new pslb.INSUF_BALANCE(0);
        this._insuf.setVisible(false);
        this.addChild(this._insuf,100);

        this._insuf_dayily_limit=new pslb.INSUF_BALANCE(1);
        this._insuf_dayily_limit.setVisible(false);
        this.addChild(this._insuf_dayily_limit,100);

        if(!pslb.isRealPlay)
        {
            var demo_mode_str= new cc.LabelTTF(pslb.TextGroup[pslb.Language].DemoMode, "Arial", 20);
            demo_mode_str._setFontWeight("bold");
            demo_mode_str.setAnchorPoint(1,0.5);
            demo_mode_str.setColor(new cc.Color(255,255,255,255));
            demo_mode_str.x =1100;
            demo_mode_str.y =510;
            // if(cc.sys.isMobile)
            //     demo_mode_str.y=demo_mode_str.getPosition().y-pslb.MobilePosAdjustValue;
            demo_mode_str.setVisible(true);
            this.addChild(demo_mode_str);
        }


        this.init(pslb.memberInfo);
        //this.init(interface_userData);

        this.setListener();

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
    init:function (data) {
        if(data===undefined) return;
        this.level = data.level.code;
        var ps_coin=data.ps_coin || 0;

        this.account.init(data);

        this.updateBetNumber(ps_coin,pslb.bigChallengeBet-1,true);

    },
    btnSpinClick:function (sender,type) {
        if(type==ccui.Widget.TOUCH_BEGAN)
            cc.audioEngine.playEffect(res.button_sound);
        if(type==ccui.Widget.TOUCH_ENDED){
            var self=this;
            pslb.isWheelTurning=true;

            if(pslb.memberInfo.ps_coin <=0 && pslb.memberInfo.spin_times == 0)
            {
                pslb.isWheelTurning=false;
                self._insuf_dayily_limit.setVisible(true);
                self.unschedule(self.handle_close_insuf_dayily_limt);
                self.scheduleOnce(self.handle_close_insuf_dayily_limt,3);
            }
            else
            {
                pslb.model.playBC(pslb.bigChallengeBet).then(function (result) {
                    //success
                    cc.log("playBC success");
                    pslb.isWheelTurning=true;
                    self.wheel.turn(result);

                },function (error) {
                    //fail  餘額不足
                    // cc.log("ps_coin not enough");
                    cc.log("ErrorCode="+error);
                    pslb.isWheelTurning=false;
                    self._insuf.setVisible(true);
                    self.unschedule(self.handle_close_insuf);
                    self.scheduleOnce(self.handle_close_insuf,3);
                });

            }
        }
    },
    handle_close_insuf:function () {
        this._insuf.setVisible(false);
        this.unschedule(this.handle_close_insuf);
    },
    handle_close_insuf_dayily_limt:function () {
        this._insuf_dayily_limit.setVisible(false);
        this.unschedule(this.handle_close_insuf_dayily_limt);
    },
    btnBetClick:function (sender,type) {
        if(type==ccui.Widget.TOUCH_BEGAN)
            cc.audioEngine.playEffect(res.button_sound);
        if(type==ccui.Widget.TOUCH_ENDED){
            var bet=sender.getTag();  //Tag Number
            bet=bet+1 || 0;     //Real bet  and next Tag Number

            pslb.isWheelTurning=true;

            var next_bet=bet+1;  //Real next bet
            if ( next_bet >3 ||                                                              //change bet  1 to 3
                (pslb.memberInfo.ps_coin > 0  && next_bet > pslb.memberInfo.ps_coin  ))     //if user ( has enough  ps coin )  or ( use cent )
            {
                bet=0;  //Tag Number
            }

            this.updateBetNumber(pslb.memberInfo.ps_coin,bet,true);  //next tag

            pslb.isWheelTurning=false;
        }

    },
    updateBetNumber:function (coin,bet,isWheelSet) {
        var ps_coin=coin || 0;
        bet=bet || 0;
        this._bet_currency.setVisible(ps_coin>0? false:true);
        if(ps_coin > 0)
        {
            this._betNumber.setVisible(false);
            this.bet_num.setPosition(980,352);
            this._bet_currency.setVisible(false);
            this.bet_num.setTexture(pslb.BET_BOARD[1][bet]);
            this.bet_num.setVisible(true);
        }
        else
        {
            this.bet_num.setPosition(990,352);
            if(!pslb.Currency) {
                this.bet_num.setPosition(980, 352);
                this._betNumber.setPosition(980, 352);
            }
            this.bet_num.setTexture(pslb.BET_BOARD[0][bet]);
            this.bet_num.setVisible(false);

            var flag = {
                noDot: true
            };
            var num = pslb.bigChallengeBetNum[bet];
            if (g_getCreditmode() === pslb.CREDITMODE.CREDIT) {
                num = g_format_accountion_unit(num, flag)
            }
            this._betNumber.setNumber(num);
            this._betNumber.setVisible(true);
            var numberSize = this._betNumber.getContentSize();
            this._bet_currency.setPosition(this._betNumber.x - numberSize.width / 2 - 11, this._betNumber.y + 1);
            this._bet_currency.setVisible(true);
        }

        this.bet.setTag(bet);
        pslb.bigChallengeBet=bet+1;

        this.account.setLevel(pslb.memberInfo.level.code);

        if(isWheelSet)
            this.wheel.set();
    },
    spin_blink_runAction:function (boolean) {
        if(boolean)
            this.spin_blink.runAction(cc.sequence(new cc.Blink(0,0),new cc.Blink(0.5,1),new cc.Blink(0.5,0))).repeatForever();
        else
            this.spin_blink.stopAllActions();
    }
});

pslb.bigChallengeAccountInfo = cc.Layer.extend({
    _jpWin:null,
    _level:null,
    _cent:null,
    _ps_coin:null,
    psCoin:0,
    cent:0,
    ctor:function () {
        this._super();

        var color_white=cc.color(255,255,255,255);
        var fontSize=28;

        // this._board_jp_bg=new cc.Sprite(res.bgw_board_jp_bg_1);
        // this._board_jp_bg.setAnchorPoint(0.5,0.5);
        // this._board_jp_bg.setPosition(980,607);
        // this.addChild(this._board_jp_bg);

        // this._jpWin=new cc.Node();
        // this._jpWin.setScale(0.46);
        // this._jpWin.setAnchorPoint(0.5,0.5);
        // this._jpWin.setPosition(72,9);
        // this._board_jp_bg.addChild(this._jpWin);

        // this._level=new cc.Sprite(res.bgw_level_1);
        // this._level.setPosition(225,280);
        // this._level.setAnchorPoint(0.5,0.5);
        // this._jpWin.addChild(this._level);

        // this._level_string=new cc.Sprite(res.bgw_level_text_1);
        // this._level_string.setPosition(225,155);
        // this._level_string.setAnchorPoint(0.5,0.5);
        // this._jpWin.addChild(this._level_string);

        this._centMaxWidth = 200;
        this._cent=new cc.LabelTTF("$0.00",pslb.TTFName,fontSize);
        this._cent.setColor(color_white);
        this._cent.setPosition(101,509);
        if(cc.sys.isMobile)
            this._cent.y=this._cent.getPosition().y-pslb.MobilePosAdjustValue;
        this._cent.setAnchorPoint(0,0.5);
        this.addChild(this._cent);

        this._ps_coin=new cc.LabelTTF("0" ,pslb.TTFName,fontSize);
        this._ps_coin.setColor(color_white);
        this._ps_coin.setPosition(101,470);
        if(cc.sys.isMobile)
            this._ps_coin.y=this._ps_coin.getPosition().y-pslb.MobilePosAdjustValue;
        this._ps_coin.setAnchorPoint(0,0.5);
        this.addChild(this._ps_coin);
    },

    init:function (data) {
        if(data===undefined) return;
        var cent=data.cent || 0;
        var ps_coin=data.ps_coin || 0;
        var level=data.level.code || 0;
        if(level>=pslb.proto.Level.Code.kDiamond) level=pslb.proto.Level.Code.kDiamond;
        this.setCent(cent);
        this.setPs_coin(ps_coin);

        this.setLevel(level);
    },

    setCent:function (num) {
        this.cent=num;
        var flag = {
            digitK: 7,
        };
        if (g_getCreditmode() === pslb.CREDITMODE.CREDIT) {
            this._cent.setString(g_format_accountion_unit(num, flag));
        } else {
            this._cent.setString(g_format_cent(num, flag));
        }
        adjustObjSize(this._cent, this._centMaxWidth);
    },

    setPs_coin:function (num) {
        num=num || 0;
        this._ps_coin.setString(this.setFormat(num));
        this.psCoin=num;
    },

    setLevel:function (num) {
        var level=num || 0;
        // if(level>=pslb.proto.Level.Code.kDiamond) level=pslb.proto.Level.Code.kDiamond;
        // this._level.setTexture(res["bgw_level_"+(level+1)]);
        // this._level_string.setTexture(res["bgw_level_text_"+(level+1)]);
        // this._board_jp_bg.setTexture(res["bgw_board_jp_bg_"+(level+1)]);

        //Set Max Jackpot
        var config_no=level*3+(pslb.bigChallengeBet-1);
        if(config_no<0) config_no=0;
        var config=pslb.systemInfo.wheel_group[config_no];
        this._setMaxJackpot(level,config.highestPay);
    },

    _setMaxJackpot:function (level,max_jackpot) {
        this.removeChild(this._max_jackpot_num);
        // var maxJackpotNumberPictures=[0,1,1,2];
        // var moneyPic=res["bgw_board_jackpot_money_"+maxJackpotNumberPictures[level]];
        // var numberPic=res["bgw_board_jackpot_number_"+maxJackpotNumberPictures[level]];
        this._max_jackpot_num=new pslb.MaxJackpotNumber(0,res.bgw_board_jackpot_money_1,res.bgw_board_jackpot_number_1,23,82);
        this._max_jackpot_num.setPosition(190,576);
        this._max_jackpot_num.setAnchorPoint(0.5,0.5);
        this._max_jackpot_num.setNumber(max_jackpot);
        this._max_jackpot_num.setScale(0.55);
        this.addChild(this._max_jackpot_num);
    },

    getPs_coin:function () {
        return this.psCoin;
    },
    getCent:function () {
        return this.cent;
    },
    handle_Ps_coin:function () {

    },
    handle_Cent:function () {

    },
    setFormat:function (nStr) {
        var num = nStr.toString();
        var pattern = /(-?\d+)(\d{3})/;

        while(pattern.test(num))
        {
            num = num.replace(pattern, "$1,$2");
        }
        return num;
    }

});

pslb.bigChallengUI=cc.Layer.extend({
    ctor:function () {
        this._super();

        //Sound
        this.sound=new pslb.createWheelSoundBtn();
        this.sound.setAnchorPoint(0.5,0.5);
        this.sound.setPosition(980,90);
        this.addChild(this.sound);

        //Home
        this.home = new ccui.Button(res.bgw_help_close_up,res.bgw_help_close_down,res.bgw_help_close_down);
        this.home.setAnchorPoint(0.5,0.5);
        this.home.setPosition(1194,650);
        this.home.setTouchEnabled(true);
        this.home.addTouchEventListener(this.homebtnClick,this);
        this.addChild(this.home);

        //Help
        this.help = new pslb.createWheelHelpBtn();
        this.help.setAnchorPoint(0.5,0.5);
        this.help.setPosition(980,160);
        // this.help.setTouchEnabled(true);
        // this.help.addTouchEventListener(function (sender,type) {
        //     if(!pslb.isWheelTurning)
        //     {
        //         if(type==ccui.Widget.TOUCH_BEGAN)
        //             cc.audioEngine.playEffect(res.button_sound);
        //         if(type==ccui.Widget.TOUCH_ENDED){
        //             pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
        //                 {
        //                     id:pslb.PageId.bgwhelp,
        //                     enabled: true
        //                 });
        //         }
        //
        //     }
        // },this);
        this.addChild(this.help);

    },

    setEnabled:function (boolean) {
        this.home.setEnabled(boolean);
        this.help.setTouchEnabled(boolean);
    },

    homebtnClick:function (sender,type) {

        if (type == ccui.Widget.TOUCH_BEGAN)
            cc.audioEngine.playEffect(res.button_sound);
        if (type == ccui.Widget.TOUCH_ENDED) {
            pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                {
                    id: pslb.PageId.bigChallenge,
                    enabled: false
                });
            // pslb.ishome = true;
        }
    }
});



pslb.MaxJackpotNumber=cc.Sprite.extend({
    _currency:null,
    _num:null,
    _gap:0,
    _height:0,
    _digitK:7,
    ctor:function (num,currency_res,num_res,gap,res_height,height) {
        this._super();


        this._gap=gap||0;
        this._height=height ||0;
        num=num||0;
        this._node=new cc.Node();
        this._node.setPosition(0.5,0.5);
        this._node.setPosition(0,0);
        this.addChild(this._node);

        this._currency=new pslb.CurrencyAtlas(currency_res,this._gap*2,res_height);
        this._currency.setAnchorPoint(0,0.5);
        this._currency.setPosition(-3*this._gap,this._height);
        // this._node.addChild(this._currency);

        this._num= new pslb.NumberAtlas('', num_res, this._gap,res_height);
        this._num.setAnchorPoint(0.5,0.5);
        this._num.setPosition(0,this._height);
        this._num.setDigitK(this._digitK);
        this._num.setNumber(num);
        this._node.addChild(this._num);
    },

    setNumber:function (num) {
        num=this.setFormat(this.changeCentToDollar(num));
        this._num.setNumber(num);
    },

    setFormat:function (nStr) {
        var num = nStr.toString();
        var pattern = /(-?\d+)(\d{3})/;

        while(pattern.test(num))
        {
            num = num.replace(pattern, "$1,$2");
        }
        return num;
    },

    changeCentToDollar:function(cent){
        var flag = {
            noDot: true,
            digitK: 7
        };
        if (g_getCreditmode() === pslb.CREDITMODE.CREDIT) {
            return g_format_accountion_unit(cent, flag);
        } else {
            return cent / 100;
        }
    },

    initsetOpacity:function (opacity) {
        this._currency.setOpacity(opacity);
        this._num.setOpacity(opacity);
        this._node.setOpacity(opacity);
        this.setOpacity(opacity);
    },

    runAniFadeOut:function (time) {
        time=time ||0 ;

        this._currency.runAction(cc.fadeOut(time));
        this._num.runAction(cc.fadeOut(time));
    },

    runAniFadeIn:function (time) {
        time=time ||0 ;

        this._currency.runAction(cc.fadeIn(time));
        this._num.runAction(cc.fadeIn(time));
    }

});





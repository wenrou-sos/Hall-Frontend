var pslb = pslb || {};

window.closeGamePage = function(cent,isMute){
    // cc.log("window.closeGamePage");
    pslb.isCloseGame=true;


    // cc.log("pslb.MEMBERINFO_CENT = "+pslb.MEMBERINFO_CENT);
    // cc.log("win = "+win);
    pslb.MEMBERINFO_CENT=cent;
    cc.log("closeGamePage:: pslb.MEMBERINFO_CENT  = "+pslb.MEMBERINFO_CENT);

    pslb.Volume=(!isMute)?1:0;

};

pslb.DEF_NETWORKING=false;
pslb.isWheelTurning=false;
pslb.WIN_CENT=0;
//bigChallengeWheel Trigger game
pslb.isCloseGame=false;
//for paritcle
pslb.DEF_COIN_SHOWER_CREDIT = 100000;

pslb.WHEEL_TYPE={
    PAY:0,
    GAME:1,
    AWESOME:2,
    JACKPOT:3
};

pslb.wheel = cc.Sprite.extend({

    ctor:function(fileName){
        this._super(fileName);
        this.element = [];
    },

    addElement:function(id, node, radius, angle_star, range){
        if(!node) return;
        this.removeElementById(id);
        var size = this.getContentSize();
        var anchor_pos = cc.p(size.width * 0.5, size.height * 0.5);
        radius = radius || 0;
        var angle = (angle_star *2  + range) / 2 || 0;
        var pos = cc.p(
            anchor_pos.x + Math.cos(angle /180 * Math.PI) * radius,
            anchor_pos.y + Math.sin(angle /180  * Math.PI) * radius);
        node.setPosition(pos);
        node.setRotation(90-angle);
        this.addChild(node);
        this.element[id] = {
            "node": node,
            "angle_star": angle_star,
            "range" :range
        };
    },

    removeElementById:function(id){
        var element = this.element[id];
        if(element){
            this.removeChild(element.node);
            this.element[id] = undefined;
        }
    },

    getTurnAction:function(duration, circle_times, id, stop_at,random_angle) {
        var element = this.element[id];
        if (!element) return;

        stop_at = stop_at || 0;
        var cur_rotation = this.getRotation();
        random_angle=random_angle||(Math.random()*8+1)/10;
        var rotation_to = (element.angle_star + element.range*random_angle );
        var total_angle =  (rotation_to - cur_rotation  - stop_at) % 360;
        total_angle > 0 || (total_angle += 360);
        total_angle = total_angle + circle_times * 360;


        //Action
        var act3_angle=(Math.random()+1)*element.range;
        var act2_angle=(Math.random()*180)+(360-act3_angle);
        var act_angle=total_angle-act2_angle-act3_angle;

        var qty=360/element.range;
        var speed=10*2;
        //Time
        var act3_time=(act3_angle/speed);
        var act2_time=(act2_angle/qty/speed);
        var act_time=duration-act2_time-act3_time;

        // cc.log("act2_time="+act2_time);
        // cc.log("act2_angle="+act2_angle);
        // cc.log("act3_time="+act3_time);
        // cc.log("act3_angle="+act3_angle);
        // cc.log("===============");

        var act=new cc.rotateBy(act_time, act_angle, act_angle);
        var act2=new cc.rotateBy(act2_time, act2_angle,act2_angle).easing(new cc.easeBezierAction(0,0.8,0.9,1));
        var act3=new cc.rotateBy(act3_time, act3_angle,act3_angle).easing(new cc.easeBezierAction(0,0.8,0.9,1));
        return new cc.sequence(act,act2,act3);
    }
});

pslb.createWheelWithSplitEqually = function(wheel_bg, node_group, radius, start_angle){

    var wheel = new pslb.wheel(wheel_bg);
    var lenght = node_group.length;
    if(!lenght)
        return wheel;
    radius = radius || 0;
    start_angle = start_angle || 0;
    var range = 360 / lenght;
    for(var ni = 0; ni < lenght; ni++){

        wheel.addElement(ni, node_group[ni], radius, ni * range + start_angle, range);
    }

    return wheel;
};

pslb.EXT_WHEELGAMEID_SETTING=[
    {
        wheel_id:"game1",
        game_id:"PSS-ON-00019",
        game_type:1 //Bonus
    },
    {
        wheel_id:"game2",
        game_id:"PSS-ON-00025",
        game_type:1 //Bonus
    },
    {
        wheel_id:"game3",
        game_id:"PSS-ON-00044",
        game_type:1 //Bonus
    },
    {
        wheel_id:"game4",
        game_id:"PSS-ON-00019",
        game_type:0
    },
    {
        wheel_id:"game5",
        game_id:"PSS-ON-00025",
        game_type:0

    }

];

pslb.INT_WHEELGAMEID_SETTING=[
    {
        wheel_id:"game1",
        game_id:"PSS-ON-00019",
        game_type:1 //Bonus
    },
    {
        wheel_id:"game2",
        game_id:"PSS-ON-00025",
        game_type:1 //Bonus
    }

];

pslb.bigChallengeWheel = cc.Node.extend({
    _center:null,
    _jackpot:null,
    _jp_mask:null,
    _jackpot_hole:null,
    _internal:null,
    _internal_black:null,
    _external:null,
    _external_black:null,
    _bet:null,
    _bet_array:[],
    _jp_random_arr:[],
    _win:null,
    _credit_win:null,
    _inter_startpoint:0,
    _exter_startpoint:0,
    _inter_init_scale:0.7,
    _wheel_x:0,
    _wheel_y:0,
    ctor:function () {
        this._super();
    },
    set:function () {
        var self=this;
        this.removeAllChildren();

        this._bg = new cc.Sprite(res.bgw_wheel_bg);
        this._bg.setPosition(0,0);
        this.addChild(this._bg);


        var level=pslb.memberInfo.level.code || 0;
        if(level>3) level=3;

        var config_no=level*3+(pslb.bigChallengeBet-1);

        var all_wheel_setting=pslb.systemInfo.wheel_group; //all_wheel
        var external=all_wheel_setting[config_no].external;
        var internal=all_wheel_setting[config_no].internal;
        this.initializeExternalWheel(external);
        this.initializeInternalWheel(internal);

        this._center = new cc.Sprite(res.bgw_center);
        this.addChild(this._center);

        this.iniWin();

        this._wheel_x=self.x;
        this._wheel_y=self.y;

    },
    initializeExternalWheel:function(config){

        this.removeChild(this._external);
        var node_group = [];
        for(var i = 0; i < 10; i++) {

            var external=config[i] || [];

            switch (external.type){
                case 0:  //pay
                {
                    var pay=pslb.toNumber(external.pay.low,external.pay.high,external.pay.unsigned) || 0;
                    if (pay===0) //THANK YOU
                    {
                        var node = new cc.Sprite(res.bgw_wheel_award_7);
                        node_group.push(node);
                    }
                    else
                    {
                        var num=new pslb.WheelNumber(pay,res.bgw_wheel_money, res.bgw_wheel_number,34,68,75);
                        num.setAnchorPoint(0.5,0.5);
                        num.setPosition(0,50);
                        node_group.push(num);
                    }
                    break;
                }
                case 1:  //TriggerGame
                {
                    var game_id=external.trigger_game.game_id;
                    var game_type=external.trigger_game.game_type;
                    var wheel_id="";
                    pslb.EXT_WHEELGAMEID_SETTING.forEach(function (e) {
                        if(e.game_id==game_id && e.game_type==game_type)
                        {
                            wheel_id=e.wheel_id;
                            return;
                        }
                    });

                    var node = new cc.Sprite(res["bgw_wheel_award_"+wheel_id]);
                    node_group.push(node);
                    break;
                }
                case 2: //AWESOME
                {
                    var node = new cc.Sprite(res.bgw_wheel_award_1);
                    node_group.push(node);
                    break;
                }
            }

        }
        this._external = pslb.createWheelWithSplitEqually(res.bgw_wheel_award_bg, node_group,145,this._exter_startpoint);
        this.addChild(this._external);
        var ext_wheel = this._external;

        this._external_black_hole=new cc.Sprite(res.bgw_wheel_award_black_1);
        this._external_black_hole.setVisible(false);
        this._external_black_hole.scheduleUpdate();
        this._external_black_hole.update = function(){
            this.setPosition(ext_wheel.getPosition());
        };
        this.addChild(this._external_black_hole);

        this._external_black=new cc.Sprite(res.bgw_wheel_award_black);
        this._external_black.setVisible(false);
        this.addChild(this._external_black);

        var frame =new cc.Sprite(res.bgw_wheel_award_frame);
        this.addChild(frame);


        var external_line= new cc.Sprite(res.bgw_wheel_award_line);
        external_line.scheduleUpdate();
        external_line.update = function(){
            this.setRotation(ext_wheel.getRotation());
        };
        this.addChild(external_line);

    },
    initializeInternalWheel:function(config){
        var scale=this._inter_init_scale;
        this.removeChild(this._internal);
        var node_group = [];
        var jp_random_pay=[];
        var jp_random_id=0;
        for(var i = 0; i < 8; i++){
            var internal=config[i] || [];
            switch (internal.type){
                case 0:  //pay
                {
                    var pay=pslb.toNumber(internal.pay.low,internal.pay.high,internal.pay.unsigned) || 0;
                    if (pay===0){}
                    else
                    {
                        var num=new pslb.WheelNumber(pay,res.bgw_wheel_money, res.bgw_wheel_number,34,68,75);
                        num.setRotate(90);
                        num.setScale(0.8);
                        node_group.push(num);
                    }
                    break;
                }
                case 1:  //TriggerGame
                {
                    var game_id=internal.trigger_game.game_id;
                    var game_type=internal.trigger_game.game_type;
                    var wheel_id="";
                    pslb.INT_WHEELGAMEID_SETTING.forEach(function (e) {
                        if(e.game_id==game_id && e.game_type==game_type)
                        {
                            wheel_id=e.wheel_id;
                            return;
                        }
                    });

                    var node = new pslb.BetBonusGame(wheel_id,pslb.bigChallengeBet);
                    this._bet_array.push(node);
                    node_group.push(node);
                }
                case 2:
                {
                    break;
                }
                case 3:
                {
                    var node = new cc.Sprite(res.bgw_wheel_awesome_1);
                    node_group.push(node);
                    jp_random_pay=internal.random_pay;
                    jp_random_id=i;
                    break;
                }
            }
        }

        this._internal = pslb.createWheelWithSplitEqually(res.bgw_wheel_awesome_bg, node_group,118,this._inter_startpoint);
        this.addChild(this._internal);
        this._internal.setScale(scale);

        this.initializeJackpotWheel(jp_random_pay,jp_random_id);
        var int_wheel = this._internal;


        //up
        var node_group_up = [];
        for(var i = 0; i < 8; i++){

            var internal=config[i] || [];

            switch (internal.type){
                case 0:  //pay
                {
                    var node = new cc.Sprite(res.bgw_wheel_awesome_5);
                    node_group_up.push(node);
                    break;
                }
                case 1:  //TriggerGame
                {
                    var game_id=internal.trigger_game.game_id;
                    var game_type=internal.trigger_game.game_type;
                    var wheel_id="";
                    pslb.INT_WHEELGAMEID_SETTING.forEach(function (e) {
                        if(e.game_id==game_id && e.game_type==game_type)
                        {
                            wheel_id=e.wheel_id;
                            return;
                        }
                    });

                    var node = new pslb.BetBonusGame(wheel_id,pslb.bigChallengeBet);
                    this._bet_array.push(node);
                    node_group_up.push(node);
                    break;
                }
                case 3:
                {
                    var node = new cc.Sprite(res.bgw_wheel_awesome_2);
                    node_group_up.push(node);
                    break;
                }
            }


        }

        this._internal_up = pslb.createWheelWithSplitEqually(res.bgw_wheel_awesome_black_80, node_group_up,118,this._inter_startpoint);
        this._internal_up.setScale(scale);
        this._internal_up.setRotation(int_wheel.getRotation());
        this._internal_up.scheduleUpdate();
        this._internal_up.update = function(){
            this.setRotation(int_wheel.getRotation());
        };
        this.addChild(this._internal_up);
        //

        this._internal_black_jackpot=new cc.Sprite(res.bgw_wheel_jackpot_black);
        this._internal_black_jackpot.setVisible(false);
        this._internal_black_jackpot.setScale(int_wheel.getScale());
        this._internal_black_jackpot.scheduleUpdate();
        this._internal_black_jackpot.update = function(){
            this.setScale(int_wheel.getScale());
        };
        this.addChild(this._internal_black_jackpot);


        this._internal_black=new cc.Sprite(res.bgw_wheel_awesome_black);
        this._internal_black.setScale(scale);
        this._internal_black.setVisible(false);
        this._internal_black.scheduleUpdate();
        this._internal_black.update = function(){
            // this.setRotation(int_wheel.getRotation());
            this.setScale(int_wheel.getScale());
        };
        this.addChild(this._internal_black);

        var frame=new cc.Sprite(res.bgw_wheel_awesome_frame);
        frame.setScale(scale);
        frame.scheduleUpdate();
        frame.update = function(){
            this.setScale(int_wheel.getScale());
        };

        this.addChild(frame);
        var jp=this._jackpot;
        this._internal_line= new cc.Sprite(res.bgw_wheel_awesome_line);
        this._internal_line.setScale(scale);
        this._internal_line.setRotation(int_wheel.getRotation()+22.5);
        this._internal_line.setVisible(!jp.isVisible());
        this._internal_line.scheduleUpdate();
        this._internal_line.update = function(){
            this.setRotation(int_wheel.getRotation()+22.5);
            this.setScale(int_wheel.getScale());
            this.setVisible(!jp.isVisible());
        };
        this.addChild(this._internal_line);


        this._jackpot_hole= new cc.Sprite(res.bgw_wheel_jackpot_hole);
        this._jackpot_hole.setScale(scale);
        this._jackpot_hole.setRotation(int_wheel.getRotation()+22.5);
        this._jackpot_hole.setVisible(jp.isVisible());
        this._jackpot_hole.scheduleUpdate();
        this._jackpot_hole.update = function(){
            this.setRotation(int_wheel.getRotation()+22.5);
            this.setScale(int_wheel.getScale());
            this.setVisible(jp.isVisible());
        };
        this.addChild(this._jackpot_hole);

    },
    initializeJackpotWheel:function(random,id){

        this.removeChild(this._jackpot);
        // this._jp_random_arr=random;
        this._jp_random_arr=[];
        var node_group = [];
        var internal=this._internal;


        for(var i = 0; i < 2; i++) {
            for(var j = 0; j < 4; j++) {

                var pay =(random[j])?pslb.toNumber(random[j].low,random[j].high,random[j].unsigned): 0;
                var num = new pslb.JackpotNumber();
                num.setNumber(pay);
                num.setAnchorPoint(0.5, 0.5);
                num.setPosition(0, 50);
                node_group.push(num);
                this._jp_random_arr.push(pay);
            }
        }

        this._jackpot = pslb.createWheelWithSplitEqually(res.bgw_wheel_jackpot_bg, node_group,118,this._inter_startpoint);
        var jp=this._jackpot;
        jp.setScale(internal.getScale()-0.025);
        jp.scheduleUpdate();
        jp.update = function(){
            this.setScale(internal.getScale()-0.025);
        };
        jp.setVisible(false);


        var jp_line= new cc.Sprite(res.bgw_wheel_jackpot_line);
        jp_line.setRotation(jp.getRotation()+22.5);
        jp_line.setVisible(jp.isVisible());
        jp_line.setScale(internal.getScale());
        jp_line.scheduleUpdate();
        jp_line.update = function(){
            this.setRotation(jp.getRotation()+22.5);
            this.setVisible(jp.isVisible());
            this.setScale(internal.getScale());
        };

        //Mask
        var clip = new cc.Sprite(res.bgw_wheel_awesome_1);
        clip.setAnchorPoint(0.5,0.5);
        clip.setPosition(0,118);
        this._jp_mask = new cc.ClippingNode(clip);
        this._jp_mask.scheduleUpdate();
        this._jp_mask.update = function(){
            this.setVisible(jp.isVisible());
        };
        this._jp_mask.addChild(jp);
        this._jp_mask.addChild(jp_line);
        this.addChild(this._jp_mask);

    },
    iniWin:function () {
        this._win=new pslb.JackpotNumber();
        this._win.setJPOpacity(0);
        this._win.setPosition(0,160); //117
        this.addChild(this._win);

        this._credit_win=new pslb.JackpotNumber();
        this._credit_win.setJPOpacity(0);
        this._credit_win.setPosition(530,100);
        this.addChild(this._credit_win);

    },
    resetBet:function (bet) {
        bet=bet || 1;
        this._bet_array.forEach(function (e) {
            e.setNumber(bet);
        });


    },
    _turnExtWheel:function(result, end_cb){
        pslb.isWheelTurning=true;
        var result_pay=(result.pay)?pslb.toNumber(result.pay.low, result.pay.high,result.pay.unsigned):0;
        var result_id =result.id.toString() || "0";
        result_id=result_id.substr(result_id.length-1,1);
        var self=this;
        var wheel = this._external;
        var action = wheel.getTurnAction(6, 5,result_id, 90);
        var act=new cc.delayTime(0);

        if(result.type==pslb.WHEEL_TYPE.PAY)
        {
            if(result_pay>0)
                act=new cc.spawn(cc.delayTime(1.5),cc.callFunc(function () {
                    self._winAction(result_pay)
                }));
        }
        else if(result.type==pslb.WHEEL_TYPE.GAME) {

            var game=result.trigger_game;
            var game_id = game.game_id||"";
            var subgame_id= game.subgame_id||"";
            if (game_id!=="")
                act=self._act_load_game(game_id,subgame_id);
        }

        cc.audioEngine.playMusic(res.rolling01_sound);
        self._external_black_hole.setVisible(false);
        self._external_black.setVisible(false);
        wheel.runAction(cc.sequence(
            action,
            cc.spawn(cc.delayTime(1),cc.callFunc(function () {
                var rotate=wheel.getRotation()%360%(360/10);
                if(rotate>(360/10/2)) rotate=rotate-(360/10);
                //cc.log("rotate="+rotate);
                self._external_black_hole.setRotation(rotate);
                self._external_black_hole.setVisible(true);
            })),
            act,
            cc.callFunc(function(){
                pslb.WIN_CENT=result_pay;
                if(cc.isFunction(end_cb))
                    end_cb();
            })
        ));
    },
    _turnIntWheel:function(result, end_cb){
        var self=this;
        var wheel = this._internal;
        var scale=this._inter_init_scale;
        var result_id =result.id.toString() || "0";
        result_id=result_id.substr(result_id.length-1,1);
        var result_pay=(result.pay)?pslb.toNumber(result.pay.low, result.pay.high,result.pay.unsigned):0;
        var action = wheel.getTurnAction(8, 4, result_id, 90);
        var black= this._internal_up;
        var act=new cc.delayTime(0);
        var act_scale_small=new cc.scaleTo(0,1.05);
        if(result_pay>0 && result.type!==pslb.WHEEL_TYPE.JACKPOT) {
            act = new cc.spawn(cc.delayTime(1.5), cc.callFunc(function () {
                self._winAction(result_pay)
            }));
        }
        if(result.type==pslb.WHEEL_TYPE.GAME) {

            var game=result.trigger_game;
            var game_id = game.game_id||"";
            var subgame_id= game.subgame_id||"";
            if (game_id!=="")
                act=self._act_load_game(game_id,subgame_id);
        }

        if(result.type!==pslb.WHEEL_TYPE.JACKPOT && result.type!==pslb.WHEEL_TYPE.GAME)
        {
            //縮小
            act_scale_small=self._act_init_internal();
        }


        self._external_black_hole.setVisible(false);
        self._external_black.setVisible(true);
        self._internal_black.setVisible(false);

        wheel.runAction(
            cc.sequence(
                cc.callFunc(function(){
                    black.setVisible(false);
                }),
                //放大
                cc.spawn(cc.scaleTo(0.5,1.05),cc.callFunc(function () {
                    cc.audioEngine.playMusic(res.trans_sound);
                })),
                cc.callFunc(function(){
                    cc.audioEngine.playMusic(res.rolling02_sound);
                }),
                action,
                cc.spawn(cc.delayTime(1),cc.callFunc(function () {
                    var rotate=wheel.getRotation()%360%(360/8)-(360/8/2);
                    self._internal_black.setRotation(rotate);
                    self._internal_black.setVisible(true);
                })),
                act,
                //縮小
                act_scale_small,
                cc.callFunc(function(){
                    pslb.WIN_CENT=result_pay;
                    if(cc.isFunction(end_cb))
                        end_cb();
                })
            ));
    },
    _turnJPWheel:function(result, end_cb){
        var self=this;
        var result_pay=(result.pay)?pslb.toNumber(result.pay.low, result.pay.high,result.pay.unsigned):0;
        var scale=this._inter_init_scale;
        var wheel = this._jackpot;
        wheel.setVisible(true);

        var result_id=0;
        for(var i=0;i<8;i++)
        {
            if(this._jp_random_arr[i]==result_pay){
                result_id=i;
            }
        }
        var action = wheel.getTurnAction(10, 6, result_id, 90,0.5).easing(new cc.easeBezierAction(0,0,1,1));
        var act=new cc.delayTime(0);


        if(result_pay>0)
            act=new cc.spawn(cc.delayTime(1.5),cc.callFunc(function () {
                self._winAction(result_pay)
            }));

        self._external_black.setVisible(true);
        self._internal_black.setVisible(true);
        var rotate=self._internal.getRotation()%360%(360/8)-(360/8/2);
        self._internal_black.setRotation(rotate);
        self._jp_mask.setRotation(rotate);
        self._jackpot_hole.setRotation(rotate);

        wheel.runAction(
            cc.sequence(
                cc.callFunc(function(){
                    cc.audioEngine.playMusic(res.rolling03_sound);
                }),
                action,
                cc.spawn(cc.delayTime(1),cc.callFunc(function () {
                    self._internal_black.setVisible(true);
                })),
                act,
                cc.callFunc(function () {
                    pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                        {
                            id:pslb.PageId.jpwin,
                            enabled: true,
                            jp:result_pay,
                            time:0.5
                        });
                }),
                cc.delayTime(5.5),
                cc.callFunc(function () {
                    pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                        {
                            id:pslb.PageId.jpwin,
                            enabled: false,
                            jp:result_pay,
                            time:0.5
                        });
                }),
                cc.delayTime(1),
                cc.callFunc(function(){
                    wheel.setVisible(false);
                    pslb.WIN_CENT=result_pay;

                    if(cc.isFunction(end_cb))
                        end_cb();
                })
            ));
    },
    _winAction:function (credit) {
        var self=this;
        var win=self._win;
        var credit_win=self._credit_win;

        win.setJPOpacity(0);
        win.setNumber(credit);
        win.setPosition(0,160);

        var bezier=[cc.p(0,160),cc.p(0,300),cc.p(530,100)];
        win.runAction(
            cc.spawn(
                cc.spawn(
                    cc.spawn(
                        new cc.bezierTo(1,bezier),
                        cc.sequence(cc.scaleTo(0,1),cc.scaleTo(0.5,2),cc.scaleTo(0.5,1)).easing(new cc.easeQuadraticActionInOut())
                    )
                )
                ,cc.sequence(
                    cc.callFunc(function () {
                        cc.audioEngine.playMusic(res.gold_sound);
                    }),
                    cc.callFunc(function () {
                        win.fadeIn(0,0.2);
                    })
                    ,cc.callFunc(function () {
                        win.fadeOut(0.8,0.2);
                    })

                )
            ));

        credit_win.setJPOpacity(0);
        credit_win.setNumber(credit);
        credit_win.setPosition(530,100);

        credit_win.runAction(
            cc.sequence(
                cc.delayTime(1),
                cc.spawn(
                    cc.moveTo(0.5,530,150).easing(new cc.easeCubicActionOut())
                    ,cc.sequence(
                        cc.callFunc(function () {
                            credit_win.fadeIn(0,0.15);
                        })
                        ,cc.callFunc(function () {
                            credit_win.fadeOut(0.35,0.5);
                        })

                    )
                )
                ,cc.callFunc(function () {
                    if(credit>=pslb.DEF_COIN_SHOWER_CREDIT)
                    {
                        self.take_win();
                    }
                })
            )
        );

    },
    turn:function(bgw_result){
        var self = this;

        // bgw_result = [
        // {id:2,pay:1000,type:0,trigger_game:""}  //PAY

        // {id:8,pay:0,type:2,trigger_game:""},  //PAY
        //  {id:2,pay:30000,type:0,trigger_game:""}

        // {id:3,pay:0,type:1,trigger_game:"game4"}  //game ext

        // {id:8,pay:0,type:2,trigger_game:""}  //game int
        // ,{id:3,pay:0,type:1,trigger_game:{game_id:"game1",subgame_id:1}}
        // game.game_id,game.subgame_id

        // {id:8,pay:0,type:2,trigger_game:""}, //Jackpot
        //  {id:5,pay:1000000,type:3,trigger_game:""}
        // ];

        /* Note
                         //bgw_result[0]    Ext
                         //bgw_result[1]   Int
                         // id
                         // pay
                         // trigger_game
                         // type
            */


        self._turnExtWheel(bgw_result[0],function() {
            if(bgw_result[0].type===pslb.WHEEL_TYPE.GAME)
            {
                // Open Game
            }
            else
            {
                if(bgw_result[1])
                    self._turnIntWheel(bgw_result[1], function(){
                        if(bgw_result[1].type===pslb.WHEEL_TYPE.GAME)
                        {
                            // Open Game
                        }
                        else if(bgw_result[1].type===pslb.WHEEL_TYPE.JACKPOT)
                        {
                            self._turnJPWheel(bgw_result[1], function(){
                                self._internal.runAction(
                                    cc.sequence(
                                        cc.spawn(cc.scaleTo(0.5,0.7),cc.callFunc(function () { cc.audioEngine.playMusic(res.trans_sound);}))
                                        ,cc.callFunc(function () {
                                            //Do End
                                            self._init_wheel();
                                        })
                                    )
                                );
                            });
                        }
                        else
                        {
                            //Do End
                            self._init_wheel();
                        }

                    });
                else{
                    //Do End
                    self._init_wheel();
                }
            }

        });
    },
    take_win:function (time) {

        //open
        this.winParticles = new pslb.winParticles();
        this.winParticles.setAnchorPoint(0.5,0.5);
        this.winParticles.setPosition(- cc.winSize.width/2,-cc.winSize.height/2);
        this.addChild(this.winParticles);

        this.scheduleOnce(this.stop_take_win,time);

    },
    stop_take_win:function () {
        //close
        this.removeChild(this.winParticles);
        // this.winParticles = null;
    },
    _open_game:function (gameId, subgame_id) {
        pslb.isCloseGame=false;
        this.removeChild(this._webView);

        //Open Game
        this._webView= new ccui.WebView(pslb.BuildLaunchURL(gameId, subgame_id));
        this._webView.setContentSize(cc.winSize.width+5, cc.winSize.height+5);
        this.addChild(this._webView);

        var iframe = this._webView;
        iframe.scheduleUpdate();
        iframe.update=function () {
            iframe.width=cc.winSize.width+5;
            iframe.heigt=cc.winSize.height+5;
        };

        this.schedule(this._close_game);

    },
    _close_game:function () {
        if(pslb.isCloseGame)
        {
            cc.log("FUNC _close_game ");
            pslb.isCloseGame=false;
            var self=this;
            var inter_int_scale=this._inter_init_scale;
            this.unschedule(this._close_game);

            var black=self.getParent().black_out;
            black.runAction(cc.sequence(cc.fadeIn(0),
                cc.callFunc(function () {
                    if(self._webView)
                    {
                        self._webView.cleanup();
                        self.removeChild(self._webView);
                    }
                }),cc.fadeOut(1)));

            //Reset Position
            self.runAction(cc.sequence(
                //cc.delayTime(1),
                cc.moveTo(1.5,cc.p(self._wheel_x,self._wheel_y))
            ));
            var right=this.getParent().right_node;
            right.runAction(cc.sequence(
                //cc.delayTime(1),
                cc.moveTo(1.5,cc.p(0,0))
            ));

            cc.log("internal="+ self._internal.getScale());
            cc.log("inter_int_scale="+ inter_int_scale);
            if(self._internal.getScale()>inter_int_scale)
            {
                self._internal.runAction(cc.sequence(
                    cc.delayTime(2),
                    self._act_init_internal(),
                    cc.callFunc(function () {
                        self._init_wheel();
                    })
                ));
            }else
            {
                self.scheduleOnce(self._init_wheel,2);
            }

        }
    },
    _init_wheel:function () {
        var self = this;
        var ext_black=self._external_black;
        var ext_hole=self._external_black_hole;
        var int_black=self._internal_black;
        var int_up=self._internal_up;

        ext_black.setVisible(false);
        ext_hole.setVisible(false);
        int_black.setVisible(false);
        int_up.setVisible(true);

        pslb.isWheelTurning=false;
        pslb.isCloseGame=false;
        pslb.MEMBERINFO_CENT+=pslb.WIN_CENT;
        cc.log("pslb.WIN_CENT="+pslb.WIN_CENT);
        pslb.WIN_CENT=0;
    },
    _act_load_game:function (gameId, subgame_id) {
        var self=this;
        var sec=1.5;
        var action=new cc.callFunc(function (){
            var x=cc.winSize.width;
            var y=cc.winSize.height/2;
            self.runAction(cc.moveTo(sec,cc.p((-1)*x,y)));

            var right=self.getParent().right_node;
            right.runAction(cc.moveTo(sec,cc.p(x,right.y)));

            var black=self.getParent().black_in;
            black.runAction(cc.sequence(cc.delayTime(0.5),cc.fadeIn(1)
                ,cc.callFunc(function () {
                    self._open_game(gameId, subgame_id);
                })
                ,cc.fadeOut(1)
            ));
        });

        return action;
    },
    _act_init_internal:function () {
        var scale=this._inter_init_scale;
        var action= new cc.spawn(
            cc.scaleTo(0.5,scale)
            ,cc.callFunc(function(){
                cc.audioEngine.playMusic(res.trans_sound);
            }));

        return action;
    }

});

pslb.bigChallengeJackpotWin= cc.Node.extend({
    ctor:function () {
        this._super();
        this.setName("bigChallengeJackpotWin");

        this.black=new cc.Sprite(res.bg_dark);
        this.black.setAnchorPoint(0,0);
        this.black.setPosition(0,0);
        this.addChild(this.black);

        this.bg=new cc.Sprite(res.bgw_jackpot_bg);
        this.bg.setAnchorPoint(0.5,0.5);
        this.bg.setPosition(633,355);
        this.addChild(this.bg);

        this.title=new cc.Sprite(res.bgw_jackpot_title);
        this.title.setAnchorPoint(0.5,0.5);
        this.title.setPosition(640,359);
        this.addChild(this.title);

        this._jpWin=new pslb.Level_Jackpot();
        this._jpWin.setAnchorPoint(0.5,0.5);
        this._jpWin.setPosition(0,0);
        this.title.addChild(this._jpWin);

        this.initsetOpacity();

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
    initsetOpacity:function () {
        this.black.setOpacity(0);
        this.bg.setOpacity(0);
        this.title.setOpacity(0);
        this._jpWin.runAniFadeOut(0);
    },
    setLevel:function (level,max_jackpot) {
        this._jpWin.setLevel(level,max_jackpot);
    },
    runAniFadeOut:function (time) {
        time=time ||0 ;
        this.black.runAction(cc.fadeOut(time));
        this.bg.runAction(cc.fadeOut(time));
        this.title.runAction(cc.fadeOut(time));

        this._jpWin.runAniFadeOut(time);

        this.setVisible(false);
    },
    runAniFadeIn:function (time) {
        time=time ||0 ;
        this.black.runAction(cc.fadeIn(time));
        this.bg.runAction(cc.fadeIn(time));
        this.title.runAction(cc.fadeIn(time));

        this._jpWin.runAniFadeIn(time);

        this.setVisible(true);

        this.setListener();
    }
});

pslb.Level_Jackpot=cc.Node.extend({

    ctor:function () {
        this._super();
        this._level=new cc.Sprite(res.board_title_sp);
        this._level.setPosition(319,305);//225,280
        this._level.setAnchorPoint(0.5,0.5);
        this.addChild(this._level);

        this._level_string=new cc.Sprite(res.bgw_level_text_4);
        this._level_string.setPosition(0,155);//225,155
        this._level_string.setAnchorPoint(0.5,0.5);
        // this.addChild(this._level_string);

        this._max_jackpot_num=new pslb.MaxJackpotNumber(0,res.bgw_board_jackpot_money_2,res.bgw_board_jackpot_number_2,23,82);
        this._max_jackpot_num.setAnchorPoint(0.5,0.5);
        this._max_jackpot_num.setNumber(27000000);
        this._max_jackpot_num.initsetOpacity(0);
        this.addChild(this._max_jackpot_num);
        // this.setLevel(1,2000000);
    },
    setLevel:function (num,max_jackpot) {
        var level=num || 0;
        if(level>=pslb.proto.Level.Code.kDiamond) level=pslb.proto.Level.Code.kDiamond;
        max_jackpot=max_jackpot || 0;
        // this._level.setTexture(res["bgw_level_"+(level+1)]);
        // this._level_string.setTexture(res["bgw_level_text_"+(level+1)]);
        //Set Max Jackpot
        this._setMaxJackpot(level,max_jackpot);
    },
    _setMaxJackpot:function (level,max_jackpot) {
        this.removeChild(this._max_jackpot_num);
        var maxJackpotNumberPictures=[0,1,1,2];
        var moneyPic=res["bgw_board_jackpot_money_"+maxJackpotNumberPictures[level]];
        var numberPic=res["bgw_board_jackpot_number_"+maxJackpotNumberPictures[level]];
        this._max_jackpot_num=new pslb.MaxJackpotNumber(0,moneyPic,numberPic,23,82);
        this._max_jackpot_num.setAnchorPoint(0.5,0.5);
        this._max_jackpot_num.setPosition(319,160);
        this._max_jackpot_num.setNumber(max_jackpot);
        this._max_jackpot_num.initsetOpacity(0);
        this.addChild(this._max_jackpot_num);
    },
    runAniFadeOut:function (time) {
        time=time ||0 ;

        this._level.runAction(cc.fadeOut(time));
        this._level_string.runAction(cc.fadeOut(time));
        this._max_jackpot_num.runAniFadeOut(time);
    },
    runAniFadeIn:function (time) {
        time=time ||0 ;

        this._level.runAction(cc.fadeIn(time));
        this._level_string.runAction(cc.fadeIn(time));
        this._max_jackpot_num.runAniFadeIn(time);
    }
});

//--------------------------------------------------------------//
pslb.BetBonusGame=cc.Sprite.extend({
    _gameid:null,
    _num:null,
    _multi:0,
    ctor:function (gameId,bet) {
        this._super();
        this._gameid=gameId;
        var node = new cc.Sprite(res["bgw_wheel_awesome_"+gameId]);
        this.setMultiple(gameId);

        bet=bet||1;
        var num= bet* this._multi * pslb.systemInfo.ps_coin_base_value * pslb.systemInfo.ps_coin_mult;
        this._num=new pslb.WheelNumber(num,res.bgw_wheel_bonus_money,res.bgw_wheel_bonus_number,22,46,70,4);
        this._num.setAnchorPoint(0.5,0.5);
        this._num.setPosition(90,120);
        node.addChild(this._num);
        this.addChild(node);
    },
    getGameId:function () {
        return  this._gameid;
    },
    getMultiple:function () {
        return  this._multi;
    },
    setMultiple:function (gameId) {
        switch (gameId)
        {
            case "game1":
                this._multi=3;
                break;
            case "game2":
                this._multi=0.5;
                break;
            default:
                this._multi=1;
                break;
        }
    }

});

pslb.JackpotNumber=cc.Node.extend({
    _currency:null,
    _num:null,
    _gap:18,
    _height:70,
    _digitK:6,
    ctor:function () {
        this._super();
        var len=0;
        this._node=new cc.Node();
        this._node.setPosition(0.5,0.5);
        this._node.setPosition(-1*(this._gap)*(len-(0.5*(len+1))),0);
        this.addChild(this._node);
        this._currency=new pslb.CurrencyAtlas(res.bgw_wheel_jackpot_money,this._gap,34);
        this._currency.setAnchorPoint(0,0.5);
        this._currency.setPosition(-1*(this._gap),this._height);
        // this._node.addChild(this._currency);

        this._num= new pslb.NumberAtlas(0, res.bgw_wheel_jackpot_number, this._gap / 2,34);
        this._num.NumberFormat = pslb.DollarFormat;
        this._num.setNoComma();
        this._num.setDigitK(this._digitK);
        this._num.setAnchorPoint(0,0.5);
        this._num.setPosition(0,this._height);
        this._node.addChild(this._num);
    },
    setNumber:function (num) {
        num=this.changeCentToDollar(num);
        this._num.setNumber(num);
        var len=num.toString().length;
        this._node.setPosition(-1*(this._gap)*(len-(0.5*(len+1))),0);
    },
    setRotate:function (num) {
        this._node.setRotation(num);
        this._node.setAnchorPoint(0.5,0.5);
        this._node.setPosition(-62,46);
    },
    setScale:function (num) {
        this._node.setScale(num);
    },
    changeCentToDollar:function(cent){
        var flag = {
            noDot: true,
            noComma: true,
            digitK: 6
        };
        if (g_getCreditmode() === pslb.CREDITMODE.CREDIT) {
            return g_format_accountion_unit(cent, flag);
        } else {
            return cent / 100;
        }
    },
    setJPOpacity:function (n) {
        this._currency.setOpacity(n);
        this._num.setOpacity(n);
    },
    fadeIn:function (delay,t) {
        this._currency.runAction(cc.sequence(cc.delayTime(delay),cc.fadeIn(t)));
        this._num.runAction(cc.sequence(cc.delayTime(delay),cc.fadeIn(t)));
    },
    fadeOut:function (delay,t) {
        this._currency.runAction(cc.sequence(cc.delayTime(delay),cc.fadeOut(t)));
        this._num.runAction(cc.sequence(cc.delayTime(delay),cc.fadeOut(t)));
    }

});

pslb.WheelNumber=cc.Sprite.extend({
    _currency:null,
    _num:null,
    _gap:20,
    _height:75,
    _numMaxWidth:96,
    _digitK:0,
    ctor:function (num,currency_res,num_res,gap,res_height,height,digitK) {
        this._super();
        this._digitK = digitK || 6;
        num=this.changeCentToDollar(num)||0;
        var len=num.toString().length;
        this._gap=gap||0;
        this._height=height ||0;

        this._node=new cc.Node();
        this._node.setPosition(0,0);
        this.addChild(this._node);

        this._currency=new pslb.CurrencyAtlas(currency_res,this._gap,res_height);
        this._currency.setAnchorPoint(0,0.5);
        this._currency.setPosition(-1*(this._gap),this._height);
        // this._node.addChild(this._currency);

        this._num= new pslb.NumberAtlas('', num_res, this._gap / 2, res_height);
        this._num.NumberFormat = pslb.DollarFormat;
        this._num.setAnchorPoint(0.5,0.5);
        this._num.setPosition(0,this._height);
        this._num.setDigitK(this._digitK);
        this._num.setNoComma();
        this._num.setNumber(num);
        this._node.addChild(this._num);
        adjustObjSize(this._num, this._numMaxWidth);
    },
    getNumber:function () {
        var num=this._num.getNumber();
        return num;
    },
    setNumber:function (num) {
        num=this.changeCentToDollar(num);
        this._num.setNumber(num);
        adjustObjSize(this._num, this._numMaxWidth);
    },
    setRotate:function (num) {
        this._node.setRotation(num);
        this._node.setAnchorPoint(0.5,0.5);
        this._node.setPosition(-62,50);
    },
    setScale:function (num) {
        this._node.setScale(num);
    },
    changeCentToDollar:function(cent){
        var flag = {
            noDot: true,
            noComma: true,
            digitK: this._digitK
        };
        if (g_getCreditmode() === pslb.CREDITMODE.CREDIT) {
            return g_format_accountion_unit(cent, flag);
        } else {
            return cent / 100;
        }
    }

});

pslb.NumberAtlas = cc.LabelAtlas.extend({
    _number: null,
    _digitK: null,
    _noComma: null,
    _start_char: 'A',
    _map_char: {
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
        ',' : 'V',
        'K': 'WX',
        'M': ' YZ'
    },

    // setString:undefined,
    // getString:undefined,

    ctor:function(num, charMapFile, itemWidth, itemHeight){
        cc.LabelAtlas.prototype.ctor.call(this,"", charMapFile, itemWidth, itemHeight, this._start_char);
        this.setNumber(num);
    },

    getNumber:function(){
        return this._number;
    },

    setNumber:function(num){
        //num = Number(num);
        this._number = num;

        //do format
        var unit = '';
        var format = this.NumberFormat(num);
        var integer = this.formatToInteger(format.toString());
        if (g_getCreditmode() !== null && this._digitK && integer.length >= this._digitK) {
            unit = 'K';
            integer = g_format_K_unit(integer);
            format = g_format_credit(integer) + unit;
        }

        if (this._noComma) {
            format = integer + unit;
        }

        //map to chat
        var label = "";
        for(var ni = 0; ni < format.length; ni++){
            label = label + this._map_char[format[ni]];
        }
        cc.LabelAtlas.prototype.setString.call(this, label);

    },

    NumberFormat:function(num){
        return num;
    },

    setDigitK : function (num) {
        this._digitK = num;
    },

    setNoComma : function () {
        this._noComma = true;
    },

    formatToInteger : function (format) {
        var num = '';
        var splitDot = format.split('.');
        var splitComma = splitDot[0].split(',');
        splitComma.forEach(function (split) {
            num += split;
        });
        return num;
    }
});

pslb.CurrencyAtlas = cc.LabelAtlas.extend({
    _currency: null,
    _start_char: 'A',
    _map_char: {
        '¥' : 'A',
        '$' : 'B'
    },

    // setString:undefined,
    // getString:undefined,

    ctor:function(charMapFile, itemWidth, itemHeight){
        cc.LabelAtlas.prototype.ctor.call(this,"", charMapFile, itemWidth, itemHeight, this._start_char);
        this.setCurrency();
    },

    getCurrency:function(){
        return this._currency;
    },

    setCurrency:function(){
        //map to chat
        if(pslb.Currency)
        {
            var label = this._map_char[pslb.Currency];
            cc.LabelAtlas.prototype.setString.call(this, label);
        }
    }
});




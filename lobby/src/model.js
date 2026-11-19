var pslb = pslb || {};


pslb.webSocketWrapper = function(_websocket){
    var socket = _websocket;
    var timeout = 5000;
    var reply_catchers = [];
    var send_buffer = [];
    var onopen = null;
    var onclose = null;
    var onmessage = null;


    function resolveSendBuffer(){
        for(var i = 0; i < send_buffer.length; i++){
            socket.send(send_buffer[i].msg);
            send_buffer[i].resolve();
        }
        send_buffer.length = 0;
    }

    function rejectSendBuffer(){
        for(var i = 0; i < send_buffer.length; i++){
            send_buffer[i].reject();
        }
        send_buffer.length = 0;
    }

    function catchReply(msg){
        for(var i = 0; i < reply_catchers.length; i++){
            if(reply_catchers[i].reply_catcher(msg)){
                reply_catchers[i].resolve(msg);
                reply_catchers.splice(i, 1);
                break;
            }
        }
    }

    socket.onopen = function(arg){
        resolveSendBuffer();
        typeof onopen === 'function' && onopen(arg);
    }

    socket.onclose = function(arg){
        rejectSendBuffer();
        typeof onclose === 'function' && onclose(arg);
    }

    socket.onmessage = function(arg){
        catchReply(arg);
        typeof onmessage === 'function' && onmessage(arg);
    }

    function send(msg){
        return new pslb.Promise(function(resolve, reject){
            if(socket.readyState == WebSocket.CONNECTING) {
                send_buffer.push({
                    msg: msg,
                    resolve: resolve,
                    reject: reject
                });
            }
            else if(socket.readyState == WebSocket.OPEN){
                socket.send(msg);
                resolve();
            }
            else
                reject();
        });
    }

    this.__defineGetter__("onopen", function(){return onopen})
    this.__defineSetter__("onopen", function(fn){onopen = fn})

    this.__defineGetter__("onclose", function(){return onclose})
    this.__defineSetter__("onclose", function(fn){onclose = fn})

    this.__defineGetter__("onmessage", function(){return onmessage})
    this.__defineSetter__("onmessage", function(fn){onmessage = fn})

    this.__defineGetter__("timeOut", function(){return timeout})
    this.__defineSetter__("timeOut", function(t){timeout = t})

    this.__defineGetter__("readyState", function(){return socket.readyState})

    this.send = function(msg, reply_catcher){
        return new pslb.Promise(function(resolve, reject){
            send(msg).then(
                //Successfully sent
                function(){
                    if(typeof reply_catcher === 'function'){
                        reply_catchers.push({
                            reply_catcher:reply_catcher,
                            resolve: resolve
                        });
                    }
                    else
                        resolve();
                },
                // Failed to send
                function(){reject(pslb.webSocketWrapper.SEND_FAIL)}
            );
            // Timeout
            setTimeout(function(){reject(pslb.webSocketWrapper.TIMEOUT);}, timeout);
        });
    };
}

pslb.webSocketWrapper.SEND_FAIL = 1;

pslb.webSocketWrapper.TIMEOUT = 2;

pslb.mailBox = {
    container : [],

    clearMail:function () {
        this.container=[];
    },

    pushMail : function(mail){
        if(!mail || !mail.id)
            throw "pslb.mailBox.pushMail(): mail must be non-null, and mail must implement id";
        this.container.push(mail);
    },

    getMailbyIndex: function(index){
        return this.container[index];
    },

    getMailbyId : function(id){
        var ret;
        for(var i = 0; i < this.container.length; i++)
            if(this.container[i].id == id){
                ret = this.container[i];
                break;
            }
        return ret;
    },
    setMail_read_byId:function (mail_id) {
        var ret =this.getMailbyId(mail_id);
        ret.is_read=true;
    },
    sortMail:function () {
        this.container = this.container.sort(function (a, b) {
            return a.date < b.date ? 1 : -1;
        });

        this.container = this.container.sort(function (a, b) {
            var r = 0;
            if(a.is_read == !b.is_read)
                r = a.is_read ? 1 : -1;
            return r;
        });
    }

};

pslb.mail = {
    id :null,
    date :null,
    title :null,
    content :null,
    is_read :false,
    type:0,

    setWithProto : function(proto){

        pslb.mailBox.clearMail();

        proto.forEach(function (e) {
            var ret= {
                id: pslb.toNumber(e.id.low, e.id.high, e.id.unsigned),
                date : e.date,
                title : e.title,
                content : e.content,
                is_read : e.is_read,
                type:e.type
            };

            pslb.mailBox.pushMail(ret);
        });
        pslb.mailBox.sortMail();
    },
    updateData:function (proto) {
        cc.log(new Date().getTime()+" mail updateData");
        proto.forEach(function (e) {
            var ret=pslb.mailBox.getMailbyId(e.id);
            if(ret)
            {
                cc.log("mail update, id= "+e.id);
                cc.log(ret);
                // ret.id=pslb.toNumber(e.id.low, e.id.high, e.id.unsigned);
                ret.date= e.date;
                ret.title =e.title;
                ret.content = e.content;
                ret.is_read = e.is_read;
                ret.type=e.type;
            }
            else
            {
                cc.log("ret is undefind, push new mail ,id = "+pslb.toNumber(e.id.low, e.id.high, e.id.unsigned));
                ret= {
                    id: pslb.toNumber(e.id.low, e.id.high, e.id.unsigned),
                    date : e.date,
                    title : e.title,
                    content : e.content,
                    is_read : e.is_read,
                    type:e.type
                };

                pslb.mailBox.pushMail(ret);
            }
        });
        pslb.mailBox.sortMail();
    }
};

/*

pslb.mail = function(proto){
    this.id = "";
    this.date = "";
    this.title = "";
    this.content = "";
    this.is_read = false;

    this.setWithProto = function(proto){
        proto && function(){
            this.id = pslb.toNumber(proto.id.low, proto.id.high, proto.id.unsigned);
            this.date = proto.date;
            this.title = proto.title;
            this.content = proto.content;
            this.is_read = proto.is_read;
        }.call(this);
    }
    this.setWithProto(proto);
}

*/

/*pslb.mailBox = function(){
    var container = [];

    this.pushMail = function(mail){
        if(!mail || !mail.id)
            throw "pslb.mailBox.pushMail(): mail must be non-null, and mail must implement id";
        container.push(mail);
    }

    this.getMailbyIndex = function(index){
        return mail[index];
    }

    this.getMailbyId = function(id){
        var ret;
        for(var i = 0; i < container.length; i++)
            if(container[i].id == id){
                ret = container[i]
                break
            }
        return ret;
    }

};*/


pslb.MEMBERINFO_CENT=0;

pslb.gameInfo = function(id, label, is_lock,disable,order,strip,type,subId,commission_type){
    var gameNumber = id.split("-");
    if (gameNumber[0] == "PSS"){
        gameNumber[2] = gameNumber[2].substr(1);
        gameNumber = parseInt(gameNumber[2]);
    }
    else{
        gameNumber = 99999;
    }
    return {
        gameId: id,
        strip:strip ,
        label: label,
        is_lock: is_lock,
        order:order,
        disable:disable,
        type:type,
        subId:subId,
        commission_type:commission_type,
        gameNumber: gameNumber
    }
};

pslb.gmaeGroup = function(){
    this.all = [];
    this.favorite = [];
    this.ps_award = [];
    this.today_special = [];
    this.asia = [];
    this.challenge = [];
    this.hot = [];
    this.new = [];
    this.vip_only=[];
    this.slot = [];
    this.card = [];
    this.fish = [];
    this.arcade = [];
    this.favorite_pick = [];
};

pslb.updateFlag=false;
pslb.JPupdateFlag=false;
pslb.hastoResetWheel=true;
pslb.setBetNumber=false;
pslb.memberInfo = {
    id:"",
    level: null,
    medal_group:[],
    cent : 0,
    ps_coin : 0,
    gameGroup: new pslb.gmaeGroup(),
    psaward_deadline:0,
    spin_times:0,
    week_medal_group:[],
    week_ps_coin:0,
    httpRequest:new XMLHttpRequest(),

    setWithProto: function(proto){
        if(proto==undefined) return;
        this.id = proto.id;
        this.level =proto.level;
        this.medal_group = proto.medal_group;
        this.cent = pslb.toNumber(proto.cent.low, proto.cent.high, proto.cent.unsigned);
        pslb.MEMBERINFO_CENT=this.cent;
        this.ps_coin = proto.ps_coin;
        this.spin_times=proto.spin_times;
        this.setgameGroup(proto.game_info_group);

        // var dat = new Date();
        // dat.setUTCSeconds(proto.psaward_deadline);
        this.psaward_deadline=pslb.toNumber(
            proto.psaward_deadline.low,
            proto.psaward_deadline.high,
            proto.psaward_deadline.unsigned);

        this.week_medal_group= proto.week_medal_group;
        this.week_ps_coin = proto.week_ps_coin ;

        cc.log(new Date().getTime()+" memberInfo setWithProto ");
        cc.log("proto.id="+proto.id);
        cc.log("proto.level.code="+proto.level.code);
        cc.log("proto.level.percentage="+proto.level.percentage);
        cc.log("proto.cent="+proto.cent);
        cc.log("proto.ps_coin="+proto.ps_coin);
        cc.log("proto.spin_times="+proto.spin_times);
        cc.log("proto.psaward_deadline="+proto.psaward_deadline);
        cc.log("proto.week_medal_group="+proto.week_medal_group);
        cc.log("proto.week_ps_coin="+proto.week_ps_coin);

    },
    setgameGroup:function (group) {
        var self=this;
        var all=[];
        var favorite=[];
        var ps_award=[];
        var today_special=[];
        var today_special_strip=[];
        var asia=[];
        var challenge=[];
        var hot=[];
        var newgame=[];
        var viponly=[];
        var slot=[];
        var card=[];
        var fish=[];
        var arcade=[];
        var event = [];
        var Label=pslb.proto.GameInfo.Label;
        var Class=pslb.proto.GameInfo.Class;
        group.forEach(function (e) {

            // pslb.gameItem.normal = 0;
            // pslb.gameItem.new = 1;
            // pslb.gameItem.hot = 2;
            // pslb.gameItem.challenge = 3;

            if (!self._checkResource(e, self)) return;

            //2019 02 22 add filter APP Game ID
            //=========================================
            if(e.type.indexOf("APP") !== -1) return;
            //=========================================

            var lock=false;
            if(e.class & Class.kVipOnly)
            {
                if(self.level.code <= pslb.proto.Level.Code.kSilver )
                    lock=false;
                viponly.push(e);
            }

            if(self.level.code< e.required_level)
                lock=false;


            var disable=e.disable;

            var label=pslb.gameItem.normal;
            // 3
            if(e.label & Label.kChallenge)
            {
                label=pslb.gameItem.challenge;
                challenge.push(new pslb.gameInfo(e.id,pslb.gameItem.challenge,lock,disable,e.order));
            }
            // 2
            if(e.label & Label.kNew)
            {
                label=pslb.gameItem.new;
                newgame.push(new pslb.gameInfo(e.id,pslb.gameItem.new,lock,disable,e.order));
            }
            // 1
            if(e.label & Label.kHot)
            {
                label=pslb.gameItem.hot;
                hot.push(new pslb.gameInfo(e.id,pslb.gameItem.hot,lock,disable,e.order));
            }
            //0
            if(e.label & Label.kAsia)
            {
                label=pslb.gameItem.jackpot;
                asia.push(new pslb.gameInfo(e.id,pslb.gameItem.jackpot,lock,disable,e.order));
            }

            if(e.class & Class.kTodaySpecial)
                if(e.class & Class.kHighlight)
                    today_special_strip.push(new pslb.gameInfo(e.id,label,lock,disable));
                else
                    today_special.push(new pslb.gameInfo(e.id,label,lock,disable,e.order));

            if(e.class & Class.kFavorite){
                favorite.push(new pslb.gameInfo(e.id,label,lock,disable,e.favorite_order));
                cc.log("id="+e.id+"  order="+e.favorite_order);
            }

            if(e.class & Class.kPsReward)
                ps_award.push(new pslb.gameInfo(e.id,label,lock,disable,e.order));

            if(e.type == "SLOT")
                slot.push(new pslb.gameInfo(e.id,label,lock,disable));
            else if(e.type == "CARD")
                card.push(new pslb.gameInfo(e.id,label,lock,disable,null,null,e.type,e.subid,e.commission_type));
            else if(e.type == "FISH")
                fish.push(new pslb.gameInfo(e.id,label,lock,disable,null,null,e.type,e.subid,e.commission_type));
            else if(e.type == "ARCADE")
                arcade.push(new pslb.gameInfo(e.id,label,lock,disable,null,null,e.type,e.subid,e.commission_type));

            if (ps.PSEvents !== undefined && ps.PSEvents.length > 0){
                var Nowtime = new Date();
                var offset  = Nowtime.getTimezoneOffset(); // => 格林尼治时间與本地时间差(單位 分鐘)
                var UTCtime = Nowtime.getTime() + offset*60*1000;
                var Offtime = new Date(time_array[3]).getTime();
                if (game_id.indexOf(e.id) >= 0 && UTCtime < new Date(Offtime).getTime()) {
                    e.order = 99999;
                    label = pslb.gameItem.goldenTicket;
                }
            }

            all.push(new pslb.gameInfo(e.id,label,lock,disable,e.order,null,e.type,e.subid,e.commission_type));
        });

        event = challenge.concat(ps_award);

        all.sort(function (a, b) {
            return a.gameNumber > b.gameNumber ? -1 : 1;
        });
        all.sort(function (a, b) {
            return a.order > b.order ? -1 : 1;
        });

        this.gameGroup.all = all;

        var getFavoriteItem = [];

        if (localStorage.length !== 0){
            var getFavoriteItem = localStorage.getItem('myFavorite');

            if (getFavoriteItem !== "" && getFavoriteItem !== null){
                getFavoriteItem = JSON.parse(getFavoriteItem);

                var allGameIdArray = [];

                for (var j = 0; j < all.length; j++ ) {
                    allGameIdArray.push(all[j].gameId)
                }

                for (var i = 0 ; i < getFavoriteItem.length; i++){ //set remove game
                    if ( allGameIdArray.indexOf(getFavoriteItem[i].gameId) === -1) {
                        getFavoriteItem.splice(i, 1);
                    }
                }

                for (var i = 0; i < getFavoriteItem.length; i++){  //set disable
                    for (var j = 0; j < all.length; j++ ) {
                        if(getFavoriteItem[i].gameId === all[j].gameId){
                            getFavoriteItem[i].disable = all[j].disable;
                        }
                    }
                }

                getFavoriteItem.sort(function (a, b) {
                    return a.gameNumber > b.gameNumber ? -1 : 1;
                });

                getFavoriteItem = getFavoriteItem.sort(function (a, b) {
                    return a.order > b.order ? 1 : -1;
                });

            } else {
                getFavoriteItem = [];
            }
        }

        this.gameGroup.favorite_pick = getFavoriteItem;

        console.log(this.gameGroup);

        favorite = favorite.sort(function (a, b) {
            return a.order > b.order ? 1 : -1;
        });
        this.gameGroup.favorite = favorite;

        ps_award.sort(function (a, b) {
            return a.gameNumber > b.gameNumber ? -1 : 1;
        });
        ps_award.sort(function(a,b){
            return a.order > b.order ? -1 : 1;
        });
        this.gameGroup.ps_award = ps_award;

        today_special.sort(function (a, b) {
            return a.gameNumber > b.gameNumber ? -1 : 1;
        });
        today_special.sort(function (a, b) {
            return a.order > b.order ? -1 : 1;
        });
        if(today_special_strip.length>0)
        {
            today_special_strip.forEach(function (e) {
                e.strip=true;
                today_special.unshift(e);
            });
        }
        // else
        //     today_special[today_special.length-1].strip=true;
        this.gameGroup.today_special =today_special;

        asia.sort(function (a, b) {
            return a.gameNumber > b.gameNumber ? -1 : 1;
        });
        asia.sort(function(a,b){
            return a.order > b.order ? -1 : 1;
        });
        this.gameGroup.asia = asia;

        challenge.sort(function (a, b) {
            return a.gameNumber > b.gameNumber ? -1 : 1;
        });
        challenge.sort(function(a,b){
            return a.order > b.order ? -1 : 1;
        });
        this.gameGroup.challenge = challenge;

        hot.sort(function (a, b) {
            return a.gameNumber > b.gameNumber ? -1 : 1;
        });
        hot.sort(function(a,b){
            return a.order > b.order ? -1 : 1;
        });
        this.gameGroup.hot = hot;

        newgame.sort(function (a, b) {
            return a.gameNumber > b.gameNumber ? -1 : 1;
        });
        newgame.sort(function(a,b){
            return a.order > b.order ? -1 : 1;
        });
        this.gameGroup.new = newgame;
        this.gameGroup.vip_only = viponly.reverse();
        this.gameGroup.slot = slot.reverse();
        this.gameGroup.card = card.reverse();
        this.gameGroup.fish = fish.reverse();
        this.gameGroup.arcade = arcade.reverse();

        this.gameGroup.eventgame = event.reverse();

        pslb.Group = [
            this.gameGroup.all,
            this.gameGroup.favorite_pick,
            this.gameGroup.hot,
            this.gameGroup.slot,
            this.gameGroup.asia,
            this.gameGroup.arcade,
            this.gameGroup.card,
            this.gameGroup.fish
        ];

        for (var i = 0 ; i < pslb.Group.length; i++){

            var num99 = 0;

            pslb.gameWall.Group.forEach(function(e){
                if (e === 99){
                    num99++;
                }
            });

            if (pslb.Group[i].length !== 0 || i === pslb.gameWall.Favorite){
                if (i == 0){
                    pslb.gameWall.TodaySpecial = i - num99;
                }
                if (i == 1){
                    pslb.gameWall.Favorite = i - num99;
                }
                if (i == 2){
                    pslb.gameWall.HotGame = i - num99;
                }
                if (i == 3){
                    pslb.gameWall.Slot = i - num99;
                }
                if (i == 4){
                    pslb.gameWall.AsiaGame =  i - num99;
                }
                if (i == 5){
                    pslb.gameWall.Arcade = i - num99;
                }
                if (i == 6){
                    pslb.gameWall.Card = i - num99;
                }
                if (i == 7){
                    pslb.gameWall.Fish = i - num99;
                }

                pslb.gameWall.Group[i] = i - num99;
            } else {
                if (i == 0){
                    pslb.gameWall.TodaySpecial = 99;
                }
                if (i == 1){
                    pslb.gameWall.Favorite = 99;
                }
                if (i == 2){
                    pslb.gameWall.HotGame = 99;
                }
                if (i == 3){
                    pslb.gameWall.Slot = 99;
                }
                if (i == 4){
                    pslb.gameWall.AsiaGame = 99;
                }
                if (i == 5){
                    pslb.gameWall.Arcade = 99;
                }
                if (i == 6){
                    pslb.gameWall.Card = 99;
                }
                if (i == 7){
                    pslb.gameWall.Fish = 99;
                }

                pslb.gameWall.Group[i] = 99;
            }
        }

    },
    updateData:function (proto) {
        if (proto == undefined) return;

        cc.log(new Date().getTime() + " memberInfo updateData");
        this.id = proto.id;
        this.isLevelUp(proto.level.code);
        this.level = proto.level;
        this.medal_group = proto.medal_group;
        // this.cent = pslb.toNumber(proto.cent.low, proto.cent.high, proto.cent.unsigned);     //not update cent
        this.ps_coin = proto.ps_coin;
        this.spin_times = proto.spin_times;

        this.psaward_deadline = pslb.toNumber(
            proto.psaward_deadline.low,
            proto.psaward_deadline.high,
            proto.psaward_deadline.unsigned);

        cc.log("proto.id=" + proto.id);
        cc.log("proto.level.code=" + proto.level.code);
        cc.log("proto.level.percentage=" + proto.level.percentage);
        // cc.log("proto.cent="+proto.cent);
        cc.log("proto.ps_coin=" + proto.ps_coin);
        cc.log("proto.spin_times=" + proto.spin_times);
        cc.log("proto.psaward_deadline=" + proto.psaward_deadline);

        proto.medal_group.forEach(function (e) {
            cc.log(e.code + "=" + e.count);
        });
        pslb.setBetNumber=true;

        if (proto.week_medal_group.length > 0) {
            this.week_medal_group = proto.week_medal_group;
            this.week_ps_coin = proto.week_ps_coin;

            cc.log("------memberInfo week_medal_group updateData------");
            proto.week_medal_group.forEach(function (e) {
                cc.log("week  " + e.code + "=" + e.count);
            });
            cc.log("week  ps coin=" + proto.week_ps_coin);

            pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                {
                    id: pslb.PageId.ps_reward_week,
                    enabled: true
                });

        }
        else
        {
            this.week_medal_group = [];
            this.week_ps_coin = 0;
            cc.log("week  ps coin=" + proto.week_ps_coin);
        }

    },
    isLevelUp:function (lv_code) {

        if(lv_code) {
            cc.log("LEVEL UP lv_code=" + lv_code);
            if (this.level && this.level.code < lv_code) {
                pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                    {
                        id: pslb.PageId.levelup,
                        enabled: true
                    });
            }
        }
    },
    bigChallengeUpdate:function (proto,cent_deducted) {
        if(proto==undefined) return;

        var bet=pslb.bigChallengeBet;
        cc.log("pslb.bigChallengeBet="+pslb.bigChallengeBet);
        var ps_coin=this.ps_coin;
        cc.log("pslb.ps_coin="+this.ps_coin);

        if(ps_coin<=0)
        {
            pslb.hastoResetWheel=false;  //ps coin is already not enough, so not has to reset wheel and bet.
        }

        else
            pslb.hastoResetWheel=true;   //ps coin not enough first-time

        if(cent_deducted){
            if (ps_coin<bet)
            {
                var pay=(bet)*pslb.systemInfo.ps_coin_value;
                pslb.MEMBERINFO_CENT=pslb.MEMBERINFO_CENT-pay;
            }
        }

        //Update Data
        this.ps_coin = proto.ps_coin;
        this.cent = pslb.toNumber(proto.cent.low, proto.cent.high, proto.cent.unsigned);
        this.spin_times=proto.spin_times;

        pslb.setBetNumber=true;

        cc.log(new Date().getTime()+" bigChallengeUpdate ");
        cc.log("proto.cent="+this.cent);
        cc.log("proto.ps_coin="+proto.ps_coin);
        cc.log("proto.spin_times="+proto.spin_times);
    },

    _checkResource : function (game, self) {
        var url;
        if(game.id === "PSB-ON-00001") {
            url = pslb.gameItem.normalConfig.url + game.id.toLowerCase() + "-"+ game.subid +".png";
        } else {
            url = pslb.gameItem.normalConfig.url + game.id.toLowerCase() + ".png";
        }
        self.httpRequest.open('HEAD', url, false);
        self.httpRequest.send();
        return self.httpRequest.status !== 404
    }
};

pslb.systemInfo = {
    ps_coin_mult: 1,
    ps_coin_base_value: 3000,
    ps_coin_value: 3000,
    wheel_group: [],
    _accounting_unit: 1,
    ps_degrade_check_bet: 500,
    setWithProto: function(proto){
        this.ps_coin_value=proto.ps_coin_value;
        this.ps_coin_mult = this.ps_coin_value / this.ps_coin_base_value;
        this._accounting_unit = proto.accounting_unit;
        this.ps_degrade_check_bet =
            pslb.toNumber(proto.degrade_check_bet.low, proto.degrade_check_bet.high, proto.degrade_check_bet.unsigned);
        this.setWheelGroup(proto.wheel_group);
    },
    setWheelGroup:function (proto) {
        var group=[];
        proto.forEach(function (e) {
            var highestPay=0;
            e.internal.forEach(function (ei) {
                if(ei.type==3)
                    ei.random_pay.forEach(function (ej) {
                        var pay=pslb.toNumber(ej.low,ej.high,ej.unsigned) || 0;
                        if(pay>highestPay)
                            highestPay=pay;
                    });
            });

            group.push({
                external:e.external,
                internal:e.internal,
                level_code:e.level_code,
                ps_coin:e.ps_coin,
                highestPay:highestPay
            });
        });

        this.wheel_group=group;
    }
};

pslb.bannerInfo = {
    container:[],
    setWithProto: function(proto){
        var self=this;
        self.container=[];
        proto.forEach(function (e) {
            var ret={
                type: e.type,
                member_id:e.member_id,
                bet: e.bet,
                win: (e.win)? pslb.toNumber(e.win.low, e.win.high, e.win.unsigned) : null,
                game_name:(e.game_name)?e.game_name[pslb.Language] : null,
                jp_win: (e.jp_win)?pslb.toNumber(e.jp_win.low, e.jp_win.high, e.jp_win.unsigned):null,
                image_name:e.image_name,
                url: e.url
            };

            self.container.push(ret);
        });

    }
};

pslb.bigChallengeResult={
    container:[],
    setWithProto:function (proto) {
        var self=this;
        self.container=[];
        proto.forEach(function (e) {
            var ret={
                type:e.type,
                id:e.id,
                pay:e.pay,//pslb.toNumber(e.pay.low, e.pay.high, e.pay.unsigned),
                trigger_game:e.trigger_game
            };
            self.container.push(ret);
        });
    }
};


var TestOverFlow = function(num){
    if(num>=1000000000000)
    {
        return false;
    }
    return true;
};

pslb.jackpotResult={
    jackpotList:[],
    isJackpotShow:false,
    isLoaded:false,
    setWithProto:function (proto) {
        var self=this;
        self.jackpotList=[];
        self.isJackpotShow=false;

        proto.pool_list && proto.pool_list.forEach(function (e) {
            var current_cent=0;
            var cent=pslb.toNumber(e.current_cent.low, e.current_cent.high, e.current_cent.unsigned);

            if(TestOverFlow(cent)==true){
                current_cent =cent;
            }


            // var testdata=[250000,800000,4000000,50000000];
            //
            // if(self.isLoaded)
            //     self.updateJackpot(e,current_cent);
            // else
            //     self.createJackpot(e,current_cent);
            var ret={
                id:e.id,
                current_cent:current_cent,
                enable:e.enable
            };
            self.jackpotList.push(ret);


            if(e.enable)
                self.isJackpotShow=true;
        });
        self.isLoaded=true;
    },
    createJackpot:function (e,current_cent) {
        var self=this;
        var ret={
            id:e.id,
            current_cent:current_cent,
            enable:e.enable
        };
        self.jackpotList.push(ret);
        self.isJackpotUpdate=true;
    },
    updateJackpot:function (e,current_cent) {
        var self=this;
        self.jackpotList.forEach(function (element) {
            if(element.id==e.id){
                if(element.current_cent!==current_cent)
                {
                    element.current_cent=current_cent;
                    self.isJackpotUpdate=true;
                }
            }
        })
    }

};



pslb.model = new (function(){
    var proto = pslb.proto;
    var websocket;
    var token;
    var handlers = [];

    /*TO DO
    *   set handlers
    *   ex:
    *       message id of updateCall is 10
    *       handlers[10] = ProcUpdateCall();
    * */
    handlers[proto.MessageId.kUpdateData] = function(msg){
        var data = pslb.proto.UpdateData.decode(msg.data);
        // Todo
        cc.log(new Date().getTime()+" proto.MessageId.kUpdateData ");
        pslb.memberInfo.updateData(data.member_info);
        pslb.mail.updateData(data.mail_box);
        pslb.bannerInfo.setWithProto(data.banner_info);
        pslb.updateFlag=true;

        cc.log("---------------------------------------");
    };

    handlers[proto.MessageId.kJackpotInfo] = function(msg){
        var data = pslb.proto.JackpotInfo.decode(msg.data);
        // Todo
        pslb.jackpotResult.setWithProto(data);
        pslb.JPupdateFlag=true;
    };


    function msgCatcher(msg_id){
        return function(msg){
            var header = proto.Header.decode(msg.data);
            return  header && header.msg_id == msg_id;
        }
    }

    this.bindWebsocket = function(_websocket){
        _websocket.onopen = _websocket.onclose = _websocket.onmessage = _websocket.onerror = null;
        websocket = new pslb.webSocketWrapper(_websocket);
        websocket.onclose = function(){
            pslb.dispatchCustomEvent(
                pslb.CustomEvent.Error,
                pslb.ErrorCode.Disconnect);
        };

        websocket.onmessage = function(msg){
            var header = proto.Header.decode(msg.data);
            if(header && handlers[header.msg_id])
                handlers[header.msg_id](msg);
        };
    };

    this.login = function(id_or_token, password){
        if(!websocket)
            return new pslb.Promise(function(resolve, reject){reject();});
        else if(token)
            return new pslb.Promise(function(resolve, reject){resolve();});
        else
            return new pslb.Promise(function(resolve, reject){
                var call = new proto.LoginCall();
                if(id_or_token && password){
                    call.member_id = id_or_token;
                    call.password = password;
                }else if(id_or_token)
                    call.token = id_or_token;

                websocket.send(call.toArrayBuffer(), msgCatcher(proto.MessageId.kLoginRecall))
                    .then(function(msg){
                        var recall = pslb.proto.LoginRecall.decode(msg.data);
                        if (recall.error_code == proto.ErrorCode.kSuccess){
                            token = recall.token;
                            console.log('----- recall -----');
                            console.log(recall);
                            console.log('----- recall -----');
                            pslb.memberInfo.setWithProto(recall.member_info);
                            pslb.systemInfo.setWithProto(recall.system_info);
                            pslb.mail.setWithProto(recall.mail_box);
                            pslb.bannerInfo.setWithProto(recall.banner_info);
                            pslb.bigChallengeResult.setWithProto(recall.last_result);
                            resolve();
                        }
                        else
                            reject();
                    },function(error){
                        if(error == pslb.webSocketWrapper.TIMEOUT)
                            pslb.dispatchCustomEvent(
                                pslb.CustomEvent.Error,
                                pslb.ErrorCode.TimeOut);
                        reject();
                    })
            })
    };

    function enoughPsCoin(psCoinCount){
        return pslb.memberInfo.ps_coin >= psCoinCount;
    }

    function enoughCent(cent){
        return pslb.memberInfo.cent >= cent;
    }

    /*For Big Challenge Test */
    /* this.playBC = function(ps_coin){
         return new pslb.Promise(function(resolve, reject){
             if(!token)
                 reject();
             else {
                 var pay_ps_coin = enoughPsCoin(ps_coin)? ps_coin: pslb.memberInfo.ps_coin;
                 var pay_cent = (ps_coin - pay_ps_coin) * pslb.systemInfo.ps_coin_value;
                 if(enoughCent(pay_cent) == true){
                     pslb.memberInfo.ps_coin -= pay_ps_coin;
                     pslb.memberInfo.cent -= pay_cent;
                     var results = createBcResult(pslb.memberInfo.level.code, ps_coin);
                     results.forEach(function(r){
                         if(r.pay)
                             pslb.memberInfo.cent += r.pay;
                     })
                     resolve(results);
                 }else{
                     reject("insufficient account balance");
                 }
             }
         })
     }*/


    this.playBC = function(ps_coin){
        return new pslb.Promise(function(resolve, reject){
            if(!token)
                reject();
            else {
                var call = new proto.BigChallengeCall();
                call.token = token;
                call.ps_coin = ps_coin;
                call.level_code = pslb.memberInfo.level.code;

                websocket.send(call.toArrayBuffer(), msgCatcher(proto.MessageId.kBigChallengeRecall))
                    .then(function(msg){
                        var recall = pslb.proto.BigChallengeRecall.decode(msg.data);
                        if (recall.error_code == proto.ErrorCode.kSuccess){
                            pslb.memberInfo.bigChallengeUpdate(recall.member_info,recall.cent_deducted);
                            var results=recall.result;
                            resolve(results);
                        }
                        else
                            reject(recall.error_code);
                    },function(error){
                        if(error == pslb.webSocketWrapper.TIMEOUT)
                            pslb.dispatchCustomEvent(
                                pslb.CustomEvent.Error,
                                pslb.ErrorCode.TimeOut);
                        reject();
                    })
            }
        })
    };

    this.mail = function(mail_id){
        return new pslb.Promise(function(resolve, reject){
            if(!token)
                reject();
            else {
                var call = new proto.MailCall();
                call.token = token;
                call.mail_id =mail_id;

                websocket.send(call.toArrayBuffer(), msgCatcher(proto.MessageId.kMailRecall))
                    .then(function(msg){
                        var recall = pslb.proto.MailRecall.decode(msg.data);
                        if (recall.error_code == proto.ErrorCode.kSuccess){
                            var mail_id=pslb.toNumber(recall.mail_id.low, recall.mail_id.high, recall.mail_id.unsigned);
                            pslb.mailBox.setMail_read_byId(mail_id);
                            resolve(mail_id);
                        }
                        else
                            reject(recall.error_code);
                    },function(error){
                        if(error == pslb.webSocketWrapper.TIMEOUT)
                            pslb.dispatchCustomEvent(
                                pslb.CustomEvent.Error,
                                pslb.ErrorCode.TimeOut);
                        reject();
                    })
            }
        })
    }

})();







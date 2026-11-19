var pslb = pslb || {};


pslb.help = cc.Node.extend({
    _close_btn:null,
    _page:null,
    _numMaxWidth:84,
    ctor:function(){
        this._super();
        this.setName("Help");

        var black=new cc.Sprite(res.bg_dark);
        black.setAnchorPoint(0,0);
        black.setPosition(0,0);
        this.addChild(black);

        var bg=new cc.Sprite(res.help_bg);
        bg.setAnchorPoint(0,0);
        bg.setPosition(78,137);
        this.addChild(bg);

        var mb_level=pslb.memberInfo.level.code>3? 3 :pslb.memberInfo.level.code;
        var member_bg_posX=[284,508,732,956];
        this.member_bg=[];
        for(var i =1;i<=4;i++)
        {
            var mb=new cc.Sprite(res["help_bg_0"+i]);
            mb.setAnchorPoint(0,0);
            mb.setPosition(member_bg_posX[i-1],166);
            this.addChild(mb);
            this.member_bg.push(mb);
            mb.setVisible(mb_level==(i-1)?true:false);
        }

        this._page = new cc.Sprite(res.help_txt);
        this._page.setAnchorPoint(0,0);
        this._page.setPosition(78,0);
        this.addChild(this._page);

        var numPos = cc.p(728, 69);
        switch (pslb.Language) {
            case 'sch':
            case 'tch':
                numPos.x = 621; numPos.y = 42;
                break;
            default:
                numPos.x = 728; numPos.y = 69;
                break;
        }
        var number = new pslb.NumberAtlas('0', res.help_info_number_png, 6, 22);
        number.NumberFormat = pslb.DollarFormat;
        number.setAnchorPoint(0.5, 0.5);
        number.setPosition(numPos);
        if(pslb.systemInfo._accounting_unit > 0 &&
        pslb.systemInfo.ps_degrade_check_bet > 0) {
            var showNum =
                pslb.systemInfo.ps_degrade_check_bet / pslb.systemInfo._accounting_unit;
            number.setNumber(showNum);
        }
        adjustObjSize(number, this._numMaxWidth);
        this._page.addChild(number);

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
        ////Close Button
        this.removeChild(this._close_btn);
        this._close_btn = new ccui.Button(res.bgw_help_close_up,res.bgw_help_close_down,res.bgw_help_close_down);
        this._close_btn.setPosition(1224,570);
        this._close_btn.setTouchEnabled(true);
        this._close_btn.addTouchEventListener(function(touch, type){
            if(type == ccui.Widget.TOUCH_ENDED)
            {
                pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                    {
                        id:pslb.PageId.help,
                        enabled: false
                    });
            }
        },this);
        this.addChild(this._close_btn);
    }
});


/*PS BIG CHALLENGE HELP*/
pslb.UIHelp = cc.Layer.extend({
    _click_effect:null,
    _page_index:0,
    _page_res:null,
    _page:null,
    _page_2:null,
    _menu:null,

    _next_btn:null,
    _prev_btn:null,
    _record_btn:null,
    _close_btn:null,

    _open_record_cb:undefined,
    _close_help_cb:undefined,

    _pay_label_node:null,

    ctor:function() {
        var self = this;
        self._super();
        self.setName("UIHelp");

        self._pay_label_node = [];

        self._click_effect = res.button_sound;

        this._info_bg = new cc.Sprite(res.info_bg_png);
        this._info_bg.setPosition(640,339);
        this.addChild(this._info_bg);

        this._notice = new cc.Sprite(res.notice);
        this._notice.setPosition(605,29);
        this._info_bg.addChild(this._notice);

        self._page_res = [];
        for(var i = 0, count = 5; i < count; i++){
            var page_res = res['ui_help_page_' + i];
            if(page_res)
                self._page_res.push(page_res);
            else
                break;
        }

        if(self._page_res.length % 2 != 0)
            self._page_length = Math.floor(self._page_res.length/2) + 1;
        else
            self._page_length = self._page_res.length/2;

        self._next_btn = new cc.MenuItemImage(
            res.ui_help_next_up_png,
            res.ui_help_next_down_png,
            res.ui_help_next_down_png,
            function() {
                self.playClickEffect();
                self.nextPage();
            },
            self);
        self._next_btn.setPosition(1166, 232);

        self._prev_btn =new cc.MenuItemImage(
            res.ui_help_prev_up_png,
            res.ui_help_prev_down_png,
            res.ui_help_prev_down_png,
            function(){
                self.playClickEffect();
                self.prevPage();
            },
            self);
        self._prev_btn.setPosition(44, 232);

        self._close_btn =new cc.MenuItemImage(
            res.bgw_help_close_up,
            res.bgw_help_close_down,
            res.bgw_help_close_down,
            function(){
                self.playClickEffect();
                pslb.isWheelTurning=false;
                pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                    {
                        id:pslb.PageId.bgwhelp,
                        enabled: false
                    });
            },
            self);
        self._close_btn.setPosition(1171, 472);

        self._record_btn = new cc.MenuItemImage(
            res.ui_history_up_png,
            res.ui_history_down_png,
            res.ui_history_down_png,
            function(){
                self.openRecord();
            }, self);
        self._record_btn.setPosition(39, 472);

        // self._menu= new cc.Menu(self._close_btn);
        self._menu= new cc.Menu(self._next_btn,self._prev_btn,self._close_btn,self._record_btn);
        self._menu.setPosition(0,0);
        self._info_bg.addChild(self._menu,1);

        self._page = new cc.Sprite();
        self._page.setAnchorPoint(0.5,0.5);
        self._page.setPosition(335, 245);
        self._info_bg.addChild(self._page, 0);

        self._page_2 = new cc.Sprite();
        self._page_2.setAnchorPoint(0.5,0.5);
        self._page_2.setPosition(875, 245);
        self._info_bg.addChild(self._page_2, 0);

        this._page_0_number = new pslb.bigChallengeHelp_PAGE_0_NUMBER();
        this._page.addChild(this._page_0_number);

        this._bonusbet = new pslb.bigChallengeHelp_BonusBet();
        this._page_2.addChild(this._bonusbet);

        this.setPayLabelVisible(false);

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
    setPayLabelVisible:function(bool){
        this._bonusbet.setVisible(bool);
        this._page_0_number.setVisible(!bool);
    },
    nextPage:function(){
        var page = (this._page_index + 1) % this._page_length;
        this.changePage(page);
        if(page === 1)
            this.setPayLabelVisible(true);
        else
            this.setPayLabelVisible(false);
    },

    prevPage:function(){
        var page = (this._page_index - 1 + (this._page_length)) % this._page_length;
        this.changePage(page);
        if(page === 1)
            this.setPayLabelVisible(true);
        else
            this.setPayLabelVisible(false);
    },

    changePage:function(page){
        if(this._page_res.length && page >=0 && page <= this._page_length ){
            var page_idx = page*2;

            if(this._pay_label_node[this._page_index*2])
                this._pay_label_node[this._page_index*2].setVisible(false);
            if(this._pay_label_node[this._page_index*2+1])
                this._pay_label_node[this._page_index*2+1].setVisible(false);

            if(this._pay_label_node[page_idx])
                this._pay_label_node[page_idx].setVisible(true);
            if(this._pay_label_node[page_idx + 1])
                this._pay_label_node[page_idx + 1].setVisible(true);


            this._page_index = page;
            this._page.setTexture(this._page_res[page_idx]);
            if(this._page_res[page_idx + 1]){
                this._page_2.setVisible(true);
                this._page_2.setTexture(this._page_res[page_idx+1]);
            }
            else
                this._page_2.setVisible(false);

        }
    },

    openRecord:function(){
        pslb.OPEN_RECORD = true;
        if (u.indexOf('Android') == -1){
            this.playClickEffect();
        }
        if(typeof openRecord == 'function')
            openRecord();
    },

    playClickEffect:function(){
        if(this._click_effect){
            try {
                cc.audioEngine.playEffect(this._click_effect);
            }
            catch(error){
                alert("play effect fail, check path of sound effect")
            }
        }
    },

    initPayLabel:function(config){
        // var node = new pslb.NumbersNode(ref_bet, data);
       // node.setVisible(false);
       //  this.addPaylabelNode(node, pageidx);
        var nodeindex = 255;

        for(var i=0; i<config.element.length; i++){
            if(nodeindex !== config.element[i].relative_res){
                var node = new pslb.NumbersNode(config.reference_bet, config.element, config.element[i].relative_res);
                node.setVisible(false);
                this.addPaylabelNode(node, config.element[i].relative_res-1);
                nodeindex = config.element[i].relative_res;
            }
        }

    },

    addPaylabelNode:function (node, pageidx) {
        if(this._pay_label_node[pageidx]) {
            this._pay_label_node[pageidx].removeAllChildren(true);
            this._pay_label_node[pageidx].removeFromParent(true);
            this._pay_label_node[pageidx] = null;
        }

        this._pay_label_node[pageidx] = node;
        // this._pay_label_node[pageidx].setVisible(false);

        if(pageidx % 2 === 0){
            this._page.addChild(this._pay_label_node[pageidx]);
        } else{
            this._page_2.addChild(this._pay_label_node[pageidx]);
        }

    },

    setPayLabelNum:function(bet){
        if(this._pay_label_node && this._pay_label_node.length > 0){
            for(var page in this._pay_label_node){
                this._pay_label_node[page].setPayLabelNum(bet);
            }
        }

        this._bonusbet.resetNum(pslb.bigChallengeBet);
    },

    setPayLabelNumByPageIdx:function(bet, pageIdx){
        if(this._pay_label_node && this._pay_label_node[pageIdx] !== null){
            this._pay_label_node[pageIdx].setPayLabelNum(bet);
        }
    },

    setOpenRecordCallback:function(callback){
        this._open_record_cb = callback;
    },

    setCloseCallback:function(callback){
        this._close_help_cb = callback;
    },

    setImagePage:function(page) {
        if (page instanceof Array)
            this._page_res = page.slice();
        else
            this._page_res = [];
        this.changePage(0);
    },

    setImageNext: function (normalImage, selectedImage) {
        this._next_btn.setNormalImage(new cc.Sprite(normalImage));
        if(selectedImage)
            this._next_btn.setSelectedImage(new cc.Sprite(selectedImage));
    },

    setImagePrev: function (normalImage, selectedImage) {
        this._prev_btn.setNormalImage(new cc.Sprite(normalImage));
        if(selectedImage)
            this._prev_btn.setSelectedImage(new cc.Sprite(selectedImage));
    },

    setImageClose: function (normalImage, selectedImage) {
        this._close_btn.setNormalImage(new cc.Sprite(normalImage));
        if(selectedImage)
            this._close_btn.setSelectedImage(new cc.Sprite(selectedImage));
    },

    // setImageRecord: function (normalImage, selectedImage) {
    //     this._record_btn.setNormalImage(new cc.Sprite(normalImage));
    //     if(selectedImage)
    //         this._record_btn.setSelectedImage(new cc.Sprite(selectedImage));
    // },

    setClickEffect:function(effect){
        this._click_sound_effect = effect;
    }


});


pslb.bigChallengeHelp_BonusBet_Setting= {
    eng:{
       jp:{pay: 0, position: [388, 103]},
       bet: [
           {pay: 9000, position: [530, 115]},
           {pay: 1500, position: [875, 115]}
        ]
    },
    sch:{
        jp:{pay: 0, position: [388, 103]},
        bet: [
            {pay: 9000, position: [567, 115]},
            {pay: 1500, position: [881, 115]}
        ]
    },
    tch:{
        jp:{pay: 0, position: [388, 103]},
        bet: [
            {pay: 9000, position: [567, 115]},
            {pay: 1500, position: [881, 115]}
        ]
    }
};
pslb.bigChallengeHelp_BonusBet_Setting['mys'] = pslb.bigChallengeHelp_BonusBet_Setting['eng'];
pslb.bigChallengeHelp_BonusBet_Setting['esp'] = pslb.bigChallengeHelp_BonusBet_Setting['eng'];
pslb.bigChallengeHelp_BonusBet_Setting['tai'] = pslb.bigChallengeHelp_BonusBet_Setting['eng'];
pslb.bigChallengeHelp_BonusBet_Setting['ind'] = pslb.bigChallengeHelp_BonusBet_Setting['eng'];
pslb.bigChallengeHelp_BonusBet_Setting['kor'] = pslb.bigChallengeHelp_BonusBet_Setting['eng'];
pslb.bigChallengeHelp_BonusBet_Setting['vie'] = pslb.bigChallengeHelp_BonusBet_Setting['eng'];

pslb.bigChallengeHelp_BonusBet=cc.Node.extend({
    _help_num:[],
    _help_pay:[],
    ctor:function () {
        this._super();
        this.initNum(pslb.bigChallengeHelp_BonusBet_Setting[pslb.Language].bet);

        this._multi = new pslb.HelpNumberAtlas("", res.help_number_png, 7, 24, false);
        this._multi.NumberFormat = pslb.DollarFormat;
        this._multi.setNumber("X" + 1000, false, true);
        this._multi.setPosition(94, 73);
        this._multi.setAnchorPoint(0.5,0.5);
        this.addChild(this._multi);

        // this._multi = new cc.Sprite(res.help_1000X);
        // var jp_pos = pslb.bigChallengeHelp_BonusBet_Setting[pslb.Language].jp;
        // this._multi.setPosition(94, 73);
        // this.addChild(this._multi);
    },
    initNum:function (data) {
        if(data==undefined) return;

        this._help_num=[];
        this._help_pay=[];
        for(var i=0;i<data.length;i++)
        {
            var e=data[i];
            var help_num=new pslb.WheelNumber(e.pay,res.bgw_wheel_bonus_money,res.bgw_wheel_bonus_number,22,46,70,4);
            help_num.setAnchorPoint(0.5,0.5);
            help_num.setPosition(e.position[0] - 4,e.position[1]);
            help_num.setScale(0.6);
            // this.addChild(help_num);
            this._help_pay.push(e.pay);
            this._help_num.push(help_num);
        }
    },
    resetNum:function (bet) {
        var self=this;
        this._help_num.forEach(function (e,index) {
            var num=self._help_pay[index]*bet;
            e.setNumber(num * pslb.systemInfo.ps_coin_mult);
        });
        // this._multi.setTexture(res["help_"+bet+"000X"]);

        this._multi.setNumber("X" + bet +"000", false, true);

    },
    setVisible:function (bool) {
        this._help_num.forEach(function (e) {
            e.setVisible(bool);
        });
        this._multi.setVisible(bool);
    }
});


pslb.bigChallengeHelp_PAGE_0_NUMBER=cc.Node.extend({
    _help_num:[],
    _help_pay:[],
    _numMaxWidth:64,
    ctor:function () {
        this._super();
        this.initNum(pslb.PayTableConfig0[pslb.Language].element);
    },
    initNum:function (data) {
        if(data==undefined) return;

        this._help_num=[];
        var self = this;
        var sign = null;
        var currency = pslb.UrlVariables[pslb.UrlVariablesName.Currency];
        data.forEach(function (e) {
            var label = new pslb.HelpNumberAtlas("", e.res, e.mark_width, e.high,e.sign);
            label.NumberFormat = pslb.DollarFormat;
            label.setNumber(e.pay * pslb.systemInfo.ps_coin_mult,e.sign,1);
            label.setPosition(e.position[0] , e.position[1]);
            if(!pslb.Currency)
                label.setPosition(e.position[0] + 22, e.position[1]);
            if (label.getIsSign()) {
                if (checkMultiCurrency(currency)) {
                    label = new SpriteInPlist(currency + '_sm.png');
                }
                sign = label;
            } else {
                var scale = adjustObjSize(label, self._numMaxWidth);
                sign.setScale(scale);
                sign.setPosition(label.x - (label.getContentSize().width / 2 + 10) * scale, label.y);
            }
            label.setAnchorPoint(e.Anchor[0], e.Anchor[1]);
            label.setRotation(e.rotation);
            self.addChild(label);
            self._help_num.push(label);
        });
    },
    setVisible:function (bool) {
        this._help_num.forEach(function (e) {
            e.setVisible(bool);
        });
    }
});

pslb.HELPNumber=cc.Sprite.extend({
    _currency:null,
    _num:null,
    _gap:20,
    _height:75,
    ctor:function (num,currency_res,num_res,gap,res_height,height) {
        this._super();
        num=this.changeCentToDollar(num)||0;
        var len=num.toString().length;
        this._gap=gap||0;
        this._height=height ||0;

        this._node=new cc.Node();
        this._node.setPosition(0.5,0.5);
        this._node.setPosition(-1*(this._gap)*(len-(0.5*(len+1))),0);
        this.addChild(this._node);

        this._currency=new pslb.CurrencyAtlas(currency_res,this._gap,res_height);
        this._currency.setAnchorPoint(0,0.5);
        this._currency.setPosition(-1*(this._gap),this._height);
        this._node.addChild(this._currency);

        this._num= new pslb.NumberAtlas(num, num_res, this._gap, res_height);
        this._num.setAnchorPoint(0,0.5);
        this._num.setPosition(0,this._height);
        this._node.addChild(this._num);

    },
    getNumber:function () {
        var num=this._num.getNumber();
        return num;
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
        this._node.setPosition(-62,60);
    },
    setScale:function (num) {
        this._node.setScale(num);
    },
    changeCentToDollar:function(cent){
        var flag = {
            noDot: true
        };
        if (g_getCreditmode() === pslb.CREDITMODE.CREDIT) {
            return g_format_accountion_unit(cent, flag);
        } else {
            return cent / 100;
        }
    }

});

pslb.NumbersNode = cc.Node.extend({
    _cur_multiplier:1,
    _numMaxWidth:48,
    ctor:function(base_mult, data, idx){
        this._super();

        this._cur_multiplier = base_mult;

        var self = this;
        var sign = null;
        var currency = pslb.UrlVariables[pslb.UrlVariablesName.Currency];
        data.forEach(function (e) {
            if(idx == e.relative_res){
                var label = new pslb.HelpNumberAtlas("", e.res, e.mark_width, e.high,e.sign);
                if (e.pay.toString().length >= 4) {
                    self._numMaxWidth = 64;
                }
                label.NumberFormat = pslb.DollarFormat;
                label.setNumber(e.pay * pslb.systemInfo.ps_coin_mult,e.sign);
                label.setPosition(e.position[0] + 25, e.position[1]);
                if (label.getIsSign()) {
                    if (checkMultiCurrency(currency)) {
                        label = new SpriteInPlist(currency + '_sm.png');
                    }
                    sign = label;
                } else {
                    var scale = adjustObjSize(label, self._numMaxWidth);
                    sign.setScale(scale);
                    sign.setPosition(label.x - (label.getContentSize().width / 2 + 17) * scale, label.y);
                }
                label.setAnchorPoint(e.Anchor[0], e.Anchor[1]);
                label.setRotation(e.rotation);
                self.addChild(label);
            }
        });
    },

    setPayLabelNum:function(mult){
        if(mult === undefined || this._cur_multiplier === mult)
            return;

        var ratio = mult / this._cur_multiplier;

        this._cur_multiplier = mult;
        var sign = null;
        var currency = pslb.UrlVariables[pslb.UrlVariablesName.Currency];
        this.getChildren().forEach(function (e) {
            if (e.getIsSign()) {
                if (!currency) {
                    e.setNumber(e.getNumber(), e.getIsSign());
                }
                sign = e;
            } else {
                e.setNumber(ratio * e.getNumber(), e.getIsSign());
                var scale = adjustObjSize(e, this._numMaxWidth);
                sign.setScale(scale);
                sign.setPosition(e.x - (e.getContentSize().width / 2 + 17) * scale, e.y);
            }
        }, this);
    }
});

pslb.NumberFormat = function(num,fixed_precision,decimal_mark, thousands_mark) {
    var str, split;
    decimal_mark = decimal_mark ? decimal_mark: '.';
    thousands_mark = thousands_mark ? thousands_mark: ',';
    num = Number(num);
    fixed_precision = Math.min(20,Math.max(0,Number(fixed_precision)));
    str = num.toFixed(fixed_precision).toString();
    split = str.split('.');
    split[0] = split[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousands_mark.toString());
    if(split[1])
        split[1] = split[1].replace(/(\d{3})(?=\d+(?!\d))/g, '$1' + thousands_mark.toString());
    return split.join(decimal_mark.toString());
};

pslb.DecimalMark = ".";

pslb.ThousandsMark =  ',';

pslb.NumberPrecision = 0;// 2;

(function(){
    var sm = ''
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == 'sm') {
            sm = sParameterName[1];
            break;
        }
    }
    ps.NumberPrecision = sm[0] == 1? 0 : 2;
    ps.ThousandsMark  = sm[1] == 1? '.' : ',';
    ps.DecimalMark    = sm[1] == 1? ',' : '.';
})();

pslb.DollarFormat = function(dollar) {
    return pslb.NumberFormat(dollar, pslb.NumberPrecision, pslb.DecimalMark, pslb.ThousandsMark)
};
pslb.CentFormat = function(cent) {
    return pslb.DollarFormat(cent/100);
};


pslb.HelpNumberAtlas = cc.LabelAtlas.extend({
    _number: null,
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
        "X" : "WX"
    },
    _isSign:false,
    // setString:undefined,
    // getString:undefined,

    ctor:function(num, charMapFile, itemWidth, itemHeight,sign){
        cc.LabelAtlas.prototype.ctor.call(this,"", charMapFile, itemWidth, itemHeight, this._start_char);
        this._isSign=sign;
        if(sign)
        {
            this._map_char= {
                '¥' : 'AB',
                '$' : 'CD'
            };
        }
        else
            this._map_char= {
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
                'X' : "WX"
            };
        this.setNumber(num);
    },
    getIsSign:function () {
        return this._isSign;
    },
    getNumber:function(){
        return this._number;
    },

    setNumber:function(num, sign, type){
        //num = Number(num);
        if(sign && !pslb.Currency) return;

        if(sign){
           num=pslb.Currency;
        }

        this._number = num;

        var flag = {
            noDot: true,
        };

        //do format
        if(!sign && num !== '')
        {
            if (g_getCreditmode() === pslb.CREDITMODE.CREDIT) {
                num = g_format_accountion_unit(num, flag);
            } else {
                if (type === true){
                    num = num.substr(1);
                    num = this.NumberFormat(num) + "X";
                } else {
                    num = this.NumberFormat(num);
                }
            }
        }



        //map to chat
        var label = "";
        for(var ni = 0; ni < num.length; ni++){
            label = label + this._map_char[num[ni]];
        }
        cc.LabelAtlas.prototype.setString.call(this, label);

    },

    NumberFormat:function(num){
        return num;
    }
});

var u = navigator.userAgent;
cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
    if (pslb.OPEN_RECORD == true && u.indexOf('Android') > -1){
        cc.audioEngine.playEffect(res.button_sound);
    }
});
cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {
    if (pslb.OPEN_RECORD == true && u.indexOf('Android') > -1){
        cc.audioEngine.stopAllEffects();
    }
    pslb.OPEN_RECORD = false;
});

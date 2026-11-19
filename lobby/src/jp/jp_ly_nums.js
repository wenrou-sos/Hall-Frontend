pslb.JPNUMID = {
    MINI: 0,
    MINOR: 1,
    MAJOR: 2,
    GRAND: 3,
};

var Jp_ly_Nums = cc.Layer.extend({
    ctor : function () {
        this._super();

        this._jpGrand0 = this._createJP(270, 21);
        this._jpMajor = this._createJP(538, 21);
        this._jpGrand1 = this._createJP(270, 21);
        this._jpMinor = this._createJP(450, 21);
        this._jpMini = this._createJP(582, 21);
        this._initNum();
    },

    _createJP : function (x, y) {
        var jp = new JPnum_manager(this, res.number_jp, res.number_comma, res.number_dot, 28, 5);
        jp.setAnchorPoint(0.5, 0.5);
        jp.setPosition(x ,y);
        jp.IniNumber(0);
        return jp;
    },

    _initNum : function () {
        this._jpGrand0.jpfadeOut(0);
        this._jpMajor.jpfadeOut(0);
        this._jpGrand1.jpfadeOut(0);
        this._jpMinor.jpfadeOut(0);
        this._jpMini.jpfadeOut(0);
        this._jpMinor.initNumScale(0.8);
        this._jpMini.initNumScale(0.8);
        this._jpMinor.initOriginPos();
        this._jpMini.initOriginPos();
    },

    handle_updatenums : function (data) {
        for (var i = 0; i < data.length; i++) {
            switch (data[i].id) {
                case pslb.JPNUMID.MINI:
                    this._jpMini.updateNum(data[i].current_cent * pslb.systemInfo.ps_coin_mult);
                    this._jpMini.setVisible(data[i].enable);
                    break;
                case pslb.JPNUMID.MINOR:
                    this._jpMinor.updateNum(data[i].current_cent * pslb.systemInfo.ps_coin_mult);
                    this._jpMinor.setVisible(data[i].enable);
                    break;
                case pslb.JPNUMID.MAJOR:
                    this._jpMajor.updateNum(data[i].current_cent * pslb.systemInfo.ps_coin_mult);
                    this._jpMajor.setVisible(data[i].enable);
                    break;
                case pslb.JPNUMID.GRAND:
                    this._jpGrand0.updateNum(data[i].current_cent * pslb.systemInfo.ps_coin_mult);
                    this._jpGrand1.updateNum(data[i].current_cent * pslb.systemInfo.ps_coin_mult);
                    this._jpGrand0.setVisible(data[i].enable);
                    this._jpGrand1.setVisible(data[i].enable);
                    break;
                default:
                    break;
            }
        }
    },

    runFadeInAction : function (time, tag) {
        if (tag === 0) {
            this._jpGrand0.jpfadeIn(time);
            this._jpMajor.jpfadeIn(time);
        } else {
            this._jpGrand1.jpfadeIn(time);
            this._jpMinor.jpfadeIn(time);
            this._jpMini.jpfadeIn(time);
        }
    },

    runFadeOutAction : function (time, tag) {
        if (tag === 0) {
            this._jpGrand0.jpfadeOut(time);
            this._jpMajor.jpfadeOut(time);
        } else {
            this._jpGrand1.jpfadeOut(time);
            this._jpMinor.jpfadeOut(time);
            this._jpMini.jpfadeOut(time);
        }
    }

});

Jp_ly_Nums.prototype.addAnm = function (anm,z) {
    this.addChild(anm,z);
};

/**
 * Created by howardchou on 2020/01/30.
 */


var jp_ly_banner = cc.Layer.extend({
    _isBannerVisible:true,
    _jpBanner:null,
    _jpMBanner:null,
    _jpFullCloseBtn:null,
    _closeBannerEnable:false,
    _close:null,
    ctor:function(){
        this._super();
        if (!jp_res.banner_json || !jp_res.banner_atlas) { return; }

        var self = this;

        var lan = "eng";
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === "lang")
                lan = sParameterName[1];
            if(lan !== "tai")
                lan = "eng";
        }

        this._jpFullCloseBtn = new cc.MenuItemSprite("", "", "", this._closeBanner, this);
        this._jpFullCloseBtn.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        var size = this._max(cc.winSize.width,cc.winSize.height);
        this._jpFullCloseBtn.setContentSize(size, size);
        var jpMenu = new cc.Menu(this._jpFullCloseBtn);
        jpMenu.setPosition(0, 0);
        this.addChild(jpMenu, 10);

        this._jpBanner = new sp.SkeletonAnimation(jp_res.banner_json,jp_res.banner_atlas);
        this._jpBanner.setPosition(0, 0);
        this._jpBanner.setAnchorPoint(0, 0);
        this.addChild(this._jpBanner,0);

        this._jpBanner.setToSetupPose();
        // this._jpBanner.setSkin(lan);
        this._jpBanner.clearTracks();
        this._jpBanner.setAnimation(0,"loop",true);
        this._jpBanner.update(0);


        this._jpMBanner = new sp.SkeletonAnimation(jp_res.banner_m_json,jp_res.banner_atlas);
        this._jpMBanner.setPosition(0, 0);
        this._jpMBanner.setAnchorPoint(0, 0);
        this.addChild(this._jpMBanner,0);

        this._jpMBanner.setToSetupPose();
        // this._jpMBanner.setSkin(lan);
        this._jpMBanner.clearTracks();
        this._jpMBanner.setAnimation(0,"loop",true);
        this._jpMBanner.update(0);

        this._close = new ccui.Button(jp_res.banner_close_png, jp_res.banner_close_png, jp_res.banner_close_png);
        this._close.setOpacity(0);
        this._close.setAnchorPoint(0.5,0.5);
        this._close.setPosition(969.5,553);
        this._close.addTouchEventListener(function(sender,type){
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    self._closeBanner();
                    break;
            }
        }, this);
        this.addChild(this._close,1);

        // for avoid to click lower layer
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(){
                return this.isVisible();
            }.bind(this)
        }, this);
    },

    onEnter:function(){
        this._super();
    },

    onExit:function(){
        this._super();
    },

    handle_broadcast:function(data){

    },

    reset_position:function(){
        if(this.isVisible()){
            this._jpFullCloseBtn.setPosition(cc.winSize.width/2, cc.winSize.height/2);
            var size = this._max(cc.winSize.width,cc.winSize.height);
            this._jpFullCloseBtn.setContentSize(size, size);
            if(BK.DEVICE_MODE == 0){
                this._close.setPosition(969.5,553);
                this._jpBanner.setVisible(true);
                this._jpMBanner.setVisible(false);
            }
            else{
                this._close.setPosition(630,1063);
                this._jpBanner.setVisible(false);
                this._jpMBanner.setVisible(true);
            }
        }
    },

    _setCloseBannerEnable:function(flag){
        this._closeBannerEnable = flag;
    },

    _getCloseBannerEnable:function(){
        return this._closeBannerEnable;
    },

    _closeBanner:function(){
        var self = this;
        // var jpCtrlData = BK.JackpotControlData.getInstance();
        if(this._getCloseBannerEnable() == true) return;
        this._setCloseBannerEnable(true);
        this.runAction(
            cc.sequence(
                cc.callFunc(function(){
                    self._jpBanner.setAnimation(0, "end", false);
                    self._jpMBanner.setAnimation(0, "end", false);
                }),
                cc.delayTime(0.5),
                cc.callFunc(function(){
                    self.setVisible(false);
                    self._setCloseBannerEnable(false);
                    // jpCtrlData.setIsBannerShow(false);
                })
            )
        );
    },

    _max:function(first, second){
        return first > second ? first : second;
    }
});

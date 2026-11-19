var BtnScale = 1;
var FinishLoaderScene = cc.Layer.extend({
    ctor:function() {
        this._super();
        var self = this;
        this._gameCtrl = BK.GameController.getInstance();

        if (DEF_GAMEID === "PSS-ON-00141" || DEF_GAMEID === "PSS-ON-00146") {
            BtnScale = 0.8;
            this._loadingBtnAnm = new sp.SkeletonAnimation(res.loading_btn_json, res.loading_btn_atlas);
            this._loadingBtnAnm.setAnimation(0,"loop", true);
            this.addChild(this._loadingBtnAnm, 1);
        }
        //loading bg
        this._bgAd = new cc.Sprite(ps.LoadingBandBg);
        this._bgAd.setPosition(360, 640);
        this._bgAd.setAnchorPoint(0.5,0.5);
        this.addChild(this._bgAd);

        var bg = self._bg = new cc.Sprite('../HostImages/0/' + DEF_GAMEID + '/' + RES_LANGUAGE + '/loading_bg_0' + (loadingpicnum) + '.png');
        bg.setPosition(360, 715);
        bg.setAnchorPoint(0.5,0.5);
        this.addChild(this._bg);

        this._btnStarGame = new ccui.Button('../HostImages/0/' + DEF_GAMEID + '/' + RES_LANGUAGE + '/btn_strar_game_n.png', '../HostImages/0/' + DEF_GAMEID + '/' + RES_LANGUAGE + '/btn_strar_game_h.png');
        this._btnStarGame.setPosition(360, 254);
        this.addChild(this._btnStarGame, 1);
        this._btnStarGame.setScale(BtnScale);

        this._loadingBanner = new cc.Sprite('../HostImages/0/'+ DEF_GAMEID + '/' + RES_LANGUAGE + '/loading_banner_0' + (loadingbannernum - 1) + '.png');
        this._loadingBanner.setPosition(360, 179);
        // this.addChild(this._loadingBanner);

        this._btnStarGame.addTouchEventListener(function(touch, type){
            if(type == ccui.Widget.TOUCH_ENDED) {
                if (self._loadingBtnAnm) self._loadingBtnAnm.setVisible(false);
                AUDIO.playEffect(res.sound_btnclick);
                self._bg.runAction(cc.sequence(
                    cc.spawn(
                        cc.sequence(
                            cc.scaleTo(0.1,1.2*BtnScale).easing(cc.easeSineInOut()),
                            cc.scaleTo(0.25,0).easing(cc.easeSineInOut())
                        ),
                        cc.fadeOut(0.25)
                    ),
                    cc.callFunc(function(){
                        self.setVisible(false);
                    })
                ));
                self._btnStarGame.setVisible(false);
                self._bgAd.setVisible(false);
            }
        });

        this._btnStarGame.runAction(
            cc.sequence(
                cc.scaleTo(1.5, 1.05*BtnScale).easing(cc.easeSineIn()),
                cc.scaleTo(1.5,1*BtnScale).easing(cc.easeSineIn())
            ).repeatForever()
        );

        // for avoid to click lower layer
        this._listener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(){
                return this.isVisible();
            }.bind(this)
        }, this);
    },

    isShow:function(){
        if (this._bgAd.texture === null || this._bg.texture === null || this._btnStarGame.getContentSize().width === 0) {
            this.setVisible(false)
        }
    }
});

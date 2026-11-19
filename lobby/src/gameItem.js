var pslb = pslb || {};


pslb.gameItem = cc.Sprite.extend({
    _config:null,
    _game_id:"",
    _sub_id:0,
    _type:0,
    _commission_type:0,

    _mouse_enabled: false,
    _mouse_listener:null,
    _touch_enabled: false,
    _touch_listener:null,

    _focus_node:null,
    _free_button:null,
    _real_button:null,
    _vip_only: null,

    _set_mask:false,
    _mask:null,

    _label:0,
    _label_ndoe:null,

    _lock:false,
    _lock_ndoe:null,

    _disable:false,
    _coming_soon:null,

    _is_strip:false,

    _is_real_game:false,

    ctor:function(gameId, strip, lock, label, disable,type,subId,commission_type){
        this._super();
        this._is_strip = strip || false;
        this._config = this._is_strip? pslb.gameItem.stripConfig: pslb.gameItem.normalConfig;
        this._is_real_game= pslb.isRealPlay;
        this._disable=disable;
        this._lock=lock;
        this._type=type;
        this._sub_id=subId || 0;
        this._commission_type=commission_type||0;

        this._ininFocusNode();
        this.setMouseEnabled(true);
        this.setTouchEnabled(true);
        this._refreshesCoord();

        gameId && this.setGameId(gameId,this._sub_id,this._type,this._commission_type);
        lock && this.setLock(gameId);
        label && this.setLabel(label);
        disable && this.setDisable(disable);

        this.setFavorite(gameId);


    },

    _ininFocusNode:function(){
        this._mask = new cc.Sprite();

        this._initButtonNode();

        this._vip_only = new cc.LabelTTF("VIP ONLY", pslb.TTFName, 40);
        this._vip_only.setPosition(this._config.coord.vip);
        this._vip_only.setVisible(this._lock);

        this._coming_soon = new cc.Sprite(res.coming_soon);
        this._coming_soon.setPosition(this._config.coord.comingsoon);
        this._coming_soon.setVisible(this._disable);

        this._focus_node = new cc.Node();
        this._focus_node.setVisible(false);
        this._focus_node.addChild(this._mask);
        this._focus_node.addChild(this._button_node);
        this._focus_node.addChild(this._vip_only);
        if(!this._lock)
            this._focus_node.addChild(this._coming_soon);
        this.addChild(this._focus_node);
    },

    _initButtonNode:function(){
        this._button_node = new cc.Node();
        if(!this._lock)
            if(this._is_real_game) {
                this._real_button = new ccui.Button(res.realplay_up, res.realplay_down, res.realplay_down);
                this._real_button.setPosition(this._config.coord.realButton);
                this._real_button.setTouchEnabled(true);
                this._real_button.addTouchEventListener(function (touch, type) {
                    if (ccui.Widget.TOUCH_ENDED == type) {
                        if (pslb.isBigChallenge == true) {
                            console.log("isBigChallenge = true");
                            return;
                        }
                        pslb.OpenRealGame(this._game_id, this._sub_id);
                    }
                    cc.log("game_id= " + this._game_id + ", sub_id= " + this._sub_id);
                }, this);
                this._button_node.addChild(this._real_button);

                this._favorite_button = new ccui.Button(res.faverite_down);
                this._favorite_button.setPosition(this._config.coord.favoriteButton);
                this._favorite_button.setTouchEnabled(true);
                this._favorite_button.addTouchEventListener(function (touch, type) {
                    if (ccui.Widget.TOUCH_ENDED == type) {
                        if (pslb.isBigChallenge == true) {
                            console.log("isBigChallenge = true");
                            return;
                        }
                        // var all_game =
                        //     cc.director.getRunningScene()._layer.main._game_wall._filter.getData(pslb.gameWall.AllGame);

                        var all_game = pslb.memberInfo.gameGroup.all;

                        var favorite_pick = pslb.memberInfo.gameGroup.favorite_pick;

                        var addSameGame = false;

                        favorite_pick.forEach(function(e){
                            if (e.gameId === this._game_id){
                                addSameGame = true;
                            }
                        }, this);

                        if (addSameGame) {  // remove favorite
                            this._favorite_button.loadTextureNormal(res.faverite_down);

                            var testObject = [];

                            var remove_index = -1;

                            favorite_pick.forEach(function(e, index){
                                if (e.gameId === this._game_id){
                                    remove_index = index;
                                }
                            }, this);

                            favorite_pick.splice(remove_index, 1);

                            for (var i = 0 ; i < favorite_pick.length ; i++){
                                testObject.push(pslb.memberInfo.gameGroup.favorite_pick[i]);
                            }

                            localStorage.setItem('myFavorite', JSON.stringify(testObject));

                            return;
                        }

                        all_game.forEach(function(e){
                            if (e.gameId === this._game_id){
                                favorite_pick.push(e);
                            }
                        }, this);

                        var testObject = [];

                        for (var i = 0 ; i < favorite_pick.length ; i++){
                            testObject.push(pslb.memberInfo.gameGroup.favorite_pick[i]);
                        }

                        localStorage.setItem('myFavorite', JSON.stringify(testObject));

                        this._favorite_button.loadTextureNormal(res.faverite_up);

                    }
                    cc.log("game_id= " + this._game_id + ", sub_id= " + this._sub_id);
                }, this);
                this._button_node.addChild(this._favorite_button);
            }
            else {
                this._free_button = new ccui.Button(res.freeplay_up,res.freeplay_down,res.freeplay_down);
                this._free_button.setPosition(this._config.coord.freeButton);
                this._free_button.setTouchEnabled(true);
                this._free_button.addTouchEventListener(function(touch, type){
                    if(ccui.Widget.TOUCH_ENDED == type)
                        pslb.OpenFreeGame(this._game_id);
                }, this);
                this._button_node.addChild(this._free_button);
            }

        this._button_node.setVisible(!this._lock);
    },

    _setMask:function(){
        if(this._set_mask == true)
            return;

        var stencil = new cc.Sprite(this.getTexture().url);
        stencil.setAnchorPoint(0,0);
        var mask = new cc.Sprite(res.web_down);
        mask.setAnchorPoint(0,0);
        mask.setScaleX(stencil.getContentSize().width / mask.getContentSize().width);
        mask.setScaleY(stencil.getContentSize().height / mask.getContentSize().height);
        var clip = new cc.ClippingNode();
        clip.setStencil(stencil);
        clip.setAlphaThreshold(0);
        clip.addChild(mask);

        var render = new cc.RenderTexture(stencil.getContentSize().width, stencil.getContentSize().height);
        render.beginWithClear(0,0,0,0);
        clip.visit();
        render.end();
        this._mask.setTexture(render.getSprite().getTexture());
        this._mask.setAnchorPoint(0,0);
        this._set_mask = true;
    },

    setGameId:function(game_id,subId,type,commission_type){
        this._game_id = game_id;
        this._set_mask = false;
        var file_url = "";
        if(game_id === "PSB-ON-00001")
            file_url = this._config.url + game_id.toLowerCase() + "-"+subId+".png";
        else
            file_url = this._config.url + game_id.toLowerCase() + ".png";
        var texture = cc.textureCache.addImage(file_url);
        this.setTexture(file_url);

        if(texture.isLoaded() == false){
            this.setVisible(false);
            texture.addEventListener("load", function(){
                this.setLock(this._lock);
                this.setLabel(this._label);
                this.setDisable(this._disable);
                this.setVisible(true);
            }, this);
        }
    },

    setLabel:function(label){
        this._label = label;
        if(!this._label_ndoe){
            this._label_ndoe = new cc.Sprite();
            this._label_ndoe.setPosition(this._config.coord.label);
            this._label_ndoe.setAnchorPoint(0,0);
            this.addChild(this._label_ndoe, 1);
        }

        var label_res = pslb.gameItem.labelRes[label];

        if(label_res && label !== pslb.gameItem.jackpot){
            this._label_ndoe.setTexture(label_res);
            this._label_ndoe.setVisible(this.textureLoaded());
            this._label_ndoe.setVisible(true);
        }
        else
            this._label_ndoe.setVisible(false);
    },

    setLock:function(lock){
        this._lock = lock;
        if(!this._lock_ndoe){
            this._lock_ndoe = new cc.Sprite(res.lock);
            this._lock_ndoe.setPosition(this._config.coord.lock);
            this._lock_ndoe.setAnchorPoint(0,0);
            this.addChild(this._lock_ndoe, 1);
        }
        this._lock_ndoe.setVisible(this.textureLoaded() && lock);
        this._button_node.setVisible(this.textureLoaded() && !lock);
        this._vip_only.setVisible(this.textureLoaded() && lock);

    },

    setFavorite:function(game_id){

        var favorite_pick = pslb.memberInfo.gameGroup.favorite_pick;

        favorite_pick.forEach(function(e){
            if (e.gameId === game_id){
                this._favorite_button.loadTextureNormal(res.faverite_up);
            }
        }, this);
    },

    setStrip:function(strip){
        if(this._is_strip == strip)
            return;
        this._is_strip = strip;
        this._config = strip?pslb.gameItem.stripConfig:pslb.gameItem.normalConfig;
        this.setGameId(this._game_id);
        this.setDisable(this._disable);
        this._refreshesCoord();
},

    setDisable:function (disable,strip) {
        this._disable = disable;
        this.setTouchEnabled(!disable);
        this.setMouseEnabled(!disable);

        this._button_node.setVisible(this.textureLoaded() && !disable);
        this._coming_soon.setVisible(this.textureLoaded() && disable);
        this._focus_node.setVisible(this.textureLoaded() && disable);
        disable && this.textureLoaded() && this._setMask();

    },

    isStrip:function(){
        return this._is_strip;
    },

    setMouseEnabled:function(enable){
        if (this._mouse_enabled === enable)
            return;

        this._mouse_enabled = enable;
        if (this._mouse_enabled) {
            if(!this._mouse_listener)
                this._mouse_listener = cc.EventListener.create({
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function(event){
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var rect = cc.rect(0, 0, target.getContentSize().width, target.getContentSize().height);
                        var contains = cc.rectContainsPoint(rect, locationInNode);
                        target._focus_node.setVisible(contains);
                        contains && target._setMask();
                    }
                });
            cc.eventManager.addListener(this._mouse_listener, this);
        } else {
            cc.eventManager.removeListener(this._mouse_listener);
        }
    },

    setTouchEnabled:function(enable){
        if (this._touch_enabled === enable)
            return;
        this._touch_enabled = enable;
        if (this._touch_enabled) {
            if(!this._touch_listener)
                this._touch_listener = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: function(touch, event){
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(touch.getLocation());
                        var rect = cc.rect(0, 0, target.getContentSize().width, target.getContentSize().height);
                        var contains = cc.rectContainsPoint(rect, locationInNode);
                        target._focus_node.setVisible(contains);
                        contains && target._setMask();
                    }
                });
            cc.eventManager.addListener(this._touch_listener, this);
        } else {
            cc.eventManager.removeListener(this._touch_listener);
        }
    },

    _refreshesCoord:function(){
        var coord = this._config.coord;
        this._lock_ndoe && this._lock_ndoe.setPosition(coord.lock);
        this._label_ndoe && this._label_ndoe.setPosition(coord.label);
        this._vip_only && this._vip_only.setPosition(coord.vip);
        this._coming_soon && this._coming_soon.setPosition(coord.comingsoon);
        this._free_button && this._free_button.setPosition(coord.freeButton);
        this._real_button && this._real_button.setPosition(coord.realButton);
    }
});

pslb.gameItem.normalConfig = {
    url:"res/" + pslb.Language + "/gameLogo/normal/",
    coord:{
        vip: cc.p(124,113),
        lock: cc.p (-15,0),
        label: cc.p (-5,107),
        freeButton: cc.p(124,112),  // cc.p(124,150)
        realButton: cc.p(124,152),    // cc.p(124,75)
        favoriteButton: cc.p(124,72) ,
        comingsoon: cc.p(124,113)
    }
};

pslb.gameItem.stripConfig = {
    url:"res/" + pslb.Language + "/gameLogo/strip/",
    coord:{
        vip: cc.p(124,230),
        lock: cc.p (-15,0),
        label: cc.p (-5,351),
        freeButton: cc.p(124,230),  //cc.p(124,267)
        realButton: cc.p(124,269) ,  //cc.p(124,192)
        favoriteButton: cc.p(124,152) ,
        comingsoon: cc.p(124,230)
    }
};

pslb.gameItem.normal = 0;

pslb.gameItem.new = 1;

pslb.gameItem.hot = 2;

pslb.gameItem.challenge = 3;

pslb.gameItem.jackpot = 4;

pslb.gameItem.goldenTicket = 5;

pslb.gameItem.labelRes = function(){
    var ret = [];
    ret[pslb.gameItem.new] = res.new;
    ret[pslb.gameItem.hot] = res.hot;
    ret[pslb.gameItem.challenge] = res.challenge;
    ret[pslb.gameItem.jackpot] = res.jackpot;
    ret[pslb.gameItem.goldenTicket] = res.enent;
    return ret;
}();

(function(_p){

    _p.gameId;
    cc.defineGetterSetter(_p, "gameId", undefined, _p.setGameId);

    _p.strip;
    cc.defineGetterSetter(_p, "strip", _p.isStrip, _p.setStrip);

    _p.label;
    cc.defineGetterSetter(_p, "label", _p.undefined, _p.setLabel);

    _p.lock;
    cc.defineGetterSetter(_p, "lock", undefined, _p.setLock);

    _p.disable;
    cc.defineGetterSetter(_p, "disable", undefined, _p.setDisable);


})(pslb.gameItem.prototype);

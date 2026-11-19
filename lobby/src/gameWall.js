var pslb = pslb || {};

pslb.gameWallFocusId=0;

var allgameAttrs = function(){
    var ret = [];
    var labels = [0,2,3];
    for(var i = 1; i < 77; i++){
        var id = "PSS-ON-000" + (i > 9? i: "0"+ i);
        var label = labels[i % 3];
        if(i > 70)
            label = 1;
        var isLock = i % 10 == 0? true:false;
        if(id == "PSS-ON-00074" ||
            id == "PSS-ON-00075" ||
            id == "PSS-ON-00076")
            isLock = true;
        ret.push({gameId:id, label:label, lock:isLock})
    }
    ret.push({gameId:"PSS-ON-00078", label:1, lock:true});
    ret.push({gameId:"PSS-ON-00081", label:1, lock:false});
    ret.push({gameId:"PSS-ON-00082", label:1, lock:false});
    ret.push({gameId:"PSS-ON-10019", label:1, lock:false});
    return ret;
}()

pslb.gameLayout = ccui.Layout.extend({
    _game_item: [],

    ctor:function(){
        this._super();
        this._game_item = [];

        var getFavoriteItem = localStorage.getItem('myFavorite');
        if (getFavoriteItem === null){
            this._list = [];
            localStorage.setItem('myFavorite',   this._list);
        } else {
            // localStorage.setItem('countryItem',countryString);
            var getData = localStorage.getItem('myFavorite');
            // this._list = localStorage.getItem('myFavorite');
        }

    },

    setGameItem:function(item_attrs_group){
        this._clearGameItem();
        item_attrs_group.forEach(function(item){
            var game_item = new pslb.gameItem(item.gameId,item.strip,item.is_lock,item.label,item.disable,item.type,item.subId,item.commission_type);
            // game_item.attr(item);
            // console.log(item.gameId + " : " + game_item._real_button.isTouchEnabled());
            this._game_item.push(game_item);
            this.addChild(game_item);
        }, this);
    },

    _clearGameItem:function(){
        this._game_item.forEach(function(g){
            this.removeChild(g);
        },this);
        this._game_item.length = 0;
    },

    getAllGameItem:function(){
        return this._game_item;
    }
});

pslb.gamePageView = cc.Node.extend({
    _game_items:[],
    _page_qty: 0,
    _PageView:null,
    _PageButton:[],
    _page_button_center: {x:0, y:0},
    _page_button_gap:0,
    _layout:null,
    _enableflag:false,

    ctor:function () {
        this._super();
        this._layout = null;
        this._game_items = [];
        this._PageView = new ccui.PageView();
        this._PageView.setCustomScrollThreshold(50);
        this._PageView.setContentSize(cc.size(1170,540));
        this._PageView.setTouchEnabled(true);
        this._PageView.setAnchorPoint(0,0);
        this.addChild(this._PageView);
        this._PageView.addEventListener(this._pageViewEvent, this);
        this.setMouseEnabled(true);

        this._enableflag=false;
        this.schedule(this.update, 0.1);
    },

    _count:0,
    update:function(){
        if(pslb.isBigChallenge == true && this._enableflag == false){
            // this._PageView.setTouchEnabled(false);
            this.setMouseEnabled(false);
            this._enableflag = true;
        }
        else if(pslb.isBigChallenge == false && this._enableflag == true){
            // this._PageView.setTouchEnabled(true);
            this.setMouseEnabled(true);
            // this._resetPageButton();
            // for back to gamewall, PageButton can't click
            // this._PageButton.forEach(function (e,idx) {
            //     if(idx == this._PageView.getCurPageIndex())
            //         e.setBright(true);
            //     else
            //         e.setBright(false);
            // },this);
            this._enableflag = false;
        }
    },

    setGameItemInfo:function(gameItem){
        this._game_items = gameItem;
    },

    getGameItemInfo:function(){
         return this._game_items
    },

    setLayout:function(layout){
        this._layout = layout;
    },

    getLayout:function(){
        return this._layout;
    },

    refreshes:function(){
        this.clearGamePage();
        if(!this._layout)
            return;
        this._page_qty = Math.ceil(this._game_items.length / this._layout.maxGameItem());
        this._page_qty = Math.min(this._page_qty, this._layout.maxPage());

        var page_info_group = [];
        for(var i = 0; i < this._game_items.length; i++){
            var page_index = Math.floor(i/this._layout.maxGameItem());
            if(page_index >= this._page_qty)
                break;
            if(!page_info_group[page_index])
                page_info_group[page_index] = [];
            page_info_group[page_index].push(this._game_items[i]);
        }

        page_info_group.forEach(function(page_info, index){
            var p = new pslb.gameLayout();
            p.setGameItem(page_info);
            this._layout.run(p);
            this._PageView.addPage(p);
        },this);

        this._resetPageButton();
        if(this._page_qty > 0){
            this._PageButton[0].setBright(true);
            this._PageView.scrollToPage(0);
        }

    },

    clearGamePage:function () {
        this._page_qty = 0;
        this._PageView.removeAllPages();
        // this._resetPageButton();
    },

    _pageViewEvent:function (sender, type) {
        if(type == 10){
          var x  = cc.director.getRunningScene()._layer.main._game_wall._page._PageButton;
            x.forEach(function (e) {
                var bright = e.getTag() == sender.getCurPageIndex();
                e.setBright(bright);
            });
            cc.director.getRunningScene()._layer.main._game_wall._page.setMouseEnabled(true);
        }
    },

    _pageViewButtonEvent:function (sender, type) {
        if(type==ccui.Widget.TOUCH_ENDED){
            this._PageButton.forEach(function (e) {
                var bright = e.getTag() == sender.getTag();
                e.setBright(bright);
            });
            this._PageView.scrollToPage(sender.getTag());
        }
    },

    setPageButtonPosition:function (center,gap) {
        this._page_button_center = center;
        this._page_button_gap = gap;
        this._resetPageButton();
    },

    _createPageButton:function(tag){
        var ret = new ccui.Button(res.paging_bt_up_png,
            res.paging_bt_down_png,res.paging_bt_down_png);
        ret.setTag(tag);
        ret.setTouchEnabled(true);
        ret.setBright(false);
        ret.addTouchEventListener(this._pageViewButtonEvent,this);
        return ret;
    },

    _resetPageButton:function(){

        // while(this._PageButton.length > this._page_qty){
        // var last = this._PageButton.pop();
        // this._PageView.removeChild(last);
        // }

        if(this._PageButton.length > 0){
            this._PageButton.forEach(function(e){
                this.removeChild(e);
            },this);
            this._PageButton = [];
        }

        while(this._PageButton.length < this._page_qty){
            var page = this._PageButton.length;
            var btn = this._createPageButton(page);
            this._PageButton.push(btn);
            this.addChild(btn);
        }

        this._PageButton.forEach(function(btn, index){
            var x = this._page_button_center.x +
                this._page_button_gap * ( index - (this._page_qty + 1) / 2);
            var y = this._page_button_center.y;
            btn.setPosition(x,y);
            btn.setVisible(index<this._page_qty);
        }, this);

    },

    setMouseEnabled:function(enable){
        if (this._mouse_enabled === enable) {
            //console.log(this._mouse_enabled)
            return;
        }

        this._mouse_enabled = enable;
        if (this._mouse_enabled) {
            if(!this._mouse_listener)
                this._mouse_listener = cc.EventListener.create({
                    event: cc.EventListener.MOUSE,
                    onMouseScroll: function(event){
                        var target = event.getCurrentTarget();
                        var scroll = -event.getScrollY()/Math.abs(event.getScrollY());
                        var self = this;
                        if(scroll != 0){
                            var next_index = target._PageView.getCurPageIndex() + scroll;
                            var total = target._PageView.getPages().length;
                            if(next_index >= 0 && next_index < total){
                                target._PageView.scrollToPage(next_index);
                                // target.setMouseEnabled(false);
                            }
                        }
                    }
                });
            cc.eventManager.addListener(this._mouse_listener, this);
        } else {
            cc.eventManager.removeListener(this._mouse_listener);
        }
    },
});

pslb.gameWall = cc.Node.extend({
    _btn_group:[],
    _page:null,
    _filter:null,
    _isOpenNormal: false,
    _init:true,

    ctor:function(){
        this._super();
        this._filter = new pslb.orFilter(pslb.memberInfo.gameGroup); //allgameAttrs
        this._page = new pslb.gamePageView();
        this._page.setPageButtonPosition({x:581, y:22},44);
        this._page.setPosition(111,100);
        this.addChild(this._page,-1);

        this._scorll_size = cc.size(720, 1028);
        this._scrollView = new ccui.ScrollView();
        this._scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);//設置方向爲垂直
        this._scrollView.setTouchEnabled(true);//觸摸的屬性
        this._scrollView.setBounceEnabled(true);//彈回的屬性
        this._scrollView.setInertiaScrollEnabled(true);//滑動的慣性
        this._scrollView.setContentSize(cc.size(720, 1028));//設置scrollView的大小，相當於是顯示的區域
        this._scrollView.setInnerContainerSize(cc.size(this._scorll_size.width, this._scorll_size.height));//設置容器的大小
        this._scrollView.setAnchorPoint(cc.p(0,0));
        this._scrollView.setPosition(cc.p(122,0));
        this.addChild(this._scrollView,1);

        this._btn_top =new ccui.Button(res.btn_top_up,res.btn_top_down,res.btn_top_down);
        this.addChild(this._btn_top,2);
        this._btn_top.setPosition(645,130);
        this._btn_top.addTouchEventListener(function(touch , type){
            if(type == ccui.Widget.TOUCH_ENDED){
                this._scrollView.scrollToTop(0.1)
            }
        }, this);
        this.addChild(this._btn_top);

        this._buildButton();
        this.openNormal();
    },

    reset_position:function(){
        this._btn_group.forEach(function(btn){
            btn.setVisible(false);
            if (BK.DEVICE_MODE === 0) {
                btn.setScale(1);
            } else {
                btn.setScale(1.2);
            }
        });
        this._btn_top.setVisible(BK.DEVICE_MODE);

        for (var i = 0 ; i < this._btn_group.length ; i++){
            var _bp = pslb.ButtonPos[BK.DEVICE_MODE] && pslb.ButtonPos[BK.DEVICE_MODE][i]; if (this._btn_group[i] && _bp) { this._btn_group[i].setPosition(_bp); }
        }

        if (BK.DEVICE_MODE === 0){
            this._page.setVisible(true);
            this._scrollView.setVisible(false);

            if (cc.sys.isMobile){
                var PageButtonLength =  this._page._PageButton.length ;
                var scrollView_height = this._scrollView.getInnerContainerSize().height - this._scrollView.getContentSize().height;
                var scrollViewCurHeight = this._scrollView.getInnerContainerPosition().y;
                var percent = (scrollView_height - Math.abs(scrollViewCurHeight)) /  scrollView_height;
                if(this._init === false){
                    this.scheduleOnce(function(){
                        cc.director.getRunningScene()._layer.main._game_wall._page._PageView.scrollToPage(Math.floor(PageButtonLength*percent));
                    },0.1)
                }

            }

            if(this._isOpenNormal){
                for (var i = 0; i <  this._btn_group.length; i++){
                    if (this._btn_group[i] !== undefined){
                        if (i < 5){
                            this._btn_group[i].setVisible(true);
                        } else {
                            this._btn_group[i].setVisible(false);
                        }
                    }
                }
                this._feature_btn.setVisible(true);
                this._close_btn.setVisible(false);

            } else {
                // this._btn_group[pslb.gameWall.EventGame].setVisible(true);
                for (var i = 0; i <  this._btn_group.length; i++){
                    if (this._btn_group[i] !== undefined){
                        if (i >= 5){
                            this._btn_group[i].setVisible(true);
                        } else {
                            this._btn_group[i].setVisible(false);
                        }
                    }
                }
                this._feature_btn.setVisible(false);
                this._close_btn.setVisible(true);
            }

            if (this._btn_group.length <= 5){
                this._feature_btn.setVisible(false);
                this._close_btn.setVisible(false);
            }

        } else {
            this._scrollView.setVisible(true);
            this._page.setVisible(false);
            this._init = false;

            if (cc.sys.isMobile){
                var PageButtonLength =  this._page._PageButton.length ;
                var CurPageIndex =  this._page._PageView.getCurPageIndex();
                var percent = (CurPageIndex / PageButtonLength + ((1 / PageButtonLength) * (CurPageIndex/PageButtonLength) ))*100;
                this._scrollView.jumpToPercentVertical(Math.ceil(percent));
            }

            this._btn_group.forEach(function(btn){btn.setVisible(true)});
            this._feature_btn.setVisible(false);
            this._close_btn.setVisible(false);

        }
    },

    _addButton: function(up, down, pos, btn_name){
        var btn = new ccui.Button(up,down,down);
        btn.setPosition(pos);
        btn.setAnchorPoint(cc.p(0.5,0.5));
        btn.setTouchEnabled(true);
        btn.addTouchEventListener(function(touch, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                this._clickButton(btn_name);
            }
            return true;
        },this);

        var gameGroup = this._filter.getData(btn_name);
        if ((gameGroup !== undefined && gameGroup.length !== 0 )|| (btn_name === pslb.gameWall.Favorite ||　btn_name === pslb.gameWall.TodaySpecial
        || btn_name === pslb.gameWall.Close || btn_name === pslb.gameWall.Featured)){
            this.addChild(btn);
            if ( btn_name !== pslb.gameWall.Close && btn_name !== pslb.gameWall.Featured) {
                this._btn_group[btn_name] = btn;
            }
            if (btn_name === pslb.gameWall.Close){
                this._close_btn = btn;
            }
            if (btn_name === pslb.gameWall.Featured){
                this._feature_btn = btn;
            }

        } else {
            console.log(btn_name)
        }

    },

    _buildButton:function(){
        if(pslb.SUPPORT_CARDGAME){
            this._addButton(res.all_up, res.all_down, cc.p(0,0), pslb.gameWall.TodaySpecial);
            this._addButton(res.favorite_up, res.favorite_down, cc.p(0,0), pslb.gameWall.Favorite);
            this._addButton(res.hot_game_up, res.hot_game_down, cc.p(0,0), pslb.gameWall.HotGame);
            this._addButton(res.slot_up, res.slot_down, cc.p(0,0), pslb.gameWall.Slot);
            this._addButton(res.jackpot_up, res.jackpot_down, cc.p(0,0), pslb.gameWall.AsiaGame);
            this._addButton(res.featured_up, res.featured_up, cc.p(51,157), pslb.gameWall.Featured);
            // this._addButton(res.event_up, res.event_down, cc.p(8,537), pslb.gameWall.EventGame);
            this._addButton(res.arcade_up, res.arcade_down, cc.p(0,0), pslb.gameWall.Arcade);
            this._addButton(res.card_up, res.card_down, cc.p(0,0), pslb.gameWall.Card);
            this._addButton(res.fish_up, res.fish_down, cc.p(0,0), pslb.gameWall.Fish);
            this._addButton(res.close_up, res.close_up, cc.p(51,157), pslb.gameWall.Close);
            // this._addButton(res.challenge_up, res.challenge_down, cc.p(8,197), pslb.gameWall.Challenge);
            // this._addButton(res.ps_reward_up, res.ps_reward_down, cc.p(8,367), pslb.gameWall.PsReward);
        }
        else{
            this._addButton(res.today_up, res.today_down, cc.p(8,520), pslb.gameWall.TodaySpecial);
            this._addButton(res.favorite_up, res.favorite_down, cc.p(8,318), pslb.gameWall.Favorite);
            this._addButton(res.ps_reward_up, res.ps_reward_down, cc.p(8,217), pslb.gameWall.PsReward);
            this._addButton(res.all_game_up, res.all_game_down, cc.p(8,116), pslb.gameWall.AllGame);
            this._addButton(res.featured_up, res.featured_down, cc.p(8,419), pslb.gameWall.Featured);
            this._addButton(res.new_game_up, res.new_game_down, cc.p(8,520), pslb.gameWall.NewGame);//cc.p(8,419)
            this._addButton(res.challenge_up, res.challenge_down, cc.p(8,217), pslb.gameWall.Challenge);
            this._addButton(res.hot_game_up, res.hot_game_down, cc.p(8,318), pslb.gameWall.HotGame);
            this._addButton(res.jackpot_up, res.jackpot_down, cc.p(8,116), pslb.gameWall.AsiaGame);
            this._addButton(res.close_up, res.close_down, cc.p(8,419), pslb.gameWall.Close);//cc.p(8,520)
        }
    },

    openNormal:function(){
        this._isOpenNormal = true;
        if(pslb.SUPPORT_CARDGAME){
            this._btn_group.forEach(function(btn){btn.setVisible(false)});
            for (var i = 0; i <  this._btn_group.length; i++){
                if (this._btn_group[i] !== undefined){
                    if (i < 5){
                        this._btn_group[i].setVisible(true);
                    } else {
                        this._btn_group[i].setVisible(false);
                    }
                }
            }

            var index = 0;

            for (var i = 0; i <  this._btn_group.length; i++){
                if (this._btn_group[i] !== undefined && i <= 5){
                    index = i;
                    break;
                }
            }

            this._clickButton(index);

            this._feature_btn.setVisible(true);
            this._close_btn.setVisible(false);


            // this._btn_group[pslb.gameWall.TodaySpecial].setPosition(51,423);
            // this._btn_group[pslb.gameWall.Favorite].setPosition(51,423);
            // this._btn_group[pslb.gameWall.HotGame].setPosition(51,423);
            // this._btn_group[pslb.gameWall.Slot].setPosition(51,423);
            // this._btn_group[pslb.gameWall.AsiaGame].setPosition(51,423);
            // this._btn_group[pslb.gameWall.Featured].setPosition(51,423);

            this.reset_position();

            if (this._btn_group.length <= 5){
                this._feature_btn.setVisible(false);
                this._close_btn.setVisible(false);
            }

            if (BK.DEVICE_MODE === 1) return;
            var movetime = 0.25;
            // this._btn_group[pslb.gameWall.TodaySpecial].runAction(cc.moveTo(movetime,cc.p(51,595)));
            // this._btn_group[pslb.gameWall.Favorite].runAction(cc.moveTo(movetime,cc.p(51,509)));
            // this._btn_group[pslb.gameWall.HotGame].runAction(cc.moveTo(movetime,cc.p(51,423)));
            // this._btn_group[pslb.gameWall.Slot].runAction(cc.moveTo(movetime,cc.p(51,337)));
            // this._btn_group[pslb.gameWall.AsiaGame].runAction(cc.moveTo(movetime,cc.p(51,251)));
            // this._btn_group[pslb.gameWall.Featured].runAction(cc.moveTo(movetime,cc.p(51,157)));
        }
        else{
            this._btn_group.forEach(function(btn){btn.setVisible(false)});
            this._btn_group[pslb.gameWall.TodaySpecial].setVisible(true);
            if (this._btn_group[pslb.gameWall.HotGame]) this._btn_group[pslb.gameWall.HotGame].setVisible(true);
            if (this._btn_group[pslb.gameWall.AllGame]) this._btn_group[pslb.gameWall.AllGame].setVisible(true);
            this._btn_group[pslb.gameWall.Featured].setVisible(true);
            this._btn_group[pslb.gameWall.Favorite].setVisible(true);
            this._btn_group[pslb.gameWall.PsReward].setVisible(true);
            // this._btn_group[pslb.gameWall.AllGame].setVisible(true);
            this._clickButton(pslb.gameWall.HotGame !== undefined ? pslb.gameWall.HotGame : pslb.gameWall.TodaySpecial);

            this._btn_group[pslb.gameWall.TodaySpecial].setPosition(8,419);
            // this._btn_group[pslb.gameWall.Featured].setPosition(8,419);
            this._btn_group[pslb.gameWall.Favorite].setPosition(8,419);
            this._btn_group[pslb.gameWall.PsReward].setPosition(8,419);


            this._feature_btn.setVisible(false);
            this._close_btn.setVisible(true);

            // this._btn_group[pslb.gameWall.AllGame].setPosition(8,419);

            var movetime=0.25;
            // this._btn_group[pslb.gameWall.TodaySpecial].runAction(cc.moveTo(movetime,cc.p(8,520)));
            // this._btn_group[pslb.gameWall.Featured].runAction(cc.moveTo(movetime,cc.p(8,419)));
            // this._btn_group[pslb.gameWall.Favorite].runAction(cc.moveTo(movetime,cc.p(8,318)));
            // this._btn_group[pslb.gameWall.PsReward].runAction(cc.moveTo(movetime,cc.p(8,217)));
            // this._btn_group[pslb.gameWall.AllGame].runAction(cc.moveTo(movetime,cc.p(8,116)));
        }
    },

    openFeatured:function(){
        this._isOpenNormal = false;

        this._btn_group.forEach(function(btn){btn.setVisible(false)});

        for (var i = 0; i <  this._btn_group.length; i++){
            if (this._btn_group[i] !== undefined){
                if (i < 5){
                    this._btn_group[i].setVisible(false);
                } else {
                    this._btn_group[i].setVisible(true);
                }
            }
        }

        var index = 0;

        for (var i = 0; i <  this._btn_group.length; i++){
            if (this._btn_group[i] !== undefined && i > 4){
                index = i;
                break;
            }
        }

        this._clickButton(index);

        this._feature_btn.setVisible(false);
        this._close_btn.setVisible(true);

        if (this._btn_group.length <= 5){
            this._feature_btn.setVisible(false);
            this._close_btn.setVisible(false);
        }

    },

    _clickButton:function (btn_id) {
        var self = this;

        function onlyOneCondition(condition){
            self._filter.removeAllCondition();
            self._filter.addCondition(condition);
        }

        function switchCondition(condition){
            self._filter.hasCondition(condition)?
                self._filter.removeCondition(condition):
                self._filter.addCondition(condition);
            if(self._filter.getAllCondition().length == 0)
                self._filter.addCondition(condition);
        }

        function byGameId(a,b){
            return b.gameId.localeCompare(a.gameId);
        }

        function featured(a,b){
            if(a.label == b.label)
                return byGameId(a,b);
            else if(a.label == 0)
                return 1;
            else if(b.label == 0)
                return -1;
            else
                return  a.label - b.label;
        }

        function resetGamePage(compare, layout,pageId){
            var gameGroup = self._filter.getData(pageId);
            // if(cc.isFunction(compare))
            //     gameGroup.sort(compare);
            self._resetGamePage(gameGroup, layout);
        }

        pslb.gameWallFocusId=btn_id;

        if(btn_id == pslb.gameWall.TodaySpecial){
            // onlyOneCondition(pslb.isToday);
            // resetGamePage(null, new pslb.todayLayout(),pslb.gameWall.TodaySpecial);
            onlyOneCondition(pslb.isToday);
            resetGamePage(byGameId, new pslb.normalLayout(),pslb.gameWall.AllGame);
            this._isOpenNormal = true;

        }
        else if(btn_id == pslb.gameWall.Favorite) {
            onlyOneCondition(pslb.isFavorite);
            resetGamePage(byGameId, new pslb.normalLayout(), pslb.gameWall.Favorite);
            this._isOpenNormal = true;

        }
        else if(btn_id == pslb.gameWall.Card){
            onlyOneCondition(pslb.isCardGame);
            resetGamePage(byGameId, new pslb.normalLayout(),pslb.gameWall.Card);
            this._isOpenNormal = false;
        }
        else if(btn_id == pslb.gameWall.PsReward){
            onlyOneCondition(pslb.isPsReward);
            resetGamePage(byGameId, new pslb.normalLayout(),pslb.gameWall.PsReward);
        }
        else if(btn_id == pslb.gameWall.AllGame){
            onlyOneCondition(pslb.isAllGame);
            resetGamePage(byGameId, new pslb.normalLayout(),pslb.gameWall.AllGame);
        }
        else if(btn_id == pslb.gameWall.Challenge){
            onlyOneCondition(pslb.isChallengeGame);
            resetGamePage(featured, new pslb.normalLayout(),pslb.gameWall.Challenge);
        }
        else if(btn_id == pslb.gameWall.HotGame){
            onlyOneCondition(pslb.isHotGame);
            resetGamePage(featured, new pslb.normalLayout(),pslb.gameWall.HotGame);
            this._isOpenNormal = true;

        }
        else if(btn_id == pslb.gameWall.NewGame){
            onlyOneCondition(pslb.isNewGame);
            resetGamePage(featured, new pslb.normalLayout(),pslb.gameWall.NewGame);
        }
        else if(btn_id == pslb.gameWall.AsiaGame){
            onlyOneCondition(pslb.isAsiaGame);
            resetGamePage(featured, new pslb.normalLayout(),pslb.gameWall.AsiaGame);
            this._isOpenNormal = true;
        }
        else if(btn_id == pslb.gameWall.Close){
            self._filter.removeAllCondition();
            self.openNormal();
        }
        else if(btn_id == pslb.gameWall.Featured) {
            self._filter.removeAllCondition();
            self.openFeatured();
        }
        else if(btn_id == pslb.gameWall.Slot){
            onlyOneCondition(pslb.isSlotGame);
            resetGamePage(byGameId, new pslb.normalLayout(),pslb.gameWall.Slot);
            this._isOpenNormal = true;
        }
        else if(btn_id == pslb.gameWall.Fish){
            onlyOneCondition(pslb.isFishGame);
            resetGamePage(byGameId, new pslb.normalLayout(),pslb.gameWall.Fish);
            this._isOpenNormal = false;
        }
        else if(btn_id == pslb.gameWall.Arcade){
            onlyOneCondition(pslb.isArcadeGame);
            resetGamePage(byGameId, new pslb.normalLayout(),pslb.gameWall.Arcade);
            this._isOpenNormal = false;
        }
        else if(btn_id == pslb.gameWall.EventGame){
            // onlyOneCondition(pslb.isEventGame);
            // resetGamePage(byGameId, new pslb.normalLayout(),pslb.gameWall.EventGame);
        }

        self._refreshesButtonBright();

    },

    _resetGamePage:function (gameInfo, layout) {
        this._page.setGameItemInfo(gameInfo);
        this._page.setLayout(layout);
        this._page.refreshes();
        this._scrollView.removeAllChildren();

        var gameNum = gameInfo.length;

        var ScrollView_height = Math.ceil(gameNum/2);

        var isScroll = false;

        if (ScrollView_height > 4){
            isScroll = true;
        }

        this._scorll_size = cc.size(720, ScrollView_height * 233);

        this._scrollView.setInnerContainerSize(cc.size(this._scorll_size.width, this._scorll_size.height));//設置容器的大小

        for (var i = 0 ; i < gameNum; i++){
            var item = gameInfo[i];
            var game_item = new pslb.gameItem(item.gameId,item.strip,item.is_lock,item.label,item.disable,item.type,item.subId,item.commission_type);
            if (i % 2 === 0){
                game_item.setPositionX(167);
            } else {
                game_item.setPositionX(167 + 268);
            }
            if (isScroll){
                game_item.setPositionY(this._scorll_size.height - Math.floor(i / 2) * 233 - 130);
            } else {
                game_item.setPositionY(885 - Math.floor(i / 2) * 233);
            }
            game_item.setScale(0.9);
            this._scrollView.addChild(game_item);

        }

    },

    _refreshesButtonBright:function(){
        var self = this;
        self._btn_group.forEach(function(btn){btn.setBright(false);});
        function setBright(button_id, Condition){
            var has = self._filter.hasCondition(Condition);
            if (self._btn_group[button_id] !== undefined){
                self._btn_group[button_id].setBright(has);
            }
        }
        setBright(pslb.gameWall.TodaySpecial, pslb.isToday);
        if(pslb.SUPPORT_CARDGAME){
            setBright(pslb.gameWall.Slot, pslb.isSlotGame);
            setBright(pslb.gameWall.Arcade, pslb.isArcadeGame);
            setBright(pslb.gameWall.Card, pslb.isCardGame);
            setBright(pslb.gameWall.Fish, pslb.isFishGame);
        }
        setBright(pslb.gameWall.AsiaGame, pslb.isAsiaGame);
        setBright(pslb.gameWall.HotGame, pslb.isHotGame);
        setBright(pslb.gameWall.Favorite, pslb.isFavorite);
        // setBright(pslb.gameWall.PsReward, pslb.isPsReward);
        // setBright(pslb.gameWall.Challenge, pslb.isChallengeGame);
        // setBright(pslb.gameWall.EventGame, pslb.isEventGame);
        // setBright(pslb.gameWall.AllGame, pslb.isAllGame);
        // setBright(pslb.gameWall.NewGame, pslb.isNewGame);
    }
});

pslb.gameWall.TodaySpecial = 0;
pslb.gameWall.Favorite = 1;
pslb.gameWall.HotGame = 2;
pslb.gameWall.Slot = 3;
pslb.gameWall.AsiaGame = 4;
pslb.gameWall.Arcade = 5;
pslb.gameWall.Card = 6;
pslb.gameWall.Fish = 7;

pslb.gameWall.Group = [
    pslb.gameWall.TodaySpecial,
    pslb.gameWall.Favorite,
    pslb.gameWall.HotGame,
    pslb.gameWall.Slot,
    pslb.gameWall.AsiaGame,
    pslb.gameWall.Arcade,
    pslb.gameWall.Card,
    pslb.gameWall.Fish,
];

pslb.gameWall.Featured = 8;
pslb.gameWall.Close = 9;


pslb.gameWall.EventGame = 14;
pslb.gameWall.PsReward = 20;
pslb.gameWall.AllGame = 30;
pslb.gameWall.Challenge = 40;
pslb.gameWall.NewGame = 60;
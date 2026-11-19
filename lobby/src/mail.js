var Fake_Mail_Data = [
    {
        id:"1",
        type:0,   //(0=通知,1=領取獎勵)
        title:{eng:"CONGATULATIONS! CONGATULATIONS! CONGATULATIONS!"} ,// YOU NOW HAVE 6 FRIENDS TO JOINED.",
        date:"2017/09/01",
        content:{eng:
        "第一段CONTINUE PLAYING GAMES TO UPGRADE PLAYER'S LEVEL," +
        " AND PLAY HIGHER BET CAN UPGRADE PLAYER'S LEVEL NUCH FASTER. CONTINUE PLAYING GAMES" +
        " TO UPGRADE PLAYER'S LEVEL, AND PLAY HIGHER BET CAN UPGRADE PLAYER'S LEVEL MUCH. CONTINUE" +
        " PLAYING GAMES TO UPGRADE PLAY'S LEVEL, AND PLAY HIGHER BET."+
        " 第二段CONTINUE PLAYING GAMES TO UPGRADE PLAYER'S LEVEL," +
        " AND PLAY HIGHER BET CAN UPGRADE PLAYER'S LEVEL NUCH FASTER. CONTINUE PLAYING GAMES" +
        " TO UPGRADE PLAYER'S LEVEL, AND PLAY HIGHER BET CAN UPGRADE PLAYER'S LEVEL MUCH. CONTINUE" +
        " PLAYING GAMES TO UPGRADE PLAY'S LEVEL, AND PLAY HIGHER BET."+
        " 第三段CONTINUE PLAYING GAMES TO UPGRADE PLAYER'S LEVEL," +
        " AND PLAY HIGHER BET CAN UPGRADE PLAYER'S LEVEL NUCH FASTER. CONTINUE PLAYING GAMES" +
        " TO UPGRADE PLAYER'S LEVEL, AND PLAY HIGHER BET CAN UPGRADE PLAYER'S LEVEL MUCH. CONTINUE" +
        " PLAYING GAMES TO UPGRADE PLAY'S LEVEL, AND PLAY HIGHER BET."+
        " 第四段CONTINUE PLAYING GAMES TO UPGRADE PLAYER'S LEVEL," +
        " AND PLAY HIGHER BET CAN UPGRADE PLAYER'S LEVEL NUCH FASTER. CONTINUE PLAYING GAMES" +
        " TO UPGRADE PLAYER'S LEVEL, AND PLAY HIGHER BET CAN UPGRADE PLAYER'S LEVEL MUCH. CONTINUE" +
        " PLAYING GAMES TO UPGRADE PLAY'S LEVEL, AND PLAY HIGHER BET."+
        " 第五段CONTINUE PLAYING GAMES TO UPGRADE PLAYER'S LEVEL," +
        " AND PLAY HIGHER BET CAN UPGRADE PLAYER'S LEVEL NUCH FASTER. CONTINUE PLAYING GAMES" +
        " TO UPGRADE PLAYER'S LEVEL, AND PLAY HIGHER BET CAN UPGRADE PLAYER'S LEVEL MUCH. CONTINUE" +
        " PLAYING GAMES TO UPGRADE PLAY'S LEVEL, AND PLAY HIGHER BET."+
        " 第六段CONTINUE PLAYING GAMES TO UPGRADE PLAYER'S LEVEL," +
        " AND PLAY HIGHER BET CAN UPGRADE PLAYER'S LEVEL NUCH FASTER. CONTINUE PLAYING GAMES" +
        " TO UPGRADE PLAYER'S LEVEL, AND PLAY HIGHER BET CAN UPGRADE PLAYER'S LEVEL MUCH. CONTINUE" +
        " PLAYING GAMES TO UPGRADE PLAY'S LEVEL, AND PLAY HIGHER BET."},
        is_read:false
    },
    {
        id:"2",
        type:1,
        title:{eng:"信件二-領取獎勵"},
        date:"2017/09/02",
        content:{eng:"信件二內容"},
        is_read:false
    },
    {
        id:"3",
        type:1,
        title:{eng:"信件三-領取獎勵"},
        date:"2017/09/03",
        content:{eng:"信件三內容"},
        is_read:true
    },
    {
        id:"4",
        type:0,
        title:{eng:"信件四"},
        date:"2017/09/04",
        content:{eng:"信件四內容"},
        is_read:true
    },
    {
        id:"5",
        type:0,
        title:{eng:"信件五"},
        date:"2017/09/05",
        content:{eng:"信件五內容"},
        is_read:true
    }
];


pslb.MailTitleLimt={
    eng:30,
    sch:25,
    tch:25
};

pslb.MailPageNode = cc.Layer.extend({
    _MailReader:null,
    _MailList:null,
    ctor:function () {
        this._super();
        var self=this;
        self.setName("MailPageNode");

        var black=new cc.Sprite(res.bg_dark);
        black.setAnchorPoint(0,0);
        black.setPosition(0,0);
        self.addChild(black);
        this._black = black

    },

    reset_position:function(){
        if (BK.DEVICE_MODE === 0){
            this._black.setScale(1);
        } else {
            this._black.setScaleY(2);
        }

        if(this._MailList)
            this._MailList.reset_position();

        if(this._MailReader)
            this._MailReader.reset_position();

    },

    openMailList:function () {
        var self=this;

        if(self._MailList)
            this.removeChild(self._MailList);

        self._MailList=new MailList();
        self._MailList.reset_position();
        self.addChild(self._MailList);

        this._MailList.updateData(pslb.mailBox.container);//Fake_Mail_Data
    },
    setMailReader:function (mail_id) {
        var self=this;
        if(self._MailReader)
            self.removeChild(self._MailReader);
        self._MailReader = new MailReader();
        self._MailReader.setPosition(0,0);
        self.addChild(self._MailReader);
        self._MailReader.setReaderCurPage(pslb.mailBox.container, mail_id);//Fake_Mail_Data
        self._MailReader.setVisible(true);
        self._MailReader.reset_position();

    },
    _closeMailReader:function () {
        var self=this;
        if(self._MailReader)
            self.removeChild(self._MailReader);
        this.openMailList();
    }
});

var MailReader = cc.Layer.extend({
    _lisenter:null,
    ctor:function () {
        var self=this;

        self._super();
        self.setName("MailReader");
        self._bg=new cc.Sprite(res.inbox_bg);
        this.addChild(self._bg);

        this._inbox_title = new cc.Sprite(res.inbox_title);
        this._bg.addChild(this._inbox_title);

        this._scrollView = new ccui.ScrollView();
        this._scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this._scrollView.setTouchEnabled(true);
        this._scrollView.setBounceEnabled(true);
        this._scrollView.setContentSize(cc.size(827,405)); //827,414
        this._scrollView.setPosition(459,self._bg.height-100);
        this._scrollView.setAnchorPoint(0.5,1);
        this._bg.addChild(this._scrollView);
        //
        this._scrollView.addEventListenerScrollView(function (sender,type) {
            if(type==ccui.ScrollView.EVENT_SCROLLING){
                self._AutoBarPercent();
            }
        },this);

        this._scrollView_m = new ccui.ScrollView();
        this._scrollView_m.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this._scrollView_m.setTouchEnabled(true);
        this._scrollView_m.setBounceEnabled(true);
        this._scrollView_m.setContentSize(720,960);
        this._scrollView_m.setPosition(341,1001);
        this._scrollView_m.setAnchorPoint(0.5,1);
        this._bg.addChild(this._scrollView_m);
        //
        this._scrollView_m.addEventListenerScrollView(function (sender,type) {
            if(type==ccui.ScrollView.EVENT_SCROLLING){
                self._AutoBarPercent();
            }
        },this);


        self._barNode = new cc.Node();
        self._barNode.setPosition(840,467);
        self._barNode.setAnchorPoint(0.5,0.5);
        self._barNode.setRotation(90);
        this._bg.addChild(self._barNode);

        // new ccui.Slider(background picture ,bar picture , type)
        self._bar = new pslb.Slider(
            res.scrollbar_bg_png,
            res.scrollbar_thumb_png,
            ccui.Widget.LOCAL_TEXTURE);
        self._bar.setTouchEnabled(true);
        self._bar.setScale9Enabled(true);
        self._bar.setAnchorPoint(0,0);
        self._bar.setPosition(0,0);
        self._bar.addEventListenerSlider(function (sender,type) {
            if(type==ccui.Widget.TOUCH_BEGAN){
                var percent=self._bar.getPercent();
                self._scrollView.jumpToPercentVertical(percent);
            }
        },self._bg);
        self._barNode.addChild(self._bar);

        self._bar_m = new pslb.Slider(
            res.scrollbar_bg_m_png,
            res.scrollbar_thumb_png,
            ccui.Widget.LOCAL_TEXTURE);
        self._bar_m.setTouchEnabled(true);
        self._bar_m.setScale9Enabled(true);
        self._bar_m.setAnchorPoint(0,0);
        self._bar_m.setPosition(-480,-10);
        self._bar_m.addEventListenerSlider(function (sender, type) {
            if(type==ccui.Widget.TOUCH_BEGAN)
                var percent=self._bar_m.getPercent();
               self._scrollView_m.jumpToPercentVertical(percent);
        },this);
        self._barNode.addChild(self._bar_m);

    },

    reset_position:function(){
        var self=this;
        var size = cc.winSize;
        self._bg.setPosition(size.width/2,size.height/2);

        self._scrollView.setVisible(!BK.DEVICE_MODE);
        self._scrollView_m.setVisible(BK.DEVICE_MODE);

        if (BK.DEVICE_MODE === 0){
            self._close_btn.setPosition(850,506);
            this._inbox_title.setPosition(459,504);
            self._barNode.setPosition(840,467);
            self._bg.setTexture(res.inbox_bg);

            if(self._scrollView.getInnerContainerSize().height <= self._scrollView.getContentSize().height)
                self._bar.setVisible(false);
            else
                self._bar.setVisible(true);

            self._bar_m.setVisible(false);
        } else {
            self._close_btn.setPosition(656,1088);
            self._bg.setTexture(res.inbox_bg_m);
            this._inbox_title.setPosition(360,1069);
            self._barNode.setPosition(662,535);

            if(self._scrollView.getInnerContainerSize().height <= self._scrollView.getContentSize().height)
                self._bar_m.setVisible(false);
            else
                self._bar_m.setVisible(true);

            self._bar.setVisible(false);
        }

    },

    onEnter:function () {
        this._super();
        var self=this;
        if(!this._lisenter)
            this._lisenter=cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function(){
                    var visible=self.isVisible();
                    cc.log(self.getName()+" visible="+visible);
                    return visible;
                }.bind(this)
            }, this);


        this._createCloseBtn();
    },
    onExit:function () {
        this._super();

        if(this._lisenter)
            cc.eventManager.removeListener(this._lisenter);
    },
    _createCloseBtn:function () {
        var self=this;
        //Close Button
        self._bg.removeChild(self._close_btn);
        self._close_btn =new ccui.Button(res.inbox_close_up, res.inbox_close_down, res.inbox_close_down);
        self._close_btn.addTouchEventListener(function(touch, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                self._close();
            }
        },self._bg);
        self._close_btn.setAnchorPoint(0.5,0.5);

        self._bg.addChild(self._close_btn);
    },

    setReaderCurPage:function (data,mail_id) {
        var self=this;
        self.setVisible(true);
        self._scrollView.removeAllChildren();
        self._scrollView_m.removeAllChildren();
        var pageData;
        data.forEach(function (e) {
            if(e.id==mail_id){
                return pageData= e;
            }
        });

        var title = pageData.title[pslb.Language] || pageData.title[pslb.LanguageGroup.eng];
        var content = pageData.content[pslb.Language] || pageData.content[pslb.LanguageGroup.eng];

        var page = new pslb.MailReaderLayout(
            self._scrollView.width,self._scrollView.height,
            pageData.id,pageData.type,title,content,pageData.is_read, false);
        page.setAnchorPoint(0,0);
        page.setPosition(0,0);
        self._scrollView.setInnerContainerSize(page.getContentSize());

        var page_m = new pslb.MailReaderLayout(
            self._scrollView_m.width,self._scrollView_m.height,
            pageData.id,pageData.type,title,content,pageData.is_read, true);

        self._scrollView_m.setInnerContainerSize(page_m.getContentSize());

        page.check_btn.addTouchEventListener(function (touch, type) {
            if(ccui.Widget.TOUCH_ENDED == type){
                var mail_id = Number(page.check_btn.getTag());
                pslb.model.mail(mail_id).then(function (mail_id) {
                    //success
                    cc.log("mail_success");
                    self.getParent()._MailList.set_item_isRead(mail_id,true);
                    self._close();
                },function (error) {
                    //fail
                    cc.log("mail_error="+error);
                });
            }
        },this);

        page_m.check_btn.addTouchEventListener(function (touch, type) {
            if(ccui.Widget.TOUCH_ENDED == type){
                var mail_id = Number(page_m.check_btn.getTag());
                pslb.model.mail(mail_id).then(function (mail_id) {
                    //success
                    cc.log("mail_success");
                    self.getParent()._MailList.set_item_isRead(mail_id,true);
                    self._close();
                },function (error) {
                    //fail
                    cc.log("mail_error="+error);
                });
            }
        },this);


        self._AutoBarPercent();
        if(self._scrollView.getInnerContainerSize().height<=self._scrollView.getContentSize().height)
            self._bar.setVisible(false);
        else
            self._bar.setVisible(true);

        if(self._scrollView_m.getInnerContainerSize().height<=self._scrollView_m.getContentSize().height)
            self._bar_m.setVisible(false);
        else
            self._bar_m.setVisible(true);

        self._scrollView.addChild(page);
        self._scrollView_m.addChild(page_m);
        this.reset_position();

    },

    _AutoBarPercent:function () {
        var self=this;
        var target=self._scrollView;
        var cSize = target.getContentSize();
        var inner = target.getInnerContainer();
        var inSize = target.getInnerContainerSize();
        var verValue = cSize.height - inSize.height;
        var percentY = (100 * inner.y - verValue)/(-verValue) + 99;

        var target_m = self._scrollView_m;
        var cSize_m = target_m.getContentSize();
        var inner_m = target_m.getInnerContainer();
        var inSize_m = target_m.getInnerContainerSize();
        var verValue_m = cSize_m.height - inSize_m.height;
        var percentY_m = (100 * inner_m.y - verValue_m)/(-verValue_m) + 99;

        // cc.log(" percentY= "+ Math.floor(percentY));
        self._bar.setPercent(percentY);
        self._bar_m.setPercent(percentY_m);

    },
    _close:function(){
        var self=this;
        self.setVisible(false);
        pslb.mailBox.sortMail();
        self.getParent()._closeMailReader();
    }
});

var MailList = cc.Layer.extend({
    _MailReader:null,
    _listView:null,
    _dataLength:5,
    _itemHeight:100,
    _list_arr:[],

    _lisenter:null,
    ctor:function () {
        var size=cc.winSize;
        var self=this;
        self._super();
        self.setName("MailList");
        self._bg=new cc.Sprite(res.inbox_bg);
        self.addChild(self._bg);

        this._inbox_title = new cc.Sprite(res.inbox_title);
        this._bg.addChild(this._inbox_title);

        self._listView = new ccui.ScrollView();
        // set list view ex direction
        self._listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        self._listView.setTouchEnabled(true);
        self._listView.setBounceEnabled(true);
        self._listView.setInertiaScrollEnabled(true);
        // self._listView.setItemsMargin(5);  //Gap
        self._listView.setContentSize(self._bg.width,self._bg.height-156);
        // self._listView.setInnerContainerSize(cc.size(self._bg.width-50,self._bg.height-105));
        self._listView.setAnchorPoint(0.5,0.5);

        self._listView.setBackGroundImageScale9Enabled(true);
        self._bg.addChild(self._listView);

        // set model
        // self._listView.setItemModel(new pslb.MailItemLayout());
        // self._listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);
        self._listView.addEventListener(self._selectedEvent, self);


        self._barNode=new cc.Node();
        self._barNode.setAnchorPoint(0.5,0.5);
        self._barNode.setRotation(90);
        self._bg.addChild(self._barNode);

        // new ccui.Slider(background picture ,bar picture , type)
        self._bar = new pslb.Slider(
            res.scrollbar_bg_png,
            res.scrollbar_thumb_png,
            ccui.Widget.LOCAL_TEXTURE);
        self._bar.setTouchEnabled(true);
        self._bar.setScale9Enabled(true);
        self._bar.setAnchorPoint(0,0);
        self._bar.setPosition(0,0);
        self._bar.addEventListenerSlider(function (sender, type) {
            if(type==ccui.Widget.TOUCH_BEGAN)
                self._listView.jumpToPercentVertical(self._bar.getPercent());
        },this);
        self._barNode.addChild(self._bar);

        self._bar_m = new pslb.Slider(
            res.scrollbar_bg_m_png,
            res.scrollbar_thumb_png,
            ccui.Widget.LOCAL_TEXTURE);
        self._bar_m.setTouchEnabled(true);
        self._bar_m.setScale9Enabled(true);
        self._bar_m.setAnchorPoint(0,0);
        self._bar_m.setPosition(-480,-10);
        self._bar_m.addEventListenerSlider(function (sender, type) {
            if(type==ccui.Widget.TOUCH_BEGAN)
                self._listView.jumpToPercentVertical(self._bar_m.getPercent());
        },this);
        self._barNode.addChild(self._bar_m);

        self._AutoBarPercent();
        self._createCloseBtn();
    },

    reset_position:function(){
        var self=this;
        var size=cc.winSize;
        self._bg.setPosition(size.width/2,size.height/2);
        if (BK.DEVICE_MODE === 0){
            self._listView.setPosition(459,261);
            self._bg.setTexture(res.inbox_bg);
            self._close_btn.setPosition(850,506);
            self._inbox_title.setPosition(459,504);
            self._listView.setContentSize(self._bg.width,self._bg.height-156);

            self._list_arr.forEach(function(item, index){
                item.setPosition(0,self._listView.getInnerContainerSize().height-self._itemHeight*(index+1));
                item.reset_position();
            });
            self._barNode.setPosition(840,467);

            if(self._listView.getInnerContainerSize().height <= self._listView.getContentSize().height)
                self._bar.setVisible(false);
            else
                self._bar.setVisible(true);

            self._bar_m.setVisible(false);

        } else {
            self._bg.setTexture(res.inbox_bg_m);
            self._close_btn.setPosition(656,1088);
            self._inbox_title.setPosition(360,1069);
            self._listView.setPosition(329,541);
            self._listView.setContentSize(self._bg.width,self._bg.height - 206);
            self._list_arr.forEach(function(item, index){
                item.setPosition(0, self._listView.getInnerContainerSize().height - self._itemHeight*(index + 1));
                item.reset_position();
            });
            self._barNode.setPosition(662,535);

            if(self._listView.getInnerContainerSize().height <= self._listView.getContentSize().height)
                self._bar_m.setVisible(false);
            else
                self._bar_m.setVisible(true);

            self._bar.setVisible(false);

        }
    },

    onEnter:function () {
        this._super();
        var self=this;
        if(!this._lisenter)
            this._lisenter=cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function(){
                    var visible=self.isVisible();
                    cc.log(self.getName()+" visible="+visible);
                    return visible;
                }.bind(this)
            }, this);

    },
    onExit:function () {
        this._super();

        if(this._lisenter)
            cc.eventManager.removeListener(this._lisenter);
    },
    _createCloseBtn:function () {
        var self=this;
        ////Close Button
        self._bg.removeChild(self._close_btn);
        self._close_btn =new ccui.Button(res.inbox_close_up, res.inbox_close_down, res.inbox_close_down);
        self._close_btn.addTouchEventListener(function(touch, type){
            if(type == ccui.Widget.TOUCH_ENDED){
                pslb.dispatchCustomEvent(pslb.CustomEvent.PageEnabled,
                    {
                        id:pslb.PageId.mail,
                        enabled: false
                    });
            }
        },self);
        self._bg.addChild(self._close_btn);

        this.reset_position();
    },
    updateData:function (data) {
        data=data || [];
        var self=this;

        self._list_arr=[];
        self._listView.removeAllChildren();

        self._bar.setVisible(false);

        if(data.length>0)
        {
            self._listView.setInnerContainerSize(cc.size(1000, (data.length*self._itemHeight)));//639

            self._AutoBarPercent();
            if(self._listView.getInnerContainerSize().height <= self._listView.getContentSize().height)
                self._bar.setVisible(false);
            else
                self._bar.setVisible(true);

            self._list_arr=[];
            for (var i = 0; i < data.length; ++i) {
                var item = new pslb.MailItemLayout(self._listView.width-10,self._itemHeight);
                item.setTag(data[i].id);
                var button = item.button;
                button.setTag(data[i].id);
                button.setBright(!data[i].is_read);
                button.addTouchEventListener(function (touch,type) {
                    if(type == ccui.Widget.TOUCH_ENDED)
                        self.getParent().setMailReader(touch.getTag());
                },self);

                var title= item.title;

                var limitLen=pslb.MailTitleLimt[pslb.Language]?
                    pslb.MailTitleLimt[pslb.Language]:
                    pslb.MailTitleLimt[pslb.LanguageGroup.eng];

                var data_title=data[i].title[pslb.Language] || data[i].title[pslb.LanguageGroup.eng];
                data_title.length>limitLen ?
                    title.setString(data_title.substr(0,limitLen)+"...")
                    :title.setString(data_title.substr(0,limitLen));

                var is_read=item.is_read;
                is_read.setTexture(data[i].is_read?res.mail_review:res.mail_new);
                item._is_read_flag = data[i].is_read;

                item.setPosition(0,self._listView.getInnerContainerSize().height-self._itemHeight*(i+1));
                item.reset_position();
                self._listView.addChild(item);
                self._list_arr.push(item);
            }
        }

    },
    _selectedEvent: function (sender, type) {
        switch (type) {
            case ccui.ScrollView.EVENT_SCROLLING:
               this._AutoBarPercent();
                break;
        }
    },
    _AutoBarPercent:function () {
        var target=this._listView;
        var cSize = target.getContentSize();
        var inner = target.getInnerContainer().getPosition();
        var inSize = target.getInnerContainerSize();
        var verValue = cSize.height - inSize.height;
        var percentY = (100 * inner.y - verValue)/(-verValue) + 99;
        // cc.log(" percentY= "+ Math.floor(percentY));
        this._bar.setPercent(percentY);
    },
    set_item_isRead:function (mail_id,bool) {
        this._list_arr.forEach(function (e) {
            if(e.getTag()==mail_id){
                e.is_read.setTexture(bool?res.mail_review:res.mail_new);
                e.button.setBright(!bool);
            }
        })
    }
});

pslb.MailItemLayout = ccui.Layout.extend({
    button:null,
    title:null,
    is_read:null,
    _is_read_flag:false,
    ctor:function (width,height) {
        this._super();
        var self=this;
        // var default_item = new ccui.Layout();
        this.setTouchEnabled(true);
        this.setContentSize(cc.size(width,height));
        //
        this.button = new ccui.Button(res.mail_bg_up_bg,res.mail_bg_down_bg,res.mail_bg_down_bg);
        this.button.setTitleFontName(pslb.TTFName);
        this.button.titleFontSize = 18;
        this.button.setTouchEnabled(true);
        this.button.setAnchorPoint(0,0.5);
        this.button.setPosition(72,49);
        this.addChild(this.button);

        this.title = new cc.LabelTTF("Title", pslb.TTFNamebyLanguage, 22);
        this.title.setAnchorPoint(0,0.5);
        this.title.setPosition(150,49);
        this.addChild(this.title);

        this.is_read=new cc.Sprite(res.mail_new);
        this.is_read.setAnchorPoint(0,0);
        this.addChild(this.is_read);

    },

    reset_position : function(){
        if(BK.DEVICE_MODE === 0){
            if (this._is_read_flag === false){
                this.button.loadTextureNormal(res.mail_bg_up_bg);
                this.button.loadTexturePressed(res.mail_bg_down_bg);
                this.button.loadTextureDisabled(res.mail_bg_down_bg);
            } else {
                this.button.loadTextureNormal(res.mail_bg_down_bg);
                this.button.loadTexturePressed(res.mail_bg_down_bg);
                this.button.loadTextureDisabled(res.mail_bg_down_bg);
            }

            this.is_read.setPosition(671,29);

        } else {
            if (this._is_read_flag === false){
                this.button.loadTextureNormal(res.mail_bg_m_up);
                this.button.loadTexturePressed(res.mail_bg_m_down);
                this.button.loadTextureDisabled(res.mail_bg_m_down);
            } else {
                this.button.loadTextureNormal(res.mail_bg_m_down);
                this.button.loadTexturePressed(res.mail_bg_m_down);
                this.button.loadTextureDisabled(res.mail_bg_m_down);
            }

            this.is_read.setPosition(545,29);

        }
    }

});

pslb.MailReaderLayout= ccui.Layout.extend({
    title:null,
    content:null,
    ctor:function (width,height,id,type,title,content,isread, isVertical) {
        this._super();
        width=width||0;
        height=height||0;
        id=id||0;
        type=type||0;
        title=title||"";
        content=content||"";
        isread=isread||false;
        var innerWidth=width-100;
        this.title=new cc.LabelTTF(title, pslb.TTFNamebyLanguage, 40,cc.size(innerWidth,0),cc.TEXT_ALIGNMENT_CENTER);
        this.title.enableStroke(cc.color(255,0,0),0.5);
        this.title.setFontFillColor(cc.color(254, 235, 0));
        this.title.setAnchorPoint(0.5,1);
        this.addChild(this.title);

        this.content=new cc.LabelTTF(content, pslb.TTFNamebyLanguage , 22,cc.size(innerWidth,0),cc.TEXT_ALIGNMENT_CENTER);
        this.content.setAnchorPoint(0.5,1);
        this.addChild(this.content);
        this.content.setDimensions( this.content.getContentSize().width, this.content.getContentSize().height + 100);

        var resCheckBtn={
            0:{
                normal:res.okay_up,
                selected:res.okay_down,
                disable:res.okay_down
            },
            1:{
                normal:res.takeit_up,
                selected:res.takeit_down,
                disable:res.takeit_down
            }
        };


        var pic=resCheckBtn[type];
        this.check_btn=new ccui.Button(pic.normal,pic.selected,pic.disable);
        this.check_btn.setTag(id);
        this.check_btn.setAnchorPoint(0.5,0);
        this.check_btn.setBright(!isread);
        this.check_btn.setVisible(!isread);
        this.addChild(this.check_btn);


        var gap = 50;
        var valheight=(this.title.height+gap)+this.content.height+(gap+this.check_btn.height);
        if(valheight<height) valheight=height;
        this.setContentSize(innerWidth,valheight);
        this.title.setPosition(width/2,valheight);
        this.content.setPosition(width/2,valheight-this.title.height);
        this.check_btn.setPosition(width/2,this.check_btn.height/2);

    }
});

pslb.Slider = ccui.Slider.extend({
    ctor:function(barTextureName, normalBallTextureName, resType){
        this._super(barTextureName, normalBallTextureName, resType);
    },
    setPercent: function (percent) {
        if (percent > 100)
            percent = 100;
        if (percent < 0)
            percent = 0;
        this._percent = percent;
        var res = percent / 100.0;
        var dis = (this._barLength-this._contentSize.height*2)* res;
        this._slidBallRenderer.setPosition(dis+(this._contentSize.height), this._contentSize.height / 2);
        if (this._scale9Enabled)
            this._progressBarRenderer.setPreferredSize(cc.size(dis, this._contentSize.height));
        else {
            var spriteRenderer = this._progressBarRenderer;
            var rect = spriteRenderer.getTextureRect();
            spriteRenderer.setTextureRect(
                cc.rect(rect.x, rect.y, dis / spriteRenderer._scaleX, rect.height),
                spriteRenderer.isTextureRectRotated()
            );
        }
    }
});


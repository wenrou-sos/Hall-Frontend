var pslb = pslb || {};

var checkByLabel = function(label){
    return function (item) {
        if(item.label == label)
            return true;
        else
            return false;
    }
}

var checkById = function(id_group){
    return function(item){
        for(var i = 0; i < id_group.length; i++){
            if(item.gameId == id_group[i])
                return true;
        }
        return false;
    }
}

var checkByType = function(type){
    return function (item) {
        if(item.type == type)
            return true;
        else
            return false;
    }
}

pslb.isNewGame = checkByLabel(1);

pslb.isHotGame = checkByLabel(2);

pslb.isChallengeGame = checkByLabel(3);

pslb.isToday = checkById([
    "PSS-ON-00049","PSS-ON-00050","PSS-ON-00051","PSS-ON-00052","PSS-ON-00053",
    "PSS-ON-00054","PSS-ON-00055","PSS-ON-00056","PSS-ON-00060","PSS-ON-00061"
]);

pslb.isFavorite = checkById([
    "PSS-ON-00006","PSS-ON-00007","PSS-ON-00008","PSS-ON-00009","PSS-ON-00010",
    "PSS-ON-00016","PSS-ON-00017","PSS-ON-00018","PSS-ON-00019","PSS-ON-00020",
    "PSS-ON-00026","PSS-ON-00027","PSS-ON-00028","PSS-ON-00029","PSS-ON-00030"]);

pslb.isPsReward = checkById([
    "PSS-ON-10019","PSS-ON-10025"]);

pslb.isEventGame =  checkById([
    "PSS-ON-00006","PSS-ON-00007","PSS-ON-00008","PSS-ON-00009","PSS-ON-00010",
    "PSS-ON-00016","PSS-ON-00017","PSS-ON-00018","PSS-ON-00019","PSS-ON-00020",
    "PSS-ON-00026","PSS-ON-00027","PSS-ON-00028","PSS-ON-00029","PSS-ON-00030"]);

pslb.isAsiaGame =  checkById([
    "PSS-ON-00001","PSS-ON-00011","PSS-ON-00016","PSS-ON-00019","PSS-ON-00033",
    "PSS-ON-00037","PSS-ON-00038","PSS-ON-00044","PSS-ON-00054","PSS-ON-00067",
    "PSS-ON-00068","PSS-ON-00070","PSS-ON-00073","PSS-ON-00078","PSS-ON-00082",
    "PSS-ON-10019"]);

pslb.isSlotGame =  checkByType("SLOT");

pslb.isCardGame =  checkByType("CARD");

pslb.isFishGame =  checkByType("FISH");

pslb.isArcadeGame =  checkByType("ARCADE");

pslb.isAllGame = function(item){return true;};

pslb.orFilter = cc.Class.extend({
    ctor:function(itemGroup){
        this._itemGroup = itemGroup;
        this._condition = [];
    },

    check:function(item){
        for(var i = 0; i < this._condition.length; i++){
            if(this._condition[i](item) == true)
                return true;
        }
        return false;
    },

    getData:function(id){

        var ret;
        switch (id)
        {
            case pslb.gameWall.TodaySpecial:
                ret= this._itemGroup.today_special;
                break;
            case pslb.gameWall.Favorite:
                ret= this._itemGroup.favorite_pick;
                break;
            case pslb.gameWall.PsReward:
                ret= this._itemGroup.ps_award;
                break;
            case pslb.gameWall.AllGame:
                ret= this._itemGroup.all;
                break;
            case pslb.gameWall.Challenge:
                ret= this._itemGroup.challenge;
                break;
            case pslb.gameWall.EventGame:
                ret= this._itemGroup.eventgame;
                break;
            case pslb.gameWall.HotGame:
                ret= this._itemGroup.hot;
                break;
            case pslb.gameWall.NewGame:
                ret= this._itemGroup.new;
                break;
            case pslb.gameWall.AsiaGame:
                ret= this._itemGroup.asia;
                break;
            case pslb.gameWall.Featured:
                ret= this._itemGroup.favorite;
                break;
            case pslb.gameWall.Slot:
                ret= this._itemGroup.slot;
                break;
            case pslb.gameWall.Card:
                ret= this._itemGroup.card;
                break;
            case pslb.gameWall.Fish:
                ret= this._itemGroup.fish;
                break;
            case pslb.gameWall.Arcade:
                ret= this._itemGroup.arcade;
                break;
        }

        // var ret = this._itemGroup.slice();
        //  ret = ret.slice();
        // for(var i = 0; i < ret.length; i++){
        //     if(this.check(ret[i]) == false){
        //         ret.splice(i,1);
        //         i--;
        //     }
        // }
        return ret;
    },

    addCondition:function(condition) {
        var index = this._condition.indexOf(condition);
        if(index <= -1)
            this._condition.push(condition);
    },

    removeCondition:function(condition){
        var index = this._condition.indexOf(condition);
        if(index > -1)
            this._condition.splice(index, 1);
    },

    removeAllCondition: function() {
        this._condition.length = 0;
    },

    hasCondition:function(condition){
        var index = this._condition.indexOf(condition);
        return index > -1 ? true:false;
    },

    getAllCondition:function(){
        return this._condition;
    }
});

pslb.layout = cc.Class.extend({
    pc_attr:[],
    mobile_attr:[],
    cur_attr:null,

    ctor:function(){

    },

    enableMobileMode:function(mobile){
        this.cur_attr = mobile ? this.mobile_attr : this.pc_attr;
    },

    maxGameItem:function(){
        return this.cur_attr.length;
    },

    maxPage:function(){
        return 0;
    },

    run:function(target){
        var all_game_item = target.getAllGameItem();
        var length = Math.min(all_game_item.length, this.cur_attr.length);
        for(var i = 0; i < length; i++)
            all_game_item[i].attr(this.cur_attr[i])
    }
});

pslb.normalLayout = pslb.layout.extend({
    ctor:function(){
        this.pc_attr = [
            {x: 22,  y: 363},
            {x: 213,  y: 363},
            {x: 404,  y: 363},
            {x: 595,  y: 363},
            {x: 786,  y: 363},
            {x: 977, y: 363},
            {x: 22,  y: 202},
            {x: 213,  y: 202},
            {x: 404,  y: 202},
            {x: 595,  y: 202},
            {x: 786,  y: 202},
            {x: 977, y: 202},
            {x: 22,  y: 42},
            {x: 213,  y: 42},
            {x: 404,  y: 42},
            {x: 595,  y: 42},
            {x: 786,  y: 42},
            {x: 977, y: 42}
        ];

        this.pc_attr.forEach(function(attrs){
            attrs["scale"] = 0.69;
            attrs["anchorX"] = 0;
            attrs["anchorY"] = 0;
        });

        this.mobile_attr = [
            {x: 39,  y: 292},
            {x: 316, y: 292},
            {x: 593, y: 292},
            {x: 870, y: 292},
            {x: 39,  y: 48},
            {x: 316, y: 48},
            {x: 593, y: 48},
            {x: 870, y: 48}
        ];

        this.mobile_attr.forEach(function(attrs){
            attrs["scale"] = 1;
            attrs["anchorX"] = 0;
            attrs["anchorY"] = 0;
        });

        this.enableMobileMode(cc.sys.isMobile);
    },

    maxPage:function(){
        return 200;
    }
});

pslb.todayLayout = pslb.layout.extend({
    ctor:function(){

        this.pc_attr = [
            {x: 22,  y: 202, strip: true},
            {x: 213, y: 363},
            {x: 404, y: 363},
            {x: 595, y: 363},
            {x: 786, y: 363},
            {x: 977, y: 363},
            {x: 213, y: 202},
            {x: 404, y: 202},
            {x: 595, y: 202},
            {x: 786, y: 202},
            {x: 977, y: 202},
            {x: 22,  y: 42},
            {x: 213, y: 42},
            {x: 404, y: 42},
            {x: 595, y: 42},
            {x: 786, y: 42},
            {x: 977, y: 42}
        ];

        this.pc_attr.forEach(function(attrs){
            attrs["scale"] = 0.6915;
            attrs["anchorX"] = 0;
            attrs["anchorY"] = 0;
        });

        this.mobile_attr = [
            {x: 39,  y: 48, strip: true},
            {x: 316, y: 292},
            {x: 593, y: 292},
            {x: 870, y: 292},
            {x: 316, y: 48},
            {x: 593, y: 48},
            {x: 870, y: 48}
        ];
        this.mobile_attr.forEach(function(attrs){
            attrs["scale"] = 1;
            attrs["anchorX"] = 0;
            attrs["anchorY"] = 0;
        });

        this.enableMobileMode(cc.sys.isMobile);
    },

    maxPage:function(){
        return 1;
    },
});

pslb.ButtonPos = {
    0 : [
        cc.p(51,595),
        cc.p(51,509),
        cc.p(51,423),
        cc.p(51,337),
        cc.p(51,251),
        cc.p(51,595),
        cc.p(51,509),
        cc.p(51,423),
        cc.p(51,337),
        cc.p(51,251),
        cc.p(51,595),
        cc.p(51,509)
    ],
    1 : [
        cc.p(61,976),
        cc.p(61,873),
        cc.p(61,770),
        cc.p(61,667),
        cc.p(61,564),
        cc.p(61,461),
        cc.p(61,358),
        cc.p(61,255),
        cc.p(61,152),
        cc.p(61,49),
        cc.p(61,-54),
        cc.p(61,-157)
    ],
};


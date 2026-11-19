var pslb = pslb || {};

var all_wheel = [];
//=========Silver=========
all_wheel.push((function(){
    var ret = new pslb.proto.BigChallenge.Wheel();
    ret.level_code = 0;
    ret.ps_coin = 1;
    ret.highestPay = 3000000;
    ret.external.push({type: 0, id: 0, pay:0});
    ret.external.push({type: 0, id: 1, pay:500});
    ret.external.push({type: 0, id: 2, pay:1000});
    ret.external.push({type: 1, id: 3, TriggerGame:{game_id: "game4", game_type:0, times:3}});
    ret.external.push({type: 1, id: 4, TriggerGame:{game_id: "game5", game_type:0, times:3}});
    ret.external.push({type: 1, id: 5, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.external.push({type: 1, id: 6, TriggerGame:{game_id: "game3", game_type:1, times:1}});
    ret.external.push({type: 1, id: 7, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.external.push({type: 2, id: 8});
    ret.external.push({type: 1, id: 9, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.internal.push({type: 1, id: 0, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 1, pay:20000});
    ret.internal.push({type: 0, id: 2, pay:30000});
    ret.internal.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 4, pay:10000});
    ret.internal.push({type: 3, id: 5, random_pay:[100000,500000,1000000,3000000]});
    ret.internal.push({type: 0, id: 6, pay:10000});
    ret.internal.push({type: 0, id: 7, pay:20000});
    return ret;
})())

all_wheel.push((function(){
    var ret = new pslb.proto.BigChallenge.Wheel();
    ret.level_code = 0;
    ret.ps_coin = 2;
    ret.highestPay = 6000000;
    ret.external.push({type: 0, id: 0, pay:1000});
    ret.external.push({type: 0, id: 1, pay:2000});
    ret.external.push({type: 1, id: 2, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.external.push({type: 1, id: 3, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 4, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.external.push({type: 1, id: 5, TriggerGame:{game_id: "game3", game_type:1, times:1}});
    ret.external.push({type: 1, id: 6, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.external.push({type: 2, id: 7});
    ret.external.push({type: 1, id: 8, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 9, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.internal.push({type: 1, id: 0, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 1, pay:40000});
    ret.internal.push({type: 0, id: 2, pay:60000});
    ret.internal.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 4, pay:20000});
    ret.internal.push({type: 3, id: 5, random_pay:[200000,1000000,2000000,6000000]});
    ret.internal.push({type: 0, id: 6, pay:20000});
    ret.internal.push({type: 0, id: 7, pay:40000});
    return ret;
})())

all_wheel.push((function(){
    var ret = new pslb.proto.BigChallenge.Wheel();
    ret.level_code = 0;
    ret.ps_coin = 3;
    ret.highestPay = 9000000;
    ret.external.push({type: 0, id: 0, pay:1500});
    ret.external.push({type: 0, id: 1, pay:3000});
    ret.external.push({type: 1, id: 2, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.external.push({type: 1, id: 3, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 4, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.external.push({type: 1, id: 5, TriggerGame:{game_id: "game3", game_type:1, times:1}});
    ret.external.push({type: 1, id: 6, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.external.push({type: 2, id: 7});
    ret.external.push({type: 1, id: 8, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 2, id: 9});
    ret.internal.push({type: 1, id: 0, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 1, pay:60000});
    ret.internal.push({type: 0, id: 2, pay:90000});
    ret.internal.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 4, pay:30000});
    ret.internal.push({type: 3, id: 5, random_pay:[300000,1500000,3000000,9000000]});
    ret.internal.push({type: 0, id: 6, pay:30000});
    ret.internal.push({type: 0, id: 7, pay:60000});
    return ret;
})())
//=========Gold=========
all_wheel.push((function(){
    var ret = new pslb.proto.BigChallenge.Wheel();
    ret.level_code = 1;
    ret.ps_coin = 1;
    ret.highestPay = 3000000;
    ret.external.push({type: 0, id: 0, pay:0});
    ret.external.push({type: 0, id: 1, pay:500});
    ret.external.push({type: 0, id: 2, pay:1000});
    ret.external.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.external.push({type: 1, id: 4, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 5, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.external.push({type: 1, id: 6, TriggerGame:{game_id: "game3", game_type:1, times:1}});
    ret.external.push({type: 1, id: 7, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.external.push({type: 2, id: 8});
    ret.external.push({type: 1, id: 9, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.internal.push({type: 1, id: 0, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 1, pay:20000});
    ret.internal.push({type: 0, id: 2, pay:30000});
    ret.internal.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 4, pay:10000});
    ret.internal.push({type: 3, id: 5, random_pay:[100000,500000,1000000,3000000]});
    ret.internal.push({type: 0, id: 6, pay:10000});
    ret.internal.push({type: 0, id: 7, pay:20000});

    return ret;
})())

all_wheel.push((function(){
    var ret = new pslb.proto.BigChallenge.Wheel();
    ret.level_code = 1;
    ret.ps_coin = 2;
    ret.highestPay = 6000000;
    ret.external.push({type: 0, id: 0, pay:1000});
    ret.external.push({type: 0, id: 1, pay:2000});
    ret.external.push({type: 1, id: 2, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.external.push({type: 1, id: 3, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 4, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.external.push({type: 1, id: 5, TriggerGame:{game_id: "game3", game_type:1, times:1}});
    ret.external.push({type: 1, id: 6, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.external.push({type: 2, id: 7});
    ret.external.push({type: 1, id: 8, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 9, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.internal.push({type: 1, id: 0, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 1, pay:40000});
    ret.internal.push({type: 0, id: 2, pay:60000});
    ret.internal.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 4, pay:20000});
    ret.internal.push({type: 3, id: 5, random_pay:[200000,1000000,2000000,6000000]});
    ret.internal.push({type: 0, id: 6, pay:20000});
    ret.internal.push({type: 0, id: 7, pay:40000});
    return ret;
})())

all_wheel.push((function(){
    var ret = new pslb.proto.BigChallenge.Wheel();
    ret.level_code = 1;
    ret.ps_coin = 3;
    ret.highestPay = 9000000;
    ret.external.push({type: 0, id: 0, pay:1500});
    ret.external.push({type: 0, id: 1, pay:3000});
    ret.external.push({type: 1, id: 2, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.external.push({type: 1, id: 3, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 4, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.external.push({type: 1, id: 5, TriggerGame:{game_id: "game3", game_type:1, times:1}});
    ret.external.push({type: 1, id: 6, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.external.push({type: 2, id: 7});
    ret.external.push({type: 1, id: 8, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 2, id: 9});
    ret.internal.push({type: 1, id: 0, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 1, pay:60000});
    ret.internal.push({type: 0, id: 2, pay:90000});
    ret.internal.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 4, pay:30000});
    ret.internal.push({type: 3, id: 5, random_pay:[300000,1500000,3000000,9000000]});
    ret.internal.push({type: 0, id: 6, pay:30000});
    ret.internal.push({type: 0, id: 7, pay:60000});
    return ret;
})())
//=========Ruby=========
all_wheel.push((function(){
    var ret = new pslb.proto.BigChallenge.Wheel();
    ret.level_code = 2;
    ret.ps_coin = 1;
    ret.highestPay = 6000000;
    ret.external.push({type: 0, id: 0, pay:0});
    ret.external.push({type: 0, id: 1, pay:500});
    ret.external.push({type: 0, id: 2, pay:1000});
    ret.external.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.external.push({type: 1, id: 4, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 5, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.external.push({type: 1, id: 6, TriggerGame:{game_id: "game3", game_type:1, times:1}});
    ret.external.push({type: 1, id: 7, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.external.push({type: 2, id: 8});
    ret.external.push({type: 1, id: 9, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.internal.push({type: 1, id: 0, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 1, pay:20000});
    ret.internal.push({type: 0, id: 2, pay:30000});
    ret.internal.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 4, pay:10000});
    ret.internal.push({type: 3, id: 5, random_pay:[100000,500000,1000000,6000000]});
    ret.internal.push({type: 0, id: 6, pay:10000});
    ret.internal.push({type: 0, id: 7, pay:20000});
    return ret;
})())

all_wheel.push((function(){
    var ret = new pslb.proto.BigChallenge.Wheel();
    ret.level_code = 2;
    ret.ps_coin = 2;
    ret.highestPay = 12000000;
    ret.external.push({type: 0, id: 0, pay:1000});
    ret.external.push({type: 0, id: 1, pay:2000});
    ret.external.push({type: 1, id: 2, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.external.push({type: 1, id: 3, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 4, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.external.push({type: 1, id: 5, TriggerGame:{game_id: "game3", game_type:1, times:1}});
    ret.external.push({type: 1, id: 6, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.external.push({type: 2, id: 7});
    ret.external.push({type: 1, id: 8, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 9, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.internal.push({type: 1, id: 0, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 1, pay:40000});
    ret.internal.push({type: 0, id: 2, pay:60000});
    ret.internal.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 4, pay:20000});
    ret.internal.push({type: 3, id: 5, random_pay:[200000,100000,2000000,12000000]});
    ret.internal.push({type: 0, id: 6, pay:20000});
    ret.internal.push({type: 0, id: 7, pay:40000});
    return ret;
})())

all_wheel.push((function(){
    var ret = new pslb.proto.BigChallenge.Wheel();
    ret.level_code = 2;
    ret.ps_coin = 3;
    ret.highestPay = 18000000;
    ret.external.push({type: 0, id: 0, pay:1500});
    ret.external.push({type: 0, id: 1, pay:3000});
    ret.external.push({type: 1, id: 2, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.external.push({type: 1, id: 3, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 4, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.external.push({type: 1, id: 5, TriggerGame:{game_id: "game3", game_type:1, times:1}});
    ret.external.push({type: 1, id: 6, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.external.push({type: 2, id: 7});
    ret.external.push({type: 1, id: 8, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 2, id: 9});
    ret.internal.push({type: 1, id: 0, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 1, pay:60000});
    ret.internal.push({type: 0, id: 2, pay:90000});
    ret.internal.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 4, pay:30000});
    ret.internal.push({type: 3, id: 5, random_pay:[300000,150000,3000000,18000000]});
    ret.internal.push({type: 0, id: 6, pay:30000});
    ret.internal.push({type: 0, id: 7, pay:60000});
    return ret;
})())
//=========Diamond=========
all_wheel.push((function(){
    var ret = new pslb.proto.BigChallenge.Wheel();
    ret.level_code = 3;
    ret.ps_coin = 1;
    ret.highestPay = 9000000;
    ret.external.push({type: 0, id: 0, pay:0});
    ret.external.push({type: 0, id: 1, pay:500});
    ret.external.push({type: 0, id: 2, pay:1000});
    ret.external.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.external.push({type: 1, id: 4, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 5, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.external.push({type: 1, id: 6, TriggerGame:{game_id: "game3", game_type:1, times:1}});
    ret.external.push({type: 1, id: 7, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.external.push({type: 2, id: 8});
    ret.external.push({type: 1, id: 9, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.internal.push({type: 1, id: 0, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 1, pay:20000});
    ret.internal.push({type: 0, id: 2, pay:30000});
    ret.internal.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 4, pay:10000});
    ret.internal.push({type: 3, id: 5, random_pay:[100000,500000,1000000,9000000]});
    ret.internal.push({type: 0, id: 6, pay:10000});
    ret.internal.push({type: 0, id: 7, pay:20000});
    return ret;
})())

all_wheel.push((function(){
    var ret = new pslb.proto.BigChallenge.Wheel();
    ret.level_code = 3;
    ret.ps_coin = 2;
    ret.highestPay = 18000000;
    ret.external.push({type: 0, id: 0, pay:1000});
    ret.external.push({type: 0, id: 1, pay:2000});
    ret.external.push({type: 1, id: 2, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.external.push({type: 1, id: 3, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 4, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.external.push({type: 1, id: 5, TriggerGame:{game_id: "game3", game_type:1, times:1}});
    ret.external.push({type: 1, id: 6, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.external.push({type: 2, id: 7});
    ret.external.push({type: 1, id: 8, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 9, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.internal.push({type: 1, id: 0, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 1, pay:40000});
    ret.internal.push({type: 0, id: 2, pay:60000});
    ret.internal.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 4, pay:20000});
    ret.internal.push({type: 3, id: 5, random_pay:[200000,1000000,2000000,18000000]});
    ret.internal.push({type: 0, id: 6, pay:20000});
    ret.internal.push({type: 0, id: 7, pay:40000});
    return ret;
})())

all_wheel.push((function(){
    var ret = new pslb.proto.BigChallenge.Wheel();
    ret.level_code = 3;
    ret.ps_coin = 3;
    ret.highestPay = 27000000;
    ret.external.push({type: 0, id: 0, pay:1500});
    ret.external.push({type: 0, id: 1, pay:3000});
    ret.external.push({type: 1, id: 2, TriggerGame:{game_id: "game1", game_type:0, times:3}});
    ret.external.push({type: 1, id: 3, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 1, id: 4, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.external.push({type: 1, id: 5, TriggerGame:{game_id: "game3", game_type:1, times:1}});
    ret.external.push({type: 1, id: 6, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.external.push({type: 2, id: 7});
    ret.external.push({type: 1, id: 8, TriggerGame:{game_id: "game2", game_type:0, times:3}});
    ret.external.push({type: 2, id: 9});
    ret.internal.push({type: 1, id: 0, TriggerGame:{game_id: "game2", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 1, pay:60000});
    ret.internal.push({type: 0, id: 2, pay:90000});
    ret.internal.push({type: 1, id: 3, TriggerGame:{game_id: "game1", game_type:1, times:1}});
    ret.internal.push({type: 0, id: 4, pay:30000});
    ret.internal.push({type: 3, id: 5, random_pay:[300000,1500000,3000000,27000000]});
    ret.internal.push({type: 0, id: 6, pay:30000});
    ret.internal.push({type: 0, id: 7, pay:60000});
    return ret;
})())

var findWheel = function(level, ps_coin){
    var ret = null;
    for(var i = 0; i < all_wheel.length; i++)
        if(all_wheel[i].level_code == level &&
            all_wheel[i].ps_coin == ps_coin){
            ret = all_wheel[i];
            break;
        }
    return ret;
}

var randPay = function(Pays){
    var rand = Math.floor(Math.random() * (Pays.length - 1));
    return Pays[rand];
}

var randAward = function(Awards){
    var rand = Math.floor(Math.random() * (Awards.length - 1));
    var award =  Awards[rand];
    if(award.type == 1 || award.type == 3) // trigger game or random pay;
        return randAward(Awards);
    else{
        var ret = new pslb.proto.BigChallenge.Result();
        ret.type = award.type;
        ret.id = award.id;
        if(ret.type == 0)
            ret.pay = award.pay;
        else if(ret.type == 3)
            ret.pay = randPay(award.random_pay);
        return ret;
    }

}

var createBcResult = function(level, ps_coin){
    var ret = [];
    var wheel = findWheel(level, ps_coin);
    if(wheel){
        var external_r = randAward(wheel.external);
        ret.push(external_r);
        if(external_r.type == 2){
            var internal_r = randAward(wheel.internal);
            ret.push(internal_r);
        }
    }
    return ret;
}
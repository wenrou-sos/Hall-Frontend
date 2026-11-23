var pslb = pslb || {};
var BK = BK || {};

pslb.SUPPORT_CARDGAME=true;
pslb.isBigChallenge=false;
pslb.UrlVariablesName = {
    Lang: "lang",
    AccessToken: "access_token",
    Currency:"ccy",
    PlayMode:"pm"
};

pslb.UrlVariables = function(){
    var ret = {};
    var page_url = window.location.search.substring(1);
    var variables = page_url.split('&');
    for (var i = 0; i < variables.length; i++) {
        var parameter = variables[i].split('=');
        ret[parameter[0]] = parameter[1];
    }
    return ret;
}();


// pm=0 RealPlay ,  pm=1 FreePlay
pslb.isRealPlay = function(){
    var ret = pslb.UrlVariables[pslb.UrlVariablesName.PlayMode] || 0;
    return (ret==0)? true: false;
}();


pslb.Volume = function(){
    var ret = 1;
    cc.audioEngine.setMusicVolume(ret);
    cc.audioEngine.setEffectsVolume(ret);

    return ret ;
}();

pslb.LobbyVolume=pslb.Volume;
window.getLobbyVolume=function () {
    pslb.LobbyVolume=pslb.Volume;
};



pslb.LanguageGroup = {
    eng:"eng",
    sch:"sch",
    tch:"tch",
    mys:"mys",
    esp:"esp",
    tai:"tai",
    ind:"ind",
    kor:"kor",
    vie:"vie"
};

pslb.Language = function(){
    var ret = (window.localStorage && localStorage.getItem("ps_lang")) || pslb.LanguageGroup.sch;
    var url_variable = pslb.UrlVariables[pslb.UrlVariablesName.Lang];
    for(var i in pslb.LanguageGroup)
        if(i == url_variable)
            ret = url_variable;
    if (!(ret in pslb.LanguageGroup)) ret = pslb.LanguageGroup.sch;
    return ret;
}();

pslb.TextGroup = {};

pslb.TextGroup[pslb.LanguageGroup.eng] = {
    Error: "Network is disconnected",
    Credit:'Credit',
    DemoMode:"DEMO",
    ComingSoon:"COMING SOON",
    FontSize:20
};

pslb.TextGroup[pslb.LanguageGroup.sch] = {
    Error: "网路断线 ",
    Credit:'彩分',
    DemoMode:"试玩",
    ComingSoon:"敬请期待",
    FontSize:26
};

pslb.TextGroup[pslb.LanguageGroup.tch] = {
    Error: "網路斷線",
    Credit:'彩分',
    DemoMode:"試玩",
    ComingSoon:"敬請期待",
    FontSize:26
};

pslb.TextGroup[pslb.LanguageGroup.mys] = {
    Error: "Network is disconnected",
    Credit:'Credit',
    DemoMode:"DEMO",
    ComingSoon:"COMING SOON",
    FontSize:20
};

pslb.TextGroup[pslb.LanguageGroup.esp] = {
    Error: "Network is disconnected",
    Credit:'Credit',
    DemoMode:"DEMO",
    ComingSoon:"COMING SOON",
    FontSize:20
};

pslb.TextGroup[pslb.LanguageGroup.tai] = {
    Error: "Network is disconnected",
    Credit:'Credit',
    DemoMode:"DEMO",
    ComingSoon:"COMING SOON",
    FontSize:20
};
pslb.TextGroup[pslb.LanguageGroup.ind] = {
    Error: "Network is disconnected",
    Credit:'Credit',
    DemoMode:"DEMO",
    ComingSoon:"COMING SOON",
    FontSize:20
};
pslb.TextGroup[pslb.LanguageGroup.kor] = {
    Error: "Network is disconnected",
    Credit:'Credit',
    DemoMode:"DEMO",
    ComingSoon:"COMING SOON",
    FontSize:20
};
pslb.TextGroup[pslb.LanguageGroup.vie] = {
    Error: "Network is disconnected",
    Credit:'Credit',
    DemoMode:"DEMO",
    ComingSoon:"COMING SOON",
    FontSize:20
};

pslb.Text = pslb.TextGroup[pslb.Language] || pslb.TextGroup[pslb.LanguageGroup.eng];

pslb.TTFName = "Myriad Pro-Bold";

pslb.TTFNamebyLanguage = function(){
    var ret= "Myriad Pro-Bold";
    switch (pslb.Language)
    {
        case pslb.LanguageGroup.eng:
            ret= "Myriad Pro-Bold";
            break;
        case pslb.LanguageGroup.tch:
            ret="Microsoft JhengHei";
            break;
        case pslb.LanguageGroup.sch:
            ret="Microsoft JhengHei";
            break;
        default:
            ret= "Myriad Pro-Bold";
            break;
    }

    return ret;
}();



pslb.Currency=function () {
    var currency= pslb.UrlVariables[pslb.UrlVariablesName.Currency];

    var _currency="¥";
    switch (currency){
        case "CNY":
            _currency="¥";
            break;
        case "USD":
            _currency="$";
            break;
        case undefined:
            _currency=null;
            break;
        default:
            _currency="¥";
            break;
    }

    return _currency;
}();

pslb.CustomEvent = {
    Error: 1,
    Update: 2,
    PageEnabled:3
};

pslb.ErrorCode = {
    Disconnect : 1,
    LoginFail: 2,
    TimeOut : 3,
    OverFlow: 4,
    HostFail: 5,
    MailFail:6
}

pslb.PageId = {
    main : 1,
    bigChallenge: 2,
    help : 3,
    mail:4,
    bgwhelp:5,
    levelup:6,
    jpwin:7,
    ps_reward_week:8
};

pslb.Promise = function(fn) {

    var PENDING = 0;
    var FULFILLED = 1;
    var REJECTED = 2;

    var state = PENDING;
    var value = null;
    var handlers = [];

    function fulfill(result) {
        state = FULFILLED;
        value = result;
        handlers.forEach(handle);
        handlers = null;
    }

    function reject(error) {
        state = REJECTED;
        value = error;
        handlers.forEach(handle);
        handlers = null;
    }

    function getThen(value) {
        var t = typeof value;
        if (value && (t === 'object' || t === 'function')) {
            var then = value.then;
            if (typeof then === 'function') {
                return then;
            }
        }
        return null;
    }

    function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
            fn(function (value) {
                if (done) return
                done = true
                onFulfilled(value)
            }, function (reason) {
                if (done) return
                done = true
                onRejected(reason)
            })
        } catch (ex) {
            if (done) return
            done = true
            onRejected(ex)
        }
    }

    function resolve(result) {
        try {
            var then = getThen(result);
            if (then) {
                doResolve(then.bind(result), resolve, reject)
                return
            }
            fulfill(result);
        } catch (e) {
            reject(e);
        }
    }

    function handle(handler) {
        if (state === PENDING) {
            handlers.push(handler);
        } else {
            if (state === FULFILLED &&
                typeof handler.onFulfilled === 'function') {
                handler.onFulfilled(value);
            }
            if (state === REJECTED &&
                typeof handler.onRejected === 'function') {
                handler.onRejected(value);
            }
        }
    }

    doResolve(fn, resolve, reject);

    this.done = function (onFulfilled, onRejected) {
        setTimeout(function () {
            handle({
                onFulfilled: onFulfilled,
                onRejected: onRejected
            });
        }, 0);
    }

    this.then = function (onFulfilled, onRejected) {
        var self = this;
        return new pslb.Promise(function (resolve, reject) {
            return self.done(function (result) {
                if (typeof onFulfilled === 'function') {
                    try {
                        return resolve(onFulfilled(result));
                    } catch (ex) {
                        return reject(ex);
                    }
                } else {
                    return resolve(result);
                }
            }, function (error) {
                if (typeof onRejected === 'function') {
                    try {
                        return resolve(onRejected(error));
                    } catch (ex) {
                        return reject(ex);
                    }
                } else {
                    return reject(error);
                }
            });
        });
    }
};

pslb.dispatchCustomEvent = function(event, data){
    var e = new cc.EventCustom(event);
    e.setUserData(data);
    cc.eventManager.dispatchEvent(e);
};

pslb.toNumber = function(low,high,unsigned){
    var ret = new dcodeIO.Long(low, high, unsigned).toNumber();
    // the precision is 53 bits
    if(ret > Math.pow(2,53) -1 || ret < -Math.pow(2,53)){
        var e = new cc.EventCustom(pslb.CustomEvent.Error);
        e.setUserData(pslb.ErrorCode.OverFlow);
        cc.eventManager.dispatchEvent(e);
    }
    return ret;
};

/*It is modified when publishing*/
pslb.OpenBank = function(){
    document.location.href = "http://24h.pchome.com.tw/";
};

/*It is modified when publishing*/
pslb.OpenFreeGame = function(id){
    document.location.href = pslb.BuildLaunchURL(id, 0);
};

/*It is modified when publishing*/
pslb.OpenRealGame = function(id,sub_id){
    document.location.href = pslb.BuildLaunchURL(id, sub_id);
};

/*It is modified when publishing*/
pslb.GetLang = function(){ var m = window.location.search.match(/[?&]lang=([^&]+)/); if (m) return m[1]; return (window.localStorage && localStorage.getItem("ps_lang")) || "sch"; };
pslb.BuildWebSocket = function(onsuccess){
    var socket = new WebSocket("ws://" + window.location.host + "/ws/lobby");
    socket.binaryType = "arraybuffer";
    socket.onopen = function(){ onsuccess(socket);};
};

/*It is modified when publishing*/
pslb.BuildLaunchURL=function(game_id, subgame_id) {
    //return "./AutoClosePage/";

    if (game_id === "PSF-ON-00001") { return window.location.origin + "/g/PSF-ON-00001/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSC-ON-00001") { return window.location.origin + "/g/PSC-ON-00001/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSF-ON-00002") { return window.location.origin + "/g/PSF-ON-00002/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSF-ON-00003") { return window.location.origin + "/g/PSF-ON-00003/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSF-ON-00004") { return window.location.origin + "/g/PSF-ON-00004/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSF-ON-00005") { return window.location.origin + "/g/PSF-ON-00005/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSF-ON-00006") { return window.location.origin + "/g/PSF-ON-00006/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSF-ON-00007") { return window.location.origin + "/g/PSF-ON-00007/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSC-ON-00007") { return window.location.origin + "/g/PSC-ON-00007/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSC-ON-00008") { return window.location.origin + "/g/PSC-ON-00008/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSC-ON-00013") { return window.location.origin + "/g/PSC-ON-00013/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSC-ON-00014") { return window.location.origin + "/g/PSC-ON-00014/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSC-ON-00016") { return window.location.origin + "/g/PSC-ON-00016/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSC-ON-00009") { return window.location.origin + "/g/PSC-ON-00009/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-APP-00009") { return window.location.origin + "/g/PSS-APP-00009/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-APP-00019") { return window.location.origin + "/g/PSS-APP-00019/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-APP-00025") { return window.location.origin + "/g/PSS-APP-00025/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-APP-00035") { return window.location.origin + "/g/PSS-APP-00035/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-APP-00065") { return window.location.origin + "/g/PSS-APP-00065/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-APP-00104") { return window.location.origin + "/g/PSS-APP-00104/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-APP-00110") { return window.location.origin + "/g/PSS-APP-00110/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-APP-00111") { return window.location.origin + "/g/PSS-APP-00111/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-APP-00112") { return window.location.origin + "/g/PSS-APP-00112/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-ON-00147") { return window.location.origin + "/g/PSS-ON-00147/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-ON-00148") { return window.location.origin + "/g/PSS-ON-00148/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-ON-00149") { return window.location.origin + "/g/PSS-ON-00149/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-ON-00150") { return window.location.origin + "/g/PSS-ON-00150/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-ON-00152") { return window.location.origin + "/g/PSS-ON-00152/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-ON-00153") { return window.location.origin + "/g/PSS-ON-00153/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-ON-00154") { return window.location.origin + "/g/PSS-ON-00154/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "kys-h5-99988") { return window.location.origin + "/g/kys-h5-99988/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "kys-h5-99989") { return window.location.origin + "/g/kys-h5-99989/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "kys-h5-99990") { return window.location.origin + "/g/kys-h5-99990/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "kys-h5-99993") { return window.location.origin + "/g/kys-h5-99993/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "kys-h5-99998") { return window.location.origin + "/g/kys-h5-99998/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "kys-h5-99999") { return window.location.origin + "/g/kys-h5-99999/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSC-ON-00016-new") { return window.location.origin + "/g/PSC-ON-00016-new/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    if (game_id === "PSS-ON-00019") { return window.location.origin + "/g/PSS-ON-00019/?access_token=***&subid=" + subgame_id + "&lang=" + pslb.GetLang(); }
    return window.location.origin + "/g/" + game_id + "/?access_token=dev&subid=" + subgame_id + "&lang=" + pslb.GetLang(); /*repair50: generic launch for all whitelisted games*/

};

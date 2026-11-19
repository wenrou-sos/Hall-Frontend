var pslb = pslb || {};

pslb.CREDITMODE = {
    CENT: 0,
    DOLLAR: 1,
    CREDIT: 2
};

var DEF_GAMEID = "PS-LOBBY";

var SpriteInPlist = cc.Sprite.extend({
    ctor : function (rcname) {
        var pFrame = cc.spriteFrameCache.getSpriteFrame(rcname);
        this._super(pFrame);
    },

    getIsSign : function () {
        return true;
    }
});

var GetURLParameter = function (sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
    return '';
};

var g_getCreditmode = function() {
    var mode = GetURLParameter("sm");
    if (mode.length === 0) {
        return  null;
    } else if (mode.substr(0,1) == '0') {
        return pslb.CREDITMODE.CENT;
    } else if ( mode.substr(0,1) == '1') {
        return pslb.CREDITMODE.DOLLAR;
    } else if ( mode.substr(0,1) == '2') {
        // return pslb.CREDITMODE.CREDIT;
        return  pslb.CREDITMODE.CENT;
    }
};

var g_format_credit = function (credit_num, flag) {
    var credit = credit_num.toString();
    var invformat = "";
    var format = "";
    var comma = ',';
    if (flag && flag.noComma) {
        comma = '';
    }

    for (var i = 0; i < credit.length; i++) {
        var c = credit.charAt(credit.length - i - 1);
        if (i % 3 === 0 && i !== 0) {
            invformat = invformat + comma + c;
        } else {
            invformat += c;
        }
    }
    for (var i = 0; i < invformat.length; i++) {
        format += invformat.charAt(invformat.length - i - 1);
    }
    return format;
};


var g_format_cent = function (cent_num, flag) {
    var cent = cent_num.toString();
    var decimal = "";
    var integer = "";
    var format = "";
    var dot = '.';

    if (g_getCreditmode() === pslb.CREDITMODE.DOLLAR) {
        if (cent < 100) {
            format = '0';
        } else {
            decimal = cent.substr(cent.length - 2, 2);
            integer = cent.substr(0, cent.length - 2);
            if (flag && flag.digitK && integer.length >= flag.digitK) {
                integer = g_format_K_unit(integer);
                format = 'K';
            }
            format = g_format_credit(integer, flag) + format;
        }
    } else {
        if (cent < 100) {
            if (cent < 10) {
                format = '0' + dot + '0' + cent;
            } else {
                format = '0' + dot + cent;
            }
        } else {
            decimal = cent.substr(cent.length - 2, 2);
            integer = cent.substr(0, cent.length - 2);
            format = g_format_credit(integer);
            format = format + dot + decimal;
        }
    }
    return format;
};

var g_format_accountion_unit = function (cent_num, flag) {
    var currency = GetURLParameter("ccy");
    var accounting_unit = "";
    if (pslb.systemInfo._accounting_unit > 0) {
        accounting_unit = pslb.systemInfo._accounting_unit.toString();
    } else {
        cc.log("accounting unit error!, accounting unit = " + pslb.systemInfo._accounting_unit);
        return 0;
    }
    var cent = cent_num.toString();
    var format = "";
    var decimal = "";
    var integer = "";
    var format = "";
    var dot = '.';
    var length = accounting_unit.length - 1;
    if (length === 0) {
        dot = "";
    }
    if (cent_num < accounting_unit) {
        for (var i = 0; i < (accounting_unit.length - cent_num.toString().length); i++) {
            if (i === accounting_unit.length - cent_num.toString().length - 1) {
                format = "0" + dot + format;
            } else {
                format = "0" + format;
            }
        }
        format = format + cent_num;
        if (flag && flag.noDot) {
            format = clearZero(format);
        }
    } else {
        decimal = cent.substr(cent.length - length, length);
        integer = cent.substr(0, cent.length - length);
        if (flag && flag.digitK && integer.length >= flag.digitK) {
            integer = g_format_K_unit(integer);
            format = 'K';
            decimal = '';
        }
        format = g_format_credit(integer, flag) + format;
        if (flag && flag.noDot) {
            decimal = clearZero(decimal);
        }
        format = decimal === "" ? format : format + dot + decimal;
    }

    if (flag && flag.currency && currency.length) {
        format = format + " " + currency;
    }

    return format;
};

var g_format_K_unit = function (num) {
    var digitK = 4;
    var str = num.toString();
    var format = str.substr(0, str.length - digitK + 1);
    return format;
};

var clearZero = function (str) {
    for (var i = str.length - 1; i >= 0; i--) {
        if (str[i] === '0') {
            var temp = str;
            str = '';
            for (var j = 0; j < i; j++) {
                str += temp[j];
            }
        } else if (str[i] !== '0') {
            break;
        }
    }
    return str;
};

var adjustObjSize = function (obj, maxWidth) {
    var width = obj.getContentSize().width;
    var scale = maxWidth / width;
    if (width > maxWidth) {
        obj.setScale(maxWidth / width);
        return scale;
    } else {
        obj.setScale(1);
        return 1;
    }
};

var checkMultiCurrency = function (currency) {
    if (currency === 'IDR' || currency === 'MYR' || currency === 'THB') {
        return true;
    }
    return false;
};

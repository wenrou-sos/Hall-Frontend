/**
 * Created by howardchou on 2015/9/6.
 */
/**
 * test code
 * initial:
 this.jp=new JPnum_manager(this,res.number_jp,res.number_comma,res.number_dot,40,10);
 this.jp.setPosition(500,100);
 this.addChild(this.jp,20);
 this.jp.IniNumber(20000);
 *
 * update:
 this.jp.updateNum(next_num);
 */
pslb.JPCONFIG = {
    isEUR:false,
    TOTAL_DIGI:15,
    MAX_DIGI_SPEED:0.1,  //(pixels/ms)
    LV1_SPEED:0.2,
    LV2_SPEED:0.01,
    LV3_SPEED:0.08,
    MIN_DIGI_SPEED:0.0001, //(pixels/ms)
    RESIDUAL_NUM:600      //cent
};

var JPnum_manager=cc.Sprite.extend({
   //12,345,678.90
    _num_pos_map:[],
    _num_sprite:[],
    _comma_sprite:[],
    _dot_sprite:null,
    _num_w:0,
    _num_h:0,
    _mark_w:0,
    _mark_h:0,
    _cur_number_str:'0.00',
    _cur_number:0,
    _target_number:0,
    _owner:null,
    _shift_x:0,
    _numScale:1,
    _originX:0,
    _originY:0,
    ctor:function(owner,resNum,resComma,resDot,num_h,Zorder){

        this._super();

        this._owner=owner;
        if(Zorder==undefined){
            Zorder=0;
        }
        this._num_pos_map=[];
        this._num_sprite=[];
        this._comma_sprite=[];

        for(var i=0 ; i< pslb.JPCONFIG.TOTAL_DIGI; i++) {
           this._num_sprite.push( new JPnum(this,resNum, num_h,i) );
            this._num_sprite[i].setTag(i);
            this._owner.addAnm(this._num_sprite[i],Zorder);
            this._num_sprite[i].setVisible(false);
       }
        var stSize = this._num_sprite[0].getContentSize();
        this._num_w=stSize.width;
        this._num_h=stSize.height;

        var totaldigi=pslb.JPCONFIG.TOTAL_DIGI;
          var comma_cnt= Math.floor((totaldigi-2)/3);

        if(pslb.JPCONFIG.isEUR==true){

            for(i=0;i<comma_cnt;i++){

                this._comma_sprite.push(new cc.Sprite(resDot));
                this._owner.addAnm(this._comma_sprite[i],Zorder);
                this._comma_sprite[i].setAnchorPoint(0, 0);
                this._comma_sprite[i].setVisible(false);
            }
            this._dot_sprite=new cc.Sprite(resComma);
            this._owner.addAnm(this._dot_sprite,Zorder);
            this._dot_sprite.setAnchorPoint(0, 0);
        }else{
            for(i=0;i<comma_cnt;i++){
                this._comma_sprite.push(new cc.Sprite(resComma));
                this._owner.addAnm(this._comma_sprite[i],Zorder);
                this._comma_sprite[i].setAnchorPoint(0.65, 0.5);//(0.75, 0.65);

            }
            this._dot_sprite= new cc.Sprite(resDot);
            this._owner.addAnm(this._dot_sprite,Zorder);
            this._dot_sprite.setAnchorPoint(0.65, 0.5);//(0.75, 0.65);

        }

        stSize = this._dot_sprite.getContentSize();
        this._mark_w=stSize.width-5;
        this._mark_h=stSize.height;


        var curpos=0;
        for(i=0;i<pslb.JPCONFIG.TOTAL_DIGI;i++){
            if(i<2){
                curpos+=this._num_w;
                this._num_pos_map.push(curpos);
                if(i==1){
                    curpos+=this._mark_w;
                    this._num_pos_map.push(curpos);
                }
            }else{
                curpos+=this._num_w;
                this._num_pos_map.push(curpos);
                if((i-1)%3==0){
                    curpos+=this._mark_w;
                    this._num_pos_map.push(curpos);
                }
            }
        }

        this._visible=false;

        this.flushNumber();

    },


    setPosition:function(x,y){
        this.x=x;
        this.y=y;
        this.flushNumber();

    },
    //只算對齊的起始位置
    cal_shift_x:function() {
        var strnum= this.format_cent(this._cur_number);
        //1 dot + n*comma + m *num
        var total_w=  this._mark_w + (this._comma_sprite.length*this._mark_w)+ (this._num_sprite.length*this._num_w);

        var cur_w=0;
        for(var i=0;i<strnum.length;i++){
            if(strnum.substr(i,1)=='.'|| strnum.substr(i,1)==','){
                cur_w+=this._mark_w;
            }else{
                cur_w+=this._num_w;
            }
        }
        var ap=this.getAnchorPoint();
        if(ap.x==1){
            this._shift_x=0;
        }else if(ap.x==0.5){
            this._shift_x=(total_w-cur_w)/2;
        }else if(ap.x==0){
            this._shift_x= total_w-cur_w;
        }else{
            this._shift_x=0;
        }


    },
    //單純開關數字
    flushNumber:function(){
        this._cur_number_str = this.format_cent(this._cur_number);
        this.cal_shift_x();

        for(var i=0; i<this._num_sprite.length;i++){
            this._num_sprite[i].y= this.y;
            this._num_sprite[i].setVisible(false);

        }
        for(var i=0; i<this._comma_sprite.length;i++){
            this._comma_sprite[i].setVisible(false);
            this._comma_sprite[i].y=this.y;
        }

        this._dot_sprite.y=this.y;

        var cur_totoal_digi= 0;//Math.floor(this._cur_number/10)+3;
        for(var i=0;i<this._cur_number_str.length;i++) {
            if (this._cur_number_str[i] != ',' && this._cur_number_str[i] != '.') {
                cur_totoal_digi++;
            }
        }
        var index_num=0;
        var index_comma=0;
        var visible=false;
        for(var i=0;i<this._cur_number_str.length;i++){
            if(this._cur_number_str[i]==',' || this._cur_number_str[i]=='.')
            {
                if(this._cur_number_str[i]=='.'){
                    this._dot_sprite.x= this.x-(this._num_pos_map[this._cur_number_str.length-i-1]+this._shift_x) * this._numScale;
                    visible=true&this._visible;
                    this._dot_sprite.setVisible(visible);
                }else{
                    this._comma_sprite[index_comma].x=this.x-(this._num_pos_map[this._cur_number_str.length-i-1]+this._shift_x) * this._numScale;
                    visible=true&this._visible;
                    this._comma_sprite[index_comma].setVisible(visible);
                    index_comma++;
                }

            }else{
                if((cur_totoal_digi-index_num-1)<0 || (cur_totoal_digi-index_num-1)>=this._num_sprite.length){
                    cc.log("!!!!!!!ERROR cur_totoal_digi=" +cur_totoal_digi+ "   index_num="+index_num+"   (cur_totoal_digi-index_num-1)="+(cur_totoal_digi-index_num-1));
                    return;
                }
                this._num_sprite[cur_totoal_digi-index_num-1].x=this.x-(this._num_pos_map[this._cur_number_str.length-i-1]+this._shift_x) * this._numScale;
                visible=true&this._visible;
                this._num_sprite[cur_totoal_digi-index_num-1].setVisible(visible);
                index_num++;
            }
        }



    },

    format_integer:function(int_num){

        var credit=int_num.toString();

        var invformat="";
        var format="";

        for (var i=0 ;i< credit.length ; i++){

            var c= credit.charAt(credit.length-i-1);
            if(i%3==0 && i!=0)
                invformat= invformat +","+c;
            else
                invformat+=c;
        }

        for (i=0 ;i< invformat.length ; i++)
        {
            format += invformat.charAt(invformat.length-i-1);
        }

        //cc.log("test format credit =" +format);
        return format;
    },

    format_cent:function(num){


        var cent=num.toString();
        var decimal="";
        var integer="";
        var format="";
        if(cent<100){
            if(cent<10) {
                format = '0.0' + cent;
            }else{
                format='0.'+cent;
            }
        }else {
            decimal = cent.substr(cent.length - 2, 2);
            integer= cent.substr(0,cent.length-2);
            format= this.format_integer(integer);
            format=format+"."+decimal;
        }
        //cc.log("test format cent="+format);

        return format;
    },

    speed_choice:function( residual ){
        var n= residual/pslb.JPCONFIG.RESIDUAL_NUM;

        if(n>=0.8){
            return pslb.JPCONFIG.MAX_DIGI_SPEED;
        }else if(n>=0.5 && n<0.8){
            return pslb.JPCONFIG.LV1_SPEED;
        }else if(n>=0.3 && n<0.5){
            return pslb.JPCONFIG.LV2_SPEED;
        }else if(n>=0.1 && n<0.3){
            return pslb.JPCONFIG.LV3_SPEED;
        }else if(n>=0 && n<0.1){
            return pslb.JPCONFIG.MIN_DIGI_SPEED;
        }else{
            return pslb.JPCONFIG.MIN_DIGI_SPEED;
        }

    },

    IniNumber:function(num) {
        this._cur_number=num;
        this._target_number=num;
        var digi_index=0;
        do{
            var n= num%10;
            this._num_sprite[digi_index].force_to_num(n);
            num= Math.floor(num/10);
            digi_index++;
        }while(num>0);
        this.flushNumber();



        //this._num_sprite[0].run(0.0001);
       // this._num_sprite[1].goNextNum(0.02);
        //this._num_sprite[0].stop(0);  // 數字一樣會走10
    },





    updateNum:function(num) {

        //  a. targ    b. cur   c.updating
        //  a. >=  b

        //             1. updating >  targ      updating-cur  >=900   更新
        //             2. updating >  targ      updating-cur  <900
        //                                      updating-cur <9       要變慢
        //             3. updating <  targ       強制回歸 起跑

       /* if(this._target_number < this._cur_number){
            this._cur_number=this._target_number;
            this.IniNumber(this._target_number);
            return;
          /// 不跑了
        }*/

        if(num<this._target_number){
            var  number2set=num-pslb.JPCONFIG.RESIDUAL_NUM;
            this._target_number=num;
            if(number2set>0){
                this.IniNumber(number2set);
                this._cur_number=number2set;
            }else{
                this.IniNumber(0);
                this._cur_number=0;
            }
            //var residual=this._target_number-this._cur_number;
           // var speed=this.speed_choice(residual);
            this._num_sprite[0].run(pslb.JPCONFIG.MAX_DIGI_SPEED);
            return;
        }

        if(num>=this._target_number) {

            var residual = num - this._cur_number;
            if (residual >= pslb.JPCONFIG.RESIDUAL_NUM) {

                // 更新所有數字到
                this._target_number = num;
                this._cur_number = this._target_number - pslb.JPCONFIG.RESIDUAL_NUM;
                var speed = this.speed_choice(pslb.JPCONFIG.RESIDUAL_NUM);
                this._num_sprite[0].run(speed);

            } else {

                this._target_number = num;
                //this._cur_number=this._target_number-residual;
                var speed = this.speed_choice(residual);
                this._num_sprite[0].run(speed);

            }
        }

        if (this._numScale < 1) {
            this.adjustNum();
        }
    },

    callback_add:function() {

        var prev_number = this._cur_number;
        var cur_digi = this._num_sprite[0].getCurNum();
        if (cur_digi != (this._cur_number % 10)) {
           // cc.error("Error !!! cur_digi=" + cur_digi + "  cur_number=" + this._cur_number);
           // this._cur_number=this.getNumberfromsprite();
            this._cur_number=Math.floor(this._cur_number/10)*10+cur_digi;
        }
            this._cur_number++;

        //快到了 叫最後一個數字 停
        var resdual = this._target_number - this._cur_number;
        if (resdual <= 9  && resdual>=0) {
            var speed = this.speed_choice(resdual);
            var num = this._target_number % 10;
            this._num_sprite[0].stop(num, speed);
        }

        //更新個位數以外的數字到位
        var numstr=this._cur_number.toString();
        var n=this._cur_number;
        n = Math.floor(n / 10);
        for(var i=1 ;i < numstr.length; i++){
            var num = n % 10;
            if(this._num_sprite[i]._cur_state === 0){
                var sp_num=this._num_sprite[i].getCurNum();
                if ( sp_num != num) {
                    var speed = this._num_sprite[0].getSpeed() / 5;
                    this._num_sprite[i].stop(num, speed);
                }

            }
            n = Math.floor(n / 10);
        }

        this.flushNumber();

    },

    getDecimal:function(digi){
        var n=1;
        for(var i=0 ; i<digi ;i++){
            n*=10;
        }
        return n;
    },
    getNumberfromsprite:function(){
        var n=0;
        for(var i=0;i<this._num_sprite.length;i++){
            n+= this._num_sprite[i].getCurNum()*this.getDecimal(i);
        }
        return n;
    },

    initOriginPos : function () {
        this._originX = this.x;
        this._originY = this.y;
    },

    initNumScale : function (scale) {
        this._num_sprite.forEach(function(sp){
                sp.setScale(scale);
            }
        );
        this._comma_sprite.forEach(function(sp){
            sp.setScale(scale);
            }
        );
        this._dot_sprite.setScale(scale);
        this._numScale = scale;
    },

    adjustNum : function () {
        var str = g_format_cent(this._cur_number);
        if (str.length > 10) {
            var scale = 10 / str.length * 0.8;
            this.initNumScale(scale);
            // if 999,999.00 -> width of "999," = 3.5
            var offset = str.length - 10;
            var offsetX = offset * (this._num_w - 1);
            this.setPositionX(this._originX - offsetX * scale);
        }
    },

    jpfadeIn:function(time){
        this._num_sprite.forEach(function(sp){
                sp.runAction(cc.fadeIn(time))
            }
        );
        this._comma_sprite.forEach(function(sp){
                sp.runAction(cc.fadeIn(time))
            }
        );
        this._dot_sprite.runAction(cc.fadeIn(time));
    },

    jpfadeOut:function(time){
        this._num_sprite.forEach(function(sp){
                sp.runAction(cc.fadeOut(time))
            }
        );
        this._comma_sprite.forEach(function(sp){
                sp.runAction(cc.fadeOut(time))
            }
        );
        this._dot_sprite.runAction(cc.fadeOut(time));
    },
});

var JPnum=cc.Sprite.extend({
    STATE:{
        STOP:0,
        SPINNING:1,
        STOPPING:2
    },
    m_NumberTexture:null,
    m_num_h:0,

    _cur_speed:0,
    _cur_y:0,
    _cur_state:0,
    _cur_num:0,
    _target_num:0,
    _index:-1,
    _owner:null,


    ctor:function(owner,rcName,numheight,index){
        this._super();
        this._owner=owner;
        this._index=index;
        this.m_NumberTexture = cc.textureCache.addImage(rcName);
        this.m_num_h=numheight;
        this.updateRect();

        this.schedule(this.update,0.06);
    },
    updateRect:function(){
        var iNumCount = 1;
        var stSize = this.m_NumberTexture.getContentSize();
        var iNumHeight = this.m_num_h;
        var iNumWidth =  parseInt( stSize.width);

        this.setTexture(this.m_NumberTexture);
        var stRect = new cc.rect(0, this._cur_y, iNumWidth, iNumHeight);
        this.setTextureRect(stRect, false, cc.size(stRect.width, stRect.height));

    },

    force_to_num:function(num){
        this._cur_num=num;
        this._cur_y = num* this.m_num_h;
        this.updateRect();
    },

    getSpeed:function(){
      return this._cur_speed;
    },

    update:function(dt){

        switch(this._cur_state){
            case this.STATE.STOP:
                break;
            case this.STATE.SPINNING:
                this.accumulate_y(dt);
                break;
            case this.STATE.STOPPING:
                this.accumulate_y(dt);
                break;
        }

    },
    accumulate_y:function(dt){
        var dms = dt*1000;
        var speed;
        if(this._cur_speed< pslb.JPCONFIG.MIN_DIGI_SPEED){
            speed=pslb.JPCONFIG.MIN_DIGI_SPEED;
        }else if(this._cur_speed>pslb.JPCONFIG.MAX_DIGI_SPEED){
            speed=pslb.JPCONFIG.MAX_DIGI_SPEED;
        }
        else{
            speed=this._cur_speed;
        }


        var dy= Math.floor( dms*speed );

        if(dy>=this.m_num_h){
            dy=this.m_num_h-1;
        }else if(dy<1){
            dy=1;
        }

        this.Tag0_callback(dy);

        if(this._cur_state== this.STATE.STOPPING){
           var  target_y=this.m_num_h*this._target_num;
           var  next_y=this._cur_y+dy;

           if(next_y>=(this.m_num_h*10 )&& this._target_num === 0 ){
               this._cur_y=0;
               this._cur_num=this._target_num;
               this.updateRect();
               this._cur_state=this.STATE.STOP;
               return;
           }

          if( this._cur_y < target_y && next_y >= target_y) {
               this._cur_y=target_y;
               this._cur_num=this._target_num;
               this.updateRect();
               this._cur_state=this.STATE.STOP;
               return;
            }
        }

        this._cur_y += dy;
        if(this._cur_y >=  (this.m_num_h*10) ){
            this._cur_y-=(this.m_num_h*10);
        }

        this.updateRect();

    },
    Tag0_callback:function(dy){
        if(this.getTag() === 0) {
            var half_h = Math.floor(this.m_num_h / 2);
            var x1 = (this._cur_y % this.m_num_h) ;
            var x2 = (this._cur_y + dy) % this.m_num_h;

            if (x1>x2) {
                this._owner.callback_add();
            }
        }

    },

    getCurNum:function(){
        var num=Math.floor(this._cur_y/this.m_num_h);
        return num;
    },

    run:function(speed){
        this._cur_state=this.STATE.SPINNING;
        this._cur_speed=speed;
    },

    goNextNum:function(speed){

        var num=this._cur_num+1;
        if(num>=10){
           num=0;
        }
        this.stop(num,speed);
    },

    stop:function(num,speed){
        this._cur_state = this.STATE.STOPPING;
        if(speed!=undefined){
            this._cur_speed=speed;
        }else {
            this._cur_speed = pslb.JPCONFIG.MIN_DIGI_SPEED;
        }
        this._target_num=num;

    }

});

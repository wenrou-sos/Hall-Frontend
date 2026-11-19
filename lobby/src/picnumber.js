var PictureNumber = cc.Sprite.extend({  
    m_Number:null,  
    m_NumberTexture:null,  
    ctor:function(){  
        this._super();  
          
    },  
    buildNumber:function(paramNumber, paramTexture)  
    {  
        this.setNumber(paramNumber);  
        this.setNumberTexture(cc.textureCache.addImage(paramTexture));
        return this.build();  
    },  
    build:function(){  
  
        var iNumCount = (this.m_Number+"").length;
        var stSize = this.m_NumberTexture.getContentSize();
          
        var iNumWidth = parseInt( stSize.width/10 );
        var iNumHeight =  parseInt( stSize.height);
  
        var pRT = new cc.RenderTexture(iNumWidth * iNumCount, iNumHeight);

        pRT.begin();  
        for (var i = 0; i < iNumCount; i++)  
        {  
            var pSprite   = new cc.Sprite();
            pSprite.setAnchorPoint(0, 0);  
            pSprite.setTexture(this.m_NumberTexture);  
            var iNumber = (this.m_Number+"")[i];
            var stRect = new cc.rect(iNumber * iNumWidth, 0, iNumWidth, iNumHeight);  
            pSprite.setTextureRect(stRect, false, cc.size(stRect.width, stRect.height));  
            pSprite.setPosition(i * iNumWidth, 0);
            pSprite.visit();
        }  
        pRT.end();
        pRT.getSprite().getTexture().setAntiAliasTexParameters();
        this.setTexture(pRT.getSprite().getTexture());
        var stRect = new cc.rect(0, 0, iNumWidth * iNumCount, iNumHeight);  
        this.setTextureRect(stRect, false, cc.size(stRect.width, stRect.height));
        if(cc._renderType==cc._RENDER_TYPE_WEBGL) {
                this.setFlippedY(true);
        }
    },  
      
    setNumber:function(paramNumber){

        this.m_Number = paramNumber;

        if(this.m_NumberTexture!=null){
            this.build();
        }
    },  
    getNumber:function(){  
        return this.m_Number;  
    },  
    setNumberTexture:function(paramTexture)  
    {  
        this.m_NumberTexture = paramTexture;  
    }

});


var PictureNumber_StrNum = cc.Sprite.extend({
    m_Number:null,
    m_num_w:0,
    m_comma_w:0,
    m_NumberTexture:null,
    ctor:function(){
        this._super();

    },
    buildNumber:function(paramNumber,num_width,comma_width, paramTexture)
    {
        this.m_num_w=num_width;
        this.m_comma_w=comma_width;
        this.setNumber(paramNumber);
        this.setNumberTexture(cc.textureCache.addImage(paramTexture));
        return this.build();
    },
    build:function(){

        var iNumCount = this.m_Number.length;
        var stSize = this.m_NumberTexture.getContentSize();

        var iNumWidth = this.m_num_w;
        var iCommaWidth=this.m_comma_w;
        var iNumHeight =  parseInt( stSize.height);

        var texture_totoal_width=0;
        for(var i=0;i<this.m_Number.length;i++){
            var c= this.m_Number.substr(i,1);
            if(c==',' || c=='.'){
                texture_totoal_width+=this.m_comma_w;
            }else{
                texture_totoal_width+=this.m_num_w;
            }
        }
        if(texture_totoal_width<=0)
           return;

        var pRT = new cc.RenderTexture(texture_totoal_width, iNumHeight);


        pRT.begin();
        var numpos=0;
        for (var i = 0; i < iNumCount; i++) {
            var pSprite = new cc.Sprite();
            pSprite.setAnchorPoint(0, 0);
            pSprite.setTexture(this.m_NumberTexture);
            var cNumber = this.m_Number.substr(i,1);
            if (cNumber != ',' && cNumber != '.') {
                var stRect = new cc.rect(parseInt(cNumber) * iNumWidth, 0, iNumWidth, iNumHeight);
                pSprite.setTextureRect(stRect, false, cc.size(stRect.width, stRect.height));
                pSprite.setPosition(numpos, 0);
                numpos+=iNumWidth;
            }else{
                if(cNumber=='.') {
                    var stRect = new cc.rect(10 * iNumWidth, 0,iCommaWidth, iNumHeight);
                    pSprite.setTextureRect(stRect, false, cc.size(stRect.width, stRect.height));
                    pSprite.setPosition(numpos, 0);
                }else{
                    var stRect = new cc.rect(10 * iNumWidth+ iCommaWidth, 0,iCommaWidth, iNumHeight);
                    pSprite.setTextureRect(stRect, false, cc.size(stRect.width, stRect.height));
                    pSprite.setPosition(numpos, 0);
                }
                numpos+=iCommaWidth;
            }
            pSprite.visit();
        }
        pRT.end();
        pRT.getSprite().getTexture().setAntiAliasTexParameters();
        this.setTexture(pRT.getSprite().getTexture());
        var stRect = new cc.rect(0, 0, texture_totoal_width, iNumHeight);
        this.setTextureRect(stRect, false, cc.size(stRect.width, stRect.height));
        if(cc._renderType==cc._RENDER_TYPE_WEBGL) {
            this.setFlippedY(true);
        }
    },

    setNumber:function(paramNumber){

        this.m_Number = paramNumber;

        if(this.m_NumberTexture!=null){
            this.build();
        }
    },
    getNumber:function(){
        return this.m_Number;
    },
    setNumberTexture:function(paramTexture)
    {
        this.m_NumberTexture = paramTexture;
    }

});
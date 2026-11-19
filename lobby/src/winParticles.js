var pslb = pslb || {};

pslb.winParticles = cc.Node.extend({
    ctor:function() {
        this._super();

        for (var i = 0; i < 3; i++) {
            var particle = new cc.ParticleFireworks();

            particle.setGravity(cc.p(0, -500));

            // Gravity Mode:  radial
            particle.setRadialAccel(0);
            particle.setRadialAccelVar(0);

            particle.setStartSpin(0);
            particle.setStartSpinVar(180);
            particle.setEndSpin(360);
            particle.setEndSpinVar(90);

            //  Gravity Mode: speed of particles
            particle.setSpeed(780);
            particle.setSpeedVar(50);

            // life of particles
            particle.setLife(4.0);
            particle.setLifeVar(1);

            particle.setStartSize(90.0);
            //this._system.setStartSizeVar(50.0);
            particle.setEndSize(90.0);


            particle.setStartColor(cc.color(255, 255, 255, 255));
            particle.setStartColorVar(cc.color(0, 0, 0, 0));
            particle.setEndColor(cc.color(200, 200, 200, 255));
            particle.setEndColorVar(cc.color(0, 0, 0, 0));


            particle.setEmissionRate(5 - i);
            particle.setPosition(720, -10);

            switch (i) {
                case 0:
                    particle.texture = cc.textureCache.addImage(res.token1_png);
                    break;
                case 1:
                    particle.texture = cc.textureCache.addImage(res.token2_png);
                    break;
                case 2:
                    particle.texture = cc.textureCache.addImage(res.token3_png);
                    break;
            }

            this.addChild(particle);
        }
    }
})
function loadImgs(arr, fnSucc) {
    var loaded = 0;
    var json   = {};
    for(var i = 0;i < arr.length;i++) {
        var oImg = new Image();
        oImg.onload = function () {
            loaded++;
            if(loaded==arr.length) {
                fnSucc(json);
            }
        }
        oImg.src = arr[i];
        var name = arr[i].split('.')[0];
        json[name] = oImg;
    }
}

window.onload = function () {
    var con   = document.getElementById('content');
    var gd    = con.getContext('2d');
    var aBull = [];           //存炮弹数组
    var aFish = [];           //存鱼数组
    //炮相关的
    var gun_x = 363;
    var gun_y = 500;

    loadImgs([
        'img/bullet1.png', 'img/cannon1.png', 'img/coinAni2.png', 'img/fish1.png'
        ], function (imgs){
        //绘制
        setInterval(function () {
            //清除
            gd.clearRect(0,0,con.width,con.height);

            //炮弹画出来
            for(var i = 0;i < aBull.length;i++) {
                gd.drawImage(
                    imgs['img/bullet1'],
                    aBull[i].x, aBull[i].y
                    );
            }

            //炮画出来
            gd.drawImage(
                imgs['img/cannon1'],
                0,0,74,66,
                gun_x,gun_y,74,66
                );

            //鱼画出来
            for(var i=0;i<aFish.length;i++) {
                gd.drawImage(
                    imgs['img/fish1'],
                    0,parseInt(aFish[i].frame)*36,55,36,
                    aFish[i].x, aFish[i].y, 55, 36
                    );
            }
        }, 1000/60);

        //炮弹飞出去
        setInterval(function () {
            for(var i=0;i<aBull.length;i++) {
                aBull[i].y-=4;
            }

            //碰撞
            for(var i=0;i<aFish.length;i++) {
                for(var j=0;j<aBull.length;j++) {
                    if(testColl(
                        aFish[i].x, aFish[i].y, 55, 36,
                        aBull[j].x, aBull[j].y, 24, 26
                        )) {
                        //alert('a');
                        aFish.splice(i, 1);
                        i--;
                        aBull.splice(j, 1);
                        j--;
                    }
                }
            }
        }, 1000/60);

        //鱼游起来
        setInterval(function () {
            for(var i= 0;i < aFish.length;i++) {
                aFish[i].x+=1;
                aFish[i].frame+=0.2;

                if(aFish[i].frame >= 4) {
                    aFish[i].frame = 0;
                }
            }
        }, 1000/60);
    });


    document.onkeydown=function (ev) {
        var oEvent = ev||event;

        switch(oEvent.keyCode) {
            //左右
            case 37:
                gun_x-=5;
            break;
            case 39:
                gun_x+=5;
            break;
            //空格——开炮
            case 32:
                aBull.push({
                    x: gun_x+25,
                    y: gun_y+10
                });
            break;
        }
    };

    setInterval(function () {
        aFish.push({
            x: -60,
            y: Math.random()*600,
            frame: 0    /*0-3*/
        });
    }, 300);

    //碰撞检测
    function testColl(
        x1, y1, w1, h1,
        x2, y2, w2, h2
        ) {
        var l1 = x1;
        var r1 = x1+w1;
        var t1 = y1;
        var b1 = y1+h1;

        var l2 = x2;
        var r2 = x2+w2;
        var t2 = y2;
        var b2 = y2+h2;

        if(r1 < l2 || l1 > r2 || b1 < t2 || t1 > b2) {
            return false;
        } else {
            return true;
        }
    }
};

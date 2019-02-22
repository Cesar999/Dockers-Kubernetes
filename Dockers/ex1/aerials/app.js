function enemyBullet(){
    for(let e of enemies){
        e.count += Math.random()*2;
        if(e.count>frames*2){
            e.bullet();
            e.count = 0;
        }
    }
}


const step = 10;
let timer1 = false;
const time1 = 300;
const frames = 30;

class Circle{
    constructor(x,y,sx,sy,role){
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.role = role;
        this.r = 15;
        this.arr_bullet = [];
        this.count = 0;
    }
    bullet(){
        let myBullet = new Bullet(this.x,this.y,15, this.role);
        this.arr_bullet.push(myBullet);
    }
}

class Bullet{
    constructor(x,y,sb,role){
        this.x = x;
        this.y = y;
        this.role = role;
        this.r = 8;
        if(this.role==='enemy'){
            this.sb = -sb;
        } else {
            this.sb = sb;
        }
    }
    fire(){
        this.y -= this.sb;
    }
}

const p1 = new Circle(400,500,0,0,'p1');

const e1 = new Circle(50,50,0,0, 'enemy');
const e2 = new Circle(190,50,0,0, 'enemy');
const e3 = new Circle(330,50,0,0, 'enemy');
const e4 = new Circle(470,50,0,0, 'enemy');
const e5 = new Circle(610,50,0,0, 'enemy');
const e6 = new Circle(750,50,0,0, 'enemy');

const e7 = new Circle(120,100,0,0, 'enemy');
const e8 = new Circle(260,100,0,0, 'enemy');
const e9 = new Circle(400,100,0,0, 'enemy');
const e10 = new Circle(540,100,0,0, 'enemy');
const e11 = new Circle(680,100,0,0, 'enemy');

const enemies = [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11];

window.onload = function(){
    //------------------
    canvas = document.getElementById('myCanvas');
    canvasContext = canvas.getContext('2d');
    colorRect(0, 0, 800, 600, 'black');
    colorCircle(p1.x,p1.y,p1.r,0, 2*Math.PI, 'red');
    setInterval(updateAll, 1000/frames);
}

KeyboardController({
    37: function() { keyEvents({keyCode: 37}) },
    38: function() { keyEvents({keyCode: 38}); },
    39: function() { keyEvents({keyCode: 39}); },
    40: function() { keyEvents({keyCode: 40}); },
    32: function() { keyEvents({keyCode: 32}); }
}, 40);


function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(x,y,r,sAngle, eAngle, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(x,y,r,sAngle,eAngle,true);
    canvasContext.fill();
}

function keyEvents(e){
    let code = e.keyCode;
    switch(code){
        case 37:
            if(p1.sx===step||p1.sx===0){
                p1.sx += -step;
            } 
            p1.sy = 0;
            break;
        case 38:
            if(p1.sy===step||p1.sy===0){
                p1.sy += -step;
            }
            p1.sx = 0;
            break;
        case 39:
            if(p1.sx===-step||p1.sx===0){
                p1.sx += step;
            }
            p1.sy = 0;
            break;
        case 40:
            if(p1.sy===-step||p1.sy===0){
                p1.sy += step;
            }
            p1.sx = 0;
            break;        
        case 32:
            if(!timer1){
                timer1 = true;
                setTimeout(function(){
                    p1.bullet();
                    timer1 = false;
                }, time1);
            }
            break;            
    }
}

function newPos(){
    if(p1.x>=canvas.width-10){
        p1.sx = 0;
        p1.x += -step;
    } else if(p1.x<=10){
        p1.sx = 0;
        p1.x += step;
    } else if(p1.y>=canvas.height-10){
        p1.sy = 0;
        p1.y += -step;
    } else if(p1.y<=10){
        p1.sy = 0;
        p1.y += step;
    } else{
        p1.x += p1.sx;
        p1.y += p1.sy;
    }

}

function bulletsNewPos(){
    let color;
    for(let e of enemies){
        for(b of e.arr_bullet){
            if(b.role==='enemy'){
                color = 'green';
            } else {
                color = 'blue';
            }
            b.fire();
            colorCircle(b.x,b.y,b.r,0, 2*Math.PI, color);
        }
    }     

    for(b of p1.arr_bullet){
        if(b.role==='enemy'){
            color = 'green';
        } else {
            color = 'blue';
        }
        b.fire();
        colorCircle(b.x,b.y,b.r,0, 2*Math.PI, color);
    }
}

function bulletCollision(){
    //Enemy vs P1.bullets
    for(let e of enemies){
        for(let b of p1.arr_bullet){
            if(Math.abs(b.x - e.x) >= (b.r + e.r)||Math.abs(b.y - e.y) >= (b.r + e.r)){
                
            } else {
                enemies.splice(enemies.indexOf(e),1);
            }
        }
    }

    //P1 vs Enemy Bullets
        for(let e of enemies){
            for(let b of e.arr_bullet){
                if(Math.abs(b.x - p1.x) >= (b.r + p1.r-p1.r*0.2)||Math.abs(b.y - p1.y) >= (b.r + p1.r-p1.r*0.2)){
                    
                } else {
                    alert('You Lost');
                    location.reload();
                }
            }
        }

     //P1 bullets vs EWnemies bullets
     for(let e of enemies){
        for(let b of e.arr_bullet){
            for(let pb of p1.arr_bullet){
                if(Math.abs(b.x - pb.x) >= (b.r + pb.r)||Math.abs(b.y - pb.y) >= (b.r + pb.r)){
                
                } else {
                    e.arr_bullet.splice(e.arr_bullet.indexOf(b),1);
                    p1.arr_bullet.splice(p1.arr_bullet.indexOf(pb),1);
                }
            }
        }
    }
}

function checkWin(){
    if(enemies.length === 0){
        alert('You Win');
        location.reload();
    }
}

function updateAll(){
    colorRect(0, 0, 800, 600, 'black');
    bulletCollision();

    colorCircle(p1.x,p1.y,p1.r,0, 2*Math.PI, 'red');
    let color = 'yellow';
    for(let e of enemies){
        colorCircle(e.x,e.y,e.r,0,2*Math.PI,color);
    }

    newPos();
    bulletsNewPos();
    enemyBullet();


    checkWin();
}


// Keyboard input with customisable repeat (set to 0 for no key repeat)
function KeyboardController(keys, repeat) {
    // Lookup of key codes to timer ID, or null for no repeat
    var timers= {};

    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    document.onkeydown= function(event) {
        var key= (event || window.event).keyCode;
        if (!(key in keys))
            return true;
        if (!(key in timers)) {
            timers[key]= null;
            keys[key]();
            if (repeat!==0)
                timers[key]= setInterval(keys[key], repeat);
        }
        return false;
    };

    // Cancel timeout and mark key as released on keyup
    document.onkeyup= function(event) {
        var key= (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key]!==null)
                clearInterval(timers[key]);
            delete timers[key];
        }
    };

    // When window is unfocused we may not get key events. To prevent this
    // causing a key to 'get stuck down', cancel all held keys
    window.onblur= function() {
        for (key in timers)
            if (timers[key]!==null)
                clearInterval(timers[key]);
        timers= {};
    };
};
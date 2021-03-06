const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
let adjustX = 1;
let adjustY = 5;

// mouse handling
let mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function (e){
    mouse.x = e.x;
    mouse.y = e.y;
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('REEL', 0, 30);
const textCoordinates = ctx.getImageData(0, 0, 100, 100);

class Particle {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 5;
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy + dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < 300) {
            this.x -= directionX;
            this.y += directionY;
        } else {
           if (this.x !== this.baseX){
               let dx = this.x -this.baseX;
               this.x -= dx/10
           }
           if (this.y !== this.baseY){
               let dy = this.y - this.baseY;
               this.y -= dy/10;
           }
        }
    }
}

function init() {
    particlesArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particlesArray.push(new Particle(positionX * 20, positionY * 20));
            }
        }
    }
    // for (let i = 0; i < 500; i++ ) {
    //     let x = Math.random() * canvas.width;
    //     let y = Math.random() * canvas.height
    //     particlesArray.push(new Particle(x,y));
    // }

}
init();
console.log(particlesArray);

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();

class Character extends MovableObject {

    height = 300;
    width = this.height * 0.815;
    speed = 3;
    speedY = 0;
    acceleration = 0.01;
    IMAGES_IDLE = [
        'img/1.sharkie/1.idle/1.png',
        'img/1.sharkie/1.idle/2.png',
        'img/1.sharkie/1.idle/3.png',
        'img/1.sharkie/1.idle/4.png',
        'img/1.sharkie/1.idle/5.png',
        'img/1.sharkie/1.idle/6.png',
        'img/1.sharkie/1.idle/7.png',
        'img/1.sharkie/1.idle/8.png',
        'img/1.sharkie/1.idle/9.png',
        'img/1.sharkie/1.idle/10.png',
        'img/1.sharkie/1.idle/11.png',
        'img/1.sharkie/1.idle/12.png',
        'img/1.sharkie/1.idle/13.png',
        'img/1.sharkie/1.idle/14.png',
        'img/1.sharkie/1.idle/15.png',
        'img/1.sharkie/1.idle/16.png',
        'img/1.sharkie/1.idle/17.png',
        'img/1.sharkie/1.idle/18.png'
    ];
    IMAGES_SWIM = [
        'img/1.sharkie/3.swim/1.png',
        'img/1.sharkie/3.swim/2.png',
        'img/1.sharkie/3.swim/3.png',
        'img/1.sharkie/3.swim/4.png',
        'img/1.sharkie/3.swim/5.png',
        'img/1.sharkie/3.swim/6.png',
    ];
    world;

    constructor() {
        super().loadImage('img/1.sharkie/1.idle/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SWIM);
        this.applyGravity();
        this.animate();
    }

    isAboveOceanFloor() {
        return this.y < 220;
    }

    applyGravity() {
        setInterval(() =>  {
            if (this.isAboveOceanFloor()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            this.world.camera_x = -this.x + 64;
        }, 1000 / 60)

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_SWIM);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 200);
    }

    swimUp() {

    }
}
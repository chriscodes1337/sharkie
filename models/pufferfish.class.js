/** Class representing a puffer fish. */
class PufferFish extends MovableObject {
    height = 99;
    width = this.height * 1.217171717171717;
    offset = {
        top: this.height * 0.16,
        bottom: this.height * 0.36,
        right: this.width * 0.29,
        left: this.width * 0.15
    }
    energy = 15;
    speedY = 0;
    firstHit;

    /**
     * Create a puffer fish.
     * @param {number} type - The type of puffer fish. Can be 1, 2, or 3.
     * @param {number} x - The x location of the puffer fish.
     * @param {number} y - The y location of the puffer fish.
     */
    constructor(type, x, y) {
        super().loadImage(`img/2.enemies/1.puffer-fish/1.swim/${type}.swim1.webp`);
        this.IMAGES_SWIM = [
            `img/2.enemies/1.puffer-fish/1.swim/${type}.swim1.webp`,
            `img/2.enemies/1.puffer-fish/1.swim/${type}.swim2.webp`,
            `img/2.enemies/1.puffer-fish/1.swim/${type}.swim3.webp`,
            `img/2.enemies/1.puffer-fish/1.swim/${type}.swim4.webp`,
            `img/2.enemies/1.puffer-fish/1.swim/${type}.swim5.webp`,
        ];
        this.IMAGES_TRANSITION = [
            `img/2.enemies/1.puffer-fish/2.transition/${type}.transition1.webp`,
            `img/2.enemies/1.puffer-fish/2.transition/${type}.transition2.webp`,
            `img/2.enemies/1.puffer-fish/2.transition/${type}.transition3.webp`,
            `img/2.enemies/1.puffer-fish/2.transition/${type}.transition4.webp`,
            `img/2.enemies/1.puffer-fish/2.transition/${type}.transition5.webp`,
        ];
        this.IMAGES_BUBBLE_SWIM = [
            `img/2.enemies/1.puffer-fish/3.bubbleswim/${type}.bubbleswim2.webp`,
            `img/2.enemies/1.puffer-fish/3.bubbleswim/${type}.bubbleswim3.webp`,
            `img/2.enemies/1.puffer-fish/3.bubbleswim/${type}.bubbleswim4.webp`,
            `img/2.enemies/1.puffer-fish/3.bubbleswim/${type}.bubbleswim1.webp`,
            `img/2.enemies/1.puffer-fish/3.bubbleswim/${type}.bubbleswim5.webp`,
        ];
        this.IMAGES_DEAD = [
            `img/2.enemies/1.puffer-fish/4.dead/${type}.webp`
        ];
        this.x = x
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.5;
        this.applyGravity();
        this.animate();
    }

    /**
     * Call hit method of superordinate class and save timestamp of first hit.
     * @param {Object} obj - Another object.
     */
    hit(obj) {
        super.hit(obj);
        if (!this.firstHit) {
            this.firstHit = new Date().getTime();
        }
    }

    /**
     * Check if the puffer fish has been hurt yet.
     * @returns {boolean} Whether the puffer fish has been hurt or not.
     */
    hasBeenHurt() {
        if (this.firstHit) {
            let timePassed = new Date().getTime() - this.firstHit;
            if (timePassed >= this.animationIntervalLength * 5) {
                this.offset.top = this.height * 0.1;
                this.offset.bottom = this.height * 0.13;
                this.offset.left = this.width * 0.13;
                return true;
            }
        } else {
            return false;
        }
    }

    /**
     * Apply gravity to the puffer fish.
     */
    applyGravity() {
        setStoppableInterval(() =>  {
            this.y -= this.speedY;
        }, 1000 / 60);
    }

    /**
     * Set movement interval for puffer fish.
     */
    setMovementInterval() {
        setStoppableInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            } else {
                this.speedY = 0.3;
            }
        }, 1000 / 60)
    }

    /**
     * Set animation interval for puffer fish.
     */
    setAnimationInterval() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.hasBeenHurt()) {
                this.playAnimation(this.IMAGES_BUBBLE_SWIM);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_TRANSITION);
            } else {
                this.playAnimation(this.IMAGES_SWIM);
            }
        }, this.animationIntervalLength)
    }

    /**
     * Animate the puffer fish.
     */
    animate() {
        this.setMovementInterval();
        this.setAnimationInterval();
    }
}
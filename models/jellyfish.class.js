/** Class representing a jellyfish. */
class Jellyfish extends MovableObject {
    height = 150;
    width = 105.5;
    offset = {
        top: 25,
        bottom: 27,
        right: 22,
        left: 22
    }
    energy = 5;
    speedY = 0;
    type;

    /**
     * Create a jellyfish.
     * @param {string} type - The type of jellyfish. Can be "regular-damage" or "super-dangerous".
     * @param {string} color - The color of the jellyfish. Can be "green", "yellow", "purple", or "pink".
     * @param {number} x - The x location of the jellyfish.
     * @param {number} y - The y location of the jellyfish.
     */
    constructor(type, color, x, y) {
        super().loadImage(`img/2.enemies/2.jelly-fish/${type}/swim/${color}/1.webp`);
        this.type = type;
        this.IMAGES_SWIM = [
            `img/2.enemies/2.jelly-fish/${type}/swim/${color}/1.webp`,
            `img/2.enemies/2.jelly-fish/${type}/swim/${color}/2.webp`,
            `img/2.enemies/2.jelly-fish/${type}/swim/${color}/3.webp`,
            `img/2.enemies/2.jelly-fish/${type}/swim/${color}/4.webp`,
        ];
        this.IMAGES_DEAD = [
            `img/2.enemies/2.jelly-fish/${type}/dead/${color}/1.webp`,
            `img/2.enemies/2.jelly-fish/${type}/dead/${color}/2.webp`,
            `img/2.enemies/2.jelly-fish/${type}/dead/${color}/3.webp`,
            `img/2.enemies/2.jelly-fish/${type}/dead/${color}/4.webp`,
        ];
        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.5;
        this.applyGravity();
        this.animate();
    }

    /**
     * Kill the jellyfish.
     */
    die() {
        super.die();
        this.speed = 0.1;
        this.speedY = 0.3;
    }

    /**
     * Apply gravity to the jellyfish object.
     */
    applyGravity() {
        setStoppableInterval(() =>  {
            this.y -= this.speedY;
        }, 1000 / 60);
    }

    /**
     * Animate the jellyfish.
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60)

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_SWIM);
            }
        }, this.animationIntervalLength)
    }
}
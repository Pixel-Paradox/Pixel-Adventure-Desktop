class Sprite {
    constructor({position, velocity, image, frames = {max: 1} }) {
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0};

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        };
        this.moving = false;        
    }

    draw() {
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        );

        if(this.moving) {
            if(this.frames.max > 1) {
                this.frames.elapsed++;
            }

            if(this.frames.elapsed % 15 === 0) {
                if(this.frames.val + 1 < this.frames.max) {
                    this.frames.val++;
                } else {
                    this.frames.val = 0;
                }
            }
        }
    }
}

const t = 16
class Boundary {
    static width = t;
    static height = t;
    constructor({position}) {
        this.position = position;
        this.width = t;
        this.height = t;
    }

    draw() {
        c.fillStyle = "rgba(255, 0, 0, 0.2)"
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
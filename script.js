let particles = [];
let obstacles = [];
let flowZ = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 420; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0, 14);

  flowZ += 0.003;

  for (let p of particles) {
    p.update();
    p.show();
  }

  noStroke();
  fill(255, 70);
  for (let o of obstacles) {
    circle(o.x, o.y, o.r * 2);
  }
}

function mousePressed() {
  obstacles.push({
    x: mouseX,
    y: mouseY,
    r: 65
  });
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    obstacles = [];
  }
}

function startExperience() {
  document.getElementById("landing").style.display = "none";
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.prev = this.pos.copy();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  update() {

    let angle = noise(
      this.pos.x * 0.004,
      this.pos.y * 0.004,
      flowZ
    ) * TWO_PI * 4;

    let wind = p5.Vector.fromAngle(angle);
    wind.mult(1.2);
    this.acc.add(wind);

    for (let o of obstacles) {
      let d = dist(this.pos.x, this.pos.y, o.x, o.y);

      if (d < o.r) {

        let normal = createVector(this.pos.x - o.x, this.pos.y - o.y);
        normal.normalize();

        this.pos.x = o.x + normal.x * o.r;
        this.pos.y = o.y + normal.y * o.r;

        let v = this.vel.copy();
        let dot = v.dot(normal);

        let reflect = p5.Vector.sub(v, p5.Vector.mult(normal, 2 * dot));

        this.vel = reflect;
        this.vel.mult(0.75);
      }
    }

    this.vel.mult(0.97);
    this.vel.add(this.acc);
    this.vel.limit(4);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.edges();
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    stroke(255, 150);
    point(this.pos.x, this.pos.y);
  }
}
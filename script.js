let particles = []
let obstacles = []
let running = false

function setup() {
  createCanvas(windowWidth, windowHeight)

  for (let i = 0; i < 1000; i++) {
    particles.push(new Particle())
  }

  let btn = document.getElementById("startBtn")
  btn.onclick = function () {
    document.getElementById("overlay").style.display = "none"
    running = true
  }
}

function draw() {
  background(5, 10, 20, 25)

  if (!running) return

  for (let o of obstacles) {
    noStroke()
    fill(120, 180, 255, 160)
    circle(o.x, o.y, o.r * 2)
  }

  for (let p of particles) {

    let wind = createVector(10, 0)

    let noiseY = noise(p.pos.y * 0.002, frameCount * 0.01)
    let wobble = map(noiseY, 0, 1, -2, 2)

    wind.y = wobble

    wind.mult(1)

    p.applyForce(wind)
    p.update()
    p.edges()
    p.show()

    for (let o of obstacles) {
      p.collide(o)
    }
  }
}

function mousePressed() {
  if (!running) return

  obstacles.push({
    x: mouseX,
    y: mouseY,
    r: random(6, 14)
  })
}

function keyPressed() {
  if (key === "r" || key === "R") {
    obstacles = []
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(0, width * 0.1), random(height))
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
    this.maxSpeed = 12
  }

  applyForce(f) {
    this.acc.add(f)
  }

  update() {
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0
    if (this.pos.y < 0) this.pos.y = height
    if (this.pos.y > height) this.pos.y = 0
  }

    collide(o) {
    let d = dist(this.pos.x, this.pos.y, o.x, o.y)

    if (d < o.r + 2) {

        let dir = createVector(this.pos.x - o.x, this.pos.y - o.y)

        let strength = map(d, 0, o.r, 10, 2)

        dir.setMag(strength)

        this.vel.add(dir)

        this.vel.mult(0.6)

        this.pos.add(dir.mult(0.8))
    }
    }

  show() {
    stroke(180, 220, 255, 110)
    point(this.pos.x, this.pos.y)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
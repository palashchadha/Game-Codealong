class Game {
  constructor() {
    this.time = 0;
    this.player = null;
    this.obstacleArr = [];
  }
  start() {
    this.player = new Player();
    this.attachEventListeners();
    setInterval(() => {
      this.obstacleArr.forEach((elem) => {
        elem.moveDown();
      });
      if (this.time % 60 === 0) {
        const newObstacle = new Obstacle();
        this.obstacleArr.push(newObstacle);
      }
      this.obstacleArr.forEach((elem) => {
        if (
          this.player.positionX < elem.positionX + elem.width &&
          this.player.positionX + this.player.width > elem.positionX &&
          this.player.positionY < elem.positionY + elem.height &&
          this.player.height + this.player.positionY > elem.positionY
        ) {
          alert("Collision");
        }
      });

      this.time++;
    }, 50);
  }
  attachEventListeners() {
    document.addEventListener("keydown", (event) => {
      const key = event.key;
      switch (key) {
        case "ArrowLeft":
          this.player.moveLeft();
          break;
        case "ArrowRight":
          this.player.moveRight();
      }
    });
  }
}

class Player {
  constructor() {
    this.positionX = 45;
    this.positionY = 0;
    this.domElement = null;
    this.height = 20;
    this.width = 10;
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.id = "player";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
  moveLeft() {
    this.positionX--;
    if (this.positionX < 0) {
      this.positionX = 0;
    }
    this.domElement.style.left = this.positionX + "vw";
  }
  moveRight() {
    if (this.positionX > 100 - this.width) {
      this.positionX = 100 - this.width;
    }
    this.positionX++;
    this.domElement.style.left = this.positionX + "vw";
  }
}

class Obstacle {
  constructor() {
    this.positionX = Math.random() * 90;
    this.positionY = 100;
    this.domElement = null;
    this.width = 10;
    this.height = 20;
    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "obstacle";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "vh";
  }
}

const game = new Game();
game.start();

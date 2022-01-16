



class game {

    constructor() {
        this.initSettings();
    }

    init() {
        this.start();
    }

    initSettings() {
        this.poly = document.querySelector(".game_container");
        this.scoreLeft = document.querySelector(".score1");
        this.scoreRight = document.querySelector(".score2");
        const ball = document.querySelector(".ball");
        const playerLeft = document.querySelector(".player__left")
        const playerRight = document.querySelector(".player__right");


        this.ball = ball;
        this.playerLeft = playerLeft;
        this.playerRight = playerRight;

        this.ballTopPos = ball.offsetTop;
        this.ballRightPos = ball.offsetLeft + ball.clientWidth;
        this.ballBottomPos = ball.offsetTop + ball.clientHeight;
        this.ballLeftPos = ball.offsetLeft;


        this.playerLeftTopPos = parseInt(playerLeft.offsetTop);
        this.playerLeftRigthPos = parseInt(playerLeft.offsetLeft + playerLeft.clientWidth);
        this.playerLeftBottomPos = parseInt(playerLeft.offsetTop + playerLeft.clientHeight);
        this.playerLeftLeftPos = parseInt(playerLeft.offsetLeft);

        this.playerRightTopPos = parseInt(playerRight.offsetTop);
        this.playerRightRigthPos = parseInt(playerRight.offsetLeft + playerRight.clientWidth);
        this.playerRightBottomPos = parseInt(playerRight.offsetTop + playerRight.clientHeight);
        this.playerRightLeftPos = parseInt(playerRight.offsetLeft);
        this.end = false;

    }

    start() {
        const ball = document.querySelector(".ball");
        ball.style.top = "180px";
        ball.style.left = "378px";
        ball.style.left = this.ballLeftPos;

        document.addEventListener("keydown", (event) => {
            if (event.code == "ArrowUp") this.movePlayer(this.playerRight, "up");
            else if (event.code == "ArrowDown") this.movePlayer(this.playerRight, "down");
            else if (event.code == "KeyW") this.movePlayer(this.playerLeft, "up");
            else if (event.code == "KeyS") this.movePlayer(this.playerLeft, "down");
            else if (event.code == "Space" && this.end) {
                this.restart();
            }
        });

        this.moveBall();


    }

    movePlayer(player, pos) {
        if (pos == "up") {
            if (player.offsetTop > 0) {
                player.style.top = player.offsetTop - 20 + "px";
            }
        }
        else if (pos == "down") {
            if (player.offsetTop + player.clientHeight < this.poly.clientHeight) {
                player.style.top = player.offsetTop + 20 + "px";
            }
        }

    }

    moveBall() {
        this.end = false;
        let pos = parseInt(Math.random() * 10) > 5 ? 1 : -1;
        let ball = document.querySelector(".ball");

        ball.style.top = "180px";
        ball.style.left = "378px";

        // const degree = parseInt(20 + Math.random() * 150);

        // this.posX = parseInt(1 + (Math.cos(degree * Math.PI / 180)) * 9) * pos;
        // this.posY = parseInt(1 + (Math.sin(degree * Math.PI / 180)) * 9) * pos;

        let degreeArr = [15, 30, 45, 60, 75, 110, 120, 150, 165];

        let degree = parseInt(Math.random() * 9);

        
        this.posX = parseInt(1 + (Math.cos(degreeArr[degree] * Math.PI / 180)) * 9) * pos;
        this.posY = parseInt(1 + (Math.sin(degreeArr[degree] * Math.PI / 180)) * 9) * pos;
        this.getBallPos(ball);
    }
    getBallPos(ball) {

        const playerLeft = document.querySelector(".player__left")
        const playerRight = document.querySelector(".player__right");

        let interval = setInterval(() => {
            if (ball.offsetTop <= 0) {
                this.posY = -this.posY;
            }
            else if (ball.offsetTop >= 360) {
                this.posY = -this.posY;
            }

            if (ball.offsetLeft <= playerLeft.offsetLeft + playerLeft.clientWidth && playerLeft.offsetTop <= ball.offsetTop + ball.clientHeight && ball.offsetTop <= this.playerLeft.offsetTop + playerLeft.clientHeight) {
                this.posX = -this.posX;
            }
            if (ball.offsetLeft + ball.clientWidth >= playerRight.offsetLeft && playerRight.offsetTop <= ball.offsetTop + ball.clientHeight && ball.offsetTop <= this.playerRight.offsetTop + playerRight.clientHeight) {
                this.posX = -this.posX;
            }

            this.ball.style.top = ball.offsetTop + this.posY + "px";
            this.ball.style.left = ball.offsetLeft + this.posX + "px";
            this.check(ball, interval);

        }, 35);


    }

    check(ball, interval) {
        if (ball.offsetLeft < 10) {
            clearInterval(interval);
            this.scoreRight.textContent = +this.scoreRight.textContent + 1;
            this.end = true;
            return;
        }
        if (ball.offsetLeft + ball.clientWidth > 790) {
            clearInterval(interval);
            this.scoreLeft.textContent = +this.scoreLeft.textContent + 1;
            this.end = true;
            return;
        }

    }

    restart() {
        this.moveBall();
        return;
    }

}



new game()
    .init();
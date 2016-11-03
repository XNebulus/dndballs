var BALLDD = {
    
    canvas: null,
    balls: [],
    selected: null,
    
    init: function (canvas) {
        var ball1, ball2, ball3;
        this.canvas = canvas;
        this.canvas.onmousedown = function(evt) { BALLDD.startMove(evt);};
        this.canvas.onmousemove = this.mouseMove;
        this.canvas.onmouseup = this.stopMove;
        ball1 = new this.Ball(100, 100, 'red', 50);
        ball2 = new this.Ball(200, 200, 'green', 50);
        ball3 = new this.Ball(100, 300, 'blue', 50);
        this.balls.push(ball1);
        this.balls.push(ball2);
        this.balls.push(ball3);
        //this.balls = balls;
        setTimeout(function () {
            BALLDD.frame();
        }, 20);
        this.draw();
    },
    startMove: function (evt) {
        var pos = {}, 
            selected = BALLDD.selected, 
            balls = this.balls;
        pos.x = evt.pageX - canvas.offsetLeft;
        pos.y = evt.pageY - canvas.offsetTop;
        for (var i = 0, max = balls.length; i < max; i++) {
            var ball = balls[i];

            var distanceFromCenter = Math.sqrt(Math.pow(ball.x - pos.x, 2) + Math.pow(ball.y - pos.y, 2))
            if (distanceFromCenter <= ball.radius) {
                if (selected != null) selected.isSelected = false;
                BALLDD.selected = ball;
                ball.isSelected = true;
                BALLDD.draw();
                return;
            }
        }
    },
    mouseMove: function (evt) {
        var selected = BALLDD.selected,
            canvas = BALLDD.canvas;
        if (selected) {
            selected.x = evt.pageX - canvas.offsetLeft;
            selected.y = evt.pageY - canvas.offsetTop;
            BALLDD.draw();
        }
    },
    stopMove: function () {
        var selected = BALLDD.selected,
            canvas = BALLDD.canvas;
        if (selected.x >= canvas.width / 2) {
            selected.isMoving = true;
        }
        else {
            selected.isMoving = false;
        }
        selected.isSelected = false;
        BALLDD.selected = null;
    },
    draw: function () {
        var canvas = this.canvas,
            context = canvas.getContext("2d"),
            balls = this.balls;
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < balls.length; i++) {
            var ball = balls[i];

            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            context.fillStyle = ball.color;
            context.strokeStyle = "black";

            if (ball.isSelected) {
                context.lineWidth = 5;
            }
            else {
                context.lineWidth = 1;
            }

            context.fill();
            context.stroke();
        }
        
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(canvas.width / 2 , 0);
        context.lineTo(canvas.width / 2, canvas.height);
        context.stroke();
    },
    frame: function () {
        var balls = this.balls,
            canvas = this.canvas;
        for (var i = 0; i < balls.length; i++) {
            var ball = balls[i];
            if (ball.isMoving) {
                ball.x += ball.dx;
                ball.y += ball.dy;

                if ((ball.x + ball.radius > canvas.width) || (ball.x - ball.radius < canvas.width / 2)) {
                    ball.dx = -ball.dx;
                }

                if ((ball.y + ball.radius > canvas.height) || (ball.y - ball.radius < 0)) {
                    ball.dy = -ball.dy;
                }
            }
        }
        this.draw();
        setTimeout(function () {
            BALLDD.frame();
        }, 20);
    },
    Ball: function (x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.isSelected = false;
        this.isMoving = false;
        this.dx = 1;
        this.dy = 1;
    }
};
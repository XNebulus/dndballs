var BALLDD = (function () {
    var me = {}, canvas = null, balls = [], selected = null;

    me.init = function (canvasExt) {
        var ball1, ball2, ball3;
        canvas = canvasExt;
        canvas.onmousedown = startMove;
        canvas.onmousemove = mouseMove;
        canvas.onmouseup = stopMove;
        ball1 = new Ball(100, 60, 'red', 50);
        ball2 = new Ball(200, 160, 'green', 50);
        ball3 = new Ball(300, 260, 'blue', 50);
        balls.push(ball1);
        balls.push(ball2);
        balls.push(ball3);
        setTimeout(function () {
            frame();
        }, 20);
        draw();
    };
    return me;

    function startMove(evt) {
        var pos = {};
        pos.x = evt.pageX - canvas.offsetLeft;
        pos.y = evt.pageY - canvas.offsetTop;
        for (var i = 0, max = balls.length; i < max; i++) {
            var ball = balls[i];

            var distanceFromCenter = Math.sqrt(Math.pow(ball.x - pos.x, 2) + Math.pow(ball.y - pos.y, 2))
            if (distanceFromCenter <= ball.radius) {
                if (selected != null) selected.isSelected = false;
                selected = ball;
                ball.isSelected = true;
                draw();
                return;
            }
        }
    }

    function mouseMove(evt) {
        if (selected) {
            selected.x = evt.pageX - canvas.offsetLeft;
            selected.y = evt.pageY - canvas.offsetTop;
            draw();
        }
    }

    function stopMove() {
        if (selected.x >= canvas.width / 2) {
            selected.isMoving = true;
        }
        else {
            selected.isMoving = false;
        }
        selected.isSelected = false;
        selected = null;
    }

    function draw() {
        var context = canvas.getContext("2d");
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
        context.moveTo(canvas.width / 2, 0);
        context.lineTo(canvas.width / 2, canvas.height);
        context.stroke();
    }

    function frame() {
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
        draw();
        setTimeout(function () {
            frame();
        }, 20);
    }

    function Ball(x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.isSelected = false;
        this.isMoving = false;
        this.dx = 1;
        this.dy = 1;
    }

})();
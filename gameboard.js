var GameBoard = (function () {

    var
        columns = Config.columns,
        rows = Config.rows,
        node;


    function update() {

        Presentation.update(function (ctx) {

            if (!Config.showGrid) {
                return;
            }

            var width = Presentation.width(),
                height = Presentation.height();

            ctx.beginPath();

            for (var column = 0; column <= columns; column++) {

                var columnWidth = (width / columns) * column;

                ctx.moveTo(columnWidth, 0);
                ctx.lineTo(columnWidth, height)

            }

            for (var row = 0; row <= rows; row++) {

                var rowHeight = (height / rows) * row;

                ctx.moveTo(0, rowHeight);
                ctx.lineTo(width, rowHeight)

            }

            ctx.stroke();

        });

        Presentation.update(function (ctx) {

            ctx.save();
            ctx.font = "64px Arial Red";
            ctx.fillText("Snake", Presentation.width() / 2, Presentation.height() / 2);
            ctx.restore();

        });

        if (!node) {

            let x = random(Config.columns - 1),
                y = random(Config.rows - 1);

            if (!Snake.nodes().find(n => n.X() == x && n.Y() == y)) {
                node = new Node(x, y, "Blue");
                node.draw();
            }

        } else {
            node.draw();
        }

        if (Snake.isCollision(node.X(), node.Y())) {
            Snake.addNode();
            node = null;
        }

    }

    Engine.update(update);
    Engine.update(Snake.update);

    Snake.start();
    Engine.start();

})();
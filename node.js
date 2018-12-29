var Node = (function (x, y, color) {
    var
        x = x,
        y = y,
        color = color,
        direction = Config.KEY.LEFT;

    function draw() {

        let maxWidth = Presentation.width() / Config.columns;
        let maxHeight = Presentation.height() / Config.rows;

        Presentation.update(function (ctx) {
            ctx.save();

            let width = maxWidth * x;
            let height = maxHeight * y;

            ctx.fillStyle = color;
            ctx.fillRect(width, height, maxWidth, maxHeight);

            ctx.restore();
        });

    }

    function update(key) {
        let tempY = y;
        let tempX = x;

        if (key == Config.KEY.UP) {
            tempY--;
        } else if (key == Config.KEY.DOWN) {
            tempY++;
        } else if (key == Config.KEY.RIGHT) {
            tempX++;
        } else if (key == Config.KEY.LEFT) {
            tempX--;
        }

        y = tempY;
        x = tempX;
        direction = key;
    }

    return {
        draw,
        update,
        Direction: function () { return direction; },
        X: function () { return x; },
        Y: function () { return y; },
    };

});
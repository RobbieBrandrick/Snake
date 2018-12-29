var Engine = (function () {

    var
        buffer = [],
        update = function (item) {
            buffer.push(item);
        },
        gameloop = function (t) {
            requestAnimationFrame(gameloop)

            for (let item of buffer) {
                item(t);
            }

        },
        start = function () {

            requestAnimationFrame(gameloop)

        }
        ;

    return {
        start,
        update
    };

}());
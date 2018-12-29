var Presentation = (new function () {

    var
        canvas,
        canvasContext,
        canvasBuffer,
        canvasBufferContext,
        buffer = [],
        width = 0,
        height = 0,
        update = function (item) {

            buffer.push(item)
        },
        draw = function () {

            canvasBufferContext.clearRect(0, 0, width, height);
            canvasContext.clearRect(0, 0, width, height);

            for (let item of buffer) {

                item(canvasBufferContext);
            }
            canvasContext.drawImage(canvasBuffer, 0, 0);
            buffer = [];
        },
        resize = function () {
            width = window.innerWidth * 0.95;
            height = window.innerHeight * 0.95;
            canvas.width = width;
            canvas.height = height;
            canvasBuffer.width = width;
            canvasBuffer.height = height;
        },
        initialize = function () {
            canvas = document.createElement("canvas");
            canvasContext = canvas.getContext('2d');

            canvasBuffer = document.createElement("canvas");
            canvasBufferContext = canvasBuffer.getContext('2d');

            document.body.appendChild(canvas);

            resize();

            window.addEventListener("resize", function () {
                resize();
            })
        }()
        ;

    return {
        update,
        draw,
        width: function () { return width },
        height: function () { return height },
    };

}());

Engine.update(Presentation.draw);
var EngineStats = (function () {

    function update(timeStamp) {

        if (!Config.showEngineStats) return;

        Presentation.update(function (ctx) {

            var width = Presentation.width(),
                height = Presentation.height();

            ctx.save();
            ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            ctx.fillRect(width - 200, height - 100, width, height);
            ctx.restore();

            ctx.save();
            ctx.font = "12px Arial Black";
            ctx.fillText("Elapsed Time:" + (timeStamp / 1000), width - 190, height - 25);
            ctx.restore();

            ctx.save();
            ctx.font = "12px Arial Black";
            ctx.fillText("Nodes: " + Snake.nodes().length, width - 190, height - 50);
            ctx.restore();

        });

    }

    Engine.update(update);

}())
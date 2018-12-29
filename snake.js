var Snake = (function () {

    var maxWidth = Presentation.width() / Config.columns,
        maxHeight = Presentation.height() / Config.rows,
        xPos = Math.round(Config.columns / 2),
        yPos = Math.round(Config.rows / 2),
        direction = Config.KEY.LEFT,
        nextDirection = Config.KEY.LEFT,
        frame,
        nodes = []
        ;

    function update(t) {

        if (!frame) frame = t;

        let elapsed = (t - frame) / 1000;

        if (elapsed > .1) {

            direction = nextDirection;
            let prevDirection = direction;
            let tempDirection;
            let first = true;
            for (const node of nodes) {

                if (first) {
                    prevDirection = node.Direction();
                    node.update(direction);
                    first = false;
                } else {
                    tempDirection = node.Direction();
                    node.update(prevDirection);
                    prevDirection = tempDirection;
                }

            }

            if (isSelfCollision()) {
                start();
            }

            if (isBoarderCollision()) {
                start();
            }

            frame = t;
        }

        for (const node of nodes) {
            node.draw();
        }

    }

    function addNode() {

        let node = nodes[nodes.length - 1],
            x = node.X(),
            y = node.Y(),
            direction = node.Direction();
        ;

        if (direction == Config.KEY.UP) {
            y++;
        } else if (direction == Config.KEY.DOWN) {
            y--;
        } else if (direction == Config.KEY.RIGHT) {
            x--;
        } else if (direction == Config.KEY.LEFT) {
            x++;
        }

        nodes.push(new Node(x, y, "Red"));
    }

    function isCollision(x, y) {

        let headNode = nodes[0];

        if (!headNode) {
            return false;
        }

        let headNodeX = headNode.X(),
            headNodeY = headNode.Y()
            ;

        if (headNodeX == x && headNodeY == y) {
            return true;
        } else {
            return false;
        }

    }

    function isSelfCollision() {

        let headNode = nodes[0];

        if (!headNode) {
            return false;
        }

        let headNodeX = headNode.X(),
            headNodeY = headNode.Y()

        for (let i = 1; i < nodes.length; i++) {

            let node = nodes[i],
                nodeX = node.X(),
                nodeY = node.Y();

            if (nodeX == headNodeX && headNodeY == nodeY) {
                return true;
            }

        }

        return false;

    }

    function isBoarderCollision() {

        let headNode = nodes[0];

        if (!headNode) {
            return false;
        }

        let x = headNode.X();
        let y = headNode.Y();

        if (x < 0 || x >= Config.columns || y < 0 || y >= Config.rows) {
            return true;
        } else {
            return false;
        }
    }

    function start() {
        nodes = [];
        nodes.push(new Node(Math.round(Config.columns / 2), Math.round(Config.rows / 2), "Red"));
    }

    document.addEventListener("keydown", function (ev) {

        //If a key is pressed other than the ones that this event knows about then return
        let allowedKeys = [Config.KEY.UP, Config.KEY.RIGHT, Config.KEY.DOWN, Config.KEY.LEFT];
        if (!allowedKeys.includes(ev.keyCode)) {
            return;
        }

        //Prevent the new direction going into the snake
        if ((direction == Config.KEY.UP && ev.keyCode == Config.KEY.DOWN) ||
            (direction == Config.KEY.DOWN && ev.keyCode == Config.KEY.UP) ||
            (direction == Config.KEY.LEFT && ev.keyCode == Config.KEY.RIGHT) ||
            (direction == Config.KEY.RIGHT && ev.keyCode == Config.KEY.LEFT)) {

            return;

        }

        nextDirection = ev.keyCode;

    })

    return {
        start,
        update,
        nodes: function () { return nodes; },
        isCollision,
        addNode,
    }

}());
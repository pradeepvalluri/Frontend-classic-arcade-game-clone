var Engine = (function(global) {
    /*  set the canvas elements height/width and add it to the DOM.*/
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself*/
    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions*/
        update(dt);
        render();

        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this function */
        win.requestAnimationFrame(main);
    };

    /*  some initial setup*/
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }
    function render() {
        /* This array holds the relative URL to the image usedfor that particular row of the game level.*/
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png', 
                'images/stone-block.png', 
                'images/stone-block.png', 
                'images/grass-block.png', 
                'images/grass-block.png' 
            ],
            numRows = 6,
            numCols = 5,
            row, col;

       
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call the render function you have defined. */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    /* a new game menu or a game over screen */
    function reset() {
        // noop
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-pink-girl.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable*/
    global.ctx = ctx;
})(this);
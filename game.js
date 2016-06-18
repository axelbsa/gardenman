var map;
var layer;
var coll_layer;
var tiled_map = {};

var sprite;
var cursors;

var keyPress = false;
var scale_factor = 1.0;
var last_scale_factor = 1.0;

var duude_pos_x = 200;
var duude_pos_y = 200;

var game = new Phaser.Game(
        1024, 768, Phaser.AUTO, '',  
            {preload: preload, create: create, update: update}
        );

function preload() {
    tiled_map = game.load.tilemap('tile', 'map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/grassy_2.png');
    game.load.spritesheet('duude', 'assets/soldier.png', 64, 64);
}

function mouseWheel(event) {   
    if (game.input.mouse.wheelDelta > 0){
        last_scale_factor = scale_factor;
        scale_factor += 0.1;
    }

    if (game.input.mouse.wheelDelta < 0){
        last_scale_factor = scale_factor;
        scale_factor -= 0.1;
    }

}


function create() {
    game.stage.backgroundColor = '#bcbcbc';

    game.world.scale.setTo(scale_factor, scale_factor);

    cursors = game.input.keyboard.createCursorKeys();

    map = game.add.tilemap('tile', 48, 48, 64, 32);
    map.addTilesetImage('grassy_2', 'tiles');

    layer = map.createLayer('ground');
    coll_layer = map.createLayer('coll');
    layer.resizeWorld();

    sprite = game.add.sprite(duude_pos_x, duude_pos_y, 'duude');
    sprite.animations.add('up', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    sprite.animations.add('left', [9, 10, 11, 12, 13, 14, 15, 16, 17]);
    sprite.animations.add('down', [18, 19, 20, 21, 22, 23, 24, 25, 26]);
    sprite.animations.add('right', [27, 28, 29, 30, 31, 32, 33, 34, 35]);
    //sprite.animations.play('walk', 20, true);
    sprite.scale.set(0.8);

    game.camera.follow(sprite);

    cursors.up.onDown.add(
        function() {
            sprite.animations.play('up', 30, true);
        }
    );
    cursors.down.onDown.add(
        function() {
            sprite.animations.play('down', 30, true);
        }
    );
    cursors.left.onDown.add(
        function() {
            sprite.animations.play('left', 30, true);
        }
    );
    cursors.right.onDown.add(
        function() {
            sprite.animations.play('right', 30, true);
        }
    );

    game.input.keyboard.onDownCallback = function() {
        keyPress = true;
    }

    game.input.keyboard.onUpCallback = function() {
        keyPress = false;
    }

    game.input.mouse.mouseWheelCallback = mouseWheel;

}

function update() {
    // Don't scale each frame unless needed to
    if (last_scale_factor !== scale_factor) {
        game.world.scale.setTo(scale_factor, scale_factor);
        last_scale_factor = scale_factor;
    }

    if (keyPress === true) {

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            sprite.x -= 2;
            return;
        }else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            sprite.x += 2;
            return;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            sprite.y -= 2;
            return;
        }else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            sprite.y += 2;
            return;
        }
    }

    sprite.animations.stop(null, true);

}

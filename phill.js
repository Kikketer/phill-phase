import Phaser from 'phaser'

/**
 * The main Phill scene
 */
class Phill extends Phaser.Scene {
  key = 'phill'

  constructor() {
    super('Phill Scene')
  }

  preload() {
    this.load.spritesheet({
      key: 'phill',
      url: './assets/phillsprites.png',
      frameConfig: {
        frameWidth: 8,
        frameHeight: 16,
      },
    })

    // TODO Use a level tiles image
  }

  create() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('phill', { frames: [1] }),
      repeat: 0,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('phill', { frames: [2, 1] }),
      frameRate: 4,
      repeat: -1,
    })

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('phill', { frames: [2, 1] }),
      frameRate: 4,
      repeat: -1,
    })

    // Create the keyboard input
    this.cursors = this.input.keyboard.createCursorKeys()

    // Level (todo use the tile editor)
    const level = [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
    ]
    const map = this.make.tilemap({
      data: level,
      tileWidth: 8,
      tileHeight: 8,
    })
    const tiles = map.addTilesetImage('phill')
    const layer = map.createLayer(0, tiles, 0, 0)
    // map.setCollisionBetween(240, 256, true)

    // Show phill
    this.phill = this.physics.add.sprite(15, 15, 'phill', 1)
    this.phill.setBounce(0.2)
    // Setup collisions with ground and screen
    this.phill.setCollideWorldBounds(true)
  }

  update() {
    if (this.cursors.left.isDown) {
      this.phill.setVelocityX(-60)
      this.phill.anims.play('right', true)
      this.phill.flipX = true
    } else if (this.cursors.right.isDown) {
      this.phill.setVelocityX(60)
      this.phill.anims.play('right', true)
      this.phill.flipX = false
    } else {
      this.phill.setVelocityX(0)
      this.phill.anims.play('idle')
    }

    //  && this.phill.body.touching.down
    if (this.cursors.up.isDown) {
      this.phill.setVelocityY(-100)
    }
  }
}

export default Phill

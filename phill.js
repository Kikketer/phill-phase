import Phaser from 'phaser'

/**
 * The main Phill scene
 */
class Phill extends Phaser.Scene {
  key = 'phill'
  // static phill

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
      flipX: true,
    })

    // Show phill
    this.phill = this.physics.add.sprite(15, 15, 'phill', 1)
    // phill.play('walk')
    this.phill.setBounce(0.2)
    // Setup collisions with ground and screen
    this.phill.setCollideWorldBounds(true)
    // Create the keyboard input
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    if (this.cursors.left.isDown) {
      this.phill.setVelocityX(-60)

      this.phill.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.phill.setVelocityX(60)

      this.phill.anims.play('right', true)
    } else {
      this.phill.setVelocityX(0)

      this.phill.anims.play('idle')
    }

    if (this.cursors.up.isDown && this.phill.body.touching.down) {
      this.phill.setVelocityY(-330)
    }
  }
  // Have to use the `function` bit because we rely on `this` being Phaser
  // const create = function () {}
  // const pre = function () {}

  // const resultingConfig = { ...config }
  // const game = new Phaser(config)
}

export default Phill

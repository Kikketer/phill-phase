import Phaser from 'phaser'

/**
 * The main PhillScene scene
 */
class PhillScene extends Phaser.Scene {
  key = 'phill'

  constructor() {
    super('PhillScene Scene')
  }

  preload() {
    this.load.spritesheet({
      key: 'tiles',
      url: './images/Tiles.png',
      frameConfig: {
        frameWidth: 8,
        frameHeight: 8
      }
    })

    this.load.spritesheet({
      key: 'phill',
      url: './images/Phill.png',
      frameConfig: {
        frameWidth: 8,
        frameHeight: 16,
      },
    })

    // Tiled map
    this.load.tilemapCSV({
      key: 'level1-ground',
      url: './maps/level-1_Blocked.csv'
    })
    this.load.tilemapCSV({
      key: 'level1-bg',
      url: './maps/level-1_Background.csv'
    })
  }

  create() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('phill', { frames: [0] }),
      repeat: 0,
    })

    this.anims.create({
      key: 'waddle',
      frames: this.anims.generateFrameNumbers('phill', { frames: [1, 0] }),
      frameRate: 4,
      repeat: -1,
    })

    // Create the keyboard input
    this.cursors = this.input.keyboard.createCursorKeys()

    const bg = this.make.tilemap({
      key: 'level1-bg',
      tileWidth: 8,
      tileHeight: 8
    })

    const map = this.make.tilemap({
      key: 'level1-ground',
      tileWidth: 8,
      tileHeight: 8,
    })
    const groundTiles = map.addTilesetImage('tiles')
    // CSV uses the index in the createLayer param 1 (json you can give it a name)
    const groundLayer = map.createLayer(0, groundTiles, 0, 0)
    const bgLayer = bg.createLayer(0, groundTiles, 0, 0)
    map.setCollisionByExclusion([-1], true, false, 0)

    // Show phill
    this.phill = this.physics.add.sprite(15, 15, 'phill', 1)
    this.phill.setBounce(0.2)
    // Setup collisions with phill and screen
    this.phill.setCollideWorldBounds(true)
    // this.physics.add.collider(this.phill, map)
  }

  update() {
    if (this.cursors.left.isDown) {
      this.phill.setVelocityX(-60)
      this.phill.anims.play('waddle', true)
      this.phill.flipX = true
    } else if (this.cursors.right.isDown) {
      this.phill.setVelocityX(60)
      this.phill.anims.play('waddle', true)
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

export default PhillScene

import Phaser from 'phaser'
import phillScene from './phill'

const config = {
  type: Phaser.AUTO,
  width: 128,
  height: 128,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  render: {
    pixelArt: true,
  },
  zoom: 4,
  scene: phillScene,
}

const game = new Phaser.Game(config)

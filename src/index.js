import Phaser from 'phaser'
import phillScene from './scenes/PhillScene'

const config = {
  type: Phaser.AUTO,
  width: 16 * 8, // 16 tiles 8px each
  height: 16 * 8,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: true,
    },
  },
  render: {
    pixelArt: true,
  },
  zoom: 5,
  scene: [phillScene],
}

const game = new Phaser.Game(config)

import Phaser from 'phaser'
import config from './config'

export default () => {
  // Have to use the `function` bit because we rely on `this` being Phaser
  const create = function() {}
  const pre = function() {}

  const resultingConfig = {...config}
  const game = new Phaser(config)
}

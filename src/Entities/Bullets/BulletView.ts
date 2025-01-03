import { Container } from 'pixi.js';

export default class BulletView extends Container {
  private collisionBoxField = { x: 0, y: 0, width: 0, height: 0 };

  constructor() {
    super();

    this.collisionBox.width = 5;
    this.collisionBox.height = 5;
  }

  get collisionBox() {
    this.collisionBoxField.x = this.x;
    this.collisionBoxField.y = this.y;
    return this.collisionBoxField;
  }

  get hitBox() {
    return this.collisionBox;
  }
}

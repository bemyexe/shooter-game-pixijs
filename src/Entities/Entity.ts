export default class Entity {
  _view;

  public isActiveField: boolean = false;

  private isDeadState: boolean = false;
  private gravitableField: boolean = false;

  constructor(view: any) {
    this._view = view;
  }

  get x() {
    return this._view.x;
  }

  set x(value) {
    this._view.x = value;
  }

  get y() {
    return this._view.y;
  }

  set y(value) {
    this._view.y = value;
  }

  get gravitable() {
    return this.gravitableField;
  }

  set gravitable(value) {
    this.gravitableField = value;
  }

  get collisionBox() {
    return this._view.collisionBox;
  }

  get hitBox() {
    return this._view.hitBox;
  }

  get isActive() {
    return this.isActiveField;
  }
  set isActive(value) {
    this.isActiveField = value;
  }
  get isDead() {
    return this.isDeadState;
  }

  public dead() {
    this.isDeadState = true;
  }

  public resuraction() {
    this.isDeadState = false;
  }

  public removeFromStage() {
    if (this._view.parent !== null) {
      this._view.removeFromParent();
    }
  }
}

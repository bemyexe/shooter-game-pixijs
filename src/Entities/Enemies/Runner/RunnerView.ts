import {AnimatedSprite, Container, Sprite} from 'pixi.js';
import AssetsFactory from '../../../AssetsFactory';

export default class RunnerView extends Container {
  private bounds = {
    width: 0,
    height: 0,
  };

  private collision = {x: 0, y: 0, width: 0, height: 0};

  private stm = {
    currentState: 'default',
    states: {} as {[key: string]: Sprite | Container},
  };

  private rootNode!: Container;
  private assets: AssetsFactory;
  constructor(assets: AssetsFactory) {
    super();
    this.assets = assets;
    this.createNodeStructure();
    this.rootNode.pivot.x = 10;
    this.rootNode.x = 10;
    this.bounds.width = 20;
    this.bounds.height = 90;
    this.collision.width = this.bounds.width;
    this.collision.height = this.bounds.height;

    this.stm.states.run = this.getRunImage();
    this.stm.states.jump = this.getJumpImage();
    this.stm.states.fall = this.getFallImage();

    for (let key in this.stm.states) {
      this.rootNode.addChild(this.stm.states[key]);
    }
  }

  get collisionBox() {
    this.collision.x = this.x;
    this.collision.y = this.y;
    return this.collision;
  }

  get hitBox() {
    return this.collisionBox;
  }

  get isFliped() {
    return this.rootNode.scale.x < 0;
  }

  public showRun() {
    this.toState('run');
  }

  public showJump() {
    this.toState('jump');
  }

  public showFall() {
    this.toState('fall');
  }

  public flip(direction: number) {
    switch (direction) {
      case 1:
      case -1:
        this.rootNode.scale.x = direction;
    }
  }

  public showAndGetDeadAnimation() {
    this.rootNode.visible = false;
    this.collision.width = 0;
    this.collision.height = 0;

    const explosion = new AnimatedSprite(
      this.assets.getAnimationTextures('explosion')
    );
    explosion.animationSpeed = 0.2;
    explosion.x = -explosion.width / 2;
    explosion.loop = false;
    explosion.play();
    this.addChild(explosion);
    return explosion;
  }

  private createNodeStructure() {
    const rootNode = new Container();
    this.addChild(rootNode);
    this.rootNode = rootNode;
  }

  private getRunImage() {
    // const view = new Graphics();
    // view.rect(0, 0, 20, 90);
    // view.stroke(0xff0000);
    // view.skew.x = -0.1;

    const view = new AnimatedSprite(
      this.assets.getAnimationTextures('runnerrun')
    );
    view.animationSpeed = 0.1;
    view.play();
    view.y += 2;

    return view;
  }

  private getJumpImage() {
    // const view = new Graphics();
    // view.rect(0, 0, 40, 40);
    // view.stroke(0xff0000);
    // view.x -= 10;
    // view.y += 25;

    const view = new Sprite(this.assets.getTexture('runnerjump0000'));

    return view;
  }

  private getFallImage() {
    // const view = new Graphics();
    // view.rect(0, 0, 20, 90);
    // view.rect(10, 20, 5, 60);
    // view.stroke(0xff0000);
    // view.skew.x = -0.1;

    const view = new Sprite(this.assets.getTexture('runnerjump0000'));

    return view;
  }

  private toState(key: string) {
    if (this.stm.currentState === key) return;

    for (let key in this.stm.states) {
      this.stm.states[key].visible = false;
    }

    this.stm.states[key].visible = true;

    this.stm.currentState = key;
  }
}

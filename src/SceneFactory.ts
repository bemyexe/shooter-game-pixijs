import EnemiesFactory from './Entities/Enemies/EnemiesFactory';
import Hero from './Entities/Hero/Hero';
import Platform from './Entities/Platforms/Platform';
import PlatformFactory from './Entities/Platforms/PlatformFactory';
import PowerupFactory from './Entities/Powerups/PowerupFactory';

export default class SceneFactory {
  private platforms;
  private platformsFactory;
  private enemyFactory;
  private entities;
  private target;
  private powerupFactory;

  private blockSize = 128;

  constructor(
    platforms: Platform[],
    entities: any,
    platformFactory: PlatformFactory,
    enemyFactory: EnemiesFactory,
    target: Hero,
    powerupFactory: PowerupFactory
  ) {
    this.platforms = platforms;
    this.entities = entities;
    this.platformsFactory = platformFactory;
    this.enemyFactory = enemyFactory;
    this.target = target;
    this.powerupFactory = powerupFactory;
  }
  public createScene() {
    this.createDecorations();
    this.createPlatforms();
    this.createGround();
    this.createWater();
    this.createBossWall();

    this.createEnemies();
    this.createPowerups();

    this.createInteractive();
  }

  private createDecorations() {
    for (let i = 22; i < 52; i++) {
      this.platformsFactory.createJungle(this.blockSize * i, 0);
    }
  }

  private createPlatforms() {
    let xIndexes = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
    this.create(xIndexes, 276, this.platformsFactory.createPlatform);
    xIndexes = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25,
      34, 35, 36, 45, 46, 47, 48,
    ];
    this.create(xIndexes, 384, this.platformsFactory.createPlatform);
    xIndexes = [5, 6, 7, 13, 14, 31, 32, 49];
    this.create(xIndexes, 492, this.platformsFactory.createPlatform);
    xIndexes = [46, 47, 48];
    this.create(xIndexes, 578, this.platformsFactory.createPlatform);
    xIndexes = [8, 11, 28, 29, 30];
    this.create(xIndexes, 600, this.platformsFactory.createPlatform);
    xIndexes = [50];
    this.create(xIndexes, 624, this.platformsFactory.createPlatform);
  }
  private createGround() {
    let xIndexes = [9, 10, 25, 26, 27, 32, 33, 34];
    this.create(xIndexes, 720, this.platformsFactory.createStepBox);
    xIndexes = [36, 37, 39, 40];
    this.create(xIndexes, 600, this.platformsFactory.createBox);
    xIndexes = [42, 43];
    this.create(xIndexes, 492, this.platformsFactory.createBox);
    xIndexes = [35, 45, 46, 47, 48, 49, 50, 51, 52];
    this.create(xIndexes, 720, this.platformsFactory.createBox);
  }
  private createWater() {
    let xIndexes = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
      23, 24, 28, 29, 30, 31,
    ];
    this.create(xIndexes, 768, this.platformsFactory.createWater);
  }
  private createBossWall() {
    let xIndexes = [52]; // 52
    this.create(xIndexes, 170, this.platformsFactory.createBossWall);

    this.enemyFactory.createBoss(this.blockSize * 52, 440);
  }
  private createInteractive() {
    let xIndexes = [16, 17, 18, 19];
    this.createBridges(xIndexes);
  }

  private createBridges(xIndexes: number[]) {
    for (let i of xIndexes) {
      let bridge = this.platformsFactory.createBridge(this.blockSize * i, 384);
      bridge.setTarget(this.target);
      this.platforms.push(bridge);
      this.entities.push(bridge);
    }
  }
  private create(xIndexes: number[], y: number, createFunc: Function) {
    for (let i of xIndexes) {
      this.platforms.push(
        createFunc.call(this.platformsFactory, this.blockSize * i, y)
      );
    }
  }
  private createEnemies() {
    this.enemyFactory.createRunner(this.blockSize * 9, 290);
    this.enemyFactory.createRunner(this.blockSize * 10, 290);
    this.enemyFactory.createRunner(this.blockSize * 11, 290);
    this.enemyFactory.createRunner(this.blockSize * 13, 290);
    this.enemyFactory.createRunner(this.blockSize * 13 + 50, 290);
    this.enemyFactory.createRunner(this.blockSize * 13 + 100, 290);
    this.enemyFactory.createRunner(this.blockSize * 16, 290);
    this.enemyFactory.createRunner(this.blockSize * 20, 290);
    this.enemyFactory.createRunner(this.blockSize * 21, 290);
    this.enemyFactory.createRunner(this.blockSize * 29, 290);
    this.enemyFactory.createRunner(this.blockSize * 30, 290);
    let runner = this.enemyFactory.createRunner(this.blockSize * 40, 400);
    runner.jumpBehaviorKoef = 1;
    runner = this.enemyFactory.createRunner(this.blockSize * 42, 400);
    runner.jumpBehaviorKoef = 1;
    this.enemyFactory.createTourelle(this.blockSize * 10, 670);
    this.enemyFactory.createTourelle(this.blockSize * 22 + 50, 500);
    this.enemyFactory.createTourelle(this.blockSize * 29 + 64, 550);
    this.enemyFactory.createTourelle(this.blockSize * 35 + 64, 550);
    this.enemyFactory.createTourelle(this.blockSize * 45 + 64, 670);
    this.enemyFactory.createTourelle(this.blockSize * 48 + 64, 670);
  }

  private createPowerups() {
    this.powerupFactory.createPowerup(this.blockSize * 5, 150);
    this.powerupFactory.createPowerup(this.blockSize * 15, 150);
    this.powerupFactory.createPowerup(this.blockSize * 25, 150);
  }
}

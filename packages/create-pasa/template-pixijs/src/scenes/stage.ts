import { Assets, Sprite } from 'pixi.js';
import { AbstractScene, Manager } from '../manager';
import { createSpine } from '../utils/spine';

export class StageScene extends AbstractScene {
  private clampy: Sprite;
  private clampyVelocity: number;
  constructor() {
    super();

    // Inside assets.ts we have a line that says `"Clampy from assets.ts!": "./clampy.png",`
    this.clampy = Sprite.from('clampy');

    this.clampy.anchor.set(0.5);
    this.clampy.x = Manager.width / 2;
    this.clampy.y = Manager.height / 2;
    this.addChild(this.clampy);

    this.clampyVelocity = 5;

    const spineboy = createSpine(Assets.get('spineboy').spineData);
    spineboy.state.setAnimation(0, 'idle', true);
    spineboy.position.set(Manager.width / 2, Manager.height * 1.0);
    spineboy.scale.set(0.75);
    this.addChild(spineboy);
  }

  public override update(framesPassed: number): void {
    // Lets move clampy!
    this.clampy.x += this.clampyVelocity * framesPassed;

    if (this.clampy.x > Manager.width) {
      this.clampy.x = Manager.width;
      this.clampyVelocity = -this.clampyVelocity;
    }

    if (this.clampy.x < 0) {
      this.clampy.x = 0;
      this.clampyVelocity = -this.clampyVelocity;
    }
  }
}

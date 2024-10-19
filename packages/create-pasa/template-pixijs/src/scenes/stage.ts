import { Assets, Sprite } from 'pixi.js';

import { AbstractScene, Manager } from '../manager';
import { createSpine } from '../utils/spine';

export class StageScene extends AbstractScene {
  private readonly clampy: Sprite;
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
    spineboy.position.set(Manager.width / 2, Manager.height);
    spineboy.scale.set(0.75);
    this.addChild(spineboy);

    const { animations } = spineboy.skeleton.data;
    let animId = animations.findIndex((a) => a.name === 'idle');
    const changeAnim = () => {
      const animName = animations[animId++ % animations.length]!.name;
      spineboy.state.setAnimation(0, animName, true);
    };
    spineboy.eventMode = 'static';
    spineboy.on('pointerdown', changeAnim);
    changeAnim();
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

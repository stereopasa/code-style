import gsap from 'gsap';
import { Container, Graphics, Assets, RoundedRectangle } from 'pixi.js';

import { manifest } from '../assets';
import { AbstractScene, Manager } from '../manager';
import { toSeconds } from '../utils/math/time.ts';

import { StageScene } from './stage';

const constants = {
  loaderBarAppearingDelayMs: 300,
  loaderBarWidth: Manager.width * 0.95,
  colors: {
    idle: '0xD2D2D2',
    active: '0x016FE6',
    success: '0x65C728',
    error: '0xF62547',
  },
};

export class LoaderScene extends AbstractScene {
  // for making our loader graphics...
  private readonly loaderBar: Container;
  private readonly loaderBarBorder: Graphics;
  private readonly loaderBarFill: Graphics;

  private time = 0;
  private readonly appearingDelay: ReturnType<typeof setTimeout>;

  constructor() {
    super();

    constants.loaderBarWidth = Manager.width * 0.95;
    const roundedRect = new RoundedRectangle(0, 0, constants.loaderBarWidth, 30, 30);
    this.loaderBarFill = new Graphics().beginFill(0xffffff, 1).drawShape(roundedRect).endFill();
    // this.loaderBarFill.beginFill(0x008800, 1);
    // this.loaderBarFill.beginFill(0xffffff, 1);
    // this.loaderBarFill.drawRoundedRect(0, 0, loaderBarWidth, 30, 50);
    // this.loaderBarFill.drawShape(roundedRect);
    // this.loaderBarFill.endFill();
    this.loaderBarFill.scale.x = 0;

    this.loaderBarFill.tint = constants.colors.idle;

    this.loaderBarBorder = new Graphics().lineStyle(2, 0xffffff, 0.9).drawShape(roundedRect);
    // this.loaderBarBorder;
    // this.loaderBarBorder.drawRect(0, 0, loaderBarWidth, 30);

    this.loaderBar = new Container();
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(this.loaderBarBorder);
    this.loaderBar.position.x = (Manager.width - this.loaderBar.width) / 2;
    this.loaderBar.position.y = (Manager.height - this.loaderBar.height) / 2;
    this.addChild(this.loaderBar);

    this.loaderBar.visible = false;
    this.appearingDelay = globalThis.setTimeout(
      () => (this.loaderBar.visible = true),
      constants.loaderBarAppearingDelayMs,
    );

    this.initializeLoader().then(() => {
      this.gameLoaded();
    });
  }

  private async initializeLoader(): Promise<void> {
    await Assets.init({ manifest: manifest });

    const bundleIds = manifest.bundles.map((bundle) => bundle.name);

    this.time = Date.now();
    this.loaderBarFill.tint = constants.colors.active;
    await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this));
    // await new Promise((resolve) => setTimeout(resolve, 10_000));
  }

  private downloadProgress(ratio: number): void {
    gsap.killTweensOf(this.loaderBarFill.scale);
    const duration = ratio === 1 && Date.now() - this.time > 1000 ? 0.5 : 0;
    const onComplete = () => {
      if (ratio === 1) {
        this.loaderBarFill.tint = constants.colors.success;
      }
    };
    if (duration > 0) {
      gsap.to(this.loaderBarFill.scale, {
        x: ratio,
        duration,
        onComplete,
      });
    } else {
      this.loaderBarFill.scale.x = ratio;
      onComplete();
    }
  }

  private gameLoaded(): void {
    globalThis.clearTimeout(this.appearingDelay);
    const duration = toSeconds(Date.now() - this.time);
    const onComplete = () => {
      // Change scene to the game scene!
      Manager.changeScene(new StageScene());
    };
    gsap.killTweensOf(this.loaderBarFill.scale);
    if (duration > 1) {
      gsap.fromTo(
        this.loaderBarFill.scale,
        { x: this.loaderBarFill.scale.x },
        {
          x: 1,
          duration: 0.25,
          onComplete: () => {
            this.loaderBarFill.tint = constants.colors.success;
            void setTimeout(onComplete, 100);
          },
        },
      );
    } else {
      this.loaderBarFill.tint = constants.colors.success;
      this.loaderBarFill.scale.x = 1;
      setTimeout(onComplete, 100);
    }
  }
}

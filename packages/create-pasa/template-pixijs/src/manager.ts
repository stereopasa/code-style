import { Application, Container, DisplayObject, Graphics } from 'pixi.js';

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends DisplayObject {
  update(framesPassed: number): void;

  // we added the resize method to the interface
  resize(screenWidth: number, screenHeight: number): void;

  destroy(): void;
}

export abstract class AbstractScene extends Container implements IScene {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_framesPassed: number): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resize(_screenWidth: number, _screenHeight: number): void {}

  destroy(): void {}
}

export class Manager {
  private constructor() {
    /*this class is purely static. No constructor to see here*/
  }

  // Safely store variables for our game
  private static app: Application;
  private static currentScene: IScene;
  private static stage = new Container();

  // Width and Height are read-only after creation (for now)
  private static _width: number;
  private static _height: number;

  // With getters but not setters, these variables become read-only
  public static get width(): number {
    return Manager._width;
  }
  public static get height(): number {
    return Manager._height;
  }

  // Use this function ONCE to start the entire machinery
  public static initialize(width: number, height: number, background: number): void {
    // store our width and height
    Manager._width = width;
    Manager._height = height;

    // Create our pixi app
    Manager.app = new Application<HTMLCanvasElement>({
      view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
      resolution: Math.max(window.devicePixelRatio, 2),
      autoDensity: true,
      backgroundColor: background,
      resizeTo: window,
      // width: width,
      // height: height,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis.__PIXI_APP__ = Manager.app;
    this.stage.pivot.set(width / 2, height / 2);
    const area = new Graphics()
      .beginFill(0xff0000, 0.05)
      // .drawRect(-width / 2, -height / 2, width, height)
      .drawRect(0, 0, width, height)
      .endFill();
    this.stage.addChild(area);
    Manager.app.stage.addChild(this.stage);

    Manager.app.ticker.add(Manager.update);

    window.addEventListener('resize', Manager.resize);
    Manager.resize();
  }

  public static resize(): void {
    // if we have a scene, we let it know that a resize happened!
    if (Manager.currentScene) {
      Manager.currentScene.resize(Manager.width, Manager.height);
    }
    // current screen size
    const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    Manager.stage.position.set(screenWidth / 2, screenHeight / 2);

    // uniform scale for our game
    const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);

    // the "uniformly englarged" size for our game
    // const enlargedWidth = Math.floor(scale * Manager.width);
    // const enlargedHeight = Math.floor(scale * Manager.height);

    // margins for centering our game
    // const horizontalMargin = (screenWidth - enlargedWidth) / 2;
    // const verticalMargin = (screenHeight - enlargedHeight) / 2;

    Manager.stage.scale.set(scale);

    // now we use css trickery to set the sizes and margins
    // const view = Manager.app.view as HTMLCanvasElement;
    // view.style.width = `${enlargedWidth}px`;
    // view.style.height = `${enlargedHeight}px`;
    // view.style.marginLeft = view.style.marginRight = `${horizontalMargin}px`;
    // view.style.marginTop = view.style.marginBottom = `${verticalMargin}px`;
  }

  // Call this function when you want to go to a new scene
  public static changeScene(newScene: IScene): void {
    // Remove and destroy old scene... if we had one..
    if (Manager.currentScene) {
      Manager.stage.removeChild(Manager.currentScene);
      Manager.currentScene.destroy();
    }

    // Add the new one
    Manager.currentScene = newScene;
    Manager.stage.addChild(Manager.currentScene);
  }

  // This update will be called by a pixi ticker and tell the scene that a tick happened
  private static update(framesPassed: number): void {
    // Let the current scene know that we updated it...
    // Just for funzies, sanity check that it exists first.
    if (Manager.currentScene) {
      Manager.currentScene.update(framesPassed);
    }
  }
}

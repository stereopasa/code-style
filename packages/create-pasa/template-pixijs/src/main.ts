import './style.css';
import 'pixi-spine';
import { designConfig } from './constants';
import { Manager } from './manager';
import { LoaderScene } from './scenes/loader';

// const urlParams = new URLSearchParams(window.location.search);
// const forceCanvas = (urlParams.get('forceCanvas')?.toLowerCase() || '') === 'true';

// gui.add({ forceCanvas }, 'forceCanvas').onChange((value: boolean) => {
//   urlParams.set('forceCanvas', String(value));
//   location.search = urlParams.toString();
// });

const { content, backgroundColor } = designConfig;
Manager.initialize(content.width, content.height, backgroundColor);

const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);

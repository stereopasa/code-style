import { GUI, Controller } from 'lil-gui';

export const gui = new GUI();
gui.add({ fn: () => gui.hide() }, 'fn').name('❌ close');

export const disableControl = (ctrl: Controller): void => {
  if (ctrl != null) {
    ctrl.domElement.style.pointerEvents = 'none';
    ctrl.domElement.style.opacity = '0.5';
  }
};

export const enableControl = (ctrl: Controller): void => {
  if (ctrl != null) {
    ctrl.domElement.style.pointerEvents = 'auto';
    ctrl.domElement.style.opacity = '1';
  }
};

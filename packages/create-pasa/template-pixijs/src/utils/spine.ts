import { ISkeletonData, Spine } from 'pixi-spine';

export const createSpine = (data: ISkeletonData): Spine => {
  const spine = new Spine(data);
  // spine.autoUpdate = false;
  spine.skeleton.setBonesToSetupPose();
  spine.skeleton.setSlotsToSetupPose();
  spine.update(0);
  return spine;
};

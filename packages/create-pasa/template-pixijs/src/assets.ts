import { Assets, AssetsManifest } from 'pixi.js';

export const loadAssets = async () => {
  const atlasRawData = await Assets.load({
    src: 'assets/spine/spineboy.atlas',
    data: { image: await Assets.load('assets/spine/spineboy.png') },
  });
  await Assets.load([
    { src: 'assets/spine/spineboy-pro.json', alias: ['spineboy'], data: { atlasRawData } },
    { src: 'assets/images/loading-circle.png', alias: ['loadingCircle'] },
    { src: 'assets/images/background-tile.png', alias: ['backgroundTile'] },
  ]);
};

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: 'bundleName',
      assets: [
        { name: 'clampy', srcs: 'assets/images/clampy.png' },
        { name: 'spineboy', srcs: 'assets/spine/spineboy-pro.json' },
      ],
      // assets: {
      //   'Clampy the clamp': 'assets/images/clampy.png',
      //   'Clampy from assets.ts!': 'assets/images/clampy.png',
      //   // 'another image': 'assets/monster.png',
      // },
    },
  ],
};

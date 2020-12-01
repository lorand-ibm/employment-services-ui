import fs from 'fs';
import path from 'path';

const getFileExtension = filename => path.extname(filename).substring(1);

const normalizeAssets = assets => (Array.isArray(assets) ? assets : [assets]);

const createChunksJson = (assetsByChunkName, publicPath) => {
  const result = {};

  Object.keys(assetsByChunkName).map(chunkName => {
    normalizeAssets(assetsByChunkName[chunkName]).map(assetName => {
      const extensionName = getFileExtension(assetName);
      if (assetName.match(/hot-update/)) return;

      if (!result[extensionName]) {
        result[extensionName] = [];
      }

      result[extensionName].push(`${publicPath}${assetName}`);
    });
  });

  return result;
};

const writeChunksFile = (outputPath, statsJson) => {
  const chunksJson = createChunksJson(statsJson.assetsByChunkName, statsJson.publicPath);

  fs.writeFile(outputPath, JSON.stringify(chunksJson), function (err) {
    if (err) {
      throw err;
    }
  });
};

class ChunkFilePlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tap('ChunkFilePlugin', stats => {
      const outputPath = path.join(
        compiler.context,
        this.options.filename || 'webpack-chunks.json',
      );
      writeChunksFile(outputPath, stats.toJson());
    });
  }
}

export default ChunkFilePlugin;

const vite = require("vite");

const path = require("path");

const fs = require("fs");

let currentFolderPath = __dirname;

let srcFolderPath = path.resolve(currentFolderPath, "src");

let srcClientFolderPath = path.resolve(srcFolderPath, "client");

let srcClientComponentsFolderPath = path.resolve(srcClientFolderPath, "components");

let srcClientStaticAssetsFolderPath = path.resolve(srcClientFolderPath, "static-assets");

let publicFolderPath = path.resolve(currentFolderPath, "public");

/**
 * 
 * @returns {object}
 */
function getAllPageEntries()
{
    let pageEntries = {};

    for (const fileName of fs.readdirSync(srcClientFolderPath))
    {
        let fileExtension = path.extname(fileName);

        if (fileExtension != ".html")
        {
            continue;
        }

        let fileNameWithoutExt = fileName.replace(fileExtension, "");

        let filePath = path.resolve(srcClientFolderPath, fileName);

        pageEntries[fileNameWithoutExt] = filePath;
    }

    return pageEntries;
}

/**
 * @returns {object}
 */
function getAllComponentEntries()
{
  let componentEntries = {};

  for (const fileName of fs.readdirSync(srcClientComponentsFolderPath))
  {
    let filePath = path.resolve(srcClientComponentsFolderPath, fileName);

    let fileExtension = path.extname(fileName);

    let fileNameWithoutExtension = fileName.replace(fileExtension, "");

    componentEntries[`components/${fileNameWithoutExtension}`] = filePath;
  }

  return componentEntries;
}

/**
 * 
 * @returns {object}
 */
function getAllEntries()
{
  let allEntries = Object.assign(
    getAllPageEntries(),
    getAllComponentEntries()
  );

  return allEntries;
}

export default vite.defineConfig({
  root: srcClientFolderPath,
  build: {
    rollupOptions: {
      input: getAllEntries()
    },
    outDir: publicFolderPath
  },
  publicDir: srcClientStaticAssetsFolderPath
});
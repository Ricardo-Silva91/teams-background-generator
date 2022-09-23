import axios from 'axios';
import fs from 'fs';
import path from 'path';
// import * as url from 'url';

// eslint-disable-next-line no-underscore-dangle
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
// eslint-disable-next-line no-nested-ternary
const pathToTeamsBackgrounds = process.platform.includes('darwin')
  ? path.resolve('~/Library/Application Support/Microsoft/Teams/Backgrounds/Uploads')
  : process.platform.includes('win')
    ? path.join(process.env.APPDATA, 'Microsoft/Teams/Backgrounds')
    : null;

console.log('will download to:', pathToTeamsBackgrounds);

export const testUtils = () => 'abc';

export const downloadImg = async (link, name = 'test') => {
  if (!link) {
    console.error('link not provided');
    return;
  }

  if (!pathToTeamsBackgrounds || !fs.existsSync(pathToTeamsBackgrounds)) {
    console.error('teams backgrounds folder not found 😥');
    return;
  }

  const downloadPath = path.join(pathToTeamsBackgrounds, `${name}.jpg`);
  const downloadPathThumb = path.join(pathToTeamsBackgrounds, `${name}_thumb.jpg`);
  const writer = fs.createWriteStream(downloadPath);
  const writerThumb = fs.createWriteStream(downloadPathThumb);
  const response = await axios({
    url: link,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);
  response.data.pipe(writerThumb);

  await new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

export default 'here';

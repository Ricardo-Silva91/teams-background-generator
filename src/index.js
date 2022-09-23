import { downloadImg } from './utils/generic.utils.js';

const args = process.argv.slice(2);
const link = args[0];
const name = args[1];

await downloadImg(link, name);

const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, 'frontend', 'src'); // Adjusted to your folder structure
const extensionsToCheck = ['.tsx', '.ts', '.jsx', '.js']; // Adjust based on your code

// List of your image filenames (without extension) you converted to webp
const imageNames = [
  '603d9229-98a6-4c46-a82d-4ffec7dea39e',
  'feast',
  'open',
  'wordfor',
  'celebrate',
  'June',
  'church_front',
  'simon-takatomi-bLxT-7cQHxc-unsplash',
  'praise',
  'plan',
  'about',
  'trees',
  'barbecuees',
  'Prayers',
  'cloth',
  'worship',
  'Bible',
  'scriptures',
  'networking-concept-still-life-arrangement',
  'burden',
  'time',
  'mountain',
  'Nature',
  'new',
  'strategic',
  'boho'
];

// Helper: Recursively get all files in src folder with desired extensions
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else if (extensionsToCheck.includes(path.extname(file))) {
      results.push(filePath);
    }
  });
  return results;
}

// Replace imports in each file
function replaceImports() {
  const files = getFiles(srcDir);
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    imageNames.forEach(name => {
      // Regex to find import statements with jpg or png for this image name, e.g.
      // import img from './assets/feast.jpg' or "import feast from '../images/feast.png"
      const regex = new RegExp(`(['"\`])([^'"\`]*${name})\\.(png|jpg)(['"\`])`, 'g');

      // Replace .png or .jpg with .webp
      content = content.replace(regex, (match, p1, p2, p3, p4) => {
        return `${p1}${p2}.webp${p4}`;
      });
    });

    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated imports in: ${file}`);
    }
  });
}

replaceImports();

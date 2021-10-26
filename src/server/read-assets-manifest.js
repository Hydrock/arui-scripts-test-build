const path = require('path');
const fs = require('fs');

export function readAssetsManifest() {
    // читаем манифест
    const manifestPath = path.join(process.cwd(), '.build/webpack-assets.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    const js = [];
    const css = [];
    // vendor должен идти перед main
    ['vendor', 'main'].forEach((key) => {
        if (!manifest[key]) { // в дев сборке vendor.js не формируется
            return;
        }
        if (manifest[key].js) {
            js.push(manifest[key].js);
        }
        if (manifest[key].css) {
            css.push(manifest[key].css);
        }
    });

    return {
        js, css
    };
}

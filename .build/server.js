"use strict";
// ignore attempts to require any types of assets
(() => {
    // simply ignore css files, it wont cause any damage
    const ignoreExtensions = [
        '.css'
    ];
    // warn about other requires, because it may lead to unexpected behaviour in production
    const warnExtensions = [
        '.gif',
        '.jpeg',
        '.jpg',
        '.ico',
        '.png',
        '.xml',
        '.svg',
        '.mp4',
        '.webm',
        '.ogv',
        '.aac',
        '.mp3',
        '.wav',
        '.ogg'
    ];
    const noop = () => { };
    const warn = (_, path) => console.warn(`\u001B[0;31mWARNING!
    Trying to require ${path} in node.js.
    Non-js files is ignored when required in node_modules\u001B[0m`);
    ignoreExtensions.forEach(e => require.extensions[e] = noop);
    warnExtensions.forEach(e => require.extensions[e] = warn);
})();

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/read-assets-manifest.js":
/*!********************************************!*\
  !*** ./src/server/read-assets-manifest.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "readAssetsManifest": () => (/* binding */ readAssetsManifest)
/* harmony export */ });
const path = __webpack_require__(/*! path */ "path");

const fs = __webpack_require__(/*! fs */ "fs");

function readAssetsManifest() {
  // читаем манифест
  const manifestPath = path.join(process.cwd(), '.build/webpack-assets.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const js = [];
  const css = []; // vendor должен идти перед main

  ['vendor', 'main'].forEach(key => {
    if (!manifest[key]) {
      // в дев сборке vendor.js не формируется
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
    js,
    css
  };
}

/***/ }),

/***/ "@hapi/hapi":
/*!*****************************!*\
  !*** external "@hapi/hapi" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("@hapi/hapi");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _read_assets_manifest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./read-assets-manifest.js */ "./src/server/read-assets-manifest.js");
const Hapi = __webpack_require__(/*! @hapi/hapi */ "@hapi/hapi");



const init = async () => {
  const server = Hapi.server({
    port: 3000 // host: 'localhost'

  });
  let assets = [];

  try {
    assets = (0,_read_assets_manifest_js__WEBPACK_IMPORTED_MODULE_0__.readAssetsManifest)();
  } catch (e) {}

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return `
                <html>
                    <head>
                    </head>
                    <body>
                        <div id="react-app">app content</div>
                        <script type="text/javascript" src="/${assets.js[0]}" defer ></script>
                    </body>
                </html>
            `;
    }
  });
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});
init();
})();

/******/ })()
;
//# sourceMappingURL=server.js.map
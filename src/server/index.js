const Hapi = require('@hapi/hapi');

import { readAssetsManifest } from './read-assets-manifest.js';

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        // host: 'localhost'
    });

    let assets = [];

    try {
        assets = readAssetsManifest();
    } catch (e) {
        
    }

    console.log('assets', assets);

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
                        <script type="text/javascript" src="/${ assets.js[0] }" defer ></script>
                    </body>
                </html>
            `;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

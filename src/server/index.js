const Hapi = require('@hapi/hapi');

import { readAssetsManifest } from './read-assets-manifest.js';

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            try {
                assets = readAssetsManifest();
            } catch (e) {
                
            }

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

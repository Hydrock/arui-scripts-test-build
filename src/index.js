import React from 'react'
import ReactDOM from 'react-dom'
import App from './app';

ReactDOM.render(
    <App />,
    document.getElementById('react-app')
);
// if (module.hot) {
//     module.hot.accept('./app', () => {
//         const NextAppAssignments = require('./app').default;
//         ReactDOM.render(
//             <NextAppAssignments />,
//             document.getElementById('react-app')
//         );
//     });
// }

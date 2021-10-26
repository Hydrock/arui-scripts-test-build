import React from 'react'
import ReactDOM from 'react-dom'
import App from './app';
import { AppContainer } from 'react-hot-loader';

ReactDOM.render(
    <AppContainer><App /></AppContainer>,
    document.getElementById('react-app')
);
if (module.hot) {
    module.hot.accept('./app', () => {
        const NextAppAssignments = require('./app').default;
        ReactDOM.render(
            <AppContainer><NextAppAssignments /></AppContainer>,
            document.getElementById('react-app')
        );
    });
}

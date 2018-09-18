import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { injectCSS } from './utils/css-manager';
import { theme } from './utils/theme';

injectCSS(theme);

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
// registerServiceWorker();

import { h, render } from 'preact';

let root;

function init() {
    let App = require('./demo').default;
    root = render(<App />, document.body, root);
}


if (module.hot) {
    //require('preact/devtools');   // turn this on if you want to enable React DevTools!
    module.hot.accept('./demo', () => requestAnimationFrame(init) );
}

init();
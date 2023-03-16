// npm install react-app-rewired --save-dev

//customize-cra react-app-rewired -D
//chuyển dependentces lên, sửa react-app-rewued ở scripts
//copy config-overrides
//npm install --save-dev babel-plugin-module-resolver
//copy babelrc,jsconfig.json
//copy prettier,.vscode
//scss GlobalStyles
//// npm install --save normalize.css reset css
// "scripts": {
//     -   "start": "react-scripts start",
//     +   "start": "react-app-rewired start",
//     -   "build": "react-scripts build",
//     +   "build": "react-app-rewired build",
//     -   "test": "react-scripts test",
//     +   "test": "react-app-rewired test",
//         "eject": "react-scripts eject"
//     }
// npm install --save-dev babel-plugin-module-resolver

const { override, useBabelRc } = require('customize-cra');

module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),
);

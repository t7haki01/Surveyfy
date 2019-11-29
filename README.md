This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## TODO

1. "npm install" for application dependencies
2. Set proper values for corresponding fields under
- database.js
- private.key
- public.key
*If API port would be used differently then change the url in './src/settings/setting.json', then build again

## Scenario

Company can make survey for own business usage,
Customer can participate on provided survey so that archieve point/promotion.

1. Client A is "company" - can make/edit/delete survey
2. Client B is "customer" - can participate on survey
- Client A can check survey result, but not able to modify

## Description

Fullstack project in Autumn 2018,
- Original Front end git repository - https://github.com/tapiopa/SurveyApplication
- Original REST API repository - https://github.com/t7haki01/surveyAPI
- Deploy in heroku, https://salty-sea-09049.herokuapp.com/login // ex) customerA:test1
* Bit buggy due to old/vulnerable dependencies and hosting/addon issues

This repository is reformatted to provide application in a single node, root and port

- Below for the react JS
-------------------------------------------------------------------------------------------------------------
### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

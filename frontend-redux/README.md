# React & redux starter
This starter is create for making your live more easy. Here is applyied a few the simple and useful solutions for all basic UI problems, such popups and themes.

## Available scripts:

1. `yarn start` - start dev server on `localhost:3000`
2. `yarn test` - start testing
3. `yarn build` - build sources into `/build` folder
4. `yarn lint` - make *eslint* check of the project files
5. `yarn storybook` - wake up project storybook

## Project folders
1. `actionCreators` - here should be placed the list of app actions creators. View action creators should be located in `view` folder.
2. `actionTypes` - here should be the list of app action types. Each action type should be wrapped into `namespace` according to it namespace. View action types should be located in `view` folder.
3. `components` - here should be the shared components, that can be used in any part of application. All components should be pure (Has no connection with store). All modals should be added in `modals` folder.
4. `config` - here should be located an configuration of the app. For example language setup of the project.
5. `constants` - here should be located app constants. View constants should be in view folder.
6. `domains` - it's grouped shared peaces, for example *user* information may used on a few screens but should be the same.
7. `helpers` - it's pure function, that help us.
8. `locales` - it's folder with lang dictionaries. All keys should be grouped by logic or view level.
9. `pages` - the folder with all app pages. Each page should include:
    1. `[PageName].js` - file with page realization.
    2. `index.js` - page container.
    3. `selector.js` - `mapStateToProps` selector, that created using `reselect`.
    4. `styles.js` - view jss styles.
10. `reducers` - the folder, that contains all app reducers. View reducers should be located in `view` folder.
11. `router` - it is specific component with all routes-components mapping.
12. `sagas` - folder with all app sagas. All business logic in the app should be realized on sagas level. View sagas should be located in `view` folder.
13. `selectors` - folder with all views store selectors.
14. `services` - folder with specific services, such as transformation store to localstorage or react scripts worker.
15. `stories` - react storybook stories for testing pure components of the app.
16. `store` - redux store with all middlewares and reducers.
17. `theme` - ui theme of the application

## Modals
For creating modal you should make a few steps:
1. Create modal type in `constants/modals`.
2. Create action creator in `actionCreators/modals` using `openModal` as base and pass required type.
3. Create modal component in `components/Modal`. You can use `connect` for binding state to modal.
4. Add in `mapTypeToModal` pair with type and component into `components/ModalPortal`.
5. Enjoy.

## Main libraries:
* `React`
* `React Router`
* `Redux`
* `React Redux Router`
* `MaterialUI@next`
* `Redux-sagas`
* `Redux-form`
* `Immutable`
* `React-Jss`
* `I-18next`
* `Reselect`
* `Redux-Actions`

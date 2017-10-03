# frontend-starter
Basic fronted starter.

## Available scripts:

1. `npm start` - start dev server on `localhost:3000`
2. `npm test` - start testing
3. `npm run build` - build sources into `/build` folder

## Main libraries:
1. `React`
2. `React Router`
3. `Redux`
4. `React Redux Router`
5. `MaterialUI@next`
6. `Redux-sagas`
7. `Redux-form`
8. `Immutable`
9. `React-Jss`
10. `I-18next`
11. `Reselect`

## Project folders
1. `actionCreators` - here should be placed the list of views actions creators.
2. `actionTypes` - here should be the list of views action types. Each action type should be wrapped into `namespace` according to his namespace
3. `components` - here schould be the shared components, that can be used in any part of application. All components should be pure. Exception is forms. They should include separate container in `index.js` and separate form to test.
4. `constants` - here should be view constants.
5. `domains` - it's grouped shared peaces, for example *user* information may used on a few screens but should be the same.
6. `helpers` - it's pure function.
7. `locales` - it's folder with lang dictionaries.
8. `pages` - the folder with all app pages. Each page should include:
    7.1. `[PageName].js` - file with page realization.
    7.2. `index.js` - page container.
    7.3. `selector.js` - `mapStateToProps` selector, that created using `reselect`.
9. `reducers` - the folder, that contains all view reducers.
10. `router` - it is specific component with all routes-components mapping.
11. `sagas` - folder with all view sagas. These sagas include business logic.
12. `services` - folder with specific services, such as transformation store to localstorage or react scripts worker.
13. `store` - folder with creation of the store.
14. `theme` - ui theme of the application

# Vue frontend starter
This starter is create for making your live more easy. Here is applyied a few the simple and useful solutions for all basic UI problems, such popups and themes.

## Available scripts:
1. `yarn dev` - start dev server on `localhost:3000`
2. `yarn build` - build sources into `/build` folder
3. `yarn lint` - make *eslint* check of the project files

## Project src folders
1. `components` - simple vue components, that can be reused in any place of the application. Exceptions: Header, Footer and ModalPortals. Each component contains:
    1.1. `index.js` - component export (used in imports of the component).
    1.2. `[ComponentName].js` - component template with links to script and styles.
    1.3. `component.js` - functional component body (container). MapGetters and mapActions should be located in this file.
    1.4. `style.scss` - component styles. Can import theme files with variables and theme aliases.
2. `constants` - app constants folder.
3. `helpers` - it's pure function and reusable functions, that realized specific functionality and help us.
4. `pages` - the folder with all app pages. Page can contains sub pages. Pages has the same structure as component. Also may create own modules.
5. `routes` - routes - components map.
6. `services` - folder with specific services, such as http requests or communication with some 3th party service.
7. `store` - vuex app state storage. Store it is union of modules. Each module contains:
    7.1. `actions.js` - file with actions to be called for changing store. Business logic of module should be here. Can call services to make some async work and mutations to change state.
    7.2. `constants.js` - some constant variables.
    7.3. `formatters.js` - helpers for data formatting on service layer.
    7.4. `getters.js` - module getters for selecting current state value from module. Can be calculated. Used on view layer.
    7.5. `index.js` - module union. Should export object with 4 fields: actions, getters, state and mutations.
    7.6. `mutation-types.js` - action types for changing state. Some kind of action types from redux.
    7.7. `mutations.js` - description of: how state should be changed in some cases. You should keep state link during mutation!!!
    7.8. `services.js` - functional layer. Chould be called on action layer. Can make asunc request and has access to common app services.
    7.9. `state.js` - observable object for storing app state.
8. `theme` - sass common styles such as font aliases and variables.
9. `views` - html views templates for HtmlWebpack plugin.

## Modals
For creating modal you should make a few steps:
1. Create modal type in `store/modules/modals/constants`.
2. Create action in `store/modules/modals/actions` using `OPEN_MODAL` mutation type.
3. Create modal component in `components/modals`.
4. Register modal in `components/ModalsContainer/component.js`.
5. Add modal rendering in `components/ModalsContainer/ModalContainer.vue`.
5. Enjoy.

## Localstorage
Configured be object, exported from `constants/localstorage.js`.
    - `key` - key for storing state in localstorage,
    - `paths` - paths to stored subsets.
    - See more in `vuex-persistedstate` docs.

## Main libraries:
1. `Vue`
2. `Vue Router`
3. `Vuex`
4. `Vuex-persistedstate`
5. `Lodash`
6. `Sass`

## Notes
1. Each lodash import should be from specific file, such as `import isString from 'lodash/isString';'`.
2. Keep state link during mutation.
3. All app data should be lodcated in state.

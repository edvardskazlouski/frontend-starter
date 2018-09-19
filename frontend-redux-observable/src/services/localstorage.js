import { Map } from 'immutable';

/**
 * Localstorage configurator, that returns object to configure redux localstorage middleware
 * @param key {string} - name of area in local storage
 * @param fields {array} - list of objects to configure
 * @param fields.name {string} - name to store in localstorage
 * @param fields.path {array} - path to value in store
 */
export default (key, fields) => ({
  key,

  serialize: collection => {
    return JSON.stringify(fields.reduce((acc, field) => {
      acc[field.name] = collection.getIn(field.path);
      return acc;
    }, {}));

  },

  deserialize : serializedDate => {
    const data = JSON.parse(serializedDate) || {};

    return fields.reduce((acc, field) => {
      return acc.setIn(field.path, data[field.name]);
    }, new Map());
  },

  merge: (initialState, persistedState) => {
    return  fields.reduce(
      (acc, field) => {
        return acc.setIn(field.path, persistedState.getIn(field.path));
      },
      initialState
    );
  },

  slicer:
    paths =>
      state =>
        paths.reduce(
          (subset, path) => subset.set(path, state.get(path)),
          new Map()
        )
});
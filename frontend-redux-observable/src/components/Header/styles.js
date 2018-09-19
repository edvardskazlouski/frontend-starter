export default () => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  languagesRoot: {
    display: 'flex',
    alignItems: 'center',

    '& > *': {
      marginRight: 10,
    },
  },
});

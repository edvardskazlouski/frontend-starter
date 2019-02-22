export default function() {
  return {
    root: {
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
  };
}

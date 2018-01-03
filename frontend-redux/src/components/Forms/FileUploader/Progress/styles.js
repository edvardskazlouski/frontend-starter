export default function ({ colors }) {
  return {
    circle: {
      stroke: colors.BLACK,
    },
    progressWrapper: {
      margin: 5,
      backgroundColor: colors.WHITE,
      height: 'calc(100% - 10px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
};

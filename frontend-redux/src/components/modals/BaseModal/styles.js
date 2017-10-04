export default function ({ colors }) {
  return {
    root: {
      '& > div:first-of-type': {
        backgroundColor: colors.SHADING,
      }
    },
  };
}

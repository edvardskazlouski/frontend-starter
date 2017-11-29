export default function({ colors }) {
  return {
    root: {
      position: 'relative',
      display: 'flex',
    },
    pickerRoot: {
      position: 'absolute',
      backgroundColor: colors.WHITE,
      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
      padding: 0,
      top: 0,
      left: 0,

      '& > li': {
        listStyle: 'none',
        cursor: 'pointer',
        padding: 5,
      }
    },
    header: {
      border: `1px solid ${colors.BLACK}`,
      cursor: 'pointer',
      padding: 5,
    }
  };
}

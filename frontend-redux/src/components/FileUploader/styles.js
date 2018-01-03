export default function () {
  return {
    root: {
      position: 'relative',
      display: 'inline-block',
    },
    wrapper: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
    },
    inputField: {
      width: 0.1,
      height: 0.1,
      opacity: 0,
      overflow: 'hidden',
      position: 'absolute',
      zIndex: -1,
    },
    label: {
      cursor: 'pointer',
    },
  };
}

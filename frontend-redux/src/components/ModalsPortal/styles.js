export default function () {
  return {
    content: {
      top: '0',
      left: '0',
      position: 'fixed',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      padding: '20px',
      minWidth: 500,
      height: 300,
      backgroundColor: 'white',
    },
  };
};

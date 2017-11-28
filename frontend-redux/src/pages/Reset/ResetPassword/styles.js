export default ({ colors }) => ({
  reset: {
    width: '500px',
    backgroundColor: colors.WHITE,
    minHeight: '250px',
    justifyContent: 'space-between',
    margin: 'auto',
    padding: '30px',
    boxSizing: 'border-box',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    fontFamily: 'Open Sans, sans-serif',
    boxShadow: '0 10px 40px 0 rgba(62, 57, 107, 0.07), 0 2px 9px 0 rgba(62, 57, 107, 0.06)',
  },
  submitButton: {
    backgroundColor: colors.RED,
    maxWidth: '150px',
    borderRadius: '4px',
    color: colors.WHITE,
    fontSize: '15px',
    fontFamily: 'Open Sans, sans-serif',
  },
  title: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '22px',
  },
  info: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '15px',
  },
  formControl: {
    width: '100%',
    margin: '20px 0',
  },
});

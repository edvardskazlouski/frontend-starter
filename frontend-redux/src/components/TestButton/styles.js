export default ({ colors, values }) => ({
  button: {
    border: 0,
    padding: '0 30px',
    transition: 'all 0.5s ease',
    boxSizing: 'border-box',
    fontWeight: 300,
    fontSize: 10,
    color: colors.WHITE,
    background: colors.ATOLL,
    boxShadow: values.BUTTON_SHADOW,
    opacity: 1,

    '&:hover': {
      opacity: 0.7,
    },
  },
});

export default ({ colors }) => ({
  root: {
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  selectedTab: {

  },
  appBar: {
    width: '520px',
    height: '48px',
  },
  tabs: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  swipeableViews: {
    width: '520px',
    '& > div': {
      minHeight: '450px',
    }
  },
  tab: {
    fontFamily: 'Open Sans, sans-serif',
  },
});

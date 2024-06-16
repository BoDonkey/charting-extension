module.exports = {
  bundle: {
    directory: 'modules',
    modules: [ 'chart-data', 'chart-widget' ]
  },
  init(self) {
    console.log('👋 from the charting extension!');
  }
};

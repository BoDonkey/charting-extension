import Chart from 'chart.js/auto';

export default () => {
  apos.util.widgetPlayers.chart = {
    selector: '[data-chart-widget]',
    player: function(el) {
      // get the JSON data from a child div of el with the attribute data-graph-canvas-wrapper. That data comes from the value of the data-chart-data attribute

      const chartData = JSON.parse(el.querySelector('[data-graph-canvas-wrapper]').getAttribute('data-chart-data'));
      // get the id value of this first canvas in the el
      const ctx = el.querySelector('canvas');
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.data = chartData.options;
        existingChart.update();
      } else {
        const chart = new Chart(ctx, chartData);
      }
    }
  };
};

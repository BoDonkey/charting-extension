const csv = require('csv');

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    alias: 'charting',
    label: 'Chart Widget',
    uploadfs: true
  },
  fields: {
    add: {
      chartTarget: {
        label: 'Target',
        type: 'string',
        required: true,
        htmlHelp:
          'The ID of the canvas element to render the chart in. Must be a single word and unique on the page.'
      },
      titleFields: {
        label: 'Title Fields',
        type: 'object',
        fields: {
          add: {
            chartTitle: {
              label: 'Chart Title',
              type: 'string',
              help: 'If left blank, no title will be displayed.'
            },
            titlePosition: {
              label: 'Title Position',
              type: 'select',
              choices: [
                {
                  label: 'Top',
                  value: 'top'
                },
                {
                  label: 'Left',
                  value: 'left'
                },
                {
                  label: 'Right',
                  value: 'right'
                },
                {
                  label: 'Bottom',
                  value: 'bottom'
                }
              ],
              def: 'top'
            },
            titleFontSize: {
              label: 'Title Font Size',
              type: 'integer',
              def: 20,
              help: 'The font size of the chart title in pixels.'
            },
          }
        }
      },
      chartLegend: {
        label: 'Add legend',
        type: 'boolean',
        def: true
      },
      legendPosition: {
        label: 'Legend Position',
        if: {
          chartLegend: true
        },
        type: 'select',
        choices: [
          {
            label: 'Top',
            value: 'top'
          },
          {
            label: 'Left',
            value: 'left'
          },
          {
            label: 'Right',
            value: 'right'
          },
          {
            label: 'Bottom',
            value: 'bottom'
          }
        ],
        def: 'top'
      },
      legendTitle: {
        label: 'Legend Title',
        type: 'string',
        if: {
          chartLegend: true
        },
        help: 'If left blank, no title will be displayed.'
      },
      legendTitleFontSize: {
        label: 'Legend Title Font Size',
        type: 'integer',
        if: {
          chartLegend: true
        },
        def: 16,
        help: 'The font size of the legend title in pixels.'
      },
      legendFontSize: {
        label: 'Legend Font Size',
        type: 'integer',
        if: {
          chartLegend: true
        },
        def: 14,
        help: 'The font size of the legend in pixels.'
      },
      chartType: {
        label: 'Chart Type',
        type: 'select',
        choices: [
          {
            label: 'One numeric axis (line or bar)',
            value: 'oneAxis'
          },
          {
            label: 'Two numeric axes (scatter or bubble)',
            value: 'twoAxes'
          },
          {
            label: 'Circular (pie or doughnut)',
            value: 'circular'
          }
        ],
        def: 'oneAxis'
      },
      axisOneLabel: {
        label: 'Axis One Label',
        help: 'If this is a two axes chart this is the label for the x-axis. For a one axis chart this is the label for the categories axis. (optional)',
        type: 'string',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        }
      },
      axisOneUnits: {
        label: 'Axis One Units',
        type: 'select',
        choices: [
          {
            label: 'None - for labels',
            value: 'none'
          },
          {
            label: 'linear',
            value: 'linear'
          },
          {
            label: 'logarithmic',
            value: 'logarithmic'
          }
        ],
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        }
      },
      axisOneLabelFontSize: {
        label: 'Axis One Label Font Size',
        type: 'integer',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: 14,
        help: 'The font size of the axis one label in pixels.'
      },
      axisOneDataFontSize: {
        label: 'Axis One Data Font Size',
        type: 'integer',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: 14,
        help: 'The font size of the axis one ticks in pixels.'
      },
      axisOneColor: {
        label: 'Axis One Color',
        type: 'color',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: '#000000'
      },
      axisOneWidth: {
        label: 'Axis One Width',
        type: 'integer',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: 1,
        help: 'The width of the axis one line in pixels.'
      },
      axisTwoLabel: {
        label: 'Axis Two Label',
        help: 'If this is a two axes chart this is the label for the y-axis. For a one axis chart this is the label for the numeric axis. (optional)',
        type: 'string',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        }
      },
      axisTwoUnits: {
        label: 'Axis Two Units',
        type: 'select',
        choices: [
          {
            label: 'None - for labels',
            value: 'none'
          },
          {
            label: 'linear',
            value: 'linear'
          },
          {
            label: 'logarithmic',
            value: 'logarithmic'
          }
        ],
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        }
      },
      axisTwoLabelFontSize: {
        label: 'Axis Two Label Font Size',
        type: 'integer',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: 14,
        help: 'The font size of the axis two label in pixels.'
      },
      axisTwoDataFontSize: {
        label: 'Axis Two Data Font Size',
        type: 'integer',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: 14,
        help: 'The font size of the axis two ticks in pixels.'
      },
      axisTwoColor: {
        label: 'Axis Two Color',
        type: 'color',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: '#000000'
      },
      axisTwoWidth: {
        label: 'Axis Two Width',
        type: 'integer',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: 1,
        help: 'The width of the axis two line in pixels.'
      },
      labelLocation: {
        label: 'Label axis location',
        type: 'select',
        choices: [
          {
            label: 'Top',
            value: 'top'
          },
          {
            label: 'Left',
            value: 'left'
          },
          {
            label: 'Right',
            value: 'right'
          },
          {
            label: 'Bottom',
            value: 'bottom'
          }
        ],
        def: 'bottom',
        if: {
          chartType: 'oneAxis'
        }
      },
      showGridlines: {
        label: 'Grid Line Visibility',
        type: 'select',
        choices: [
          {
            label: 'None',
            value: 'none'
          },
          {
            label: 'Horizontal - parallel to x-axis',
            value: 'horizontal'
          },
          {
            label: 'Vertical - parallel to y-axis',
            value: 'vertical'
          },
          {
            label: 'Both',
            value: 'both'
          }
        ],
        def: 'none',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        }
      },
      horizontalGridlineColor: {
        label: 'Horizontal Gridline Color',
        type: 'color',
        if: {
          $or: [{ showGridlines: 'horizontal' }, { showGridlines: 'both' }]
        },
        def: '#aeaeaeff'
      },
      verticalGridlineColor: {
        label: 'Vertical Gridline Color',
        type: 'color',
        if: {
          $or: [{ showGridlines: 'vertical' }, { showGridlines: 'both' }]
        },
        def: '#aeaeaeff'
      },
      graphAnimation: {
        label: 'Graph Animation',
        type: 'boolean',
        def: true
      },
      _chartdataSet: {
        label: 'Chart Data Set',
        type: 'relationship',
        required: 'true',
        max: 1,
        withType: 'chart-data'
      },
      chartData: {
        label: 'Chart Data',
        type: 'array',
        fields: {
          add: {
            dataType: {
              label: 'Data type',
              type: 'select',
              choices: [
                {
                  label: 'Categories',
                  value: 'categories'
                },
                {
                  label: 'Numeric',
                  value: 'numeric'
                }
              ],
              def: 'categories',
              required: true
            },
            dataChartType: {
              label: 'Chart Type for data',
              type: 'select',
              def: 'line',
              if: {
                dataType: 'numeric'
              },
              choices: [
                {
                  label: 'Line',
                  value: 'line'
                },
                {
                  label: 'Bar',
                  value: 'bar'
                },
                {
                  label: 'Doughnut',
                  value: 'doughnut'
                },
                {
                  label: 'Pie',
                  value: 'pie'
                },
                {
                  label: 'Bubble',
                  value: 'bubble'
                },
                {
                  label: 'Scatter',
                  value: 'scatter'
                }
              ]
            },
            dataCategoryColumn: {
              label: 'Category labels',
              type: 'chartSelect',
              help: 'The column in the dataset where the categories are located.',
              if: {
                dataType: 'categories'
              },
              following: ['<_chartdataSet']
            },
            dataCircularColumn: {
              label: 'Spreadsheet column label for the circular data',
              type: 'chartSelect',
              if: {
                $or: [{ dataChartType: 'pie' }, { dataChartType: 'doughnut' }]
              },
              following: ['<_chartdataSet']
            },
            dataXColumn: {
              label: 'Spreadsheet column for the X-axis data',
              type: 'chartSelect',
              if: {
                $or: [
                  { dataChartType: 'line' },
                  { dataChartType: 'bar' },
                  { dataChartType: 'bubble' },
                  { dataChartType: 'scatter' }
                ]
              },
              following: ['<_chartdataSet']
            },
            dataYColumn: {
              label: 'Spreadsheet column for the Y-axis data.',
              type: 'chartSelect',
              if: {
                $or: [{ dataChartType: 'bubble' }, { dataChartType: 'scatter' }]
              },
              following: ['<_chartdataSet']
            },
            dataRColumn: {
              label: 'Spreadsheet column for the R values',
              type: 'chartSelect',
              if: {
                dataChartType: 'bubble'
              },
              following: ['<_chartdataSet']
            },
            dataChartLabel: {
              label: 'Data label',
              type: 'string',
              help: 'The label for the data in the chart (optional).',
              if: {
                dataType: 'numeric'
              }
            },
            dataBackgroundColor: {
              label: 'Background color',
              type: 'color',
              help: 'The background color for the data in the chart (optional). If you add a custom color for one dataset, all other datasets also need a custom color.',
              if: {
                dataType: 'numeric',
                $or: [
                  { dataChartType: 'line' },
                  { dataChartType: 'bar' },
                  { dataChartType: 'bubble' },
                  { dataChartType: 'scatter' }
                ]
              }
            },
            dataBorderColor: {
              label: 'Border color',
              type: 'color',
              help: 'The border color for the data in the chart (optional).',
              if: {
                dataType: 'numeric',
                $or: [
                  { dataChartType: 'line' },
                  { dataChartType: 'bar' },
                  { dataChartType: 'bubble' },
                  { dataChartType: 'scatter' }
                ]
              }
            },
            dataSymbol: {
              label: 'Data point symbol',
              type: 'select',
              help: 'The symbol for the data point in the chart (optional).',
              if: {
                $or: [{ dataChartType: 'scatter' }, { dataChartType: 'line' }]
              },
              choices: [
                {
                  label: 'Circle',
                  value: 'circle'
                },
                {
                  label: 'Cross',
                  value: 'cross'
                },
                {
                  label: 'Cross Rot',
                  value: 'crossRot'
                },
                {
                  label: 'Dash',
                  value: 'dash'
                },
                {
                  label: 'Line',
                  value: 'line'
                },
                {
                  label: 'Rect',
                  value: 'rect'
                },
                {
                  label: 'Rect Rot',
                  value: 'rectRot'
                },
                {
                  label: 'Rect Rounded',
                  value: 'rectRounded'
                },
                {
                  label: 'Star',
                  value: 'star'
                },
                {
                  label: 'Triangle',
                  value: 'triangle'
                },
                {
                  label: 'False',
                  value: 'false'
                }
              ]
            },
            dataSymbolSize: {
              label: 'Data point symbol size',
              type: 'integer',
              help: 'The size of the symbol for the data point in the chart (optional).',
              if: {
                $or: [{ dataChartType: 'scatter' }, { dataChartType: 'line' }]
              }
            }
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['chartTarget', 'chartType', 'titleFields']
      },
      legend: {
        label: 'Legend',
        fields: ['chartLegend', 'legendPosition', 'legendTitle', 'legendTitleFontSize', 'legendFontSize']
      },
      axes: {
        label: 'Axes',
        fields: [
          'labelLocation',
          'axisOneLabel',
          'axisOneUnits',
          'axisOneLabelFontSize',
          'axisOneDataFontSize',
          'axisOneColor',
          'axisOneWidth',
          'axisTwoLabel',
          'axisTwoUnits',
          'axisTwoLabelFontSize',
          'axisTwoDataFontSize',
          'axisTwoColor',
          'axisTwoWidth'
        ]
      },
      gridlines: {
        label: 'Gridlines',
        fields: [ 'showGridlines', 'horizontalGridlineColor', 'verticalGridlineColor']
      },
      animation: {
        label: 'Animation',
        fields: ['graphAnimation']
      },
      data: {
        label: 'Data',
        fields: ['_chartdataSet', 'chartData']
      }
    }
  },
  init(self) {
    // This adds the custom schema field for selecting the data column
    self.addChartSelectColumnType();
  },
  components(self) {
    return {
      async returnChartData(req, data) {
        const {
          chartTitle,
          titlePosition,
          titleFontSize,
          chartLegend,
          legendPosition,
          legendTitle,
          legendTitleFontSize,
          legendFontSize,
          chartType,
          chartTarget,
          axisOneLabel,
          axisOneUnits,
          axisOneLabelFontSize,
          axisOneDataFontSize,
          axisOneColor,
          axisOneWidth,
          axisTwoLabel,
          axisTwoUnits,
          axisTwoLabelFontSize,
          axisTwoDataFontSize,
          axisTwoColor,
          axisTwoWidth,
          labelLocation,
          showGridlines,
          horizontalGridlineColor,
          verticalGridlineColor,
          graphAnimation,
          chartData
        } = data.data;
        const dataFile = data.dataFile;
        const fileString = await self.apos.http.get(dataFile);
        const chartDataSet = [];
        try {
          const parsedData = await new Promise((resolve, reject) => {
            csv.parse(fileString, { columns: true }, function (err, data) {
              if (err) {
                reject(err);
              }
              resolve(data);
            });
          });
          chartDataSet.push(parsedData);
        } catch (err) {
          console.error(err);
          return { chartDataSet: [] };
        }

        const config = {
          data: {
            labels: [],
            datasets: []
          },
          options: {
            animation: graphAnimation,
            responsive: true,
            plugins: {
              title: chartTitle
                ? {
                  display: true,
                  text: chartTitle,
                  position: titlePosition,
                  font: {
                    size: titleFontSize
                  }
                }
                : undefined,
              legend: chartLegend
                ? {
                  position: legendPosition,
                  strokeStyle: 'black',
                  lineWidth: 2,
                  font: {
                    size: legendFontSize
                  },
                  labels: {
                    usePointStyle: true
                  }
                }
                : {
                  display: false
                }
            },
            scales: {}
          }
        };
        if (legendTitle) {
          config.options.plugins.legend = {
            ...config.options.plugins.legend,
            title: {
              display: true,
              text: legendTitle,
              font: {
                size: legendTitleFontSize
              }
            }
          };
        }

        const chartTypes = [];
        let dataLabels, circularData, xData, yData, rData;

        // console.log('chartData', chartData);

        chartData.forEach((col) => {
          let multicolumn = false;

          if (col.dataCategoryColumn) {
            dataLabels = chartDataSet[0].map(
              (item) => item[col.dataCategoryColumn]
            );
          }

          if (col.dataCircularColumn) {
            circularData = chartDataSet[0].map(
              (item) => item[col.dataCircularColumn]
            );
          }

          if (col.dataXColumn) {
            xData = chartDataSet[0].map((item) => item[col.dataXColumn]);
          }

          if (col.dataYColumn) {
            yData = chartDataSet[0].map((item) => item[col.dataYColumn]);
            multicolumn = true;
          }

          if (col.dataRColumn) {
            rData = chartDataSet[0].map((item) => item[col.dataRColumn]);
            multicolumn = true;
          }

          const processedData = multicolumn
            ? xData.map((_, i) => ({
              x: xData[i],
              y: yData[i],
              ...(rData && { r: rData[i] })
            }))
            : xData;

          if (col.dataType === 'categories') {
            config.data.labels = dataLabels;
          } else if (col.dataType === 'numeric' && chartType === 'circular') {
            config.data.datasets.push({
              type: col.dataChartType,
              label: col.dataChartLabel ? col.dataChartLabel : undefined,
              data: circularData
            });
            chartTypes.push(col.chartType);
          } else {
            config.data.datasets.push({
              type: col.dataChartType,
              label: col.dataChartLabel ? col.dataChartLabel : undefined,
              data: processedData,
              indexAxis: col.selectedAxis ? col.selectedAxis : undefined,
              xAxisID: col.dataType === 'x' ? 'x' : undefined,
              yAxisID: col.dataType === 'y' ? 'y' : undefined,
              backgroundColor: col.dataBackgroundColor
                ? col.dataBackgroundColor
                : undefined,
              borderColor: col.dataBorderColor
                ? col.dataBorderColor
                : undefined,
              pointStyle: col.dataSymbol ? col.dataSymbol : undefined,
              pointRadius: col.dataSymbolSize ? col.dataSymbolSize : undefined
            });
            chartTypes.push(col.chartType);
          }
        });

        config.options.indexAxis =
          labelLocation === 'left' || labelLocation === 'right'
            ? 'y'
            : undefined;

        if (chartType !== 'circular') {
          const { scales } = config.options;

          const gridlines = {
            x: {
              display: false
            },
            y: {
              display: false
            }
          };
          if (showGridlines !== 'none') {
            if (showGridlines === 'both' || showGridlines === 'vertical') {
              gridlines.x.display = true;
              gridlines.x.color = verticalGridlineColor
                ? verticalGridlineColor
                : undefined;
            }
            if (showGridlines === 'both' || showGridlines === 'horizontal') {
              gridlines.y.display = true;
              gridlines.y.color = horizontalGridlineColor
                ? horizontalGridlineColor
                : undefined;
            }
          }

          scales.x = {
            type: axisOneUnits === 'logarithmic' ? 'logarithmic' : undefined,
            title: axisOneLabel
              ? {
                display: true,
                text: axisOneLabel,
                font: { size: axisOneLabelFontSize }
              }
              : undefined,
            position: labelLocation === 'top' ? labelLocation : 'bottom',
            ticks: axisOneDataFontSize
              ? { font: { size: axisOneDataFontSize } }
              : undefined,
            grid: gridlines.x,
            border: {
              color: axisOneColor ? axisOneColor : undefined,
              width: axisOneWidth ? axisOneWidth : undefined
            }
          };
          scales.y = {
            type: axisTwoUnits === 'logarithmic' ? 'logarithmic' : undefined,
            title: axisTwoLabel
              ? {
                display: true,
                text: axisTwoLabel,
                font: { size: axisTwoLabelFontSize }
              }
              : undefined,
            position: labelLocation === 'right' ? labelLocation : 'left',
            ticks: axisTwoDataFontSize
              ? { font: { size: axisTwoDataFontSize } }
              : undefined,
            grid: gridlines.y,
            border: {
              color: axisTwoColor ? axisTwoColor : undefined,
              width: axisTwoWidth ? axisTwoWidth : undefined
            }
          };
        }

        const noMixedChartTypes = (chartTypes) =>
          chartTypes.every((type) => type === chartTypes[0]);

        if (!noMixedChartTypes) {
          const forbiddenMix = chartTypes.find(
            (type) => type === 'doughnut' || type === 'pie'
          );
          if (forbiddenMix) {
            console.error(
              'Doughnut and pie charts cannot be mixed with other chart types.'
            );
            return { chartDataSet: [] };
          }
        }

        return {
          target: chartTarget,
          config: config
        };
      }
    };
  },
  methods(self) {
    return {
      addChartSelectColumnType() {
        self.apos.schema.addFieldType({
          name: 'chartSelect',
          extend: 'select',
          vueComponent: 'ChartSelectInput',
          validate(field, options, warn, fail) {
            field.choices = field.choices || [];
            field.following = field.following || ['<_chartdataSet'];
          },
          async convert(req, field, data, destination) {
            if (typeof data[field.name] === 'string') {
              destination[field.name] = self.apos.launder.string(data[field.name]);
            }
          }
        });
      }
    };
  }
};

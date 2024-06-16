const csv = require('csv');

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Chart Data',
    pluralLabel: 'Chart Data'
    // Additionally add a `pluralLabel` option if needed.
  },
  fields: {
    add: {
      dataFile: {
        label: 'Data File',
        type: 'attachment',
        fileGroup: 'office',
        required: true
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['title', 'dataFile']
      }
    }
  },
  handlers(self, options) {
    return {
      afterInsert: {
        async insertUpdate(req, doc, options) {
          self.storeColumns(req, doc, options);
        }
      },
      afterUpdate: {
        async updateUpdate(req, doc, options) {
          self.storeColumns(req, doc, options);
        }
      }
    };
  },
  methods(self) {
    return {
      async storeColumns(req, doc, options) {
        if (doc.type !== 'chart-data') {
          return;
        }
        const chartDataDocument = await self
          .find(req, {
            _id: doc._id
          })
          .toObject();
        if (!chartDataDocument) {
          return;
        }
        const dataFile = chartDataDocument.dataFile;
        if (chartDataDocument.fileId && chartDataDocument.fileId === dataFile._id) {
          return;
        }

        if (dataFile._url) {
          const fileString = await self.apos.http.get(dataFile._url);
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
            console.log('data set', chartDataSet);
          } catch (err) {
            console.error(err);
            return { chartDataSet: [] };
          }
          const columnArray = Object.keys(chartDataSet[0][0]);
          chartDataDocument.columns = columnArray;
          chartDataDocument.fileId = dataFile._id;

          const updateWithColumns = await self.update(req, chartDataDocument);
          await self.publish(req, updateWithColumns);
          return updateWithColumns;
        }
      }
    };
  }
};

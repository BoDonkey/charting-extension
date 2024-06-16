<div align="center">
  <img src="https://raw.githubusercontent.com/apostrophecms/apostrophe/main/logo.svg" alt="ApostropheCMS logo" width="80" height="80">

  <h1>Charting Extension</h1>
  <p>
    <a aria-label="Apostrophe logo" href="https://v3.docs.apostrophecms.org">
      <img src="https://img.shields.io/badge/MADE%20FOR%20ApostropheCMS-000000.svg?style=for-the-badge&logo=Apostrophe&labelColor=6516dd">
    </a>
    <a aria-label="License" href="https://github.com/apostrophecms/module-template/blob/main/LICENSE.md">
      <img alt="" src="https://img.shields.io/static/v1?style=for-the-badge&labelColor=000000&label=License&message=MIT&color=3DA639">
    </a>
  </p>
</div>

This bundle of two extensions adds the a new chart data piece-type to  upload data setsfor charting, as well as a chart widget to allow addition of a number of different chart types to your ApostropheCMS pages.

## Installation

To install the module, use the command line to run this command in an Apostrophe project's root directory:

```
npm install @bodonkey/charting-extension
```

## Usage

Add the bundle and individual extensions in the `app.js` file:

```javascript
require('apostrophe')({
  shortName: 'my-project',
  bundle: [ '@bodonkey/charting-extension' ],
  modules: {
    'chart-data': {},
    'chart-widget': {}
  }
});
```

The chart-data module will add a new piece-type for adding CSV data sets to your project. Data from these sets can then be used with the chart-widget that you can add to any area.


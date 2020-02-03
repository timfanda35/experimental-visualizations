const dscc = require('@google/dscc');
const $ = require('jquery');

export const LOCAL = false;

function drawViz(data) {
  var nameData = data.fields.chartDimension;
  var rowData = data.tables.DEFAULT;

  var style = data.style.pageStyle.value;

  var dimensionData = null;

  var mainDiv = $('<div>');
  var fieldArray = [];
  var fieldData = '';
  var styleTag = $("<style id='styleId'>");

  $(document).ready(function() {
    if ($('body').hasClass('container')) {
      $('body').empty();
      $('style').remove('#styleId');
      loadData();
    } else {
      loadData();
    }
    function loadData() {
      $.each(nameData, function(i, row) {
        fieldData = row.name;
        fieldArray.push(fieldData);
      });
      $.each(rowData, function(j, row) {
        dimensionData = row['chartDimension'];
        var rowDiv = $("<div class='row'>");
        for (var k in dimensionData) {
          var finalData = $('<div class="field">');
          var fieldElement =
            '<span class="' +
            fieldArray[k] +
            '"' +
            '>' +
            fieldArray[k] +
            ' - ' +
            '</div>';
          var data =
            '<span class="' +
            dimensionData[k] +
            '"' +
            '>' +
            dimensionData[k] +
            '</div>';
          finalData.append(fieldElement + data);
          rowDiv.append(finalData);
        }
        mainDiv.append(rowDiv);
      });
      $('body')
        .addClass('container')
        .append(mainDiv);
    }
    if (style != undefined && style != '') {
      styleTag.append(style);
      $('head').append(styleTag);
    } else {
      if ($('head').has('style')) {
        $('style').remove('#styleId');
      }
    }
  });
}

dscc.subscribeToData(drawViz, {transform: dscc.objectTransform});

import React, { Component } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";



class Pie extends Component {
    state = { 
      chartOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },

        title: {
          text: 'issues'
        },
        tooltip: {
          pointFormat: '{series.name}'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: ' {y} '
            }
          }
        },
        series: [{
          name: 'issues',
          colorByPoint: true,
          data: this.props.data
        }]
      }
     }

    render() { 
      const { chartOptions } = this.state;
        return (  <div>
          <div className="header">
          <h1>Welocome Mickey</h1>
          <button onClick={this.props.pie}>Signout</button>
        </div>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>  );
    }
}
 
export default Pie;
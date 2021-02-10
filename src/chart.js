import React, { Component } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartOptions: {
        chart: {
          type: "column",
 
        },
        title: {
          text: 'Updated vs issues'
        },
        yAxis: {
          min: 4280,
          labels: {
            format: '<div style="text-align:left;">{value}</div>',
            useHTML: true
          }

        },
        xAxis: {
          labels: {
            format: '<div style="text-align:left;">{value}</div>',
            useHTML: true
          },
          categories: this.props.updated
        },
        series: [
         
          {
            id: "issues",
            name: "issues",
            data: this.props.data,
            type: "column",

            color: "blue"
          }
        ]
      },
      hoverData: null
    };
  }

  setHoverData = e => {
    // The chart is not updated because `chartOptions` has not changed.
    this.setState({ hoverData: e.target.category });
  };

  render() {
    const { chartOptions, hoverData } = this.state;

    return (
      <div>
        <div className="header">
          <h1>Welocome John</h1>
          <button  onClick={this.props.chart}>Signout</button>
        </div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    );
  }
}
export default LineChart;

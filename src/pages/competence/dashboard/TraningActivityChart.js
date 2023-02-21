import Chart from "react-apexcharts";
import React from "react";
import "../../adminArea/adminArea.css"


const TraningActivityChart = () => {
    const traningChart = {
        series: [{
            name: 'Total trainings done',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Total trainings passed',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
            name: 'Total trainings failed',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        },
        {
            name: 'Total fraud cases',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }],

        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        },
    };
    return (
        <Chart
            options={traningChart.options}
            series={traningChart.series}
            type="bar"
            width="100%"
            height={240}
        />
    );
};

export default TraningActivityChart;
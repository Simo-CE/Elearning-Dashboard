import Chart from "react-apexcharts";
import React from "react";
import "../../adminArea/adminArea.css"

const AgeChart = () => {
    const ageChart = {
        series: [{
            data: [400, 430, 448, 470,]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['18-25', '26-35', '36-45', '46-65'
                ],
            }
        },
    };
    return (
        <Chart
            options={ageChart.options}
            series={ageChart.series}
            type="bar"
            width="100%"
            height={240}
        />
    )
}

export default AgeChart
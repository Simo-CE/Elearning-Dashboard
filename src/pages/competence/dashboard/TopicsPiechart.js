import Chart from "react-apexcharts";
import React from "react";
import "../../adminArea/adminArea.css"


const TopicsPiechart = () => {

    const piechart = {
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                width: 200,
                type: 'pie',
            },
            // labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            // responsive: [{
            //     breakpoint: 480,
            //     options: {
            //         chart: {
            //             width: 200
            //         },
            //         legend: {
            //             show: false
            //         }
            //     }
            // }]
            dataLabels: {
                enabled: true
            },
            legend: {
                show: false
            }
        },

    }

    return (
        <Chart
            options={piechart.options}
            series={piechart.series}
            type="pie"
            width="77%"
            height={230}
        />
    )
}

export default TopicsPiechart
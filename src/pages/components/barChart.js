import React from 'react'
import { Bar, Line, Pie,Doughnut } from 'react-chartjs-2'

function BarChart(props) {
  return (
    <div>
      <Bar
        data={props.data}
        options= {{
            // maintainAspectRatio: false,
            // responsive:true,
            aspectRatio:1.8,
            plugins: {
                legend: {
                    display: false,
                    position: 'right',
                    labels: {
                        // usePointStyle: true,
                        pointStyle:'dashed',
                        boxWidth: 10,
                        padding:10,
                        // pointStyleWidth:'10',
                        fontSize:10
                    }
                }
            }
        }}
        // options={{
        //   title: {
        //     display: props.displayTitle,
        //     text: 'Largest Cities in Massachusetts',
        //     fontSize: 25
        //   },
        //   legend: {
        //     display: props.displayLegend,
        //     position: props.legendPosition,
        //     labels: {
        //       fontColor: '#000'
        //     }
        //   }
        // }}
      />
    </div>
  )
}



export default BarChart;
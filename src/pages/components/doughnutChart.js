import React from 'react'
import { Bar, Line, Pie,Doughnut } from 'react-chartjs-2'

function DoughnutChart(props) {
  return (
    <div>
      <Doughnut data={props.data} 
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
        />
    </div>
  )
}



export default DoughnutChart;
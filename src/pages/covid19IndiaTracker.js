// Importing React Packages
import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
// Importing Chart JS Packages
import DoughnutChart from './components/doughnutChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// Importing CSS Files
import '../static/css/color.css'
import '../static/css/main.css'
import stateList from  '../static/json/stateList.json'
// Importing Navbar
import Navbar from './components/navbar';
// Importing Footer
import Footer from './components/footer';

// Importing Bootstrap Packages
import 'bootstrap/dist/css/bootstrap.css'
// Importing Apexchart Packages
import Chart from "react-apexcharts";

ChartJS.register(ArcElement, Tooltip, Legend);

// Covid 19 India Tracker Function

function Covid19IndiaTracker()
{
    let navigate = useNavigate()
    // State variable to maintain original json data from source
    const [originalData,setOriginalData] = useState({});

    // State variable to store overall data
    const [overallData,setOverallData] = useState({});
    const [dataStatus,setDataStatus] = useState(false)
    const [barChartData,setBarChartData] = useState({});
    useEffect(()=>{
        axios.get('https://data.covid19india.org/v4/min/data.min.json')
        .then(function (response) {
            var responseData = response.data;
            setOriginalData(responseData)
            setBarChartData(
                {
                    
                    options: {
                        chart: {
                            id: "basic-bar"
                        },
                        xaxis: {
                            categories: ['Confirmed','Recovered','Deceased']
                        },
                        colors:['#ff001e', '#16e000', '#8b8b8b'],
                        plotOptions: {
                            bar: {
                              borderRadius: 4,
                              horizontal: true,
                              distributed: true, 
                            }
                          },
                    },
                    series: [
                        {
                        name: ['Confirmed','Recovered','Deceased'],
                        data: [(responseData["AN"]['total'].confirmed),(responseData["AN"]['total'].recovered),(responseData["AN"]['total'].deceased)],
                        }
                    ]
                }
            )
            setDataStatus(true)
        })
        .catch(function (error) {
            console.log(error);
        });

    },[])

    const goToStatePage = (data) => {
        navigate('/'+data)
    }
    const [stateName,setStateName]  = useState()
    const getStateWiseChart = (event) => {
        const { name, value } = event.target
        setStateName(value)
        setBarChartData(
            {
                
                options: {
                    chart: {
                        id: "basic-bar"
                    },
                   
                    xaxis: {
                        categories: ['Confirmed','Recovered','Deceased'],
                        
                        
                    },
                    plotOptions: {
                        bar: {
                          borderRadius: 4,
                          horizontal: true,
                          distributed: true, 
                          
                        },
                        
                    },
                    colors:['#ff001e', '#16e000', '#8b8b8b'],
                },
                series: [
                    {
                    name: ['Confirmed','Recovered','Deceased'],
                    data: [(originalData[value]['total'].confirmed),(originalData[value]['total'].recovered),(originalData[value]['total'].deceased)],
                    }
                ]
            }
        )
    }

    
    // Function to Display State wise Data

    const DisplayStateList = () => {
        return(
            <div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-9 table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>State</th>
                                        <th>Confirmed</th>
                                        <th>Recovered</th>
                                        <th>Deceased</th>
                                        <th>Tested</th>
                                        <th>1st Dose Vaccination</th>
                                        <th>2nd Dose Vaccination</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    Object.keys(originalData).map((data)=>(
                                        (data!='TT')?
                                        
                                            <tr style={{cursor:"pointer"}} onClick={()=>goToStatePage(data)} onMouseEnter={(event, value) => { getStateWiseChart({ target: { name: "table", value: data } }) }}>
                                                <td>{stateList[data]}</td>
                                                <td>{originalData[data]['total'].confirmed.toLocaleString()}</td>
                                                <td>{originalData[data]['total'].recovered.toLocaleString()}</td>
                                                <td>{originalData[data]['total'].deceased.toLocaleString()}</td>
                                                <td>{originalData[data]['total'].tested.toLocaleString()}</td>
                                                <td>{originalData[data]['total'].vaccinated1.toLocaleString()}</td>
                                                <td>{originalData[data]['total'].vaccinated2.toLocaleString()}</td>
                                            </tr>
                                        :
                                            ''
                                    ))
                                }
                                </tbody>
                            
                            
                            
                            </table>
                            
                        </div>
                        <div className="col-sm-3">
                            <div className="col-sm-12">
                                <select className="form-select" value={stateName} onChange={getStateWiseChart}>
                                    {
                                        Object.keys(originalData).map((data)=>(
                                            (data!='TT')?
                                            <option value={data}>{stateList[data]}</option>
                                            :
                                            ''
                                        ))
                                    }
                                </select>
                            </div>
                            <br/>
                            <Chart
                                options={barChartData.options}
                                series={barChartData.series}
                                type="bar"
                                width="330"
                            />
                            
                        </div>
                    </div>
                </div>
                
                
            </div>
            
        )
    }

    return(
        <div>
            {(dataStatus)?
                <div className="container-fluid">
                    <Navbar/>
                    <br/>  
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-sm-8">
                                <div className="row justify-content-center">
                                    <div className="col-sm-3">
                                        <div className="text-center text-yellow border p-2 m-2">
                                            <small><b>Tested</b></small>
                                            <br/>
                                            <h3 className="p-2">{(originalData["TT"]['total'].tested).toLocaleString()}</h3>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="text-center text-red border p-2 m-2">
                                            <small><b>Confirmed</b></small>
                                            <br/>
                                            <h3 className="p-2">{(originalData["TT"]['total'].confirmed).toLocaleString()}</h3>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="text-center text-green border p-2 m-2">
                                            <small><b>Recovered</b></small>
                                            <br/>
                                            <h3 className="p-2">{(originalData["TT"]['total'].recovered).toLocaleString()}</h3>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="text-center text-grey border p-2 m-2">
                                            <small><b>Deceased</b></small>
                                            <br/>
                                            <h3 className="p-2">{(originalData["TT"]['total'].deceased).toLocaleString()}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="row justify-content-center">

                                    <DoughnutChart 
                                        data={
                                                {
                                                    labels: ['Tested','Confirmed','Recovered','Deceased'],
                                                    datasets: [
                                                    {
                                                        data: [(originalData["TT"]['total'].tested),(originalData["TT"]['total'].confirmed),(originalData["TT"]['total'].recovered),(originalData["TT"]['total'].deceased)],
                                                        backgroundColor: [
                                                        '#ffd900','#ff001e','#16e000','#8b8b8b'
                                                        ],
                                                        borderColor: [
                                                            '#ffd900','#ff001e','#16e000','#8b8b8b'
                                                        ],
                                                        borderWidth: 3,
                                                    },
                                                    ],
                                                }
                                            }
                                    />
                                </div>
                            </div>
                            <div className="col-sm-10">

                                <marquee className="text-primary">
                                    <small><b>1st Dose Vaccination</b></small>
                                    <b className="p-2">{(originalData["TT"]['total'].vaccinated1).toLocaleString()} &</b>
                                
                                    
                                    <small><b>2nd Dose Vaccination</b></small>
                                    <b className="p-2">{(originalData["TT"]['total'].vaccinated2).toLocaleString()}</b>
                                </marquee>
                            </div>
                            

                        </div>
                    </div>
                    <br/>
                    
                    <DisplayStateList />

                    <Footer />
                </div>
                :
                ''
            }
        </div>

    );
}

export default Covid19IndiaTracker;
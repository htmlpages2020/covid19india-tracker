// Importing React Packages
import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
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
import 'bootstrap/dist/js/bootstrap.bundle'
// Importing Apexchart Packages
import Chart from "react-apexcharts";

ChartJS.register(ArcElement, Tooltip, Legend);

// Covid 19 India Tracker Function

function StateWiseListPage()
{

    const { state } = useParams();
    console.log(state)
    // const district = this.props.match.params.district;
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
                            data:[0,0,0]
                            // data: [
                            //     (responseData[state]['districts'][districtName]['total'].confirmed)?
                            //     responseData[state]['districts'][districtName]['total'].confirmed.toLocaleString()
                            //     :
                            //     '0',
                            //     (responseData[state]['districts'][districtName]['total'].recovered)?
                            //     responseData[state]['districts'][districtName]['total'].recovered.toLocaleString()
                            //     :
                            //     '0',
                            //     (responseData[state]['districts'][districtName]['total'].deceased)?
                            //     responseData[state]['districts'][districtName]['total'].deceased.toLocaleString()
                            //     :
                            //     '0'
                            // ],
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

    
    const [districtName,setDistrictName]  = useState()
    const getDistrictWiseChart = (event) => {
        const { name, value } = event.target
        setDistrictName(value)
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
                        data: [
                            (originalData[state]['districts'][value]['total'].confirmed)?
                            originalData[state]['districts'][value]['total'].confirmed
                            :
                            0,
                            (originalData[state]['districts'][value]['total'].recovered)?
                            originalData[state]['districts'][value]['total'].recovered
                            :
                            0,
                            (originalData[state]['districts'][value]['total'].deceased)?
                            originalData[state]['districts'][value]['total'].deceased
                            :
                            0
                        ],
                    }
                ]
            }
        )
    }

    
    // Function to Display District wise Data

    const DisplayDistrictList = () => {
        return(
            <div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-9 table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>District</th>
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
                                    Object.keys(originalData[state]['districts']).map((data)=>(
                                        (data!='TT')?
                                            <tr onMouseEnter={(event, value) => { getDistrictWiseChart({ target: { name: "table", value: data } }) }}>
                                                <td>{data}</td>
                                                <td>
                                                    {
                                                        (originalData[state]['districts'][data]['total'].confirmed)?
                                                        originalData[state]['districts'][data]['total'].confirmed.toLocaleString()
                                                        :
                                                        '0'
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        (originalData[state]['districts'][data]['total'].recovered)?
                                                        originalData[state]['districts'][data]['total'].recovered.toLocaleString()
                                                        :
                                                        '0'
                                                    }    
                                                </td>
                                                <td>
                                                    {
                                                        (originalData[state]['districts'][data]['total'].deceased)?
                                                        originalData[state]['districts'][data]['total'].deceased.toLocaleString()
                                                        :
                                                        '0'
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        (originalData[state]['districts'][data]['total'].tested)?
                                                        originalData[state]['districts'][data]['total'].tested.toLocaleString()
                                                        :
                                                        '0'
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        (originalData[state]['districts'][data]['total'].vaccinated1)?
                                                        originalData[state]['districts'][data]['total'].vaccinated1.toLocaleString()
                                                        :
                                                        '0'
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        (originalData[state]['districts'][data]['total'].vaccinated2)?
                                                        originalData[state]['districts'][data]['total'].vaccinated2.toLocaleString()
                                                        :
                                                        '0'
                                                    }
                                                </td>
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
                                <select className="form-select" value={districtName} onChange={getDistrictWiseChart}>
                                    {
                                        Object.keys(originalData[state]['districts']).map((data)=>(
                                            
                                            <option value={data}>{data}</option>
                                            
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
                    <Navbar />
                    <br/>  
                    <h4 className='text-center'>{stateList[state]}</h4>
                    <br/>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-sm-8">
                                <div className="row justify-content-center">
                                    <div className="col-sm-3">
                                        <div className="text-center text-yellow border p-2 m-2">
                                            <small><b>Tested</b></small>
                                            <br/>
                                            <h3 className="p-2">{(originalData[state]['total'].tested).toLocaleString()}</h3>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="text-center text-red border p-2 m-2">
                                            <small><b>Confirmed</b></small>
                                            <br/>
                                            <h3 className="p-2">{(originalData[state]['total'].confirmed).toLocaleString()}</h3>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="text-center text-green border p-2 m-2">
                                            <small><b>Recovered</b></small>
                                            <br/>
                                            <h3 className="p-2">{(originalData[state]['total'].recovered).toLocaleString()}</h3>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="text-center text-grey border p-2 m-2">
                                            <small><b>Deceased</b></small>
                                            <br/>
                                            <h3 className="p-2">{(originalData[state]['total'].deceased).toLocaleString()}</h3>
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
                                                        data: [(originalData[state]['total'].tested),(originalData[state]['total'].confirmed),(originalData[state]['total'].recovered),(originalData[state]['total'].deceased)],
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
                                    <b className="p-2">{(originalData[state]['total'].vaccinated1).toLocaleString()} &</b>
                                
                                    
                                    <small><b>2nd Dose Vaccination</b></small>
                                    <b className="p-2">{(originalData[state]['total'].vaccinated2).toLocaleString()}</b>
                                </marquee>
                            </div>
                            

                        </div>
                    </div>
                    <br/>
                    
                    <DisplayDistrictList />

                    <Footer />
                    
                </div>
                :
                ''
            }
        </div>

    );
}

export default StateWiseListPage;
import * as React from 'react'
// Importing Bootstrap Packages
import 'bootstrap/dist/css/bootstrap.css'

function Navbar()
{
    return(
        <nav class="navbar navbar-expand-sm bg-light sticky-top navbar-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><small style={{fontSize:"15px"}} className="text-red">COVID19INDIA</small> <b className="text-primary">Tracker</b></a>
            </div>
            <div className="col-sm-1 ml-auto">
                <a href="https://data.covid19india.org/ " target="_blank">
                    <button className="btn border-primary">API Reference</button>
                </a>
            </div>
        </nav>
    )
}

export default Navbar
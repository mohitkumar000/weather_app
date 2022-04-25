import React,{useState} from 'react'
import Weather from './Weather'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const City = () => {

    const[city,setCity] = useState("")
    const[fetchedWeather,setFetchedWeather] = useState([])
    const[fetching,setFetching]=useState(false)

    const fetchWeather = async()=>{
        setFetching(true)
        const API_KEY = "3cb6e26e4a5a73d3bae2d66e44ba91d3"
        const CITY = city

        if(CITY!=""){
            const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`)
            .then(res=>res.json())
            .then(data=>data)
            if(data.message=="city not found"){
                toast.error("City not found")        
                setFetching(false)
                
            }
            else{
                setFetchedWeather({data:data})
                document.getElementById("form").style.display="none"
                setFetching(false)
            }
            // console.log(fetchedWeather.data)
            }
        else{
            toast.error("Please enter city name")
            setFetching(false)
        }
    }

    return (
        <div>
            <div className="container" id={"form"}>
            <div className="row">
                <div className="col-lg-4">&nbsp;</div>
                <div className="col-lg-4">
                    <div className="shadow-lg rounded mt-5 px-4 py-4 text-center  bg-light" id={"title-text"}>
                        <div className="py-4">WeatherWeb</div>
                        <i className="fas fa-cloud-sun-rain" id={"app-icon"}></i>
                        <div className="mt-4">
                            <input value={city} onChange={(e)=>{setCity(e.target.value)}} className="form-control py-3" type="text"  placeholder="Enter your city name"/>
                            <button id={"search"} onClick={()=>{fetchWeather()}} className="form-control py-3 mt-2 bg-dark text-light">
                                {
                                    fetching?<span>Hold on<i className="px-2 fas fa-spinner fa-spin"></i> </span>
                                    :<span>Search <i className="fas fa-search"></i></span>
                                }                
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">&nbsp;</div>
            </div>
        </div>

        {
            fetchedWeather.data!=undefined?
            <Weather data={fetchedWeather.data}/>
            :null
        }
        
        </div>
    )
}

export default City

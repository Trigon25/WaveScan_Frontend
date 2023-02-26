import React, {useState, useEffect} from 'react';
import { getData } from './APIHandler/CallingAPI';
import {BrowserRouter} from 'react-router-dom'
import AppContext from './Components/AppContext';
import FormContext from './Components/FormContext';
import App from './App';

export default function AppWrapper() {
    const [scanners, setScanners] = useState(null);
    const [formdata, setFormdata] = useState({
        "projectName" : "",
        "scanningMode" : "GANTRY",
        "scanDimensionsX" : 0,
        "scanDimensionsY" : 0,
        "scannerFrequency" : 0.0
    });

    useEffect(()=>{
        console.log("API")
        const fetchMyData = async () => {
            const data = await getData();
            setScanners(data);
        }
        fetchMyData();
    },[])
    const value = {scanners, setScanners};  
    return(
        <AppContext.Provider value={value}>
            <FormContext.Provider value={{ formdata, setFormdata }}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </FormContext.Provider>
        </AppContext.Provider>
    )
};


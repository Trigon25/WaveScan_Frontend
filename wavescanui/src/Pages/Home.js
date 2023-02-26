import React, { useContext } from "react";
import AppContext from "../Components/AppContext";
import Scanners from '../Components/Scanners'
import '../CSS/Home.css'

function Home() {
    const { scanners, setScanners } = useContext(AppContext);
    return (
        <div className='Home'>
            {scanners == null ? 
                <p>No Scanners</p> 
                : <Scanners />}
        </div>
    );
}
export default Home;

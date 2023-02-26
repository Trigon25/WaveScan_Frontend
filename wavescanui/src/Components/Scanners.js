import React, { useContext, useEffect, useState } from "react";
import '../CSS/Scanners.css'
import AppContext from "./AppContext";

const Scanners = () => {
    const { scanners, setScanners } = useContext(AppContext);
    const [avail, setAvail] = useState([])

    const handleClick = event => {
        let newAvail = [...avail]
        newAvail[event.currentTarget.id] = !avail[event.currentTarget.id]
        setAvail(newAvail)
    }

    const availSetter = () => {
        for (let i=0;i<scanners.length; i++){
            if (i===0){
                if (scanners[i].isAvailable === 'true'){
                    setAvail([true])
                }
                else{
                    setAvail([false])
                }
            }
            else if (scanners[i].isAvailable === 'true'){
                setAvail(avail=>[...avail, true])
            }
            else {
                setAvail(avail=>[...avail, false])
            }
        }
    }
    
    useEffect(()=>{
        availSetter();
    },[scanners])

    const renderScanners = () => {
        let render = [];
        
        for (let i=0;i<scanners.length; i++) {
            var item = scanners[i]
            var name = item.scannerName.split(' - ')

            render.push(
                <div key={i} className="rowItemContainer">
                    <div className="scanerName">
                        <p>{name[0]}</p>
                    </div>
                    <div className="country">
                        <p>{name[1]}</p>
                    </div>
                    <div className="ipAddress">
                        <p>{item.ipAddress}</p>                    
                    </div>
                    <div className="scanSpeed">
                        <p>{item.scannerSpeed}</p>
                    </div>
                    <div className="isAvail">
                        <p>{avail[i] ? "Available" : "Engaged"}</p>
                    </div>
                    {
                        avail[i] ?
                        <div className="connect">
                            <button id={i} onClick={handleClick}>Connect</button>
                        </div>
                        :
                        <div className="connectDis">
                            <button disabled={true}>Connect</button>
                        </div>
                    }
                </div>
            )
        }
        return render;
    }
    return(
        <div className="scanners">
            <div className="table">
                <div className="rowItemContainer">
                    <div className="header">
                        <p>Scanner Name</p>
                    </div>
                    <div className="header">
                        <p>Country</p>
                    </div>
                    <div className="header">
                        <p>IP Address</p>
                    </div>
                    <div className="header">
                        <p>Scanning Speed</p>
                    </div>
                    <div className="header">
                        <p>Status</p>
                    </div>
                    <div className="header"></div>
                </div>
                {scanners == null ? null : renderScanners()}
            </div>
        </div>
    );
}; 

export default Scanners;
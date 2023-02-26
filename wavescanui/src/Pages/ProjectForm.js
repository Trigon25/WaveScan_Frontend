import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import { postData } from "../APIHandler/CallingAPI";
import FormContext from "../Components/FormContext";
import { NavLink } from "react-router-dom";
import Button from "../UIElements/Button"
import '../CSS/ProjectForm.css'
import AppContext from "../Components/AppContext";

const ProjectForm = () => {
    let initialRender = useRef(true);
    const {scanners, setScanners} = useContext(AppContext);
    const {formdata, setFormdata} = useContext(FormContext);
    const [valid, setValid] = useState(false);
    const [problem, setProblem] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [scanMode, setScanMode] = useState("GANTRY");
    const [scanX, setScanX] = useState(0);
    const [scanY, setScanY] = useState(0);
    const [scanFreq, setScanFreq] = useState(0.0);

    const [res, setRes] = useState("")

    const handleClick = (event) => {
        event.preventDefault();
        console.log(formdata)
        const postForm = async () => {
            let res = await postData(formdata)
            console.log(res)
            setRes(res)
        }
        postForm();
    }

    const validator = useCallback(() => {
        let problems = []
        if (!parseInt(scanX) || !parseInt(scanY) || parseInt(scanX) < 1 || parseInt(scanY) < 1){
            setValid(false);
            problems.push(
                <p>{"Scanner Dimensions must be integers with values >= 1"}</p>
            )
        }
        if (!parseFloat(scanFreq) || parseFloat(scanFreq < 1)){
            setValid(false)
            problems.push(
                <p>{"Scanning Frequency must be floats with values >= 1.0"}</p>
            )
        }
        if (projectName.length <= 3){
            setValid(false)
            problems.push(
                <p>{"Project Name must be longer than 3 characters"}</p>
            )
        }
        if (problems.length === 0){
            setValid(true)
        }
        return problems;
    },[projectName, scanFreq, scanX, scanY])

    useEffect(()=> {
        console.log("UpDATE")
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            let render = validator();
            if (valid) {
                let x = parseInt(scanX);
                let y = parseInt(scanY);
                let freq = parseFloat(scanFreq);
                setFormdata({
                    "projectName": projectName,
                    "scanningMode": scanMode,
                    "scanDimensionsX": x,
                    "scanDimensionsY": y,
                    "scannerFrequency": freq
                })
                console.log("VALID")
            }
            else {
                setProblem(render)
            }
        }
    // eslint-disable-next-line
    }, [validator, valid, projectName, scanMode, scanX, scanY, scanFreq])

    useEffect(() => {
        if (res === "Success!"){
            console.log(scanners)
            let newScanners = []
            for (let i=0;i<scanners.length;i++){
                console.log(scanners[i].scannerSpeed);
                if (scanners[i].scannerSpeed >= formdata.scannerFrequency){
                    console.log("Freq")
                    let name = scanners[i].scannerName.split(" - ");
                    switch (name[0]) {
                        case "RoboticArm":
                            if (formdata.scanningMode === 'ARM'){
                                newScanners.push(scanners[i]);
                            }
                            break;
                        case "Gantry":
                            if (formdata.scanningMode === 'GANTRY'){
                                newScanners.push(scanners[i]);
                            }
                            break;
                        case "Auto":
                            if (formdata.scanningMode === 'AUTO'){
                                newScanners.push(scanners[i]);
                            }
                            break;
                        case "Manual":
                            if (formdata.scanningMode === 'MANUAL'){
                                newScanners.push(scanners[i]);
                            }
                            break;
                        case "“CRAWLER”":
                            if (formdata.scanningMode === 'CRAWLER'){
                                newScanners.push(scanners[i]);
                            }
                            break;
                        default:
                            console.log("failed")
                            break;
                    }
                }
            }
            console.log(newScanners)
            setScanners(newScanners);
        }
    // eslint-disable-next-line
    }, [res])

    return(
        <div className="page">
            <form className="form">
                <div className="formitem">
                    <p>Project Name</p>
                    <input 
                    className="nameinput" 
                    name="projectname"
                    placeholder="Minimum 3 Characters"
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                    />
                </div>
                <div className="formitem">
                    <p>Scanning Mode</p>
                    <select className="option" 
                    name="mode" 
                    value={scanMode}
                    onChange={ e => setScanMode(e.target.value) }
                    >
                        <option value="GANTRY">Gantry</option>
                        <option value="CRAWLER">Crawler</option>
                        <option value="AUTO">Auto</option>
                        <option value="MANUAL">Manual</option>
                        <option value="ARM">Robotic Arm</option>
                    </select>
                </div>
                <div className="formitem">
                    <p>Scan Dimensions (cm)</p>
                    <div className="XY">
                        <p>X:</p>
                        <input className="xyinput" 
                        name="x" 
                        value={scanX} 
                        onChange={e => setScanX(e.target.value)}
                        />
                        <p>Y:</p>
                        <input className="xyinput" 
                        name="y" 
                        value={scanY}
                        onChange={e => setScanY(e.target.value)}
                        />
                    </div>
                </div>
                <div className="formitem">
                    <p>Scanner Frequency (GHz)</p>
                    <input className="scanfreq" 
                    name="scanfreq" 
                    value={scanFreq}
                    onChange={ e => setScanFreq(e.target.value)}
                    />
                </div>

                {valid ? <div className="submit">
                    <Button onClick={handleClick}>Submit</Button>
                </div> : null}

                <div>
                    {res === "Success!" ? 
                    <>
                        <p>{res}</p> 
                        <div className="redirect">
                            <NavLink to='/' className="panelItem">
                                <p className="panelText">To Scanners</p>
                            </NavLink>
                        </div>
                    </>
                        
                        : 
                        <div>
                            {problem}
                        </div>
                    }
                </div>
            </form>
        </div>
    )
};

export default ProjectForm;
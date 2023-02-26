import { createContext } from "react";

const AppContext = createContext({
    scanners: {},
    setScanners: () => {},
    avail: [],
    setAvail: () => []
});

export default AppContext;
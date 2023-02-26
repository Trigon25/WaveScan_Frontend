import { createContext } from "react";

const FormContext = createContext({
    formdata: {},
    setFormdata: () => {},
});

export default FormContext;
import axios from "axios"

const getEndpoint = `https://wavescan-internship.saurabhmudgal.repl.co/success`
const postEndpoint = `https://wavescan-internship.saurabhmudgal.repl.co/submitForm`

export function getData() {
    return(axios
        .get(getEndpoint)
        .then((res) => res.data)
        .catch(error => console.log(error)))
};

export function postData(formdata) {
    return(
        axios
            .post(postEndpoint, formdata)
            .then((res) => res.data)
            .catch(error => console.log(error))
    )
}
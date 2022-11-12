import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const request = axios.get("http://localhost:3001/persons");
    return request.then(response => response.data)
}

const addContact = (newContactObject) =>{
    const request = axios.post(baseUrl, newContactObject);
    return request.then(response => response.data)
}

export default {getAll, addContact}
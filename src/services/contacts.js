import axios from "axios";
const baseUrl = "http://localhost:8080/api/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const addContact = (newContactObject) =>{
    const request = axios.post(baseUrl, newContactObject);
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data)
}

export default {getAll, addContact, deleteContact}
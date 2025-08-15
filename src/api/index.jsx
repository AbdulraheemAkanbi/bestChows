
import axios from "axios";

const BASE_URL = "https://localhost:44385/api/";

export const ENDPOINTS = {
    CUSTOMER: 'Customer',
    FOODITEM: 'FoodItem',
    ORDER: 'Order',
    LOGIN: "Login"
}

export const createAPIEndpoint = endpoint =>{

    let url = BASE_URL + endpoint + '/';

    return {
        fetchAll : () => axios.get(url),
        fetchById : id => axios.get(url + id),
        create : newRecord => axios.post(url, newRecord),
        update : updatedRecord => axios.put(url+id, updatedRecord),
        delete : id => axios.delete(url + id),
        login : credentials => axios.post(url, credentials)


    }

}
// 
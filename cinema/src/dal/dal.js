import axios from 'axios'


var getAllData = (url) =>
{
    
    return axios.get(url)
    
}

export default {getAllData}
import {BASE_URL} from '../config';
import axios from 'axios';
const NDC_URL = 'https://api.fda.gov/drug/ndc.json';
// Get full orders list (Dev Only)

async function search(query, limit=1, skip=0) {
    return axios.get(`${NDC_URL}?search=${query}`)
        .then( (response) => {
          if (response.data.error != undefined) throw response.data;
          return {
            success: true,
            message: `Successfully completed ndc search`,
            content: response.data.results,
          };
        })
        .catch((err) => {
          return {
            success: false,
            message: `Error ocurred during ndc search`,
            content: err,
          };
        });
  };
async function searchProducts(query) {
    return axios.post(`${BASE_URL}api/product/search`, {query})
        .then( (response) => {
          if (response.data.error != undefined) throw response.data;
          console.log('hello')
          return response.data;
        })
        .catch((err) => {
          return {
            success: false,
            message: `Error ocurred during search`,
            content: err,
          };
        });
}
module.exports = {
    search,
    searchProducts
};



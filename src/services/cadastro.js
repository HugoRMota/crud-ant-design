import axios from 'axios';

export default {
  async listarCidades() {
    return axios({
      url: `https://labbe-test.herokuapp.com/cities`,
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImlhdCI6MTU4NTg0MTk5NH0.kyyRU3-j20lPBChJZdEKR3w171--93cFwFiVGzkbXLU',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  },

  async citiesDelete(params) {
    console.log('params', params);

    return axios({
      baseURL: `https://labbe-test.herokuapp.com/cities/${params.id}`,
      method: 'DELETE',
      data: params,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImlhdCI6MTU4NTg0MTk5NH0.kyyRU3-j20lPBChJZdEKR3w171--93cFwFiVGzkbXLU',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  },
  async citiesPut(params) {
    return axios(`https://labbe-test.herokuapp.com/cities/${params.id}`, {
      method: 'PUT',
      data: params,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImlhdCI6MTU4NTg0MTk5NH0.kyyRU3-j20lPBChJZdEKR3w171--93cFwFiVGzkbXLU',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  },

  async citiesPost(params) {
    return axios({
      method: 'POST',
      url: 'https://labbe-test.herokuapp.com/cities',
      data: params,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImlhdCI6MTU4NTg0MTk5NH0.kyyRU3-j20lPBChJZdEKR3w171--93cFwFiVGzkbXLU',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  },

  async listarEstados() {
    return axios({
      method: 'GET',
      url: 'https://labbe-test.herokuapp.com/states',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImlhdCI6MTU4NTg0MTk5NH0.kyyRU3-j20lPBChJZdEKR3w171--93cFwFiVGzkbXLU',
        'Content-Type': 'application/json',
      },
      json: true,
      // withCredentials: true,
    });
  },

  async statesDelete(params) {
    return axios({
      url: `https://labbe-test.herokuapp.com/states/${params.id}`,
      method: 'DELETE',
      data: params,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImlhdCI6MTU4NTg0MTk5NH0.kyyRU3-j20lPBChJZdEKR3w171--93cFwFiVGzkbXLU',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  },

  async statesPut(params) {
    return axios({
      url: `https://labbe-test.herokuapp.com/states/${params.id}`,
      method: 'PUT',
      data: params,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImlhdCI6MTU4NTg0MTk5NH0.kyyRU3-j20lPBChJZdEKR3w171--93cFwFiVGzkbXLU',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  },

  async statesPost(params) {
    return axios({
      method: 'POST',
      url: `https://labbe-test.herokuapp.com/states`,
      data: params,

      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImlhdCI6MTU4NTg0MTk5NH0.kyyRU3-j20lPBChJZdEKR3w171--93cFwFiVGzkbXLU',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  },
};

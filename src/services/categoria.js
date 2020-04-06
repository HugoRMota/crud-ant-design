// import request from '@/utils/request';
import axios from 'axios';

import { stringify } from 'qs';

export default {
  //  Para filtar dados listados, params contem dados e stringify para criar rota na url e atualizar a cada caracteres
  async listCategorias(params) {
    return axios({
      url: `https://labbe-test.herokuapp.com/categories?${stringify(params)}`,
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImlhdCI6MTU4NTg0MTk5NH0.kyyRU3-j20lPBChJZdEKR3w171--93cFwFiVGzkbXLU',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  },

  async categoriesDelete(params) {
    return axios({
      url: `https://labbe-test.herokuapp.com/categories/${params.id}`,
      method: 'DELETE',
      data: { params },
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQsImlhdCI6MTU4NTg0MTk5NH0.kyyRU3-j20lPBChJZdEKR3w171--93cFwFiVGzkbXLU',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  },

  async categoriesPut(params) {
    return axios({
      url: `https://labbe-test.herokuapp.com/categories/${params.id}`,
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

  async categoriesPost(params) {
    return axios({
      url: 'https://labbe-test.herokuapp.com/categories',
      method: 'POST',
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

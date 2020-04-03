import request from '@/utils/request';
import { stringify } from 'qs';

export default {
  //  Para filtar dados listados, params contem dados e stringify para criar rota na url e atualizar a cada caracteres
  async listCategorias(params) {
    console.log(params, 'params');

    return request(`/api/categories?${stringify(params)}`);
  },

  async categoriesDelete(id) {
    return request(`/api/categoriesDelete/${id}`, {
      method: 'DELETE',
      data: { id },
    });
  },

  async categoriesPut(params) {
    return request(`/api/categoriesPut/${params.id}`, {
      method: 'PUT',
      data: params,
    });
  },

  async categoriesPost(params) {
    return request('/api/categoriesPost', {
      method: 'POST',
      data: params,
    });
  },
};

import request from '@/utils/request';

export default {
  async registerUser(params) {
    // Retorno dos dados contidos na API ou MOCK
    return request('/api/registerUser', {
      // Metodo de Registro do Usuario
      method: 'POST',
      // params contém dados contido no MOCK
      data: params,
    });
  },
};

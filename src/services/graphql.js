import request from '@/utils/request';

export default {
  async put(params) {
    return request(`/api/statesPut/${params.id}`, { method: 'PUT', data: params });
  },

  async post(params) {
    return request('/api/statesPost', { method: 'POST', data: params });
  },

  async delete(params) {
    return request(`/api/statesDelete/${params.id}`, { method: 'DELETE', data: params });
  },
};

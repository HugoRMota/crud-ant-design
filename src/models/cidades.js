import cities from '@/services/cadastro';
import { notification } from 'antd';

export default {
  namespace: 'cities',

  state: {
    current: {},
    dados: {
      pagination: {},
      list: [],
    },
    statesData: [],
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    *listarCidades({ payload }, { call, put }) {
      try {
        const {
          data: { success, data },
        } = yield call(cities.listarCidades, payload);

        const pagination = {
          current: data.page,
          perPage: data.perPage,
          total: data.total,
        };
        yield put({ type: 'updateState', payload: { dados: { pagination, list: data.data } } });
      } catch (error) {
        notification.error({ message: 'Não foi possivel listar os dados' });
      }
    },

    *citiesPost({ payload }, { call, put }) {
      try {
        const {
          data: { success, message, data },
        } = yield call(cities.citiesPost, payload);
        if (success) {
          notification.success({ message });

          yield put({ type: 'listarCidades' });
        } else {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: 'Não foi possivel salvar' });
      }
    },

    *citiesPut({ payload }, { call, put }) {
      try {
        const {
          data: { success, message, data },
        } = yield call(cities.citiesPut, payload);
        if (success) {
          notification.success({ message });
          yield put({ type: 'listarCidades' });
        } else {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: 'Não foi possivel alterar' });
      }
    },

    *citiesDelete({ payload }, { call, put }) {
      try {
        const {
          data: { success, message, data },
        } = yield call(cities.citiesDelete, payload);

        // console.log(data);

        if (success) {
          notification.success({ message });
          yield put({ type: 'listarCidades' });
        } else {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: 'Não foi possivel excluir' });
      }
    },
  },
};

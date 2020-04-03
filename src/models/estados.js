import states from '@/services/cadastro';
import { notification } from 'antd';

export default {
  namespace: 'states',

  state: {
    current: {},
    dados: {
      pagination: {},
      list: [],
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    *listarEstados(_, { call, put }) {
      console.log('passou');
      try {
        const {
          data: { success, data },
        } = yield call(states.listarEstados);

        const pagination = {
          current: data.page,
          perPage: data.perPage,
          total: data.total,
        };

        yield put({ type: 'updateState', payload: { dados: { pagination, list: data.data } } });
      } catch (error) {
        notification.error({ message: 'Não foi  possivel buscar o s dados:' });
      }
    },

    *statesPost({ payload }, { call, put }) {
      try {
        const {
          data: { success, message, data },
        } = yield call(states.statesPost, payload);
        if (success) {
          notification.success({ message });
          yield put({ type: 'listarEstados' });
        } else {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: 'Não foi possivel cadastrar' });
      }
    },

    *statesPut({ payload }, { call, put }) {
      try {
        const {
          data: { success, message, data },
        } = yield call(states.statesPut, payload);
        if (success) {
          notification.success({ message });
          yield put({ type: 'listarEstados' });
        } else {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: 'Não foi possivel atualizar' });
      }
    },

    *statesDelete({ payload }, { call, put }) {
      try {
        const {
          data: { success, message, data },
        } = yield call(states.statesDelete, payload);
        if (success) {
          notification.success({ message });
          yield put({ type: 'listarEstados' });
        } else {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: 'Não foi possivel excluir o item' });
      }
    },
  },
};

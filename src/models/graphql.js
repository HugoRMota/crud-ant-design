import graphql from '@/services/graphql';
import { notification } from 'antd';

export default {
  namespace: 'graphql',

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
    *put({ payload }, { call }) {
      try {
        const { success, message } = yield call(graphql.put, payload);
        if (success) {
          notification.success({ message });
        } else {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: ' Não foi possivel atualizar' });
      }
    },

    *post({ payload }, { call }) {
      try {
        const { success, message } = yield call(graphql.post, payload);
        if (success) {
          notification.success({ message });
        } else {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: 'Não foi possivel cadastrar' });
      }
    },

    *delete({ payload }, { call }) {
      try {
        const { success, message } = yield call(graphql.delete, payload);
        if (success) {
          notification.success({ message });
        } else {
          notification.error({ message });
        }
      } catch {
        notification.error({ message: 'Não foi possivel deletar' });
      }
    },
  },
};

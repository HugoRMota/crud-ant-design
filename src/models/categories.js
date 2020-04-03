import categories from '@/services/categoria';
import { notification } from 'antd';

export default {
  namespace: 'categories',

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
    // Quando tiver que ordernar os dados listar payload onde virá os dados
    *listCategorias({ payload }, { call, put }) {
      try {
        const { success, data } = yield call(categories.listCategorias, payload);

        const pagination = {
          current: data.page,
          perPage: data.perPage,
          total: data.total,
        };

        if (success) {
          yield put({ type: 'updateState', payload: { dados: { pagination, list: data.data } } });
        } else {
          notification.error({ message: 'Não foi possivel listar' });
        }
      } catch (error) {
        // ignore
      }
    },

    *categoriesPost({ payload }, { call, put }) {
      try {
        const { success, message } = yield call(categories.categoriesPost, payload);
        if (success) {
          notification.success({ message });
          yield put({ type: 'listCategorias' });
        } else {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: 'Não foi possivel salvar' });
      }
    },

    *categoriesPut({ payload }, { call, put }) {
      try {
        const { success, message } = yield call(categories.categoriesPut, payload);
        if (success) {
          notification.success({ message });
          yield put({ type: 'listCategorias' });
        } else {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: 'Não foi possivel alterar' });
      }
    },

    *categoriesDelete({ payload }, { call, put }) {
      try {
        const { success, message } = yield call(categories.categoriesDelete, payload);
        if (success) {
          notification.success({ message });
          yield put({ type: 'listCategorias' });
        } else {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: 'Nâo foi possivel excluir' });
      }
    },
  },
};

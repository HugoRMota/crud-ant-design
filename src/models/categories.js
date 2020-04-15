import categories from '@/services/categoria';
import { notification } from 'antd';
import router from 'umi/router';

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
        const {
          data: { success, data },
        } = yield call(categories.listCategorias, payload);

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
        const {
          data: { success, message, data },
        } = yield call(categories.categoriesPost, payload);
        if (success) {
          notification.success({ message: 'Cadastrado com sucesso' });
          yield put({ type: 'listCategorias' });
          router.push('/categories-page');
        }
      } catch (error) {
        console.log(error, 'error');

        notification.error({ message: 'Não foi possivel salvar' });
      }
    },

    *categoriesPut({ payload }, { call, put }) {
      try {
        const {
          data: { success, message, data },
        } = yield call(categories.categoriesPut, payload);
        if (success) {
          notification.success({ message: 'Atualizado com sucesso' });
          yield put({ type: 'listCategorias' });
          router.push('/categories-page');
        }
      } catch (error) {
        notification.error({ message: 'Não foi possivel alterar' });
      }
    },

    *categoriesDelete({ payload }, { call, put }) {
      try {
        const {
          data: { success, message, data },
        } = yield call(categories.categoriesDelete, payload);
        if (success) {
          notification.success({ message });
          yield put({ type: 'listCategorias' });
          router.push('/categories-page');
        } else {
          notification.error({ message: 'Excluído com sucesso' });
        }
      } catch (error) {
        notification.error({ message: 'Nâo foi possivel excluir' });
      }
    },

    *showCategories({ payload }, { call, put }) {
      try {
        const {
          data: { success, message, data },
        } = yield call(categories.showCategories, payload);
        if (!success) {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: 'Não é possivel listar' });
      }
    },
  },
};

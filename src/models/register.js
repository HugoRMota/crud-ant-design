import register from '@/services/register';
import { notification } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'register',

  state: {
    current: {},
  },

  reducers: {},

  effects: {
    *registerUsers({ payload }, { call }) {
      try {
        const { success, message } = yield call(register.registerUser, payload);
        if (success) {
          notification.success({ message });
          router.push('/user/login');
        } else {
          notification.error({ message });
        }
      } catch (error) {
        notification.error({ message: 'Não foi possivel' });
      }
    },
  },
};

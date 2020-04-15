import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
// import router from 'umi/router';
import { createAction } from '@/utils/utils';
import { notification } from 'antd';

const authLink = setContext(async (_, { headers }) => {
  // const token = await getAuthToken();
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU4Njg3Mzc0NH0.p0gvBQuekHezSSd3rWIuUSjR4aGyWqEd1T3CMnnXCLw';
  const authorizationHeader = token ? { authorization: token } : {};

  return {
    headers: {
      ...headers,
      ...authorizationHeader,
    },
  };
});

const resetToken = onError(({ networkError }) => {
  if (networkError && networkError.name === 'ServerError' && networkError.statusCode === 401) {
    // @HACK
    // eslint-disable-next-line no-underscore-dangle
    window.g_app._store.dispatch(createAction('login/logout')());
    notification.warning({
      message: 'Sua sess�o expirou',
      description: 'Por favor, entre novamente.',
    });
  }
});

const authToken = authLink.concat(resetToken);

export const extraLinks = [authToken];

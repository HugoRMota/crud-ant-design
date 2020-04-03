const register = {
  success: true,
  data: {
    userName: 'Carlos',
    email: 'carlos@gmail.com',
    password: '12',
  },
  message: 'Cadastrado com sucesso',
};

export default {
  'POST /api/registerUser': register,
};

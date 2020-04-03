const states = {
  success: true,
  data: {
    page: 1,
    total: 6,
    lastPage: 1,
    pageSize: 10,
    data: [
      {
        id: 1,
        name: 'ES',
      },
      {
        id: 2,
        name: 'RJ',
      },
      {
        id: 3,
        name: 'SP',
      },
    ],
  },
};

const statesPost = {
  success: true,
  data: {
    name: 'ES',
  },
  message: 'Adicionado com sucesso',
};

const statesPut = {
  success: true,
  data: {
    id: 1,
    name: 'ES',
  },
  message: 'Adicionado com sucesso',
};

const statesDelete = {
  success: true,
  message: 'Excluido com sucesso',
};

const cities = {
  success: true,
  data: {
    page: 1,
    total: 6,
    lastPage: 1,
    pageSize: 10,
    data: [
      {
        id: 1,
        name: 'Vitoria',
        id_state: 1,
        states: {
          id: 1,
          name: 'ES',
        },
      },
      {
        id: 2,
        name: 'Serra',
        id_state: 1,

        states: {
          id: 1,
          name: 'ES',
        },
      },
      {
        id: 3,
        name: 'Cariacica',
        id_state: 1,

        states: {
          id: 1,
          name: 'ES',
        },
      },
      {
        id: 4,

        name: 'Viana',
        id_state: 1,

        states: {
          id: 1,
          name: 'ES',
        },
      },
      {
        id: 5,
        name: 'Rio de Janeiro',
        id_state: 2,

        states: {
          id: 2,
          name: 'RJ',
        },
      },
      {
        id: 6,
        name: 'Niteroi',
        id_state: 2,

        states: {
          id: 2,
          name: 'RJ',
        },
      },
      {
        id: 7,
        name: 'Volta Redonda',
        id_state: 2,

        states: {
          id: 2,
          name: 'RJ',
        },
      },
      {
        id: 8,
        name: 'Campos',
        id_state: 2,

        states: {
          id: 2,
          name: 'RJ',
        },
      },
      {
        id: 9,
        name: 'São Paulo',
        id_state: 3,

        states: {
          id: 3,
          name: 'SP',
        },
      },
      {
        id: 10,
        name: 'Santos',
        id_state: 3,

        states: {
          id: 3,
          name: 'SP',
        },
      },
      {
        id: 11,
        name: 'Jundia',
        id_state: 3,

        states: {
          id: 3,
          name: 'SP',
        },
      },
      {
        id: 12,
        name: 'Sorocaba',
        id_state: 3,

        states: {
          id: 3,
          name: 'SP',
        },
      },
    ],
  },
};

const citiesPost = {
  success: true,
  data: {
    name: 'Vitoria',
    id_state: 1,
  },
  message: 'Adicionado com sucesso',
};

const citiesPut = {
  success: true,
  data: {
    id: 1,
    name: 'Vitoria',
    id_state: 1,
  },
  message: 'Adicionado com sucesso',
};

const citiesDelete = {
  success: true,
  data: 'Excluido com sucesso',
};

const categories = {
  success: true,
  data: {
    page: 1,
    total: 6,
    lastPage: 1,
    pageSize: 5,
    data: [
      {
        id: 1,
        name: 'Cerveja',
        price: '3,00',
        cycle_time: '01/01/2020',
        reserve_time: '00:00',
      },
      {
        id: 2,
        name: 'Vodka',
        price: '10,00',
        cycle_time: '01/01/2020',
        reserve_time: '00:00',
      },
      {
        id: 3,
        name: 'Amarula',
        price: '5,00',
        cycle_time: '01/01/2020',
        reserve_time: '00:00',
      },
    ],
  },
};

const categoriesPost = {
  success: true,
  data: {
    name: 'Cerveja',
    price: '03,00',
    cycle_time: '2020-03-30',
    reserve_time: '00:00',
  },
  message: 'Adicionado com sucesso',
};

const categoriesPut = {
  success: true,
  data: {
    name: 'Cerveja',
    price: '03,00',
    cycle_time: '2020-03-30',
    reserve_time: '00:00',
  },
  message: 'Alterado com sucesso',
};

const categoriesDelete = {
  success: true,
  data: 'Excluido com sucesso',
};

export default {
  'GET /api/states': states,
  'POST /api/statesPost': statesPost,
  'PUT /api/statesPut/:id': statesPut,
  'DELETE /api/statesDelete/:id': statesDelete,

  'GET /api/cities': cities,
  'POST /api/citiesPost': citiesPost,
  'PUT /api/citiesPut/:id': citiesPut,
  'DELETE /api/citiesDelete/:id': citiesDelete,

  'GET /api/categories': categories,
  'POST /api/categoriesPost': categoriesPost,
  'PUT /api/categoriesPut/:id': categoriesPut,
  'DELETE /api/categoriesDelete/:id': categoriesDelete,
};

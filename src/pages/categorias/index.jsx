import React, { Component, Fragment } from 'react';
import { Card, List, Button, Popconfirm, Form, Input, Row, Col, Radio, Icon } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import 'moment/locale/pt-br';
import Manager from './manager';

moment.locale('pt-BR');

const { Item } = List;

const { Meta } = Item;

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

@Form.create()
class Index extends Component {
  baseState = this.state;

  state = {
    visible: false,
    modalTitle: 'Novo cadastro',
    current: {},
    searchValue: '',
    searchType: 'name',

    // array  onde listar as opções mais detalhadas do filtro que desejo
    filters: [
      {
        name: 'name',
        label: 'Nome',
        type: 'text',
      },
    ],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'categories/listCategorias', payload: {} });
  }

  handleSubmit = () => {
    const {
      form: { validateFields },
      dispatch,
    } = this.props;

    const { current } = this.state;

    validateFields((error, fieldsValue) => {
      if (error) return;

      const payload = fieldsValue;

      if (current.id) {
        payload.id = current.id;
        dispatch({ type: 'categories/categoriesPut', payload });
      } else {
        dispatch({ type: 'categories/categoriesPost', payload });
      }

      // após salvar fechar o modal
      this.setState({ visible: false });
    });
  };

  handleShowModal = () => {
    this.setState({ current: {}, visible: true, modalTitle: 'Novo cadastro' });
  };

  handleCancelModal = () => {
    this.setState({ current: {}, visible: false });
  };

  handleEditItem = item => {
    this.setState({ current: item, visible: true, modalTitle: 'Editar' });
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'categories/categoriesDelete',
      payload: id,
    });
    console.log(id);
  };

  handleOnChange = (value, campo) => {
    const { current } = this.state;
    this.setState({ current: { ...current, [campo]: value } });
  };

  // Primeiro retorna os dados alocados no props, após colocar no state e repassa dispatch onde contem payload com dados
  filterRequest = () => {
    const { dispatch } = this.props;
    const { searchType, searchValue } = this.state;

    dispatch({ type: 'categories/listCategorias', payload: { [searchType]: searchValue } });
  };

  // Alocando dados no state
  changeSearchValue = e => {
    const { value } = e.target;
    this.setState({ searchValue: value });

    // Numero de caracteres para iniciar um request para pesquisa
    if (value.length > 2) {
      this.filterRequest();
    }
  };

  // Apagando dados do campo de filtro, convertendo para uma string vazia
  resetSearch = () => {
    const { dispatch } = this.props;

    dispatch({ type: 'categories/listCategorias', payload: {} });

    this.setState({ searchValue: '' });
  };

  handleSearch = () => {
    const { searchValue, filters } = this.state;

    return (
      <Fragment>
        <div style={{ width: 400 }}>
          <Row gutter={24}>
            <Col xl={6} lg={6} md={6} sm={24}>
              <RadioGroup defaultValue="name">
                {filters.map(item => (
                  <RadioButton key={item.name} value={item.name}>
                    {item.label}
                  </RadioButton>
                ))}
              </RadioGroup>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24}>
              <Input value={searchValue} onChange={this.changeSearchValue} />
            </Col>
            <Col xl={6} lg={6} md={6} sm={24}>
              <Button shape="circle" onClick={this.resetSearch}>
                <Icon type="close" />
              </Button>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  };

  render() {
    const {
      form: { getFieldDecorator },
      categories: {
        dados: { pagination, list },
      },
    } = this.props;

    const { visible, modalTitle, current } = this.state;

    const props = {
      visible,
      modalTitle,
      current,
      getFieldDecorator,
      handleSubmit: this.handleSubmit,
      handleCancelModal: this.handleCancelModal,
      handleOnChange: this.handleOnChange,
      currentValue: this.currentValue,
    };
    return (
      <Fragment>
        <Card
          title={
            <Button type="primary" icon="plus" onClick={this.handleShowModal}>
              Novo
            </Button>
          }
          extra={this.handleSearch()}
        >
          <List
            rowKey="id"
            dataSource={list}
            pagination={{ ...pagination }}
            renderItem={item => (
              <Item
                actions={[
                  <Button type="primary" onClick={() => this.handleEditItem(item)}>
                    Editar
                  </Button>,
                  <Popconfirm
                    placement="topRight"
                    title="Deseja realmente excluir o item?"
                    onConfirm={() => this.handleDelete(item)}
                    okText="Sim, excluir"
                    cancelText="Não, cancelar"
                  >
                    <Button type="danger">Excluir</Button>
                  </Popconfirm>,
                ]}
              >
                <Meta title={item.name} />
                <Meta title={item.price} />
                <Meta title={item.cycle_time} />
                <Meta title={item.reserve_time} />
              </Item>
            )}
          />
        </Card>
        <Manager {...props} />
      </Fragment>
    );
  }
}

export default connect(({ categories }) => ({ categories }))(Index);

import React, { Component, Fragment } from 'react';
import { Card, List, Button, Popconfirm, Form, Select } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import Manager from './manager';
import 'moment/locale/pt-br';

moment.locale('pt.BR');

const { Item } = List;
const { Meta } = Item;

@Form.create()
class Index extends Component {
  state = {
    visible: false,
    modalTitle: 'Novo Cadastro',
    current: {},
  };

  // ciclo de vida , dados cadastrados nos inputs
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'cities/listarCidades', payload: {} });
  }

  // função submit onde form recebe os dados contido no props, validateFields para validados campos adicionados,
  // fieldsValues recebe os dados apos validação, payload recebe dados dos campos
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

        dispatch({ type: 'cities/citiesPut', payload });
      } else {
        dispatch({ type: 'cities/citiesPost', payload });
      }
      this.setState({ visible: false });
    });
  };

  // função de abrir modal de cadastro
  handleShowModal = () => {
    this.setState({ current: {}, visible: true, modalTitle: 'Novo cadastro' });
  };

  // função de cancelar modal, retorna item vazio e fecha modal
  handleCancelModal = () => {
    this.setState({ current: {}, visible: false });
  };

  // função de editar, o item a ser editado é refenciado no current, visible seria para abertura do modal , modalTitle é titulo apos selecionar a opção editar
  handleEditItem = item => {
    this.setState({ current: item, visible: true, modalTitle: 'Editar' });
  };

  // deixando os dados do input no state, primeiro campo Value referencia função e campo dados que irá substituir
  handleOnChange = (value, campo) => {
    const { current } = this.state;
    this.setState({ current: { ...current, [campo]: value } });
  };

  // para retorna dados contido no state, caso esteja sem nada retorna uma string vazia
  currentValue = campo => {
    const { current } = this.state;
    return current[campo] || '';
  };

  // Função de exclusão recendo dados do props e dispatch referenciando namespace e router do delete

  handleDelete = current => {
    const { dispatch } = this.props;
    dispatch({
      type: 'cities/citiesDelete',
      payload: current,
    });
    console.log(current);
  };

  render() {
    const {
      // getFieldsDecorator contem os dados cadastros nos inputs e validações dos campos como required , message, icon, type
      form: { getFieldDecorator },
      cities: {
        dados: { pagination, list },
      },
    } = this.props;

    const { visible, modalTitle, current } = this.state;

    const props = {
      visible,
      modalTitle,
      current,
      getFieldDecorator,
      handleCancelModal: this.handleCancelModal,
      handleSubmit: this.handleSubmit,
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
                    title="Deseja realmente exluir esse item?"
                    onConfirm={() => this.handleDelete(item)}
                    okText="sim, excluir"
                    cancelText="não, cancelar"
                  >
                    <Button type="danger"> Excluir</Button>,
                  </Popconfirm>,
                ]}
              >
                <Meta title={item.name} />
                <Meta title={item.State.name} />
              </Item>
            )}
          />
        </Card>
        <Manager {...props} />
      </Fragment>
    );
  }
}

export default connect(({ cities }) => ({ cities }))(Index);

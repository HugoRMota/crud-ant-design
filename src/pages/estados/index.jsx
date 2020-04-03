import React, { Component, Fragment } from 'react';
import { Card, List, Button, Popconfirm, Form } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import 'moment/locale/pt-br';
import Manager from './manager';

moment.locale('pt-BR');

const { Item } = List;
const { Meta } = Item;

@Form.create()
class Index extends Component {
  state = {
    visible: false,
    modalTitle: 'Novo Cadastro',
    current: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'states/listarEstados', payload: {} });
    // dispatch ({type: 'cadastro/'})
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
        dispatch({ type: 'states/statesPut', payload });
      } else {
        dispatch({ type: 'states/statesPost', payload });
      }
      this.setState({ visible: false });
      console.log(payload);
    });
  };

  handleShowModal = () => {
    this.setState({ current: {}, visible: true, modalTitle: 'Novo cadastro' });
  };

  handleCancelModal = () => {
    this.setState({ current: {}, visible: false });
  };

  handleEditItem = item => {
    this.setState({ current: item, visible: true, modalTitle: 'Editar cadastro' });
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'states/statesDelete',
      payload: id,
    });
    console.log(id);
  };

  render() {
    const {
      form: { getFieldDecorator },
      states: {
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
            pagination={{
              // onChange: (currentPage, pageSize) => this.paginationProps(currentPage, pageSize),
              ...pagination,
            }}
            renderItem={item => (
              <Item
                actions={[
                  <Button type="primary" onClick={() => this.handleEditItem(item)}>
                    Editar
                  </Button>,
                  <Popconfirm
                    placement="topRight"
                    title="Deseja realmente excluir este item?"
                    onConfirm={() => this.handleDelete(item)}
                    okText="Sim, excluir"
                    cancelText="Não, cancelar"
                  >
                    <Button type="danger">Excluir</Button>,
                  </Popconfirm>,
                ]}
              >
                <Meta title={item.name} />
              </Item>
            )}
          />
        </Card>
        <Manager {...props} />
      </Fragment>
    );
  }
}

export default connect(({ states }) => ({ states }))(Index);

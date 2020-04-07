import React, { Component, Fragment } from 'react';
import { Card, List, Button, Popconfirm, Form, Input, Row, Col, Radio, Icon } from 'antd';
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
    drawerTitle: 'Novo Cadastro',
    current: {},
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

      this.setState({ visible: false });
    });
  };

  handleShowDrawer = () => {
    this.setState({ current: {}, visible: true, drawerTitle: 'Cadastrar' });
  };

  handleCancelDrawer = () => {
    this.setState({ current: {}, visible: false });
  };

  handleEditItem = item => {
    this.setState({ current: item, visible: true, drawerTitle: 'Editar ' });
  };

  handleDelete = current => {
    const { dispatch } = this.props;
    dispatch({
      type: 'categories/categoriesDelete',
      payload: current,
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      categories: {
        dados: { pagination, list },
      },
    } = this.props;

    const { visible, drawerTitle, current } = this.state;
    const props = {
      visible,
      drawerTitle,
      current,
      getFieldDecorator,
      handleCancelDrawer: this.handleCancelDrawer,
      handleSubmit: this.handleSubmit,
    };

    return (
      <Fragment>
        <Card
          title={
            <Button type="primary" icon="plus" onClick={this.handleShowDrawer}>
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
                    title="Deseja realmente Excluir?"
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

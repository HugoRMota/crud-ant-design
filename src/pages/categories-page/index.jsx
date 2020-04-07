import React, { Component, Fragment } from 'react';
import { Card, List, Button, Popconfirm, Form } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-BR');

const { Item } = List;
const { Meta } = Item;

@Form.create()
class Index extends Component {
  state = {
    visible: false,
    current: {},
  };

  componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;
    dispatch({ type: 'categories/listCategorias', payload: {} });
    // dispatch({ type: 'categories/showCategoria', payload: {id:params.id} });
  }

  handleShowModal = () => {
    this.setState({ current: {}, visible: true, drawerTitle: 'Cadastrar' });
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

    const { current } = this.state;
    const props = {
      current,
      getFieldDecorator,
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
                aciton={[
                  <Button
                    type="primary"
                    onClick={() => router.push(`/categories-page/edit/${item.id}`)}
                  >
                    Editar
                  </Button>,
                  <Popconfirm
                    placement="topRight"
                    title="Deseja realmente exclui?"
                    onConfirm={() => this.handleDelete}
                    okText="Sim, excluir"
                    cancelText="Não, cancelar"
                  >
                    ,<Button type="danger"> Excluir</Button>
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
      </Fragment>
    );
  }
}

export default connect(({ categories }) => ({ categories }))(Index);

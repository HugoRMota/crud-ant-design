import React, { Component, Fragment } from 'react';
import { Card, List, Button, Popconfirm, Form } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import 'moment/locale/pt-br';
import { router } from 'umi';
import { createAction } from '@/utils/helpers';

moment.locale('pt-BR');

const { Item } = List;
const { Meta } = Item;

@Form.create()
class Index extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(createAction('categories/listCategorias')());
  }

  handleShowPage = () => {
    const { dispatch } = this.props;
    dispatch(createAction('categories/updateState')({ current: {} }));
    router.push(`/categories-page/edit`);
  };

  handleEditPage = item => {
    const { dispatch } = this.props;
    dispatch(createAction('categories/updateState')({ current: item }));

    router.push(`/categories-page/edit/${item.id}`);
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'categories/categoriesDelete',
      payload: id,
    });
  };

  render() {
    const {
      categories: {
        dados: { pagination, list },
      },
    } = this.props;

    return (
      <Fragment>
        <Card
          title={
            <Button type="primary" icon="plus" onClick={this.handleShowPage}>
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
                  <Button type="primary" onClick={() => this.handleEditPage(item)}>
                    Editar
                  </Button>,
                  <Popconfirm
                    placement="topRight"
                    title="Deseja realmente exclui?"
                    onConfirm={() => this.handleDelete(item)}
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

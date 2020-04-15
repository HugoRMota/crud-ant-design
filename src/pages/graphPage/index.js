import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  List,
  Card,
  notification,
  Button,
  Popconfirm,
  Form,
  Radio,
  Col,
  Input,
  Row,
  Icon,
} from 'antd';
import { connect } from 'dva';

import Manager from '@/pages/graphPage/manager';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const queryList = gql`
  query allStates($currentPage: Int, $pageSize: Int, $name: String) {
    allStates(currentPage: $currentPage, pageSize: $pageSize, name: $name) {
      lastPage
      total
      page
      perPage
      data {
        id
        name
      }
    }
  }
`;
@Form.create()
class Index extends Component {
  state = {
    searchType: 'name',
    searchValue: '',
    visible: false,
    modalTitle: 'Novo Cadastro',
    current: {},

    filters: [
      {
        name: 'name',
        label: 'Nome',
        type: 'text',
      },
    ],
  };

  handleShowModal = () => {
    this.setState({ current: {}, visible: true, modalTitle: 'Novo Cadastro' });
  };

  handleCancelModal = () => {
    this.setState({ current: {}, visible: false });
  };

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
        dispatch({
          type: 'graphql/put',
          payload,
        });
      } else {
        dispatch({
          type: 'graphql/post',
          payload,
        });
        console.log(dispatch);
      }
      this.setState({ visible: false });
    });
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'graphql/delete',
      payload: id,
    });
  };

  handleEditItem = item => {
    this.setState({ current: item, visible: true, modalTitle: 'Editar Cadastro' });
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

  resetSearch = () => {
    this.setState({ searchValue: '' });
  };

  changeSearchValue = e => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const {
      form: { getFieldDecorator },
      // graphql: {
      //   data: { list },
      // },
    } = this.props;

    const { searchType, searchValue, visible, modalTitle, current } = this.state;

    const props = {
      visible,
      modalTitle,
      current,
      getFieldDecorator,
      handleCancelModal: this.handleCancelModal,
      handleSubmit: this.handleSubmit,
    };

    return (
      <div>
        <Query
          query={queryList}
          variables={{ [searchType]: searchValue, currentPage: 1, pageSize: 20 }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (error) {
              notification.error({ message: 'Não foi possível buscar os dados' });
            }

            const dataTable = {
              list: [],
              pagination: {
                current: 1,
                pageSize: 20,
                total: 0,
              },
            };

            if (data) {
              dataTable.list = data.allStates.data;
              dataTable.pagination = {
                current: data.allStates.page,
                pageSize: data.allStates.perPage,
                total: data.allStates.total,
              };
            }

            return (
              <Fragment>
                <Card
                  title={
                    <Button type="primary" icon="pluis" onClick={this.handleShowModal}>
                      Novo
                    </Button>
                  }
                  extra={this.handleSearch()}
                >
                  <List
                    rowKey="id"
                    dataSource={dataTable.list}
                    loading={loading}
                    pagination={{
                      onChange: pageNumber =>
                        fetchMore({
                          variables: { currentPage: pageNumber, [searchType]: searchValue },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              allStates: {
                                ...prev.allStates,
                                ...fetchMoreResult.allStates,
                              },
                            });
                          },
                        }),
                      ...dataTable.pagination,
                    }}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Button type="primary" onClick={() => this.handleEditItem(item)}>
                            Editar
                          </Button>,
                          <Popconfirm
                            placement="topRight"
                            title="Deseja realmente excluir este item?"
                            onConfirm={() => this.handleDelete(item.id)}
                            okText="Sim, excluir"
                            cancelText="Não, cancelar"
                          >
                            <Button type="danger">Excluir</Button>,
                          </Popconfirm>,
                        ]}
                      >
                        <List.Item.Meta title="Nome" description={item.name} />
                      </List.Item>
                    )}
                  />
                </Card>
                <Manager {...props} />
              </Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default connect(({ graphql }) => ({ graphql }))(Index);

import React, { Component, Fragment } from 'react';
import { Card, Button, Col, Row, Form, InputNumber, Input } from 'antd';
import { connect, router } from 'dva';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-BR');

@Form.create()
class Index extends Component {
  state = {
    viewTitle: 'Novo Cadastro',
  };

  componentDidMount() {
    const {
      dispatch,
      match: { params },
      categories: { current },
    } = this.props;
    if (current.id) {
      dispatch({ type: 'categories/showCategories', payload: { id: params.id } });
    }
  }

  handleSubmit = () => {
    const {
      form: { validateFields },
      dispatch,
      categories: { current },
    } = this.props;

    validateFields((error, fieldsValue) => {
      console.log(fieldsValue);

      if (error) return;

      const payload = fieldsValue;

      if (current.id) {
        payload.id = current.id;
        dispatch({ type: 'categories/categoriesPut', payload });
      } else {
        dispatch({ type: 'categories/categoriesPost', payload });
      }
    });
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'categories/categoriesDelete',
      payload: id,
    });
    console.log(id);
  };

  render() {
    const {
      form: { getFieldDecorator },
      categories: { current },
    } = this.props;

    const { viewTitle } = this.state;

    return (
      <Fragment>
        <Card
          title={viewTitle}
          actions={[
            <Button type="primary" onClick={this.handleSubmit}>
              Salvar
            </Button>,
            <Button type="default">Cancelar</Button>,
          ]}
        >
          <Form>
            <Row>
              <Col>
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                    initialValue: current.name || '',
                    rules: [
                      {
                        required: true,
                        message: 'Campo obrigatorio',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Price">
                  {getFieldDecorator('price', {
                    initialValue: current.price || '',
                    rules: [{ required: true, message: 'Campo obrigatorio' }],
                  })(
                    <InputNumber
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Cycle Time">
                  {getFieldDecorator('cycle_time', {
                    initialValue: current.cycle_time || '',
                    rules: [{ required: true, message: 'Campo Obrigatorio' }],
                  })(<InputNumber />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Reserve Time">
                  {getFieldDecorator('reserve_time', {
                    initialValue: current.reserve_time || '',
                    rules: [{ required: true, message: 'Campo Obrigatorio' }],
                  })(<InputNumber />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Fragment>
    );
  }
}

export default connect(({ categories }) => ({ categories }))(Index);

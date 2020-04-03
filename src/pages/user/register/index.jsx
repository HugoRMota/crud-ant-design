import React, { Component } from 'react';
import { Form, Icon, Input, Button, Card, notification } from 'antd';
import { connect } from 'dva';
import styles from './style.less';
import 'moment/locale/pt-br';

@connect(({ register }) => ({ register }))
@Form.create()
export default class Register extends Component {
  handleSubmit = f => {
    f.preventDefault();

    const {
      form: { validateFields },
      dispatch,
    } = this.props;

    validateFields((error, value) => {
      if (error) return;
      const payload = value;

      if (payload.password !== payload.confirm) {
        notification.warning({ message: 'Senha diferem' });
        return;
      }
      dispatch({
        type: 'register/registerUsers',
        payload,
      });
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form className={styles.cadastro} onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Insira seu nome.' }],
          })(
            <Input placeholder="Nome" prefix={<Icon type="user" style={{ color: '#ff6700' }} />} />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Insira seu e-Mail', type: 'email' }],
          })(
            <Input
              placeholder="E-mail"
              prefix={<Icon type="mail" style={{ color: '#ff6700' }} />}
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Insira sua senha' }],
          })(
            <Input.Password
              placeholder="Senha"
              prefix={<Icon type="lock" style={{ color: '#ff6700' }} />}
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: 'Insira senha novamente' }],
          })(
            <Input.Password
              placeholder="Confirme sua senha"
              prefix={<Icon type="lock" style={{ color: '#ff6700' }} />}
            />,
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Cadastrar
        </Button>
      </Form>
    );
  }
}

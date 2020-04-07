import React from 'react';
import { Drawer, Form, Button, Input, InputNumber, Row, Col } from 'antd';

import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-BR');

const Manager = ({
  visible,
  drawerTitle,
  current,
  getFieldDecorator,
  handleCancelDrawer,
  handleSubmit,
}) => (
  <Drawer
    width={420}
    bodyStyle={{ paddingBottom: 80 }}
    destroyOnClose
    visible={visible}
    onClose={handleCancelDrawer}
    title={drawerTitle}
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

    <div
      style={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
      }}
    >
      <Button onClick={handleCancelDrawer} style={{ marginRight: 8 }}>
        Cancelar
      </Button>
      <Button onClick={handleSubmit} type="primary">
        {drawerTitle}
      </Button>
    </div>
  </Drawer>
);

export default Manager;

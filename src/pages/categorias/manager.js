import React from 'react';
import { Modal, Form, Input, InputNumber, Row, Col, DatePicker, TimePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';

import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-BR');

const Manager = ({
  visible,
  modalTitle,
  current,
  getFieldDecorator,
  handleCancelModal,
  handleSubmit,
  handleOnChange,
}) => (
  <Modal
    destroyOnClose
    visible={visible}
    onCancel={handleCancelModal}
    onOk={handleSubmit}
    title={modalTitle}
    okText="Salvar"
  >
    <Form>
      <Row gutter={12}>
        <Col span={24}>
          <Form.Item label="Nome">
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

          {/* 
          
          Manipulação de hora
          
          <Form.Item label="Cycle Time">
            {getFieldDecorator('cycle_time', {
              valuePropName: 'cycle',
              rules: [
                {
                  required: true,
                  message: 'Campo obrigatorio',
                },
              ],
            })(
              <DatePicker
                onChange={(value, date) => handleOnChange(date, 'cycle_time')}
                // onChange={(date, dateString) => console.log(dateString)}
                defaultValue={current && current.cycle_time ? moment(current.cycle_time) : null}
                format="DD/MM/YYYY"
              />,
            )}
          </Form.Item> */}
        </Col>
        <Col span={8}>
          <Form.Item label="Reserve Time">
            {getFieldDecorator('reserve_time', {
              initialValue: current.reserve_time || '',
              rules: [{ required: true, message: 'Campo Obrigatorio' }],
            })(<InputNumber />)}
          </Form.Item>

          {/*
          
          // Manipulaçao  de data e hora

          <Form.Item label="Reserve time">
            {getFieldDecorator('reserve_time', {
              valuePropName: 'time',
              rules: [
                {
                  required: true,
                  message: 'Campo obrigatorio',
                },
              ],
            })(
              <TimePicker
                // onChange={(time, timeString) => console.log(timeString)}
                onChange={(value, time) => handleOnChange(time, 'reserve_time')}
                defaultValue={current && current.reserve_time ? moment(current.reserve_time) : null}
                format="HH:mm"
              />,
            )}
          </Form.Item> */}
        </Col>
      </Row>
    </Form>
  </Modal>
);

export default Manager;

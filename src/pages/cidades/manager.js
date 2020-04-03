import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;

const Manager = ({
  visible,
  modalTitle,
  current,
  getFieldDecorator,
  handleCancelModal,
  handleSubmit,
  handleOnChange,
  currentValue,
  dispatch,
  states: {
    dados: { list },
  },
}) => {
  useEffect(() => {
    dispatch({ type: 'states/listarEstados', payload: {} });
  }, []);

  const listarEstados = () =>
    list.map(item => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));

  return (
    <Modal
      visible={visible}
      onCancel={handleCancelModal}
      onOk={handleSubmit}
      title={modalTitle}
      forceRender
      destroyOnClose
    >
      <Form>
        <Form.Item label="Nome">
          {getFieldDecorator('name', {
            initialValue: current.name || '',
            rules: [
              {
                required: true,
                message: 'Campo obrigatorio',
              },
            ],
          })(<Input onChange={e => handleOnChange(e.target.value, 'name')} />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('state_id', {
            initialValue: current.state_id || '',
            valuePropName: 'estado',
            rules: [
              {
                required: true,
                message: 'Campo obrigatorio',
              },
            ],
          })(
            <Select
              onChange={value => handleOnChange(value, 'state_id')}
              value={currentValue('state_id')}
            >
              {listarEstados()}
            </Select>,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ states }) => ({ states }))(Manager);

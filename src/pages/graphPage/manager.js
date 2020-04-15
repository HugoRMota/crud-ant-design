import React from 'react';
import { Modal, Form, Input } from 'antd';

const Manager = ({
  visible,
  modalTitle,
  current,
  getFieldDecorator,
  handleCancelModal,
  handleSubmit,
}) => (
  <Modal
    destroyOnClose
    visible={visible}
    onCancel={handleCancelModal}
    onOk={handleSubmit}
    title={modalTitle}
  >
    <Form>
      <Form.Item label="Nome">
        {getFieldDecorator('name', {
          initialValue: current.name || '',
          rules: [
            {
              required: true,
              message: 'Campo obrigatório',
            },
          ],
        })(<Input />)}
      </Form.Item>
    </Form>
  </Modal>
);

export default Manager;

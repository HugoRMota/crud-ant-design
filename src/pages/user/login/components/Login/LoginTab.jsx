import React, { Component } from 'react';
import { Form } from 'antd';
import LoginContext from './LoginContext';

const { TabPane } = Form;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

class Login extends Component {
  uniqueId = '';

  constructor(props) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }

  componentDidMount() {
    const { tabUtil } = this.props;

    if (tabUtil) {
      tabUtil.addTab(this.uniqueId);
    }
  }

  render() {
    const { children } = this.props;
    return <TabPane {...this.props}>{children}</TabPane>;
  }
}

const WrapContext = props => (
  <LoginContext.Consumer>
    {value => <Form.Item tabUtil={value.tabUtil} {...props} />}
  </LoginContext.Consumer>
); // 标志位 用来判断是不是自定义组件

WrapContext.typeName = 'Login';
export default WrapContext;

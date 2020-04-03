import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Layout } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'umi';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';

const { Footer } = Layout;
const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    formatMessage,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img
                  alt="logo"
                  className={styles.logo}
                  src="https://www.tecnovix.com.br/wp-content/uploads/2018/08/logo-tecnovix-desenvolvimento-web-1.svg"
                />
                {/* <span className={styles.title}>Ant Design</span> */}
              </Link>
            </div>
            <div className={styles.desc}>Projeto Estudos</div>
          </div>
          {children}
        </div>
        <Footer className={styles.footerlog}>
          © 2020 Tecnovix Soluções Inteligentes. Todos direitos reservados.
        </Footer>
      </div>
    </>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useNotificacoesNaoLidas } from '../../hooks/useNotificacoesNaoLidas';
import styles from './Layout.module.css';

function Layout() {
  const quantidadeNaoLidas = useNotificacoesNaoLidas();

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.areaPrincipal}>
        <Topbar quantidadeNaoLidas={quantidadeNaoLidas} />

        <main className={styles.conteudo}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;

import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const ITENS_MENU = [
  { rota: '/', rotulo: 'Painel' },
  { rota: '/compromissos', rotulo: 'Consultas' },
  { rota: '/notificacoes', rotulo: 'Notificações' },
];

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoIcone}>+</span>
        <span className={styles.logoTexto}>Hospital</span>
      </div>

      <nav className={styles.menu}>
        {ITENS_MENU.map((item) => (
          <NavLink
            key={item.rota}
            to={item.rota}
            end={item.rota === '/'}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.linkAtivo}` : styles.link
            }
          >
            {item.rotulo}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

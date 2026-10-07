import { useAuth } from '../../context/AuthContext';
import NotificationBell from '../NotificationBell/NotificationBell';
import Button from '../Button/Button';
import styles from './Topbar.module.css';

const ROTULO_POR_ROLE = {
  ADMIN: 'Administrador(a)',
  MEDICO: 'Médico(a)',
  PACIENTE: 'Paciente',
};

function Topbar({ quantidadeNaoLidas = 0 }) {
  const { usuario, sair } = useAuth();

  return (
    <header className={styles.topbar}>
      <div>
        <h2 className={styles.saudacao}>Olá, {usuario?.username}</h2>
        <span className={styles.papel}>{ROTULO_POR_ROLE[usuario?.role] ?? usuario?.role}</span>
      </div>

      <div className={styles.acoes}>
        <NotificationBell quantidadeNaoLidas={quantidadeNaoLidas} />
        <Button variante="secundaria" onClick={sair}>
          Sair
        </Button>
      </div>
    </header>
  );
}

export default Topbar;

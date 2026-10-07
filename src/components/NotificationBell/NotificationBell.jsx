import { Link } from 'react-router-dom';
import styles from './NotificationBell.module.css';

function NotificationBell({ quantidadeNaoLidas = 0 }) {
  return (
    <Link to="/notificacoes" className={styles.sino} aria-label="Ver notificações">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>

      {quantidadeNaoLidas > 0 && (
        <span className={styles.contador}>{quantidadeNaoLidas}</span>
      )}
    </Link>
  );
}

export default NotificationBell;

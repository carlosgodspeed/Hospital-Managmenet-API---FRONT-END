import styles from './Badge.module.css';

const CORES_POR_STATUS = {
  AGENDADO: 'atencao',
  CONFIRMADO: 'sucesso',
  CANCELADO: 'erro',
};

function Badge({ texto }) {
  const variante = CORES_POR_STATUS[texto] || 'neutro';

  return <span className={`${styles.badge} ${styles[variante]}`}>{texto}</span>;
}

export default Badge;

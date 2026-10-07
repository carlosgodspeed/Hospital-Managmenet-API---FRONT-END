import styles from './Button.module.css';

function Button({ variante = 'primaria', children, ...resto }) {
  const classeVariante = styles[variante] || styles.primaria;

  return (
    <button className={`${styles.botao} ${classeVariante}`} {...resto}>
      {children}
    </button>
  );
}

export default Button;

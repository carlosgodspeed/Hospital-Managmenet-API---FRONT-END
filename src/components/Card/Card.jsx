import styles from './Card.module.css';

function Card({ destaque, children, className = '' }) {
  const classeDestaque = destaque ? styles[`destaque-${destaque}`] : '';

  return (
    <div className={`${styles.card} ${classeDestaque} ${className}`}>
      {children}
    </div>
  );
}

export default Card;

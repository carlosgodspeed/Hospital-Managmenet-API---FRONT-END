import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import styles from './Login.module.css';

function Login() {
  const { entrar } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function lidarComEnvio(evento) {
    evento.preventDefault();
    setMensagemErro('');
    setCarregando(true);

    try {
      await entrar(username, password);
      navigate('/');
    } catch (erro) {
      setMensagemErro('Usuário ou senha incorretos.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.cartaoLogin}>
        <div className={styles.cabecalho}>
          <span className={styles.icone}>+</span>
          <h1 className={styles.titulo}>Hospital Management</h1>
          <p className={styles.subtitulo}>Entre com sua conta para continuar</p>
        </div>

        <form onSubmit={lidarComEnvio} className={styles.formulario}>
          <label className={styles.campo}>
            <span>Usuário</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </label>

          <label className={styles.campo}>
            <span>Senha</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {mensagemErro && <p className={styles.erro}>{mensagemErro}</p>}

          <Button type="submit" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;

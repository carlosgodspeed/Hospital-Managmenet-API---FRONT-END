import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { descobrirIdDoPerfil } from '../../api/perfil';
import {
  listarNotificacoesPaciente,
  listarNotificacoesMedico,
  marcarComoLida,
} from '../../api/notificacoes';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import styles from './Notificacoes.module.css';

function Notificacoes() {
  const { usuario } = useAuth();
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [semPerfilEncontrado, setSemPerfilEncontrado] = useState(false);

  async function carregar() {
    if (usuario.role === 'ADMIN') {
      setCarregando(false);
      return;
    }

    setCarregando(true);
    const idDoPerfil = await descobrirIdDoPerfil(usuario.id, usuario.role);

    if (!idDoPerfil) {
      setSemPerfilEncontrado(true);
      setCarregando(false);
      return;
    }

    const lista =
      usuario.role === 'PACIENTE'
        ? await listarNotificacoesPaciente(idDoPerfil)
        : await listarNotificacoesMedico(idDoPerfil);

    setNotificacoes(lista);
    setCarregando(false);
  }

  useEffect(() => {
    carregar();
  }, [usuario]);

  async function lidarComMarcarLida(id) {
    await marcarComoLida(id);
    carregar();
  }

  if (usuario.role === 'ADMIN') {
    return (
      <div>
        <h1>Notificações</h1>
        <Card>
          <p className={styles.vazio}>
            Notificações são sempre destinadas a um Paciente ou a um Médico — o perfil ADMIN não
            recebe notificações próprias.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h1>Notificações</h1>

      {carregando && <p>Carregando...</p>}

      {semPerfilEncontrado && !carregando && (
        <Card destaque="atencao">
          <p className={styles.vazio}>
            Ainda não encontramos nenhum registro vinculado à sua conta (isso acontece se você
            ainda não tem nenhuma consulta). Assim que tiver uma consulta, as notificações
            aparecerão aqui.
          </p>
        </Card>
      )}

      {!carregando && !semPerfilEncontrado && notificacoes.length === 0 && (
        <Card>
          <p className={styles.vazio}>Nenhuma notificação por aqui.</p>
        </Card>
      )}

      <div className={styles.lista}>
        {notificacoes.map((notificacao) => (
          <Card
            key={notificacao.id}
            destaque={notificacao.lida ? undefined : 'atencao'}
            className={styles.itemNotificacao}
          >
            <div className={styles.linha}>
              <div>
                <p className={styles.mensagem}>{notificacao.mensagem}</p>
                <span className={styles.data}>
                  {new Date(notificacao.dataHora).toLocaleString('pt-BR')}
                </span>
              </div>

              {!notificacao.lida && (
                <Button variante="secundaria" onClick={() => lidarComMarcarLida(notificacao.id)}>
                  Marcar como lida
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Notificacoes;

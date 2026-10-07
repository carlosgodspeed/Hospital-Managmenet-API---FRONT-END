import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { listarCompromissos, atualizarStatus } from '../../api/compromissos';
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import NovoCompromissoForm from './NovoCompromissoForm';
import styles from './Compromissos.module.css';

function pertenceAoUsuario(compromisso, usuario) {
  if (usuario.role === 'PACIENTE') {
    return compromisso.paciente?.usuario?.id === usuario.id;
  }
  if (usuario.role === 'MEDICO') {
    return compromisso.medico?.usuario?.id === usuario.id;
  }
  return true;
}

function Compromissos() {
  const { usuario } = useAuth();
  const [compromissos, setCompromissos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [atualizandoId, setAtualizandoId] = useState(null);

  const podeCriar = usuario.role === 'PACIENTE' || usuario.role === 'ADMIN';
  const podeAlterarStatus = usuario.role === 'MEDICO' || usuario.role === 'ADMIN';

  function carregar() {
    setCarregando(true);
    listarCompromissos()
      .then((todos) => {
        const dosUsuario = todos.filter((c) => pertenceAoUsuario(c, usuario));
        const ordenados = [...dosUsuario].sort((a, b) =>
          `${b.data}${b.hora}`.localeCompare(`${a.data}${a.hora}`)
        );
        setCompromissos(ordenados);
      })
      .finally(() => setCarregando(false));
  }

  useEffect(carregar, [usuario]);

  async function mudarStatus(id, novoStatus) {
    setAtualizandoId(id);
    try {
      await atualizarStatus(id, novoStatus);
      carregar();
    } catch (erro) {
      alert(erro.response?.data?.mensagem || 'Não foi possível atualizar o status.');
    } finally {
      setAtualizandoId(null);
    }
  }

  return (
    <div>
      <div className={styles.cabecalhoPagina}>
        <h1>Consultas</h1>
        {podeCriar && !mostrarFormulario && (
          <Button onClick={() => setMostrarFormulario(true)}>+ Nova consulta</Button>
        )}
      </div>

      {mostrarFormulario && (
        <NovoCompromissoForm
          aoCriar={() => {
            setMostrarFormulario(false);
            carregar();
          }}
          aoCancelar={() => setMostrarFormulario(false)}
        />
      )}

      {carregando && <p>Carregando...</p>}

      {!carregando && compromissos.length === 0 && (
        <Card>
          <p className={styles.vazio}>Nenhuma consulta encontrada.</p>
        </Card>
      )}

      <div className={styles.lista}>
        {compromissos.map((compromisso) => (
          <Card key={compromisso.id}>
            <div className={styles.linhaConsulta}>
              <div>
                <strong>
                  {compromisso.data} às {compromisso.hora}
                </strong>
                <p className={styles.detalheConsulta}>
                  {compromisso.paciente?.nome ?? '—'} · Dr(a). {compromisso.medico?.nome ?? '—'}
                </p>
              </div>

              <div className={styles.direita}>
                <Badge texto={compromisso.status} />

                {podeAlterarStatus && compromisso.status !== 'CONFIRMADO' && (
                  <Button
                    variante="secundaria"
                    disabled={atualizandoId === compromisso.id}
                    onClick={() => mudarStatus(compromisso.id, 'CONFIRMADO')}
                  >
                    Confirmar
                  </Button>
                )}

                {podeAlterarStatus && compromisso.status !== 'CANCELADO' && (
                  <Button
                    variante="perigo"
                    disabled={atualizandoId === compromisso.id}
                    onClick={() => mudarStatus(compromisso.id, 'CANCELADO')}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Compromissos;

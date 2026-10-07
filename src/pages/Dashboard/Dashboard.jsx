import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { listarCompromissos } from '../../api/compromissos';
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import styles from './Dashboard.module.css';

function pertenceAoUsuario(compromisso, usuario) {
  if (usuario.role === 'PACIENTE') {
    return compromisso.paciente?.usuario?.id === usuario.id;
  }
  if (usuario.role === 'MEDICO') {
    return compromisso.medico?.usuario?.id === usuario.id;
  }
  return true; 
}

function Dashboard() {
  const { usuario } = useAuth();
  const [compromissos, setCompromissos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    listarCompromissos()
      .then((todos) => {
        const dosUsuario = todos.filter((c) => pertenceAoUsuario(c, usuario));
        setCompromissos(dosUsuario);
      })
      .finally(() => setCarregando(false));
  }, [usuario]);

  const corDestaque =
    usuario.role === 'PACIENTE' ? 'paciente' : usuario.role === 'MEDICO' ? 'medico' : 'admin';

  const totalAgendados = compromissos.filter((c) => c.status === 'AGENDADO').length;
  const totalConfirmados = compromissos.filter((c) => c.status === 'CONFIRMADO').length;
  const proximos = [...compromissos]
    .sort((a, b) => `${a.data}${a.hora}`.localeCompare(`${b.data}${b.hora}`))
    .slice(0, 5);

  return (
    <div>
      <h1>Painel</h1>
      <p className={styles.introducao}>
        {usuario.role === 'ADMIN'
          ? 'Visão geral de todas as consultas do sistema.'
          : 'Aqui está um resumo das suas consultas.'}
      </p>

      <div className={styles.resumo}>
        <Card destaque={corDestaque}>
          <span className={styles.numero}>{compromissos.length}</span>
          <span className={styles.rotulo}>Total de consultas</span>
        </Card>
        <Card destaque="atencao">
          <span className={styles.numero}>{totalAgendados}</span>
          <span className={styles.rotulo}>Agendadas</span>
        </Card>
        <Card destaque="sucesso">
          <span className={styles.numero}>{totalConfirmados}</span>
          <span className={styles.rotulo}>Confirmadas</span>
        </Card>
      </div>

      <h2 className={styles.tituloSecao}>Próximas consultas</h2>

      {carregando && <p>Carregando...</p>}

      {!carregando && proximos.length === 0 && (
        <Card>
          <p className={styles.vazio}>Nenhuma consulta encontrada.</p>
        </Card>
      )}

      <div className={styles.lista}>
        {proximos.map((compromisso) => (
          <Card key={compromisso.id} destaque={corDestaque}>
            <div className={styles.linhaConsulta}>
              <div>
                <strong>
                  {compromisso.data} às {compromisso.hora}
                </strong>
                <p className={styles.detalheConsulta}>
                  {usuario.role === 'PACIENTE' && `Com Dr(a). ${compromisso.medico?.nome ?? '—'}`}
                  {usuario.role === 'MEDICO' && `Paciente: ${compromisso.paciente?.nome ?? '—'}`}
                  {usuario.role === 'ADMIN' &&
                    `${compromisso.paciente?.nome ?? '—'} com Dr(a). ${compromisso.medico?.nome ?? '—'}`}
                </p>
              </div>
              <Badge texto={compromisso.status} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

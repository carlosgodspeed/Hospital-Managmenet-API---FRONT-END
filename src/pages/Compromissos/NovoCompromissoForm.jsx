import { useEffect, useState } from 'react';
import { listarMedicos } from '../../api/medicos';
import { criarCompromisso } from '../../api/compromissos';
import { descobrirIdDoPerfil } from '../../api/perfil';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import styles from './Compromissos.module.css';

function NovoCompromissoForm({ aoCriar, aoCancelar }) {
  const { usuario } = useAuth();
  const [medicos, setMedicos] = useState([]);
  const [medicoId, setMedicoId] = useState('');
  const [pacienteId, setPacienteId] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    listarMedicos().then(setMedicos);
  }, []);

  async function lidarComEnvio(evento) {
    evento.preventDefault();
    setMensagemErro('');
    setEnviando(true);

    try {
      let idDoPaciente = pacienteId;

      if (usuario.role === 'PACIENTE') {
        idDoPaciente = await descobrirIdDoPerfil(usuario.id, 'PACIENTE');
      }

      if (!idDoPaciente) {
        setMensagemErro('Não foi possível identificar o paciente.');
        return;
      }

      await criarCompromisso({
        pacienteId: idDoPaciente,
        medicoId,
        data,
        hora,
      });

      aoCriar();
    } catch (erro) {
      const mensagemDoServidor = erro.response?.data?.mensagem;
      setMensagemErro(mensagemDoServidor || 'Não foi possível agendar a consulta.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Card className={styles.formularioCard}>
      <h3>Nova consulta</h3>

      <form onSubmit={lidarComEnvio} className={styles.formulario}>
        {usuario.role === 'ADMIN' && (
          <label className={styles.campo}>
            <span>ID do paciente</span>
            <input
              type="number"
              value={pacienteId}
              onChange={(e) => setPacienteId(e.target.value)}
              required
            />
          </label>
        )}

        <label className={styles.campo}>
          <span>Médico</span>
          <select value={medicoId} onChange={(e) => setMedicoId(e.target.value)} required>
            <option value="" disabled>
              Selecione um médico
            </option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.nome} — {medico.especialidade}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.campo}>
          <span>Data</span>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
        </label>

        <label className={styles.campo}>
          <span>Horário</span>
          <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
        </label>

        {mensagemErro && <p className={styles.erro}>{mensagemErro}</p>}

        <div className={styles.acoesFormulario}>
          <Button type="button" variante="secundaria" onClick={aoCancelar}>
            Cancelar
          </Button>
          <Button type="submit" disabled={enviando}>
            {enviando ? 'Agendando...' : 'Agendar consulta'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default NovoCompromissoForm;

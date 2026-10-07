import { listarCompromissos } from './compromissos';

export async function descobrirIdDoPerfil(usuarioId, role) {
  const compromissos = await listarCompromissos();

  for (const compromisso of compromissos) {
    if (role === 'PACIENTE' && compromisso.paciente?.usuario?.id === usuarioId) {
      return compromisso.paciente.id;
    }
    if (role === 'MEDICO' && compromisso.medico?.usuario?.id === usuarioId) {
      return compromisso.medico.id;
    }
  }

  return null;
}

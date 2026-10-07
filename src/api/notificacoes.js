import api from './axios';

export async function listarNotificacoesPaciente(pacienteId) {
  const resposta = await api.get(`/api/notificacoes/paciente/${pacienteId}`);
  return resposta.data;
}

export async function listarNotificacoesMedico(medicoId) {
  const resposta = await api.get(`/api/notificacoes/medico/${medicoId}`);
  return resposta.data;
}

export async function contarNaoLidasPaciente(pacienteId) {
  const resposta = await api.get(`/api/notificacoes/paciente/${pacienteId}/nao-lidas/count`);
  return resposta.data.naoLidas;
}

export async function contarNaoLidasMedico(medicoId) {
  const resposta = await api.get(`/api/notificacoes/medico/${medicoId}/nao-lidas/count`);
  return resposta.data.naoLidas;
}

export async function marcarComoLida(id) {
  const resposta = await api.put(`/api/notificacoes/${id}/lida`);
  return resposta.data;
}

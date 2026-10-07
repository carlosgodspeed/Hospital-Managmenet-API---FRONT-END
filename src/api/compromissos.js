import api from './axios';

export async function listarCompromissos() {
  const resposta = await api.get('/api/compromissos');
  return resposta.data;
}

export async function criarCompromisso({ pacienteId, medicoId, data, hora }) {
  const resposta = await api.post('/api/compromissos', {
    paciente: { id: pacienteId },
    medico: { id: medicoId },
    data,
    hora,
  });
  return resposta.data;
}

export async function atualizarStatus(id, status) {
  const resposta = await api.put(`/api/compromissos/${id}/status?status=${status}`);
  return resposta.data;
}

export async function remarcarCompromisso(id, novaData, novaHora) {
  const resposta = await api.put(
    `/api/compromissos/${id}/remarcar?data=${novaData}&hora=${novaHora}`
  );
  return resposta.data;
}

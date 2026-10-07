import api from './axios';

export async function listarMedicos() {
  const resposta = await api.get('/api/medicos');
  return resposta.data;
}

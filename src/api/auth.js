import api from './axios';

export async function login(username, password) {
  const resposta = await api.post('/api/auth/login', { username, password });
  return resposta.data; 
}

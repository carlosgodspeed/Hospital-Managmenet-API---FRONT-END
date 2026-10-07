import { createContext, useContext, useState } from 'react';
import { login as loginNaApi } from '../api/auth';

const AuthContext = createContext(null);

function usuarioSalvoNoNavegador() {
  const bruto = localStorage.getItem('usuario');
  return bruto ? JSON.parse(bruto) : null;
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(usuarioSalvoNoNavegador);

  async function entrar(username, password) {
    const dados = await loginNaApi(username, password);
    const usuarioLogado = {
      id: dados.id,
      username: dados.username,
      role: dados.role,
    };

    localStorage.setItem('token', dados.token);
    localStorage.setItem('usuario', JSON.stringify(usuarioLogado));
    setUsuario(usuarioLogado);

    return usuarioLogado;
  }

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  const valor = {
    usuario,
    estaLogado: Boolean(usuario),
    entrar,
    sair,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth precisa ser usado dentro de um <AuthProvider>');
  }
  return contexto;
}

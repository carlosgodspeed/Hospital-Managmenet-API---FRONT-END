import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { descobrirIdDoPerfil } from '../api/perfil';
import { contarNaoLidasPaciente, contarNaoLidasMedico } from '../api/notificacoes';

export function useNotificacoesNaoLidas() {
  const { usuario } = useAuth();
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      if (!usuario || usuario.role === 'ADMIN') {
        return;
      }

      const idDoPerfil = await descobrirIdDoPerfil(usuario.id, usuario.role);
      if (idDoPerfil === null || cancelado) {
        return;
      }

      const total =
        usuario.role === 'PACIENTE'
          ? await contarNaoLidasPaciente(idDoPerfil)
          : await contarNaoLidasMedico(idDoPerfil);

      if (!cancelado) {
        setQuantidade(total);
      }
    }

    carregar();

    return () => {
      cancelado = true;
    };
  }, [usuario]);

  return quantidade;
}

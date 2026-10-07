# 💻 Hospital Management — Front-end

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)

Front-end em React para o
[hospital-management-api](https://github.com/carlosgodspeed/hospital-management-api).
---

## Funcionalidades atuais

- **Login** com JWT, sessão guardada no `localStorage`
- **Dashboard** com resumo de consultas (contagens, próximas consultas)
- **Consultas:** listar, agendar (Paciente/Admin — por **ID numérico**, ver limitação abaixo), confirmar e cancelar (Médico/Admin apenas)
- **Notificações:** listar, marcar como lida, contador de não lidas no sino da barra superior

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. A API precisa estar rodando em
`http://localhost:8080` (configurado em `src/api/axios.js`), com CORS
liberado para `http://localhost:5173` (já configurado no back-end).

## Estrutura de pastas

```
src/
├─ api/            → uma função por chamada à API (axios)
├─ components/     → componentes reutilizáveis (Button, Card, Badge, Layout...)
├─ context/         → AuthContext: quem está logado, login/logout
├─ hooks/           → hooks customizados (ex: contagem de não lidas)
├─ pages/           → uma pasta por página (Login, Dashboard, Compromissos, Notificacoes)
├─ App.jsx          → define as rotas
├─ main.jsx         → ponto de entrada
└─ index.css        → tokens de design (cores, fontes, espaçamentos) + reset
```

## Design

**Paleta:** fundo verde-pálido suave, texto quase-preto esverdeado, verde-azulado
clínico como cor principal, âmbar para atenção/notificação, terracota escuro
para erro/cancelamento. Cada perfil (Paciente/Médico/Admin) tem uma cor de
destaque própria, usada como borda lateral nos cards — **mas hoje essa é a
única diferença visual entre os perfis** (ver limitações abaixo).

**Tipografia:** `Fraunces` (serifada) nos títulos + `IBM Plex Sans` no corpo.

---

## ⚠️ Limitações conhecidas (feedback de uso real)

- **Agendar consulta pede ID numérico "cru"**, tanto do médico (no caso do
  Admin) quanto do paciente — ruim de usar, ninguém decora IDs. Precisa virar
  uma busca por nome com sugestões.
- **A interface é essencialmente igual para os três perfis** — muda só a cor
  de destaque e um texto aqui e ali. Falta diversificar de verdade: menus,
  conteúdo e fluxos deveriam parecer feitos sob medida pra cada perfil.
- **Paciente não consegue cancelar a própria consulta** pela tela (o backend
  também não permite isso ainda — ver Readme do back-end).
- **Admin não tem UI para cadastrar médicos/pacientes** — a API já suporta
  (`POST /api/medicos`, `POST /api/pacientes`), só falta a tela.
- **Sem prontuário médico:** médico não tem como anexar fotos, laudos, exames,
  anotações, receitas ou remédios para o paciente ver.
- **Sem edição de perfil:** nenhum usuário pode adicionar foto, trocar
  telefone ou outros dados de contato pela interface.
- **`src/api/perfil.js`** é um workaround: como o login não devolve o id do
  Paciente/Medico (só o id do Usuario), o front-end "descobre" esse id
  vasculhando a lista de compromissos. Só funciona se o usuário já tiver pelo
  menos uma consulta. Resolve-se de vez com um endpoint `/api/me` no back-end.

---

## 🗺️ Roadmap — próxima sessão

### 1. Busca de paciente/médico com sugestões (autocomplete)
No formulário de nova consulta, trocar o campo de ID por um campo de texto
que sugere pessoas conforme o usuário digita (buscando em `/api/medicos` e
`/api/pacientes`, filtrando por nome no front-end ou, melhor, com um parâmetro
de busca no back-end).

### 2. Diversificar a experiência por perfil
Repensar o Dashboard, o menu lateral e os textos pra cada perfil ter uma
experiência própria, não só uma cor diferente — por exemplo: Paciente vê
"Minhas consultas" e atalho pra solicitar uma nova; Médico vê "Minha agenda
de hoje" e solicitações pendentes de aprovação; Admin vê métricas gerais do
sistema.

### 3. Paciente pode cancelar a própria consulta
Depende da liberação de permissão no back-end (ver Readme dele). Na tela,
adicionar o botão "Cancelar" também para o Paciente, restrito às próprias
consultas.

### 4. Fluxo de solicitação → aprovação
Paciente "solicita" um horário em vez de agendar direto; médico vê uma lista
de solicitações pendentes e aprova ou recusa cada uma. Depende do novo status
e endpoint no back-end.

### 5. Tela de administração (CRUD de médicos e pacientes)
Formulários para o Admin criar, editar, listar e excluir médicos e pacientes
pela interface — a API já suporta tudo isso, só falta a tela.

### 6. Prontuário médico
Tela para o médico anexar (upload) fotos, laudos, exames, anotações, receitas
e remédios vinculados a um paciente; e uma tela para o paciente visualizar
tudo isso que foi anexado para ele. Depende da nova entidade e dos endpoints
de upload no back-end.

### 7. Perfil personalizável
Tela de "Meu perfil" onde cada usuário adiciona uma foto e edita seus dados de
contato (telefone, e-mail). Depende de endpoints de atualização no back-end.

### 8. Itens menores (qualidade/polimento)
- Toasts de feedback em vez de `alert()` nativo
- Loading states com skeleton em vez de texto "Carregando..."
- Modo escuro (os tokens de cor já estão centralizados, facilita)
- Paginação/filtros na lista de consultas
- Variável de ambiente para a URL da API (hoje fixa em `axios.js`)
- Testes automatizados (Vitest + Testing Library)
- Acessibilidade: revisão de contraste, navegação por teclado, `aria-live`

---

## 📸 Capturas de tela

### Tela de Login

<img src="https://github.com/user-attachments/assets/3f2083aa-ee42-4781-847a-a853d76816f5" width="600"/>

### Dashboard (Admin)

<img src="https://github.com/user-attachments/assets/2a8ec3ff-5f00-4f13-ab88-65a96c8842d1" width="600" />

### Tela de Consultas

<img src="https://github.com/user-attachments/assets/4b2cd7ad-d342-4a66-b4db-2848fb4d860a" width="600" />

### Tela de Notificações

<img src="https://github.com/user-attachments/assets/30db8a25-4320-4950-be8a-d562974c6de5" width="600" />

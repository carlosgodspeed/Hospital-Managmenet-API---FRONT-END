# Hospital Management — Front-end

Front-end em React para o 
[hospital-management-api](../hospital-management-api)

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. A API precisa estar rodando em
`http://localhost:8080` (endereço configurado em `src/api/axios.js`).

## Organização das pastas

```text
hospital-frontend/
├── src/
│   ├── api/                # Configuração e chamadas da API
│   ├── assets/             # Ícones, imagens e outros recursos locais
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/              # Páginas da aplicação
│   ├── routes/             # Configuração de rotas
│   ├── services/           # Serviços e regras de negócio
│   ├── styles/             # Estilos globais e temas
│   └── App.jsx             # Componente principal
├── package.json            # Dependências e scripts do projeto
├── vite.config.js          # Configuração do Vite
└── README.md               # Documentação do projeto
```



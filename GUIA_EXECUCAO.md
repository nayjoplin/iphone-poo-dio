# Guia de Execução - GFT Starter #7 | meu bujo digital

## Requisitos

### Backend
- Java 17 ou superior
- Maven 3.6+

### Frontend
- Node.js 18+
- npm 9+
- Angular CLI 17

## Passo a Passo para Executar Localmente

### 1. Clonar o Repositório

```bash
git clone https://github.com/nayjoplin/iphone-poo-dio.git
cd iphone-poo-dio
```

### 2. Executar os Microserviços Backend

Abra 4 terminais diferentes e execute cada microserviço:

**Terminal 1 - Usuario Service (porta 8081)**
```bash
cd backend/usuario-service
mvn spring-boot:run
```

**Terminal 2 - Caderno Service (porta 8082)**
```bash
cd backend/caderno-service
mvn spring-boot:run
```

**Terminal 3 - Pomodoro Service (porta 8083)**
```bash
cd backend/pomodoro-service
mvn spring-boot:run
```

**Terminal 4 - Midia Service (porta 8084)**
```bash
cd backend/midia-service
mvn spring-boot:run
```

Aguarde todos os serviços iniciarem (verifique as mensagens "Started ...Application").

### 3. Executar o Frontend

Em um novo terminal:

```bash
cd frontend
npm install
npm start
```

Aguarde a compilação e acesse: **http://localhost:4200**

## Como Usar o Sistema

### 1. Criar Conta

- Acesse http://localhost:4200
- Clique em "Criar conta"
- Preencha nome, email e senha
- Você será redirecionado para o dashboard

### 2. Criar Seu Primeiro Caderno

- No dashboard, clique em "Cadernos"
- Clique no botão "+" no canto superior direito
- Preencha:
  - Título (ex: "Projeto Angular")
  - Tipo de projeto (ex: "Desafio 04")
  - Finalidade (ex: "Aprender Components")
  - Dificuldade (1-5)
  - Cor tema (escolha uma cor)
  - Linguagem/Framework
  - Descrição

### 3. Criar Folhas de Estudo

- Abra um caderno
- Clique no "+" para criar nova folha
- Preencha:
  - Título (ex: "Dia 01 - Setup")
  - Número da folha
  - Data do estudo
  - Tipo de seção (Setup, Sintaxe, Snippets, etc.)

### 4. Editar Folha

- Clique em uma folha para abrir o editor
- Escreva seu conteúdo no editor de texto
- Use os stickers no topo para marcar:
  - Task (checkbox azul)
  - Code (código azul claro)
  - Importante (exclamação rosa)
  - Dúvida (interrogação amarela)
  - Conquista (estrela verde)

### 5. Usar o Timer Pomodoro

- No editor de folha, clique no botão do relógio
- O timer de 25 minutos iniciará
- O tempo será registrado automaticamente
- Veja suas estatísticas no dashboard

### 6. Adicionar Fotos na Galeria

- Acesse "Galeria" no menu
- Clique em "Adicionar Foto"
- Limite: 3 fotos por dia
- Ideal para registrar código ou tela de conquistas

### 7. Adicionar Vídeos de Conquistas

- Na aba "Vídeos" da galeria
- Clique em "Adicionar Vídeo"
- Dê um título (sua conquista)
- Faça upload do vídeo
- Sem limite de uploads

## Funcionalidades Especiais

### Stickers Digitais

Os stickers aparecem no canto direito da folha e ajudam a identificar rapidamente:
- **Task** - Atividades a fazer
- **Code** - Código para testar
- **Importante** - Conceito fundamental
- **Dúvida** - Pergunta para resolver
- **Conquista** - Objetivo alcançado

### Sistema de Cores

Cada caderno pode ter sua própria cor tema:
- Roxo - Padrão
- Rosa - UI/UX
- Azul - Backend
- Verde - Aprovado/Completo
- Coral - Projetos pessoais
- Amarelo - JavaScript

### Tipos de Seções nas Folhas

- **Setup da Máquina** - Configuração de ambiente
- **Cheat Sheet de Sintaxe** - Guia rápido de comandos
- **Snippets** - Blocos de código reutilizáveis
- **Anatomia de Conceito** - Decomposição de temas
- **Bug Tracker** - Registro de erros e soluções
- **Log de Projetos** - Lista de mini-projetos

## Deploy para Produção

### Frontend no Vercel

```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

### Backend (opções)

**Railway:**
```bash
railway login
railway init
railway up
```

**Heroku:**
```bash
heroku login
heroku create gft-bujo-usuario-service
git push heroku main
```

## Solução de Problemas

### Backend não inicia

- Verifique se tem Java 17 instalado: `java -version`
- Verifique se as portas 8081-8084 estão livres
- Delete a pasta `target` e tente novamente

### Frontend não compila

- Delete `node_modules` e `package-lock.json`
- Execute `npm install` novamente
- Verifique se tem Node 18+: `node -v`

### Erro de CORS

- Certifique-se de que o frontend está rodando em `localhost:4200`
- Os microserviços já estão configurados para aceitar essa origem

### Fotos/Vídeos não fazem upload

- Verifique se a pasta `uploads/` foi criada automaticamente
- Verifique as permissões da pasta
- Limite de tamanho: 50MB por arquivo

## Próximos Passos

1. Explore todas as funcionalidades
2. Crie vários cadernos para diferentes tecnologias
3. Use o Pomodoro para rastrear seu tempo
4. Registre suas conquistas com fotos e vídeos
5. Exporte seu progresso (feature futura)

## Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Consulte a documentação no README.md

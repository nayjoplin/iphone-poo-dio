# GFT Starter #7 | meu bujo digital

Sistema completo de caderno de estudos digital com arquitetura de microserviços.

## Arquitetura

### Backend - 4 Microserviços em Java Spring Boot

1. **usuario-service** (porta 8081)
   - Autenticação e gerenciamento de usuários
   - JWT para segurança

2. **caderno-service** (porta 8082)
   - Gerenciamento de cadernos e folhas de estudo
   - Sistema de stickers e anotações
   - Palavras-chave e glossário

3. **pomodoro-service** (porta 8083)
   - Timer Pomodoro
   - Estatísticas de tempo de estudo
   - Registro de sessões

4. **midia-service** (porta 8084)
   - Upload de fotos (até 3 por dia)
   - Upload de vídeos
   - Galeria de conquistas

### Frontend - Angular 17

- Design minimalista e moderno
- Totalmente responsivo (mobile e desktop)
- Interface em português
- Sistema de stickers digitais
- Timer Pomodoro integrado

## Funcionalidades Principais

- Criação de cadernos por projeto/tecnologia
- Folhas de estudo com editor rico
- Sistema de símbolos e stickers
- Timer Pomodoro com estatísticas
- Galeria de fotos (code check)
- Galeria de vídeos (conquistas)
- Palavras-chave e glossário
- Rastreamento de dúvidas
- Snippets de código
- Notas de dificuldade

## Como Executar

### Backend

Cada microserviço pode ser executado independentemente:

```bash
cd backend/usuario-service
./mvnw spring-boot:run

cd backend/caderno-service
./mvnw spring-boot:run

cd backend/pomodoro-service
./mvnw spring-boot:run

cd backend/midia-service
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Acesse: http://localhost:4200

## Deploy

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

### Backend

Os microserviços podem ser deployados em:
- Railway
- Heroku
- AWS
- Google Cloud

## Tecnologias

### Backend
- Java 17
- Spring Boot 3.2.1
- Spring Security
- JWT
- H2 Database (dev)
- PostgreSQL (prod)
- Maven

### Frontend
- Angular 17
- TypeScript
- SCSS
- RxJS
- Standalone Components
- Signals

## Estrutura de Dados

### Caderno
- Título, tipo de projeto, finalidade
- Data de início/fim
- Nota de dificuldade (1-5)
- Cor tema e ícone
- Progresso percentual

### Folha
- Número da folha
- Data de estudo
- Conteúdo (markdown)
- Tipo de seção
- Stickers
- Dúvidas
- Snippets

### Sessão Pomodoro
- Duração em minutos
- Tipo de sessão
- Vinculada a caderno/folha
- Registro de completude

### Foto
- Limite de 3 por dia
- Legenda opcional
- Data de upload

### Vídeo
- Título e descrição
- Tipo de vitória
- Sem limite de uploads

## Layout e Design

- Paleta: Gradiente roxo (#667eea) a roxo escuro (#764ba2)
- Tipografia: Inter
- Ícones: Material Icons
- Cards com sombras suaves
- Animações sutis
- Design limpo e profissional

## Autor

Desenvolvido para o GFT Starter #7

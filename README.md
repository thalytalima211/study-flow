# StudyFlow

> Aplicação web para organização de estudos, desenvolvida com Vue.js.

O **StudyFlow** é uma aplicação web criada para auxiliar estudantes na organização de disciplinas e tarefas acadêmicas. A aplicação permite cadastrar disciplinas, associar tarefas a cada uma delas, definir prazos e prioridades e acompanhar o progresso das atividades por meio de um dashboard.

## 🎯 Objetivo

O projeto foi desenvolvido como parte da disciplina **Tópicos Avançados em Projeto e Desenvolvimento Web**, com o objetivo de aplicar conceitos de desenvolvimento web moderno, utilizando Vue.js, Bootstrap, JavaScript, componentes reutilizáveis e gerenciamento de dados no frontend.

## ✨ Funcionalidades

### 📚 Disciplinas

- Cadastro de disciplinas;
- Definição de uma cor para cada disciplina;
- Edição de disciplinas;
- Exclusão de disciplinas;
- Organização das tarefas por disciplina;
- Possibilidade de recolher e expandir o conteúdo de cada disciplina.

### ✅ Tarefas

- Cadastro de tarefas;
- Associação de tarefas a uma disciplina;
- Definição de descrição;
- Definição de data de entrega;
- Definição de prioridade:
  - Alta;
  - Média;
  - Baixa;
- Edição de tarefas;
- Exclusão de tarefas;
- Marcação de tarefas como concluídas;
- Separação entre tarefas pendentes e concluídas;
- Ordenação por data e prioridade.

### 📊 Dashboard

O dashboard apresenta uma visão geral das tarefas cadastradas, permitindo:

- Visualizar a quantidade de tarefas;
- Identificar tarefas pendentes e concluídas;
- Filtrar tarefas por disciplina;
- Filtrar por status;
- Filtrar por prioridade;
- Cadastrar e editar tarefas diretamente pelo dashboard.

### 💾 Persistência

Os dados das disciplinas e tarefas são armazenados no **LocalStorage** do navegador, permitindo que as informações continuem disponíveis mesmo após recarregar a página.

## 🛠️ Tecnologias utilizadas

- **Vue.js**
- **JavaScript**
- **HTML5**
- **CSS3**
- **Bootstrap**
- **Vite**
- **Git**
- **GitHub**
- **GitHub Pages**

## 🚀 Como executar o projeto
### Pré-requisitos

É necessário ter instalado:

- Node.js
- npm

### Instalação

Clone o repositório:

```git clone https://github.com/thalytalima211/study-flow.git```

Entre na pasta do projeto:

```cd study-flow/study-flow```

Instale as dependências:

```npm install```

Execute o projeto em ambiente de desenvolvimento:

```npm run dev```

O Vite disponibilizará um endereço local para acessar a aplicação.

## 🌐 Aplicação publicada

O StudyFlow está disponível no GitHub Pages:

https://thalytalima211.github.io/study-flow/

## 🚢 Deploy

O projeto utiliza GitHub Actions para realizar o processo de build e publicação no GitHub Pages.

A cada atualização enviada para a branch main, o workflow:

- Baixa o código do repositório;
- Configura o Node.js;
- Instala as dependências;
-Executa o build do projeto;
- Publica a pasta dist/ no GitHub Pages.
  
## 🤖 Uso de Inteligência Artificial

A Inteligência Artificial foi utilizada como ferramenta de apoio durante o desenvolvimento do projeto, principalmente para:

- esclarecimento de dúvidas sobre Vue.js, JavaScript e Bootstrap;
- dentificação e correção de erros;
- discussão da organização dos componentes;
- sugestões de implementação;
- revisão de trechos de código;
- auxílio na documentação do projeto.

As decisões de implementação, integração dos recursos e testes da aplicação foram realizadas durante o desenvolvimento do projeto.

## 📌 Possíveis melhorias

Algumas funcionalidades que podem ser adicionadas futuramente:

- Autenticação de usuários;
- Banco de dados para armazenamento das informações;
- Sincronização entre dispositivos;
- Notificações de tarefas próximas do vencimento;
- Calendário acadêmico;
- Relatórios de produtividade;
- Temas claro e escuro;
- Categorias adicionais para organização das tarefas.
  
## 👩‍💻 Autora

Thalyta Lima

Projeto desenvolvido para a disciplina de Tópicos Avançados em Projeto e Desenvolvimento Web — IFCE.

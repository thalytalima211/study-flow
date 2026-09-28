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

## 🧩 Organização do projeto

```text
study-flow/
├── public/
├── src/
│   ├── components/
│   │   ├── CourseForm.vue
│   │   ├── TaskForm.vue
│   │   └── TaskList.vue
│   │
│   ├── stores/
│   │   ├── course.js
│   │   └── task.js
│   │
│   ├── views/
│   │   └── Dashboard.vue
│   │
│   └── ...
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

# language: pt

Funcionalidade: Gerenciamento de Tarefas
  Contexto:
    Dado que o aplicativo Tasks.org foi iniciado

  @navegacao
  Cenário: Acessar os detalhes de uma tarefa a partir da lista
    Dado o usuário está na tela principal de listagem de tarefas
    E que existe uma tarefa cadastrada com o título "Reunião de equipe"
    Quando o usuário abre a tarefa "Reunião de equipe"
    Então a tela de detalhes da tarefa "Reunião de equipe" deve ser exibida

  @regressao
  Cenário: Lista de tarefas vazia exibe estado apropriado
    Dado que não existem tarefas cadastradas
    Então a lista de tarefas deve exibir uma mensagem indicando que não há tarefas

  @usabilidade
  Cenário: Tarefa recém-criada aparece imediatamente na lista
    Dado o usuário está na tela principal de listagem de tarefas
    Quando o usuário cria uma tarefa com o título "Tarefa em tempo real"
    Então a tarefa "Tarefa em tempo real" deve ser exibida na lista de tarefas

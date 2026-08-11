Feature: Gerenciamento de Tarefas
  Background:
    Given que o aplicativo Tasks.org foi iniciado

  @navegacao
  Scenario: Acessar os detalhes de uma tarefa a partir da lista
    Given que o usuário está na tela principal de listagem de tarefas
    And que existe uma tarefa cadastrada com o título "Reunião de equipe"
    When o usuário abre a tarefa "Reunião de equipe"
    Then a tela de detalhes da tarefa "Reunião de equipe" deve ser exibida

  @regressao
  Scenario: Lista de tarefas vazia exibe estado apropriado
    Given que não existem tarefas cadastradas
    Then a lista de tarefas deve exibir uma mensagem indicando que não há tarefas

  @usabilidade
  Scenario: Tarefa recém-criada aparece imediatamente na lista
    Given que o usuário está na tela principal de listagem de tarefas
    When o usuário cria uma tarefa com o título "Tarefa em tempo real"
    Then a tarefa "Tarefa em tempo real" deve ser exibida na lista de tarefas

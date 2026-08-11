Feature: Edição de Tarefas
  Como usuário do Tasks.org
  Eu quero editar tarefas existentes
  Para organizar minhas atividades de forma confiável

  Background:
    Given que o aplicativo Tasks.org foi iniciado
    And que o usuário está na tela principal de listagem de tarefas

  @edicao
  Scenario: Editar o título de uma tarefa existente
    Given que existe uma tarefa cadastrada com o título "Lavar o carro"
    When o usuário abre a tarefa "Lavar o carro"
    And altera o título de "Lavar o carro" para "Lavar o carro e aspirar o interior"
    And salva as alterações
    Then a tarefa "Lavar o carro e aspirar o interior" deve ser exibida na lista de tarefas

  @edicao @alternativo
  Scenario: Descartar alterações feitas durante a edição de uma tarefa
    Given que existe uma tarefa cadastrada com o título "Pagar contas"
    When o usuário abre a tarefa "Pagar contas"
    And altera o título de "Pagar contas" para "Pagar contas do mês"
    And descarta as alterações sem salvar
    Then a tarefa "Pagar contas" deve ser exibida na lista de tarefas

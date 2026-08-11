Feature: Exclusão de Tarefas
  Como usuário do Tasks.org
  Eu quero poder excluir tarefas
  Para organizar minhas atividades de forma confiável

  Background:
    Given que o aplicativo Tasks.org foi iniciado
    And que o usuário está na tela principal de listagem de tarefas
    And que existe uma tarefa cadastrada com o título "Tarefa a ser excluída"

  @exclusao @smoke
  Scenario: Excluir uma tarefa existente
    When o usuário abre a tarefa "Tarefa a ser excluída"
    And o usuário inicia a exclusão da tarefa
    And confirma a exclusão
    Then a tarefa "Tarefa a ser excluída" não deve ser exibida na lista de tarefas

  @exclusao @alternativo
  Scenario: Cancelar a exclusão de uma tarefa
    When o usuário abre a tarefa "Tarefa a ser excluída"
    And o usuário inicia a exclusão da tarefa
    And cancela a confirmação de exclusão
    Then o usuário deve permanecer com a tarefa "Tarefa a ser excluída" aberta
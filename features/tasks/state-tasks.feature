# language: pt

Feature: Gerenciamento de estados das Tarefas
  Como usuário do Tasks.org
  Eu quero poder alterar os estados das tarefas
  Para organizar minhas atividades de forma confiável

  Background:
    Given que o aplicativo Tasks.org foi iniciado
    And que o usuário está na tela principal de listagem de tarefas

  @conclusao @smoke
  Scenario: Concluir uma tarefa pendente
    Given que existe uma tarefa cadastrada com o título "Revisar relatório"
    When o usuário marca a tarefa "Revisar relatório" como "concluída"
    Then a tarefa "Revisar relatório" deve estar com o status "concluída"

  @reabertura
  Scenario: Reabrir uma tarefa concluída
    Given que existe uma tarefa concluída com o título "Enviar e-mail"
    When o usuário marca a tarefa "Enviar e-mail" como "pendente"
    Then a tarefa "Enviar e-mail" deve estar com o status "pendente"

  @persistencia
  Scenario: Tarefa criada permanece após reiniciar o aplicativo
    Given que existe uma tarefa cadastrada com o título "Tarefa persistente"
    When o aplicativo é fechado completamente
    And o aplicativo é reaberto
    Then a tarefa "Tarefa persistente" deve ser exibida na lista de tarefas

  @persistencia
  Scenario: Status de conclusão da tarefa permanece após reiniciar o aplicativo
    Given que existe uma tarefa concluída com o título "Tarefa concluída persistente"
    When o aplicativo é fechado completamente
    And o aplicativo é reaberto
    Then a tarefa "Tarefa concluída persistente" deve estar com o status "concluída"
  
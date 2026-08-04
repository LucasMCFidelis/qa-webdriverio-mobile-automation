# language: pt

Funcionalidade: Gerenciamento de estados das Tarefas
  Como usuário do Tasks.org
  Eu quero poder alterar os estados das tarefas
  Para organizar minhas atividades de forma confiável

  Contexto:
    Dado que o aplicativo Tasks.org foi iniciado
    E o usuário está na tela principal de listagem de tarefas

  @conclusao @smoke
  Cenário: Concluir uma tarefa pendente
    Dado que existe uma tarefa cadastrada com o título "Revisar relatório"
    Quando o usuário marca a tarefa "Revisar relatório" como "concluída"
    Então a tarefa "Revisar relatório" deve estar com o status "concluída"

  @reabertura
  Cenário: Reabrir uma tarefa concluída
    Dado que existe uma tarefa concluída com o título "Enviar e-mail"
    Quando o usuário marca a tarefa "Enviar e-mail" como "pendente"
    Então a tarefa "Enviar e-mail" deve estar com o status "pendente"
  
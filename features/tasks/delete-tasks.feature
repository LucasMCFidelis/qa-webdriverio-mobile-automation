# language: pt

Funcionalidade: Exclusão de Tarefas
  Como usuário do Tasks.org
  Eu quero poder excluir tarefas
  Para organizar minhas atividades de forma confiável

  Contexto:
    Dado que o aplicativo Tasks.org foi iniciado
    E o usuário está na tela principal de listagem de tarefas
    E que existe uma tarefa cadastrada com o título "Tarefa a ser excluída"

  @exclusao @smoke
  Cenário: Excluir uma tarefa existente
    Quando o usuário abre a tarefa "Tarefa a ser excluída"
    E o usuário inicia a exclusão da tarefa
    E confirma a exclusão
    Então a tarefa "Tarefa a ser excluída" não deve ser exibida na lista de tarefas

  @exclusao @alternativo
  Cenário: Cancelar a exclusão de uma tarefa
    Quando o usuário abre a tarefa "Tarefa a ser excluída"
    E o usuário inicia a exclusão da tarefa
    E cancela a confirmação de exclusão
    Então o usuário permanecer com a tarefa "Tarefa a ser excluída" aberta
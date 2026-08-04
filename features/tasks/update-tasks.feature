# language: pt

Funcionalidade: Edição de Tarefas
  Como usuário do Tasks.org
  Eu quero editar tarefas existentes
  Para organizar minhas atividades de forma confiável

  Contexto:
    Dado que o aplicativo Tasks.org foi iniciado
    E o usuário está na tela principal de listagem de tarefas

  @edicao
  Cenário: Editar o título de uma tarefa existente
    Dado que existe uma tarefa cadastrada com o título "Lavar o carro"
    Quando o usuário abre a tarefa "Lavar o carro"
    E altera o título de "Lavar o carro" para "Lavar o carro e aspirar o interior"
    E salva as alterações
    Então a tarefa "Lavar o carro e aspirar o interior" deve ser exibida na lista de tarefas

  @edicao @alternativo
  Cenário: Descartar alterações feitas durante a edição de uma tarefa
    Dado que existe uma tarefa cadastrada com o título "Pagar contas"
    Quando o usuário abre a tarefa "Pagar contas"
    E altera o título de "Pagar contas" para "Pagar contas do mês"
    E descarta as alterações sem salvar
    Então a tarefa "Pagar contas" deve ser exibida na lista de tarefas

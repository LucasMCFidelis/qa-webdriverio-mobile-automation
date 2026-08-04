# language: pt

Funcionalidade: Criação de Tarefas
  Como usuário do Tasks.org
  Eu quero poder criar tarefas com diferentes títulos
  Para organizar minhas atividades de forma confiável

  Contexto:
    Dado que o aplicativo Tasks.org foi iniciado
    E o usuário está na tela principal de listagem de tarefas

  @smoke @criacao
  Cenário: Criar uma nova tarefa com título válido
    Quando o usuário inicia a criação de uma nova tarefa
    E informa o título "Comprar mantimentos"
    E confirma a criação da tarefa
    Então a tarefa "Comprar mantimentos" deve ser exibida na lista de tarefas
    E a tarefa "Comprar mantimentos" deve estar com o status "pendente"

  @criacao
  Esquema do Cenário: Criar tarefas com diferentes títulos válidos
    Quando o usuário cria uma tarefa com o título "<titulo>"
    Então a tarefa "<titulo>" deve ser exibida na lista de tarefas

    Exemplos:
      | titulo                              |
      | Comprar leite                       |
      | Agendar consulta médica             |
      | Preparar apresentação para segunda  |

  @criacao @alternativo
  Cenário: Cancelar a criação de uma tarefa antes de salvar
    Quando o usuário inicia a criação de uma nova tarefa
    E informa o título "Tarefa temporária"
    E cancela a criação sem salvar
    Então a tarefa "Tarefa temporária" não deve ser exibida na lista de tarefas

  @criacao @negativo
  Cenário: Tentar criar uma tarefa sem informar o título
    Quando o usuário inicia a criação de uma nova tarefa
    E tenta confirmar a criação sem informar um título
    Então a criação da tarefa não deve ser concluída
    E uma mensagem informando que o título é obrigatório deve ser exibida

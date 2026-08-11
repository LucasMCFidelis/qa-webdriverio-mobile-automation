Feature: Criação de Tarefas
  Como usuário do Tasks.org
  Eu quero poder criar tarefas com diferentes títulos
  Para organizar minhas atividades de forma confiável

  Background:
    Given que o aplicativo Tasks.org foi iniciado
    And que o usuário está na tela principal de listagem de tarefas

  @smoke @criacao
  Scenario: Criar uma nova tarefa com título válido
    When o usuário inicia a criação de uma nova tarefa
    And informa o título "Comprar mantimentos"
    And confirma a criação da tarefa
    Then a tarefa "Comprar mantimentos" deve ser exibida na lista de tarefas
    And a tarefa "Comprar mantimentos" deve estar com o status "pendente"

  @criacao
  Scenario Outline: Criar tarefas com diferentes títulos válidos
    When o usuário cria uma tarefa com o título "<titulo>"
    Then a tarefa "<titulo>" deve ser exibida na lista de tarefas

    Examples:
      | titulo                              |
      | Comprar leite                       |
      | Agendar consulta médica             |
      | Preparar apresentação para segunda  |

  @criacao @alternativo
  Scenario: Cancelar a criação de uma tarefa antes de salvar
    When o usuário inicia a criação de uma nova tarefa
    And informa o título "Tarefa temporária"
    And cancela a criação sem salvar
    Then a tarefa "Tarefa temporária" não deve ser exibida na lista de tarefas

  @criacao @negativo
  Scenario: Tentar criar uma tarefa sem informar o título
    When o usuário inicia a criação de uma nova tarefa
    And tenta confirmar a criação sem informar um título
    Then uma mensagem informando que o título é obrigatório deve ser exibida
    And a criação da tarefa não deve ser concluída
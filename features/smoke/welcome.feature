Feature: Abertura do Tasks.org

  @smoke
  Scenario: Validar abertura do aplicativo
    Given que o aplicativo Tasks.org foi iniciado
    Then a opção "Continue without sync" deve estar visível
# Projeto de Automação de Testes Mobile - Android

![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![WebdriverIO](https://img.shields.io/badge/WebdriverIO-v9-purple)
![Appium](https://img.shields.io/badge/Appium-UiAutomator2-blue)
![Cucumber](https://img.shields.io/badge/BDD-Cucumber-green)

Desenvolvimento de automação de testes mobile Android para aplicação de gerenciamento de tarefas utilizando WebdriverIO, Appium e Cucumber. Implementação da arquitetura Page Object Model, organização dos testes por features Gherkin e automação de cenários de criação, edição, conclusão, exclusão e persistência de itens em uma aplicação de gerenciamento de tarefas.

## Índice

- [Sobre o app testado](#sobre-o-app-testado)
- [Features](#features)
- [Tags disponíveis](#tags-disponíveis)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Pré-requisitos](#pré-requisitos)
- [Configurar para execução local](#configurar-para-execução-local)
- [Execução dos Testes](#execução-dos-testes)
- [Roadmap / Limitações conhecidas](#roadmap--limitações-conhecidas)
- [Licença](#licença)

## Sobre o app testado

O aplicativo utilizado como alvo dos testes é o **[Tasks.org](https://tasks.org/)**, um gerenciador de tarefas open source disponível no F-Droid. A escolha se deu por ser uma aplicação real, gratuita e de código aberto, com fluxos completos de CRUD de tarefas (criação, edição, conclusão e exclusão), o que a torna um bom estudo de caso para automação mobile end-to-end sem depender de ambientes de teste artificiais ou mockados.

O projeto carrega localmente uma versão do `.apk` em `app/android`, utilizada diretamente pelas capabilities do Appium — não é necessário instalar o app manualmente no emulador.

## Features

O projeto é focado em testes relacionados ao gerenciamento de tarefas, tendo as seguintes features de testes escritas em Gherkin:

- **create-tasks.feature -** especificações dos testes relacionados à criação das tarefas
- **delete-tasks.feature -** especificações dos testes relacionados à exclusão das tarefas
- **update-tasks.feature -** especificações dos testes relacionados à atualização das tarefas
- **state-tasks.feature -** especificações dos testes relacionados à mudança dos estados de conclusão das tarefas
- **tasks.feature -** arquivo complementar que reúne testes relacionados principalmente à listagem das tarefas
- **welcome.feature -** especificação do teste de smoke relacionado à abertura inicial do aplicativo

## Tags disponíveis

Os cenários são marcados com tags do Cucumber, o que permite executar apenas um subconjunto dos testes. As tags utilizadas no projeto são:

| Tag             | Significado                                                             |
|-----------------|---------------------------------------------------------------------------|
| `@smoke`        | Cenários críticos, usados para uma validação rápida do fluxo principal    |
| `@criacao`      | Cenários relacionados à criação de tarefas                                |
| `@edicao`       | Cenários relacionados à edição de tarefas                                 |
| `@exclusao`     | Cenários relacionados à exclusão de tarefas                               |
| `@conclusao`    | Cenários relacionados à conclusão de tarefas                              |
| `@reabertura`   | Cenários relacionados à reabertura de tarefas concluídas                  |
| `@persistencia` | Cenários que validam se dados/estados permanecem após reiniciar o app     |
| `@navegacao`    | Cenários relacionados à navegação entre telas                             |
| `@regressao`    | Cenários de regressão geral                                               |
| `@usabilidade`  | Cenários relacionados à experiência de uso (ex: atualização em tempo real)|
| `@alternativo`  | Fluxos alternativos (ex: cancelar uma ação antes de concluí-la)           |
| `@negativo`     | Fluxos negativos (ex: tentar salvar sem preencher campo obrigatório)      |

Exemplo combinando tags, executando os testes de smoke mas ignorando fluxos negativos:

```bash
  npm run wdio -- --cucumberOpts.tags="@smoke and not @negativo"
```

## Estrutura de pastas

```
qa-webdriverio-mobile-automation/
├── app/
│   └── android/                # APK do Tasks.org utilizado nos testes
├── features/
│   ├── constants/               # Constantes reutilizáveis (status, listas, app id)
│   ├── pageobjects/
│   │   ├── components/          # Componentes reutilizáveis entre páginas (ex: formulário de tarefa)
│   │   └── *.page.ts            # Page Objects de cada tela do app
│   ├── smoke/                   # Feature de smoke test (abertura do app)
│   ├── step-definitions/        # Implementação dos steps em Gherkin
│   └── tasks/                   # Features de gerenciamento de tarefas (CRUD, estados)
├── wdio.conf.ts                 # Configuração do WebdriverIO + Appium
├── tsconfig.json
└── package.json
```

O projeto segue o padrão **Page Object Model (POM)**, com um reforço adicional de reuso via **componentes**: telas que compartilham o mesmo formulário (criação e edição de tarefa) herdam de um `TaskFormComponent` comum, evitando duplicação de seletores e ações repetidas entre `CreateTaskPage` e `UpdateTaskPage`.

## Pré-requisitos

Antes de clonar o projeto, é necessário ter instalado e configurado:

- [Node.js](https://nodejs.org/) (recomenda-se a versão LTS mais recente)
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) com a variável de ambiente `JAVA_HOME` configurada
- [Android Studio](https://developer.android.com/studio) com o SDK instalado e a variável `ANDROID_HOME` configurada
- Um emulador Android criado (AVD) ou um dispositivo físico com depuração USB habilitada

Opcionalmente, é possível validar se o ambiente está corretamente configurado para o Appium rodando:

```bash
  npx appium-doctor --android
```

## Configurar para execução local

Clonar o projeto
```bash
  git clone https://github.com/LucasMCFidelis/qa-webdriverio-mobile-automation
```
Acessar diretorio do projeto
```bash
  cd qa-webdriverio-mobile-automation
```
Instalar dependencias do projeto
```bash
  npm install
```
Caso não possua o appium instalado, é necessario realizar a instalação de forma global
```bash
  npm install -g appium
```
Configuração das capabilities deve ser verificada e atualizada em `wdio.conf.ts`.
```json
capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'Pixel 7',
    'appium:platformVersion': '13.0',
    'appium:app': path.join(
        process.cwd(),
        './app/android/tasks-fdroid-15.8.apk'
    ),
    'appium:appActivity': 'com.todoroo.astrid.activity.TaskListActivity',
    'appium:automationName': 'UiAutomator2'
}],
```
Observações:
- Atualmente o projeto carrega uma versão do apk em `app/android` utilizado para teste, que pode ser atualizada caso necessario.
- As capabilities recomendadas para atualização são `appium:deviceName` e `appium:platformVersion` para que correspondam as configurações do device emulado para teste.

## Execução dos Testes

Para rodar os testes, é necessario estar com o emulador aberto e executar o seguinte comando
```bash
  npm run wdio
```
Existe também a opção de rodar a execução os testes de forma filtrada utilizando tags do cucumber. Exemplo de como executar filtrando por testes @smoke
```bash
  npm run wdio -- --cucumberOpts.tags="@smoke"
```

## Roadmap / Limitações conhecidas

O projeto atualmente cobre o fluxo essencial de automação mobile, mas alguns pontos ainda estão em aberto como evolução futura:

- **Relatórios visuais:** hoje a execução utiliza apenas o reporter `spec` (saída em console). A adição de um reporter como Allure geraria relatórios HTML com histórico e evidências.
- **Evidências em falhas:** ainda não há captura automática de screenshot em cenários que falham.
- **CI/CD:** o projeto ainda não possui um pipeline configurado (ex: GitHub Actions) para execução automática dos testes.

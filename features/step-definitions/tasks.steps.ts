import { Given, Then, When } from "@wdio/cucumber-framework";
import { welcomePage } from "../pageobjects/welcome.page";
import { tasksPage } from "../pageobjects/tasks.page";
import { createTaskPage } from "../pageobjects/create-task.page";

Given('o usuário está na tela principal de listagem de tarefas', async () => {
    const isWelcomePageDisplayed = await welcomePage.continueWithoutSyncButton.isDisplayed();
    if (isWelcomePageDisplayed) {
        await welcomePage.continueWithoutSyncButton.click();
    }
    await tasksPage.titlePage().waitForDisplayed();
});

When('o usuário inicia a criação de uma nova tarefa', async () => {
    await tasksPage.createTaskButton.waitForDisplayed();
    await tasksPage.createTaskButton.click();
    await createTaskPage.titleInput.waitForDisplayed();;
})

When('informa o título {string}', async (title: string) => {
    await createTaskPage.titleInput.click();
    await createTaskPage.titleInput.setValue(title);
});

When('confirma a criação da tarefa', async () => {
    await createTaskPage.saveButton.click();
});

When('cancela a criação sem salvar', async () => {
    await createTaskPage.cancelCreation();
    await tasksPage.titlePage().waitForDisplayed();
});

When('tenta confirmar a criação sem informar um título', async () => {
    await createTaskPage.saveButton.click();
});

When('o usuário cria uma tarefa com o título {string}', async (title: string) => {
    await tasksPage.createTaskButton.click();
    await createTaskPage.titleInput.click();
    await createTaskPage.titleInput.setValue(title);
    await createTaskPage.saveButton.click();
});

Then('a tarefa {string} deve ser exibida na lista de tarefas', async (title: string) => {
    await tasksPage.titlePage().waitForDisplayed();
    await tasksPage.taskTitle(title).waitForDisplayed();
    await tasksPage.taskCheckbox(title).waitForDisplayed();
});

Then('a tarefa {string} não deve ser exibida na lista de tarefas', async (title: string) => {
    await expect(tasksPage.task(title)).not.toBeExisting();
});

Then('a criação da tarefa não deve ser concluída', async () => {
    await expect(createTaskPage.titleInput).toBeDisplayed();
});

Then('uma mensagem informando que o título é obrigatório deve ser exibida', async () => {
    await expect(createTaskPage.errorMessage('Title is required')).toBeDisplayed();
});

Then('a tarefa {string} deve estar com o status {string}', async (title: string, status: string) => {
    switch (status.toLowerCase()) {
        case 'pendente':
            await expect(tasksPage.taskCheckbox(title)).not.toBeChecked();
            break;

        case 'concluida':
            await expect(tasksPage.taskCheckbox(title)).toBeChecked();
            break;

        default:
            console.log(`Status ${status} não reconhecido`);
            break;
    }
});
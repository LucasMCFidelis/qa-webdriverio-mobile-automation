import { Given, Then, When } from "@wdio/cucumber-framework";
import { welcomePage } from "../pageobjects/welcome.page";
import { tasksPage } from "../pageobjects/tasks.page";
import { createTaskPage } from "../pageobjects/create-task.page";
import { updateTaskPage } from "../pageobjects/update-task.page";

Given('o usuário está na tela principal de listagem de tarefas', async () => {
    const isWelcomePageDisplayed = await welcomePage.continueWithoutSyncButton.isDisplayed();
    if (isWelcomePageDisplayed) {
        await welcomePage.continueWithoutSyncButton.click();
    }
    await tasksPage.titlePage().waitForDisplayed();
});

Given('que existe uma tarefa cadastrada com o título {string}', async (title: string) => {
    await tasksPage.initCreateTask();
    await createTaskPage.submitTask(title);
});

Given('que existe uma tarefa concluída com o título {string}', async (title: string) => {
    await tasksPage.initCreateTask();
    await createTaskPage.submitTask(title);

    const checkbox = tasksPage.taskCheckbox(title);
    await checkbox.waitForDisplayed();
    await expect(checkbox).not.toBeChecked();
    await checkbox.click();
});

When('o usuário inicia a criação de uma nova tarefa', async () => {
    await tasksPage.initCreateTask();
})

When('informa o título {string}', async (title: string) => {
    await createTaskPage.setTaskTitle({ title });
});

When('confirma a criação da tarefa', async () => {
    await createTaskPage.saveTask();
});

When('cancela a criação sem salvar', async () => {
    await createTaskPage.cancelFillForm();
    await tasksPage.titlePage().waitForDisplayed();
});

When('tenta confirmar a criação sem informar um título', async () => {
    await createTaskPage.saveTask();
});

When('o usuário cria uma tarefa com o título {string}', async (title: string) => {
    await tasksPage.initCreateTask();
    await createTaskPage.submitTask(title);
});

When('o usuário abre a tarefa {string}', async (title: string) => {
    const taskElement = tasksPage.task(title);
    await taskElement.waitForDisplayed();
    await taskElement.click();

    await updateTaskPage.titleInput(title).waitForDisplayed();
});

When('altera o título de {string} para {string}', async (oldTitle: string, newTitle: string) => {
    await updateTaskPage.setTaskTitle({ selector: oldTitle, title: newTitle });
});

When('salva as alterações', async () => {
    await updateTaskPage.saveTask();
});

When('descarta as alterações sem salvar', async () => {
    await updateTaskPage.cancelFillForm();
    await tasksPage.titlePage().waitForDisplayed();
});

When(
    'o usuário marca a tarefa {string} como {string}',
    async (title: string, status: string) => {
        switch (status.toLowerCase()) {
            case 'concluída': {
                const checkbox = tasksPage.taskCheckbox(title);

                await checkbox.waitForDisplayed();
                await checkbox.click();

                await tasksPage.ensureTaskListDisplay({
                    list: 'Completed',
                    expectDisplayed: true,
                    title
                });

                await expect(checkbox).toBeDisplayed();
                break;
            }

            case 'pendente': {
                await tasksPage.ensureTaskListDisplay({
                    list: 'Completed',
                    expectDisplayed: true,
                    title
                });

                const checkbox = tasksPage.taskCheckbox(title);

                await checkbox.waitForDisplayed();
                await checkbox.click();

                await tasksPage.ensureTaskListDisplay({
                    list: 'Completed',
                    expectDisplayed: false,
                    title
                });

                await expect(checkbox).toBeDisplayed();
                break;
            }

            default:
                throw new Error(`Status "${status}" não reconhecido`);
        }
    }
);

When('o usuário inicia a exclusão da tarefa', async () => {
    const deleteButton = updateTaskPage.deleteButton;
    await deleteButton.waitForDisplayed();
    await deleteButton.click();
});

When('confirma a exclusão', async () => {
    const confirmDeleteButton = updateTaskPage.confirmDeleteButton;
    await confirmDeleteButton.waitForDisplayed();
    await confirmDeleteButton.click();
});

When('cancela a confirmação de exclusão', async () => {
    const cancelDeleteButton = updateTaskPage.cancelDeleteButton;
    await cancelDeleteButton.waitForDisplayed();
    await cancelDeleteButton.click();
});

Then('a tarefa {string} deve ser exibida na lista de tarefas', async (title: string) => {
    await tasksPage.ensureTaskListDisplay({
        list: 'No due date',
        expectDisplayed: true,
        title
    });
    await tasksPage.titlePage().waitForDisplayed();

    const taskTitle = tasksPage.taskTitle(title);
    await taskTitle.waitForDisplayed();

    const checkbox = tasksPage.taskCheckbox(title);
    await checkbox.waitForDisplayed();
});

Then('a tarefa {string} não deve ser exibida na lista de tarefas', async (title: string) => {
    await expect(tasksPage.task(title)).not.toBeExisting();
});

Then('a criação da tarefa não deve ser concluída', async () => {
    await expect(createTaskPage.titleInput()).toBeDisplayed();
});

Then('uma mensagem informando que o título é obrigatório deve ser exibida', async () => {
    await expect(createTaskPage.errorMessage('Title is required')).toBeDisplayed();
});

Then('a tarefa {string} deve estar com o status {string}', async (title: string, status: string) => {
    switch (status.toLowerCase()) {
        case 'pendente':
            await tasksPage.ensureTaskListDisplay({
                list: 'No due date',
                expectDisplayed: false,
                title
            });
            await expect(tasksPage.task(title)).not.toBeDisplayed();
            break;

        case 'concluída':
            await tasksPage.ensureTaskListDisplay({
                list: 'Completed',
                expectDisplayed: true,
                title
            });

            const task = tasksPage.task(title);
            await task.waitForDisplayed();
            await expect(task).toBeDisplayed();
            break;

        default:
            console.log(`Status ${status} não reconhecido`);
            break;
    }
});

Then('o usuário permanecer com a tarefa {string} aberta', async (title: string) => {
    await expect(updateTaskPage.titleInput(title)).toBeDisplayed();
});
export class TaskFormComponent {
    get saveButton() {
        return $('~Save')
    }

    get discardChangesButton() {
        return $('//android.widget.Button[@text="Discard"]')
    }

    get keepEditingButton() {
        return $('//android.widget.Button[@text="Keep editing"]')
    }

    titleInput(text: string = 'Task name') {
        return $(`//android.widget.EditText[@text="${text}"]`)
    }

    errorMessage(message: string) {
        return $(`//*[@text="${message}"]`)
    }

    async cancelFillForm() {
        await driver.hideKeyboard()
        await driver.back()
        await this.discardChangesButton.waitForDisplayed()
        await this.discardChangesButton.click()
    }

    async setTaskTitle({ title, selector }: { title: string, selector?: string }) {
        const titleInput = this.titleInput(selector);
        await titleInput.waitForDisplayed();
        await titleInput.click();
        await titleInput.clearValue();
        await titleInput.setValue(title);
    }

    async saveTask() {
        await this.saveButton.click();
    }

    async submitTask(title: string) {
        await this.setTaskTitle({ title });
        await this.saveTask();
    }
}
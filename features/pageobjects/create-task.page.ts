class CreateTaskPage {
  get saveButton() {
    return $('~Save')
  }

  get cancelButton() {
    return $('//android.widget.Button[@text="Discard"]')
  }

  titleInput(text: string = 'Task name') {
    return $(`//android.widget.EditText[@text="${text}"]`)
  }

  errorMessage(message: string) {
    return $(`//*[@text="${message}"]`)
  }

  async cancelCreation() {
    await driver.hideKeyboard()
    await driver.back()
    await this.cancelButton.waitForDisplayed()
    await this.cancelButton.click()
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

  async createTask(title: string) {
    await this.setTaskTitle({ title });
    await this.saveTask();
  }
}

export const createTaskPage = new CreateTaskPage()
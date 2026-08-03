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
}

export const createTaskPage = new CreateTaskPage()
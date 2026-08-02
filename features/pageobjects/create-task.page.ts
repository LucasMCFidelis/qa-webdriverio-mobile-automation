class CreateTaskPage {
  get titleInput() {
    return $('//*[@text="Task name"]')
  }

  get saveButton() {
    return $('~Save')
  }

  get cancelButton() {
    return $('//android.widget.Button[@text="Discard"]')
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
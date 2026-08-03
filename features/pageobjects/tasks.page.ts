class TasksPage {
  titlePage() {
    return $('//*[@text="My Tasks"]')
  }

  get createTaskButton() {
    return $('~Create new task')
  }

  task(title: string) {
    return $(
      `//*[@resource-id="org.tasks:id/title" and @text="${title}"]/..`
    )
  }

  taskTitle(title: string) {
    return this.task(title).$(
      '//*[@resource-id="org.tasks:id/title"]'
    );
  }

  taskCheckbox(title: string) {
    return this.task(title).$(
      '//*[@resource-id="org.tasks:id/completeBox"]'
    );
  }

  async initCreateTask() {
    await this.createTaskButton.waitForDisplayed();
    await this.createTaskButton.click();
  }
}

export const tasksPage = new TasksPage()
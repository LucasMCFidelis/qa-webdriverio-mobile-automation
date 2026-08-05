class TasksPage {
  titlePage() {
    return $('//*[@text="My Tasks"]')
  }

  get createTaskButton() {
    return $('~Create new task')
  }

  taskListHeader(list: string = 'Completed') {
    return $(
      `//*[@resource-id="org.tasks:id/header" and @text="${list}"]/..`
    );
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

  async changeDisplayListTasks(list: string) {
    await this.taskListHeader(list).waitForDisplayed();
    await this.taskListHeader(list).click();
  }

  async ensureTaskListDisplay({
    list,
    expectDisplayed,
    title
  }: {
    list: string,
    expectDisplayed: boolean,
    title: string
  }) {
    const taskListHeader = this.taskListHeader(list);
    await taskListHeader.waitForDisplayed();
    if (await taskListHeader.isDisplayed() == false) {
      return
    }

    const isDisplayed = await this.task(title).isDisplayed()

    if (expectDisplayed != isDisplayed) {
      await taskListHeader.click()
    }
  }

  emptyListMessage() {
    return $('//*[@text="There are no tasks here."]')
  }
}

export const tasksPage = new TasksPage()
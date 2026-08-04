import { TaskFormComponent } from "./components/task-form.component"

class UpdateTaskPage extends TaskFormComponent {
  get deleteButton() {
    return $('~Delete task')
  }

  get confirmDeleteButton() {
    return $('//android.widget.Button[@text="OK"]')
  }

  get cancelDeleteButton() {
    return $('//android.widget.Button[@text="Cancel"]')
  }


}

export const updateTaskPage = new UpdateTaskPage()
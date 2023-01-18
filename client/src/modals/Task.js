import secureApi from "@/api/authApi";
class Task {
  constructor(obj) {
    this._id = obj._id;
    this.owner = obj.owner;
    this.projectId = obj.projectId;
    this.title = obj.title;
    this.description = obj.description;
    this.icon = obj.icon;
    this.value = obj.value;
    this.points = obj.points;
    this.createdAt = obj.createdAt;
    this.updatedAt = obj.updatedAt;
  }

  async incrementUserPoints() { 
    await secureApi.post(`/projects/task/${this.projectId}}/increment`);
  }

  async decrementUserPoints() { 
    const updatedTask = await secureApi.post(`/projects/task/${this.projectId}/increment`);
    return updatedTask;
  }
  
  /**
   *
   * @param {String} projectId - id of the projct
   * @param {Task} task - new task to create
   * @returns
   */
  static async create(projectId, task) {
    
    const response = await secureApi.post( `/projects/${projectId}/task/create`, task);
    const newTask = response.data;

    // check is task was created
    if (newTask && newTask._id) {
      //   tasks.value.push(newTask);
      return new Task(newTask);
    }

    return undefined;
  }


  /**
   * 
   * @param {String} projectId 
   * @returns {[Task]} array of task
   */
  static async getTask(projectId) {
    const projectTask = await secureApi.get(`/projects/${projectId}/tasks`);

    if (!projectTask || !projectTask.data || !projectTask.data.tasks) return [];

    return projectTask.data.tasks.map(task => new Task(task));
  }
}

export default Task;

import { useAuthStore } from "@/stores/auth.store";

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
    this.myPoints = 0;

    const { user } = useAuthStore();
    if (user) {
      this.myPoints = this.getUserPoints(this.points, user);
    }
  }

  getUserPoints = (taskPoints, user) => {
    // check if there is points
    if (!Array.isArray(taskPoints)) {
      console.error("Error: Points seems to be damaged");
      return 0;
    }

    // // check if points are empty
    if (!taskPoints.length) {
      return 0;
    }

    const myPoints = taskPoints.find(
      (userPoints) => userPoints.userId.toString() === user._id.toString()
    );

    if (myPoints && myPoints.value) {
      return myPoints.value;
    }

    return 0;
  };
}

export default Task;

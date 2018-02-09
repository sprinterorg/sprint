export default class ticketController {
    /*@ngInject*/
    constructor(fireBase, $stateParams, supportService) {
        this._fireBase = fireBase;
        this.projectId = $stateParams.project_id;
		this.taskId = $stateParams.task_id;
        this.task = fireBase.getTask(this.projectId, this.taskId);
        this.projectUsers = fireBase.getProjectUsers(this.projectId);
        this.executors = fireBase.getTaskExecutors(this.projectId, this.taskId);
        this.project = fireBase.getSprint(this.projectId);
    }

	addExecutorsToTask() {
        this._fireBase.addExecutorsToTask(this.projectId, this.taskId, this.newUserId, {
            priority: this.task.priority,
            title: this.task.title
        }); 
	}

    deleteExecutorFromTask(userId) {
        this._fireBase.deleteExecutorFromTask(this.projectId, this.taskId, this.project.managerId, userId);
    }

    getUser(userId) {
        return this.projectUsers.filter(item => item.$id === userId)[0].username;
    }
}
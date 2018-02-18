export default class ticketController {
    /*@ngInject*/
    constructor(fireBase, $stateParams, supportService, $scope) {
        this._fireBase = fireBase;
        this.projectId = $stateParams.project_id;
		this.taskId = $stateParams.task_id;
        this.task = fireBase.getTask(this.projectId, this.taskId);
        this.projectUsers = fireBase.getProjectUsers(this.projectId);
        this.executors = fireBase.getTaskExecutors(this.projectId, this.taskId);
        this.project = fireBase.getSprint(this.projectId);
        this.lists = fireBase.getSprintLists(this.projectId);

        this.comments = fireBase.getComments(this.projectId, this.taskId);
        this.userId = supportService.getUserId();

        this.scope = $scope;

        this.comment = '';
        this.commentText = '';

        this.editMode = false;
        this.editCommentId = '';

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
        return this.projectUsers.filter(item => item.$id === userId)[0];
    }

    moveToList() {
        this._fireBase.moveToList(this.taskId, Number(this.newListId), this.projectId);
    }

    getListName() {
        return this.lists.filter(item => item.listId === this.task.list_id)[0].listName;
    }

    addComment(){
        this._fireBase.addComment(this.comments, {comment: this.comment, userId: this.userId});
    }

    deleteComment(id) {
        this._fireBase.deleteComment(id, this.projectId, this.taskId);
    }

    editComment(comment) {
        this.editCommentId = comment.$id;
        this.commentText = comment.comment;
        this.editMode = !this.editMode;
    }

    saveEditedComment (id) {
        this.editMode = false;
        this.editCommentId = '';
        this._fireBase.editComment(id, this.projectId, this.taskId,  this.commentText);
    }

}
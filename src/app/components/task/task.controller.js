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
        this.lists = fireBase.getSprintLists(this.projectId);

        this.comments = fireBase.getComments(this.projectId, this.taskId);
        this.userId = supportService.getUserId();

        this.editDescription = false;

        this.comment = '';
        this.commentText = '';

        this.editMode = false;
        this.editCommentId = '';

        this.task.description = '';

        this.priorities = supportService.getPriorities();

        this.priorityStyles = {
            0: 'priority-red',
            1: 'priority-yellow',
            2: 'priority-green',
            3: 'priority-blue'
        }

    }

    moveToList(listId) {
        this._fireBase.moveToList(this.taskId, Number(listId), this.projectId);
    }

    getListName() {
        return this.lists.filter(item => item.listId === this.task.list_id);
    }

    addComment(){
        this._fireBase.addComment(this.comments, {comment: this.comment, userId: this.userId});
    }

    deleteComment(commentId) {
        this._fireBase.deleteComment(commentId, this.projectId, this.taskId);
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

    changeDescription() {
        this.editDescription = !this.editDescription;
    }

    saveDescription() {
        this._fireBase.updateDescription(this.projectId, this.taskId, this.task.description);
        this.changeDescription();
    }

    cancelSavingDescription() {
        this.task = this._fireBase.getTask(this.projectId, this.taskId);
        this.changeDescription();
    }

    taskPrioriry(priority) {
        if (priority === this.task.priority)
            return this.priorityStyles[priority];
        return '';
    }

    taskList(listId) {
        if (listId === this.task.list_id)
            return 'active-list';
        return '';
    }

    setPriority(priority) {
        let users = [this.project.managerId];
        this.executors.map( user => users.push(user.$id));
        this._fireBase.updatePriority(this.projectId, this.taskId, priority, users);
    }

    displayList(listId) {
        return listId != 1 || this.userId === this.project.managerId;
    }
}
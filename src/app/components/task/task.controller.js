export default class ticketController {
    /*@ngInject*/
    constructor($scope, fireBase, $stateParams, supportService) {
        this.scope = $scope;
        this._fireBase = fireBase;
        this.projectId = $stateParams.project_id;
        this.taskId = $stateParams.task_id;
        this.task = fireBase.getTask(this.projectId, this.taskId);
        this.taskFiles = fireBase.getTaskFileLinks(this.projectId, this.taskId);

        this.projectUsers = fireBase.getProjectUsers(this.projectId);
        this.executors = fireBase.getTaskExecutors(this.projectId, this.taskId);
        this.project = fireBase.getSprint(this.projectId);
        this.lists = fireBase.getSprintLists(this.projectId);
        this.taskTitle = null;
        this._supportService = supportService;
        this.titleEditFlag = false;

        this.comments = fireBase.getComments(this.projectId, this.taskId);
        this.userId = supportService.getUserId();

        this.editDescription = false;

        this.comment = '';
        this.commentText = '';
        this.fileLinks = [];


        this.editMode = false;
        this.editCommentId = '';

        this.task.description = '';
        this.descFileLinks = [];

        this.priorities = supportService.getPriorities();

        this.priorityStyles = {
            0: 'priority-red',
            1: 'priority-yellow',
            2: 'priority-green',
            3: 'priority-blue'
        };

    }
    get isTitleEdit() {
        return this.titleEditFlag;
    }
    set isTitleEdit(flag){
        this.titleEditFlag = flag;
        if (flag == true) {
            this.taskTitle = this.task.title;
        }
    }

    toEditTitle($event) {
        let el = $event.target.parentNode.parentNode.querySelector('input');
        this.isTitleEdit = !this.isTitleEdit;
        setTimeout( () => el.focus(), 10);
    }

    onTitleBlur() {
        this.editTitle();
    }

    editTitle() {
        this.isTitleEdit = false;
        let users = [this.project.managerId];
        this.executors.map( user => users.push(user.$id));
        this._fireBase.updateTitle(this.projectId, this.task.$id, this.taskTitle, users);
    }

    moveToList(listId) {
        this._fireBase.moveToList(this.taskId, Number(listId), this.projectId);
    }

    getListName() {
        return this.lists.filter(item => item.listId === this.task.list_id);
    }

    getUser(userId) {
        return this.projectUsers.filter(item => item.$id === userId)[0];
    }

    addComment(){
        this._fireBase.addComment(this.comments, {comment: this.comment, userId: this.userId, files: this.fileLinks, date: Date.parse(new Date())});
        this.comment = '';
        this.fileLinks.splice(0,  this.fileLinks.length);
    }

    deleteComment(commentId) {
        this._fireBase.deleteComment(commentId, this.projectId, this.taskId);
    }

    editComment($event, comment) {
        let el = $event.target.parentNode.parentNode.querySelector('textarea');
        this.editCommentId = comment.$id;
        this.commentText = comment.comment;
        this.editMode = !this.editMode;
        setTimeout( () => el.focus(), 10);
    }

    saveEditedComment (id) {
        this.editMode = false;
        this.editCommentId = '';
        this._fireBase.editComment(id, this.projectId, this.taskId,  this.commentText);
    }

    changeDescription($event) {
        let el = $event.target.parentNode.parentNode.querySelector('textarea');
        this.editDescription = !this.editDescription;
        setTimeout( () => el.focus(), 10);
    }

    saveDescription() {
        this._fireBase.updateDescription(this.projectId, this.taskId, this.task.description);
        this.editDescription = !this.editDescription;
    }

    addFileToDesc(file){
        this._fireBase.addFilesToTask(this.taskFiles, file);
    }

    cancelSavingDescription() {
        this.task = this._fireBase.getTask(this.projectId, this.taskId);
        this.editDescription = !this.editDescription;
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

    uploadFile(file, add){
        let self = this;
        let fileObj = {};
                    if(file) {
                    this._fireBase.uploadFile(file)
                        .then(fileLink => {
                            if (add.addToComment) {
                            fileObj.fileName = file.name;
                            fileObj.fileLink = fileLink.downloadURL;
                            self.fileLinks.push(fileObj);
                            self.scope.$apply();
                            } else if(!add.addToComment) {
                                fileObj.fileName = file.name;
                                fileObj.fileLink = fileLink.downloadURL;
                                fileObj.fileLocation = fileLink.ref.location.path;

                                self.descFileLinks.push(fileObj);
                                self.scope.$apply();
                                self.addFileToDesc(fileObj);
                            }
                        }, ()=>{console.log("error")});

                    } else {
                    console.log('file format incorrect');
            }
        }

        deleteFile(file, id){
            this._fireBase.deleteFile(file, this.projectId, this.taskId, id);
        }

}
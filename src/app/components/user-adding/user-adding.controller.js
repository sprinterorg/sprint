export default class UserAddingController{
    /*@ngInject*/
     constructor(fireBase, supportService) {
        this.userId = supportService.getUserId();
        this.cards = fireBase.getListCards(this.projectId);
        this.addUserSelect = false;
        this._fireBase = fireBase;
    }

    addUserToProject(user) {
        this._fireBase.addUserToProject(user.$id, this.projectId, {
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }, {
            projectName: this.project.projectName,
            background: this.project.background,
            managerId: this.project.managerId
        });
         this.addUserSelect = false;
    }

    deleteUserFromProject(userId) {
        let cards = [];
        this.cards.filter(card => {if (card.executors) return userId in card.executors; return false}).forEach(card => cards.push(card.$id));
        console.log(cards)
        this._fireBase.deleteUserFromProject(userId, this.projectId, cards);
    }

    isManager(userId) {
        return userId == this.userId;
    }

    showAddUser() {
        this.addUserSelect = !this.addUserSelect;
    }

    getUser(userId) {
        return this.allUsers.filter(item => item.$id === userId)[0];
    }

    addExecutorsToTask(userId) {
        this._fireBase.addExecutorsToTask(this.projectId, this.taskId, userId, {
            priority: this.task.priority,
            title: this.task.title
        }); 
        this.addUserSelect = false;
    }
    deleteExecutorFromTask(userId) {
        this._fireBase.deleteExecutorFromTask(this.projectId, this.taskId, this.project.managerId, userId);
    }
}


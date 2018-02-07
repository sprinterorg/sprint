export default class ticketController {
    /*@ngInject*/
    constructor(fireBase, $stateParams, supportService) {
        this.projectId = $stateParams.project_id;
		this.ticketId = $stateParams.ticket_id;
        this.ticket = fireBase.getTicket(this.projectId, this.ticketId);
        this.projectUsers = fireBase.getProjectUsers(this.projectId);
	}

	addExecutorsToTicket() {
		// let userData = this.projectUsers.filter(item => item.$id === this.newUserId)[0];
        this._fireBase.addUserToTicket(this.projectId, this.ticketId, this.newUserId); 
	}
}
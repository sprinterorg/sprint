import firebase from 'firebase/app';

class FireService {
    /*@ngInject*/
    constructor($firebaseArray, $firebaseObject) {
    	this._$firebaseArray = $firebaseArray;
    	this._$firebaseObject = $firebaseObject;
    	this.rootRef = firebase.database().ref();
        this.storageRef = firebase.storage().ref();
    }

    createUser(userId, data) {
        data.avatar = 'https://firebasestorage.googleapis.com/v0/b/portfolio-5e570.appspot.com/o/img%2F947799avatar.png?alt=media&token=c417ea2b-e139-4cae-8f19-821181f28286';
    	return this.rootRef.child('users').update({
            [userId]: data
        });
    }

    getUser(userId) {
    	let ref = this.rootRef.child('users/'+userId);
    	return this._$firebaseObject(ref);
    }

    getUserPromise(userId) {
            return this.rootRef.child('users/'+userId).once('value').then(snapshot => snapshot.val());
    }

    getAllUsers() {
        let ref = this.rootRef.child('users');
        return this._$firebaseArray(ref);
    }

    getProjectUsers(projectId) {
        let ref = this.rootRef.child('projects/'+projectId+'/currentSprint/users');
        return this._$firebaseArray(ref);
    }

    updateUser(ids, userId, data) {
        let temp = {
            ['users/'+userId+'/username']: data.username,
            ['users/'+userId+'/email']: data.email,
            ['users/'+userId+'/avatar']: data.avatar
        };
        ids.map( item => temp['projects/'+item+'/currentSprint/users/'+userId] = data);
    	this.rootRef.update(temp);
    }

    uploadAvatar(file){
        let key = Math.random()*1000000^0;
        let ref = this.storageRef.child('img/'+key+file.name);
        return new Promise(resolve => ref.put(file).then(response => resolve(response.downloadURL)));
    }

    getMyProjects(userId) {
    	let ref = this.rootRef.child('users/'+userId+'/my-projects');
    	return this._$firebaseArray(ref);
    }

    getProjects() {
        let ref = this.rootRef.child('projects');
        return this._$firebaseArray(ref);
    }
   
    addProject(projects, projectData, managerData){
    	projectData.lists = [
    		{
		      listId: 1,
		      listName: 'Backlog',
		      position: 0
		    },
		    {
		      listId: 2,
		      listName: 'To do',
		      position: 1
		    },
		    {
		      listId: 3,
		      listName: 'Closed',
		      position: 1000
		    }
    	];
        projectData.currentSprint.sprintNumber = 1;
        projectData.currentSprint.background = 'https://firebasestorage.googleapis.com/v0/b/portfolio-5e570.appspot.com/o/img%2F435530bg2-max.png?alt=media&token=13cdd15f-648d-4bd6-8c33-584561dde2ce';
        let self = this;
    	return projects.$add(projectData).then( rootRef => {
    		self.rootRef.update({
    		['users/'+projectData.currentSprint.managerId+'/my-projects/'+rootRef.key+'/projectName']: projectData.currentSprint.projectName,
            ['users/'+projectData.currentSprint.managerId+'/my-projects/'+rootRef.key+'/background'] : projectData.currentSprint.background,
            ['users/'+projectData.currentSprint.managerId+'/my-projects/'+rootRef.key+'/managerId'] : projectData.currentSprint.managerId,
            ['projects/'+rootRef.key+'/currentSprint/users/'+projectData.currentSprint.managerId]: managerData
    		});
            return rootRef;
    	});
    }

    updateProject(ids, projectId, data) {
        let temp = {
            ['projects/'+projectId+'/currentSprint/duration']: data.duration,
            ['projects/'+projectId+'/currentSprint/projectName']: data.projectName,
            ['projects/'+projectId+'/currentSprint/background']: data.background
        };
        ids.map( item => {
            temp['users/'+item+'/my-projects/'+projectId+'/projectName'] = data.projectName;
            temp['users/'+item+'/my-projects/'+projectId+'/background'] = data.background;
        });
        this.rootRef.update(temp);
    }

    deleteProject(userIds, projectId) {
        this.rootRef.child('projects').child(projectId).remove().then( rootRef => {
            userIds.map(userId => 
            this.rootRef.child('users/'+userId+'/my-projects').child(projectId).remove());
        });
        
    }

    addUserToProject(userId, projectId, userData, projectData) {
        this.rootRef.update({
            ['projects/'+projectId+'/currentSprint/users/'+userId]: userData,
            ['users/'+userId+'/my-projects/'+projectId]: projectData
        });
    }

    deleteUserFromProject(userId, projectId) {
        this.rootRef.child('projects/'+projectId+'/currentSprint/users').child(userId).remove().then( rootRef => {
            this.rootRef.child('users/'+userId+'/my-projects').child(projectId).remove()
        });
    }

    addExecutorsToTask(projectId, taskId, newUserId, taskData) {
        this.rootRef.update({
            ['users/'+newUserId+'/my-projects/'+projectId+'/myTasks/'+taskId]: taskData,
            ['projects/'+projectId+'/cards/'+taskId+'/executors/'+newUserId]: newUserId
        });
    }

    deleteExecutorFromTask(projectId, taskId, managerId, userId) {
        this.rootRef.child('projects/'+projectId+'/cards/'+taskId+'/executors').child(userId).remove().then( rootRef => {
            if(managerId !== userId)
                this.rootRef.child('users/'+userId+'/my-projects/'+projectId+'/myTasks').child(taskId).remove();
        });
        
    }

    getSprint(projectId) {
    	let ref = this.rootRef.child('projects/'+projectId+'/currentSprint');
    	return this._$firebaseObject(ref);
    }

    getSprintLists(projectId) {
    	let ref = this.rootRef.child('projects/'+projectId+'/lists').orderByChild('position');
    	return this._$firebaseArray(ref);
    }

    addList(lists, data) {
    	data.listId = Math.random()*1000000^0;
    	data.position = lists[lists.length - 2].position + 1;
    	return lists.$add(data);
	}

	deleteList(cardsToUpdate, projectId, listId) {
		let tempData = {};
		cardsToUpdate.forEach(item => tempData[item.$id + '/list_id'] = 3)
		this.rootRef.child('projects/'+projectId+'/cards').update(tempData).then( rootRef => {
            this.rootRef.child('projects/'+projectId+'/lists').child(listId).remove();
        });
	}

	getListCards(projectId) {
		let ref = this.rootRef.child('projects/'+projectId+'/cards');
    	return this._$firebaseArray(ref);
	}

	addCard(cards, data, managerId, projectId) {
		let self = this;
	    return cards.$add(data).then( rootRef => {
			self.rootRef.child('users').update({
            [managerId+'/my-projects/'+projectId+'/myTasks/'+rootRef.key+'/title']: data.title,
            [managerId+'/my-projects/'+projectId+'/myTasks/'+rootRef.key+'/priority']: data.priority,
    		});
            return rootRef;
		});
	}

	moveToList(fbCardId, listId, projectId){
        this.rootRef.child('projects/'+projectId+'/cards').update({
        	[fbCardId + '/list_id']: listId
        });
	}

    addUserToCard(fbCardId, projectId, user){
        this.rootRef.child('projects/'+projectId+'/cards').update({
            [fbCardId + '/user']: user
        });
    }

	changeListPosition(projectId, listId, indexPos){
        if(indexPos < 2) return;

        this.rootRef.child('projects/'+projectId+'/lists').update({
            [listId + '/position']: indexPos
        });
    }

    getTask(projectId, taskId) {
        let ref = this.rootRef.child('projects/'+projectId+'/cards/'+taskId);
        return this._$firebaseObject(ref);
    }

    getComments(projectId, taskId){
        let ref = this.rootRef.child('projects/'+projectId+'/cards/'+taskId + '/comments');
        return this._$firebaseArray(ref);
    }

    addComment(comments, newComment) {
        return comments.$add(newComment)
    }

    deleteComment($id, projectId, taskId) {
       this.rootRef.child('projects/'+projectId+'/cards/'+taskId +'/comments').child($id).remove();
    }

    editComment($id, projectId, taskId, commentText) {
       this.rootRef.child('projects/'+projectId+'/cards/'+taskId +'/comments').child($id).update({
         comment: commentText
       });
    }


    getTaskPromise(projectId, taskId){
        return this.rootRef.child('projects/'+projectId+'/cards/'+taskId).once('value').then(snapshot => snapshot.val());
    }

    getTaskExecutors(projectId, taskId) {
        let ref = this.rootRef.child('projects/'+projectId+'/cards/'+taskId+'/executors');
        return this._$firebaseArray(ref);
    }

    addToHistory(projectId, sprintNum, taskId, taskData, sprintData) {
        this.rootRef.child('projects/'+projectId+'/history/'+sprintNum).update({
            ['tasks/'+taskId] : taskData
        })
    }
    removeFromHistory(projectId, sprintNum, taskId) {
        this.rootRef.child('projects/'+projectId+'/history/'+sprintNum+'/tasks').child(taskId).remove();
    }

    addClosedToHistory(projectId, sprintNum, tasks) {
        let taskArr = Object.keys(tasks)
        taskArr.forEach(task => {
            this.rootRef.child('projects/'+projectId+'/history/'+sprintNum+'/tasks').update({
            [task] : tasks[task]
            });
        });
    }
    deleteClosedTasks(projectId, tasks, users) {
        let self = this;
        tasks.map(taskId => {this.rootRef.child('projects/'+projectId+'/cards').child(taskId).remove().then(rootRef => {
            users.map(userId => {
                self.rootRef.child('users/'+userId+'/my-projects/'+projectId+'/myTasks').child(taskId).remove();
            });
        })
    
    })}

    updateSprintData(projectId, closedSprintNumber, closedSprintData) {
        this.rootRef.child('projects/'+projectId).update({
            ['history/'+closedSprintNumber+'/sprintData'] : closedSprintData,
            'currentSprint/sprintNumber' : ++closedSprintNumber
        })
    }

    getHystory(projectId, limit) {
        let ref = this.rootRef.child('projects/'+projectId+'/history').limitToLast(limit);
        return this._$firebaseArray(ref);
    }
}
export default FireService;


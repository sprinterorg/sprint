import firebase from 'firebase/app';
class FireService {

    /*@ngInject*/
    constructor($firebaseArray, $firebaseObject) {
    	this._$firebaseArray = $firebaseArray;
    	this._$firebaseObject = $firebaseObject;
    	this.rootRef = firebase.database().ref();
    }

    createUser(data) {
        data.avatar = 'stub.jpg';
    	return this.rootRef.child('users').push(data);
    }

    getUser(userId) {
    	let ref = this.rootRef.child('users/'+userId);
    	return this._$firebaseObject(ref);
    }

    getAllUsers() {
        let ref = this.rootRef.child('users');
        return this._$firebaseArray(ref);
    }

    getProjectUsers(projectId) {
        let ref = this.rootRef.child('projects/'+projectId+'/users');
        return this._$firebaseArray(ref);
    }

    updateUser(ids, userId, data) {
        let temp = {
            ['users/'+userId+'/username']: data.username,
            ['users/'+userId+'/email']: data.email,
            ['users/'+userId+'/avatar']: data.avatar
        };
        ids.map( item => {
            temp['projects/'+item+'/users/'+userId] = data;
        });

    	this.rootRef.update(temp);
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
		      position: 0
		    },
		    {
		      listId: 3,
		      listName: 'Closed',
		      position: 100
		    }
    	];
        projectData.currentSprint.sprintNumber = 1;
        projectData.currentSprint.background = '';
        let self = this;
    	return projects.$add(projectData).then( rootRef => {
    		return self.rootRef.update({
    		['users/'+projectData.currentSprint.managerId+'/my-projects/'+rootRef.key+'/projectName']: projectData.currentSprint.projectName,
            ['users/'+projectData.currentSprint.managerId+'/my-projects/'+rootRef.key+'/background'] : projectData.currentSprint.background,
            ['projects/'+rootRef.key+'/users/'+projectData.currentSprint.managerId]: managerData
    		});
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
            temp['users/'+item+'/my-projects/'+projectId+'/background'] = data.background
        });
        this.rootRef.update(temp);
    }

    addUserToProject(userId, projectId, userData, projectData) {
        this.rootRef.update({
            ['projects/'+projectId+'/users/'+userId]: userData,
            ['users/'+userId+'/my-projects/'+projectId]: projectData
        })
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
		this.rootRef.child('projects/'+projectId+'/cards').update(tempData);
		this.rootRef.child('projects/'+projectId+'/lists').child(listId).remove();
	}

	getListCards(projectId) {
		let ref = this.rootRef.child('projects/'+projectId+'/cards');
    	return this._$firebaseArray(ref);
	}

	addCard(cards, data, userId, projectId) {
		data.id = Math.random()*1000000^0;
		data.priority = 2;
		let self = this;
		return cards.$add(data).then( rootRef => {
				return self.rootRef.child('users/'+userId+'/my-projects/'+projectId+'/myTasks/'+rootRef.key).update({
    		title: data.title,
    		priority: data.priority
    		}); 
		});
	}

	moveToList(fbCardId, listId, projectId){
        this.rootRef.child('projects/'+projectId+'/cards').update({
        	[fbCardId + '/list_id']: listId
        });
	}
}

export default FireService;


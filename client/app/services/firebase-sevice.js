class FireService {

    /*@ngInject*/
    constructor($firebaseArray, $firebaseObject) {
    	this._$firebaseArray = $firebaseArray;
    	this._$firebaseObject = $firebaseObject;
    	this.rootRef = firebase.database().ref();
    }

    createUser(data) {
    	return this.rootRef.child('users').push(data);
    }

    getUser(userId) {
    	let ref = this.rootRef.child('users/'+userId);
    	return this._$firebaseObject(ref);
    }

    updateUser(userId, data) {
    	this.rootRef.child('users/'+userId).update({
    		'username': data.username,
    		'password': data.password,
    		'email': data.email,
    		'avatar': data.avatar
    	});
    }

    getProjects() {
        let ref = this.rootRef.child('projects');
        return this._$firebaseArray(ref);
    }
   
    addProject(projects, data){
    	data.lists = [
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
    	data.currentSprint.duration = 14;
    	data.currentSprint.sprintNumber = 1;
    	return projects.$add(data);
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
		console.log(tempData)
		this.rootRef.child('projects/'+projectId+'/cards').update(tempData);
		this.rootRef.child('projects/'+projectId+'/lists').child(listId).remove();
	}

	getListCards(projectId) {
		let ref = this.rootRef.child('projects/'+projectId+'/cards');
    	return this._$firebaseArray(ref);
	}

	addCard(cards, data) {
		data.id = Math.random()*1000000^0;
		data.priority = 2;
		return cards.$add(data);
	}

	moveToList(fbCardId, listId, projectId){
        this.rootRef.child('projects/'+projectId+'/cards').update({
        	[fbCardId + '/list_id']: listId
        });
	}
}

export default FireService;


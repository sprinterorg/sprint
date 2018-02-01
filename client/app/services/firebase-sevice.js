class FireService {

    /*@ngInject*/
    constructor($firebaseArray) {
    	this._$firebaseArray = $firebaseArray;
    	this.rootRef = firebase.database().ref();
    	this.cards = [
    		{
		      id: 1,
		      title: 'Fix bug in player',
		      list_id: 1
		    },
		    {
		      id: 2,
		      title: 'Add feature with D3',
		      list_id: 1
		    },
		    {
		      id: 3,
		      title: 'Learn AngularJS',
		      list_id: 2
		    }
    	]
    }
    getProjects() {
        let ref = this.rootRef.child('projects');
        return this._$firebaseArray(ref);
    }
    addProject(projects, data){
    	data.duration = 14;
    	data.lists = [
		    {
		      listId: 1,
		      listName: 'To do',
		      position: 0
		    },
		    {
		      listId: 2,
		      listName: 'Closed',
		      position: 100
		    }
    	];
    	return projects.$add(data);
    }

    getSprintLists(projectId) {
    	let ref = this.rootRef.child('projects/'+projectId+'/lists').orderByChild('position');
    	return this._$firebaseArray(ref);
    }

    addList(lists, data) {
    	data.listId = Math.random()*1000000^0;
    	data.position = lists.length;
    	return lists.$add(data);
	}

	deleteList(projectId, listId) {
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


}

export default FireService;


class FireService {

    /*@ngInject*/
    constructor($firebaseArray) {
    	this._$firebaseArray = $firebaseArray;
    	this.rootRef = firebase.database().ref();
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
    	data.position = lists[lists.length - 2].position + 1;
    	return lists.$add(data);
	}

	deleteList(cardsToUpdate, projectId, listId) {
		let tempData = {};
		cardsToUpdate.forEach(item => tempData[item.$id + '/list_id']=1)
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
        this.rootRef.child('projects/'+projectId+'/cards').update(
			{[fbCardId + '/list_id']: listId}
		);
	}



}

export default FireService;


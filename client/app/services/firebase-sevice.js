class FireService {

    /*@ngInject*/
    constructor($firebaseArray) {
    	this._$firebaseArray = $firebaseArray;
    	this.rootRef = firebase.database().ref();
    	this.lists = [
		    {
		      id: 1,
		      listName: 'To do'
		    },
		    {
		      id: 2,
		      listName: 'Closed'
		    }
    	],
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
    syncProjects(projects, data){
    	return projects.$add(data)
    }

    getSprintLists() {
    	return this.lists;
    }

    addList(listName) {
  		this.lists.splice(this.lists.length-1,0,({
    		id: Math.random()*1000000^0,
    		listName: listName
  		}));
	}

	deleteList(list) {
		this.lists.forEach((item,index,arr) => {
			if(item.id == list.id) arr.splice(index, 1);
		});
		this.cards.forEach(item => { if(item.list_id === list.id) item.list_id = 1});
	}

	getListCards() {
		return this.cards;
	}

	addCard(listId, title) {
  		this.cards.push({
    		id: Math.random()*1000000^0,
    		title: title,
    		list_id: listId
  		});
  		console.log(this.cards)
	}


}

export default FireService;


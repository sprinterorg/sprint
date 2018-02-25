export default class sprintHeaderController {
    /*@ngInject*/
    constructor(fireBase, supportService) {

    }

    get projectName() {
        return this.project.projectName;
    }
    get currentSprint() {
        return '#'+this.project.sprintNumber;
    }

    get deadLine() {
        let date = (3600 * 24 * 1000 * (+this.project.duration)) + this.project.startTimeStamp;

        return new Date(date).toDateString();
    }

    cardsPriority(priority) {
        let arr1 = this.cards.filter( el => el.list_id !== 1 );
        let arr2 = arr1.filter( el => el.list_id !== 3 );
        let arr3 = arr2.filter( (el) => el.priority === priority);
        return arr3.length;
    }


}


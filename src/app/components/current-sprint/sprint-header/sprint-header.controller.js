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
        let arr = this.cards.filter( (el) => el.priority == priority);
        return arr.length;
    }


}


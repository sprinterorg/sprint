export default class myTasksComponent{
    /*@ngInject*/
     constructor(supportService) {
     	this._supportService = supportService;
     	this.priorities = {
            0: 'red',
            1: 'yellow',
            2: 'green',
            3: 'blue'
        }
    }

    cardCreatedDate(card) {
        let x = this._supportService.getFormattedDate(card.createdAt)
        return x;

    }
    cardCreatedTime(card) {
        let date = new Date(card.createdAt);
        date = date.toLocaleTimeString();
        return date.substring(0,date.length-6) + date.substring(date.length-3);
    }

    cardPrioriry(card) {
        return this.priorities[card.priority] || 'green';
    }
}


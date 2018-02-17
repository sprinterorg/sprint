export default class HystoryController {
    /*@ngInject*/
    constructor(fireBase, $stateParams, supportService) {
        this._fireBase = fireBase;
        this.projectId = $stateParams.project_id;
        this.showItems = 5;
        this.hystory = fireBase.getHystory(this.projectId, this.showItems);
        this._supportService = supportService;
    }
    
    getTasks() {
        let allTasks = {};
        for (let item of this.hystory) {
            let tasks = Object.keys(item.tasks);
            for (let task of tasks) {
                allTasks[item.tasks[task].title]=item.tasks[task];
            }
        }
        return allTasks;
    }
    
    arrowStart(start, end, key) {
        return start === Number(key);
    }

    arrowEnd(start, end, key) {
        return end === Number(key);
    }


    cellContent(start, end, key) {
        /*if(start === Number(key) && end === Number(key))
            return 'start     end';
        if (start === Number(key))
            return 'start';
        if (end === Number(key))
            return 'end';*/
        return '';

    }

    cellStyle(start, end, key) {
        if (start > Number(key))
            return '';
        if (start <= Number(key) && !end)
            return 'table__cell--opened';
        if(start === Number(key) && end === Number(key))
            return 'table__cell--closed';
        if(Number(key) <= end)
            return 'table__cell--closed';
        return '';
    }

    showMoreHystory() {
        this.showItems = this.showItems + 5;
        this.hystory = this._fireBase.getHystory(this.projectId, this.showItems);
    }

    showLessHystory() {
        this.showItems = this.showItems - 5;
        this.hystory = this._fireBase.getHystory(this.projectId, this.showItems);
    }

    getDate(ms) {
        if(ms)
            return this._supportService.getFormattedDate(Number(ms));
        return '';
    }

    getPersantage(data) {
        if(data)
            return data.tasksClosed/data.tasksTotal*100^0;
        return 0;
    }

    strokeDasharray(value) {
        return (value/100 * 2 * 25 * Math.PI) + ' ' + 2 * 25* Math.PI;
    }
}
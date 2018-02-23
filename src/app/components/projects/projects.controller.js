export default class projectsController {
    /*@ngInject*/
    constructor(fireBase, supportService, $state) {
        this._$state = $state;
        this.userId = supportService.getUserId();
        this.projects = fireBase.getProjects();
        this.myProjects = fireBase.getMyProjects(this.userId);
        this._fireBase = fireBase;
        this.manager = fireBase.getUser(this.userId);

        this.validateProjectName.bind(this);
        this.validateDuration.bind(this);
        this.formValidation.bind(this);

        this.duration = "";
        this.projectName = "";

        this.projectNameIsValid = true;
        this.projectNameLabel = 'project name';
        this.durationIsValid = true;
        this.durationLabel = 'duration of the sprint (in days)';

        this.FormIsValid = false;
    }

    validateProjectName(){
        if(!this.projectName || this.projectName.length> 50){
            this.projectNameIsValid = false;
            this.projectNameLabel = 'incorrect name length';
            return false;
        }
        else{
            this.projectNameIsValid = true;
            this.projectNameLabel = 'project name';
            return true;
        }
    }

    validateDuration(){
        console.log(this.duration);
        if(this.duration === undefined){
            this.duration = 0;
            this.durationIsValid = true;
            this.durationLabel = 'duration of the sprint (in days)';
            return true;
        }
        if(this.duration < 0 || isNaN(this.duration)){
            this.duration = 0;
            this.durationIsValid = false;
            this.durationLabel = 'invalid durration';
            return false;
        }   
        else{
            this.durationIsValid = true;
            this.durationLabel = 'duration of the sprint (in days)';
            return true;
        }
    }

    formValidation(){
        this.FormIsValid = this.validateProjectName() && this.validateDuration();
        return this.FormIsValid;
    }

    addProject () {
        if(this.formValidation() === true){
            let self = this;
            this.hideFunc();
            this._fireBase.addProject(this.projects, {currentSprint : { 
                projectName: this.projectName,
                managerId: this.userId,
                duration: ((this.duration === undefined ) ? 0 :this.duration),
                startTimeStamp: Date.now()
            }}, {
                username: this.manager.username,
                email: this.manager.email,
                avatar: this.manager.avatar
            }).then( rootRef => {
                self._$state.go('current-sprint', {project_id: rootRef.key});
            });
        }
        else{
            return;
        }
    }
}
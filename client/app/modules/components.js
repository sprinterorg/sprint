/*import angular from 'angular';*/
import cardsComponent from '../components/cards/cards.component';


const ComponentsModule = angular.module('app-components',[])
    .component('cardsList', cardsComponent);

export default ComponentsModule;
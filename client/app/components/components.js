import angular from 'angular';
import HelloWorldModule from './hello-world/hello-world.module';
import HelloHellModule from './hello-hell/hello-hell.module';

export default ComponentsModule = angular.module('app.components',[
       HelloWorldModule.name,
       HelloHellModule.name
]);

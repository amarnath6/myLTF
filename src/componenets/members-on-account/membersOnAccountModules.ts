///<reference path="../../../tools/typings/angularjs/angular.d.ts"/>

import angular from 'vendor/angular';
import 'lib/services/myaccount-services';
import createNgModule from 'lib/helpers/createNgModule';
import MembersOnAccountController from './MembersOnAccountController';

var moduleName: string = 'lt.membersOnAccount';

var module: ng.IModule = createNgModule(moduleName, MembersOnAccountController);

export { moduleName as moduleName };
export default module;

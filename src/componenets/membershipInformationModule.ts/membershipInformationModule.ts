///<reference path="../../../tools/typings/angularjs/angular.d.ts"/>

import angular from 'vendor/angular';
import 'lib/services/myaccount-services';
import createNgModule from 'lib/helpers/createNgModule';
import MembershipInformationController from './MembershipInformationController';

var moduleName: string = 'lt.membershipInformation';

var module: ng.IModule = createNgModule(moduleName, MembershipInformationController);

export { moduleName as moduleName };
export default module;

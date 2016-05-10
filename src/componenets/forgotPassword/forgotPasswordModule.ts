///<reference path="../../../tools/typings/angularjs/angular.d.ts"/>

import createNgModule from 'lib/helpers/createNgModule';
import ForgotPasswordController from './ForgotPasswordController';

var moduleName: string = 'lt.forgotPassword';

var module: ng.IModule = createNgModule(moduleName, ForgotPasswordController);

export { moduleName as moduleName };
export default module;

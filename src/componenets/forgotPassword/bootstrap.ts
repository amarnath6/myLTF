import $ from 'vendor/jquery';
import angular from 'vendor/angular';
import { moduleName } from './forgotPasswordModule';

var el: HTMLElement = $('#lt-account-forgot-password')[0];

$(() => {
	angular.bootstrap(el, [moduleName]);
});


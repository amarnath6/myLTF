import $ from 'vendor/jquery';
import angular from 'vendor/angular';
import { moduleName } from './membersOnAccountModule';

var el: HTMLElement = $('#lt-account-members-on-account')[0];

$(() => {
	angular.bootstrap(el, [moduleName]);
});


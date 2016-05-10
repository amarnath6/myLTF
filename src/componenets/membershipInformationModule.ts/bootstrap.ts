import $ from 'vendor/jquery';
import angular from 'vendor/angular';
import { moduleName } from './membershipInformationModule';

var el: HTMLElement = $('#lt-account-membership-information')[0];

$(() => {
	angular.bootstrap(el, [moduleName]);
});


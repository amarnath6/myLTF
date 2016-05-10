/// <reference path="myaccount-services.d.ts"/>
/// <reference path="../../../tools/typings/AEM/LtFramework.d.ts" />

import angular from 'vendor/angular';
import 'angular-resource';

declare var LtFramework: lt.Static;
declare var lt: {
	api: {
		account: string
	}
};

//var basePath: string = 'https://mnqaapp07z4.ltfinc.net:10255/myaccount/api';
var basePath: string;
if (typeof(lt) != 'undefined' && typeof(lt.api) != 'undefined' && lt.api != null && lt.api.account != null) {
    	basePath = lt.api.account;
} else {
	//basePath = '/api/myaccount';
	basePath = 'https://myaccountst.lifetimefitness.com/myaccount/api';
}

// SSO ID needs to be in the header of every request to My Account
var globalHeaders: Object = {
	'X-LTF-SSOID': (): string => {
		var store: lt.ProfileStore = <lt.ProfileStore> LtFramework.getStore('ProfileStore');
		return store.getInitialData().sso;
	}
};

angular.module('ltt.myaccount.api', ['ngResource'])

	.constant('MyAccountApiBasePath', basePath)

	.factory('ClubVisitResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IClubVisitResource => {
		return <MyAccountApi.IClubVisitResource> $resource(basePath + '/member/clubvisits', {}, {
	   query: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: true, method: 'GET'}
		});
	}])

	.factory('MembershipResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IMembershipResource => {
		var servicePath: string = basePath + '/membership';
        return <MyAccountApi.IMembershipResource> $resource(basePath + '/membership', {}, {
			get: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'GET'},
		});
	}])

	.factory('RecurringProductResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IRecurringProductResource => {
		var servicePath: string = basePath + '/recurringproducts';

		return <MyAccountApi.IRecurringProductResource> $resource(servicePath, {}, {
			query: <ng.resource.IActionDescriptor> {
				url: servicePath,
				headers: globalHeaders,
				isArray: true,
				method: 'GET'
			},
			// accepts a bool magazineOptIn parameter
			optInExperienceLife: <ng.resource.IActionDescriptor> {
				url: servicePath + '/magazine',
				headers: $.extend(true, {'Content-Type': 'application/x-www-form-urlencoded'}, globalHeaders),
				isArray: false,
				method: 'POST',
				// this transformRequest function converts the JSON request body created by ngResource to form params
				transformRequest: function(data) {
					if (data === undefined)
						return data;

					var clonedData = $.extend(true, {}, data);
					for (var property in clonedData)
						if (property.substr(0, 1) == '$')
							delete clonedData[property];

					return $.param(clonedData);
				}
			}
		});
	}])

	.factory('SessionPackageResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.ISessionPackageResource => {
		return <MyAccountApi.ISessionPackageResource> $resource(basePath + '/sessions', {}, {
			query: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: true, method: 'GET'},
			get: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'POST'}
		});
	}])

	.factory('SecurityQuestionResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.ISecurityQuestionResource => {
		return <MyAccountApi.ISecurityQuestionResource> $resource(basePath + '/securityquestions', {}, {
			query: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: true, method: 'GET'}
		});
	}])

	.factory('CountryResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.ICountryResource => {
		return <MyAccountApi.ICountryResource> $resource(basePath + '/countries', {}, {
			query: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: true, method: 'GET'}
		});
	}])

	.factory('UserResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IUserResource => {
		return <MyAccountApi.IUserResource> $resource(basePath + '/user', {}, {
			get: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'GET'}
		});
	}])

	.factory('UserAccountResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IUserAccountResource => {
		var servicePath: string = basePath + '/useridentity/account';

		return <MyAccountApi.IUserAccountResource> $resource(servicePath, {}, {
			activate: <ng.resource.IActionDescriptor> {
				url: servicePath + '/activate',
				headers: globalHeaders,
				isArray: false,
				method: 'POST'
			},
			create: <ng.resource.IActionDescriptor> {
				url: servicePath + '/create',
				headers: globalHeaders,
				isArray: false,
				method: 'POST'
			}
        });
	}])
    
    .factory('UserIdentityResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IUserIdentityResource => {
        var servicePath: string = basePath + '/useridentity';
        return <MyAccountApi.IUserIdentityResource> $resource(servicePath, {}, {
            validate: <ng.resource.IActionDescriptor> {
                url: servicePath + '/validate',
                headers: globalHeaders,
                isArray: false,
                method: 'POST'
            },
            save: <ng.resource.IActionDescriptor> {
                url: servicePath +'/resendActivation',
                headers: globalHeaders,
                isArray: false,
                method:'POST'
            }
        });
    }])

	.factory('UserAddressResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IUserAddressResource => {
		return <MyAccountApi.IUserAddressResource> $resource(basePath + '/addresses/:contactMethodId', {contactMethodId: '@contactMethodId'}, {
			get: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'GET'},
			query: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: true, method: 'GET'},
			create: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'POST'},
			save: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'PUT'},
			delete: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'DELETE'}
		});
	}])

	.factory('UserPhoneNumberResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IUserPhoneNumberResource => {
		return <MyAccountApi.IUserPhoneNumberResource> $resource(basePath + '/telephones/:contactMethodId', {contactMethodId: '@contactMethodId'}, {
			get: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'GET'},
			query: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: true, method: 'GET'},
			create: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'POST'},
			save: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'PUT'},
			delete: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'DELETE'}
		});
	}])

	.factory('UserEmailResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IUserEmailResource => {
		return <MyAccountApi.IUserEmailResource> $resource(basePath + '/user/email', {}, {
			get: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'GET'},
			save: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'PUT'}
		});
	}])

	.factory('EmergencyContactsResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IEmergencyContactsResource => {
		return <MyAccountApi.IEmergencyContactsResource> $resource(basePath + '/emergencycontacts', {}, {
			get: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'GET'},
			save: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'PUT'}
		});
	}])

	.factory('UserPasswordResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IUserPasswordResource => {
		return <MyAccountApi.IUserPasswordResource> $resource(basePath + '/user/password', {}, {
			save: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'PUT'}
		});
	}])

	.factory('CreditCardTypeResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.ICreditCardTypeResource => {
		return <MyAccountApi.ICreditCardTypeResource> $resource(basePath + '/paymentaccounts/cardTypeVals', {}, {
			query: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: true, method: 'GET'}
		});
	}])

	.factory('CreditCardPurposeResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.ICreditCardPurposeResource => {
		return <MyAccountApi.ICreditCardPurposeResource> $resource(basePath + '/paymentaccounts/cardPurposeVals', {}, {
			query: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: true, method: 'GET'}
		});
	}])

	.factory('AgreementResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IAgreementResource => {
		return <MyAccountApi.IAgreementResource> $resource(basePath + '/agreement/new/:contractTypeId/:paymentType', {}, {
			get: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'GET'}
		});
	}])

	.factory('SignedAgreementResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.ISignedAgreementResource => {
		return <MyAccountApi.ISignedAgreementResource> $resource(basePath + '/agreement/:agreementType/:agreementId', {}, {
			get: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'GET'}
		});
	}])

	.factory('UserPermissionsResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IUserPermissionsResource => {
		return <MyAccountApi.IUserPermissionsResource> $resource(basePath + '/permissions', {}, {
			get: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'GET'}
		});
	}])

	.factory('ForgotPasswordResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IForgotPasswordResource => {
		return <MyAccountApi.IForgotPasswordResource> $resource(basePath + '/useridentity/resetPassword', {}, {
			submit: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'POST'}
		});
	}])

	.factory('ForgotUsernameResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IForgotUsernameResource => {
		return <MyAccountApi.IForgotUsernameResource> $resource(basePath + '/useridentity/recoverUsername', {}, {
			submit: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'POST'}
		});
	}])

	.factory('UserPaymentAccountsResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IUserPaymentAccountsResource => {
		return <MyAccountApi.IUserPaymentAccountsResource> $resource(basePath + '/paymentaccounts/:accountId', {accountId: '@accountId'}, {
			get: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'GET'},
			query: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: true, method: 'GET'},
			create: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'POST'},
			save: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'PUT'},
			delete: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'DELETE'}
		});
	}])

	.factory('TransactionHistoryResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.ITransactionHistoryResource => {
		return <MyAccountApi.ITransactionHistoryResource> $resource(basePath + '/tran', {}, {
			query: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'GET'},
		});
	}])

	.factory('TransactionResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.ITransactionResource => {
		return <MyAccountApi.ITransactionResource> $resource(basePath + '/tran', {}, {
			get: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'POST'},
		});
	}])

	.factory('TransactionTypeResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.ITransactionTypeResource => {
		return <MyAccountApi.ITransactionTypeResource> $resource(basePath + '/tran/purchasetypes', {}, {
			query: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: true, method: 'GET'}
		});
	}])

	.factory('UserSecurityQuestionResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IUserSecurityQuestionResource => {
		return <MyAccountApi.IUserSecurityQuestionResource> $resource(basePath + '/user/securityquestion', {}, {
			save: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: false, method: 'PUT'}
		});
	}])

    .factory('MemberDetailsResource',['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IMemberDetailsResource => {
        var servicePath: string = basePath + '/membership';
        return <MyAccountApi.IMemberDetailsResource> $resource(servicePath, {}, {
           query: <ng.resource.IActionDescriptor> {headers: globalHeaders,url: servicePath +'/memberdetails', isArray: true, method: 'GET'},
           sign: <ng.resource.IActionDescriptor> {headers: globalHeaders,url: servicePath +'/signpartnerauth', isArray: false, method:'POST'},
		   term: <ng.resource.IActionDescriptor> {headers: globalHeaders,url: servicePath +'/termpartnerauth', isArray: false, method:'POST'}
        });
    }])

   .factory('AgreementHistoryResource', ['$resource', ($resource: ng.resource.IResourceService): MyAccountApi.IAgreementHistoryResource => {
       return <MyAccountApi.IAgreementHistoryResource> $resource(basePath + '/agreement/history', {}, {
           query: <ng.resource.IActionDescriptor> {headers: globalHeaders, isArray: true, method: 'GET'},
       });
   }]);
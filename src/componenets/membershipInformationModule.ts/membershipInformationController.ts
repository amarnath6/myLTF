/// <reference path="../../../tools/typings/AEM/LtFramework.d.ts" />
/// <reference path="../../lib/services/myaccount-services.d.ts" />
/// <reference path="../../../tools/typings/moment/moment.d.ts" />
/// <reference path="../../../tools/typings/lodash/lodash.d.ts" />

import moment from 'vendor/moment';
import _ from 'vendor/lodash';

import BaseAccountController from '../../lib/controllers/BaseAccountController';

declare var LtFramework: lt.Static;

export default class MembershipInformationController extends BaseAccountController {
    public static $inject: string[] = ['$scope', 'UserResource', 'MembershipResource'];

    public user: MyAccountApi.IUser;
    public membershipDetails: MyAccountApi.IMembership;

    private User: MyAccountApi.IUserResource;
    private Membership: MyAccountApi.IMembershipResource;

constructor($scope: ng.IScope,User: MyAccountApi.IUserResource, Membership: MyAccountApi.IMembershipResource) {
        super($scope);
        this.User = User;
        this.Membership = Membership;
    }
    /**
     * Triggered whenever SSO ID is available/changed
     */
        protected loadData(): void {
        // load My Account user details
        this.user = this.User.get();
        //membership details
        this.membershipDetails = this.Membership.get();

    }
}

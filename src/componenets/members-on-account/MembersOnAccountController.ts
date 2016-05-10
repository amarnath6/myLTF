/// <reference path="../../../tools/typings/AEM/LtFramework.d.ts" />
/// <reference path="../../lib/services/myaccount-services.d.ts" />

import BaseAccountController from '../../lib/controllers/BaseAccountController';

declare var LtFramework: lt.Static;

export default class MembersOnAccountController extends BaseAccountController {
    public static $inject: string[] = ['$scope', 'UserResource', 'MemberDetailsResource'];

    public user: MyAccountApi.IUser;
    public memberDetails: Array<MyAccountApi.IMemberDetails>;
    public generalError: string;
	public partnerAuthorized: boolean = false;
	public partnerAuthorizedAndAgreed: boolean = false;
	public partnerPrevAuthorized: boolean = false;
	public updatePartnerAuthError: string;
	public updatePartnerAuthSuccess: string;

    private User: MyAccountApi.IUserResource;
    private MemberDetails: MyAccountApi.IMemberDetailsResource;

	constructor($scope: ng.IScope, User: MyAccountApi.IUserResource, MemberDetails: MyAccountApi.IMemberDetailsResource) {
		super($scope);
		this.User = User;
		this.MemberDetails = MemberDetails;
	}

    public changePartnerAuthorization(authorize: boolean): void {
		if (authorize) {
			this.MemberDetails.sign(() => {
				this.updatePartnerAuthSuccess = 'Partner is now authorized';
				this.partnerPrevAuthorized = true;
			}, () => {
				this.updatePartnerAuthError = 'Server error while authorizing partner';
			});
		} else {
			this.MemberDetails.term(() => {
				this.updatePartnerAuthSuccess = 'Partner is now unauthorized';
				this.partnerPrevAuthorized = false;
				this.partnerAuthorizedAndAgreed = false;
			}, () => {
				this.updatePartnerAuthError = 'Server error while unauthorizing partner';
			});
		}
	}

    /**
     * Triggered whenever SSO ID is available/changed
     */
    protected loadData(): void {
        // load My Account user details
        this.user = this.User.get();

        // load member details
        this.memberDetails = this.MemberDetails.query(() => {
			// set initial state of the partner auth checkboxes
			this.partnerPrevAuthorized = this.isPartnerCurrentlyAuthorized();
			if(this.partnerPrevAuthorized) {
				this.partnerAuthorized = true;
				this.partnerAuthorizedAndAgreed = true;
			}
		}, () => {
			this.generalError = 'Server error while loading member details';
		});
	}

	private isPartnerCurrentlyAuthorized(): boolean {
		let partners: Array<MyAccountApi.IMemberDetails> = this.memberDetails.filter((detail) => {
			return detail.memberDetail.memberType === 'PARTNER';
		});

		return partners.length > 0 && !!partners[0].currentAgreement;
	}
}
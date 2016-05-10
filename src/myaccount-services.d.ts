/// <reference path="../../../tools/typings/angularjs/angular.d.ts" />
/// <reference path="../../../tools/typings/angularjs/angular-resource.d.ts" />

declare module MyAccountApi {
	interface ServiceFailureResponse {
		data: {
			validationErrors: [
				{
					key: string,
					message: string
				}
			]
		},
		status: number,
		statusText: string
	}

	interface IName {
		first: string;
		middle: string;
		last: string;
		prefix: string;
		suffix: string;
	}

	interface IGuestVisit {
		firstName: string;
		lastName: string;
		accessMethod: string;
		visitDateTime: string;
		clubId: number;
		memberId: number;
		employeeId: number;
		comment: string;
		promotionCode: string;
	}

	interface ICommunicationPreferenceOptOuts {
		mail: boolean;
		phone: boolean;
		magazine: boolean;
	}

	interface IGuestVisitDetails {
		period: string;
		numberOfGuests: number;
		totalUsedInPeriod: number;
		guestVisits: Array<IGuestVisit>;
	}

	interface IMembershipType {
		membershipTypeId: number;
		displayName: string;
		nonAccess: boolean;
	}

	interface IMemberContext {
		email: string;
		club: IClub;
		isPrimaryOrAuthorized: boolean;
		memberId: number;
		memberType: string;
		membershipId: number;
		membershipStatus: string;
		membershipType: IMembershipType;
	}

	interface IMembershipBalance {
		membershipId: number;
		memberId: number;
		eftAmount: string;
		committedBalance: string;
		currentBalance: string;
		lastAssessedDate: string;
	}

	interface IMembershipDues {
		membershipId: number;
		mainDues: string;
		jrDues: string;
		totalDues: string;
	}

	interface IClubVisit extends ng.resource.IResource<IClubVisit> {
		clubID: number;
		memberID: number;
		clubName: string;
		clubTimeZoneName: string;
		usageDate: string;
		usageDateTime: number;
		usageTime: string;
	}

	interface IMember {
		memberId: number;
		name: IName;
		memberType: string;
		birthDate: {
			dateStr: string;
		};
		birthDateDisplay: string;
		age: number,
		emailAddress: string;
		gender: string;
		joinDate: string;
		active: boolean;
		cofEligibleFlag: boolean;
		cofSelected: boolean;
		doNotEmail: boolean;


	}

    interface IMembership extends ng.resource.IResource<IMembership> {
		membershipId: number;
		clubId: number;
		type: string;
		typeId: number;
		status: string;
		activeDate: string;
		isActive: boolean;
		expirationDate: string;
		commPrefs: ICommunicationPreferenceOptOuts;
		guestVisitDetail: IGuestVisitDetails;
		membershipBalance: IMembershipBalance;
		membershipDues: IMembershipDues;
	    memberDetails: Array<IMember>;
    }

	interface IMemberDetails extends ng.resource.IResource<IMemberDetails> {
        memberDetail: IMember;
        currentAgreement: IAgreement;
        newAgreement: IAgreement
	}

	interface ITransactionType extends ng.resource.IResource<ITransactionType> {
		valId: number;
		description: string;
	}

	interface ICoordinates {
		latitude: number;
		longitude: number;
	}

	interface IMapInfo {
		clubId: number,
		coordinates: ICoordinates,
		mapCenterCoordinates: ICoordinates,
		distance: number,
		mapRegion: string,
		mapZoomLevel: number,
		mapXmlStateName: string

	}

	interface IClub {
		clubId: number,
		regionId: number,
		domainPrefix: string,
		name: string,
		activateDate: IWallClockDate,
		timeZoneName: string,
		presale: boolean,
		address: IAddress,
		phone: IPhoneNumber,
		formalClubName: string,
		level: string,
		membershipType: string,
		currencyType: string,
		mapInfo: IMapInfo,
		maxAgeJunior: number,
		maxAgeSecondary: number,
		activationString: string
	}

	interface ILineItem {
		department: string,
		productName: string,
		quantity: number,
		price: number,
		tax: number,
		total: number,
		status: string,
		shipping: string,
		tracking: string
	}

	interface ITransactionHistory extends ng.resource.IResource<ITransactionHistory>{
		warningCode: number;
		warningMessage: string;
		transactionList: Array<ITransaction>
	}

	interface ITransaction extends ng.resource.IResource<ITransaction> {
		tranId: number,
		partyId: number,
		memberId: number,
		clubId: number,
		tranSource: string,
		tranDate: string,
		tranTime: string,
		tranType: string,
		tranDescription: string,
		tranAmount: string,
		orderStatus: string,
		club: IClub,
		taxTotal: string,
		tip: string,
		subTotal: string,
		shippingCost: string,
		discount: string,
		itemCount: number,
		paymentMethodList: Array<number>,
		lineItemList: Array<ILineItem>
	}

	interface ITransactionTypeResource extends ng.resource.IResourceClass<ITransactionType> {}

	interface ITransactionHistoryResource extends ng.resource.IResourceClass<ITransactionHistory> {
	}

	interface ITransactionResource extends ng.resource.IResourceClass<ITransaction>{}

	interface IRecurringProduct extends ng.resource.IResource<IRecurringProduct> {
		membershipProductId: number;
		membershipId: number;
		memberId: number;
		clubId: number;
		productId: number;
		productName: string;
		productStatus: string;
		activationDate: string;
		terminationDate: string;
		monthlyFee: string;
		monthlyTaxAmount: string;
		totalMonthlyAmount: string;
		sessionsPerMonth: string;
		memberAssignedTo: string;
	}

	interface IRecurringProductResource extends ng.resource.IResourceClass<IRecurringProduct> {
		optInExperienceLife(params?: Object, success?: Function, error?: Function): angular.IPromise<void>;
	}

	interface ISession {
		deliveryDate: string;
		deliveryTime: string;
		employeeName: string;
		clubName: string;
		clubId: number;
	}

	interface ISessionPackage extends ng.resource.IResource<ISessionPackage> {
		packageId: number;
		productName: string;
		memberId: number;
		memberName: string;
		employeeId: number;
		employeeName: string;
		status: string;
		sessionsPurchased: number;
		sessionsAvailable: number;
		sessionPrice: string;
		purchaseDate: string;
		clubId: number;
		mmsTranId: number;
		sessionList: Array<ISession>;
	}

	interface ISessionPackageResource extends ng.resource.IResourceClass<ISessionPackage> {
	}

	interface ISecurityQuestion extends ng.resource.IResource<ISecurityQuestion> {
		display: string;
		value: string;
	}

	interface IUser extends ng.resource.IResource<IUser> {
		partyId: number;
		username: string;
		name: IName;
		timeoutMinutes: number;
		memberContext: IMemberContext;
	}

	interface IUserEmail extends ng.resource.IResource<IUserEmail> {
		emailAddress: string;
	}

	interface IUserPassword extends ng.resource.IResource<IUserPassword> {
        username: string;
		password: string;
	}

	interface IUserSecurityQuestion extends ng.resource.IResource<IUserSecurityQuestion> {
		question: string;
		answer: string;
	}

	interface IAddress {
		street1: string,
		street2: string,
		city: string,
		state: string,
		country: string,
		zipCode: string
	}


	interface IUserAccount extends ng.resource.IResource<IUserAccount> {
		accountType: string;
		firstName: string;
		lastName: string;
		dob: IWallClockDate;
		memberId: number;
		username: string;
		password: string;
		passwordConfirm: string;
		emailAddress: string;
		emailAddressConfirm: string;
		securityQuestion: string;
		securityQuestionAnswer: string;
		memberKey: string;
		returnUrl: string;

		$create(): angular.IPromise<IUserAccountCreatedResponse>;
		$create(params?: Object, success?: Function, error?: Function): angular.IPromise<IUserAccountCreatedResponse>;
		$create(success: Function, error?: Function): angular.IPromise<IUserAccountCreatedResponse>;
	}
    interface IUserIdentity extends ng.resource.IResource<IUserIdentity> {
        partyId: number;
        username: string;
        emailAddress: string;
        securityQuestion: string;
        activationKey: number;
        status: string;
        statusFromDate: IStatusFromDate;
        statusThruDate: IStatusFromDate;
    }     
    
    interface IUserAccountDetail {
        username: string;
        password: string;
    }
    interface IResendActivation {
        user : IUserAccountDetail,
        newEmail: string;
        confirmEmail: string;
    }
    interface IStatusFromDate {
         dateTimeStr: string;
         timeZoneDescription: string;
        
    }
    interface IUserIdentityResource extends ng.resource.IResourceClass<IUserIdentity> {
        validate(params?: Object,success?: Function,error?: Function):angular.IPromise<void>;
    
    }
    interface IUserAccountCreatedResponse {
		autoActivated: boolean;
	}

	interface IUserAccountResource extends ng.resource.IResourceClass<IUserAccount> {
		activate(params?: Object, success?: Function, error?: Function): angular.IPromise<void>;
	}

	interface IUserAddress extends ng.resource.IResource<IUserAddress> {
		name: IName;
		address: IAddress;
		fromDate: number;
		contactMethodId: number;
		personId: number;
		contextPartyId: number;
		addressLabel: string;
		isHousehold: boolean;

		$create(): angular.IPromise<IUserAddress>;
		$create(params?: Object, success?: Function, error?: Function): angular.IPromise<IUserAddress>;
		$create(success: Function, error?: Function): angular.IPromise<IUserAddress>;
	}

	interface IClubVisitResource extends ng.resource.IResourceClass<IClubVisit> {
	}

	interface IMembershipResource extends ng.resource.IResourceClass<IMembership> {
	}

	interface IUserResource extends ng.resource.IResourceClass<IUser> {
	}

	interface IUserAddressResource extends ng.resource.IResourceClass<IUserAddress> {
		create(): IUserAddress;
		create(data: Object): IUserAddress;
		create(success: Function, error?: Function): IUserAddress;
		create(data: Object, success: Function, error?: Function): IUserAddress;
		create(params: Object, data: Object, success?: Function, error?: Function): IUserAddress;
	}
    
	interface ICreditCardType extends ng.resource.IResource<ICreditCardType> {
		valId: number,
		description: string
	}

	interface ICreditCardTypeResource extends ng.resource.IResourceClass<ICreditCardType> {
	}

	interface ICreditCardPurpose extends ng.resource.IResource<ICreditCardPurpose> {
		valId: number,
		description: string
	}

	interface ICreditCardPurposeResource extends ng.resource.IResourceClass<ICreditCardPurpose> {
	}

    interface IAgreementSignDate{
            dateTimeStr: string;
            timeZoneDescription: string;
    }
	interface IAgreementKey {
	    Id: number;
		source: string;
	}

	interface IAgreement extends ng.resource.IResource<IAgreement> {
		agreementKey: IAgreementKey,
		agreementHtml: string,
		agreementType: string,
		agreementSummary: string,
		agreementSignature: string

	}
    interface IAgreementHistory extends ng.resource.IResource<IAgreementHistory>{
        agreementID: IAgreementKey;
        agreementStatus: string;
        agreementTypeName: string;
        agreementSignDate: IAgreementSignDate;
        terminationDate: IAgreementSignDate;
        facilitatorPartyID: number;
    }

	interface IAgreementResource extends ng.resource.IResourceClass<IAgreement> {
	}

	interface ISignedAgreementResource extends ng.resource.IResourceClass<IAgreement> {
	}

    interface IMemberDetailsResource extends ng.resource.IResourceClass<IMemberDetails> {
		sign(): void;
		sign(success: Function, error?: Function): void;
		term(): void;
		term(success: Function, error?: Function): void;
    }

    interface IUserPaymentAccount extends ng.resource.IResource<IUserPaymentAccount> {}

    interface IAgreementHistoryResource extends ng.resource.IResourceClass<IAgreementHistory> {
    }

    interface IMemberDetailsResource extends ng.resource.IResourceClass<IMemberDetails> {
		sign(): void;
		sign(success: Function, error?: Function): void;
		term(): void;
		term(success: Function, error?: Function): void;
    }

    interface IUserPaymentAccount extends ng.resource.IResource<IUserPaymentAccount> {
		viewOnly:boolean;
		type: string,
		purpose: string,
		accountId: number,
		accountLabel: string,
		accountName: string,
		accountNumber: string,
		cofMemberIds: Array<number>,
		expirationDate: string,
		bankName: string,
		routingNumber: string,
		bankAddress: IAddress,
		eftAgreement: IAgreementKey,
		cofAgreement: IAgreementKey

		$create(): angular.IPromise<IUserPaymentAccount>;
		$create(params?: Object, success?: Function, error?: Function): angular.IPromise<IUserPaymentAccount>;
		$create(success: Function, error?: Function): angular.IPromise<IUserPaymentAccount>;
	}

	interface IUserPaymentAccountsResource extends ng.resource.IResourceClass<IUserPaymentAccount> {
		create(): IUserAddress;
		create(data: Object): IUserAddress;
		create(success: Function, error?: Function): IUserAddress;
		create(data: Object, success: Function, error?: Function): IUserAddress;
		create(params: Object, data: Object, success?: Function, error?: Function): IUserAddress;
	}

	interface IEmergencyContact {
		membershipId: number;
		contactName: IName;
		contactPhone: IPhoneNumber;
	}

	interface IEmergencyContacts extends ng.resource.IResource<IEmergencyContacts> {
		primaryContact: IEmergencyContact;
		backupContact: IEmergencyContact;
		viewOnly: boolean;
	}

	interface IEmergencyContactsResource extends ng.resource.IResourceClass<IEmergencyContacts> {
	}

	interface IPhoneNumber {
		areaCode: string;
		prefix: string;
		suffix: string;
		type: string;
		valid: boolean;
	}

	interface IUserPhoneNumber extends ng.resource.IResource<IUserPhoneNumber> {
		telephoneLabel: string;
		telephone: IPhoneNumber;
		isMembershipPhone: boolean;
		doNotDelete: boolean;
		contactMethodId: number;
		contextPartyId: number;
		fromDate: number;
		isTextNumber: boolean;
		viewOnly: boolean;

		$create(): angular.IPromise<IUserPhoneNumber>;
		$create(params?: Object, success?: Function, error?: Function): angular.IPromise<IUserPhoneNumber>;
		$create(success: Function, error?: Function): angular.IPromise<IUserPhoneNumber>;
	}

	interface IUserPhoneNumberResource extends ng.resource.IResourceClass<IUserPhoneNumber> {
		create(): IUserPhoneNumber;
		create(data: Object): IUserPhoneNumber;
		create(success: Function, error?: Function): IUserPhoneNumber;
		create(data: Object, success: Function, error?: Function): IUserPhoneNumber;
		create(params: Object, data: Object, success?: Function, error?: Function): IUserPhoneNumber;
	}

	interface IUserEmailResource extends ng.resource.IResourceClass<IUserEmail> {
	}

	interface IUserPasswordResource extends ng.resource.IResourceClass<IUserPassword> {
	}

	interface IUserSecurityQuestionResource extends ng.resource.IResourceClass<IUserSecurityQuestion> {
	}

	interface ISecurityQuestionResource extends ng.resource.IResourceClass<ISecurityQuestion> {
	}

	interface IStateProvince {
		description: string;
		valId: number;
	}

	interface ICountry  extends ng.resource.IResource<ICountry> {
		description: string,
		stateList: Array<IStateProvince>,
		valId: number;
	}

	interface ICountryResource extends ng.resource.IResourceClass<ICountry> {
	}

	interface IForgotPassword extends ng.resource.IResource<IForgotPasswordResource> {}
	interface IForgotPasswordResource extends ng.resource.IResourceClass<IForgotPassword> {
		submit(data: Object): void;
		submit(data: Object, success: Function, error?: Function): void;
		submit(params: Object, data: Object, success?: Function, error?: Function): void;
	}

	interface IForgotUsernameRecoveryPararms {
		emailAddress: string;
		memberId: number;
		firstName: string;
		lastName: string;
		dob: IWallClockDate;
	}

	interface IForgotUsername extends ng.resource.IResource<IForgotUsername> {}
	interface IForgotUsernameResource extends ng.resource.IResourceClass<IForgotUsername> {
		submit(data: IForgotUsernameRecoveryPararms): void;
		submit(data: IForgotUsernameRecoveryPararms, success: Function, error?: Function): void;
		submit(params: Object, data: IForgotUsernameRecoveryPararms, success?: Function, error?: Function): void;
	}


	interface IUserPermissionsResource extends ng.resource.IResourceClass<IUserPermissions> {
	}

	interface IUserPermissions extends ng.resource.IResource<IUserPermissions> {
		membershipInformation: boolean,
		membershipContacts: boolean,
		clubUsages: boolean,
		packages: boolean,
		transaction: boolean,
		agreement: boolean,
		monthlyPayment: boolean,
		clubTab: boolean,
		recurrentProducts: boolean,
		updateMembership: boolean,
		updateContacts: boolean
	}

	interface IWallClockDate {
		dateStr: string;
	}
}

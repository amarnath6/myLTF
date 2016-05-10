{{#> _page breadcrumbs=false currentPage="Forgot Your Username?" }}
	{{#> _card icon="ico-user" }}
		<div class="col-md-offset-2 col-md-8 col-lg-offset-0 col-lg-4">
			<p class="card-text">
				No problem. Enter your current email address and either your member number or first and last names
				and date of birth, and we’ll email your username to you.
			</p>
		</div>

		<div class="col-xs-12 col-md-12 col-lg-8" ng-if="false">
			<span class="loading-spinner"></span>
		</div>

		<div class="col-xs-12 col-md-offset-2 col-md-8 col-lg-offset-1 col-lg-5 ng-cloak">
			<form novalidate ng-show="!ctrl.submitted" name="form" ng-submit="ctrl.submitRequest(form)">
				<div class="form-group">
					<label for="email-address">
						Email Address (required)
					</label>
					<input id="email-address"
					       name="email"
					       ng-model="ctrl.emailAddress"
					       lt-validate-email
					       class="form-control"
					       ng-class="{'is-invalid': form.email.$invalid && (form.$submitted || form.email.$touched)}"
					       required
					       type="text"
					       placeholder="Email Address (required)">
					<div ng-messages="form.email.$error" ng-show="(form.$submitted || form.email.$touched) && form.email.$invalid"
					     role="alert">
						<div ng-messages-include="error-messages"></div>
					</div>
					<small class="label-help">Example: name@domain.com</small>
				</div>
				<hr>
				<div class="form-group">
					<label for="memberId">
						Member Number
					</label>
					<input id="memberId"
					       name="memberId"
					       type="text"
					       ng-model="ctrl.memberId"
					       class="form-control"
					       ng-maxlength="9"
					       ng-class="{'is-invalid': form.memberId.$invalid && form.memberId.$touched}"
					       placeholder="Member Number">
					<div class="label-help">
						<small>
							You’ll find your 9-digit member number on the back of your Life Time membership card.
						</small>
					</div>
					<div ng-messages="form.memberId.$error" ng-show="form.memberId.$touched && form.memberId.$invalid"
					     role="alert">
						<div ng-message="maxlength" class="label-help-error">This field must be 50 characters or less.</div>
                        <div ng-messages-include="error-messages"></div>
					</div>
				</div>

				<div class="form-group row">
					<div class="col-xs-5 p-r-0">
						<hr>
					</div>
					<div class="col-xs-2 p-x-0">
						<p class="text-xs-center m-t-1"><strong>OR</strong></p>
					</div>
					<div class="col-xs-5 p-l-0">
						<hr>
					</div>
				</div>


				<div class="form-group">
					<label for="firstName">
						First Name
					</label>
					<input id="firstName"
					       name="firstName"
					       type="text"
					       ng-model="ctrl.firstName"
                           class="form-control"
					       ng-minlength="1"
					       ng-maxlength="50"
					       ng-class="{'is-invalid': form.firstName.$invalid && form.firstName.$touched}"
					       placeholder="First Name">
					<div ng-messages="form.firstName.$error" ng-show="form.firstName.$touched && form.firstName.$invalid"
					     role="alert">
						<div ng-message="maxlength" class="label-help-error">This field must be 50 characters or less.</div>
                        <div ng-messages-include="error-messages"></div>    
					</div>
				</div>

				<div class="form-group">
					<label for="lastName">
						Last Name
					</label>
					<input id="lastName"
					       name="lastName"
					       type="text"
					       ng-model="ctrl.lastName"
					       class="form-control"
					       ng-minlength="1"
					       ng-maxlength="50"
                           ng-class="{'is-invalid': form.lastName.$invalid && form.lastName.$touched}"
					       placeholder="Last Name">
					<div ng-messages="form.lastName.$error" ng-show="form.lastName.$touched && form.lastName.$invalid"
					     role="alert">
						<div ng-message="maxlength" class="label-help-error">This field must be 50 characters or less.</div>
                        <div ng-messages-include="error-messages"></div>
					</div>
				</div>

				<div class="form-group">
					<label for="dob">
						Birth Date
					</label>
					<input id="dob"
					       name="dob"
					       type="text"
					       ng-model="ctrl.dob"
					       class="form-control"
					       lt-validate-date-of-birth
					       ui-mask="99/99/9999"
					       ui-mask-placeholder
					       ui-mask-placeholder-char="_"
					       ui-options="{ clearOnBlur: false, clearOnBlurPlaceholder: true }"
					       model-view-value="true"
					       ng-class="{'is-invalid': form.dob.$invalid && form.dob.$touched}"
					       placeholder="Birth Date">
					<small class="label-help">MM/DD/YYYY</small>
					<div ng-messages="form.dob.$error" ng-show="form.dob.$touched && form.dob.$invalid"
					     role="alert">
						<div ng-message="parse" class="label-help-error">Sorry, that seems to be an invalid format.</div>
                        <div ng-messages-include="error-messages"></div>
					</div>
				</div>

				<div class="alert alert-danger alert-icon" ng-show="!ctrl
				.recoveryDataIsValid(form)">
					Please enter your member number OR your first name, last name and date of birth.
				</div>

				{{> _formInlineConfirmationMessages
				successBinding="ctrl.generalMessage"
				successExpression="ctrl.generalMessage"
				errorExpression="ctrl.generalError"
				errorBinding="ctrl.generalError" }}

				<button type="submit" class="btn btn-primary">Submit
				</button>
				<a class="btn btn-link btn-sm"
				   href="" ng-click="ctrl.cancel()">
					Cancel
				</a>
			</form>
			<div ng-show="ctrl.submitted">
				<h1>You’re almost done.</h1>
				<p>We emailed your username to this email address:</p>
				<p><strong ng-bind="ctrl.emailAddress"></strong></p>
				<p>
					The email might take a few minutes to arrive.  Don’t see it?  Check your email’s junk folder or
					promotions tab.  Didn’t receive it?
					<a href="#" ng-click="ctrl.submitRequest(form)">Click here to resend</a>.
				</p>
			</div>
			<p class="card-text p-t-2">
				Make sure to get messages about your account. Add
				<a href="mailto:mylt@emails.lifetimefitness.com">mylt@emails.lifetimefitness.com</a> to your email
				address book or safe sender list.
			</p>
		</div>
	{{/_card}}
{{/_page}}

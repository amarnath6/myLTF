{{#> _page breadcrumbs=false currentPage="Forgot Your Password?" }}
	{{#> _card icon="ico-user" }}
		<div class="col-md-offset-2 col-md-8 col-lg-offset-0 col-lg-4">
			<p class="card-text">
				No sweat. Just enter your username or member number and email address and we’ll email you a new one.
			</p>
		</div>

		<div class="col-xs-12 col-md-12 col-lg-8" ng-if="false">
			<span class="loading-spinner"></span>
		</div>

		<div class="col-xs-12 col-md-offset-2 col-md-8 col-lg-offset-1 col-lg-5 ng-cloak">
			<form ng-show="!ctrl.submitted" name="form" ng-submit="ctrl.submitRequest(form)">
				<div class="form-group">
					<label for="username">
						Username or Member Number
					</label>
					<input id="username"
					       name="username"
					       type="text"
					       ng-model="ctrl.username"
					       class="form-control"
					       required
					       ng-class="{'is-invalid': form.username.$invalid && form.username.$touched}"
					       placeholder="Username">
					<div ng-messages="form.username.$error" ng-show="form.username.$touched && form.username.$invalid"
					     role="alert">
						<div ng-message="required" class=label-help-error>Please enter your username.</div>
                        <div ng-messages-include="error-messages"></div>
					</div>
				</div>
				<div class="form-group">
					<label for="email-address">
						Email Address
					</label>
					<input id="email-address"
					       name="email"
					       ng-model="ctrl.emailAddress"
					       ng-blur="ctrl.validateEmail(form.email, ctrl.emailAddress)"
					       class="form-control"
					       ng-class="{'is-invalid': form.email.$invalid && form.email.$touched}"
					       type="text"
					       placeholder="Email Address">
					<div role="alert" ng-bind="ctrl.emailErrorMessage" class="label-help-error ng-cloak" ng-show="ctrl
					.emailErrorMessage">
					</div>
					<small class="label-help">Example: name@domain.com</small>
				</div>

				{{> _formInlineConfirmationMessages
				successBinding="ctrl.generalMessage"
				successExpression="ctrl.generalMessage"
				errorExpression="ctrl.generalError"
				errorBinding="ctrl.generalError" }}

				<button ng-disabled="form.$invalid || form.$pristine" type="submit" class="btn btn-primary">Submit
				</button>
				<a class="btn btn-link btn-sm"
				   href="" ng-click="ctrl.cancel()">
					Cancel
				</a>
			</form>
			<div ng-show="ctrl.submitted">
				<h1>You’re almost done.</h1>
				<p>We emailed a new password to this email address:</p>
				<p><strong ng-bind="ctrl.emailAddress"></strong></p>
				<p>
					The email might take a few minutes to arrive. Don’t see it?  Check your email’s junk folder or
					promotions tab.  Didn’t receive it? <a href="#" ng-click="ctrl.submitRequest(form)">Click here to resend</a>.
				</p>
			</div>
			<p class="card-text p-t-2">
				Make sure to get messages about your account. Add <a href="mailto:mylt@emails.lifetimefitness.com">mylt@emails.lifetimefitness.com</a> to your email
				address book or safe sender list.
			</p>
		</div>
	{{/_card}}
{{/_page}}

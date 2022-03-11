# Covid19Application

COVID TRACING APPLICATION


## Group ##
	- UG Group 20 | The Fellas

## Group members ##
	+ Aqmal Pulle (a1720825)
	+ Haard Shah (a1797163)
	+ Shae Haggis (a1747701)
	+ Vinay Kumar (a1802961)

$$ For testing $$
	+ Use email and password that has been provided in the comments section of the submission.
			- This account has access to all 3 login types.
	+ Alternatively create a new account, try signing up as a venue manager (optionally)
	+ Admins cannot sign up using typical create account process, their account must be created via already signed up admin
	+ Some venue ID to test:
		- 1000, 1001, ... , 1011
		- You can see the address and venue names via check-in history and or hotspots
		- You can test these venues by using the ID's to check-in (for user), create and manage hotspots (for admin).

## App description/features ##
	+ A fully fledged web application which features a robust COVID-19 tracing system.

	+ Ability to sign up and log in as a user in order to:
		- Manage their user information
		- Check-in to locations by entering check-in code (venue id) that is supplied by the venue. (code is synonymous with venue ID in database).
		- View their check-in history in a table
		- Filter their check-in history results using provided toggles
		- View their check-in history on a map
		- See current hotspots on a map

	+ Ability to sign up and log in as a venue manager in order to:
		- Manage their venue information
		- View the check-in history for their venue
		- Filter these check-in results using the provided filters
		- View active hotspots on a map

	+ Ability for an admin/health official to log in, to:
		- Manage their personal user information
		- Create and manage hotspot areas/venues & timeframes
		- View the check-in history for users and venues
		- See current hotspots on a map
		- Manage Users/Venues (delete accounts and venues that are inactive)
		- Sign-up other Health Officials and give them permissions

	+ Ability for users/venue managers to choose to link their Google account for authentication

	+ Accessibilty feature
		- Tooltips are provided when doing check-in history for admin, while hovering over user and venue IDs

## Special feature ##
	+ Users can request that email notifications be sent to them that includes the list of current hotspots
	+ The email comes from > covidtracerapplication@gmail.com
	+ The frequency of these emails is decided by the admins via the 'send alerts' button



## How to use? ##
	+ How to start the web application?
		- Ensure server is running
		- Ensure .sql file --> covidDatabaseFinal.sql has been imported into mysql server
			> If any issues occur with this database, use covidDatabaseFinal_Backup.sql
		- Navigate to the login page, via the link https://ide-addf9a0fbc8f4d6ebbd6f1dbc05bd5ed-8080.cs50.ws/


	+ How to operate as a user?
		- Signing up
			> Click "create account"
			> Fill in your details within the given input fields. All input fields must be filled in, in order to successfully create an account.
			> Tick the "receive email notifications for current hotspots" checkbox. (optional)
			> Leave the "sign up as a venue manager" box unchecked.
			> Read through the terms and conditions and agree to the terms and conditions by clicking the respective checbox.
				> This checkbox must be ticked in order to successfully create an account.
			> Click the submit button.
			> The new user will be redirected to the user home page
		-Logging in (with email and password)
			> Fill in the email and password box with the credentials you used when signing up.
			> Select the "user" radio box.
			> Click the login button.
		-Logging in (with Google)
			> Select the "user" radio box.
			> Click "sign in".
			> Enter in your credentials for your Google account.
			> Click next.
		- Navigating through the homepage
			> The map displayed shows all the different hotspots that are currently active
			> The dashboard on the left ensures swift navigation throughout the application.
				> Home icon takes you to the user homepage.
				> Profile icon takes you to the page for updating and viewing personal information.
				> History icon takes you to a page where recent check-ins can be viewed either by map or in a table format.
				> Logout icon signs you out of the application.
			> The FAQs on the right display link to various government websites for assistance in finding important information related to COVID-19.
			> Check-in
				> Enter the venue ID supplied by the venue into the input field.
					>venue ID must be 4 integers and must be a valid ID, if not, the system will not register the check in.
				> Venue managers will be supplied with this ID by the admins of this application. They must give this ID to customers/visitors.
				> Click check in.
		- Edit profile
			> Click on profile icon on the dashboard.
			> Currently displays the current personal information
			> Information currently in the database is pre-entered in the fields.
			> To edit, simply amend the desired field and click submit.
		- Check-in history (table)
			> Click on history icon on the dashboard.
			> Currently, it will show you all your check-ins in a table.
			> Use the toggles and input fields provided to narrow down information, and click refine search. Check-in results will update respectively.
		- Check-in history (map)
			> Click on history icon on the dashboard.
			> Click "view all check-ins on map". This will show you all your check-ins represented by blue pins.


	+ How to operate as a venue manager?
		- Signing up
			> Click "create account"
			> Fill in your details within the given input fields. All input fields must be filled in, in order to successfully create an account.
			> Tick the "receive email notifications for current hotspots" checkbox. (optional)
			> Tick the "sign up as a venue manager" checkbox.
			> Read through the terms and conditions and agree to the terms and conditions by clicking the respective checbox.
				> This checkbox must be ticked in order to successfully create an account.
			> Click the submit button.
			> This new venue manager account also has access to a user account.
		-Logging in (with email and password)
			> Fill in the email and password box with the credentials you used when signing up.
			> Select the "venue manager" radio box.
			> Click the login button.
		-Logging in (with Google)
			> Select the "venue manager" radio box.
			> Click "sign in".
			> Enter in your credentials for your Google account.
			> Click next.
		- Navigating through the homepage
			> The map displayed shows all the different hotspots that are currently active
			> The dashboard on the left exists for navigation throughout the application.
				> Home icon takes you to the venue manager homepage.
				> Profile icon takes you to the venue manager personal information.
				> History icon takes you to the check-in history for the venue.
				> Logout icon logs you out of the application.
			> The FAQs on the right display link to various government websites for assistance in finding important information related to COVID-19.
			> Manage venue information
				> Click "manage venue information"
				> Currently, it will show the current venue information.
				> To edit, simply amend the desired field and click submit.
				> The venue ID will also be shown, which you cannot edit.
		- Edit profile
			> Click on profile icon on the dashboard.
			> Currently displays the current personal information
			> To edit, simply amend the desired field and click submit.
		- Check-in history for the venue
			> Click on history icon on the dashboard.
			> Currently, this shows the all customers who have checked-in/visited your venue.
			> Use the toggles and input fields provided to narrow down information, and click refine search. Check-in results will update respectively.



	+ How to operate as an admin/health offical?
		-Logging in (with email and password)
			> Fill in the email and password box with the credentials you used when signing up.
			> Select the "health official" radio box.
			> Click the login button.
		-Logging in (with Google)
			> Select the "health official" radio box.
			> Click "sign in".
			> Enter in your credentials for your Google account.
			> Click next.
		- Navigating through the homepage
			> The map displayed shows all the different hotspots that are currently active.
			> The dashboard on the left exists for navigation throughout the application.
				> Home icon takes you to the admin/health official homepage.
				> Profile icon takes you to the admin/health official personal information.
				> History icon takes you to the check-in history, in which you can search for all check-in history for any person or venue.
				> Logout icon logs you out of the application.
			> Manage hotspots
				> Click "manage hotspots"
				> Onload, it will display all the currently active hotspots.
			> Create hotspots
				> Click "create hotspot".
				> Enter in the venue ID, start date and start timeframe and click "create hotspot".
				> You should now be able to see the hotspot on the map on the homepage.
			> Send alert
				> Click "send alert"
				> This will send an email to all registered users of this app, who have the "receive email notifications for current hotspots" checkbox ticked.
			> Sign-up admin/health official
				> Click "sign up admin"
				> Fill in the details within the given input fields. All input fields must be filled in, in order to successfully create an account.
				> Tick the "receive email notifications for current hotspots" checkbox. (optional)
				> Read through the terms and conditions and agree to the terms and conditions by clicking the respective checbox.
					> This checkbox must be ticked in order to successfully create the account.
				> Click the submit button.
				> Once the health offical account has been created, this new health official account has privileges for both a user and a health official.
			> Manage venue/users
				> Click "manage venue/user
				> If you want to delete a venue, you can put in the respective venue ID, and click "delete venue".
				> Similarly, if you want to delete a user, click "switch to user", and then you can put in their respective user ID, and click delete user.
				>>NOTE: Admins and health officials are only allowed to delete users and venues when they are unused.
					The  user account cannot be deleted off the system if a user has used that account to check-in to any venue,
					the venue account also cannot be deleted off the system if a user has checked into that venue or that venue has
					been made a hotspot. This is done so that any checkin or hotspot information is stored for tracing purposes
					if necessary.

		- Edit profile
			> Click on profile icon on the dashboard.
			> Currently displays the current personal information
			> To edit, simply amend the desired field and click submit.
		- Check-in history for users and venues
			> Click on history icon on the dashboard.
			> Here you can search for check-in history for any person or venue.
			> Additional search filters can be revealed that relate to address information by clicking the "search by address button".
				>>NOTE: The original toggles that were filled in will still remain in the seach query even though they are hidden by pressing the button.
			> When results are displayed, hover the mouse over the user ID and venue ID to reveal more information about the check-in.

	+ Receiving emails
		- If the user, venue manager and admin/health official has opted in to receive emails about current hotspots
			> They should receive an email with current hotspots everytime the admin/health official clicks "send alert" on their homepage.




## License ##
	+ Copyright © 2021 The Fellas Inc. All Rights Reserved.




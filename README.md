This project is cloned and republished, because the orginally repository is created by NTNUs GitHub Classroom. That repo is private and forking is disable. I collaborated with two fellow students. 

# INITIALIZE

To start the project run "npm run starter" in the root of the project /idg2100_exam .
This will do npm i in all the required places and initialize the project.
Firstly it runs initialize.js which starts the database using a Mongomemory server,
then it creates an env file and puts the newly created mongo uri in there.
At the end of the script it starts up the backend, so that the backend has access to the .env file.

At the same time as the database is initialized, the frontend is started concurrently.
Lastly it should automatically open the website on localhost.
The database can be accesed in mongodbCompass using the Mongo_url variable in the .env file,
a new uri is generated each time starter is run.

# USERS

The database has seven users with different roles. Here are their roles and username / password.

## admin

### carlos / password

### admin / password

## Users(verified)

### havala / password

### trymnene / password

### ingrid / password

### simen / password

## unverified

### ingird / password

# Register

On the register page, only the red fields with the star are mandatory.
If you input a valid email, you will recieve an email from our email "ntnuppl@outlook.com".
Ntnu email addresses do not work, as they are blocked.
Clicking the link in the email will make you verified and your role wil be updated to user.
Now you can play using our site!

## Forgotten password

If you forget your password, you can click "forgotten password" on the login page.
This will send you an autogenerated password on mail, and the database is updated with the same password.

# Playing a match

It is just users, with the role Users, that can play a match. Admin or Unverified does not have access.
You can choose to play a match where both players add their own points on different devices using socket
or add the points of both players on one device using the webcomponent from oblig 1.

## Socket

To play a match using socket locally you need to use two different browsers, with different users.
Both users need to be on the socket page, which you can find in the header.
Then one user should host a match and the other joins the match by typing the username of the host.
After playing the match both users have to enter their password to verify the results.
After inputting the passwords the match is created.
Sometimes the password input only shows for one player, in that case the password input will show after the other player enters their password.

## Webcomponent

To play using the webcomponent click new match, and enter the username of who you are playing against, player 2 must also be a 'User'.
After playing the match both users have to enter their password to verify the results.
After inputting the passwords the match is created.

# Admin

Admins have access to the admin page where they can edit users.
On the singular match page, they can delete or edit matches
They do not however have access to the profile page, and they can not play matches.

# Favourites

On the Players page you can add or remove favourites by clicking on the star.
The star will be yellow if you have favorited the player, and grey if not.
Favourites can be viewed on the profile page.

# Matches

Users can see their own matches on the Matches page.
Clicking on the match number in the top right brings you to the page of that match.
Admins can see all matches.

# Storybook

To access storybook do npm run storybook from either root or /frontend

## More details can be found in the report

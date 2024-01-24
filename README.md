# Le Prestige Hall UI.

This is the UI (User Interface) for [Le Prestige Hall, Inc](https://www.leprestigehall.net).


# Pre-requisite

* A standalone configured Keycloak app version 20.0.3 or higher.
* An instance of the API runing. For more info, visit https://github.com/Zinphraek/Event-Venue-API-

## Quick start.

* Lunch the keycloak instance on port 8080 and log in to the admin console; visit https://www.keycloak.org/getting-started for more information.
* Create a new realm titled: `LePrestigeHall`
* Create a UI client with id `le-prestige-hall-ui`
* In the web origin section enter `http://localhoast:3000`
* On the advanced setting section, locate `Proof Key for Code Exchange Code` (PKCE) and set it to `S256`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### Notes:

This repository is the UI for Le Prestige Hall and is still being refined.
The application hasn't been deployed yet, but this section will be upadated once it live.

A cloned version stripped of sensitive data of the backend repository can be found at https://github.com/Zinphraek/Event-Venue-API-


## UI Screenshots and Demo.

### Screenshots.


#### Home page
![Home_Page_](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/09a72d70-8976-497d-8fa4-54cd5e37ff56)

### 
![Home_Page](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/d9ed400a-7ccf-454f-9501-62e9b968d5cd)


#### Services page.
![Service_page](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/bcb1967f-c98f-42ec-90b7-98081ccd95ff)


#### About us page
![About_Page](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/fe1bac92-af27-40eb-9b6b-189b54c7ad31)


#### Contact us page
![Contact_Us_page](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/68b2488a-9792-4ed8-8f47-c6f061a2ea73)


#### Review Page
![Review_Page](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/c5c5aeb7-b099-4767-93a0-fc3db912fced)


#### Event page
![Event_Page](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/5402354d-6a4f-4c1b-9ab2-c601a2092189)

### An Event
![Event](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/73179912-f25c-4bb6-b4cd-0300480135a2)


#### Appointment Booking Page
![Booking_Page_Appointment](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/a6e579a4-066b-4fe4-974d-39387c530bb6)

#### Reservation Booking Page
![Booking_Page_Reservation](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/7ed33302-94be-44ed-ace5-44b76f0b09da)


#### Account - Profile Screen
![Account_Page_Profile](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/92f54763-0582-4f2b-8eda-060036db96cb)



#### Account - Appointment Screen
![Account_Page_Appointment](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/3196c481-9536-4bb9-bc23-4c85031a5c5b)

####
![Account_Page_Appointment](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/9e04f590-ef07-45c1-a233-0efa096564e5)


#### Account - Reservation Screen
![Account_Page_Reservation](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/14127c61-e6ae-409e-87fb-0bf7365e3a45)


#### Account - Invoice Screen
![Account_Page_Invoice](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/ae549943-1241-4b47-a62e-299b76ed00b5)


#### A Protected page when user is unauthenticated.
![Protected_page](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/88114f29-0220-4bfa-908f-7df870b2f017)


#### Not Found page
![NotFoundPage](https://github.com/Zinphraek/Event-Venue-UI/assets/89105588/192245ef-db7f-4cf5-81f7-27a3e60aaa2a)



### Video Demo.
[Live Demo Recording](https://youtu.be/tLVCX4106_s)

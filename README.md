# Le Prestige Hall UI Demo.

The live demo can be accessed [here.](https://jolly-mushroom-07a20c60f.4.azurestaticapps.net)


# Pre-requisite

* A standalone configured Keycloak app version 20.0.3 or higher.
* An instance of the API runing. For more info, visit https://github.com/Zinphraek/Event-Venue-API-Demo

## Quick start.

* Lunch the keycloak instance on port 8080 and log in to the admin console; visit https://www.keycloak.org/getting-started for more information.
* Create a new realm titled: `EventVenueDemo`
* Create a UI client with id `event-venue-ui-demo`
* In the web origin section enter `http://localhoast:3000`
* On the advanced setting section, locate `Proof Key for Code Exchange Code` (PKCE) and set it to `S256`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Tests

No tests have been implemented yet.


## UI Screenshots and Demo.

### Screenshots.


#### Home page
![Home_Page_](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/f32752ef-f0f1-4e4d-9fb0-aea126314cee)


### 
![Home_Page](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/ddb72cff-8b32-45e1-9aaf-63c29c986f23)



#### Services page.
![Service_page](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/ddbada42-ade8-40ad-ad98-c2c24ee7a801)



#### About us page
![About_Page](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/c2f077ae-bf0c-4f0d-abb1-8d4336a29911)



#### Contact us page
![Contact_Us_page](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/d3ae8108-7422-4301-9d1c-3d068e2bdb14)



#### Review Page
![Review_Page](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/975f91ac-3676-47fc-b9ed-ea5a019b26c2)



#### Event page
![Event_Page](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/ef119992-5c38-4aee-8c42-ca502bc40b98)


### An Event
![Event](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/f90ba28a-0a04-462b-84b3-becd230a3755)


#### Appointment Booking Page
![Booking_Page_Appointment](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/14794cbc-8f1b-4807-9ea3-69d731160cde)


#### Reservation Booking Page
![Booking_Page_Reservation](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/d9e36e40-3a36-4b17-aaea-d111dd7bf702)


#### Account - Profile Screen
![Account_Page_Profile](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/fadf66ab-c875-4b5e-964e-d37d29670abb)



#### Account - Appointment Screen
![Account_Page_Appointment](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/6b6ffb27-4f42-4bd8-8e47-07acd143ee8c)

#### Account - Reservation Screen
![Account_Page_Reservation](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/8bde7d2c-473c-46e2-ba7c-b9c96debc5a8)


#### Account - Invoice Screen
![Account_Page_Invoice](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/1a6dd488-41f2-4464-b581-656b0f8d0ea0)


#### A Protected page when user is unauthenticated.
![Protected_page](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/eb0bf16a-8c74-443b-86b3-308a1014b29a)


#### Not Found page
![NotFoundPage](https://github.com/Zinphraek/Event-Venue-UI-Demo/assets/89105588/fbbfe730-ece1-4f50-a43b-95ce56c4e3f9)




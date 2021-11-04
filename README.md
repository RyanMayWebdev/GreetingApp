# GreetingApp

## What is it?
A greeting app coded in HTML, CSS, JS, Node and Express.
This is a simple project that I made in order to present a user with the current time, weather in their location as well as some inspirational quotes and beautiful images.
It is very similar to extensions that can be found for most web browsers for when you open a new tab, giving you a quick insight into the day.

## How does it work?
When the user visits the page, they are asked for permission to use their location. IF they provide acces, theyre longitiude and laititude are stored to variables.
The frontend JS will then make several fetch calls to the backend with these location data, as well as to request a quote and a background image. 
The backend will listen for these calls on several different paths and then use these location coordinates to make an API call to the Open Weather aPI to provide them with the current weather as well as to return the city they are in. 
This will be expanded upon in order to give the weekly forecast as well as additional whether details through an expandable info section.
The backend will also make api calls to Unsplash for a background that is relelvant to the time of day. Additionally, a call to the quoteGarden API is made in order to get an inspirational quote.
These API calls were performed on the backend in order to secure the data being sent, such as location and api keys. 

## Challenges
Some challeneges while developing this is that using front end only technologies it's difficult to not reveal an api key while hosting on Netlify for example. Even with environmental variablers, they get baked into the code at build time.
I decided in order to prevent this from happening I would create a simple backend that would make these request for me as well as keep things secure.
This required me to learn about Node and Express which I managed to do in an afternoon and write the backend for this application. Some basic error handling is performed
and the use of modules was done in order to keep logic and calls separated from the main server application.

## What's to come?
I would like to expand upon this project by adding more detailed weather information, as well as the weekly forecast. Additionally, the styling needs to be enhanced and mobile 
responsiveness needs to be completed. This is a work in progress in my spare time and I liek to tackle the structure and logic before I get into styling.

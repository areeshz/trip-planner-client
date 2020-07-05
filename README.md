# Trip Planner Client Application

Trip Planner is a full-stack application that allows users to both log information about past trips taken, and plan upcoming trips. Users can also plan or keep a log of events that occur on a trip.

## Links
Client Application: [https://areeshz.github.io/trip-planner-client/](https://areeshz.github.io/trip-planner-client/)
Trip-Planner API: [https://areeshz-trip-planner.herokuapp.com/](https://areeshz-trip-planner.herokuapp.com/)
Back-End Repository: [https://github.com/areeshz/trip-planner-server](https://github.com/areeshz/trip-planner-server)

## Technologies Used

Front End
- JavaScript
- jQuery
- Bootstrap
- HandlebarsJS
- HTML
- CSS
- Sass

Back End
- Node.js
- Express.js
- MongoDB
- Mongoose

## Planning and Problem Solving

Planning for this project started by determining the different features and user-actions needed for functionality of the application. Each feature or user action was given its own "page" or section on this Single Page Application. I implemented the "pagination" of these different features as I created them, and this enabled me to fine tune the user experience during the development process instead of after the basic features were fully implemented. Certain features such as displaying all trips recorded by a user and displaying all events associated with a trip were templated in Handlebars, which allowed for a degree of customization of the pages depending on how many trips a user had logged. The most challenging portion of building the front-end was creating the forms for editing a trip or event, since it included fetching the data for that trip or event and presenting the user with an interface to edit the data without being too far removed from their trip dashboard. Styling for this project was another point of emphasis, as many of the pages included a multi-column format implemented with Bootstrap, intended to maximize the display of information to the user.


## Next Steps

My future goals for this project revolve around presenting more information to the user to enhance their trip-planning experience. Eventually I would like to be able to display weather data corresponding to a trip's date and location, and provide the user with suggestions for places or attractions to visit in the area surroundinf their destination. Both of these features would require the use of third-party APIs to provide this data.

## Wireframes and User Stories

### Wireframes

![IMG_9917](https://media.git.generalassemb.ly/user/27946/files/c9874a00-b743-11ea-9c2f-83866ad58dec)

### User Stories


1. As a user, I can log data about a trip, such as destination, date, duration, budget, etc.
2. As a user, I can edit details of my trips.
3. As a user, I can separately view completed trips and planned trips.
4. As a user, I can move a planned trip to the completed trips section.
5. As a user, I can plan events associated with a particular trip.

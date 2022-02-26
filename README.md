# Welcome to Rallyflix


## Live Heroku Link

- [Heroku Rallyflix](https://rally-flix.herokuapp.com/)

## Challenges

    - The biggest challenge was getting the database correct, the communications between users and profiles to profiles owning lists while users owned the profiles. This was a confusing system to build at first. Another challenge I had related to the database being incorrectly set up at first, was to get my profiles under each user to display only the lists belonging to the signed in profile, all profiles were able to view all lists until I was able to correct that with a simple map correction to filter matching profiles to their respective lists. Last challenge was getting the videos to add to the lists, I had to revist my models and add a join table for the lists to videos. A lot of complex code went into this to get it to work but then i had the issue of videos adding to all the lists that were present....I was able to fix this by passing a prop from the parent component to the child component and mapping through that to have the videos appear in the correct lists.


## Features

- Sign up/Log in and demo user login
- Sign in and create up to 4 profiles as well as edit and delete your created profiles
- Browse videos to view a collection of our rally videos
- create lists and add your favorite rally videos to that list
- edit your list names as well as delete your lists to start a new collection


## Installation

  1. Clone the repository ```git clone git@github.com:DevDre783/Rallyflix_Capstone2022.git```
    - pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
  2. Install necessary dependencies for node.js ```npm install``` making sure youre in the react-app directory
  3. Create a database called `rallyflix_db`
  4. Set password as 'password' or any password. *Note: make sure it is the same password as the one in the .env file variables*
  5. Create a new env file with the appropriate settings.
  6. Run migrations and seed data: run pipenv ` npx dotenv sequelize db:migrate ` && `npx dotenv sequelize db:seed:all `
  7. Start both the backend and frontend server: cd into react-app folder and run `npm start` then cd into rallyflix-capstone root directory run pipenv shell and then 'flask run'

  8. Flask commands:

   - pipenv shell

   - flask db upgrade

   - flask seed all

   - flask run

## Techologies Used

- JavaScript
- Python
- Git
- React
- CSS
- Redux
- Heroku
- Flask
- PostgreSQL

## Documentation Links
- [Database Schema](https://github.com/DevDre783/Rallyflix_Capstone2022/wiki/Database-Schema)
- [MVP Feature List](https://github.com/DevDre783/Rallyflix_Capstone2022/wiki/Features-List)
- [User Stories](https://github.com/DevDre783/Rallyflix_Capstone2022/wiki/User-Stories)

## Contributors
- [Andres Soca](https://github.com/DevDre783)


[Welcome]: ./public/images/
[Listings]: ./public/images/
[Van Details]: ./public/images/
[Host Form]: ./public/images/
[Edit Form]: ./public/images/

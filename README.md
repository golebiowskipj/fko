[LIVE](https://golebiowskipj.github.io/fko/#/)

# What is it?

This is a training reservation app in React with Firebase Auth and Firestore.

Not logged-in Visitor can see how many free training spots are available for given date and training type.

User can create an account and reserve a spot for a training. User is also able to free previously reserved training spot if he/she is not able to participate in a class. Usere will be informed if he/she is already assigned to given training, so he/she can't reserve two spots. There is a separate page with all trainings that User is assigned to.

There is also ADMIN role that will be developed in the future.

# Scripts

In order to run dev env run `npm start`

In order to deploy to gh-pages run `npm run deploy`

# Stack

1. React
2. styled-components
3. Firebase

# TODO

1. API communication

- ~~Firebase class refactor~~
- ~~reduce number of calls to firebase (trainings, user data etc)~~

2. UX improvements

- ~~handle firebase auth response during login and registration~~
- ~~polish validation labels~~

3. Tests

- snapshots
- unit tests

4. Features

- admin's panel - strikes
- 3 strikes - can't reserve spot
- 404 page and redirect
- ~~Trainings should have days field (e.g. on Friday there is no training at 20:00)~~
- ~~trainings should be sorted~~
- my reservations page
- clear database from old trainings (older than a month)
- cant sign on training that already started

5. Other

- firebase settings
- ~~trainings should have id like new Date().setHour(18.0.0.0)~~

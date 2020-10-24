import app from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/auth";

import { convertDateToHumanReadable } from "../helpers/helpers";
import { apiLabels } from "../configs/labels";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

export class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  saveUserToFirestore = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = this.db.doc(`users/${userAuth.user.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exsists) {
      try {
        await userRef.set({
          email: userAuth.user.email,
          ...additionalData,
        });
      } catch (error) {
        console.log("Error creating user", error.message);
      }
    }
  };

  getUser = async (uid) => {
    let user;
    const userRef = await this.db.doc(`users/${uid}`);

    const snapShot = await userRef.get();

    if (snapShot.exists) {
      try {
        user = await snapShot.data();
      } catch (error) {
        console.log("Error getting user", error);
      }
    } else {
      console.log("No user with given id", uid);
    }

    return user;
  };

  getSignedUsers = async (training, date) => {
    if (!training) return [];
    let users = [];

    const formattedDate = convertDateToHumanReadable(date);

    const signedUsersRef = this.db.doc(`${training.value}/${formattedDate}`);

    try {
      const doc = await signedUsersRef.get();
      if (doc.exists) {
        users = doc.data().users;
      } else {
        console.log(`No such document! ${training.value}/${formattedDate}`);
      }
    } catch (error) {
      console.log(
        `Error getting document! - ${training.value}/${formattedDate}`,
        error
      );
    }

    return users;
  };

  getAvailablePlaces = async (training, date) => {
    if (!training) return apiLabels.selectTraining;

    let places = training ? training.capacity : 15;

    const signedUsers = await this.getSignedUsers(training, date);

    return places - signedUsers.length;
  };

  reserveTrainingSpot = async (email, trainingValue, date, signedUsers) => {
    if (!trainingValue || !email || !date || !signedUsers)
      return apiLabels.somethingWentWrong;

    const alreadyExist = !!signedUsers.find((user) => user === email);

    if (alreadyExist) return apiLabels.alreadyAssignedToThatTraining;
    if (signedUsers.length === 15) return apiLabels.noSpotsLeftOnThatTraining;

    try {
      await this.db
        .doc(`${trainingValue.value}/${convertDateToHumanReadable(date)}`)
        .set({ users: [...signedUsers, email] });

      return apiLabels.spotReserved;
    } catch (error) {
      console.log("Error saving data", error);
      return apiLabels.didntReserveSpot;
    }
  };

  freeTrainingSpot = async (trainingValue, date, signedUsers, email) => {
    if (!trainingValue || !date || !signedUsers || !email)
      return apiLabels.somethingWentWrong;

    const newUsers = signedUsers.filter((user) => user !== email);

    try {
      await this.db
        .doc(`${trainingValue.value}/${convertDateToHumanReadable(date)}`)
        .set({ users: newUsers });
    } catch (error) {
      console.log("Error saving data", error);
      return apiLabels.didntReserveSpot;
    }

    return apiLabels.spotFreed;
  };

  getTrainings = async () => {
    const trainingsSnapShot = await this.db.collection("trainings").get();

    const trainings = trainingsSnapShot.docs.map((doc) => doc.data());

    return trainings;
  };

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
}

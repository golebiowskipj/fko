import app from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/auth";

import { APIresponse, generateTrainingId } from "../helpers/helpers";
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

  // Get data from firestore

  getAvailableSpots = async (date, training) => {
    if (!training) return apiLabels.selectTraining;

    const trainingId = generateTrainingId(date, training);

    const reservations = await this.getReservations(trainingId, training.value);

    return training.capacity - reservations.length;
  };

  getReservations = async (trainingId, trainingValue) => {
    if (!trainingId) return [];
    let reservations = [];

    const signedUsersRef = this.db.doc(`${trainingValue}/${trainingId}`);

    try {
      const doc = await signedUsersRef.get();
      if (doc.exists) {
        reservations = doc.data().reservations;
      } else {
        console.log(`No such document! ${trainingValue}/${trainingId}`);
      }
    } catch (error) {
      console.log(
        `Error getting document! - ${trainingValue}/${trainingId}`,
        error
      );
    }

    return reservations;
  };

  getTrainings = async () => {
    try {
      const trainingsSnapShot = await this.db.collection("trainings").get();
      const trainings = trainingsSnapShot.docs.map((doc) => doc.data());

      return trainings;
    } catch (error) {
      console.log("Error getting trainings", error);
      return [];
    }
  };

  getUser = async (uid) => {
    let user;
    const userRef = this.db.doc(`users/${uid}`);

    try {
      const doc = await userRef.get();

      if (doc.exists) {
        user = doc.data();
      } else {
        console.log("There is no users with given id", uid);
      }
    } catch (error) {
      console.log("Error getting user", uid);
    }

    return user;
  };

  // Save data in firestore

  // other

  reserveTrainingSpot = async (date, training, user) => {
    if (!date || !training || !user)
      return APIresponse(400, apiLabels.somethingWentWrong);

    const trainingId = generateTrainingId(date, training);

    const reservations = await this.getReservations(trainingId, training.value);

    const alreadyExists = !!reservations.find((u) => u.uid === user.uid);

    if (alreadyExists)
      return APIresponse(204, apiLabels.alreadyAssignedToThatTraining);
    if (reservations.length === training.capacity)
      return APIresponse(204, apiLabels.noSpotsLeftOnThatTraining);

    const newUser = {
      ...user,
      assignedTo: [...user.assignedTo, trainingId].sort(),
    };

    try {
      await this.db
        .doc(`${training.value}/${trainingId}`)
        .set({ reservations: [...reservations, newUser] });

      await this.updateUser(newUser.uid, newUser);

      return APIresponse(200, apiLabels.spotReserved);
    } catch (error) {
      console.log("Error saving data", error);
      return APIresponse(500, apiLabels.didntReserveSpot);
    }
  };

  freeTrainingSpot = async (date, training, user) => {
    if (!date || !training || !user)
      return APIresponse(400, apiLabels.somethingWentWrong);

    const trainingId = generateTrainingId(date, training);

    const reservations = await this.getReservations(trainingId, training.value);

    const newReservations = reservations.filter((u) => u.uid !== user.uid);

    const newUser = {
      ...user,
      assignedTo: user.assignedTo.filter((a) => a !== trainingId),
    };

    try {
      await this.db
        .doc(`${training.value}/${trainingId}`)
        .set({ reservations: newReservations });

      await this.updateUser(newUser.uid, newUser);

      return APIresponse(200, apiLabels.spotFreed);
    } catch (error) {
      console.log("Error saving data", error);
      return APIresponse(500, apiLabels.didntFreeSpot);
    }
  };

  updateUser = async (uid, newUserData) => {
    try {
      this.db.doc(`users/${uid}`).set(newUserData);
    } catch (error) {
      console.log("Couldn't update user", uid, error);
    }
  };

  // AUTH

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  saveUserToFirestore = async (userAuth, additionalData) => {
    if (!userAuth) return;

    try {
      await this.db.doc(`users/${userAuth.user.uid}`).set({
        uid: userAuth.user.uid,
        email: userAuth.user.email,
        ...additionalData,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

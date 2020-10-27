import app from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/auth";

import { convertDateToHumanReadable, daysStart } from "../helpers/helpers";
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

  getAvailablePlaces = async (training, date) => {
    if (!training) return apiLabels.selectTraining;

    let places = training ? training.capacity : 15;

    const signedUsers = await this.getSignedUsers(training, date);

    return places - signedUsers.length;
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

  reserveTrainingSpot = async (user, trainingValue, date, signedUsers) => {
    if (!trainingValue || !user || !date || !signedUsers)
      return apiLabels.somethingWentWrong;

    const readableDate = convertDateToHumanReadable(date);

    const alreadyExist = !!signedUsers.find(
      (signedUser) => signedUser.email === user.email
    );

    if (alreadyExist) return apiLabels.alreadyAssignedToThatTraining;
    if (signedUsers.length === 15) return apiLabels.noSpotsLeftOnThatTraining;

    const updatedUser = await this.getUser(user.uid);

    const newAssignedTo = [
      ...updatedUser.assignedTo,
      `${daysStart(new Date(date).getTime())}-${trainingValue.name}`,
    ].sort();

    const newUser = {
      ...updatedUser,
      assignedTo: newAssignedTo,
    };

    try {
      await this.db
        .doc(`${trainingValue.value}/${readableDate}`)
        .set({ users: [...signedUsers, newUser] });

      await this.updateUser(newUser.uid, newUser);

      return apiLabels.spotReserved;
    } catch (error) {
      console.log("Error saving data", error);
      return apiLabels.didntReserveSpot;
    }
  };

  updateUser = async (uid, newUserData) => {
    try {
      this.db.doc(`users/${uid}`).set(newUserData);
    } catch (error) {
      console.log("Couldn't update user", uid, error);
    }
  };

  freeTrainingSpot = async (trainingValue, date, signedUsers, user) => {
    if (!trainingValue || !date || !signedUsers || !user.email)
      return apiLabels.somethingWentWrong;

    const newUsers = signedUsers.filter((u) => u.uid !== user.uid);
    const newUser = await this.getUser(user.uid);

    const newAssignedTo = newUser.assignedTo.filter(
      (a) =>
        a !== `${daysStart(new Date(date).getTime())}-${trainingValue.name}`
    );

    const newUserToUpdate = { ...user, assignedTo: newAssignedTo };

    try {
      await this.db
        .doc(`${trainingValue.value}/${convertDateToHumanReadable(date)}`)
        .set({ users: newUsers });

      await this.updateUser(newUser.uid, newUserToUpdate);
    } catch (error) {
      console.log("Error saving data", error);
      return apiLabels.didntReserveSpot;
    }

    return apiLabels.spotFreed;
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

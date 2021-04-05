import React, { useContext } from 'react';
import Firebase, { db } from '@Firebase';
import AppContext from '@Components/AppContext';

/**
 * @param {string} email
 * @param {string} password
 * @param {string} userType  HOST | ATTENDEE
 */
const signUp = async (email, password, userType) => {
  let result = false;
  try {
    const res = await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    );
    if (res.user.uid) {
      const user = {
        uid: res.user.uid,
        email,
        userType,
      };

      db.collection('users').doc(res.user.uid).set(user);
      result = true;
    }
  } catch (err) {}

  return result;
};

/**
 * @param {string} email
 * @param {string} password
 * @param {string} userType  HOST | ATTENDEE
 */
const signIn = async (email, password, userType) => {
  let user = undefined;

  try {
    const res = await Firebase.auth().signInWithEmailAndPassword(
      email,
      password
    );
    if (res.user.uid) user = await getUser(res.user.uid);
  } catch (err) {}

  if (user.userType != userType) user = undefined;

  return user;
};

const getUser = async (uid) => {
  let user = undefined;
  try {
    const doc = await db.collection('users').doc(uid).get();
    if (doc.exists) user = doc.data();
  } catch (e) {}
  return user;
};

const updateEmail = async () => {};

const updatePassword = async () => {};

const deleteUser = async () => {
  let result = true;
  try {
    var user = Firebase.auth().currentUser;

    if (user) {
      await user.delete();
    } else {
      result = false;
    }
  } catch (err) {}

  return result;
};
const UserService = {
  signUp,
  signIn,
  updateEmail,
  updatePassword,
  deleteUser,
};

export default UserService;

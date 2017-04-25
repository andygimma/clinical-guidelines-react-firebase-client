import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDZmy5uwUUe2HjwjG8THBUDWmO3dYW3NXE",
  authDomain: "clinical-guidelines-v01.firebaseapp.com",
  databaseURL: "https://clinical-guidelines-v01.firebaseio.com",
  projectId: "clinical-guidelines-v01",
  storageBucket: "clinical-guidelines-v01.appspot.com",
  messagingSenderId: "580769026128"
};

const guidelinesDb = firebase
  .initializeApp(config)
  .database()
  .ref('guidelines');

import {
  FETCH_GUIDELINES_REQUEST,
  FETCH_GUIDELINES_SUCCESS,
  FETCH_GUIDELINES_ERROR,
  ADD_GUIDELINES_REQUEST,
  ADD_GUIDELINES_SUCCESS,
  ADD_GUIDELINES_ERROR,
  ADD_GUIDELINE
} from './constants'

// console.log(FETCH_GUIDELINES_REQUEST);
export const fetchGuidelinesRequest = () => {
  return (dispatch) => {
    guidelinesDb.ref.on('child_added', (snapshot) => {
      dispatch(addGuideline(snapshot.val()));
    })
  }
}

export const fetchGuidelinesSuccess = (error) => {
  return {
    type: FETCH_GUIDELINES_ERROR,
    payload: error
  }
}

export const fetchGuidelinesError = (data) => {
  return {
    type: FETCH_GUIDELINES_SUCCESS,
    payload: data
  }
}

export const addGuideline = (data) => {
  return {
    type: ADD_GUIDELINE,
    payload: data
  }
}

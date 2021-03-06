import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDZmy5uwUUe2HjwjG8THBUDWmO3dYW3NXE",
  authDomain: "clinical-guidelines-v01.firebaseapp.com",
  databaseURL: "https://clinical-guidelines-v01.firebaseio.com",
  projectId: "clinical-guidelines-v01",
  storageBucket: "clinical-guidelines-v01.appspot.com",
  messagingSenderId: "580769026128"
};

const database = firebase
  .initializeApp(config)
  .database()
  .ref();

import {
  // FETCH_GUIDELINES_REQUEST,
  FETCH_GUIDELINES_SUCCESS,
  // FETCH_GUIDELINES_ERROR,
  // ADD_GUIDELINES_REQUEST,
  // ADD_GUIDELINES_SUCCESS,
  // ADD_GUIDELINES_ERROR,
  ADD_GUIDELINE
} from './constants'


export const addGuidelineToReducer = (data) => {
  return {
    type: ADD_GUIDELINE,
    payload: data
  }
}

export const addGuideline = (data, dispatch) => {
  // ADD_GUIDELINES_REQUEST
  return (dispatch) => {
    // dispatch(addGuidelineToReducer(data));

    database.child('guidelines').push(data, response => {
      //ADD_GUIDELINES_SUCCESS
      dispatch(addGuidelineToReducer(data));
      // window.location = `guideline/${data.uid}`
    })
  }
}
export const fetchGuidelinesRequest = () => {
  return (dispatch) => {
    database.ref.on('child_added', (snapshot) => {
      dispatch(addGuideline(snapshot.val()));
    })
  }
}

export const fetchGuidelinesSuccess = (error) => {
  return {
    type: FETCH_GUIDELINES_SUCCESS,
    payload: error
  }
}

// export const fetchGuidelinesError = (data) => {
//   return {
//     type: FETCH_GUIDELINES_ERROR,
//     payload: data
//   }
// }

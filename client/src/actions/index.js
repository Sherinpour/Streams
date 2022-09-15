import _ from "lodash";
import { db } from "../components/Firebase";
import history from "../history";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  SIGN_OUT,
  SIGN_IN,
  FETCH_STREAMS,
  FETCH_STREAM,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await addDoc(collection(db, "streams"), {
    ...formValues,
    userId,
  });
  const responseId = response._key.path.segments[1];

  dispatch({
    type: CREATE_STREAM,
    payload: { id: responseId, userId, ...formValues },
  });

  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  let data = {};
  const colRef = collection(db, "streams");
  const docsSnap = await getDocs(colRef);

  docsSnap.forEach((doc) => {
    data = { ...data, [doc.id]: { ...doc.data(), id: doc.id } };
  });

  dispatch({ type: FETCH_STREAMS, payload: data });
};

export const fetchStream = (id) => async (dispatch) => {
  const colRef = doc(db, "streams", id);
  const response = await getDoc(colRef);

  dispatch({ type: FETCH_STREAM, payload: { id: id, ...response.data() } });
};

export const editStream = (formValues) => async (dispatch) => {
  const streamDocRef = doc(db, "streams", formValues.id);
  await updateDoc(streamDocRef, {
    title: formValues.title,
    description: formValues.description,
  });

  dispatch({ type: EDIT_STREAM, payload: { ...formValues } });
  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  await deleteDoc(doc(db, "streams", id));

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};

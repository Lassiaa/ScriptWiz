// firestoreService.js
import db from "../firebase";
import {
  collection,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Fetch all documents from a specific collection
const fetchCharacters = async (collectionName, documentName) => {
  try {
    const docRef = doc(db, collectionName, documentName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      console.log("No such document!");
      return {
        success: false,
        message: "No such document exists.",
      };
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// set a new script with different documents
const setScript = async (collectionName, documentName, newData) => {
  try {
    const docRef = doc(db, collectionName, documentName);
    await setDoc(docRef, newData);
    return { success: true };
  } catch (error) {
    console.error("Error setting document:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// Todo: update and delete haven't been renovated yet
// Update a document by its ID
const updateDocument = async (collectionName, docId, updatedData) => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, updatedData);
};

// Delete a document by its ID
const deleteDocument = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};

export { fetchCharacters, setScript, updateDocument, deleteDocument };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    addDoc,
    doc,
    limit,
    orderBy,
    where,
    query
} from "firebase/firestore";

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider)
        .then(async (user) => {
            return user;
        })
        .catch((error) => {
            throw error;
        });
}

export async function fetchRecipes() {
    const data = []
    const querySnapshot = await getDocs(collection(db, "recipes"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let arr = doc.data()
        arr.data.id = doc.id
        data.push(arr);
    });
    return data;
}

export async function fetchRecipe(id) {
    const docRef = doc(db, "recipes", id);
    const docSnap = await getDoc(docRef);

    try {
        if (docSnap.exists()) {
            return docSnap.data()
        }
    }
    catch (e) {
        throw e
    }
}

export async function AddRecipe(data) {
    try {
        await addDoc(collection(db, "recipes"), data)
        return true
    } catch (e) {
        throw e
    }
}

export async function searchData(search) {
    let data = []
    try {
        const collectionRef = collection(db, "recipes");
        const q = query(collectionRef, where("data.category", "array-contains-any", [search]))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let arr = doc.data()
            arr.data.id = doc.id
            data.push(arr);
        });
        return data
    } catch (e) {
        throw e
    }
}
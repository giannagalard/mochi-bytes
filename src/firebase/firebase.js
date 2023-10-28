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
    deleteDoc,
    doc,
    limit,
    limitToLast,
    where,
    query,
    orderBy,
    startAt,
    endAt,
    updateDoc,
    getCountFromServer,
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

export async function fetchLatestRecipes() {
    const data = []
    const querySnapshot = await getDocs(query(collection(db, "recipes"), limit(5)));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let arr = doc.data()
        arr.data.id = doc.id
        data.push(arr);
    });
    return data;
}

export async function fetchAllRecipes(cats) {
    try {
        const data = []
        let querySnapshot;
        if (cats?.length) {
            querySnapshot = await getDocs(query(collection(db, "recipes"), where("data.category", "array-contains-any", cats), orderBy('data.name'), limit(11)));
        } else {
            querySnapshot = await getDocs(query(collection(db, "recipes"), orderBy('data.name'), limit(11)));
        }
        querySnapshot.forEach((doc) => {
            let arr = doc.data()
            arr.data.id = doc.id
            data.push(arr);
        });
        return data;
    } catch (e) {
        console.log(e)
        throw e
    }
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

export async function nextPage(lastRecipe) {
    try {
        let data = []
        console.log(lastRecipe)
        const querySnapshot = await getDocs(query(collection(db, "recipes"), orderBy('data.name'), startAt(lastRecipe), limit(11)));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let arr = doc.data()
            arr.data.id = doc.id
            data.push(arr);
        });
        console.log(data)
        return data;
    } catch (e) {
        throw e
    }
}

export async function previousPage(lastRecipe) {
    try {
        let data = []
        const querySnapshot = await getDocs(query(collection(db, "recipes"), orderBy('data.name'), limitToLast(11), endAt(lastRecipe)));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let arr = doc.data()
            arr.data.id = doc.id
            data.push(arr);
        });
        return data;
    } catch (e) {
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

export async function UpdateRecipe(data, id) {
    try {
        await updateDoc(doc(db, 'recipes', id), data)
        return true
    } catch (e) {
        throw e
    }
}

export async function getCount() {
    try {
        const coll = collection(db, "recipes");
        const snapshot = await getCountFromServer(coll);
        return snapshot.data().count
    } catch (e) {
        throw e
    }
}

export async function lastPage() {
    try {
        let data = []
        const limit = localStorage.getItem("count") % 10
        const querySnapshot = await getDocs(query(collection(db, "recipes"), orderBy('data.name'), limitToLast(limit)));
        querySnapshot.forEach((doc) => {
            let arr = doc.data()
            arr.data.id = doc.id
            data.push(arr);
        });
        console.log(data)
        return data;
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

export async function deleteRecipe(id) {
    try {
        await deleteDoc(doc(db, 'recipes', id))
    } catch (e) {
        throw e
    }
}

export async function signOut() {
    await auth.signOut();
}
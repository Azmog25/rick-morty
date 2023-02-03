import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCZIGWOuHMiuEPXn2F83OvLQMj3gBljA1Q",
    authDomain: "rick-morty-87539.firebaseapp.com",
    projectId: "rick-morty-87539",
    storageBucket: "rick-morty-87539.appspot.com",
    messagingSenderId: "470900236304",
    appId: "1:470900236304:web:f91c40c23bc6335244ea95",
    measurementId: "G-CNP9EKKGK9"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    if(validateEmail(email)) {
        if(validatePassword(password)) {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                const user = res.user;
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name,
                    authProvider: "local",
                    email,
                });
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        } else {
            alert("Le mot de passe doit contenir au minimum 8 caractères")
        }
    } else {
        alert("email incorrect")
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

function validateEmail(email) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

function validatePassword(password) {
    let regex = /^.{8,}$/;
    return regex.test(password);
}

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};
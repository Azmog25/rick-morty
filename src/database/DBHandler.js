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
    doc,
    updateDoc,
    setDoc,
    getDoc
} from "firebase/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import {persist} from "../redux/store";

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
    let user = null
    try {
        await signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                user = res.user
            })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
    return user
};

const registerWithEmailAndPassword = async (email, password) => {
    if(validateEmail(email)) {
        if(validatePassword(password)) {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password)
                const user = res.user;
                const document = doc(db, "favoris", user.email)
                const data = {
                    uid: generateUniqueID(),
                    userId: user.uid,
                    favoris: []
                }
                await setDoc(document, data)
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

function validateEmail(email) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

function validatePassword(password) {
    let regex = /^.{8,}$/;
    return regex.test(password);
}

async function saveFavoris(favoris) {
    const user = auth.currentUser
    const fav = doc(db, "favoris", user.email)

    await updateDoc(fav, {
        favoris: favoris
    })
        .then(() => {
            console.log("favoris mis à jour")
        })
        .catch((err) => {
            console.log(err)
        })
}

async function getFavoris(user) {
    const fav = doc(db, "favoris", user.email)
    let tab = []

    await getDoc(fav)
        .then((res) => {
            for(let i = 0; i<res.data().favoris.length; i++) {
                tab.push(res.data().favoris[i])
            }
            console.log("Data : ", tab)
        })
        .catch((err) => console.log(err))

    return tab
}

export {
    auth,
    db,
    signInWithGoogle,
    saveFavoris,
    getFavoris,
    logInWithEmailAndPassword,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
};
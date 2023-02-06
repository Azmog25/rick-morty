import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {Link, useNavigate} from "react-router-dom";
import {
    auth, logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../../database/DBHandler";
import "../../Register.css";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/actions/index";
import {persist} from "../../redux/store";

function Inscription() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignIn = async (email, password) => {
        await registerWithEmailAndPassword(email, password)
            .then(() => {
                console.log("inscription finis")
                logInWithEmailAndPassword(email, password)
                    .then((res) => {
                        console.log("connexion")
                        console.log(res)
                        dispatch(setUser(res))
                        persist.persist()
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
        console.log("fin")
    }

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/Accueil");
    }, [user, loading]);

    return (
        <div className="register">
            <div className="register__container">
                <input
                    type="text"
                    className="register__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="register__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button className="register__btn" onClick={() => handleSignIn(email, password)}>
                    Register
                </button>
                <button
                    className="register__btn register__google"
                    onClick={signInWithGoogle}
                >
                    Register with Google
                </button>
                <div>
                    Already have an account? <Link to="/">Login</Link> now.
                </div>
            </div>
        </div>
    );
}

export default Inscription
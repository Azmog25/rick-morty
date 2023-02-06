import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../database/DBHandler";
import { useAuthState } from "react-firebase-hooks/auth";
import "../../Inscription.css";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice";
import {persist} from "../../redux/store";

function Connexion() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignIn = async (email, password) => {
        await logInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res)
                dispatch(setUser(res))
                persist.persist()
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) navigate("/Accueil");
    }, [user, loading]);
    return (
        <div className="login">
            <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login__btn"
                    onClick={() => handleSignIn(email, password)}
                >
                    Login
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    Login with Google
                </button>
                <div>
                    Don't have an account? <Link to="/Inscription">Register</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Connexion;
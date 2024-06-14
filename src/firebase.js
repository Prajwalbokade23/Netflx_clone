
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBEwfaABIj6BWyHZEI5AEoodAjo0_pOCcU",
  authDomain: "netflix-clone-fc93f.firebaseapp.com",
  projectId: "netflix-clone-fc93f",
  storageBucket: "netflix-clone-fc93f.appspot.com",
  messagingSenderId: "1066276718702",
  appId: "1:1066276718702:web:988b5c0ea8f5e14a627e7f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const login = async (email, password) =>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
    }


const logout = ()=>{
    signOut(auth);
}

export {auth, login, db, signup, logout};
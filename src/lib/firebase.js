import firebaseApp from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const API_KEY = __myapp.env.API_KEY;
const AUTH_DOMAIN = __myapp.env.AUTH_DOMAIN;
const DATA_BASE_URL = __myapp.env.DATA_BASE_URL;
const PROJECT_ID = __myapp.env.PROJECT_ID;
const STORAGE_BUCKET = __myapp.env.STORAGE_BUCKET;
const MESSAGING_SENDER_ID = __myapp.env.MESSAGING_SENDER_ID;
const APP_ID = __myapp.env.APP_ID;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATA_BASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

firebaseApp.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebaseApp.auth.GoogleAuthProvider();

export { db, auth, provider }
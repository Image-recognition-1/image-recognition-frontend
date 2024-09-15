import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDv2mI6PhvFB4yCIxFsq2JmEt8Gn0aKpAQ',
  authDomain: 'image-recognition-2a553.firebaseapp.com',
  projectId: 'image-recognition-2a553',
  storageBucket: 'image-recognition-2a553.appspot.com',
  messagingSenderId: '1065489937611',
  appId: '1:1065489937611:web:e70706367dbfe7d20f574e',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

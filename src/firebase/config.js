// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBSzSZn2DIRn1hYahtLUxTJd3O4D6crL3Q',
    authDomain: 'cosmeticshop-d9158.firebaseapp.com',
    projectId: 'cosmeticshop-d9158',
    storageBucket: 'cosmeticshop-d9158.appspot.com',
    messagingSenderId: '346909059749',
    appId: '1:346909059749:web:377a42ca249efee2517b4c',
    measurementId: 'G-CFQ2LG8J01',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { storage };

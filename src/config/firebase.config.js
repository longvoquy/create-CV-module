import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
    // apiKey: "AIzaSyDq6pGvoJvKynHTI4iU65mS9SRlxq-MAjE",
    // authDomain: "cv-builder-ae3ac.firebaseapp.com",
    // databaseURL: "https://cv-builder-ae3ac-default-rtdb.asia-southeast1.firebasedatabase.app",
    // projectId: "cv-builder-ae3ac",
    // storageBucket: "cv-builder-ae3ac.appspot.com",
    // messagingSenderId: "826087437594",
    // appId: "1:826087437594:web:d9eead7c3345f390e028a3",
    // measurementId: "G-7VGC0EYX8H"
};

// Kiểm tra và khởi tạo ứng dụng Firebase nếu chưa có
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

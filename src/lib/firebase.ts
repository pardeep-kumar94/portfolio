import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDTu7tlVIqy3Z7edWXunezzinc0xJaC73A",
  authDomain: "portfolio-5c090.firebaseapp.com",
  projectId: "portfolio-5c090",
  storageBucket: "portfolio-5c090.firebasestorage.app",
  messagingSenderId: "579221559877",
  appId: "1:579221559877:web:177891569f8d42f00ba12c",
  measurementId: "G-155KTDR8PW",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const initAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

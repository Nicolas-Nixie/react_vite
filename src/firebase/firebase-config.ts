const config = {
    apiKey: "AIzaSyBvE4i-sVNzCGeM9w5NLS4NGsT8O6fkXq0",
    authDomain: "react-27-02-23.firebaseapp.com",
    projectId: "react-27-02-23",
    storageBucket: "react-27-02-23.appspot.com",
    messagingSenderId: "518528339148",
    appId: "1:518528339148:web:428c38d4c3e3bd69214669"
}

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.ts');
    } else {
      return config;
    }
  }    


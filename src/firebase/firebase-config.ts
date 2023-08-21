const config = {
  apiKey: "AIzaSyAMGWtetPyubyXaP6-bRT5sqAt6-_wbSgo",
  authDomain: "apptest-ecbb0.firebaseapp.com",
  projectId: "apptest-ecbb0",
  storageBucket: "apptest-ecbb0.appspot.com",
  messagingSenderId: "270148948509",
  appId: "1:270148948509:web:ff138880261e28ccb16cf4",
}

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.ts');
    } else {
      return config;
    }
  }    


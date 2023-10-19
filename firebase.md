# Whats is Firebase
- Firebase is a platform to build mobile and web applications

[text]

We will work on the **BUILD** tab
- Authentication
- Firebase database => Firestore 
BUILD 
1. FireStore database 
2. create database
3. production/ test mode
4. location
5. CREATE/ SUBMIT
6. enter database => UI very similar to MongoDB Atlas
7. create i) collection ii) document 
8. RULES 

Haciendo una pequena recapitulacion hasta el momento, firebase te permite acceder a una gran cantidad de servicios, la manera comun es hacer algo manual desde la UI de firebase, gralmente crear o autorizar ciertos procedimientos, y en segunda instancia en la config inicial importar de firebase/`servicio` => $$$import { getService } from 'firebase/service'

gralmente luego se declara una $$$const name = getService(app) y recibe como param app

i.e: 
``` typescript
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3erJKdyosWTqplZub0zkwQvzGO_4YaC0",
  authDomain: "fir-fundamentals-1868b.firebaseapp.com",
  projectId: "fir-fundamentals-1868b",
  storageBucket: "fir-fundamentals-1868b.appspot.com",
  messagingSenderId: "1052800314608",
  appId: "1:1052800314608:web:258cc664cf1751de3fe635"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Auth 
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// Db 
export const db = getFirestore(app);
```

in case you want to add document
9. hooks/useAdd{Name} 


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


----------------------------------------------------------------------------------------------------------------------------------
# GENERAL:
Hooks to add document, get document and recover user data from localStorage => `I should learn how to use indexedDb`
----------------------------------------------------------------------------------------------------------------------------------

### patron comun en firebase/firestore:
 Si vas a interactuar con firestore (database) vas a necesitar la var `db` y la var `collection[name]Ref`

 letz c this case of GET from DB:

 ```typescript
 import { useState, useEffect } from 'react';
import { query, collection, where, orderBy, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { Transaction } from '../types/index';

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const transactionCollectionRef = collection(db, 'transactions');
    const { authObject } = useGetUserInfo();

    const getTransactions = () => {
        let unsubscribe: Unsubscribe;
        try {
            const transactionQuery = query(
                transactionCollectionRef,
                 where("userID", "==", authObject?.userID),
                 orderBy("createdAt") 
                 );

                 unsubscribe = onSnapshot(transactionQuery,(snapShot) => {

                    const docs: Transaction[] = []; 

                    console.log(snapShot);
                    snapShot.forEach((doc) => {
                        const data = doc.data();
                        const id = doc.id;

                        docs.push({ ...data, id } as Transaction);
                    });

                    setTransactions(docs);
                 });
                
        } catch (e) {
            const error = e as Error;
            console.error(error.message);   
        }
        return () => unsubscribe && unsubscribe();
    };

    useEffect(() => {
      getTransactions();
    }, []);
    
    return { transactions }; 
};
 ```

 patron comun: 
 ```javascript
import { query, collection, where, orderBy, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from '../config/firebase';  // db es una instancia configurada de Firestore
 ```
Necesitas importas db from firebase config y todo lo que vayas a usar from firebase/firestore

In this case:
1. query => la func query() *construye y retorna la referencia a una consulta*. **No la ejecuta. Es la query per se**
2. `where`/`orderBy` => funciones utilizadas dentro de `query` para filtrar y ordenar los documentos en la consulta, respectivamente.
3. `onSnapshot` => establece un observador en tiempo real y te permite responder a los cambios. A diferencia de **getDocs** no es Async
4. `Unsubscribe` => Función retornada por `onSnapshot` que puedes llamar para dejar de escuchar los cambios y evitar fugas de memoria o pérdidas de rendimiento.

import { collection, onSnapshot, orderBy, query, doc,setDoc } from 'firebase/firestore'
import { db, auth } from '../config/firebase.config';

export const getTemplates = () => {
    return new Promise((resolve, reject) => {
        const templateQuery = query(
            collection(db, "templates"),
            orderBy("timestamp", "asc")
        );
        const unsubscribe = onSnapshot(templateQuery, (querySnap) => {
            const templates = querySnap.docs.map((doc) => doc.data());
            resolve(templates)
        });
        return unsubscribe;
    }
    )
}
export const getTemplateDetails = async (templateID) => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(doc(db, "templates", templateID), (doc) => {
            resolve(doc.data())
        });
        return unsubscribe;
    })
}
export const getTemplateDetailEditByUser = (uid, id) => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(
            doc(db, "users", uid, "resumes", id),
            (doc) => {
                resolve(doc.data());
            }
        );

        return unsubscribe;
    });
};


export const getUserDetail = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((userCred) => {
            if (userCred) {
                const userData = userCred.providerData[0];
                console.log(userData);
                const unsubscribe = onSnapshot(
                    doc(db, "users", userData?.uid),
                    (_doc) => {
                        if (_doc.exists()) {
                            resolve(_doc.data());
                        } else {
                            setDoc(doc(db, "users", userData?.uid), userData).then(() => {
                                resolve(userData);
                            });
                        }
                    }
                );
                    return unsubscribe;
            } else {
                reject(new Error("User is not authenticated"))
            }
            unsubscribe();
        });
    });
}
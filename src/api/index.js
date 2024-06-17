import { collection, onSnapshot, orderBy, query, doc } from 'firebase/firestore'
import { db } from '../config/firebase.config';
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
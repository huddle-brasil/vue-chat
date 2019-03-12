import Firebase from 'firebase'

export default{
    async initializeFirebase(config){
        const app = await Firebase.initializeApp(config)
        const db = app.firestore();
        return db
    }
}
const Multer = require('multer')
const FirebaseStorage = require('multer-firebase-storage')

const multer = Multer({
  storage: FirebaseStorage({
    bucketName: process.env.FIREBASE_BUCKET_NAME,
    credentials: {
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/gm, "\n"),
      projectId: process.env.FIREBASE_PROJECT_ID
    },
    unique: true,
    public: true
  })
})

export default multer;
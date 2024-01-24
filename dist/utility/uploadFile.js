"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Multer = require('multer');
const FirebaseStorage = require('multer-firebase-storage');
const multer = Multer({
    storage: FirebaseStorage({
        bucketName: process.env.FIREBASE_BUCKET_NAME,
        credentials: {
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
            projectId: process.env.FIREBASE_PROJECT_ID
        },
        unique: true,
        public: true
    })
});
exports.default = multer;
//# sourceMappingURL=uploadFile.js.map
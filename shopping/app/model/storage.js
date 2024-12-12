import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../lib/firebaseClient.js"
const storage = getStorage(app);


export default async function imageUpload(type, id, file) {
    try {
        const storageRef = ref(storage, `products/${id}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Wait for the upload to complete and track progress
        await new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error('Upload failed:', error);
                    reject(error);
                },
                () => {
                    resolve();
                }
            );
        });

        // Get the download URL once the upload is complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at', downloadURL);

        return downloadURL;

    } catch (error) {
        console.error('Error during upload or fetching URL:', error);
        throw error;
    }
}
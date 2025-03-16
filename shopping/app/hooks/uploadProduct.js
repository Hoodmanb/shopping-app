import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '@/app/lib/firebaseClient';
import handleFirebaseError from './firebaseError';

const storage = getStorage(app);

async function imageUpload(id, file, filename) {
  try {
    console.log(`Starting upload for ${filename} with ID: ${id}`);
    const storageRef = ref(storage, `products/${id}/${filename}`);
    const uploadResult = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log('File available at', downloadURL);
    console.log(`Upload successful for ${filename} with ID: ${id}`);
    return { message: 'successful', data: downloadURL, metadata: uploadResult.metadata };
  } catch (error) {
    console.log(`Upload failed for ${filename} with ID: ${id}`, error);
    console.log(error.code);
    return { message: 'error', data: error.code || error.message };
  }
}

export default async function uploadProject(images) {
  try {
    console.log('Starting uploadProject with images:', images);
    if (!images || images.length === 0) {
      console.log('No images provided.');
      return { message: 'error', data: 'No images provided.' };
    }

    const uploadedImages = await Promise.allSettled(
      images.map(async (image) => {
        try {
          const uniqueId = uuidv4();
          console.log(`Processing image: ${image.alt} with ID: ${uniqueId}`);
          const response = await fetch(image.src);
          if (!response.ok) {
            console.log(`Failed to fetch image: ${image.alt}`, response);
            return { success: false, error: `Failed to fetch image: ${response.statusText}` };
          }
          const blob = await response.blob();
          const extension = image.alt.split('.').pop().toLowerCase();
          const fileType = blob.type || (extension === 'jpg' ? 'image/jpeg' : extension === 'png' ? 'image/png' : 'application/octet-stream');
          const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
          if (!allowedFileTypes.includes(fileType)) {
            console.log(`Invalid file type for image: ${image.alt}`, fileType);
            return { success: false, error: `Invalid file type (${fileType}). Only JPG and PNG are allowed.` };
          }
          const uploadResponse = await imageUpload(uniqueId, blob, image.alt);
          if (uploadResponse.message !== 'successful') {
            console.log(`Upload failed for image: ${image.alt}`, uploadResponse.data);
            return { success: false, error: uploadResponse.data };
          }
          console.log(`Image upload successful: ${image.alt}`);
          return { success: true, url: uploadResponse.data };
        } catch (err) {
          console.log(`Error processing image: ${image.alt}`, err);
          return { success: false, error: err.message };
        }
      })
    );

    const successfulUploads = uploadedImages
      .filter((result) => result.status === 'fulfilled' && result.value.success)
      .map((result) => result.value.url);

    const failedUploads = uploadedImages.filter(
      (result) => result.status === 'rejected' || (result.status === 'fulfilled' && !result.value.success)
    );

    if (successfulUploads.length > 0) {
      console.log('Successful uploads:', successfulUploads);
      return { message: 'successful', data: successfulUploads };
    }

    console.log('Failed uploads:', handleFirebaseError(failedUploads[0].value.error));

    return {
      message: 'error',
      data: failedUploads.map((fail) => fail.status === 'fulfilled' ? handleFirebaseError(fail.value.error) : "something went wrong, contact your dev"),
    };
  } catch (err) {
    console.log('Error in uploadProject:', err);
    return { message: 'error', data: "something went wrong, contact your dev" };
  }
}
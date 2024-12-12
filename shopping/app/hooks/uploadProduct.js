import { v4 as uuidv4 } from 'uuid';
import imageUpload from '../../model/storage.js';

export async function uploadProject(e) {
  try {
    const formData = await e.target.formData();
    const formDataObject = Array.from(formData.entries()).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
    
    const { name, description, wishlist = false, favourite, stock, price } = formDataObject;
    const files = formData.getAll('images');
    const data = { name, description, stock, price, wishlist, favourite };

    if (files && files.length > 0) {
      const imagesArray = await Promise.all(
        files.map(async (file) => {
          const uniqueId = uuidv4();
          let fileType = file.type;

          if (fileType === 'application/octet-stream') {
            const extension = file.name.split('.').pop().toLowerCase();
            fileType = extension === 'jpg' ? 'image/jpg' : extension === 'png' ? 'image/png' : fileType;
          }

          const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
          if (!allowedFileTypes.includes(fileType)) {
            throw new Error('Invalid file type. Only JPG and PNG are allowed.');
          }

          const downloadURL = await imageUpload('image', uniqueId, file);
          return uniqueId; // Or downloadURL if needed
        })
      );

      data.images = imagesArray; // Attach uploaded image IDs
    }

    const response = await fetch('/api/addProject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result.message);
  } catch (err) {
    console.error('Error:', err.message);
    throw new Error('Project upload failed.');
  }
}
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';

export default function useFirebaseImage(getValues, setValue) {
  const storage = getStorage();

  const handleSelectImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    setValue('image_name', file.name);
    handleUploadImage(file);
  };

  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState('');
  if (!setValue || !getValues) return;
  const handleUploadImage = file => {
    const storageRef = ref(storage, 'images/' + getValues('image_name'));
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      error => {
        console.log('Error', error);
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImage(downloadURL);
          setProgress(0);
        });
      },
    );
  };

  const handleDeleteImage = () => {
    const desertRef = ref(storage, 'images/' + getValues('image_name'));
    deleteObject(desertRef)
      .then(() => {
        setImage('');
      })
      .catch(error => {
        console.log('🚀 ~ handleDeleteImage ~ error:', error);
      });
  };

  return {
    progress,
    image,
    setImage,
    handleSelectImage,
    handleUploadImage,
    handleDeleteImage,
  };
}

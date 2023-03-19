import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './config';
import { v4 as uuidv4 } from 'uuid';

// ============ STORAGE ============
function uploadFile(fileUpload, folder, callback) {
    if (!fileUpload || folder.length === 0) return;
    const fileRef = ref(
        storage,
        `${folder}/${fileUpload.lastModified}_${fileUpload.size}_${uuidv4()}_${fileUpload.name}`,
    );

    uploadBytes(fileRef, fileUpload).then((snapshot) => {
        // Get URL
        getDownloadURL(snapshot.ref).then((url) => {
            callback({ url, fullPath: snapshot.metadata.fullPath });
        });
    });
}

export { uploadFile };

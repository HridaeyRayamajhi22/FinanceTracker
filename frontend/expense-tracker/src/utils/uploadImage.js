import {API_PATHS} from "./apiPaths"
import axiosInstance from "./axiosInstance"

const uploadImage = async(imageFile) => {
    const formData = new FormData();
    // Append image file to FormData
    formData.append('image', imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', //Set header for file upload
            },
        });
        return response.data; //Return response data
    } catch(error) {
        console.error('Error uploading the image:', error);
        throw error; //Rethrow the error for handling
    }
};

export default uploadImage;
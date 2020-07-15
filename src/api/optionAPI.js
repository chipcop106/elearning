import instance, {getAccessToken} from './instanceAPI';
import {appSettings} from '~src/config'
const path = '/ElearnOptionApi';

export const cancelLesson = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/CancelSchedule',{
            params: {
                UID: 1,
                BookingID: params.BookingID,
            }
        })
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const uploadImageToServer = async (params) => {
    let result;
    console.log('log params', params);
    try {
        let formData = new FormData();
        if (!!params && params.length > 0) {
            [...params].map((image) => {
                formData.append("file", image);
            });
        }

        let res = await instance.post(`${path}/UploadImage`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            params:{
                UID: appSettings.UID,
            }
        });
        result = res.data;
    } catch (error) {
        result = error.message ? error.message : '';
    }
    return result;
};
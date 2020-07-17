import instance, {getAccessToken} from './instanceAPI';
import {appSettings} from '~src/config'
const path = '/ElearnOptionApi';

export const cancelLesson = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/CancelSchedule',{
            params: {
                UID: appSettings.UID,
                BookingID: params.BookingID,
                Reason: params.Reason,
            }
        })
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getListLevelPurpose = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetListLevelPurpose',{
            params: {
                UID: appSettings.UID,
            }
        })
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const updatePassAPI = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/UpdatePass',{
            params: {
                UID: appSettings.UID,
                OldPass: params.OldPass,
                NewPass: params.NewPass,
            }
        })
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getTimeZoneAPI = async () => {
    let result;
    try {
        let res = await instance.get(path + '/GetTimeZone',{
            params: {
                UID: appSettings.UID,
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

export const getListTargetAPI = async () => {
    let result;
    try {
        let res = await instance.get(path + '/ListTarget',{
            params: {
                UID: appSettings.UID,
            }
        })
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getListLanguageAPI = async () => {
    let result;
    try {
        let res = await instance.get(path + '/ListLangluage',{
            params: {
                UID: appSettings.UID,
            }
        })
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}
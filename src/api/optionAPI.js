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
import instance, {getAccessToken} from './instanceAPI';
import {appSettings} from '~src/config'
const path = '/ElearnStudentApi';
export const getLessons = async () => {
    let result;
    try {
        let res = await instance.get(path + '/Daskboard',{
            params:{
              UID: appSettings.UID,
            }
        });
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getUpcomingLessons = async () => {
    let result;
    try {
        let res = await instance.get(path + '/GetUpcomingLessions')
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getLessonHistory = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetLessionHistory',{
            params: {
                ...params,
                key: appSettings.key
            }
        })
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getEvaluation = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetEvaluation',{
            params: {
                ...params,
                key: appSettings.key
            }
        })
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getProfile = async () => {
    let result;
    try {
        let res = await instance.get(path + '/GetProfile')
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}
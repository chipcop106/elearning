import instance, {getAccessToken} from './instanceAPI';
import {appSettings} from '~src/config'
const path = '/ElearnStudentApi';

export const getLessons = async () => {
    let result;
    try {
        let res = await instance.get(path + '/Dashboard',{
            params: {
                UID: "1"
            }
        })
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getUpcomingLessons = async () => {
    let result;
    try {
        let res = await instance.get(path + '/GetUpcomingLessions', {
            params: {
                UID: "1"
            }
        })
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
                UID: "1",
                FromDate: params.FromDate,
                ToDate: params.ToDate,
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
                UID: 1,
                ElearnBookingID: params.ElearnBookingID
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
        let res = await instance.get(path + '/GetProfile', {
            params: {
                UID: "1"
            }
        })
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}
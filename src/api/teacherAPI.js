import instance, {getAccessToken} from './instanceAPI';
import {appSettings} from '~src/config'
const path = '/ElearnTeacherApi';

export const getTeacherDashboard = async (params = {}) => {
    let result;
    try {
        let res = await instance.get(path + '/DashboardTeacher',{
            params:{
                UID:appSettings.UID
            }
        });
        result =  res.data;
    } catch (error) {
        return error.message ? error.message : result = "";
    }
    return result;
}

export const getLibrary = async (params = {}) => {
    let result;
    try {
        let res = await instance.get(path + '/GetLibrary', {
            params:{
                UID:appSettings.UID
            }
        });
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getAllClass = async (params = {}) => {
    let result;
    try {
        let res = await instance.get(path + '/GetAllClass',{
            params: {
                ...params,
                UID:appSettings.UID
            }
        });
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getUpcomingClass = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetUpcomingClass',{
            params: {
                ...params,
                UID:appSettings.UID
            }
        });
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getMissingFeedback = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetListEvaluation', {
            params: {
                ...params,
                UID:appSettings.UID
            }
        });
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const cancelSchedule = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/CancelSchedule', {
            params: {
                ...params,
                UID:appSettings.UID
            }
        });
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getScheduleLog = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetScheduleLog', {
            params: {
                ...params,
                UID:appSettings.UID
            }
        });
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getBookingRequest = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetBookingRequest', {
            params: {
                ...params,
                UID:appSettings.UID
            }
        });
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

import instance, { getAccessToken } from './instanceAPI';
import { appSettings } from '~src/config'
const path = '/ElearnStudentApi';

export const getLessons = async () => {
    let result;
    try {
        let res = await instance.get(path + '/Dashboard', {
            params: {
                UID: appSettings.UID
            }
        })
        result = res.data;
    } catch (error) {
        return error.message ? error.message : result = "";
    }
    return result;
}

export const getUpcomingLessons = async () => {
    let result;
    try {
        let res = await instance.get(path + '/GetUpcomingLessions', {
            params: {
                UID: appSettings.UID
            }
        })
        result = res.data;
    } catch (error) {
        return error.message ? error.message : result = "";
    }
    return result;
}

export const getLessonHistory = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetLessionHistory', {
            params: {
                UID: appSettings.UID,
                FromDate: params.FromDate,
                ToDate: params.ToDate,
                Page: params.Page,
            }
        })
        result = res.data;
    } catch (error) {
        return error.message ? error.message : result = "";
    }
    return result;
}

export const getEvaluation = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetEvaluation', {
            params: {
                UID: appSettings.UID,
                ElearnBookingID: params.ElearnBookingID
            }
        })
        result = res.data;
    } catch (error) {
        return error.message ? error.message : result = "";
    }
    return result;
}

export const getProfile = async () => {
    let result;
    try {
        let res = await instance.get(path + '/GetProfile', {
            params: {
                UID: appSettings.UID,
            }
        })
        result = res.data;
    } catch (error) {
        return error.message ? error.message : result = "";
    }
    return result;
}

export const getTeacherInfo = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetTeacherInfo', {
            params: {
                UID: appSettings.UID,
                TeacherUID: params.TeacherUID,
            }
        })
        result = res.data;
    } catch (error) {
        return error.message ? error.message : result = "";
    }
    return result;
}

export const getAllNotification = async () => {
    let result;
    try {
        let res = await instance.get(path + '/GetAllNotification', {
            params: {
                UID: appSettings.UID,
            }
        })
        result = res.data;
    } catch (error) {
        return error.message ? error.message : result = "";
    }
    return result;
}

export const getNotificationDetail = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetNotificationDetail', {
            params: {
                UID: appSettings.UID,
                NotificationID: params.NotificationID
            }
        })
        result = res.data;
    } catch (error) {
        return error.message ? error.message : result = "";
    }
    return result;
}

export const getScheduleByTeacherUID = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/BookingScheduleByTeacherUID', {
            params: {
                UID: appSettings.UID,
                TeacherUID: params.TeacherUID,
                Date: params.Date
            }
        })
        result = res.data;
    } catch (error) {
        return error.message ? error.message : result = "";
    }
    return result;
}

export const getListTeacher = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetListTeacher', {
            params: {
                UID: appSettings.UID,
                Nation: params.Nation,
                LevelPurpose: params.LevelPurpose,
                Gender: params.Gender,
                Date: params.Date,
                Start: params.Start,
                End: params.End,
            }
        })
        result = res.data;
    } catch (error) {
        return error.message ? error.message : result = "";
    }
    return result;
}
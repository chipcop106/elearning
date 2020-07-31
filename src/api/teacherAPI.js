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

export const getListCategoryLibrary = async (params = {}) => {
    let result;
    try {
        let res = await instance.get(path + '/GetLibrary', {
            params:{
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

export const getListLibraryNew = async (params = {}) => {
    let result;
    try {
        let res = await instance.get(path + '/GetLibraryNew', {
            params:{
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

export const getLibraryByCategoryID = async (params = {}) => {
    let result;
    try {
        let res = await instance.get(path + '/GetLibraryDetail', {
            params:{
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

export const getFeedback = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/MissingFeedback', {
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

// Param: int StudentUID, int UID ? 0, string Token ? null
export const getStudentByUID = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetByStudentUID', {
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

// Params: string Date ? null, int UID ? 0, string Token ? null
export const getPaymentInfo = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetPayment', {
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

// Params: string Date ? null, int UID ? 0, string Token ? null
export const getPaymentHistory = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetHistoryPayment', {
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

// Params:  int ElearnBookingID, string Pronunciation, string Vacabulary, string Grammar, string SentenceDevelopmentAndSpeak, string Note, int UID ? 0, string Token ? null
export const addEvaluation = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/AddEvaluation', {
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


export const getTeacherInfo = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetTeacherProfile', {
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




export const setEventAvailable = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/ScheduleAvailable', {
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


export const setEventClose = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/CancelAvailable', {
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

export const getListEventsOfWeek = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/BookingSchedule', {
            params: {
                ...params,
                UID: appSettings.UID
            }
        });
        result =  res.data;
    } catch (error) {
        return error.message ? error.message: result = "";
    }
    return result;
}

export const getMonthReport = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/GetStatistics', {
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

export const getOverviewFeedback = async (params) => {
    let result;
    try {
        let res = await instance.get(path + '/EvaluationOverview', {
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

export const getTeacherInfoProfile = async (params = {}) => {
    let result;
    try {
        let res = await instance.get(path + '/LoadProfileTeacher', {
            params:{
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

export const getTeacherIntroduce = async (params = {}) => {
    let result;
    try {
        let res = await instance.get(path + '/GetTeacherIntroduce', {
            params:{
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
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
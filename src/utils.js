import moment from 'moment';

export const randomId = () => {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        (c) => {
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
    return uuid;
}


export const convertDay = (date) => {
    let arrayDate = date.split('/')
    date = new Date(`${arrayDate[1]}/${arrayDate[0]}/${arrayDate[2]}`).getDay()
    switch (date) {
        case 0: return "Sunday"; break;
        case 1: return "Monday"; break;
        case 2: return "Tuesday"; break;
        case 3: return "Wednesday"; break;
        case 4: return "Thursday"; break;
        case 5: return "Friday"; break;
        default: return "Saturday"; break;
    }
}

export const convertTime = (time) => {
    time = time.split(':')[0]
    return time <= 12 ? "AM" : "PM";
}

export const nationMapToFlag = (nation) => {
    let map = {
        ca: "Canada",
        my: "Malaysia",
        vn: ["Viet Nam", "Việt Nam"],
        us: "U.S.",
        jp: "Japan",
        kr: "South Korea",
        ph: "Philippines",
        bg: "Bangladesh",
        id: "India",
        th: "Thailand",
        cn: "China",
        id: "Indonesia",
        in: "India",
    }
    let result;
    for (const [key, value] of Object.entries(map)) {
        if (value === nation || value.includes(nation)) {
            result = key;
            break;
        }
    }
    return result;
}

export const convertDateFromTo = (dateStr) => {
    const dateArr = dateStr.split('-');
    const date = moment(dateArr[0].trim(), 'DD/MM/YYYY HH:mm').format('dddd, DD/MM/YYYY');
    const dateObject = moment(dateArr[0].trim(), 'DD/MM/YYYY HH:mm').toDate();
    const fromTime = moment(dateArr[0].trim(), 'DD/MM/YYYY HH:mm').format('HH:mm');
    const endTime = dateArr[1].trim()
    return {
        dateObject, date, fromTime, endTime
    }
}

const getDifferentMinBetweenTime = (startDate, endDate) => {
    const oneMinutes = 1000 * 60 * 60;
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    const diffTime = endTime - startTime;
    return Math.round(diffTime / oneMinutes);
};

export const checkCancelTime = (startTime) => {
    const diff = getDifferentMinBetweenTime(new Date(startTime), new Date());
    return diff < 30 ? true : false
}

export const getFormattedDate = (dateStr) => {
    let result = dateStr;
    if(dateStr && dateStr.includes("-"))
    {
        const dateArr = dateStr.split("-");
        result = `${dateArr[2].substring(0,2)}/${dateArr[1]}/${dateArr[0]}`;
    }
    return result;
}

export const toastInit = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
}

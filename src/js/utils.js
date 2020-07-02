

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
        vn: "Vietnam",
        us: "U.S.",
        jp: "Japan",
        kr: "South Korea",
        ph: "Philippines",
        bg: "Bangladesh",
        id: "India",
        th: "Thailand",
    }
    let result;
    for (const [key, value] of Object.entries(map)) {
        if (value === nation) {
            result = key;
            break;
        }
    }
    return result;
}
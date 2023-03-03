import { connection } from "./database/db.js";

function timeType (timeAs){
    let multiplier
    switch (timeAs.toLowerCase()) {
        case 'seconds': 
            multiplier = 1000
        break;
        case 'minutes': 
            multiplier = 1000*60
        break;
        case 'hours': 
            multiplier = 1000*60*60
        break;
        default:
            multiplier = 1000
        break;
    }

    return multiplier
}

export default function sessionRefresh(timeout, times, timeAs){
    const refresh = timeout/times
    const mltp = timeType(timeAs)

    setInterval(() => {
        Refresh(timeout*mltp)
     }, refresh*mltp);
}

async function Refresh(timeout){
    const timeNow = Date.now() - timeout
    let resp = []
    try {
        resp = await connection.query(`SELECT token FROM sessions WHERE createdAt < $1`, [timeNow]);
    } catch (error) {
        return console.log(error)
    }

    resp.rows.map( async (session) => {
          try {connection.query(`DELETE FROM sessions WHERE token = $1`, [session.token])} 
          catch (err) {console.log(err.message)}
    })
}
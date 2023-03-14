import { API_URL } from './constants'

export function parseURL(url : string) {
    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
        return url
    }
    else {
        return API_URL + url
    }
}
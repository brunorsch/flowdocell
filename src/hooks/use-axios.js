import axios from 'axios'
import { useCallback } from 'react'

export function useAxios(baseURL, headers) {
    const axiosIntance = axios.create({
        baseURL,
        headers,
    })
    
    return useCallback(axiosIntance, [baseURL, headers])
}

import axios from 'axios'

export const dataApi = {
    getData: async (url: string) => {
        const response = await axios.get(url)
        return response.data
    }
}
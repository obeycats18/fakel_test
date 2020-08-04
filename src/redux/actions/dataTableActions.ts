import { DataTab1, DataTab2 } from "../../@types/data.types"

const GET_DATA = 'GET_DATA'
const SET_LOADING = 'SET_LOADING'
const GET_TEMP_DATA = 'GET_TEMP_DATA'


const getDataAction = (data: Array<DataTab1 | DataTab2>) => ({type: GET_DATA, data} as const)
const getTempDataAction = (data: Array<DataTab1 | DataTab2>) => ({type: GET_TEMP_DATA, data} as const)

const setLoadingAction = (loading: boolean) => ({type: SET_LOADING, loading} as const)


export default {getDataAction, setLoadingAction, getTempDataAction}
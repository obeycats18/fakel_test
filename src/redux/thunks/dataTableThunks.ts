import { DataTab1, DataTab2 } from './../../@types/data.types';
import { Dispatch } from 'react'

import dataActions from '../actions/dataTableActions'
import {dataApi} from '../../api'
import { DataActionsT } from '../reducers/dataTableReducers'
import { GlobaleStore } from '../store';

const { getDataAction, getTempDataAction, setLoadingAction } = dataActions

const getDataThunk = (url: string) => async (dispatch: Dispatch<DataActionsT>) => {
    dispatch(setLoadingAction(true))
    const data: Array<DataTab1 | DataTab2> = await dataApi.getData(url)
    if(data) {
        dispatch(setLoadingAction(false))
        dispatch(getDataAction(data))
        dispatch(getTempDataAction(data))
    }
} 

const filterTable = (tabId: number, filterQuery: string) => (dispatch: Dispatch<DataActionsT>, getState: () => GlobaleStore) => {
    let filterLabel = tabId === 1 ? 'title' : 'email'
    
    const {tempData} = getState().data

    if(tempData && tempData.length){
        if(!filterQuery) {
            dispatch(getDataAction(tempData))
        }else {
            const dataItem = tempData.filter( (item: any) => item[filterLabel] === filterQuery.trim() )
            dispatch(getDataAction(dataItem ? dataItem : []))
        }   
    }
}

const sortColumn = (columnName: string) => (dispatch: Dispatch<DataActionsT>, getState: () => GlobaleStore) => {
    const {data} = getState().data
    
    const _sortedData = data.sort( (a:any, b:any) => {
        if(a[columnName] < b[columnName]) return -1
        if(a[columnName] > b[columnName]) return 1
        return 0
    } )

    console.log(_sortedData)

    dispatch(getDataAction(_sortedData))
}

export default {getDataThunk, filterTable, sortColumn}
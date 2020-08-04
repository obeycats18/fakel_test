import dataActions from '../actions/dataTableActions'
import { ActionsType } from '../../@types/actions.types'
import { DataTab1, DataTab2 } from '../../@types/data.types'

type InitialStateT = {
    data: (DataTab1 | DataTab2)[] | [],
    tempData: (DataTab1 | DataTab2)[] | [],
    loading: boolean
}

export type DataActionsT = ActionsType<typeof dataActions>

const initialState: InitialStateT = {
    data: [],
    tempData: [],
    loading: false
}

export const dataReducer = (state = initialState, action: DataActionsT) => {
    switch(action.type){
        case 'GET_DATA': return {
            ...state,
            data: action.data
        }
        case 'GET_TEMP_DATA': return {
            ...state,
            tempData: action.data
        }
        case 'SET_LOADING': return {
            ...state,
            loading: action.loading
        }
        default: return state
    }
}
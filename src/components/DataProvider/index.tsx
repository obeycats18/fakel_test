import React, { useEffect } from 'react'
import {connect, ConnectedProps} from 'react-redux'
import { GlobaleStore } from '../../redux/store'

import dataThunk from '../../redux/thunks/dataTableThunks'
import { DataTab2, DataTab1 } from '../../@types/data.types'

const {getDataThunk} = dataThunk

type DataProviderOwnProps = {
    view: (data: (DataTab1 | DataTab2)[], tabId: number ) => React.ReactNode,
    tabId: number,
    url: string
}

type DataProviderProps = ConnectedProps<typeof _connector> & DataProviderOwnProps

const _mapStateToProps = ({data}: GlobaleStore) => ({
    data: data.data,
    loading: data.loading
})

const DataProvider: React.FC<DataProviderProps> = ({data, getDataThunk, view, url, loading, tabId}) => {


    useEffect( () => {
        getDataThunk(url)
    }, [url])

    return (
        <>
            {
                loading 
                    ? <div className="spinner-border mt-3" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                    : (data && data.length) 
                        ? view(data, tabId)
                        : <div className="jumbotron jumbotron-fluid mt-3">
                            <div className="container">
                            <h1 className="display-4">Нет данных </h1>
                            <p className="lead">Проблема при загрузки или поиск не дал результатов</p>
                            </div>
                        </div>
            }
        </>
    )
}

const _connector = connect(_mapStateToProps, {getDataThunk}) 

export default _connector(DataProvider)
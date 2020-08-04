import React, { useState, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import dataThunks from '../../redux/thunks/dataTableThunks'

const {filterTable} = dataThunks

type _FilterPropsT = {
    tabId: number
}

const Filter: React.FC<_FilterPropsT> = ({tabId}) => {

    const [filterQuery, setFilterQuery] = useState<string>('')
    const dispatch = useDispatch()
    
    const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setFilterQuery(value)
    }

    const _startFilter = () => {
        dispatch(filterTable(tabId, filterQuery))
    }

    const _removeFilter = () => {
        setFilterQuery('')
        dispatch(filterTable(tabId, ''))
    }

    return (
        <div className="row justify-content-between mt-3 mb-2">
            <div className='col-8'>
                <input 
                    className="form-control" 
                    id="filterInput" 
                    type="text"
                    value={filterQuery}    
                    onChange={_onChange}
                />
            </div>
            <div className="col-4" style={{textAlign: 'right'}}>
                <button className="btn btn-success mr-2" onClick={_startFilter}>Отфильтровать</button>
                <button className="btn btn-danger" onClick={_removeFilter}>Очистить</button>
            </div>
        </div>
    )
}

export default Filter;

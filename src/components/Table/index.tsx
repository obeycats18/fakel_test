import React, { useState, useRef, useCallback, useEffect } from 'react'
import { DataTab2, DataAdress, DataTab1 } from '../../@types/data.types'

import throttle from 'lodash/throttle' 
import { useDispatch } from 'react-redux'

import classnames from 'classnames'

import dataThunks from '../../redux/thunks/dataTableThunks'

const {sortColumn} = dataThunks

type _TablePropsT = {
    data: (DataTab1 | DataTab2)[],
    withPagination?: boolean
}

const _capitalizeTitle = (title: string) => {
    return title.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
}

const _renderTableHead = (data: DataTab1 | DataTab2 | {}, clickHandler: (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => void) => {
    const firstItem = data ? data : {}
    const dataKeys = Object.keys(firstItem)

    return dataKeys.map( (title, index) => (
        <th 
            onClick={clickHandler} 
            scope="col" 
            key={index} 
            data-value={title}
            style={{cursor: 'pointer'}}
        >
            {_capitalizeTitle(title)}
        </th>
    ))

}

const _renderTableBody = (data: (DataTab1 | DataTab2)[], maxRow: number, clickedId: number, _trClick: (e: any) => void) => {

    const dataValues = [...data].splice(0, maxRow).map( (item) => Object.values(item) )

    return dataValues.map( (value, index: number) => {
        return <tr 
                onClick={_trClick} 
                className={classnames({'bg-warning': index === clickedId})} 
                data-index={index} 
                key={index}
                style={{cursor: 'pointer'}}
            >{
                value.map( (item, index: number) => {

                    const address = item as DataAdress 

                    return <td key={index}>{
                        item instanceof Object 
                            ? `${address.city} ${address.state} ${address.streetAddress} ${address.zip}`
                            : item
                        }
                    </td>
            } )}
        </tr>
    } )
}



const Table: React.FC<_TablePropsT> = ({data, withPagination = false}) => {

    const [maxRow, setMaxRow] = useState<number>(8)
    const [clickedId, setClickedId] = useState<number>(-1)
    const [columnToSort, setColumnToSort] = useState<string>('')

    const dispatch = useDispatch()

    // Сслыка на DOM-элемент таблицы
    const tableRef = useRef<HTMLTableElement>(null)

    const _debounceScroll = (e:any) => {
        const _target = e.target
        if(_target) {
            const _isTableEnd = (_target.scrollHeight - _target.scrollTop) === _target.clientHeight

            if(_isTableEnd) setMaxRow( maxRow => maxRow + 3 )
        }
    }

    // Событие клика на заголовк таблицы для вызова сортировки
    const _thClick = (e: any) => {
        const {value} = e.target.dataset
        dispatch(sortColumn(value))
        setColumnToSort(value)
    }

    // Собитие клика по определенному ряду таблицы
    const _trClick = (e: any) => {
        const {index} = e.target.parentNode.dataset
        setClickedId(parseInt(index))
    }

    // Используем useSelector для того, чтобы не потелять ссылку на ф-цию, когда компонент будет монтироваться и размонтироваться
    // Оборачиваем callback в ф-цию throttle для того чтобы он выполнялся не каждый раз когда пользователь скролит,
    // а только один раз за 50 мс. Время задержки можно изменить. Использовал throttle вместо debounce, из-за того, что debounce выполняет callback
    // только полсле того как событие завершилось, а throttle выполняет callback один раз даже, когда событие еще выполняется
    const _onScroll = useCallback(throttle(_debounceScroll, 50), [])

    useEffect( () => {
        if(tableRef.current && maxRow >= data.length) {
            tableRef.current.removeEventListener('scroll', _onScroll)
        }
    }, [maxRow, onscroll])

    // Вешаем событие скрола на таблицу и удаляем слушатель, когда компонент был демонтирован
    useEffect( () => {
        const {current} = tableRef
        if(!withPagination) {
            current?.addEventListener('scroll', _onScroll)
        }

        return () => current?.removeEventListener('scroll', _onScroll)
    }, [onscroll])

    return (
        <table ref={tableRef} className="table mt-3" style={{display: 'block', maxHeight: '80vh', overflowY: 'auto'}}>
            <thead className='thead-dark'>
                <tr>
                    {_renderTableHead((data && data.length) ? data[0]: {}, _thClick)}
                </tr>
            </thead>
            <tbody>
                {_renderTableBody(data, maxRow, clickedId, _trClick)}
            </tbody>
        </table>
    )
}

export default Table;

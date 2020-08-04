import React, { useState } from 'react'
import {Tab} from '../index'
import { DataTabT, TabT } from '../../@types/tabs.types'

type _PropsTabsT = {
    tabs: Array<TabT>,
    dataContent: Array<DataTabT>,
}

const _getActivePane = (dataContent: Array<DataTabT>, activeTab: number) => dataContent.find( element => element.paneId === activeTab )

const Tabs: React.FC<_PropsTabsT> = ({tabs, dataContent}) => {

    const [activeTab, setActiveTab] = useState<number>(tabs[0].titleId)

    const _handleTabClick = (e: any) => {
        const _target = e.target
        if(_target) {
            const {index} = _target.dataset
            setActiveTab(parseInt(index))
        }
    }

    return(
        <>
            <ul className="nav nav-pills">
                <Tab tabs={tabs} activeTab={activeTab} handler={_handleTabClick}/>
            </ul>
            <div className='tab-content'>
                {_getActivePane(dataContent, activeTab)?.view}
            </div>    
        </>
    )
}

export default Tabs
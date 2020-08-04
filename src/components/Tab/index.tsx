import React, { useState, MouseEvent} from 'react'

import classnames from 'classnames'
import { TabT } from '../../@types/tabs.types'


type _PropsTabT = {
    tabs: Array<TabT>,
    activeTab: number
    handler: (event: React.MouseEvent<HTMLLIElement>) => void,
}

const Tab: React.FC<_PropsTabT> = ({tabs, activeTab, handler}) => {

    return <>
        {
            tabs.map( tab => {
                return (
                    <li onClick={handler} className="nav-item" key={tab.titleId}>
                        <a data-index={tab.titleId} className={classnames("nav-link", {active: tab.titleId === activeTab})} href="#">{tab.title}</a>
                    </li>
                )   
            })
        }
    </>
}

export default Tab
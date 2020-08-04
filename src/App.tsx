import React from 'react';

import {Tabs, DataProvider, Table, Filter} from './components'
import { TabT, DataTabT } from './@types/tabs.types';
import { DataTab1, DataTab2 } from './@types/data.types';

const _renderView = (data: (DataTab1 | DataTab2)[], tabId: number) => {
  // console.log(data)
  return (
    <>
      <Filter tabId={tabId}/>
      <Table data={data}/>
    </>
  )
}

const _tabs: Array<TabT> = [
  {title: 'Вкладка 1', titleId: 1},
  {title: 'Вкладка 2', titleId: 2},
]

const dataContent: Array<DataTabT> = [
  {
    paneId: 1, 
    view: <DataProvider 
            tabId={1}
            view={_renderView} 
            url='http://www.filltext.com/?rows=300&projectId={number|1000}&title={business}&description={lorem|32}&authorId={number|1000}&phone={phone|(xxx)xxx-xx-xx}&billing={ccNumber|DISC}'
          />
  },
  {
    paneId: 2, 
    view: <DataProvider 
            tabId={2}
            view={_renderView} 
            url='http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}'
          />
  },

]

function App() {
  return (
    <div className="container mt-3">
      <Tabs tabs={_tabs} dataContent={dataContent}/>        
    </div>
  );
}

export default App;

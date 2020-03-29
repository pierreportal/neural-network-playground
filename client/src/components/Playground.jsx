import React, { useState } from 'react'
import DataDrawer from './DataDrawer'
import NetworkDesigner from './NetworkDesigner'

export default function Playground(props) {

    const [nClasses, setNClasses] = useState(1);
    const [nFeatures, setNFeatures] = useState(1);



    const getNClasses = n => setNClasses(n);
    const getNFeatures = n => setNFeatures(n);

    return (
        <div className='playground-panel'>
            <DataDrawer getNFeatures={getNFeatures} getNClasses={getNClasses} getData={props.getData} />
            <NetworkDesigner nFeatures={nFeatures} nOutput={nClasses} getNParameters={props.getNParameters} />
        </div>
    )
}
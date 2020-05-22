import React from 'react'

export default function Node(props) {
    const { index, layerType } = props
    // const positionOnCanvas = 
    return (
        <div className='network-neuron'>
            <p>{layerType === 'input' ? 'x' : layerType === 'output' ? 'y' : ''}{index + 1}</p>
        </div>
    )
}
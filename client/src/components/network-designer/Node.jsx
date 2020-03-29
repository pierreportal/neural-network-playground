import React from 'react'

export default function Node(props) {
    const { index, weight, bias, layerType } = props
    return (
        <div className='network-neuron'>
            {/* <span className='network-neuron-bias'>{bias}</span> */}
            <p>{layerType === 'input' ? 'x' : layerType === 'output' ? 'y' : ''}{index + 1}</p>
        </div>
    )
}
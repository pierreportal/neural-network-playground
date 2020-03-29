import React from 'react'
import Node from './Node'
// import DropDown from '../utils/Dropdown'

export default function Layer(props) {
    const { networkWidth, index, dim, type, activation } = props.constructor;
    const color = index % 2 === 0 ? '#eee' : '#fff'
    const style = {
        width: `${100 / networkWidth}%`,
        backgroundColor: color
    }
    const addNeuron = () => props.addNeuron(index)

    const subNeuron = () => {
        dim[0] >= 2 && props.subNeuron(index)
    }
    const changeActivation = e => {
        const input = e.target.innerText.trim()
        if (!['relu', 'tanh'].includes(input)) e.target.innerText = 'relu'
        else {
            props.changeActivation(index, input)
            e.target.innerText = input
        }
    }

    const addSubNeurons = (<>
        <button onClick={addNeuron} className='network-add-neuron'>+</button>
        {dim[0] > 1 && <button onClick={subNeuron} className='network-add-neuron'>-</button>}
    </>)

    const nodes = new Array(dim[0]).fill().map((_, i) => <Node key={i} index={i} weight={.0} bias={.0} layerType={type} />)

    const displayedNodes = nodes.length > 4 ? [nodes.slice(0, 3), '...', nodes.slice(-1)] : nodes
    return (
        <>
            <div className='network-layer' style={style}>

                <div className='network-layer-names'>
                    {props.constructor.type === 'input' && <p>x</p>}
                    {props.constructor.type === 'hiden' && <p>l{index}</p>}
                    {props.constructor.type === 'output' && <p>y</p>}
                </div>

                <div className='layer-nodes'>
                    {displayedNodes}

                    <div className='layer-activation' onBlur={changeActivation} contentEditable={props.constructor.type === 'hiden'}>{activation}</div>
                </div>



                <div className='layer-buttons'>
                    {props.constructor.type === 'hiden' && addSubNeurons}
                </div>
            </div>
        </>
    )
}
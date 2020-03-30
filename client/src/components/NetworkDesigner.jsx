import React, { useState, useEffect } from 'react'
import Layer from './network-designer/Layer'

export default function NetworkDesigner(props) {
    const inputLayer = { dim: [props.nFeatures, 1], activation: props.nFeatures > 1 ? 'relu' : null, type: 'input' }
    const outpuLayer = { dim: [props.nOutput, 1], activation: null, type: 'output' }

    const [state, setState] = useState({
        nOutput: props.nOutput,
        nFeatures: props.nFeatures,
        epochs: 200,
        optimizer: 'rmsprop',
        learningRate: '1e-3',
        lossFunction: 'binary-crossentropy',
        batch_size: 164,
        layers: [
            inputLayer,
            outpuLayer
        ]
    })

    const nParameters = () => {
        const W = state.layers.slice(0, state.layers.length - 1).map((layer, i) => layer.dim[0] * state.layers[i + 1].dim[0]).reduce((a, b) => a + b)
        const b = state.layers.slice(1, state.layers.length).map(layer => layer.dim[0]).reduce((a, b) => a + b)
        const nParams = W + b
        return { weights: W, bias: b, nParams: nParams, layers: state.layers, batch_size: state.batch_size, optimizer: state.optimizer, lossFunction: state.lossFunction, learningRate: state.learningRate, epochs: state.epochs }
    }
    useEffect(() => {
        props.getNParameters(nParameters())
    }, [state])


    useEffect(() => {
        const inputLayer = { dim: [props.nFeatures, 1], activation: props.nFeatures > 1 ? 'relu' : null, type: 'input' }
        const outpuLayer = { dim: [props.nOutput <= 2 ? 1 : props.nOutput, 1], activation: props.nFeatures === 1 ? null : props.nOutput <= 2 ? 'sigmoid' : 'softmax', type: 'output' }
        setState({
            ...state,
            layers: [inputLayer, ...state.layers.slice(1, state.layers.length - 1).map(l => ({ ...l, activation: props.nFeatures === 1 ? null : 'relu' })), outpuLayer],
            lossFunction: props.nOutput >= 3 ? 'categorical-crossentropy' : 'binary-crossentropy',
        })
    }, [props.nFeatures, props.nOutput])


    const changeActivation = (layerIndex, input) => {
        setState({ ...state, layers: [...state.layers].map((l, i) => i === layerIndex ? { ...l, activation: input } : l) })
    }
    const addNeuron = layerIndex => {
        setState({ ...state, layers: [...state.layers].map((l, i) => i === layerIndex ? { ...l, dim: [l.dim[0] >= 8 ? l.dim[0] * 2 : l.dim[0] + 1, l.dim[1]] } : l) })
    }
    const subNeuron = layerIndex => {
        setState({ ...state, layers: [...state.layers].map((l, i) => i === layerIndex ? { ...l, dim: [l.dim[0] > 8 ? l.dim[0] / 2 : l.dim[0] - 1, l.dim[1]] } : l) })
    }
    const addLayer = () => {
        const layers = [...state.layers];
        const outputLayer = layers.pop();
        setState({
            ...state, layers: [...layers, { dim: [3, 1], activation: props.nFeatures === 1 ? null : 'relu', type: 'hiden' }, outputLayer]
        })
    }
    const subLayer = () => {
        if (state.layers.length < 3) return;
        const layers = [...state.layers];
        const outputLayer = layers.pop();
        layers.pop()
        setState({
            ...state, layers: [...layers, outputLayer]
        })
    }
    const addLayersButtons = (
        <div className='add-layer-buttons'>
            {state.layers.length <= 5 && <button onClick={addLayer}>{state.layers.length === 2 ? 'Insert layer ' : '+'}</button>}
            {state.layers.length > 2 && <button onClick={subLayer}>-</button>}
        </div>
    )
    const layerCols = state.layers.map((layer, i) => {
        return <Layer key={i} subNeuron={subNeuron} addNeuron={addNeuron} changeActivation={changeActivation} constructor={{ ...layer, networkWidth: state.layers.length + 1, index: i }} />
    });

    const displayedLayers = layerCols.map((x, i) => {
        return i === layerCols.length - 2 ? [x, addLayersButtons] : x
    })

    return (
        <div className='network-panel'>
            {displayedLayers}
        </div>
    )
}
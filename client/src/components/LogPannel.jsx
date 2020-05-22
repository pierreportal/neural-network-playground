import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HorizontalTagsCloud from './utils/HorizontalTagsCloud';



export default function LogPannel(props) {
    const [state, setState] = useState({
        isTraining: false,
        trainingHistory: null,
        testingAvailable: false
    })
    const [params, setParams] = useState({
        epochs: props.networkParams && props.networkParams.epochs,
        optimizer: props.networkParams && props.networkParams.optimizer,
        learningRate: props.networkParams && props.networkParams.learningRate,
        batch_size: props.networkParams && props.networkParams.batch_size,
        nParams: props.networkParams && props.networkParams.nParams,
        lossFunction: props.networkParams && props.networkParams.layers[props.networkParams.layers.length - 1].dim[0] > 2 ? 'categorical-crossentropy' : 'binary-crossentropy'
    })

    const summary = props.networkParams && props.networkParams.layers.map(layer => {
        return <li>
            {layer.type === 'input' ? 'Input' : layer.type === 'output' ? 'Output' : 'Dense'} layer ({layer.dim[0]}) {layer.activation && `activation: ${layer.activation}`}
        </li>
    })

    useEffect(() => {
        setParams({
            epochs: props.networkParams && props.networkParams.epochs,
            optimizer: props.networkParams && props.networkParams.optimizer,
            learningRate: props.networkParams && props.networkParams.learningRate,
            batch_size: props.networkParams && props.networkParams.batch_size,
            nParams: props.networkParams && props.networkParams.nParams,
            lossFunction: props.networkParams && props.networkParams.layers[props.networkParams.layers.length - 1].dim[0] > 2 ? 'categorical-crossentropy' : 'binary-crossentropy'
        })
        setState({
            ...state,
            testingAvailable: false
        })
    }, [props])

    const getTheData = () => { }

    const changeParamsFromLogs = (param, tag) => setParams({ ...params, [param]: tag })

    const compileModel = () => {
        if (state.isTraining || !props.data.length) return
        const { networkParams, data } = props;
        setState({
            ...state,
            isTraining: true,
            trainingHistory: null,
            testingAvailable: false
        })
        axios.post('/model', { "networkParams": networkParams, "data": data }).then(res => {

            const trainingHistory = JSON.parse([...res.data].map(x => x === "'" ? '"' : x).join(""));

            setState({
                ...state,
                isTraining: false,
                trainingHistory: trainingHistory,
                testingAvailable: true
            })
        }).catch(err => console.log(err))
    }
    const testModel = () => {
        console.log('TEST MODE')
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", textAlign: 'left' }}>
            <div className='log-panel'>
                <div>
                </div>
                <ul>
                    - Model:
                {summary}
                    <li>n params: {params.nParams}</li>
                </ul>
                <div>
                    <ul>

                        <li>optimizer: <span style={{ display: 'inline-block' }}>
                            <HorizontalTagsCloud param={'optimizer'}
                                onSelect={changeParamsFromLogs} cloud={['adam', 'rmsprop', 'stochastic-gradient-descent']}
                                selection={params.optimizer}
                                highlight={{ backgroundColor: '#fff' }}
                            >{params.optimizer}</HorizontalTagsCloud></span></li>

                        <li>batch size: <span style={{ display: 'inline-block' }}>
                            <HorizontalTagsCloud param={'batch_size'}
                                onSelect={changeParamsFromLogs} cloud={['none', '16', '32', '64', '128', '256']}
                                highlight={{ backgroundColor: '#fff' }}
                            >{params.batch_size}</HorizontalTagsCloud></span></li>

                        <li>loss: <span style={{ display: 'inline-block' }}>
                            <HorizontalTagsCloud param={'lossFunction'}
                                onSelect={changeParamsFromLogs} cloud={['binary-crossentropy', 'categorical-crossentropy']}
                                highlight={{ backgroundColor: '#fff' }}
                            >{params.lossFunction}</HorizontalTagsCloud></span></li>

                        <li>learning rate: <span style={{ display: 'inline-block' }}>
                            <HorizontalTagsCloud param={'learningRate'}
                                onSelect={changeParamsFromLogs} cloud={['1e-1', '1e-2', '1e-3', '3e-1', '3e-2', '3e-3']}
                                highlight={{ backgroundColor: '#fff' }}
                            >{params.learningRate}</HorizontalTagsCloud></span></li>


                        <li>epochs: <span style={{ display: 'inline-block' }}>
                            <HorizontalTagsCloud param={'epochs'}
                                onSelect={changeParamsFromLogs} cloud={[50, 100, 150, 200, 300, 500]}
                                highlight={{ backgroundColor: '#fff' }}
                            >{params.epochs}</HorizontalTagsCloud></span></li>

                    </ul>
                </div>

                <div className='log-panel-buttons'>
                    {props.data.length && !state.isTraining ? (
                        <>
                            <button className="log-panel-data-button" onClick={getTheData}>Get the data</button>
                            {state.testingAvailable ? <button className="log-panel-test-button" onClick={testModel}>Test the model</button> : <button className="log-panel-compile-button" onClick={compileModel}>Compile the model</button>}
                        </>)
                        : null}

                    {state.isTraining && `Training...`}
                    {state.trainingHistory && `End of raining, accuracy: ${(JSON.parse(state.trainingHistory['acc']).splice(-1)[0] * 100).toFixed(1)}%`}
                </div>

            </div >
        </div>
    )
}
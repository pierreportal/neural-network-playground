import React, { useState, useEffect } from 'react'
import axios from 'axios'



export default function LogPannel(props) {
    const [state, setState] = useState({
        isTraining: false,
        trainingHistory: null,
        testingAvailable: false
    })
    const params = {
        epochs: props.networkParams && props.networkParams.epochs,
        optimizer: props.networkParams && props.networkParams.optimizer,
        learningRate: props.networkParams && props.networkParams.learningRate,
        lossFunction: props.networkParams && props.networkParams.lossFunction,
        batch_size: props.networkParams && props.networkParams.batch_size,
        nParams: props.networkParams && props.networkParams.nParams
    }
    const summary = props.networkParams && props.networkParams.layers.map(layer => {

        return <li> {layer.type === 'input' ? 'Input' : layer.type === 'output' ? 'Output' : 'Dense'} layer ({layer.dim[0]}) {layer.activation && `, activation = ${layer.activation}`}</li>
    })

    useEffect(() => {
        setState({
            ...state,
            testingAvailable: false
        })
    }, [props])

    const getTheData = () => {
        // console.log(props.data)
        // setDisplayedData(props.data.map(x => <li key={x[0]}>{x.join(', ')}</li>))
    }
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

    // const summaryLine = Object.keys(params).map((k, i) => <li key={i}>{k}: <span className="log-pannel-color-text">{params[k]}</span></li>)

    return (
        <div style={{ display: "flex", flexDirection: "column", textAlign: 'left' }}>
            <div className='log-panel'>
                <div>
                </div>
                <ul>
                    - Model:
                {summary}
                    <li>n_params: {params.nParams}</li>
                </ul>
                <div>
                    <ul>
                        <li>optimizer: {params.optimizer}</li>
                        <li>batch size: {params.batch_size}</li>
                        <li>loss:  {params.lossFunction}</li>
                        <li>learning rate: {params.learningRate}</li>
                        <li>epochs:  {params.epochs}</li>
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
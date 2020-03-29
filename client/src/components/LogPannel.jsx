import React from 'react'
import axios from 'axios'

export default function LogPannel(props) {
    const params = {
        weights: (props.networkParams && props.networkParams.weights) || 'none',
        bias: (props.networkParams && props.networkParams.bias) || 'none',
        nParams: (props.networkParams && props.networkParams.nParams) || '0'
    }
    const summary = props.networkParams && props.networkParams.layers.map(layer => {

        return <li> {layer.type === 'input' ? 'Input' : layer.type === 'output' ? 'Output' : 'Dense'} layer ({layer.dim.join(', ')}) {layer.activation && `, activation = ${layer.activation}`}</li>
    })

    const getTheData = () => {
        // console.log(props.data)
        console.log(props.data)
    }
    const compileModel = () => {
        const { networkParams, data } = props;
        axios.post('/model', { "networkParams": networkParams, "data": data }).then(res => {
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    const summaryLine = Object.keys(params).map((k, i) => <li key={i}>{k}: <span className="log-pannel-color-text">{params[k]}</span></li>)

    return (
        <div className='log-panel'>
            <div>
            </div>
            <ul>
                Model:
                    {summary}
            </ul>
            <div>
                <ul>
                    Params:
                {summaryLine}
                </ul>
            </div>

            <div className='log-panel-buttons'>
                <button onClick={getTheData}>Get the data</button>
                <button onClick={compileModel}>train the model</button>
            </div>
        </div>
    )
}
import React, { useState, useEffect } from 'react'

const colors = ['coral', 'lightgreen', 'cyan', 'green']

export default function DataDrawer(props) {
    const [state, setState] = useState({
        color: 'coral',
        data: [],
        spreading: 35,
        nPoints: 10
    });
    const createPoint = e => {
        // const coordinates = [e.clientX, e.clientY]
        const coordinates = [e.pageX, e.pageY]
        const cluster = new Array(state.nPoints).fill().map((_) => {
            const randY = (coordinates[1] - state.spreading / 2) + Math.random() * state.spreading
            const randX = (coordinates[0] - state.spreading / 2) + Math.random() * state.spreading
            return [randX, randY, state.color]
        })
        setState({
            ...state,
            data: [...state.data, ...cluster.filter(point => point[1] < 530 && point[0] < 580 && point[1] > 10 && point[0] > 10)]
        });
    }
    const howManyClasses = () => {
        return state.data && [...new Set(state.data.map(x => x[2]))].length;
    }
    const howManyFeatures = () => {
        return state.data && Math.max(1, Math.min(2, [...new Set(state.data.map(x => x[2]))].length));
    }

    const changeSpread = e => {
        setState({
            ...state,
            spreading: e.target.value,
        });
    }
    const changeColor = newColor => {
        setState({
            ...state,
            color: newColor
        });
    }
    const clearColor = color => {
        setState({
            ...state,
            data: state.data.filter(c => c[2] !== color)
        });
    }

    useEffect(() => {
        props.getNClasses(howManyClasses())
        props.getNFeatures(howManyFeatures())
        props.getData(state.data)
    }, [state])

    const dataPoints = state.data.length ? state.data.map((point, i) => <div key={i} className="data-point" style={{ top: point[1], left: point[0], backgroundColor: point[2] }}></div>) : <p>Draw your data by clicking here.</p>

    const colorPads = colors.map(color => {
        return (
            <div className='color-pad-container'>
                {[...new Set(state.data.map(x => x[2]))].includes(color) && <button className='data-point-clear-button' onClick={() => clearColor(color)}>clear</button>}
                <div key={color} className='color-pad' onClick={() => changeColor(color)} style={{ backgroundColor: color, borderRadius: color === state.color ? '20%' : '50%' }}></div>
            </div>
        )
    })

    return (
        <div>
            <div onMouseDown={createPoint} className='data-panel' style={{ width: '600px', height: '560px' }}>
                {dataPoints}
            </div>
            <div className="color-palete">
                <input type="range" max={80} min={20} onChange={changeSpread} />
                {colorPads}
            </div>
        </div>
    )
}
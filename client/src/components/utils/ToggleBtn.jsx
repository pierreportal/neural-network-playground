import React, { useState } from 'react'

export default function ToggleBtn(props) {
    const { selected, list, colorIndice, color, fontColor } = props;

    const [selection, setSelection] = useState(selected || list[0])

    const style = {
        backgroundColor: colorIndice ? colorIndice[list.indexOf(selection) % colorIndice.length] : color ? color : '#dedede',
        padding: '0 3px',
        borderRadius: '3px',
        cursor: 'pointer',
        color: fontColor && (typeof fontColor === 'object' ? fontColor[list.indexOf(selection) % fontColor.length] : fontColor)
    }

    const next = () => {
        const nextChoice = list[(list.indexOf(selection) + 1) % list.length]
        setSelection(nextChoice)
        props.onSelect(nextChoice)
    }

    return <div style={style} onClick={next}>{selection}</div>
}

/*
Usage:

<span style={{ display: 'inline-block' }}>          // to display component inline

    <ToggleBtn
        onSelect={selectFromToggle}
        selected={'oui'}                            // default: first item in 'list'
        list={['oui', 'non', 'peut être']}
        colorIndice={['green', 'red', 'blue']}      // default: '#dedede'
        fontColor={['red', 'green', 'orange']}      // accept single color, array, default: 'black'
    />

</span>
*/
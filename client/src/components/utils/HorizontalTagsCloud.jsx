import React, { useState, useEffect } from 'react'

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: 'auto'
}
const cloudStyle = {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
    width: 'auto',
}
const tagStyle = {
    cursor: 'pointer',
    padding: '0 3px',
    margin: '0 3px',
    borderRadius: '3px'
}
const selectedStyle = {
    cursor: 'pointer',
    width: 'auto',
    padding: '0 3px',
    marginRight: '3px',
    borderRadius: '3px'
}


export default function HorizontalTagsCloud(props) {

    const { param, cloud, highlight } = props;

    const [selected, setSelected] = useState(props.children)

    const [customSelect, setCustomSelect] = useState(false)

    useEffect(() => {
        if (!customSelect) setSelected(props.children)
    }, [props])

    const [display, setDisplay] = useState(false)

    const selectTag = tag => {
        setCustomSelect(true)
        setSelected(tag)
        setDisplay(false)
        props.onSelect(param, tag)
    }
    const displayCloud = () => {
        setDisplay(!display)
    }

    const tags = cloud.filter(tag => tag !== selected).map(tag => <li style={{ ...tagStyle, ...highlight }} onClick={() => selectTag(tag)} key={tag} > {tag}</li >)

    return (
        <span style={containerStyle}>
            <span style={{ ...selectedStyle, backgroundColor: display ? highlight.backgroundColor : '#dedede' }} onClick={displayCloud}>{selected}</span>
            {display && <ul style={cloudStyle}>{tags}</ul>}
        </span>
    )
}

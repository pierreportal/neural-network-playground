import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function DropDown(props) {

    const { placeholder, selected, options } = props

    const [state, setState] = useState({
        selectedOption: selected,
        show: false
    })

    useEffect(() => {
        props.onSelect(state.selectedOption)
    }, [props, state.selectedOption])

    const selectOption = option => setState({
        selectedOption: option,
        show: false
    })

    const toogleContainer = () => setState({ ...state, show: !state.show })

    const Container = styled.div`

  height: 40px;
  position: relative;
  vertical-align: middle;
  `;

    const ToogleBtn = styled.div`
    background-color: #efefef;
    color: #636b6f;
    min-width: 160px;
    text-transform: none;
    font-weight: 300;
    margin-bottom: 7px;
    box-shadow: none;
    border-radius: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover {
        background: #e1e1e1;
  cursor: pointer;
    }
        `;

    const ListItem = styled.ul`
    position: absolute;
    top: 100%;

    z-index: 1000;
    float: left;
    min-width: 100%;
    padding: 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
    border-radius: 0 0 3px 3px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.175);
    `;
    const Option = styled.li`
    padding: 10px 0px;
  display: block;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  margin: 0;
  &:hover {
    background: #efefef;
  color: #409fcb;
  }
    `;
    const Caret = styled.span`
    width: 0;
    position: absolute;
    top: 19px;
    height: 0;
    margin-left: -24px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid ;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    right: 10px;
    `;


    const listOfOptions = (<ListItem className="container"> {options.map((x, i) => {
        return <Option onClick={() => selectOption(x)} key={i}>{x}</Option>
    })} </ListItem>)



    return (
        <Container>
            <ToogleBtn onClick={toogleContainer}>{state.selectedOption || placeholder} <Caret /></ToogleBtn>
            {state.show && listOfOptions}
        </Container>
    )
}
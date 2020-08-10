import React, { useState, useEffect, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import ObjectiveContext from './context/objective/objectiveContext'

const Typeahead = ({ list }) => {
    const objectiveContext = useContext(ObjectiveContext)
    const {
        objective: { options, populate, substringBold, inputBold, hoverHighlight, navigable, outsideClose },
        objective,
        setObjective
    } = objectiveContext

    const [open, setOpen] = useState(true)

    const [inputData, setInputData] = useState({
        colorPick: '',
        colorList: [],
        colorHighlightIndexes: []
    })

    const { colorPick, colorList, colorHighlightIndexes } = inputData


    const onChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
            colorList: filteredList(e),
            colorHighlightIndexes: filteredList(e).map(item => spaceColorNames(item).toLowerCase().search(e.target.value))
        })
        // console.log(colorHighlightIndexes)
    }

    const filteredList = (e) => list.filter(item => spaceColorNames(item).toLowerCase().includes(e.target.value.toLowerCase()))

    const spaceColorNames = (item) => item.replace(/([A-Z])/g, ' $1').trim();

    const isListOpen = () => open && colorList.length > 0 && colorPick !== '' ? true : false

    const onInputEvent = (e) => {
        if (e.key === 'Escape') {
            setOpen(false)
        } else if (e.key === 'Tab') {
            !navigable && setObjective({ ...objective, navigable: true })
        } else if (e.key !== undefined) {
            !options && !substringBold && !inputBold &&
                setObjective({ ...objective, options: true, substringBold: true, inputBold: true })
            setOpen(true)
        } else if (e.type === 'focus') {
            setOpen(true)
        }
    }

    const onLiKeyDown = (e) => {
        if (e.key === 'Enter') {
            setInputData({
                ...inputData,
                colorPick: e.target.innerText,
                colorList: list.filter(item => spaceColorNames(item).toLowerCase().includes(e.target.innerText.toLowerCase()))
            })
            setOpen(false)
        } else if (e.key === 'Escape') {
            setOpen(false)
        }
    }

    const setLiHtml = (item, index) => {
        const boldText = item.slice(colorHighlightIndexes[index], colorPick.length + colorHighlightIndexes[index])
        const text = `${item.replace(boldText, `<b>${boldText}</b>`)}`
        return text
    }


    // handling for closing list on outside click
    useEffect(() => {
        return () => {
            document.removeEventListener("mousedown", onClickEscape);
        };
    });

    const onClickEscape = (e) => {
        if (containerRef.current.contains(e.target)) {
            return;
        }
        isListOpen() && !outsideClose && setObjective({ ...objective, outsideClose: true })
        setOpen(false)
    }

    const containerRef = useRef();
    document.addEventListener("mousedown", onClickEscape);


    return (
        <div ref={containerRef} className='container'>
            <input
                onKeyDown={onInputEvent}
                onFocus={onInputEvent}
                className='color-input'
                onChange={onChange}
                value={colorPick}
                name="colorPick"
                type="text"
                placeholder='Type to choose color...'
            />
            {isListOpen() &&
                <ul className='dropdown-parent'>
                    {colorList.map((item, index) => {
                        return (
                            <li
                                className='dropdown-item'
                                key={index}
                                autoFocus
                                tabIndex={0}
                                onKeyDown={onLiKeyDown}
                                onClick={() => {
                                    setOpen(false)
                                    setInputData({ ...inputData, colorPick: spaceColorNames(item) })
                                    !populate && setObjective({ ...objective, populate: true })
                                }}
                                onMouseOver={() => !hoverHighlight && setObjective({ ...objective, hoverHighlight: true })}
                                dangerouslySetInnerHTML={{ __html: setLiHtml(spaceColorNames(item), index) }}
                            />
                        )
                    })}
                </ul>
            }
        </div>

    )
}

Typeahead.propTypes = {
    list: PropTypes.array.isRequired
}

export default Typeahead

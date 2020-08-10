import React, { useContext } from 'react'
import ObjectiveContext from './context/objective/objectiveContext'

const ObjectiveList = () => {
    const objectiveContext = useContext(ObjectiveContext)
    const {
        objective: { options, populate, substringBold, inputBold, hoverHighlight, navigable, outsideClose },
        setObjective
    } = objectiveContext

    const reset = () => {
        setObjective({
            options: false,
            populate: false,
            substringBold: false,
            inputBold: false,
            hoverHighlight: false,
            navigable: false,
            outsideClose: false
        })
    }

    const objectivesComplete = () => {
        if (options && populate && substringBold && inputBold && hoverHighlight && navigable && outsideClose) return true
    }

    return (
        <div className="container">
            <ol className='objective-list'>
                <li className={options ? 'active' : undefined} >As the user types in the input field, a list of options should appear  below it.</li>
                <li className={populate ? 'active' : undefined} >Clicking on a list item should populate the input with the selected item's value and hide the list.</li>
                <li className={substringBold ? 'active' : undefined} >As the user types, the matching substring within the dipslayed options should be bold.</li>
                <li className={inputBold ? 'active' : undefined} >For visible options, style the substring the user has entered as bold.</li>
                <li className={hoverHighlight ? 'active' : undefined} >Mousing over a list item should highlight it, at least darkening its background color.</li>
                <li className={navigable ? 'active' : undefined} >The input and list should also be navigable using the keyboard.</li>
                <li className={outsideClose ? 'active' : undefined} >Clicking outside the input or the list should close the list.</li>
                {objectivesComplete() &&
                    <>
                        <li className='active-plus active'>Impress hiring team.</li>
                        <button onClick={reset}>reset</button>
                    </>
                }
            </ol>
        </div>

    )
}

export default ObjectiveList

import React from 'react'
import Typeahead from './Typeahead'
import ObjectiveState from './context/objective/ObjectiveState'
import ObjectiveList from './ObjectiveList'

const App = ({ list }) => {

    return (
        <ObjectiveState>

            <div className="pageWrapper">
                <div className="container">
                    <h1><a href='http://gavin-carter.com' target='_blank' rel="noopener noreferrer">Gavin Carter</a> <span>Submission</span></h1>
                </div>
                <section>
                    <Typeahead list={list} />
                    <ObjectiveList />
                </section>
            </div>
        </ObjectiveState>

    )
}

export default App

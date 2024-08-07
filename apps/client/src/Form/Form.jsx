import React from 'react'

const Form = ({ onOwnerChange, onRepoChange }) => {
    return (
        <form id="info">
            <fieldset>
                <legend>Your info</legend>
                <select
                    name="owner"
                    id="owner"
                    className="form-select mb-3"
                    onChange={onOwnerChange}
                >
                    <option value="">-- Select your name --</option>
                    <option value="pydantic">pydantic</option>
                </select>
                <select
                    name="repo"
                    id="repo"
                    className="form-select mb-3"
                    onChange={onRepoChange}
                >
                    <option value="">
                        -- Select repository --
                    </option>
                    <option value="FastUI">FastUI</option>
                </select>
            </fieldset>
        </form>
    )
}

export default Form

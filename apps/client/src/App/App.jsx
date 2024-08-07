import React, { useState, useEffect, useCallback } from 'react'
import Issue from '../Issue/Issue'
import Form from '../Form/Form'
const App = () => {
    const [repoOwner, setRepoOwner] = useState('')
    const [repoName, setRepoName] = useState('')
    const [github, setGithub] = useState({
        description: 'Select your repo  to see your tickets track.',
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleOwnerChange = (eve) => {
        const { value: newOwner } = eve.target
        setRepoOwner(newOwner)
    }

    const handleRepoChange = (eve) => {
        const { value: newRepo } = eve.target
        setRepoName(newRepo)
    }

    const fetchData = useCallback(() => {
        const token = process.env.REACT_APP_GITHUB_PERSONAL_TOKEN;
        if (!!repoOwner && !!repoName) {
            setIsLoading(true)
            fetch('/api/github', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    repoOwner,
                    repoName,
                    token
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    const { data } = response
                    console.log('res: ',response)
                    !!data && setGithub(data)
                    setIsLoading(false)
                })
        }
    }, [repoOwner, repoName])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className="container">
            <header className="row">
                <h1 className="col">Issues React App</h1>
            </header>
            <div className="row">
                <div className="col-md-6">
                    <Form
                        onOwnerChange={handleOwnerChange}
                        onRepoChange={handleRepoChange}
                    />
                </div>
                <div className="col-md-5">
                    <Issue
                        repoOwner={repoOwner}
                        repoName={repoName}
                        isLoading={isLoading}
                        github={github}
                    />
                </div>
            </div>
        </div>
    )
}

export default App

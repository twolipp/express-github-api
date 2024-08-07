const path = require('path')
const express = require('express')
require('dotenv').config()
const GithubAPI = require('./utils/api')

// Create the app
const app = express()

// Add json parsing middleware
app.use(express.json())

// Setup static directory to serve
app.use(express.static(path.resolve(__dirname, '..', '../client/build')))

// Response to the POST request made by submitting the app's form
app.post('/api/github', async (request, response) => {
    const { repoOwner, repoName, token } = request.body
    if (!repoOwner || !repoName || !token) {
        return response.status(404).send({
            error: 'Please provide all details',
        })
    }

    try {
        let issues = []
        if (token) {
            issues = await GithubAPI.githubFetchContributorsForPage(repoOwner, repoName, token)
        }
    
        return response.json({ issues })
    } catch (err) {
        console.error(err)
        return response.status(500).json({
            error: 'Something went wrong on the server side',
        })
    }
})

// Create base URL route "/" and render index view
app.get('*', (request, response) => {
    response.sendFile(
        path.resolve(__dirname, '..', '../client/build/index.html')
    )
})

// Initialize application port
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

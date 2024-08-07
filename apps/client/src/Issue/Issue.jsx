import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Issue = ({ isLoading, repoOwner, github }) => {
    const { edges } =
    github
    console.log(github)
    return (
        <>
            <h2>Your issues</h2>
            {!!repoOwner && <p>Sign as: {repoOwner}</p>}
          
            <p>{isLoading ? <Skeleton count={4} /> : edges}</p>
        </>
    )
}

export default Issue

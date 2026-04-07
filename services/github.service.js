import env from "../config/env.js"

const GITHUB_API = "https://api.github.com"

const headers = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json"
}

export const getGithubProfile = async (username) => {
    const response = await fetch(`${GITHUB_API}/users/${username}`, { headers })
    
    if(!response.ok) {
        throw new Error("GitHub user not found")
    }
    
    return await response.json()
}

export const getGithubRepos = async (username) => {
    const response = await fetch(
        `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=10`, 
        { headers }
    )
    
    return await response.json()
}
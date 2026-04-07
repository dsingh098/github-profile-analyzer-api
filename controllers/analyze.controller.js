import { getGithubProfile, getGithubRepos } from "../services/github.service.js"
import { getPublicAnalysis, getDetailedAnalysis } from "../services/ai.service.js"

export const analyzePublic = async (req, res) => {
    try {
        const { username } = req.params

        const profile = await getGithubProfile(username)
        const repos = await getGithubRepos(username)

        const filteredData = {
            name: profile.name,
            username: profile.login,
            bio: profile.bio,
            avatar: profile.avatar_url,
            location: profile.location,
            publicRepos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            blog: profile.blog,
            twitterUsername: profile.twitter_username,
            repos: repos.map(repo => ({
                name: repo.name,
                description: repo.description,
                language: repo.language,
                stars: repo.stargazers_count,
            }))
        }

        // AI se short summary lo
        const aiSummary = await getPublicAnalysis(filteredData)

        return res.status(200).json({
            data: filteredData,
            aiSummary
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const analyzeDetailed = async (req, res) => {
    try {
        const { username } = req.params

        const profile = await getGithubProfile(username)
        const repos = await getGithubRepos(username)

        const filteredData = {
            name: profile.name,
            username: profile.login,
            bio: profile.bio,
            avatar: profile.avatar_url,
            location: profile.location,
            publicRepos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            blog: profile.blog,
            twitterUsername: profile.twitter_username,
            repos: repos.map(repo => ({
                name: repo.name,
                description: repo.description,
                language: repo.language,
                stars: repo.stargazers_count,
            }))
        }

        // AI se detailed analysis lo
        const aiAnalysis = await getDetailedAnalysis(filteredData)

        return res.status(200).json({
            data: filteredData,
            aiAnalysis
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
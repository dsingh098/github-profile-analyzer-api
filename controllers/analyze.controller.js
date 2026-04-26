import { getGithubProfile, getGithubRepos } from "../services/github.service.js"
import { getAIAnalysis } from "../services/ai.service.js"

const isValidUsername = (username) => /^[a-zA-Z0-9_-]+$/.test(username)

export const analyzeProfile = async (req, res) => {
    try {
        const { username } = req.params

        if (!username || !isValidUsername(username)) {
            return res.status(400).json({ message: "Invalid GitHub username" })
        }

        // GitHub se data fetch karo
        const profile = await getGithubProfile(username)
        const repos = await getGithubRepos(username)

      

        // Total stars
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

        // Language frequency count
        const languageMap = {}
        repos.forEach(repo => {
            if (repo.language) {
                languageMap[repo.language] = (languageMap[repo.language] || 0) + 1
            }
        })

        // Most used language
        const mostUsedLanguage = Object.entries(languageMap)
            .sort((a, b) => b[1] - a[1])
            .map(([lang]) => lang)

        // Profile data jo AI ko bhejna hai
        const profileData = {
            name: profile.name,
            username: profile.login,
            bio: profile.bio,
            location: profile.location,
            publicRepos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            hasBlog: !!profile.blog,
            hasTwitter: !!profile.twitter_username,
            totalStars,
            languageMap,
            repos: repos.map(repo => ({
                name: repo.name,
                description: repo.description,
                language: repo.language,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
            }))
        }

        // AI se analysis lo
        const aiResult = await getAIAnalysis(profileData)

        // Final response
        return res.status(200).json({
            profile: {
                name: profile.name,
                username: profile.login,
                bio: profile.bio,
                avatar: profile.avatar_url,
                location: profile.location,
                publicRepos: profile.public_repos,
                followers: profile.followers,
                following: profile.following,
                blog: profile.blog || null,
                twitterUsername: profile.twitter_username || null,
                githubUrl: profile.html_url,
            },
            stats: {
                totalStars,
                totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
                mostUsedLanguages: mostUsedLanguage,  // array — top pe most used
                topRepos: repos
                    .sort((a, b) => b.stargazers_count - a.stargazers_count)
                    .slice(0, 3)
                    .map(repo => ({
                        name: repo.name,
                        stars: repo.stargazers_count,
                        language: repo.language,
                        url: repo.html_url,
                    }))
            },
            analysis: {
                score: aiResult.score,
                summary: aiResult.summary,
                topLanguage: aiResult.topLanguage,
                bestProject: aiResult.bestProject,
                suggestions: aiResult.suggestions,
                recruiterView: aiResult.recruiterView,
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
} 
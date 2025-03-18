# **GIT**

## **Introduction**
The git section was created to how all the interactions with the scripts to facilitate some of the processes with the git tool.

## **Git Squash**
The git squash script wants to abstract all the steps that are used for the squash.
1. We need to provide the project path to apply the squash with the argument `projectPath`.
2. The process of the script starts with the git reset with a number of commits to go back using the `numberOfCommits`.
3. We add all the changed files to the commit pool.
4. We commit the files with a new message provided by the argument `newCommitText`.
5. We force push the commit to the branch and the commits are not squashed.

**Note: Be aware** there is no guards at the moment for the number os commits to go back to in the branch, careful to not overdo it.
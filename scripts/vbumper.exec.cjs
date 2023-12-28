/** AUTO-BUMP package.json version */
const { execSync } = require("child_process")
const readline = require("readline")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Check current branch
const currentBranch = execSync("git rev-parse --abbrev-ref HEAD")
  .toString()
  .trim()

if (currentBranch !== "master" && currentBranch !== "main") {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "Please switch to 'Master' or 'Main' branch before bumping the project version."
  )
  console.log("\x1b[90m", `(current branch: '${currentBranch}')`)
  console.log("Exiting without any operations...", "\x1b[0m")
  process.exit(0)
}

try {
  execSync(`npm version patch --no-git-tag-version`)
  const packageJson = require("../package.json")
  execSync(`git add package.json`, { stdio: "inherit" })
  execSync(
    `git commit -m "chore(release): bump version to ${packageJson.version}"`,
    { stdio: "inherit" }
  )
  execSync(`git tag v${packageJson.version}`, { stdio: "inherit" })
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Successfully released version ${packageJson.version}`
  )
} catch (error) {
  console.error("\x1b[31m", "Error:", error, "\x1b[0m")
  process.exit(1)
}

// Ask user for input
rl.question(
  "\x1b[33mPush commit and tag to remote repository? (Y/N):\x1b[0m ",
  (answer) => {
    rl.close() // Close the readline interface

    if (answer.toLowerCase() === "y") {
      const packageJson = require("../package.json")
      try {
        // Push the commit and tag to the remote repository
        execSync(`git push origin master`, { stdio: "inherit" })
        execSync(`git push origin v${packageJson.version}`, {
          stdio: "inherit",
        })
        console.log(
          "\x1b[36m%s\x1b[0m",
          `Successfully pushed version ${packageJson.version} to remote repository.`
        )
      } catch (error) {
        console.error(
          "\x1b[31m",
          "Error pushing to remote repository:",
          error,
          "\x1b[0m"
        )
        process.exit(1)
      }
    } else {
      console.log(
        "\x1b[90m",
        "Exiting without pushing to remote repository...",
        "\x1b[0m"
      )
    }
  }
)

module.exports = {
  plugins: {
    "@release-it/conventional-changelog": {
      preset: "conventionalcommits",
      infile: "CHANGELOG.md",
    },
  },
  git: {
    // https://github.com/release-it/release-it/blob/15.2.0/docs/recipes/require-commits.md
    requireCommits: true,
    commitMessage: "chore: release ${version} [ci skip]",
    tagName: "${npm.name}@${version}",
  },
  github: {
    release: true,
    releaseName: "${npm.name} v${version}",
  },
  hooks: {
    "before:init": ["npm test"],
    "after:bump": "npm run build",
  },
};

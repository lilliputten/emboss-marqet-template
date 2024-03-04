// @ts-check

const { allData } = require('../../utils/gulp-helpers.js');

const {
  projectName,
  timestamp,
  timetag,
  version,
  currentTimeStr,
  currentTimeTag,
  gitCommitHash,
  gitBranch,
  buildInfoText,
} = allData();

module.exports = {
  devEnv: process.env.ELEVENTY_DEV,
  hash: gitCommitHash,
  projectName,
  timestamp,
  timetag,
  version,
  currentTimeStr,
  currentTimeTag,
  gitCommitHash,
  gitBranch,
  buildInfoText,
};

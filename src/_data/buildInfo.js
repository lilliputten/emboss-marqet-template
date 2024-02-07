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

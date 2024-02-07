// @ts-check

/** @module gulp-helpers
 *  @since 2023.04.07, 00:00
 *  @changed 2023.06.19, 20:35
 */

const fs = require('fs');
const path = require('path');
const { format, formatInTimeZone } = require('date-fns-tz');
const { execSync } = require('child_process');

const now = new Date();

const tagFormat = 'yyMMdd-HHmm';
const timeFormat = 'yyyy.MM.dd, HH:mm zzz';

const currPath = path.resolve(__dirname);
const prjPath = path.resolve(path.dirname(path.basename(currPath)));
// const prjPathHasFinalFlash = prjPath.endsWith('/') || prjPath.endsWith('\\');

const configFileName = path.resolve(currPath, 'config.js');
const config = require(configFileName);

const envData = readProjectEnv();

const timeZone = config.timeZone || '';

// // UNUSED: These parameters retrieving from `package.json` (prjConfig)
// const timestampFileName = path.resolve(prjPath, 'build-timestamp.txt');
// const timetagFileName = path.resolve(prjPath, 'build-timetag.txt');
// const versionFileName = path.resolve(prjPath, 'build-version.txt');

const prjConfig = require(path.resolve(prjPath, 'package.json'));

/** @return {string} */
function getProjectName() {
  return prjConfig.name;
}

/** @return {string} */
function getTimestamp() {
  return prjConfig.timestamp;
  // const buf = fs.readFileSync(timestampFileName);
  // return buf.toString().trim();
}

/** @return {string} */
function getTimetag() {
  return prjConfig.timetag;
  // const buf = fs.readFileSync(timetagFileName);
  // return buf.toString().trim();
}

/** @return {string} */
function getVersion() {
  return prjConfig.version;
  // const buf = fs.readFileSync(versionFileName);
  // return buf.toString().trim();
}

/** @return {string} */
function getCurrentTimeStr() {
  return formatDate(now, timeZone, timeFormat);
}

/** @return {string} */
function getCurrentTimeTag() {
  return formatDate(now, timeZone, tagFormat);
}

/** @return {string} */
function getGitCommitHash() {
  const buf = execSync('git rev-parse --short HEAD');
  return buf.toString().trim();
}

/** @return {string} */
function getGitBranch() {
  const buf = execSync('git rev-parse --abbrev-ref HEAD');
  return buf.toString().trim();
}

function getBuildInfoText() {
  const projectName = getProjectName();
  const timestamp = getTimestamp();
  const version = getVersion();
  const currentTimeStr = getCurrentTimeStr();
  const gitCommitHash = getGitCommitHash();
  const gitBranch = getGitBranch();
  return [
    'Project: ' + projectName,
    'Version: ' + version,
    'Branch: ' + gitBranch,
    'Commit: ' + gitCommitHash,
    'Fixed: ' + timestamp,
    'Built: ' + currentTimeStr,
  ].join('\n');
}

function allData() {
  const projectName = getProjectName();
  const timestamp = getTimestamp();
  const timetag = getTimetag();
  const version = getVersion();
  const currentTimeStr = getCurrentTimeStr();
  const currentTimeTag = getCurrentTimeTag();
  const gitCommitHash = getGitCommitHash();
  const gitBranch = getGitBranch();
  const buildInfoText = getBuildInfoText();
  const allData = {
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
  // console.log('allData', allData);
  return allData;
}

/**
 * @param {number | Date} date
 * @param {string | undefined} timeZone
 * @param {string} fmt
 * @return {string}
 */
function formatDate(date, timeZone, fmt) {
  if (timeZone) {
    return formatInTimeZone(date, timeZone, fmt);
  } else {
    return format(date, fmt);
  }
}

/**
 * @param {string} file
 * @param {string} basePath
 * @return {string}
 */
function getRelativeFileName(file, basePath) {
  if (file && file.startsWith(basePath)) {
    const basePathHasFinalFlash = basePath.endsWith('/') || basePath.endsWith('\\');
    const basePathLen = basePath.length;
    const basePathLenWithSlash = basePathLen + (basePathHasFinalFlash ? 0 : 1);
    file = file.substring(basePathLenWithSlash);
  }
  return file;
}

/**
 * @param {string} file
 * @return {string}
 */
function getProjectRelativeFileName(file) {
  return getRelativeFileName(file, prjPath);
}

/**
 * @param {unknown} val
 * @return {boolean}
 */
function truthyValue(val) {
  // Process value
  if (!val) {
    val = false;
  } else if (typeof val === 'number' && !isNaN(val)) {
    val = Number(val);
  } else if (val === 'false') {
    val = false;
  } else if (val === 'true') {
    val = true;
  }
  return !!val;
}

function readProjectEnv() {
  const filename = path.resolve(prjPath, '.env');
  if (!fs.existsSync(filename)) {
    return {};
  }
  // TODO: Parse `.env.local` too?
  const content = fs.readFileSync(filename, 'utf8');
  const lines = content.split(/\r?\n/);
  const data = lines.reduce((data, s) => {
    const match = s.match(/^\s*(.*?)\s*=\s*(.*)\s*$/);
    if (match) {
      const key = match[1];
      const val = match[2];
      /* // Process value
       * if (!isNaN(val)) {
       *   val = Number(val);
       * } else if (val === 'false') {
       *   val = false;
       * } else if (val === 'true') {
       *   val = true;
       * }
       */
      data[key] = val;
    }
    return data;
  }, {});
  return data;
}

/**
 * @param {string} key
 * @return {string | undefined}
 */
function getEnvVariable(key) {
  return process.env[key] != undefined ? process.env[key] : envData[key];
}

module.exports = {
  prjPath,
  getBuildInfoText,
  allData,
  getProjectRelativeFileName,
  truthyValue,
  getEnvVariable,
  // readProjectEnv,
};

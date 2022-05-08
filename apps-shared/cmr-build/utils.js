const strip = require('strip-comments');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const del = require('del');

const getAngularJson = () => {
  let file = fs.readFileSync(path.join(process.cwd(), 'angular.json'), 'utf8');
  return JSON.parse(file);
}

const copyFolder = (from, to, fn) => {
  try {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }
  } catch(e) {
    console.log('ERROR making dir:', e.message);
    console.log(e);
  }

  const files = fs.readdirSync(from);
  files.forEach(file => {
    const fromFileName = path.join(from, file);
    const toFileName = path.join(to, file);
    const isDirectory = fs.lstatSync(fromFileName).isDirectory();
    if (fn) fn(isDirectory, fromFileName, toFileName);
    if (isDirectory) {
      copyFolder(fromFileName, toFileName, fn);
    } else {
      fs.copyFileSync(fromFileName, toFileName);
    }
  });
};

const deleteFolder = async(folderName) => {
  return new Promise(async(resolve, reject) => {
    try {
      del.sync(folderName);
      console.log('folder was deleted successfully:', folderName);
      resolve();
    } catch(e) {
      console.log('error deleting folder:', folderName, ', error:', e);
      reject(e);
    }
  });
};

const updateStatus = (path, status) => {
  const str = `module.exports = ${status};`;
  fs.writeFileSync(path, str);
};

const getDistFolder = projectName => {
  const angularJson = getAngularJson();
  return angularJson.projects[projectName].architect.build.options.outputPath;
};

const runAsChildProcess = cmdLine => {
 const response = spawnSync(cmdLine, { stdio: 'inherit', shell: true });
 return response.status;
};

const printCmrStepEnd = (stepName, status, msg) => {
  const Color = {
    RED: '\x1b[31m',
    GREEN: '\x1b[32m',
    WHITE: '\x1b[37m'
  };
  const color = status ? Color.RED : Color.GREEN;
  const message = (status ? 'failed!!' : 'ended successfully');
  console.log(color, '\n=================================================================');
  console.log('  CMR Build step "' + stepName + '"', message);
  if (status > 0 && msg) console.log('  *** Error message:', msg);
  console.log('=================================================================', Color.WHITE);
};

/**
 * this function strip comments from a .js file
 * it has a temporary patch in order to overcome a bug in the strip-comments package
 * the bug causes the comments to remain when it encounters multiple empty string in a file
 * github issue: https://github.com/jonschlinkert/strip-comments/issues/48
 */
const stripCommentsFromFile = (fileData) => {
  fileData = fileData.replace(/\r\n/g, '\n');
  let lines = fileData.split('\n');
  lines = lines.filter(line => {
    return !line.trim().startsWith('//');
  });
  fileData = lines.join('\n');
  fileData = fileData.replace(/''/g, "'PATCH_TO_OVERCOME_BUG_IN_STRIP_COMMENTS_PACKAGE'");
  fileData = fileData.replace(/""/g, '"PATCH_TO_OVERCOME_BUG_IN_STRIP_COMMENTS_PACKAGE"');
  fileData = strip(fileData, { keepProtected:false, preserveNewlines: false });
  fileData = fileData.replace(/'PATCH_TO_OVERCOME_BUG_IN_STRIP_COMMENTS_PACKAGE'/g, "''");
  return fileData.replace(/"PATCH_TO_OVERCOME_BUG_IN_STRIP_COMMENTS_PACKAGE"/g, '""');
};

const getProjectName = () => {
  if (!process.argv.length || process.argv.length < 3) {
    let file = getAngularJson();
    if (file.defaultProject) {
      return file.defaultProject;
    } else {
      throw new Error('A project name was not specified');
    }
  }
  return process.argv[2];
}

const getProjectSrcFolder = () => {
  const projectName = getProjectName();
  return getAngularJson().projects[projectName].sourceRoot;
}

const getNgCommand = (projectName, command, params = '') => {
  // return `ng ${command} ${projectName} ${params}`;
  const cmdLine = `node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng ${command} ${projectName} ${params}`;
  console.log('RUN:', cmdLine);
  return cmdLine;
}

module.exports = { copyFolder, deleteFolder, updateStatus, getDistFolder, runAsChildProcess, printCmrStepEnd, stripCommentsFromFile, getProjectName, getProjectSrcFolder, getNgCommand };

const utils = require('../utils');

const cmdLine = utils.getNgCommand(utils.getProjectName(), 'build');
const status = utils.runAsChildProcess(cmdLine);
utils.printCmrStepEnd('build', status, 'build failed');
if (status) process.exit(status);

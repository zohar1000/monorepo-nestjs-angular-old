const utils = require('../utils');

const cmdLine = utils.getNgCommand(utils.getProjectName(), 'lint');
const rc = utils.runAsChildProcess(cmdLine);
utils.printCmrStepEnd('lint', rc, 'lint errors found, please check the errors listed above');
if (rc) process.exit(rc);


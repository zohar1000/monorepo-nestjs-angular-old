var FileService_1;
import { __awaiter, __decorate } from "tslib";
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
const fsPromises = fs.promises;
const path = require('path');
let FileService = FileService_1 = class FileService {
    static getParentFolder(folder) {
        const lastSegment = path.basename(folder);
        if (!lastSegment) {
            return undefined;
        }
        else {
            const ix = folder.lastIndexOf(lastSegment);
            return folder.substr(0, ix);
        }
    }
    static readAncestorFile(fileName, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let error;
                let text;
                let isText = false;
                let folder = (options === null || options === void 0 ? void 0 : options.startFolder) || process.cwd();
                while (!isText && !error) {
                    try {
                        const filePath = path.resolve(folder, fileName);
                        text = yield fsPromises.readFile(filePath, 'utf8');
                        isText = true;
                    }
                    catch (e) {
                        if (e.code !== 'ENOENT') {
                            error = e;
                        }
                        else {
                            folder = FileService_1.getParentFolder(folder);
                            if (!folder)
                                error = new Error(`file not found: ${fileName}`);
                        }
                    }
                }
                if (error && !(options === null || options === void 0 ? void 0 : options.isReturnUndefinedOnError)) {
                    reject(error);
                }
                else {
                    resolve(text);
                }
            }));
        });
    }
    static getAncestorPath(requestedResource, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let error;
                let ancestorPath;
                let currFolder = options.startFolder || process.cwd();
                while (!ancestorPath && !error) {
                    try {
                        const resourcePath = path.resolve(currFolder, requestedResource);
                        const stat = yield fsPromises.stat(resourcePath);
                        if (options.isFolder && stat.isDirectory()) {
                            ancestorPath = resourcePath;
                        }
                        else if (stat.isFile()) {
                            ancestorPath = resourcePath;
                        }
                        else {
                            error = new Error(`${requestedResource} not found`);
                        }
                    }
                    catch (e) {
                        if (e.code !== 'ENOENT') {
                            error = e;
                        }
                        else {
                            currFolder = FileService_1.getParentFolder(currFolder);
                            if (!currFolder)
                                error = new Error(`${requestedResource} not found`);
                        }
                    }
                }
                if (error && !(options === null || options === void 0 ? void 0 : options.isReturnUndefinedOnError)) {
                    reject(error);
                }
                else {
                    resolve(ancestorPath);
                }
            }));
        });
    }
    static getAncestorPathSync(requestedResource, options = {}) {
        let error;
        let ancestorPath;
        let currFolder = options.startFolder || process.cwd();
        while (!ancestorPath && !error) {
            try {
                const resourcePath = path.resolve(currFolder, requestedResource);
                const stat = fs.statSync(resourcePath);
                if (options.isFolder && stat.isDirectory()) {
                    ancestorPath = resourcePath;
                }
                else if (stat.isFile()) {
                    ancestorPath = resourcePath;
                }
                else {
                    error = new Error(`${requestedResource} not found`);
                }
            }
            catch (e) {
                if (e.code !== 'ENOENT') {
                    error = e;
                }
                else {
                    currFolder = FileService_1.getParentFolder(currFolder);
                    if (!currFolder)
                        error = new Error(`${requestedResource} not found`);
                }
            }
        }
        if (error && !(options === null || options === void 0 ? void 0 : options.isReturnUndefinedOnError))
            throw error;
        return ancestorPath;
    }
};
FileService = FileService_1 = __decorate([
    Injectable()
], FileService);
export { FileService };
//# sourceMappingURL=file.service.js.map
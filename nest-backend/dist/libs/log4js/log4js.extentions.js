"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNestModuleCallStack = void 0;
const STACK_REG = /at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/;
const parseNestModuleCallStack = (data, skipIdx = 7) => {
    const stackLines = data.stack.split('\n').slice(skipIdx);
    const lineMatch = STACK_REG.exec(stackLines[0]);
    if (lineMatch && lineMatch.length === 6) {
        return {
            functionName: lineMatch[1],
            fileName: lineMatch[2],
            lineNumber: parseInt(lineMatch[3], 10),
            columnNumber: parseInt(lineMatch[4], 10),
            callStack: stackLines.join('\n')
        };
    }
    return null;
};
exports.parseNestModuleCallStack = parseNestModuleCallStack;
//# sourceMappingURL=log4js.extentions.js.map
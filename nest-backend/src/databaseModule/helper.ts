const logger = require('node-color-log')

export function log(args: any[], type: string, color: string) {
  logger.fontColorLog(color, args[0])
}
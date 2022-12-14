"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uid_1 = require("uid");
const path = require("path");
const config_1 = require("../libs/config");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const jimp = require('jimp');
const utils_1 = require("../libs/utils");
const { NODE_ENV } = process.env;
const baseHost = config_1.baseHosts[NODE_ENV] || {
    uploadPath: 'public/',
    baseHost: 'http://localhost:3000/',
    domain: 'www.giibee.com',
};
let UploadController = class UploadController {
    async uploadFile(upload, req) {
        (0, utils_1.Log)({ req });
        console.log('baseHost', baseHost);
        console.log('file-upload', upload);
        const { filename, path, mimetype } = upload;
        upload.uploaded = 1;
        upload.url = path.replace(baseHost.uploadPath, baseHost.baseHost);
        upload.fileName = filename;
        if (mimetype.includes('image')) {
            const text = baseHost.domain;
            jimp.read(path).then((image) => {
                const { width, height } = image.bitmap;
                console.log(width, height);
                jimp.loadFont(jimp.FONT_SANS_32_BLACK).then((font) => {
                    image
                        .print(font, width - text.length * 20, height - 50, text)
                        .write(path);
                });
            });
        }
        return upload;
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('upload', {
        storage: (0, multer_1.diskStorage)({
            destination: `./${baseHost.uploadPath}uploads/`,
            filename: (_req, file, cb) => {
                file = file.upload ? file.upload : file;
                return cb(null, (0, uid_1.uid)(32) + Date.now() + path.extname(file.originalname));
            },
        }),
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: 'multipart/form-data',
        required: true,
        schema: {
            type: 'object',
            properties: {
                upload: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
UploadController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuardUser),
    (0, common_1.Controller)('api/upload')
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map
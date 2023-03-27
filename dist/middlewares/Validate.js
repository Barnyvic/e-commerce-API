"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateProductMiddleware = exports.validateUpdateUserMiddleware = exports.validateLoginMiddleware = exports.validateSignupMiddleware = void 0;
const response_1 = require("../utils/response");
const user_1 = require("../validation/user");
const validateSignupMiddleware = (req, res, next) => {
    var _a;
    const userPayLoad = req.body;
    try {
        const validate = (0, user_1.validateSignupData)(userPayLoad);
        if (validate.error) {
            return (0, response_1.validateError)(res, 406, (_a = validate.error) === null || _a === void 0 ? void 0 : _a.details[0].message);
        }
        next();
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
    }
};
exports.validateSignupMiddleware = validateSignupMiddleware;
const validateLoginMiddleware = (req, res, next) => {
    var _a;
    const userPayLoad = req.body;
    try {
        const validate = (0, user_1.validateLoginUser)(userPayLoad);
        if (validate.error) {
            return (0, response_1.validateError)(res, 406, (_a = validate.error) === null || _a === void 0 ? void 0 : _a.details[0].message);
        }
        next();
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
    }
};
exports.validateLoginMiddleware = validateLoginMiddleware;
const validateUpdateUserMiddleware = (req, res, next) => {
    var _a;
    const userPayLoad = req.body;
    try {
        const validate = (0, user_1.validateUpdateUserProfile)(userPayLoad);
        if (validate.error) {
            return (0, response_1.validateError)(res, 406, (_a = validate.error) === null || _a === void 0 ? void 0 : _a.details[0].message);
        }
        next();
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
    }
};
exports.validateUpdateUserMiddleware = validateUpdateUserMiddleware;
const validateCreateProductMiddleware = (req, res, next) => {
    var _a;
    const userPayLoad = req.body;
    try {
        const validate = (0, user_1.validateCreateProduct)(userPayLoad);
        if (validate.error) {
            return (0, response_1.validateError)(res, 406, (_a = validate.error) === null || _a === void 0 ? void 0 : _a.details[0].message);
        }
        next();
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
    }
};
exports.validateCreateProductMiddleware = validateCreateProductMiddleware;

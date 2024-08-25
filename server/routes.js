"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotes = getNotes;
exports.updateNotes = updateNotes;
exports.deleteNote = deleteNote;
exports.handleLogin = handleLogin;
exports.registerUser = registerUser;
exports.updateUsersTags = updateUsersTags;
var firebase_1 = require("./helpers/firebase");
function getNotes(fastify, _options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.get("/notes", function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var userId, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            reply.headers({
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                                "Access-Control-Allow-Methods": "GET",
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            userId = request.query.userId;
                            return [4 /*yield*/, (0, firebase_1.getData)(userId)];
                        case 2:
                            data = _a.sent();
                            return [2 /*return*/, data];
                        case 3:
                            error_1 = _a.sent();
                            console.log(error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
function updateNotes(fastify, _options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.post("/note", function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var requestBody, userId, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            reply.headers({
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                                "Access-Control-Allow-Methods": "POST",
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            requestBody = request.body;
                            userId = requestBody.id;
                            return [4 /*yield*/, (0, firebase_1.updateData)(requestBody, userId)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { notes: requestBody }];
                        case 3:
                            error_2 = _a.sent();
                            console.log(error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
function deleteNote(fastify, _options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.delete("/delete-note", function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var requestBody, userId, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            reply.headers({
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                                "Access-Control-Allow-Methods": "POST",
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            requestBody = request.body;
                            userId = requestBody.userId;
                            return [4 /*yield*/, (0, firebase_1.updateData)(requestBody, userId)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { notes: request.body }];
                        case 3:
                            error_3 = _a.sent();
                            console.log(error_3);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
function handleLogin(fastify, _options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.post("/login", function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var requestBody, data, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            reply.headers({
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                                "Access-Control-Allow-Methods": "POST",
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            requestBody = request.body;
                            return [4 /*yield*/, (0, firebase_1.loginUser)(requestBody)];
                        case 2:
                            data = _a.sent();
                            if (data.success === false) {
                                return [2 /*return*/, reply.code(401).send(data)];
                            }
                            else {
                                return [2 /*return*/, reply.send(data)];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            return [2 /*return*/, { success: false }];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
function registerUser(fastify, _options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.post("/register", function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var requestBody, email, password, name_1, data, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            reply.headers({
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                                "Access-Control-Allow-Methods": "POST",
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            requestBody = request.body;
                            email = requestBody.email, password = requestBody.password, name_1 = requestBody.name;
                            return [4 /*yield*/, (0, firebase_1.createUser)(email, password, name_1)];
                        case 2:
                            data = _a.sent();
                            if (data.success === false) {
                                reply.code(409);
                                return [2 /*return*/, reply.send(data)];
                            }
                            else {
                                return [2 /*return*/, reply.code(200).send(data)];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_5 = _a.sent();
                            console.log("🚀 ~ fastify.post ~ error:", error_5);
                            return [2 /*return*/, { success: false }];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
function updateUsersTags(fastify, _options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.post("/user-tags", function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var requestBody, userId, tags, data, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            reply.headers({
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                                "Access-Control-Allow-Methods": "POST",
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            requestBody = request.body;
                            userId = requestBody.id, tags = requestBody.tags;
                            return [4 /*yield*/, (0, firebase_1.editUserTags)(userId, tags)];
                        case 2:
                            data = _a.sent();
                            if (data.success === false) {
                                reply.code(409);
                                return [2 /*return*/, reply.send(data)];
                            }
                            else {
                                return [2 /*return*/, reply.code(200).send(data)];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_6 = _a.sent();
                            console.log("🚀 ~ fastify.post ~ error:", error_6);
                            return [2 /*return*/, { success: false }];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}

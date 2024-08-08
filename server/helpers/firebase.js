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
exports.createUser = exports.loginUser = exports.deleteData = exports.updateData = exports.getData = void 0;
var app_1 = require("firebase/app");
var database_1 = require("firebase/database");
var constants_1 = require("../constants");
var uuid_1 = require("uuid");
var hashing_1 = require("./hashing");
var app = (0, app_1.initializeApp)(constants_1.firebaseConfig);
var database = (0, database_1.getDatabase)(app);
var isUserExists = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, storedData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, database_1.get)((0, database_1.ref)(database, "users"))];
            case 1:
                snapshot = _a.sent();
                try {
                    storedData = snapshot.val();
                    if (storedData != null) {
                        return [2 /*return*/, Object.values(storedData).some(function (u) { return u.email === email; })];
                    }
                    return [2 /*return*/, false];
                }
                catch (error) {
                    console.log("🚀 ~ isUserExists ~ error:", error);
                }
                return [2 /*return*/];
        }
    });
}); };
var getData = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, database_1.get)((0, database_1.ref)(database, "notes/".concat(userId)))];
            case 1:
                snapshot = _a.sent();
                data = snapshot.val();
                if (data === null)
                    return [2 /*return*/, []];
                return [2 /*return*/, data];
        }
    });
}); };
exports.getData = getData;
var updateData = function (data, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var databaseRef;
    var _a;
    return __generator(this, function (_b) {
        databaseRef = (0, database_1.ref)(database, "notes");
        return [2 /*return*/, (0, database_1.update)(databaseRef, (_a = {},
                _a[userId] = data.notes,
                _a))];
    });
}); };
exports.updateData = updateData;
var loginUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var password, email, snapshot, storedData, userData, storedPassword, isValid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = data.password, email = data.email;
                return [4 /*yield*/, (0, database_1.get)((0, database_1.ref)(database, "users"))];
            case 1:
                snapshot = _a.sent();
                storedData = snapshot.val();
                userData = Object.values(storedData).find(function (u) { return u.email === email; });
                if (userData === undefined) {
                    return [2 /*return*/, { success: false, error: "User is not exists" }];
                }
                storedPassword = userData.password;
                return [4 /*yield*/, (0, hashing_1.verifyPassword)(storedPassword, password)];
            case 2:
                isValid = _a.sent();
                if (!isValid) {
                    return [2 /*return*/, { success: false, error: "Password is incorrect" }];
                }
                return [2 /*return*/, { success: true, error: null, data: userData }];
        }
    });
}); };
exports.loginUser = loginUser;
var createUser = function (email, password, name) { return __awaiter(void 0, void 0, void 0, function () {
    var databaseRef, isUserPresent, id, userData, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                databaseRef = (0, database_1.ref)(database, "users");
                return [4 /*yield*/, isUserExists(email)];
            case 1:
                isUserPresent = _c.sent();
                if (isUserPresent) {
                    return [2 /*return*/, {
                            success: false,
                            error: "User all ready exists",
                            data: null,
                        }];
                }
                id = "".concat(name, "-").concat((0, uuid_1.v4)());
                _a = {
                    name: name,
                    email: email
                };
                return [4 /*yield*/, (0, hashing_1.hashPassword)(password)];
            case 2:
                userData = (_a.password = _c.sent(),
                    _a.id = id,
                    _a);
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, (0, database_1.update)(databaseRef, (_b = {}, _b[id] = userData, _b))];
            case 4:
                _c.sent();
                delete userData.password;
                return [2 /*return*/, { success: true, error: null, data: userData }];
            case 5:
                error_1 = _c.sent();
                console.log(error_1);
                return [2 /*return*/, { success: false, error: error_1, data: null }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var deleteData = function (data, id) { return __awaiter(void 0, void 0, void 0, function () {
    var databaseRef;
    var _a;
    return __generator(this, function (_b) {
        databaseRef = (0, database_1.ref)(database, "/notes/".concat(id));
        return [2 /*return*/, (0, database_1.update)(databaseRef, (_a = {},
                _a[id] = data.notes,
                _a))];
    });
}); };
exports.deleteData = deleteData;

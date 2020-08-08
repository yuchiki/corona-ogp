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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios_1 = __importDefault(require("axios"));
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var url, app, router;
        var _this = this;
        return __generator(this, function (_a) {
            url = "https://raw.githubusercontent.com/tokyo-metropolitan-gov/covid19/development/data/daily_positive_detail.json";
            app = express_1.default();
            // CORSの許可
            app.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
            // body-parserに基づいた着信リクエストの解析
            app.use(express_1.default.json());
            app.use(express_1.default.urlencoded({ extended: true }));
            router = express_1.default.Router();
            router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var length, TokyoCoronaDatas, lines, template;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            length = req.params.dates ? Number(req.params.dates) : 5;
                            return [4 /*yield*/, axios_1.default.get(url)];
                        case 1:
                            TokyoCoronaDatas = _a.sent();
                            lines = TokyoCoronaDatas.data.data.slice(-length).map(function (datum) { return datum.diagnosed_date.slice(-2) + "\u65E5: " + datum.count + "\u4EBA"; });
                            template = "\n<!DOCTYPE HTML>\n<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"ja\" xml:lang=\"ja\" xmlns:og=\"http://ogp.me/ns#\" xmlns:fb=\"http://www.facebook.com/2008/fbml\">\n<head>\n  <meta property=\"og:title\" content=\"\u6771\u4EAC\u306E\u611F\u67D3\u8005\u6570\"/>\n  <meta property=\"og:type\" content=\"website\"/>\n  <meta property=\"og:description\" content=\"" + lines.join(", ") + "\"\n  <meta property=\"og:url\" content=\"https://raw.githubusercontent.com/tokyo-metropolitan-gov/covid19/development/data/daily_positive_detail.json\"/>\n  <title>fuga</title>\n</head>\n<body>\n    " + lines.join("<br>") + "\n</body>\n</html>\n";
                            res.send(template);
                            return [2 /*return*/];
                    }
                });
            }); });
            app.use(router);
            // 3000番ポートでAPIサーバ起動
            app.listen(3000, function () {
                console.log("listening on port 3000!");
            });
            return [2 /*return*/];
        });
    });
}
main();

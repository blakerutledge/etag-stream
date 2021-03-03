"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var stream = require('stream');

var etag = require('etag-hash');

var ETagStream = /*#__PURE__*/function (_stream$Transform) {
  (0, _inherits2["default"])(ETagStream, _stream$Transform);

  var _super = _createSuper(ETagStream);

  function ETagStream() {
    var _this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, ETagStream);
    var _opts$partSizeInMb = opts.partSizeInMb,
        partSizeInMb = _opts$partSizeInMb === void 0 ? 8 : _opts$partSizeInMb,
        _opts$mode = opts.mode,
        mode = _opts$mode === void 0 ? 'through' : _opts$mode;
    _this = _super.call(this);
    _this.mode = mode;
    _this.hash = etag.createHash(partSizeInMb);
    return _this;
  }

  (0, _createClass2["default"])(ETagStream, [{
    key: "_write",
    value: function _write(chunk, enc, next) {
      this.hash.update(chunk);

      if (this.mode === 'through') {
        this.push(chunk);
      }

      next();
    }
  }, {
    key: "_flush",
    value: function _flush(done) {
      if (this.mode === 'through') {
        this.emit('etag', this.hash.digest());
      } else {
        this.push(this.hash.digest());
      }

      done();
    }
  }]);
  return ETagStream;
}(stream.Transform);

module.exports = ETagStream;
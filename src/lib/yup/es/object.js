import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["", "[\"", "\"]"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["", ".", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["", ".", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import has from "lodash-es/has";
import _snakeCase from "lodash-es/snakeCase";
import _camelCase from "lodash-es/camelCase";
import mapKeys from "lodash-es/mapKeys";
import mapValues from "lodash-es/mapValues";
import { getter } from 'property-expr';
import MixedSchema from './mixed';
import { object as locale } from './locale.js';
import sortFields from './util/sortFields';
import sortByKeyOrder from './util/sortByKeyOrder';
import inherits from './util/inherits';
import makePath from './util/makePath';
import runValidations, { propagateErrors } from './util/runValidations';
import { SynchronousPromise } from 'synchronous-promise';

var isObject = function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

var promise = function promise(sync) {
  return sync ? SynchronousPromise : Promise;
};

function unknown(ctx, value) {
  var known = Object.keys(ctx.fields);
  return Object.keys(value).filter(function (key) {
    return known.indexOf(key) === -1;
  });
}

export default function ObjectSchema(spec) {
  var _this2 = this;

  if (!(this instanceof ObjectSchema)) return new ObjectSchema(spec);
  MixedSchema.call(this, {
    type: 'object',
    default: function _default() {
      var _this = this;

      if (!this._nodes.length) return undefined;
      var dft = {};

      this._nodes.forEach(function (key) {
        dft[key] = _this.fields[key].default ? _this.fields[key].default() : undefined;
      });

      return dft;
    }
  });
  this.fields = Object.create(null);
  this._nodes = [];
  this._excludedEdges = [];
  this.withMutation(function () {
    _this2.transform(function coerce(value) {
      if (typeof value === 'string') {
        try {
          value = JSON.parse(value);
        } catch (err) {
          value = null;
        }
      }

      if (this.isType(value)) return value;
      return null;
    });

    if (spec) {
      _this2.shape(spec);
    }
  });
}
inherits(ObjectSchema, MixedSchema, {
  _typeCheck: function _typeCheck(value) {
    return isObject(value) || typeof value === 'function';
  },
  _cast: function _cast(_value, options) {
    var _this3 = this;

    if (options === void 0) {
      options = {};
    }

    var value = MixedSchema.prototype._cast.call(this, _value, options); //should ignore nulls here


    if (value === undefined) return this.default();
    if (!this._typeCheck(value)) return value;
    var fields = this.fields;
    var strip = this._option('stripUnknown', options) === true;

    var props = this._nodes.concat(Object.keys(value).filter(function (v) {
      return _this3._nodes.indexOf(v) === -1;
    }));

    var intermediateValue = {}; // is filled during the transform below

    var innerOptions = _extends({}, options, {
      parent: intermediateValue,
      __validating: options.__validating || false
    });

    var isChanged = false;
    props.forEach(function (prop) {
      var field = fields[prop];
      var exists = has(value, prop);

      if (field) {
        var fieldValue;
        var strict = field._options && field._options.strict; // safe to mutate since this is fired in sequence

        innerOptions.path = makePath(_templateObject(), options.path, prop);
        innerOptions.value = value[prop];
        field = field.resolve(innerOptions);

        if (field._strip === true) {
          isChanged = isChanged || prop in value;
          return;
        }

        fieldValue = !options.__validating || !strict ? field.cast(value[prop], innerOptions) : value[prop];
        if (fieldValue !== undefined) intermediateValue[prop] = fieldValue;
      } else if (exists && !strip) intermediateValue[prop] = value[prop];

      if (intermediateValue[prop] !== value[prop]) isChanged = true;
    });
    return isChanged ? intermediateValue : value;
  },
  _validate: function _validate(_value, opts) {
    var _this4 = this;

    if (opts === void 0) {
      opts = {};
    }

    var endEarly, recursive;
    var sync = opts.sync;
    var errors = [];
    var originalValue = opts.originalValue != null ? opts.originalValue : _value;
    var from = [{
      schema: this,
      value: originalValue
    }].concat(opts.from || []);
    endEarly = this._option('abortEarly', opts);
    recursive = this._option('recursive', opts);
    opts = _extends({}, opts, {
      __validating: true,
      originalValue: originalValue,
      from: from
    });
    return MixedSchema.prototype._validate.call(this, _value, opts).catch(propagateErrors(endEarly, errors)).then(function (value) {
      if (!recursive || !isObject(value)) {
        // only iterate though actual objects
        if (errors.length) throw errors[0];
        return value;
      }

      from = originalValue ? [].concat(from) : [{
        schema: _this4,
        value: originalValue || value
      }].concat(opts.from || []);
      originalValue = originalValue || value;

      var validations = _this4._nodes.map(function (key) {
        var path = key.indexOf('.') === -1 ? makePath(_templateObject2(), opts.path, key) : makePath(_templateObject3(), opts.path, key);
        var field = _this4.fields[key];

        var innerOptions = _extends({}, opts, {
          path: path,
          from: from,
          parent: value,
          originalValue: originalValue[key]
        });

        if (field && field.validate) {
          // inner fields are always strict:
          // 1. this isn't strict so the casting will also have cast inner values
          // 2. this is strict in which case the nested values weren't cast either
          innerOptions.strict = true;
          return field.validate(value[key], innerOptions);
        }

        return promise(sync).resolve(true);
      });

      return runValidations({
        sync: sync,
        validations: validations,
        value: value,
        errors: errors,
        endEarly: endEarly,
        path: opts.path,
        sort: sortByKeyOrder(_this4.fields)
      });
    });
  },
  concat: function concat(schema) {
    var next = MixedSchema.prototype.concat.call(this, schema);
    next._nodes = sortFields(next.fields, next._excludedEdges);
    return next;
  },
  shape: function shape(schema, excludes) {
    if (excludes === void 0) {
      excludes = [];
    }

    var next = this.clone();

    var fields = _extends(next.fields, schema);

    next.fields = fields;

    if (excludes.length) {
      if (!Array.isArray(excludes[0])) excludes = [excludes];
      var keys = excludes.map(function (_ref) {
        var first = _ref[0],
            second = _ref[1];
        return first + "-" + second;
      });
      next._excludedEdges = next._excludedEdges.concat(keys);
    }

    next._nodes = sortFields(fields, next._excludedEdges);
    return next;
  },
  from: function from(_from, to, alias) {
    var fromGetter = getter(_from, true);
    return this.transform(function (obj) {
      if (obj == null) return obj;
      var newObj = obj;

      if (has(obj, _from)) {
        newObj = _extends({}, obj);
        if (!alias) delete newObj[_from];
        newObj[to] = fromGetter(obj);
      }

      return newObj;
    });
  },
  noUnknown: function noUnknown(noAllow, message) {
    if (noAllow === void 0) {
      noAllow = true;
    }

    if (message === void 0) {
      message = locale.noUnknown;
    }

    if (typeof noAllow === 'string') {
      message = noAllow;
      noAllow = true;
    }

    var next = this.test({
      name: 'noUnknown',
      exclusive: true,
      message: message,
      test: function test(value) {
        if (value == null) return true;
        var unknownKeys = unknown(this.schema, value);
        return !noAllow || unknownKeys.length === 0 || this.createError({
          params: {
            unknown: unknownKeys.join(', ')
          }
        });
      }
    });
    next._options.stripUnknown = noAllow;
    return next;
  },
  unknown: function unknown(allow, message) {
    if (allow === void 0) {
      allow = true;
    }

    if (message === void 0) {
      message = locale.noUnknown;
    }

    return this.noUnknown(!allow, message);
  },
  transformKeys: function transformKeys(fn) {
    return this.transform(function (obj) {
      return obj && mapKeys(obj, function (_, key) {
        return fn(key);
      });
    });
  },
  camelCase: function camelCase() {
    return this.transformKeys(_camelCase);
  },
  snakeCase: function snakeCase() {
    return this.transformKeys(_snakeCase);
  },
  constantCase: function constantCase() {
    return this.transformKeys(function (key) {
      return _snakeCase(key).toUpperCase();
    });
  },
  describe: function describe() {
    var base = MixedSchema.prototype.describe.call(this);
    base.fields = mapValues(this.fields, function (value) {
      return value.describe();
    });
    return base;
  }
});
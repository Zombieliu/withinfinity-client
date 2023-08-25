System.register("chunks:///_virtual/Ambilight.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, CCInteger, Sprite, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCInteger = module.CCInteger;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "73c69GH9M9F2Ilsm0fvjTCX", "Ambilight", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Ambilight = exports('Ambilight', (_dec = ccclass('Ambilight'), _dec2 = property(CCInteger), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Ambilight, _Component);

        function Ambilight() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_max", _descriptor, _assertThisInitialized(_this));

          _this._start = 0;
          _this._material = void 0;
          return _this;
        }

        var _proto = Ambilight.prototype;

        _proto.update = function update(dt) {
          this._material = this.node.getComponent(Sprite).getMaterial(0);

          if (this.node.active && this._material) {
            this._setShaderTime(dt);
          }
        };

        _proto._setShaderTime = function _setShaderTime(dt) {
          var start = this._start;
          if (start > this.max) start = 0;
          start += 0.015;

          this._material.setProperty('speed', start);

          this._start = start;
        };

        _createClass(Ambilight, [{
          key: "max",
          get: function get() {
            return this._max;
          },
          set: function set(value) {
            this._max = value;
          }
        }]);

        return Ambilight;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_max", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "max", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "max"), _class2.prototype)), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorAnimation.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AnimatorBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Animation, AnimatorBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
    }, function (module) {
      AnimatorBase = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "64571Qy/TlCEZI/28RxIG+E", "AnimatorAnimation", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent,
          disallowMultiple = _decorator.disallowMultiple,
          menu = _decorator.menu;
      /** 
       * Cocos Animation状态机组件
       */

      var AnimatorAnimation = exports('default', (_dec = requireComponent(Animation), _dec2 = menu('animator/AnimatorAnimation'), ccclass(_class = disallowMultiple(_class = _dec(_class = _dec2(_class = /*#__PURE__*/function (_AnimatorBase) {
        _inheritsLoose(AnimatorAnimation, _AnimatorBase);

        function AnimatorAnimation() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AnimatorBase.call.apply(_AnimatorBase, [this].concat(args)) || this;
          /** Animation组件 */

          _this._animation = null;
          /** 当前的动画实例 */

          _this._animState = null;
          /** 记录初始的wrapmode */

          _this._wrapModeMap = new Map();
          return _this;
        }

        var _proto = AnimatorAnimation.prototype;

        _proto.start = function start() {
          if (!this.PlayOnStart || this._hasInit) {
            return;
          }

          this._hasInit = true;
          this._animation = this.getComponent(Animation);

          this._animation.on(Animation.EventType.FINISHED, this.onAnimFinished, this);

          this._animation.on(Animation.EventType.LASTFRAME, this.onAnimFinished, this);

          if (this.AssetRawUrl !== null) {
            this.initJson(this.AssetRawUrl.json);
          }
        }
        /**
         * 手动初始化状态机，可传入0-3个参数，类型如下
         * - onStateChangeCall 状态切换时的回调
         * - stateLogicMap 各个状态逻辑控制
         * - animationPlayer 自定义动画控制
         * @override
         */
        ;

        _proto.onInit = function onInit() {
          if (this.PlayOnStart || this._hasInit) {
            return;
          }

          this._hasInit = true;
          this.initArgs.apply(this, arguments);
          this._animation = this.getComponent(Animation);

          this._animation.on(Animation.EventType.FINISHED, this.onAnimFinished, this);

          this._animation.on(Animation.EventType.LASTFRAME, this.onAnimFinished, this);

          if (this.AssetRawUrl !== null) {
            this.initJson(this.AssetRawUrl.json);
          }
        }
        /**
         * 播放动画
         * @override
         * @param animName 动画名
         * @param loop 是否循环播放
         */
        ;

        _proto.playAnimation = function playAnimation(animName, loop) {
          if (!animName) {
            return;
          }

          this._animation.play(animName);

          this._animState = this._animation.getState(animName);

          if (!this._animState) {
            return;
          }

          if (!this._wrapModeMap.has(this._animState)) {
            this._wrapModeMap.set(this._animState, this._animState.wrapMode);
          }

          this._animState.wrapMode = loop ? 2 : this._wrapModeMap.get(this._animState);
        }
        /**
         * 缩放动画播放速率
         * @override
         * @param scale 缩放倍率
         */
        ;

        _proto.scaleTime = function scaleTime(scale) {
          if (this._animState) {
            this._animState.speed = scale;
          }
        };

        return AnimatorAnimation;
      }(AnimatorBase)) || _class) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AnimatorController.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, JsonAsset, Component, AnimatorController;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      JsonAsset = module.JsonAsset;
      Component = module.Component;
    }, function (module) {
      AnimatorController = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "7ff14NOug1NAIB1XgQlC9Gc", "AnimatorBase", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executionOrder = _decorator.executionOrder,
          menu = _decorator.menu;
      /**
       * 自定义控制动画播放的接口
       */

      /**
       * 状态机组件基类 优先执行生命周期
       */

      var AnimatorBase = exports('default', (_dec = executionOrder(-1000), _dec2 = menu('animator/AnimatorBase'), _dec3 = property({
        type: JsonAsset,
        tooltip: '状态机json文件'
      }), _dec4 = property({
        tooltip: '是否在start中自动启动状态机'
      }), _dec5 = property({
        tooltip: '是否在update中自动触发状态机逻辑更新'
      }), ccclass(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AnimatorBase, _Component);

        function AnimatorBase() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** ---------- 后续扩展代码 结束 ---------- */

          _initializerDefineProperty(_this, "AssetRawUrl", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "PlayOnStart", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "AutoUpdate", _descriptor3, _assertThisInitialized(_this));
          /** 是否初始化 */


          _this._hasInit = false;
          /** 状态机控制 */

          _this._ac = null;
          /** 各个状态逻辑控制，key为状态名 */

          _this._stateLogicMap = null;
          /** 状态切换时的回调 */

          _this._onStateChangeCall = null;
          /** 自定义的动画播放控制器 */

          _this._animationPlayer = null;
          return _this;
        }

        var _proto = AnimatorBase.prototype;
        /** ---------- 后续扩展代码 开始 ---------- */

        /** 三维骨骼动画动画帧自定义事件 */

        _proto.onFrameEvent = function onFrameEvent(param) {
          var _this$_animationPlaye;

          (_this$_animationPlaye = this._animationPlayer) == null ? void 0 : _this$_animationPlaye.onFrameEventCallback(param, this);
        };
        /** 获取指定状态 */


        _proto.getState = function getState(name) {
          return this._ac.states.get(name);
        }
        /**
         * 手动初始化状态机，可传入0-3个参数，类型如下
         * - onStateChangeCall 状态切换时的回调
         * - stateLogicMap 各个状态逻辑控制
         * - animationPlayer 自定义动画控制
         * @virtual
         */
        ;

        _proto.onInit = function onInit() {}
        /**
         * 处理初始化参数
         */
        ;

        _proto.initArgs = function initArgs() {
          var _this2 = this;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          args.forEach(function (arg) {
            if (!arg) {
              return;
            }

            if (typeof arg === 'function') {
              _this2._onStateChangeCall = arg;
            } else if (typeof arg === 'object') {
              if (arg instanceof Map) {
                _this2._stateLogicMap = arg;
              } else {
                _this2._animationPlayer = arg;
              }
            }
          });
        };

        _proto.updateAnimator = function updateAnimator() {
          // 混合当前动画播放速度
          var playSpeed = this._ac.curState.speed;

          if (this._ac.curState.multi) {
            var _this$_ac$params$getN;

            playSpeed *= (_this$_ac$params$getN = this._ac.params.getNumber(this._ac.curState.multi)) != null ? _this$_ac$params$getN : 1;
          }

          this.scaleTime(playSpeed); // 更新动画状态逻辑

          if (this._stateLogicMap) {
            var curLogic = this._stateLogicMap.get(this._ac.curState.name);

            curLogic && curLogic.onUpdate();
          } // 更新状态机逻辑


          this._ac.updateAnimator();
        };

        _proto.update = function update() {
          if (this._hasInit && this.AutoUpdate) {
            this.updateAnimator();
          }
        }
        /**
         * 手动调用更新
         */
        ;

        _proto.manualUpdate = function manualUpdate() {
          if (this._hasInit && !this.AutoUpdate) {
            this.updateAnimator();
          }
        }
        /**
         * 解析状态机json文件
         */
        ;

        _proto.initJson = function initJson(json) {
          this._ac = new AnimatorController(this, json);
        }
        /**
         * 动画结束的回调
         */
        ;

        _proto.onAnimFinished = function onAnimFinished() {
          var _this$_animationPlaye2;

          this._ac.onAnimationComplete();

          (_this$_animationPlaye2 = this._animationPlayer) == null ? void 0 : _this$_animationPlaye2.onFinishedCallback(this);
        }
        /**
         * 播放动画
         * @virtual
         * @param animName 动画名
         * @param loop 是否循环播放
         */
        ;

        _proto.playAnimation = function playAnimation(animName, loop) {}
        /**
         * 缩放动画播放速率
         * @virtual
         * @param scale 缩放倍率
         */
        ;

        _proto.scaleTime = function scaleTime(scale) {}
        /** 
         * 状态切换时的逻辑（状态机内部方法，不能由外部直接调用）
         */
        ;

        _proto.onStateChange = function onStateChange(fromState, toState) {
          this.playAnimation(toState.motion, toState.loop);
          var fromStateName = fromState ? fromState.name : '';

          if (this._stateLogicMap) {
            var fromLogic = this._stateLogicMap.get(fromStateName);

            fromLogic && fromLogic.onExit();

            var toLogic = this._stateLogicMap.get(toState.name);

            toLogic && toLogic.onEntry();
          }

          this._onStateChangeCall && this._onStateChangeCall(fromStateName, toState.name);
        }
        /**
         * 设置boolean类型参数的值
         */
        ;

        _proto.setBool = function setBool(key, value) {
          this._ac.params.setBool(key, value);
        }
        /**
         * 获取boolean类型参数的值
         */
        ;

        _proto.getBool = function getBool(key) {
          return this._ac.params.getBool(key) !== 0;
        }
        /**
         * 设置number类型参数的值
         */
        ;

        _proto.setNumber = function setNumber(key, value) {
          this._ac.params.setNumber(key, value);
        }
        /**
         * 获取number类型参数的值
         */
        ;

        _proto.getNumber = function getNumber(key) {
          return this._ac.params.getNumber(key);
        }
        /**
         * 设置trigger类型参数的值
         */
        ;

        _proto.setTrigger = function setTrigger(key) {
          this._ac.params.setTrigger(key);
        }
        /**
         * 重置trigger类型参数的值
         */
        ;

        _proto.resetTrigger = function resetTrigger(key) {
          this._ac.params.resetTrigger(key);
        }
        /**
         * 设置autoTrigger类型参数的值（autoTrigger类型参数不需要主动reset，每次状态机更新结束后会自动reset）
         */
        ;

        _proto.autoTrigger = function autoTrigger(key) {
          this._ac.params.autoTrigger(key);
        }
        /**
         * 无视条件直接跳转状态
         * @param 状态名
         */
        ;

        _proto.play = function play(stateName) {
          if (!this._hasInit) {
            return;
          }

          this._ac.play(stateName);
        };

        _createClass(AnimatorBase, [{
          key: "curStateName",
          get:
          /** 当前状态名 */
          function get() {
            return this._ac.curState.name;
          }
          /** 当前动画名 */

        }, {
          key: "curStateMotion",
          get: function get() {
            return this._ac.curState.motion;
          }
        }]);

        return AnimatorBase;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "AssetRawUrl", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "PlayOnStart", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "AutoUpdate", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorCondition.ts", ['cc'], function (exports) {
  var cclegacy, error;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      error = module.error;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8ade2h2C/ZA86thhI0NNuqu", "AnimatorCondition", undefined);
      /** 参数类型 */


      var ParamType = exports('ParamType', /*#__PURE__*/function (ParamType) {
        ParamType[ParamType["COMPLETE"] = 0] = "COMPLETE";
        ParamType[ParamType["BOOLEAN"] = 1] = "BOOLEAN";
        ParamType[ParamType["NUMBER"] = 2] = "NUMBER";
        ParamType[ParamType["TRIGGER"] = 3] = "TRIGGER";
        ParamType[ParamType["AUTO_TRIGGER"] = 4] = "AUTO_TRIGGER";
        return ParamType;
      }({}));
      /** 逻辑类型 */

      var LogicType = exports('LogicType', /*#__PURE__*/function (LogicType) {
        LogicType[LogicType["EQUAL"] = 0] = "EQUAL";
        LogicType[LogicType["NOTEQUAL"] = 1] = "NOTEQUAL";
        LogicType[LogicType["GREATER"] = 2] = "GREATER";
        LogicType[LogicType["LESS"] = 3] = "LESS";
        LogicType[LogicType["GREATER_EQUAL"] = 4] = "GREATER_EQUAL";
        LogicType[LogicType["LESS_EQUAL"] = 5] = "LESS_EQUAL";
        return LogicType;
      }({}));
      /**
       * 单项条件
       */

      var AnimatorCondition = exports('default', /*#__PURE__*/function () {
        function AnimatorCondition(data, ac) {
          this._ac = void 0;
          /** 此条件对应的参数名 */

          this._param = "";
          /** 此条件对应的值 */

          this._value = 0;
          /** 此条件与值比较的逻辑 */

          this._logic = LogicType.EQUAL;
          this._ac = ac;
          this._param = data.param;
          this._value = data.value;
          this._logic = data.logic;
        }

        var _proto = AnimatorCondition.prototype;

        _proto.getParamName = function getParamName() {
          return this._param;
        };

        _proto.getParamType = function getParamType() {
          return this._ac.params.getParamType(this._param);
        }
        /** 判断此条件是否满足 */
        ;

        _proto.check = function check() {
          var type = this.getParamType();

          if (type === ParamType.BOOLEAN) {
            return this._ac.params.getBool(this._param) === this._value;
          } else if (type === ParamType.NUMBER) {
            var value = this._ac.params.getNumber(this._param);

            switch (this._logic) {
              case LogicType.EQUAL:
                return value === this._value;

              case LogicType.NOTEQUAL:
                return value !== this._value;

              case LogicType.GREATER:
                return value > this._value;

              case LogicType.LESS:
                return value < this._value;

              case LogicType.GREATER_EQUAL:
                return value >= this._value;

              case LogicType.LESS_EQUAL:
                return value <= this._value;

              default:
                return false;
            }
          } else if (type === ParamType.AUTO_TRIGGER) {
            return this._ac.params.getAutoTrigger(this._param) !== 0;
          } else if (type === ParamType.TRIGGER) {
            return this._ac.params.getTrigger(this._param) !== 0;
          } else {
            error("[AnimatorCondition.check] \u9519\u8BEF\u7684type: " + type);
            return false;
          }
        };

        return AnimatorCondition;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AnimatorParams.ts', './AnimatorState.ts'], function (exports) {
  var _createClass, cclegacy, error, AnimatorParams, AnimatorState;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      error = module.error;
    }, function (module) {
      AnimatorParams = module.default;
    }, function (module) {
      AnimatorState = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "01df9SMBjRCyYDE7SgbZxua", "AnimatorController", undefined);
      /**
       * 状态机控制类
       */


      var AnimatorController = exports('default', /*#__PURE__*/function () {
        function AnimatorController(player, json) {
          this._jsonData = null;
          this._animator = null;
          this._params = null;
          this._states = null;
          this._anyState = null;
          this._curState = null;
          /** 状态切换次数 */

          this._changeCount = 0;
          /** 对应animComplete的状态 */

          this.animCompleteState = null;
          /** 动画播放完毕的标记 */

          this.animComplete = false;
          this._animator = player;
          this._jsonData = json;
          this._states = new Map();
          this._params = new AnimatorParams(json.parameters);
          this.init(json);
        }
        /**
         * 初始化状态机所有动画状态
         */


        var _proto = AnimatorController.prototype;

        _proto.init = function init(json) {
          if (json.states.length <= 0) {
            error("[AnimatorController.init] \u72B6\u6001\u673Ajson\u9519\u8BEF");
            return;
          }

          var defaultState = json.defaultState;
          this._anyState = new AnimatorState(json.anyState, this);

          for (var i = 0; i < json.states.length; i++) {
            var state = new AnimatorState(json.states[i], this);

            this._states.set(state.name, state);
          }

          this.changeState(defaultState);
        };

        _proto.updateState = function updateState() {
          this._curState.checkAndTrans();

          if (this._curState !== this._anyState && this._anyState !== null) {
            this._anyState.checkAndTrans();
          }
        }
        /**
         * 更新状态机逻辑
         */
        ;

        _proto.updateAnimator = function updateAnimator() {
          // 重置计数
          this._changeCount = 0;
          this.updateState(); // 重置动画完成标记

          if (this.animComplete && this.animCompleteState.loop) {
            this.animComplete = false;
          } // 重置autoTrigger


          this.params.resetAllAutoTrigger();
        };

        _proto.onAnimationComplete = function onAnimationComplete() {
          this.animComplete = true;
          this.animCompleteState = this._curState; // cc.log(`animation complete: ${this._curState.name}`);
        }
        /**
         * 无视条件直接跳转状态
         * @param 状态名
         */
        ;

        _proto.play = function play(stateName) {
          if (!this._states.has(stateName) || this._curState.name === stateName) {
            return;
          } // 重置动画完成标记


          this.animComplete = false;
          this.changeState(stateName);
        }
        /**
         * 切换动画状态
         */
        ;

        _proto.changeState = function changeState(stateName) {
          this._changeCount++;

          if (this._changeCount > 1000) {
            error('[AnimatorController.changeState] error: 状态切换递归调用超过1000次，transition设置可能出错!');
            return;
          }

          if (this._states.has(stateName) && (this._curState === null || this._curState.name !== stateName)) {
            var oldState = this._curState;
            this._curState = this._states.get(stateName);

            this._animator.onStateChange(oldState, this._curState);

            this.updateState();
          } else {
            error("[AnimatorController.changeState] error state: " + stateName);
          }
        };

        _createClass(AnimatorController, [{
          key: "curState",
          get:
          /** 当前运行的状态 */
          function get() {
            return this._curState;
          }
        }, {
          key: "params",
          get: function get() {
            return this._params;
          }
        }, {
          key: "states",
          get: function get() {
            return this._states;
          }
        }]);

        return AnimatorController;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorCustomization.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AnimatorBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AnimatorBase;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      AnimatorBase = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "fe7aemTdvFBeJlAmC+6XphU", "AnimatorCustomization", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu,
          disallowMultiple = _decorator.disallowMultiple;
      /** 
       * 自定义动画控制的状态机组件
       */

      var AnimatorCustomization = exports('default', (_dec = menu('animator/AnimatorCustomization'), _dec2 = property({
        override: true,
        visible: false
      }), ccclass(_class = disallowMultiple(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_AnimatorBase) {
        _inheritsLoose(AnimatorCustomization, _AnimatorBase);

        function AnimatorCustomization() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AnimatorBase.call.apply(_AnimatorBase, [this].concat(args)) || this;
          /** 此组件必须主动调用onInit初始化 */

          _initializerDefineProperty(_this, "PlayOnStart", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = AnimatorCustomization.prototype;
        /**
         * 手动初始化状态机，可传入0-3个参数，类型如下
         * - onStateChangeCall 状态切换时的回调
         * - stateLogicMap 各个状态逻辑控制
         * - animationPlayer 自定义动画控制
         * @override
         */

        _proto.onInit = function onInit() {
          if (this._hasInit) {
            return;
          }

          this._hasInit = true;
          this.initArgs.apply(this, arguments);

          if (this.AssetRawUrl !== null) {
            this.initJson(this.AssetRawUrl.json);
          }
        }
        /**
         * 播放动画
         * @override
         * @param animName 动画名
         * @param loop 是否循环播放
         */
        ;

        _proto.playAnimation = function playAnimation(animName, loop) {
          if (this._animationPlayer && animName) {
            this._animationPlayer.playAnimation(animName, loop);
          }
        }
        /**
         * 缩放动画播放速率
         * @override
         * @param scale 缩放倍率
         */
        ;

        _proto.scaleTime = function scaleTime(scale) {
          if (this._animationPlayer) {
            this._animationPlayer.scaleTime(scale);
          }
        };

        return AnimatorCustomization;
      }(AnimatorBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "PlayOnStart", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _class2)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorDragonBones.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AnimatorBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, dragonBones, AnimatorBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      dragonBones = module.dragonBones;
    }, function (module) {
      AnimatorBase = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "dc324J03ptB8b2JV9Ljduzh", "AnimatorDragonBones", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent,
          disallowMultiple = _decorator.disallowMultiple;
      /** 
       * DragonBones状态机组件
       */

      var AnimatorDragonBones = exports('default', (_dec = requireComponent(dragonBones.ArmatureDisplay), ccclass(_class = disallowMultiple(_class = _dec(_class = /*#__PURE__*/function (_AnimatorBase) {
        _inheritsLoose(AnimatorDragonBones, _AnimatorBase);

        function AnimatorDragonBones() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AnimatorBase.call.apply(_AnimatorBase, [this].concat(args)) || this;
          /** DragonBones组件 */

          _this._dragonBones = null;
          return _this;
        }

        var _proto = AnimatorDragonBones.prototype;

        _proto.start = function start() {
          if (!this.PlayOnStart || this._hasInit) {
            return;
          }

          this._hasInit = true;
          this._dragonBones = this.getComponent(dragonBones.ArmatureDisplay);

          this._dragonBones.addEventListener('complete', this.onAnimFinished, this);

          if (this.AssetRawUrl !== null) {
            this.initJson(this.AssetRawUrl.json);
          }
        }
        /**
         * 手动初始化状态机，可传入0-3个参数，类型如下
         * - onStateChangeCall 状态切换时的回调
         * - stateLogicMap 各个状态逻辑控制
         * - animationPlayer 自定义动画控制
         * @override
         */
        ;

        _proto.onInit = function onInit() {
          if (this.PlayOnStart || this._hasInit) {
            return;
          }

          this._hasInit = true;
          this.initArgs.apply(this, arguments);
          this._dragonBones = this.getComponent(dragonBones.ArmatureDisplay);

          this._dragonBones.addEventListener('complete', this.onAnimFinished, this);

          if (this.AssetRawUrl !== null) {
            this.initJson(this.AssetRawUrl.json);
          }
        }
        /**
         * 播放动画
         * @override
         * @param animName 动画名
         * @param loop 是否循环播放
         */
        ;

        _proto.playAnimation = function playAnimation(animName, loop) {
          if (animName) this._dragonBones.playAnimation(animName, loop ? 0 : -1);
        }
        /**
         * 缩放动画播放速率
         * @override
         * @param scale 缩放倍率
         */
        ;

        _proto.scaleTime = function scaleTime(scale) {
          if (scale > 0) this._dragonBones.timeScale = scale;
        };

        return AnimatorDragonBones;
      }(AnimatorBase)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorParams.ts", ['cc', './AnimatorCondition.ts'], function (exports) {
  var cclegacy, ParamType;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ParamType = module.ParamType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "13926xryDRPXJ50lCnLvy4J", "AnimatorParams", undefined);
      /**
       * 参数结构
       */

      /**
       * 状态机参数
       */


      var AnimatorParams = exports('default', /*#__PURE__*/function () {
        function AnimatorParams(dataArr) {
          var _this = this;

          this._paramMap = new Map();
          dataArr.forEach(function (data) {
            var param = {
              type: data.type,
              value: data.init
            };

            _this._paramMap.set(data.param, param);
          });
        }

        var _proto = AnimatorParams.prototype;

        _proto.getParamType = function getParamType(key) {
          var param = this._paramMap.get(key);

          if (param) {
            return param.type;
          } else {
            return null;
          }
        };

        _proto.setNumber = function setNumber(key, value) {
          var param = this._paramMap.get(key);

          if (param && param.type === ParamType.NUMBER) {
            param.value = value;
          }
        };

        _proto.setBool = function setBool(key, value) {
          var param = this._paramMap.get(key);

          if (param && param.type === ParamType.BOOLEAN) {
            param.value = value ? 1 : 0;
          }
        };

        _proto.setTrigger = function setTrigger(key) {
          var param = this._paramMap.get(key);

          if (param && param.type === ParamType.TRIGGER) {
            param.value = 1;
          }
        };

        _proto.resetTrigger = function resetTrigger(key) {
          var param = this._paramMap.get(key);

          if (param && param.type === ParamType.TRIGGER) {
            param.value = 0;
          }
        };

        _proto.autoTrigger = function autoTrigger(key) {
          var param = this._paramMap.get(key);

          if (param && param.type === ParamType.AUTO_TRIGGER) {
            param.value = 1;
          }
        };

        _proto.resetAutoTrigger = function resetAutoTrigger(key) {
          var param = this._paramMap.get(key);

          if (param && param.type === ParamType.AUTO_TRIGGER) {
            param.value = 0;
          }
        };

        _proto.resetAllAutoTrigger = function resetAllAutoTrigger() {
          this._paramMap.forEach(function (param, key) {
            if (param.type === ParamType.AUTO_TRIGGER) {
              param.value = 0;
            }
          });
        };

        _proto.getNumber = function getNumber(key) {
          var param = this._paramMap.get(key);

          if (param && param.type === ParamType.NUMBER) {
            return param.value;
          } else {
            return 0;
          }
        };

        _proto.getBool = function getBool(key) {
          var param = this._paramMap.get(key);

          if (param && param.type === ParamType.BOOLEAN) {
            return param.value;
          } else {
            return 0;
          }
        };

        _proto.getTrigger = function getTrigger(key) {
          var param = this._paramMap.get(key);

          if (param && param.type === ParamType.TRIGGER) {
            return param.value;
          } else {
            return 0;
          }
        };

        _proto.getAutoTrigger = function getAutoTrigger(key) {
          var param = this._paramMap.get(key);

          if (param && param.type === ParamType.AUTO_TRIGGER) {
            return param.value;
          } else {
            return 0;
          }
        };

        return AnimatorParams;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorSkeletal.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AnimatorAnimation.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SkeletalAnimation, CCFloat, game, AnimatorAnimation;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SkeletalAnimation = module.SkeletalAnimation;
      CCFloat = module.CCFloat;
      game = module.game;
    }, function (module) {
      AnimatorAnimation = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "8c545jBn4xF7LWXjl506avi", "AnimatorSkeletal", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent,
          disallowMultiple = _decorator.disallowMultiple,
          menu = _decorator.menu;
      var AnimatorSkeletal = exports('AnimatorSkeletal', (_dec = requireComponent(SkeletalAnimation), _dec2 = menu('animator/AnimatorSkeletal'), _dec3 = property({
        type: CCFloat,
        tooltip: "动画切换过度时间"
      }), ccclass(_class = disallowMultiple(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_AnimatorAnimation) {
        _inheritsLoose(AnimatorSkeletal, _AnimatorAnimation);

        function AnimatorSkeletal() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AnimatorAnimation.call.apply(_AnimatorAnimation, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "duration", _descriptor, _assertThisInitialized(_this));

          _this.cross_duration = 0; // 防止切换动画时间少于间隔时间导致动画状态错乱的问题

          _this.current_time = 0;
          return _this;
        }

        var _proto = AnimatorSkeletal.prototype; // 上一次切换状态时间

        _proto.onLoad = function onLoad() {
          this.cross_duration = this.duration * 1000;
        }
        /**
          * 播放动画
          * @override
          * @param animName 动画名
          * @param loop 是否循环播放
          */
        ;

        _proto.playAnimation = function playAnimation(animName, loop) {
          if (!animName) {
            return;
          }

          if (game.totalTime - this.current_time > this.cross_duration) {
            this._animation.crossFade(animName, this.duration);
          } else {
            this._animation.play(animName);
          }

          this.current_time = game.totalTime;
          this._animState = this._animation.getState(animName);

          if (!this._animState) {
            return;
          }

          if (!this._wrapModeMap.has(this._animState)) {
            this._wrapModeMap.set(this._animState, this._animState.wrapMode);
          } // this._animState.wrapMode = loop ? 2 : this._wrapModeMap.get(this._animState)!;


          this._animState.wrapMode = loop ? 2 : 1; // 2为循环播放，1为单次播放
        };

        return AnimatorSkeletal;
      }(AnimatorAnimation), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "duration", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.3;
        }
      }), _class2)) || _class) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorSpine.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AnimatorBase.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, sp, AnimatorBase;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
    }, function (module) {
      AnimatorBase = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "7fde8yJEfxMMqzjg+V4UVkT", "AnimatorSpine", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent,
          disallowMultiple = _decorator.disallowMultiple;
      /** 
       * Spine状态机组件（主状态机），trackIndex为0
       */

      var AnimatorSpine = exports('default', (_dec = requireComponent(sp.Skeleton), ccclass(_class = disallowMultiple(_class = _dec(_class = /*#__PURE__*/function (_AnimatorBase) {
        _inheritsLoose(AnimatorSpine, _AnimatorBase);

        function AnimatorSpine() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AnimatorBase.call.apply(_AnimatorBase, [this].concat(args)) || this;
          /** spine组件 */

          _this._spine = null;
          /** 动画完成的回调 */

          _this._completeListenerMap = new Map();
          /** 次状态机注册的回调 */

          _this._secondaryListenerMap = new Map();
          return _this;
        }

        var _proto = AnimatorSpine.prototype;

        _proto.start = function start() {
          if (!this.PlayOnStart || this._hasInit) {
            return;
          }

          this._hasInit = true;
          this._spine = this.getComponent(sp.Skeleton);

          this._spine.setEventListener(this.onSpineEvent.bind(this));

          this._spine.setCompleteListener(this.onSpineComplete.bind(this));

          if (this.AssetRawUrl !== null) {
            this.initJson(this.AssetRawUrl.json);
          }
        }
        /**
         * 手动初始化状态机，可传入0-3个参数，类型如下
         * - onStateChangeCall 状态切换时的回调
         * - stateLogicMap 各个状态逻辑控制
         * - animationPlayer 自定义动画控制
         * @override
         */
        ;

        _proto.onInit = function onInit() {
          if (this.PlayOnStart || this._hasInit) {
            return;
          }

          this._hasInit = true;
          this.initArgs.apply(this, arguments);
          this._spine = this.getComponent(sp.Skeleton);

          this._spine.setEventListener(this.onSpineEvent.bind(this));

          this._spine.setCompleteListener(this.onSpineComplete.bind(this));

          if (this.AssetRawUrl !== null) {
            this.initJson(this.AssetRawUrl.json);
          }
        }
        /** ---------- 后续扩展代码 开始 ---------- */
        ;

        _proto.getBone = function getBone(name) {
          var bone = this._spine.findBone(name);

          return bone;
        };

        _proto.onSpineEvent = function onSpineEvent(trackEntry, event) {
          var _this$_animationPlaye;

          var animationName = trackEntry.animation ? event.data.name : "";
          (_this$_animationPlaye = this._animationPlayer) == null ? void 0 : _this$_animationPlaye.onFrameEventCallback(animationName, this);
        }
        /** ---------- 后续扩展代码 结束 ---------- */
        ;

        _proto.onSpineComplete = function onSpineComplete(entry) {
          entry.trackIndex === 0 && this.onAnimFinished();

          this._completeListenerMap.forEach(function (target, cb) {
            target ? cb.call(target, entry) : cb(entry);
          });

          this._secondaryListenerMap.forEach(function (target, cb) {
            entry.trackIndex === target.TrackIndex && cb.call(target, entry);
          });
        }
        /**
         * 播放动画
         * @override
         * @param animName 动画名
         * @param loop 是否循环播放
         */
        ;

        _proto.playAnimation = function playAnimation(animName, loop) {
          if (animName) {
            this._spine.setAnimation(0, animName, loop);
          } else {
            this._spine.clearTrack(0);
          }
        }
        /**
         * 缩放动画播放速率
         * @override
         * @param scale 缩放倍率
         */
        ;

        _proto.scaleTime = function scaleTime(scale) {
          if (scale > 0) this._spine.timeScale = scale;
        }
        /**
         * 注册次状态机动画结束的回调（状态机内部方法，不能由外部直接调用）
         */
        ;

        _proto.addSecondaryListener = function addSecondaryListener(cb, target) {
          this._secondaryListenerMap.set(cb, target);
        }
        /**
         * 注册动画完成时的监听
         * @param cb 回调
         * @param target 调用回调的this对象
         */
        ;

        _proto.addCompleteListener = function addCompleteListener(cb, target) {
          if (target === void 0) {
            target = null;
          }

          if (this._completeListenerMap.has(cb)) {
            return;
          }

          this._completeListenerMap.set(cb, target);
        }
        /**
         * 注销动画完成的监听
         * @param cb 回调
         */
        ;

        _proto.removeCompleteListener = function removeCompleteListener(cb) {
          this._completeListenerMap["delete"](cb);
        }
        /**
         * 清空动画完成的监听
         */
        ;

        _proto.clearCompleteListener = function clearCompleteListener() {
          this._completeListenerMap.clear;
        };

        return AnimatorSpine;
      }(AnimatorBase)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorSpineSecondary.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AnimatorSpine.ts', './AnimatorBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, sp, AnimatorSpine, AnimatorBase;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
    }, function (module) {
      AnimatorSpine = module.default;
    }, function (module) {
      AnimatorBase = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "e47112s9c9Kwo8XQQ4KSW0c", "AnimatorSpineSecondary", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent;
      /** 
       * Spine状态机组件（次状态机），同一节点可添加多个，用于在不同track中播放动画，trackIndex必须大于0
       */

      var AnimatorSpineSecondary = exports('default', (_dec = requireComponent(sp.Skeleton), _dec2 = property({
        tooltip: '动画播放的trackIndex，必须大于0'
      }), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_AnimatorBase) {
        _inheritsLoose(AnimatorSpineSecondary, _AnimatorBase);

        function AnimatorSpineSecondary() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AnimatorBase.call.apply(_AnimatorBase, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "TrackIndex", _descriptor, _assertThisInitialized(_this));
          /** 主状态机 */


          _this._main = null;
          /** spine组件 */

          _this._spine = null;
          return _this;
        }

        var _proto = AnimatorSpineSecondary.prototype;

        _proto.start = function start() {
          if (!this.PlayOnStart || this._hasInit) {
            return;
          }

          this._hasInit = true;
          this._spine = this.getComponent(sp.Skeleton);
          this._main = this.getComponent(AnimatorSpine);

          this._main.addSecondaryListener(this.onAnimFinished, this);

          if (this.AssetRawUrl !== null) {
            this.initJson(this.AssetRawUrl.json);
          }
        }
        /**
         * 手动初始化状态机，可传入0-3个参数，类型如下
         * - onStateChangeCall 状态切换时的回调
         * - stateLogicMap 各个状态逻辑控制
         * - animationPlayer 自定义动画控制
         * @override
         */
        ;

        _proto.onInit = function onInit() {
          if (this.PlayOnStart || this._hasInit) {
            return;
          }

          this._hasInit = true;
          this.initArgs.apply(this, arguments);
          this._spine = this.getComponent(sp.Skeleton);
          this._main = this.getComponent(AnimatorSpine);

          this._main.addSecondaryListener(this.onAnimFinished, this);

          if (this.AssetRawUrl !== null) {
            this.initJson(this.AssetRawUrl.json);
          }
        }
        /**
         * 播放动画
         * @override
         * @param animName 动画名
         * @param loop 是否循环播放
         */
        ;

        _proto.playAnimation = function playAnimation(animName, loop) {
          if (animName) {
            this._spine.setAnimation(this.TrackIndex, animName, loop);
          } else {
            this._spine.clearTrack(this.TrackIndex);
          }
        };

        return AnimatorSpineSecondary;
      }(AnimatorBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "TrackIndex", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorState.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AnimatorTransition.ts'], function (exports) {
  var _createClass, cclegacy, AnimatorTransition;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AnimatorTransition = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bd2d1/E71JL1Jj3HzsYH82H", "AnimatorState", undefined);
      /**
       * 状态管理类
       */


      var AnimatorState = exports('default', /*#__PURE__*/function () {
        function AnimatorState(data, ac) {
          this._name = "";
          this._motion = "";
          this._loop = false;
          this._speed = 1;
          this._multi = "";
          this._transitions = [];
          this._ac = null;
          this._name = data.state;
          this._motion = data.motion || '';
          this._loop = data.loop || false;
          this._speed = data.speed || 1;
          this._multi = data.multiplier || '';
          this._ac = ac;

          for (var i = 0; i < data.transitions.length; i++) {
            var transition = new AnimatorTransition(data.transitions[i], ac);
            transition.isValid() && this._transitions.push(transition);
          }
        }
        /**
         * 判断各个分支是否满足条件，满足则转换状态
         */


        var _proto = AnimatorState.prototype;

        _proto.checkAndTrans = function checkAndTrans() {
          for (var i = 0; i < this._transitions.length; i++) {
            var transition = this._transitions[i];

            if (transition && transition.check()) {
              transition.doTrans();
              return;
            }
          }
        };

        _createClass(AnimatorState, [{
          key: "name",
          get:
          /** 状态名 */
          function get() {
            return this._name;
          }
          /** 动画名 */

        }, {
          key: "motion",
          get: function get() {
            return this._motion;
          }
          /** 动画是否循环播放 */

        }, {
          key: "loop",
          get: function get() {
            return this._loop;
          }
          /** 动画播放速度的混合参数 */

        }, {
          key: "multi",
          get: function get() {
            return this._multi;
          }
          /** 动画播放速度 */

        }, {
          key: "speed",
          get: function get() {
            return this._speed;
          },
          set: function set(value) {
            this._speed = value;
          }
        }]);

        return AnimatorState;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorStateLogic.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b06fbd3UdNKvooAUeDi9UTc", "AnimatorStateLogic", undefined);
      /**
       * 状态逻辑基类
       */


      var AnimatorStateLogic = exports('AnimatorStateLogic', /*#__PURE__*/function () {
        function AnimatorStateLogic() {}

        var _proto = AnimatorStateLogic.prototype;
        /**
         * 进入状态时调用
         * @virtual
         */

        _proto.onEntry = function onEntry() {}
        /**
         * 每次状态机逻辑更新时调用
         * @virtual
         */
        ;

        _proto.onUpdate = function onUpdate() {}
        /**
         * 离开状态时调用
         * @virtual
         */
        ;

        _proto.onExit = function onExit() {};

        return AnimatorStateLogic;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AnimatorTransition.ts", ['cc', './AnimatorCondition.ts'], function (exports) {
  var cclegacy, ParamType, AnimatorCondition;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ParamType = module.ParamType;
      AnimatorCondition = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "39224xRIkpEG7hvPJlKoGDy", "AnimatorTransition", undefined);
      /**
       * 状态过渡类
       */


      var AnimatorTransition = exports('default', /*#__PURE__*/function () {
        function AnimatorTransition(data, ac) {
          this._toStateName = '';
          this._hasExitTime = false;
          this._conditions = [];
          this._ac = null;
          this._toStateName = data.toState;
          this._hasExitTime = data.hasExitTime;
          this._ac = ac;

          for (var i = 0; i < data.conditions.length; i++) {
            var condition = new AnimatorCondition(data.conditions[i], ac);

            this._conditions.push(condition);
          }
        }
        /**
         * 返回该transition是否有效，当未勾选hasExitTime以及没有添加任何condition时此transition无效并忽略
         */


        var _proto = AnimatorTransition.prototype;

        _proto.isValid = function isValid() {
          return this._hasExitTime || this._conditions.length > 0;
        }
        /**
         * 判断是否满足所有转换条件
         */
        ;

        _proto.check = function check() {
          if (this._toStateName === this._ac.curState.name) {
            return false;
          }

          if (this._hasExitTime && (this._ac.curState !== this._ac.animCompleteState || !this._ac.animComplete)) {
            return false;
          }

          for (var i = 0; i < this._conditions.length; i++) {
            if (!this._conditions[i].check()) {
              return false;
            }
          }

          return true;
        }
        /**
         * 转换状态
         */
        ;

        _proto.doTrans = function doTrans() {
          // 满足条件时重置动画播完标记
          if (this._hasExitTime) {
            this._ac.animComplete = false;
          } // 满足状态转换条件时重置trigger和autoTrigger


          for (var i = 0; i < this._conditions.length; i++) {
            var type = this._conditions[i].getParamType();

            var name = this._conditions[i].getParamName();

            if (type === ParamType.TRIGGER) {
              this._ac.params.resetTrigger(name);
            } else if (type === ParamType.AUTO_TRIGGER) {
              this._ac.params.resetAutoTrigger(name);
            }
          }

          this._ac.changeState(this._toStateName);
        };

        return AnimatorTransition;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ArrayUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4613b2zY/dMSaGPBGo6eti3", "ArrayUtil", undefined);
      /*
       * @Author: dgflash
       * @Date: 2021-08-11 16:41:12
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-02 14:50:57
       */

      /** 数组工具 */


      var ArrayUtil = exports('ArrayUtil', /*#__PURE__*/function () {
        function ArrayUtil() {}
        /**
         * 数组去重，并创建一个新数组返回
         * @param arr  源数组
         */


        ArrayUtil.noRepeated = function noRepeated(arr) {
          var res = [arr[0]];

          for (var i = 1; i < arr.length; i++) {
            var repeat = false;

            for (var j = 0; j < res.length; j++) {
              if (arr[i] == res[j]) {
                repeat = true;
                break;
              }
            }

            if (!repeat) {
              res.push(arr[i]);
            }
          }

          return res;
        }
        /**
         * 复制二维数组
         * @param array 目标数组 
         */
        ;

        ArrayUtil.copy2DArray = function copy2DArray(array) {
          var newArray = [];

          for (var i = 0; i < array.length; i++) {
            newArray.push(array[i].concat());
          }

          return newArray;
        }
        /**
         * Fisher-Yates Shuffle 随机置乱算法
         * @param array 目标数组
         */
        ;

        ArrayUtil.fisherYatesShuffle = function fisherYatesShuffle(array) {
          var count = array.length;

          while (count) {
            var index = Math.floor(Math.random() * count--);
            var temp = array[count];
            array[count] = array[index];
            array[index] = temp;
          }

          return array;
        }
        /**
         * 混淆数组
         * @param array 目标数组
         */
        ;

        ArrayUtil.confound = function confound(array) {
          var result = array.slice().sort(function () {
            return Math.random() - .5;
          });
          return result;
        }
        /**
         * 数组扁平化
         * @param array 目标数组
         */
        ;

        ArrayUtil.flattening = function flattening(array) {
          for (; array.some(function (v) {
            return Array.isArray(v);
          });) {
            // 判断 array 中是否有数组
            array = [].concat.apply([], array); // 压扁数组
          }

          return array;
        }
        /** 删除数组中指定项 */
        ;

        ArrayUtil.removeItem = function removeItem(array, item) {
          var temp = array.concat();

          for (var i = 0; i < temp.length; i++) {
            var value = temp[i];

            if (item == value) {
              array.splice(i, 1);
              break;
            }
          }
        }
        /**
         * 合并数组
         * @param array1 目标数组1
         * @param array2 目标数组2
         */
        ;

        ArrayUtil.combineArrays = function combineArrays(array1, array2) {
          var newArray = [].concat(array1, array2);
          return newArray;
        }
        /**
         * 获取随机数组成员
         * @param array 目标数组
         */
        ;

        ArrayUtil.getRandomValueInArray = function getRandomValueInArray(array) {
          var newArray = array[Math.floor(Math.random() * array.length)];
          return newArray;
        };

        return ArrayUtil;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AsyncQueue.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, warn, log;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      warn = module.warn;
      log = module.log;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8c48bBN521JzIxhITJunFji", "AsyncQueue", undefined);
      /**
       * 异步队列处理
       * @example
      var queue: AsyncQueue = new AsyncQueue();
      queue.push((next: NextFunction, params: any, args: any) => {
          oops.res.load("language/font/" + oops.language.current, next);
      });
      queue.push((next: NextFunction, params: any, args: any) => {
          oops.res.loadDir("common", next);
      });
      queue.complete =  () => {
          console.log("处理完成");
      };
      queue.play();
       */


      var AsyncQueue = exports('AsyncQueue', /*#__PURE__*/function () {
        function AsyncQueue() {
          // 正在运行的任务
          this._runningAsyncTask = null;
          this._queues = []; // 正在执行的异步任务标识

          this._isProcessingTaskUUID = 0;
          this._enable = true;
          /**
           * 任务队列完成回调
           */

          this.complete = null;
        }

        var _proto = AsyncQueue.prototype;
        /**
         * 添加一个异步任务到队列中
         * @param callback  回调
         * @param params    参数
         */

        _proto.push = function push(callback, params) {
          if (params === void 0) {
            params = null;
          }

          var uuid = AsyncQueue._$uuid_count++;

          this._queues.push({
            uuid: uuid,
            callbacks: [callback],
            params: params
          });

          return uuid;
        }
        /**
         * 添加多个任务，多个任务函数会同时执行
         * @param params     参数据
         * @param callbacks  回调
         * @returns 
         */
        ;

        _proto.pushMulti = function pushMulti(params) {
          var uuid = AsyncQueue._$uuid_count++;

          for (var _len = arguments.length, callbacks = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            callbacks[_key - 1] = arguments[_key];
          }

          this._queues.push({
            uuid: uuid,
            callbacks: callbacks,
            params: params
          });

          return uuid;
        }
        /**
         * 移除一个还未执行的异步任务
         * @param uuid  任务唯一编号
         */
        ;

        _proto.remove = function remove(uuid) {
          var _this$_runningAsyncTa;

          if (((_this$_runningAsyncTa = this._runningAsyncTask) == null ? void 0 : _this$_runningAsyncTa.uuid) === uuid) {
            warn("正在执行的任务不可以移除");
            return;
          }

          for (var i = 0; i < this._queues.length; i++) {
            if (this._queues[i].uuid === uuid) {
              this._queues.splice(i, 1);

              break;
            }
          }
        }
        /** 队列长度 */
        ;
        /** 清空队列 */


        _proto.clear = function clear() {
          this._queues = [];
          this._isProcessingTaskUUID = 0;
          this._runningAsyncTask = null;
        }
        /** 跳过当前正在执行的任务 */
        ;

        _proto.step = function step() {
          if (this.isProcessing) {
            this.next(this._isProcessingTaskUUID);
          }
        }
        /**
         * 开始运行队列
         * @param args  参数
         */
        ;

        _proto.play = function play(args) {
          var _this = this;

          if (args === void 0) {
            args = null;
          }

          if (this.isProcessing) {
            return;
          }

          if (!this._enable) {
            return;
          }

          var actionData = this._queues.shift();

          if (actionData) {
            this._runningAsyncTask = actionData;
            var taskUUID = actionData.uuid;
            this._isProcessingTaskUUID = taskUUID;
            var callbacks = actionData.callbacks;

            if (callbacks.length == 1) {
              var nextFunc = function nextFunc(nextArgs) {
                if (nextArgs === void 0) {
                  nextArgs = null;
                }

                _this.next(taskUUID, nextArgs);
              };

              callbacks[0](nextFunc, actionData.params, args);
            } else {
              // 多个任务函数同时执行
              var fnum = callbacks.length;
              var nextArgsArr = [];

              var _nextFunc = function _nextFunc(nextArgs) {
                if (nextArgs === void 0) {
                  nextArgs = null;
                }

                --fnum;
                nextArgsArr.push(nextArgs || null);

                if (fnum === 0) {
                  _this.next(taskUUID, nextArgsArr);
                }
              };

              var knum = fnum;

              for (var i = 0; i < knum; i++) {
                callbacks[i](_nextFunc, actionData.params, args);
              }
            }
          } else {
            this._isProcessingTaskUUID = 0;
            this._runningAsyncTask = null;

            if (this.complete) {
              this.complete(args);
            }
          }
        }
        /**
         * 往队列中push一个延时任务
         * @param time 毫秒时间
         * @param callback （可选参数）时间到了之后回调
         */
        ;

        _proto.yieldTime = function yieldTime(time, callback) {
          if (callback === void 0) {
            callback = null;
          }

          var task = function task(next, params, args) {
            var _t = setTimeout(function () {
              clearTimeout(_t);

              if (callback) {
                callback();
              }

              next(args);
            }, time);
          };

          this.push(task, {
            des: "AsyncQueue.yieldTime"
          });
        };

        _proto.next = function next(taskUUID, args) {
          if (args === void 0) {
            args = null;
          }

          if (this._isProcessingTaskUUID === taskUUID) {
            this._isProcessingTaskUUID = 0;
            this._runningAsyncTask = null;
            this.play(args);
          } else {
            if (this._runningAsyncTask) {
              log(this._runningAsyncTask);
            }
          }
        }
        /**
         * 返回一个执行函数，执行函数调用count次后，next将触发
         * @param count 
         * @param next 
         * @return 返回一个匿名函数
         */
        ;

        AsyncQueue.excuteTimes = function excuteTimes(count, next) {
          if (next === void 0) {
            next = null;
          }

          var fnum = count;

          var call = function call() {
            --fnum;

            if (fnum === 0) {
              next && next();
            }
          };

          return call;
        };

        _createClass(AsyncQueue, [{
          key: "queues",
          get:
          /** 任务队列 */
          function get() {
            return this._queues;
          }
        }, {
          key: "enable",
          get:
          /** 是否开启可用 */
          function get() {
            return this._enable;
          }
          /** 是否开启可用 */
          ,
          set: function set(val) {
            if (this._enable === val) {
              return;
            }

            this._enable = val;

            if (val && this.size > 0) {
              this.play();
            }
          }
        }, {
          key: "size",
          get: function get() {
            return this._queues.length;
          }
          /** 是否有正在处理的任务 */

        }, {
          key: "isProcessing",
          get: function get() {
            return this._isProcessingTaskUUID > 0;
          }
          /** 队列是否已停止 */

        }, {
          key: "isStop",
          get: function get() {
            if (this._queues.length > 0) {
              return false;
            }

            if (this.isProcessing) {
              return false;
            }

            return true;
          }
          /** 正在执行的任务参数 */

        }, {
          key: "runningParams",
          get: function get() {
            if (this._runningAsyncTask) {
              return this._runningAsyncTask.params;
            }

            return null;
          }
        }]);

        return AsyncQueue;
      }()); // 任务task的唯一标识

      AsyncQueue._$uuid_count = 1;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioEffect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, AudioClip, error, AudioSource, oops;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      error = module.error;
      AudioSource = module.AudioSource;
    }, function (module) {
      oops = module.oops;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "e52d2ysY1BEbpcT2Cz0Wwss", "AudioEffect", undefined);

      var ccclass = _decorator.ccclass,
          menu = _decorator.menu;
      /**
       * 注：用playOneShot播放的音乐效果，在播放期间暂时没办法即时关闭音乐
       */

      /** 游戏音效 */

      var AudioEffect = exports('AudioEffect', (_dec = ccclass('AudioEffect'), _dec(_class = /*#__PURE__*/function (_AudioSource) {
        _inheritsLoose(AudioEffect, _AudioSource);

        function AudioEffect() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AudioSource.call.apply(_AudioSource, [this].concat(args)) || this;
          _this.effects = new Map();
          return _this;
        }

        var _proto = AudioEffect.prototype;
        /**
         * 加载音效并播放
         * @param url           音效资源地址
         * @param callback      资源加载完成并开始播放回调
         */

        _proto.load = function load(url, callback) {
          var _this2 = this;

          oops.res.load(url, AudioClip, function (err, data) {
            if (err) {
              error(err);
            }

            _this2.effects.set(url, data);

            _this2.playOneShot(data, _this2.volume);

            callback && callback();
          });
        }
        /** 释放所有已使用过的音效资源 */
        ;

        _proto.release = function release() {
          for (var key in this.effects) {
            oops.res.release(key);
          }

          this.effects.clear();
        };

        return AudioEffect;
      }(AudioSource)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './AudioEffect.ts', './AudioMusic.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, Component, oops, AudioEffect, AudioMusic;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      AudioEffect = module.AudioEffect;
    }, function (module) {
      AudioMusic = module.AudioMusic;
    }],
    execute: function () {
      cclegacy._RF.push({}, "252f0z+vPNL8Y/jsLYmomtw", "AudioManager", undefined);

      var LOCAL_STORE_KEY = "game_audio";
      /** 
       * 音频管理
       * @example 
      // 模块功能通过 oops.audio 调用
      oops.audio.playMusic("audios/nocturne");
       */

      var AudioManager = exports('AudioManager', /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioManager, _Component);

        function AudioManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.local_data = {};
          _this.music = void 0;
          _this.effect = void 0;
          _this._volume_music = 1;
          _this._volume_effect = 1;
          _this._switch_music = true;
          _this._switch_effect = true;
          return _this;
        }

        var _proto = AudioManager.prototype;
        /**
         * 设置背景音乐播放完成回调
         * @param callback 背景音乐播放完成回调
         */

        _proto.setMusicComplete = function setMusicComplete(callback) {
          if (callback === void 0) {
            callback = null;
          }

          this.music.onComplete = callback;
        }
        /**
         * 播放背景音乐
         * @param url        资源地址
         * @param callback   音乐播放完成事件
         */
        ;

        _proto.playMusic = function playMusic(url, callback) {
          if (this._switch_music) {
            this.music.load(url, callback);
          }
        }
        /**
         * 获取背景音乐播放进度
         */
        ;
        /**
         * 播放音效
         * @param url        资源地址
         */


        _proto.playEffect = function playEffect(url) {
          if (this._switch_effect) {
            this.effect.load(url);
          }
        }
        /** 
         * 获取音效音量 
         */
        ;
        /** 恢复当前暂停的音乐与音效播放 */


        _proto.resumeAll = function resumeAll() {
          if (this.music) {
            this.music.play();
            this.effect.play();
          }
        }
        /** 暂停当前音乐与音效的播放 */
        ;

        _proto.pauseAll = function pauseAll() {
          if (this.music) {
            this.music.pause();
            this.effect.pause();
          }
        }
        /** 停止当前音乐与音效的播放 */
        ;

        _proto.stopAll = function stopAll() {
          if (this.music) {
            this.music.stop();
            this.effect.stop();
          }
        }
        /** 保存音乐音效的音量、开关配置数据到本地 */
        ;

        _proto.save = function save() {
          this.local_data.volume_music = this._volume_music;
          this.local_data.volume_effect = this._volume_effect;
          this.local_data.switch_music = this._switch_music;
          this.local_data.switch_effect = this._switch_effect;
          var data = JSON.stringify(this.local_data);
          oops.storage.set(LOCAL_STORE_KEY, data);
        }
        /** 本地加载音乐音效的音量、开关配置数据并设置到游戏中 */
        ;

        _proto.load = function load() {
          this.music = this.getComponent(AudioMusic) || this.addComponent(AudioMusic);
          this.effect = this.getComponent(AudioEffect) || this.addComponent(AudioEffect);
          var data = oops.storage.get(LOCAL_STORE_KEY);

          if (data) {
            try {
              this.local_data = JSON.parse(data);
              this._volume_music = this.local_data.volume_music;
              this._volume_effect = this.local_data.volume_effect;
              this._switch_music = this.local_data.switch_music;
              this._switch_effect = this.local_data.switch_effect;
            } catch (e) {
              this.local_data = {};
              this._volume_music = 1;
              this._volume_effect = 1;
              this._switch_music = true;
              this._switch_effect = true;
            }

            if (this.music) this.music.volume = this._volume_music;
            if (this.effect) this.effect.volume = this._volume_effect;
          }
        };

        _createClass(AudioManager, [{
          key: "progressMusic",
          get: function get() {
            return this.music.progress;
          }
          /**
           * 设置背景乐播放进度
           * @param value     播放进度值
           */
          ,
          set: function set(value) {
            this.music.progress = value;
          }
          /**
           * 获取背景音乐音量
           */

        }, {
          key: "volumeMusic",
          get: function get() {
            return this._volume_music;
          }
          /** 
           * 设置背景音乐音量
           * @param value     音乐音量值
           */
          ,
          set: function set(value) {
            this._volume_music = value;
            this.music.volume = value;
          }
          /** 
           * 获取背景音乐开关值 
           */

        }, {
          key: "switchMusic",
          get: function get() {
            return this._switch_music;
          }
          /** 
           * 设置背景音乐开关值
           * @param value     开关值
           */
          ,
          set: function set(value) {
            this._switch_music = value;
            if (value == false) this.music.stop();
          }
        }, {
          key: "volumeEffect",
          get: function get() {
            return this._volume_effect;
          }
          /**
           * 设置获取音效音量
           * @param value     音效音量值
           */
          ,
          set: function set(value) {
            this._volume_effect = value;
            this.effect.volume = value;
          }
          /** 
           * 获取音效开关值 
           */

        }, {
          key: "switchEffect",
          get: function get() {
            return this._switch_effect;
          }
          /**
           * 设置音效开关值
           * @param value     音效开关值
           */
          ,
          set: function set(value) {
            this._switch_effect = value;
            if (value == false) this.effect.stop();
          }
        }]);

        return AudioManager;
      }(Component));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioMusic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, _decorator, AudioClip, error, AudioSource, oops;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      error = module.error;
      AudioSource = module.AudioSource;
    }, function (module) {
      oops = module.oops;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "5c1f3kqGetBiIv48/CvuaQv", "AudioMusic", undefined);

      var ccclass = _decorator.ccclass,
          menu = _decorator.menu;
      /** 背景音乐 */

      var AudioMusic = exports('AudioMusic', (_dec = ccclass('AudioMusic'), _dec(_class = /*#__PURE__*/function (_AudioSource) {
        _inheritsLoose(AudioMusic, _AudioSource);

        function AudioMusic() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _AudioSource.call.apply(_AudioSource, [this].concat(args)) || this;
          /** 背景音乐播放完成回调 */

          _this.onComplete = null;
          _this._progress = 0;
          _this._url = null;
          _this._isPlay = false;
          return _this;
        }

        var _proto = AudioMusic.prototype;
        /**
         * 加载音乐并播放
         * @param url          音乐资源地址
         * @param callback     加载完成回调
         */

        _proto.load = function load(url, callback) {
          var _this2 = this;

          oops.res.load(url, AudioClip, function (err, data) {
            if (err) {
              error(err);
            }

            if (_this2.playing) {
              _this2._isPlay = false;

              _this2.stop();
            }

            if (_this2._url) {
              oops.res.release(_this2._url);
            }

            _this2.enabled = true;
            _this2.clip = data; // 注：事件定义在这里，是为了在播放前设置初始播放位置数据

            callback && callback();

            _this2.play();

            _this2._url = url;
          });
        }
        /** cc.Component 生命周期方法，验证背景音乐播放完成逻辑，建议不要主动调用 */
        ;

        _proto.update = function update(dt) {
          if (this.currentTime > 0) {
            this._isPlay = true;
          }

          if (this._isPlay && this.playing == false) {
            this._isPlay = false;
            this.enabled = false;
            this.onComplete && this.onComplete();
          }
        }
        /** 释放当前背景音乐资源 */
        ;

        _proto.release = function release() {
          if (this._url) {
            oops.res.release(this._url);
            this._url = null;
          }
        };

        _createClass(AudioMusic, [{
          key: "progress",
          get:
          /** 获取音乐播放进度 */
          function get() {
            if (this.duration > 0) this._progress = this.currentTime / this.duration;
            return this._progress;
          }
          /**
           * 设置音乐当前播放进度
           * @param value     进度百分比0到1之间
           */
          ,
          set: function set(value) {
            this._progress = value;
            this.currentTime = value * this.duration;
          }
        }]);

        return AudioMusic;
      }(AudioSource)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Badge.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './RoundRectMask.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Enum, SpriteFrame, CCInteger, color, UITransform, Vec3, Label, Node, Layers, Mask, Sprite, Overflow, Component, RoundRectMask;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      SpriteFrame = module.SpriteFrame;
      CCInteger = module.CCInteger;
      color = module.color;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Label = module.Label;
      Node = module.Node;
      Layers = module.Layers;
      Mask = module.Mask;
      Sprite = module.Sprite;
      Overflow = module.Overflow;
      Component = module.Component;
    }, function (module) {
      RoundRectMask = module.RoundRectMask;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3;

      cclegacy._RF.push({}, "bac76ow94VI+IpAB1DQUKfq", "Badge", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property; // 徽标位置

      var Position = exports('Position', /*#__PURE__*/function (Position) {
        Position[Position["TOP_LEFT"] = 0] = "TOP_LEFT";
        Position[Position["TOP_RIGHT"] = 1] = "TOP_RIGHT";
        return Position;
      }({}));
      Enum(Position);
      var Badge = exports('Badge', (_dec = ccclass('Badge'), _dec2 = property({
        type: SpriteFrame,
        tooltip: '背景'
      }), _dec3 = property({
        tooltip: '内容'
      }), _dec4 = property({
        type: CCInteger,
        tooltip: '宽'
      }), _dec5 = property({
        type: CCInteger,
        tooltip: '高'
      }), _dec6 = property({
        type: CCInteger,
        tooltip: '圆角'
      }), _dec7 = property({
        type: Position,
        tooltip: '位置\n 0: 左上角 \n 1: 右上角'
      }), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Badge, _Component);

        function Badge() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "bg", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "string", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "width", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "height", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "radius", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "position", _descriptor6, _assertThisInitialized(_this));

          _this.badgeNode = null;
          _this.color = color(214, 30, 30, 240);
          _this.textColor = color(255, 255, 255, 255);
          _this.labelNode = null;
          return _this;
        }

        var _proto = Badge.prototype;

        _proto.onLoad = function onLoad() {
          this.initBadge();
        } // 初始化badge，插入节点等操作
        ;

        _proto.initBadge = function initBadge() {
          var badgeNode = this.createBadge();
          this.node.addChild(badgeNode);
        } // 设置位置
        ;

        _proto.setPosition = function setPosition(position) {
          var _this$node$getCompone, _this$badgeNode$getCo;

          var parentSize = (_this$node$getCompone = this.node.getComponent(UITransform)) == null ? void 0 : _this$node$getCompone.contentSize;
          var badgeSize = (_this$badgeNode$getCo = this.badgeNode.getComponent(UITransform)) == null ? void 0 : _this$badgeNode$getCo.contentSize;

          switch (position) {
            case Position.TOP_LEFT:
              {
                var x = -parentSize.width / 2;
                var y = parentSize.height / 2;
                this.badgeNode.setPosition(new Vec3(x, y, 0));
                break;
              }

            case Position.TOP_RIGHT:
              {
                var _x = parentSize.width / 2;

                var _y = parentSize.height / 2;

                this.badgeNode.setPosition(new Vec3(_x, _y, 0));
                break;
              }
          }
        } // 设置文字
        ;

        _proto.setText = function setText(text) {
          this.text = text;
          var label = this.labelNode.getComponent(Label);

          if (label) {
            label.string = this.text;
            label.color = this.textColor;
          }

          return this;
        };

        _proto.createBadge = function createBadge() {
          var _this$badgeNode$getCo2, _backgroundNode$getCo, _label$getComponent;

          this.badgeNode = new Node('BadgeNode');
          var backgroundNode = new Node('backgroundNode');
          this.labelNode = new Node('labelNode');
          this.badgeNode.layer = Layers.Enum.UI_2D;
          backgroundNode.layer = Layers.Enum.UI_2D;
          this.labelNode.layer = Layers.Enum.UI_2D; // 设置mask

          this.badgeNode.addComponent(Mask);
          this.badgeNode.addComponent(RoundRectMask).radius = this.radius;
          (_this$badgeNode$getCo2 = this.badgeNode.getComponent(UITransform)) == null ? void 0 : _this$badgeNode$getCo2.setContentSize(this.width, this.height);
          this.badgeNode.active = true; // 设置背景

          var _sprite = backgroundNode.addComponent(Sprite);

          _sprite.type = Sprite.Type.SIMPLE;
          _sprite.color = this.color;
          _sprite.spriteFrame = this.bg;
          (_backgroundNode$getCo = backgroundNode.getComponent(UITransform)) == null ? void 0 : _backgroundNode$getCo.setContentSize(this.width, this.height); // 设置label信息

          var _label = this.labelNode.addComponent(Label);

          (_label$getComponent = _label.getComponent(UITransform)) == null ? void 0 : _label$getComponent.setContentSize(this.width, this.height);
          _label.string = this.text;
          _label.color = this.textColor;
          _label.fontSize = 18;
          _label.isBold = true;
          _label.horizontalAlign = Label.HorizontalAlign.CENTER;
          _label.verticalAlign = Label.VerticalAlign.CENTER;
          _label.lineHeight = 0;
          _label.overflow = Overflow.NONE;
          _label.enableWrapText = false; // 添加节点

          this.badgeNode.addChild(backgroundNode);
          this.badgeNode.addChild(this.labelNode);
          this.setPosition(this.position);
          return this.badgeNode;
        };

        _proto.start = function start() {};

        _createClass(Badge, [{
          key: "text",
          get: function get() {
            return this.string;
          },
          set: function set(text) {
            this.string = text;
            this.setText(text);
          }
        }]);

        return Badge;
      }(Component), _class3.POSITION = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bg", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "string", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '6';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "width", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 30;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "height", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 26;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "radius", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 6;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "position", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Position.TOP_LEFT;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BehaviorTree.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BTreeNode.ts'], function (exports) {
  var _createClass, cclegacy, BTreeNode;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BTreeNode = module.BTreeNode;
    }],
    execute: function () {
      cclegacy._RF.push({}, "22a91RP3fNG/rWWAXlmM4BT", "BehaviorTree", undefined);

      var countUnnamed = 0;
      /** 行为树 */

      var BehaviorTree = exports('BehaviorTree', /*#__PURE__*/function () {
        /**
         * 构造函数
         * @param node          根节点
         * @param blackboard    外部参数对象
         */
        function BehaviorTree(node, blackboard) {
          this.title = void 0;
          /** 根节点 */

          this._root = void 0;
          /** 当前执行节点 */

          this._current = void 0;
          /** 是否已开始执行 */

          this._started = false;
          /** 外部参数对象 */

          this._blackboard = void 0;
          countUnnamed += 1;
          this.title = node.constructor.name + '(btree_' + countUnnamed + ')';
          this._root = node;
          this._blackboard = blackboard;
        }
        /** 设置行为逻辑中的共享数据 */


        var _proto = BehaviorTree.prototype;

        _proto.setObject = function setObject(blackboard) {
          this._blackboard = blackboard;
        }
        /** 执行行为树逻辑 */
        ;

        _proto.run = function run() {
          if (this._started) {
            console.error("\u884C\u4E3A\u6811\u3010" + this.title + "\u3011\u672A\u8C03\u7528\u6B65\u9AA4\uFF0C\u5728\u6700\u540E\u4E00\u6B21\u8C03\u7528\u6B65\u9AA4\u65F6\u6709\u4E00\u4E2A\u4EFB\u52A1\u672A\u5B8C\u6210");
          }

          this._started = true;
          var node = BehaviorTree.getNode(this._root);
          this._current = node;
          node.setControl(this);
          node.start(this._blackboard);
          node.run(this._blackboard);
        };

        _proto.running = function running(node) {
          this._started = false;
        };

        _proto.success = function success() {
          this._current.end(this._blackboard);

          this._started = false;
        };

        _proto.fail = function fail() {
          this._current.end(this._blackboard);

          this._started = false;
        }
        /** ---------------------------------------------------------------------------------------------------- */
        ;

        BehaviorTree.register = function register(name, node) {
          this._registeredNodes.set(name, node);
        };

        BehaviorTree.getNode = function getNode(name) {
          var node = name instanceof BTreeNode ? name : this._registeredNodes.get(name);

          if (!node) {
            throw new Error("\u65E0\u6CD5\u627E\u5230\u8282\u70B9\u3010" + name + "\u3011\uFF0C\u53EF\u80FD\u5B83\u6CA1\u6709\u6CE8\u518C\u8FC7");
          }

          return node;
        };

        _createClass(BehaviorTree, [{
          key: "started",
          get:
          /** 是否已开始执行 */
          function get() {
            return this._started;
          }
        }]);

        return BehaviorTree;
      }());
      BehaviorTree._registeredNodes = new Map();

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BhvButtonGroup.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Enum, Button, SpriteFrame, EventHandler, Component, color;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      Button = module.Button;
      SpriteFrame = module.SpriteFrame;
      EventHandler = module.EventHandler;
      Component = module.Component;
      color = module.color;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

      cclegacy._RF.push({}, "41df676L55LvJ52uxkQpfxJ", "BhvButtonGroup", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;

      var PARAM_TYPE = /*#__PURE__*/function (PARAM_TYPE) {
        PARAM_TYPE[PARAM_TYPE["CHILDREN_INDEX"] = 0] = "CHILDREN_INDEX";
        PARAM_TYPE[PARAM_TYPE["CHILDREN_NAME"] = 1] = "CHILDREN_NAME";
        return PARAM_TYPE;
      }(PARAM_TYPE || {});
      /**
       * 群体事件，适合绑定节点组的回调信息
       * 将该组件的所处节点的所有子节点，绑定相同的回调对象，并将组件名设置到customEventData属性中
       */


      var BhvButtonGroup = exports('BhvButtonGroup', (_dec = menu("添加特殊行为/UI/Button Group(一组按钮控制)"), _dec2 = property({
        type: Enum(Button.Transition)
      }), _dec3 = property({
        visible: function visible() {
          // @ts-ignore
          return this.transition === Button.Transition.COLOR;
        }
      }), _dec4 = property({
        visible: function visible() {
          // @ts-ignore
          return this.transition === Button.Transition.COLOR;
        }
      }), _dec5 = property({
        visible: function visible() {
          // @ts-ignore
          return this.transition === Button.Transition.COLOR;
        }
      }), _dec6 = property({
        visible: function visible() {
          // @ts-ignore
          return this.transition === Button.Transition.COLOR;
        }
      }), _dec7 = property({
        type: SpriteFrame,
        visible: function visible() {
          // @ts-ignore
          return this.transition === Button.Transition.SPRITE;
        }
      }), _dec8 = property({
        type: SpriteFrame,
        visible: function visible() {
          // @ts-ignore
          return this.transition === Button.Transition.SPRITE;
        }
      }), _dec9 = property({
        type: SpriteFrame,
        visible: function visible() {
          // @ts-ignore
          return this.transition === Button.Transition.SPRITE;
        }
      }), _dec10 = property({
        type: SpriteFrame,
        visible: function visible() {
          // @ts-ignore
          return this.transition === Button.Transition.SPRITE;
        }
      }), _dec11 = property({
        visible: function visible() {
          // @ts-ignore
          return this.transition === Button.Transition.SCALE || this.transition === Button.Transition.COLOR;
        }
      }), _dec12 = property({
        visible: function visible() {
          // @ts-ignore
          return this.transition === Button.Transition.SCALE;
        }
      }), _dec13 = property({
        type: Enum(PARAM_TYPE)
      }), _dec14 = property({
        type: [EventHandler]
      }), _dec15 = property({
        tooltip: '规避3.x引擎BUG，EventHandler.component位为空导致找不到触发事件的脚本名的问题',
        readonly: true
      }), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BhvButtonGroup, _Component);

        function BhvButtonGroup() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "transition", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "hoverColor", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "normalColor", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pressedColor", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "disabledColor", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "normalSprite", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pressedSprite", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "hoverSprite", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "disabledSprite", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "duration", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "zoomScale", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "paramType", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "touchEvents", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EventHandler_component", _descriptor14, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = BhvButtonGroup.prototype;

        _proto.onLoad = function onLoad() {
          var _this2 = this;

          this.node.children.forEach(function (node, nodeIndex) {
            var comp = node.getComponent(Button);
            if (comp == null) comp = node.addComponent(Button); // 同步属性
            // comp.target = node;
            // comp.transition = this.transition;
            // comp.zoomScale = this.zoomScale;
            // comp.disabledSprite = this.disabledSprite;
            // comp.hoverSprite = this.hoverSprite;
            // comp.normalSprite = this.normalSprite;
            // comp.pressedSprite = this.pressedSprite;
            // comp.hoverColor = this.hoverColor;
            // comp.normalColor = this.normalColor;
            // comp.pressedColor = this.pressedColor;
            // comp.disabledColor = this.disabledColor;
            // 绑定回调事件

            _this2.touchEvents.forEach(function (event) {
              // 克隆数据，每个节点获取的都是不同的回调
              var hd = new EventHandler(); //copy对象

              hd.component = event.component == "" ? _this2.EventHandler_component : event.component;
              hd.handler = event.handler;
              hd.target = event.target;

              if (_this2.paramType === PARAM_TYPE.CHILDREN_INDEX) {
                hd.customEventData = nodeIndex.toString();
              } else {
                hd.customEventData = node.name;
              }

              comp.clickEvents.push(hd);
            });
          });
        };

        return BhvButtonGroup;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "transition", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Button.Transition.NONE;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "hoverColor", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return color(255, 255, 255);
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "normalColor", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return color(214, 214, 214);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "pressedColor", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return color(211, 211, 211);
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "disabledColor", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return color(124, 124, 124);
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "normalSprite", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "pressedSprite", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "hoverSprite", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "disabledSprite", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "duration", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "zoomScale", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.1;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "paramType", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return PARAM_TYPE.CHILDREN_INDEX;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "touchEvents", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "EventHandler_component", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "VMModify";
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BhvFrameIndex.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Sprite, SpriteFrame, CCInteger, error, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      CCInteger = module.CCInteger;
      error = module.error;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "c238ewfJ2VJnZ8Gb8YQs5Ts", "BhvFrameIndex", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          requireComponent = _decorator.requireComponent,
          menu = _decorator.menu;
      var BhvFrameIndex = exports('BhvFrameIndex', (_dec = requireComponent(Sprite), _dec2 = menu("添加特殊行为/UI/Frame Index(帧图改变)"), _dec3 = property({
        type: [SpriteFrame],
        tooltip: 'sprite将会用到帧图片'
      }), _dec4 = property({
        type: CCInteger,
        tooltip: '当前显示的帧图'
      }), ccclass(_class = executeInEditMode(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BhvFrameIndex, _Component);

        function BhvFrameIndex() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "spriteFrames", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_index", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = BhvFrameIndex.prototype;
        /** 通过设置帧名字来设置对象 */

        _proto.setName = function setName(name) {
          var index = this.spriteFrames.findIndex(function (v) {
            return v.name == name;
          });

          if (index < 0) {
            error('frameIndex 设置了不存在的name:', name);
          }

          this.index = index || 0;
        }
        /** 随机范围设置帧图片 */
        ;

        _proto.random = function random(min, max) {
          if (!this.spriteFrames) return;
          var frameMax = this.spriteFrames.length;
          if (min == null || min < 0) min = 0;
          if (max == null || max > frameMax) max = frameMax;
          this.index = Math.floor(Math.random() * (max - min) + min);
        };

        _proto.next = function next() {
          this.index++;
        };

        _proto.previous = function previous() {
          this.index--;
        };

        _createClass(BhvFrameIndex, [{
          key: "index",
          get: function get() {
            return this._index;
          },
          set: function set(value) {
            if (value < 0) return;
            this._index = value % this.spriteFrames.length;
            var sprite = this.node.getComponent(Sprite); //设置 Sprite 组件的spriteFrame属性，变换图片               

            sprite.spriteFrame = this.spriteFrames[this._index];
          }
        }]);

        return BhvFrameIndex;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spriteFrames", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [null];
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "index", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "index"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_index", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BhvRollNumber.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Label, Enum, lerp, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Enum = module.Enum;
      lerp = module.lerp;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

      cclegacy._RF.push({}, "72d13dwmG9LS4gkJhSuAp3F", "BhvRollNumber", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;

      var VALUE_TYPE = /*#__PURE__*/function (VALUE_TYPE) {
        VALUE_TYPE[VALUE_TYPE["INTEGER"] = 0] = "INTEGER";
        VALUE_TYPE[VALUE_TYPE["FIXED_2"] = 1] = "FIXED_2";
        VALUE_TYPE[VALUE_TYPE["TIMER"] = 2] = "TIMER";
        VALUE_TYPE[VALUE_TYPE["PERCENTAGE"] = 3] = "PERCENTAGE";
        VALUE_TYPE[VALUE_TYPE["KMBT_FIXED2"] = 4] = "KMBT_FIXED2";
        VALUE_TYPE[VALUE_TYPE["CUSTOMER"] = 5] = "CUSTOMER";
        return VALUE_TYPE;
      }(VALUE_TYPE || {});
      /**
       * [滚动数字] ver 0.5.0
       * 将会使用 lerp 自动滚动数字到目标数值
       */


      var BhvRollNumber = exports('BhvRollNumber', (_dec = menu("添加特殊行为/UI/Roll Number (滚动数字)"), _dec2 = property({
        type: Label,
        tooltip: '需要滚动的 Label 组件,如果不进行设置，就会从自己的节点自动查找'
      }), _dec3 = property({
        tooltip: '当前的滚动值(开始的滚动值)'
      }), _dec4 = property({
        tooltip: '是否显示正负符号'
      }), _dec5 = property({
        tooltip: '滚动的目标值'
      }), _dec6 = property({
        tooltip: '滚动的线性差值',
        step: 0.01,
        max: 1,
        min: 0
      }), _dec7 = property({
        tooltip: '是否在开始时就播放'
      }), _dec8 = property({
        tooltip: '在滚动之前会等待几秒',
        step: 0.1,
        max: 1,
        min: 0
      }), _dec9 = property({
        type: Enum(VALUE_TYPE),
        tooltip: '是否在开始时就播放'
      }), ccclass(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BhvRollNumber, _Component);

        function BhvRollNumber() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "label", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "value", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "showPlusSymbol", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_targetValue", _descriptor4, _assertThisInitialized(_this));
          /** 滚动的线性差值 0 ~ 1 */


          _initializerDefineProperty(_this, "lerp", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "playAtStart", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "runWaitTimer", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueType", _descriptor8, _assertThisInitialized(_this));
          /** 自定义string 处理函数 */


          _this._custom_callback = null;
          _this.isScrolling = false;
          return _this;
        }

        var _proto = BhvRollNumber.prototype;

        _proto.onLoad = function onLoad() {
          if (this.label == undefined) {
            this.label = this.node.getComponent(Label);
          }

          if (this.playAtStart) {
            this.updateLabel();
            this.scroll();
          }
        }
        /** 开始滚动数字 */
        ;

        _proto.scroll = function scroll() {
          var _this2 = this;

          if (this.isScrolling) return; //  已经在滚动了就返回

          if (this.runWaitTimer > 0) {
            this.scheduleOnce(function () {
              _this2.isScrolling = true;
            }, this.runWaitTimer);
          } else {
            this.isScrolling = true;
          }
        }
        /** 停止滚动数字 */
        ;

        _proto.stop = function stop() {
          this.value = this.targetValue;
          this.isScrolling = false;
          this.updateLabel();
        }
        /** 初始化数值,不填写则全部按默认值处理 */
        ;

        _proto.init = function init(value, target, lerp) {
          this.targetValue = target || 0;
          this.value = value || 0;
          this.lerp = lerp || 0.1;
        }
        /** 滚动到指定数字 */
        ;

        _proto.scrollTo = function scrollTo(target) {
          if (target === null || target === undefined) return;
          this.targetValue = target;
        }
        /** 更新文本 */
        ;

        _proto.updateLabel = function updateLabel() {
          var value = this.value;
          var string = '';

          switch (this.valueType) {
            case VALUE_TYPE.INTEGER:
              // 最终显示整数类型
              string = Math.round(value) + '';
              break;

            case VALUE_TYPE.FIXED_2:
              // 最终显示两位小数类型
              string = value.toFixed(2);
              break;

            case VALUE_TYPE.TIMER:
              // 最终显示 计时器类型
              string = parseTimer(value);
              break;

            case VALUE_TYPE.PERCENTAGE:
              // 最终显示 百分比
              string = Math.round(value * 100) + '%';
              break;

            case VALUE_TYPE.KMBT_FIXED2:
              // 长单位缩放,只计算到 KMBT
              if (value >= Number.MAX_VALUE) {
                string = 'MAX';
              } else if (value > 1000000000000) {
                string = (value / 1000000000000).toFixed(2) + 'T';
              } else if (value > 1000000000) {
                string = (value / 1000000000).toFixed(2) + 'B';
              } else if (value > 1000000) {
                string = (value / 1000000).toFixed(2) + 'M';
              } else if (value > 1000) {
                string = (value / 1000).toFixed(2) + "K";
              } else {
                string = Math.round(value).toString();
              }

              break;

            case VALUE_TYPE.CUSTOMER:
              // 自定义设置模式 (通过给定的自定义函数..处理)
              if (this._custom_callback) {
                string = this._custom_callback(this.value, this.targetValue);
              }

              break;
          } // 显示正负符号


          if (this.showPlusSymbol) {
            if (value > 0) {
              string = '+' + string;
            } else if (value < 0) {
              string = '-' + string;
            }
          }

          if (this.label) {
            if (string === this.label.string) return; // 保证效率,如果上次赋值过,就不重复赋值

            this.label.string = string;
          }
        };

        _proto.update = function update(dt) {
          if (this.isScrolling == false) return;
          this.value = lerp(this.value, this.targetValue, this.lerp);
          this.updateLabel();

          if (Math.abs(this.value - this.targetValue) <= 0.0001) {
            this.value = this.targetValue;
            this.isScrolling = false; //this.node.emit('roll-hit-target');        // 滚动数字击中了目标

            return;
          }
        };

        _createClass(BhvRollNumber, [{
          key: "targetValue",
          get: function get() {
            return this._targetValue;
          },
          set: function set(v) {
            this._targetValue = v;
            this.scroll(); //数据变动了就开始滚动
          }
        }]);

        return BhvRollNumber;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "showPlusSymbol", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "targetValue", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "targetValue"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_targetValue", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lerp", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "playAtStart", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "runWaitTimer", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "valueType", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return VALUE_TYPE.INTEGER;
        }
      })), _class2)) || _class) || _class));
      /** 时间格式转换 */

      function parseTimer(timer, isFullTimer) {
        if (timer === void 0) {
          timer = 0;
        }

        if (isFullTimer === void 0) {
          isFullTimer = true;
        }

        var t = Math.floor(timer);
        var hours = Math.floor(t / 3600);
        var mins = Math.floor(t % 3600 / 60);
        var secs = t % 60;
        var m = '' + mins;
        var s = '' + secs;
        if (secs < 10) s = '0' + secs; // full timer 按小时算,无论有没有小时

        if (isFullTimer) {
          if (mins < 10) m = '0' + mins;
          return hours + ':' + m + ':' + s;
        } else {
          m = '' + (mins + hours * 60);
          if (mins < 10) m = '0' + mins;
          return m + ':' + s;
        }
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BhvSwitchPage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './VMEnv.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, CCInteger, Component, VMEnv;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCInteger = module.CCInteger;
      Component = module.Component;
    }, function (module) {
      VMEnv = module.VMEnv;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "b3d083kncpDPqVztMtiq6DO", "BhvSwitchPage", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          menu = _decorator.menu;
      var BhvSwitchPage = exports('BhvSwitchPage', (_dec = menu("添加特殊行为/UI/Switch Page (切换页面)"), _dec2 = property({
        type: CCInteger
      }), ccclass(_class = executeInEditMode(_class = _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BhvSwitchPage, _Component);

        function BhvSwitchPage() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "isLoopPage", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_index", _descriptor2, _assertThisInitialized(_this));

          _this.preIndex = 0; //判断是否在 changing 页面状态

          _this._isChanging = false;
          return _this;
        }

        var _proto = BhvSwitchPage.prototype;

        _proto.onLoad = function onLoad() {
          this.preIndex = this.index;
        };

        _proto._updateEditorPage = function _updateEditorPage(page) {
          if (!VMEnv.editor) return;
          var children = this.node.children;

          for (var i = 0; i < children.length; i++) {
            var node = children[i];

            if (i == page) {
              node.active = true;
            } else {
              node.active = false;
            }
          }
        };

        _proto._updatePage = function _updatePage(page) {
          var children = this.node.children;
          var preIndex = this.preIndex;
          var curIndex = this.index;
          if (preIndex === curIndex) return; //没有改变就不进行操作

          var preNode = children[preIndex]; //旧节点

          var showNode = children[curIndex]; //新节点

          preNode.active = false;
          showNode.active = true;
        };

        _proto.next = function next() {
          if (this.isChanging) {
            return false;
          } else {
            this.index++;
            return true;
          }
        };

        _proto.previous = function previous() {
          if (this.isChanging) {
            return false;
          } else {
            this.index--;
            return true;
          }
        };

        _proto.setEventIndex = function setEventIndex(e, index) {
          if (this.index >= 0 && this.index != null && this.isChanging === false) {
            this.index = index;
            return true;
          } else {
            return false;
          }
        };

        _createClass(BhvSwitchPage, [{
          key: "index",
          get: function get() {
            return this._index;
          },
          set: function set(v) {
            if (this.isChanging) return;
            v = Math.round(v);
            var count = this.node.children.length - 1;

            if (this.isLoopPage) {
              if (v > count) v = 0;
              if (v < 0) v = count;
            } else {
              if (v > count) v = count;
              if (v < 0) v = 0;
            }

            this.preIndex = this._index; //标记之前的页面

            this._index = v;

            if (VMEnv.editor) {
              this._updateEditorPage(v);
            } else {
              this._updatePage(v);
            }
          }
        }, {
          key: "isChanging",
          get:
          /**只读，是否在changing 的状态 */
          function get() {
            return this._isChanging;
          }
        }]);

        return BhvSwitchPage;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isLoopPage", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_index", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "index", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "index"), _class2.prototype)), _class2)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BranchNode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BehaviorTree.ts', './BTreeNode.ts'], function (exports) {
  var _inheritsLoose, cclegacy, BehaviorTree, BTreeNode;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BehaviorTree = module.BehaviorTree;
    }, function (module) {
      BTreeNode = module.BTreeNode;
    }],
    execute: function () {
      cclegacy._RF.push({}, "beafaDMsw9FCbGDpLVmMfa1", "BranchNode", undefined);
      /** 复合节点 */


      var BranchNode = exports('BranchNode', /*#__PURE__*/function (_BTreeNode) {
        _inheritsLoose(BranchNode, _BTreeNode);

        function BranchNode(nodes) {
          var _this;

          _this = _BTreeNode.call(this) || this;
          /** 子节点数组 */

          _this.children = void 0;
          /** 当前任务索引 */

          _this._actualTask = void 0;
          /** 正在运行的节点 */

          _this._runningNode = void 0;
          _this._nodeRunning = void 0;
          /** 外部参数对象 */

          _this._blackboard = void 0;
          _this.children = nodes || [];
          return _this;
        }

        var _proto = BranchNode.prototype;

        _proto.start = function start() {
          this._actualTask = 0;

          _BTreeNode.prototype.start.call(this);
        };

        _proto.run = function run(blackboard) {
          if (this.children.length == 0) {
            // 没有子任务直接视为执行失败
            this._control.fail();
          } else {
            this._blackboard = blackboard;
            this.start();

            if (this._actualTask < this.children.length) {
              this._run();
            }
          }

          this.end();
        }
        /** 执行当前节点逻辑 */
        ;

        _proto._run = function _run(blackboard) {
          var node = BehaviorTree.getNode(this.children[this._actualTask]);
          this._runningNode = node;
          node.setControl(this);
          node.start(this._blackboard);
          node.run(this._blackboard);
        };

        _proto.running = function running(node) {
          this._nodeRunning = node;

          this._control.running(node);
        };

        _proto.success = function success() {
          this._nodeRunning = null;

          this._runningNode.end(this._blackboard);
        };

        _proto.fail = function fail() {
          this._nodeRunning = null;

          this._runningNode.end(this._blackboard);
        };

        return BranchNode;
      }(BTreeNode));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BTreeNode.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f0aeepAwndJP7wlpP6QKx06", "BTreeNode", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-06-21 12:05:14
       * @LastEditors: dgflash
       * @LastEditTime: 2022-07-20 14:04:44
       */

      /** 行为树节点 */


      var BTreeNode = exports('BTreeNode', /*#__PURE__*/function () {
        function BTreeNode() {
          this._control = void 0;
          this.title = void 0;
          this.title = this.constructor.name;
        }

        var _proto = BTreeNode.prototype;

        _proto.start = function start(blackboard) {};

        _proto.end = function end(blackboard) {};

        _proto.setControl = function setControl(control) {
          this._control = control;
        };

        _proto.running = function running(blackboard) {
          this._control.running(this);
        };

        _proto.success = function success() {
          this._control.success();
        };

        _proto.fail = function fail() {
          this._control.fail();
        };

        return BTreeNode;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BuildTimeConstants.ts", ['cc', './env'], function (exports) {
  var cclegacy, env;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      env = module;
    }],
    execute: function () {
      cclegacy._RF.push({}, "21a39/4HchJdJkSQKKKkLh9", "BuildTimeConstants", undefined);

      var keys = Object.keys(env).sort();
      /* 游戏运行环境 */

      var BuildTimeConstants = exports('BuildTimeConstants', function BuildTimeConstants() {
        var keyNameMaxLen = keys.reduce(function (len, key) {
          return Math.max(len, key.length);
        }, 0);
        var enviroment = "" + keys.map(function (key) {
          var value = env[key];
          var valueRep = typeof value === 'boolean' ? value ? 'true' : 'false' : value;
          return "\n" + key.padStart(keyNameMaxLen, ' ') + " : " + valueRep;
        });
        console.log(enviroment);
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonEffect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './ButtonSimple.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Animation, AnimationClip, Sprite, oops, ButtonSimple;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      AnimationClip = module.AnimationClip;
      Sprite = module.Sprite;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      ButtonSimple = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "1be36hrGO5Oz6Eapg6ygW03", "ButtonEffect", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var ButtonEffect = exports('default', (_dec = ccclass("ButtonEffect"), _dec2 = menu('ui/button/ButtonEffect'), _dec3 = property({
        tooltip: "是否开启"
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_ButtonSimple) {
        _inheritsLoose(ButtonEffect, _ButtonSimple);

        function ButtonEffect() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ButtonSimple.call.apply(_ButtonSimple, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "disabledEffect", _descriptor, _assertThisInitialized(_this));

          _this.anim = void 0;
          return _this;
        }

        var _proto = ButtonEffect.prototype;

        _proto.onLoad = function onLoad() {
          this.anim = this.node.addComponent(Animation);
          var ac_start = oops.res.get("common/anim/button_scale_start", AnimationClip);
          var ac_end = oops.res.get("common/anim/button_scale_end", AnimationClip);
          this.anim.defaultClip = ac_start;
          this.anim.createState(ac_start, ac_start == null ? void 0 : ac_start.name);
          this.anim.createState(ac_end, ac_end == null ? void 0 : ac_end.name);

          _ButtonSimple.prototype.onLoad.call(this);
        };

        _proto.onTouchtStart = function onTouchtStart(event) {
          if (!this.disabledEffect) {
            this.anim.play("button_scale_start");
          }
        };

        _proto.onTouchEnd = function onTouchEnd(event) {
          if (!this.disabledEffect) {
            this.anim.play("button_scale_end");
          }

          _ButtonSimple.prototype.onTouchEnd.call(this, event);
        };

        _createClass(ButtonEffect, [{
          key: "grayscale",
          get:
          /** 按钮禁用效果 */
          function get() {
            return this.node.getComponent(Sprite).grayscale;
          },
          set: function set(value) {
            if (this.node.getComponent(Sprite)) {
              this.node.getComponent(Sprite).grayscale = value;
            }
          }
        }]);

        return ButtonEffect;
      }(ButtonSimple), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "disabledEffect", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonSimple.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, game, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      game = module.game;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "8d645yObX1FvJfk2sbi0rxp", "ButtonSimple", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var ButtonSimple = exports('default', (_dec = ccclass("ButtonSimple"), _dec2 = menu('ui/button/ButtonSimple'), _dec3 = property({
        tooltip: "是否只能触发一次"
      }), _dec4 = property({
        tooltip: "每次触发间隔"
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ButtonSimple, _Component);

        function ButtonSimple() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "once", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "interval", _descriptor2, _assertThisInitialized(_this));

          _this.touchCount = 0;
          _this.touchtEndTime = 0;
          return _this;
        }

        var _proto = ButtonSimple.prototype;

        _proto.onLoad = function onLoad() {
          this.node.on(Node.EventType.TOUCH_START, this.onTouchtStart, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }
        /** 触摸开始 */
        ;

        _proto.onTouchtStart = function onTouchtStart(event) {}
        /** 触摸结束 */
        ;

        _proto.onTouchEnd = function onTouchEnd(event) {
          if (this.once) {
            if (this.touchCount > 0) {
              event.propagationStopped = true;
              return;
            }

            this.touchCount++;
          } // 防连点500毫秒出发一次事件


          if (this.touchtEndTime && game.totalTime - this.touchtEndTime < this.interval) {
            event.propagationStopped = true;
          } else {
            this.touchtEndTime = game.totalTime;
          }
        };

        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.TOUCH_START, this.onTouchtStart, this);
          this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        };

        return ButtonSimple;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "once", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "interval", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 500;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonTouchLong.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ButtonEffect.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, EventHandler, ButtonEffect;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EventHandler = module.EventHandler;
    }, function (module) {
      ButtonEffect = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "da96en7WYpPTaPIkO1l/Nux", "ButtonTouchLong", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var ButtonTouchLong = exports('ButtonTouchLong', (_dec = ccclass("ButtonTouchLong"), _dec2 = menu('ui/button/ButtonTouchLong'), _dec3 = property({
        tooltip: "长按时间（秒）"
      }), _dec4 = property({
        type: [EventHandler],
        tooltip: "长按时间（秒）"
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_ButtonEffect) {
        _inheritsLoose(ButtonTouchLong, _ButtonEffect);

        function ButtonTouchLong() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ButtonEffect.call.apply(_ButtonEffect, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "time", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "clickEvents", _descriptor2, _assertThisInitialized(_this));

          _this._passTime = 0;
          _this._isTouchLong = true;
          _this._event = null;
          return _this;
        }

        var _proto = ButtonTouchLong.prototype;

        _proto.onLoad = function onLoad() {
          this._isTouchLong = false;

          _ButtonEffect.prototype.onLoad.call(this);
        }
        /** 触摸开始 */
        ;

        _proto.onTouchtStart = function onTouchtStart(event) {
          this._event = event;
          this._passTime = 0;

          _ButtonEffect.prototype.onTouchtStart.call(this, event);
        }
        /** 触摸结束 */
        ;

        _proto.onTouchEnd = function onTouchEnd(event) {
          if (this._passTime > this.time) {
            event.propagationStopped = true;
          }

          this._event = null;
          this._passTime = 0;
          this._isTouchLong = false;

          _ButtonEffect.prototype.onTouchEnd.call(this, event);
        };

        _proto.removeTouchLong = function removeTouchLong() {
          this._event = null;
          this._isTouchLong = false;
        }
        /** 引擎更新事件 */
        ;

        _proto.update = function update(dt) {
          if (this._event && !this._isTouchLong) {
            this._passTime += dt;

            if (this._passTime >= this.time) {
              this._isTouchLong = true;
              this.clickEvents.forEach(function (event) {
                event.emit([event.customEventData]);
              });
              this.removeTouchLong();
            }
          }
        };

        return ButtonTouchLong;
      }(ButtonEffect), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "time", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "clickEvents", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CameraUtil.ts", ['cc'], function (exports) {
  var cclegacy, Vec3, view;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      view = module.view;
    }],
    execute: function () {
      cclegacy._RF.push({}, "95c77QQpp1EjKj8UBFCCdKu", "CameraUtil", undefined);
      /** 摄像机工具 */


      var CameraUtil = exports('CameraUtil', /*#__PURE__*/function () {
        function CameraUtil() {}
        /**
         * 当前世界坐标是否在摄像机显示范围内
         * @param camera    摄像机
         * @param worldPos  坐标
         */


        CameraUtil.isInView = function isInView(camera, worldPos) {
          var cameraPos = camera.node.getWorldPosition();
          var viewPos = camera.worldToScreen(worldPos);
          var dir = Vec3.normalize(new Vec3(), worldPos.subtract(cameraPos));
          var forward = camera.node.forward;
          var dot = Vec3.dot(forward, dir);
          var viewportRect = view.getViewportRect(); // 判断物体是否在相机前面

          if (dot > 0 // 判断物体是否在视窗内
          && viewPos.x <= viewportRect.width && viewPos.x >= 0 && viewPos.y <= viewportRect.height && viewPos.y >= 0) return true;else return false;
        };

        return CameraUtil;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CCComp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameComponent.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, GameComponent;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      GameComponent = module.GameComponent;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "dd207fiyGJLf5r+bkiMgwdt", "CCComp", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 
       * 游戏显示对象组件
       * 
       * 功能介绍：
       * 1. 对象拥有 cc.Component 组件功能与 ecs.Comp 组件功能
       * 2. 对象自带全局事件监听、释放、发送全局消息功能
       * 3. 对象管理的所有节点摊平，直接通过节点名获取cc.Node对象
       * 
       * 应用场景
       * 1. 网络游戏，优先有数据对象，然后创建视图对象，当释放视图组件时，部分场景不希望释放数据对象
       * 
       * @example
      @ccclass('RoleViewComp')
      @ecs.register('RoleView', false)
      export class RoleViewComp extends CCComp {
          @property({ type: sp.Skeleton, tooltip: '角色动画' })
          spine: sp.Skeleton = null!;
            onLoad(){
              
          }
      }
       */

      var CCComp = exports('CCComp', (_dec = ccclass('CCComp'), _dec(_class = (_class2 = /*#__PURE__*/function (_GameComponent) {
        _inheritsLoose(CCComp, _GameComponent);

        function CCComp() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _GameComponent.call.apply(_GameComponent, [this].concat(args)) || this;
          _this.canRecycle = void 0;
          _this.ent = void 0;
          return _this;
        }

        return CCComp;
      }(GameComponent), _class2.tid = -1, _class2.compName = void 0, _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CCVMParentComp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './VMParent.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, VMParent;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      VMParent = module.default;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "5908aTmM1lItpXgo7ROpQeQ", "CCVMParentComp", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 
       * 支持 MVVM 功能的游戏显示对象组件
       * 
       * 使用方法：
       * 1. 对象拥有 cc.Component 组件功能与 ecs.Comp 组件功能
       * 2. 对象自带全局事件监听、释放、发送全局消息功能
       * 3. 对象管理的所有节点摊平，直接通过节点名获取cc.Node对象（节点名不能有重名）
       * 4. 对象支持 VMParent 所有功能
       * 
       * 应用场景
       * 1. 网络游戏，优先有数据对象，然后创建视图对象，当释放视图组件时，部分场景不希望释放数据对象
       * 
       * @example
      @ccclass('LoadingViewComp')
      @ecs.register('LoadingView', false)
      export class LoadingViewComp extends CCVMParentComp {
          // VM 组件绑定数据
          data: any = {
              // 加载资源当前进度
              finished: 0,
              // 加载资源最大进度
              total: 0,
              // 加载资源进度比例值
              progress: "0",
              // 加载流程中提示文本
              prompt: ""
          };
            private progress: number = 0;
            reset(): void {
            
          }
      }
       */

      var CCVMParentComp = exports('CCVMParentComp', (_dec = ccclass('CCVMParentComp'), _dec(_class = (_class2 = /*#__PURE__*/function (_VMParent) {
        _inheritsLoose(CCVMParentComp, _VMParent);

        function CCVMParentComp() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _VMParent.call.apply(_VMParent, [this].concat(args)) || this;
          _this.canRecycle = void 0;
          _this.ent = void 0;
          return _this;
        }

        return CCVMParentComp;
      }(VMParent), _class2.tid = -1, _class2.compName = void 0, _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/claim_pet.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "cdad6Y823dE14JCxcGtGcq1", "claim_pet", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var claim = exports('claim', (_dec = ccclass('claim'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(claim, _Component);

        function claim() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = claim.prototype;

        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));

          function start() {
            return _start.apply(this, arguments);
          }

          return start;
        }();

        _proto.formatData = function formatData(data) {
          var formattedData = [];
          data.forEach(function (_ref) {
            var values = _ref[0],
                format = _ref[1];
            var formattedValue;

            if (format === '0x1::string::String') {
              formattedValue = values.map(function (num) {
                return String.fromCharCode(num);
              }).join('');
            } else if (format === 'bool') {
              formattedValue = values[0] !== 0 ? 'true' : 'false';
            } else if (format === 'u64') {
              var u64Value = new DataView(new ArrayBuffer(8));
              values.forEach(function (num, index) {
                return u64Value.setUint8(index, num);
              });
              formattedValue = u64Value.getBigUint64(0).toString();
            } else {
              formattedValue = 'Unknown Format';
            }

            formattedData.push(formattedValue);
          });
          return formattedData.join('\n');
        };

        _proto.get_metadata = /*#__PURE__*/function () {
          var _get_metadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var obelisk, network, packageId, metadata, obelisk_sdk, tx, params, res1, input, formattedOutput;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  // @ts-ignore
                  obelisk = window.obelisk;
                  network = 'testnet';
                  packageId = '0x6afbf113a5872b781a2a0068b95c0d9d0ee89428518fdd65f862c841eab45b82';
                  _context2.next = 5;
                  return obelisk.getMetadata(network, packageId);

                case 5:
                  metadata = _context2.sent;
                  obelisk_sdk = new obelisk.Obelisk({
                    networkType: network,
                    packageId: packageId,
                    metadata: metadata // secretKey: privkey

                  });
                  console.log(obelisk_sdk);
                  tx = new obelisk.TransactionBlock();
                  params = [tx.pure('0x6fa43c68221960f942572905f3c198a5bccaa0700506b3b6bd83dd9b007e6324'), tx.pure('0xbf64721f0961a0426ccde6b8d9343e2cb2c26a105a5c33e57074580fd98b2cb1'), tx.pure('0x6')];
                  _context2.next = 12;
                  return obelisk_sdk.query.pet_system.get_pet_basic_info(tx, params);

                case 12:
                  res1 = _context2.sent;
                  input = res1.results[0].returnValues;
                  formattedOutput = this.formatData(input);
                  console.log(formattedOutput);
                // director.loadScene('home');

                case 16:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));

          function get_metadata() {
            return _get_metadata.apply(this, arguments);
          }

          return get_metadata;
        }();

        _proto.update = function update(deltaTime) {};

        return claim;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/claim.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "f9dc3SoyepDy71WdMFLdwOh", "claim", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var claim = exports('claim', (_dec = ccclass('claim'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(claim, _Component);

        function claim() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = claim.prototype;

        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));

          function start() {
            return _start.apply(this, arguments);
          }

          return start;
        }();

        _proto.formatData = function formatData(data) {
          var formattedData = [];
          data.forEach(function (_ref) {
            var values = _ref[0],
                format = _ref[1];
            var formattedValue;

            if (format === '0x1::string::String') {
              formattedValue = values.map(function (num) {
                return String.fromCharCode(num);
              }).join('');
            } else if (format === 'bool') {
              formattedValue = values[0] !== 0 ? 'true' : 'false';
            } else if (format === 'u64') {
              var u64Value = new DataView(new ArrayBuffer(8));
              values.forEach(function (num, index) {
                return u64Value.setUint8(index, num);
              });
              formattedValue = u64Value.getBigUint64(0).toString();
            } else {
              formattedValue = 'Unknown Format';
            }

            formattedData.push(formattedValue);
          });
          return formattedData.join('\n');
        };

        _proto.get_metadata = /*#__PURE__*/function () {
          var _get_metadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var obelisk, network, packageId, metadata, obelisk_sdk, tx, params, res1, input, formattedOutput;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  // @ts-ignore
                  obelisk = window.obelisk;
                  network = 'testnet';
                  packageId = '0x6afbf113a5872b781a2a0068b95c0d9d0ee89428518fdd65f862c841eab45b82';
                  _context2.next = 5;
                  return obelisk.getMetadata(network, packageId);

                case 5:
                  metadata = _context2.sent;
                  obelisk_sdk = new obelisk.Obelisk({
                    networkType: network,
                    packageId: packageId,
                    metadata: metadata // secretKey: privkey

                  });
                  console.log(obelisk_sdk);
                  tx = new obelisk.TransactionBlock();
                  params = [tx.pure('0x6fa43c68221960f942572905f3c198a5bccaa0700506b3b6bd83dd9b007e6324'), tx.pure('0xbf64721f0961a0426ccde6b8d9343e2cb2c26a105a5c33e57074580fd98b2cb1'), tx.pure('0x6')];
                  _context2.next = 12;
                  return obelisk_sdk.query.pet_system.get_pet_basic_info(tx, params);

                case 12:
                  res1 = _context2.sent;
                  input = res1.results[0].returnValues;
                  formattedOutput = this.formatData(input);
                  console.log(formattedOutput);
                // director.loadScene('home');

                case 16:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));

          function get_metadata() {
            return _get_metadata.apply(this, arguments);
          }

          return get_metadata;
        }();

        _proto.update = function update(deltaTime) {};

        return claim;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Collection.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _createClass, _wrapNativeSuper, cclegacy;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _wrapNativeSuper = module.wrapNativeSuper;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1dcf5AtQQVK3KQ/2jHHD5gi", "Collection", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-07-22 15:54:51
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-22 14:47:59
       */

      /** 支持Map与Array功能的集合对象 */


      var Collection = exports('Collection', /*#__PURE__*/function (_Map) {
        _inheritsLoose(Collection, _Map);

        function Collection() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Map.call.apply(_Map, [this].concat(args)) || this;
          _this._array = [];
          return _this;
        }

        var _proto = Collection.prototype;
        /**
         * 设置值
         * @param key       关键字
         * @param value     数据值
         */

        _proto.set = function set(key, value) {
          if (this.has(key)) {
            var old = this.get(key);

            var index = this._array.indexOf(old);

            this._array[index] = value;
          } else {
            this._array.push(value);
          }

          return _Map.prototype.set.call(this, key, value);
        }
        /**
         * 删除值
         * @param key       关键字
         */
        ;

        _proto["delete"] = function _delete(key) {
          var value = this.get(key);

          if (value) {
            var index = this._array.indexOf(value);

            if (index > -1) this._array.splice(index, 1);
            return _Map.prototype["delete"].call(this, key);
          }

          return false;
        };

        _proto.clear = function clear() {
          this._array.splice(0, this._array.length);

          _Map.prototype.clear.call(this);
        };

        _createClass(Collection, [{
          key: "array",
          get:
          /** 获取数组对象 */
          function get() {
            return this._array;
          }
        }]);

        return Collection;
      }( /*#__PURE__*/_wrapNativeSuper(Map)));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CommonPrompt.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LanguageLabel.ts', './Oops.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Component, LanguageLabel, oops;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      LanguageLabel = module.LanguageLabel;
    }, function (module) {
      oops = module.oops;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "653bf8VPC5Fn49zFJFqXVgx", "CommonPrompt", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 公共提示窗口 */

      var CommonPrompt = exports('CommonPrompt', (_dec = ccclass("CommonPrompt"), _dec2 = property(LanguageLabel), _dec3 = property(LanguageLabel), _dec4 = property(LanguageLabel), _dec5 = property(LanguageLabel), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CommonPrompt, _Component);

        function CommonPrompt() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 窗口标题多语言组件 */

          _initializerDefineProperty(_this, "lab_title", _descriptor, _assertThisInitialized(_this));
          /** 提示内容多语言组件 */


          _initializerDefineProperty(_this, "lab_content", _descriptor2, _assertThisInitialized(_this));
          /** 确认按钮文本多语言组件 */


          _initializerDefineProperty(_this, "lab_ok", _descriptor3, _assertThisInitialized(_this));
          /** 取消按钮文本多语言组件 */


          _initializerDefineProperty(_this, "lab_cancel", _descriptor4, _assertThisInitialized(_this));

          _this.config = {};
          return _this;
        }

        var _proto = CommonPrompt.prototype;

        _proto.onTouchEnd = function onTouchEnd(event, data) {
          switch (event.target.name) {
            case "btn_ok":
              this.onOk();
              break;

            case "btn_cancel":
              this.onCancel();
              break;
          }
        }
        /**
         * 
         * 
         * @param params 参数 
         * {
         *     title:      标题
         *     content:    内容
         *     okWord:     ok按钮上的文字
         *     okFunc:     确认时执行的方法
         *     cancelWord: 取消按钮的文字
         *     cancelFunc: 取消时执行的方法
         *     needCancel: 是否需要取消按钮
         * }
         */
        ;

        _proto.onAdded = function onAdded(params) {
          if (params === void 0) {
            params = {};
          }

          this.config = params || {};
          this.setTitle();
          this.setContent();
          this.setBtnOkLabel();
          this.setBtnCancelLabel();
          this.node.active = true;
        };

        _proto.setTitle = function setTitle() {
          this.lab_title.dataID = this.config.title;
        };

        _proto.setContent = function setContent() {
          this.lab_content.dataID = this.config.content;
        };

        _proto.setBtnOkLabel = function setBtnOkLabel() {
          this.lab_ok.dataID = this.config.okWord;
        };

        _proto.setBtnCancelLabel = function setBtnCancelLabel() {
          this.lab_cancel.dataID = this.config.cancelWord;
          this.lab_cancel.node.parent.active = this.config.needCancel || false;
        };

        _proto.onOk = function onOk() {
          if (typeof this.config.okFunc == "function") {
            this.config.okFunc();
          }

          this.close();
        };

        _proto.onClose = function onClose() {
          if (typeof this.config.closeFunc == "function") {
            this.config.closeFunc();
          }

          this.close();
        };

        _proto.onCancel = function onCancel() {
          if (typeof this.config.cancelFunc == "function") {
            this.config.cancelFunc();
          }

          this.close();
        };

        _proto.close = function close() {
          oops.gui.removeByNode(this.node);
        };

        _proto.onDestroy = function onDestroy() {
          this.config = null;
        };

        return CommonPrompt;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lab_title", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lab_content", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lab_ok", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lab_cancel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Config.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5034dEezo5Frr6dhZGVgmTh", "Config", undefined);
      /*
       * @Author: dgflash
       * @Date: 2021-07-03 16:13:17
       * @LastEditors: dgflash
       * @LastEditTime: 2022-11-01 15:47:16
       */

      /** 游戏配置静态访问类 */


      var Config = exports('Config', function Config() {
        /** 环境常量 */
        this.btc = void 0;
        /** 游戏配置数据，版本号、支持语种等数据 */

        this.game = void 0;
        /** 浏览器查询参数 */

        this.query = void 0;
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Decorator.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BehaviorTree.ts', './BTreeNode.ts'], function (exports) {
  var _inheritsLoose, cclegacy, BehaviorTree, BTreeNode;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BehaviorTree = module.BehaviorTree;
    }, function (module) {
      BTreeNode = module.BTreeNode;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0455agxsbxHlYleJPDpJX3l", "Decorator", undefined);
      /** 
       * 装饰器是条件语句只能附加在其他节点上并且定义所附加的节点是否执行 
       * 如果装饰器是true 它所在的子树会被执行，如果是false 所在的子树不会被执行
       */


      var Decorator = exports('Decorator', /*#__PURE__*/function (_BTreeNode) {
        _inheritsLoose(Decorator, _BTreeNode);

        function Decorator(node) {
          var _this;

          _this = _BTreeNode.call(this) || this;
          _this.node = void 0;
          if (node) _this.node = BehaviorTree.getNode(node);
          return _this;
        }

        var _proto = Decorator.prototype;

        _proto.setNode = function setNode(node) {
          this.node = BehaviorTree.getNode(node);
        };

        _proto.start = function start() {
          this.node.setControl(this);
          this.node.start();

          _BTreeNode.prototype.start.call(this);
        };

        _proto.end = function end() {
          this.node.end();
        };

        _proto.run = function run(blackboard) {
          this.node.run(blackboard);
        };

        return Decorator;
      }(BTreeNode));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Defines.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "82d3a9c71JEkI95d3qscHm8", "Defines", undefined);
      /*
       * @Author: dgflash
       * @Date: 2021-11-18 11:21:32
       * @LastEditors: dgflash
       * @LastEditTime: 2023-01-09 11:52:38
       */

      /*** 界面回调参数对象定义 */

      /** 弹框层回调对象定义 */

      /** 本类型仅供gui模块内部使用，请勿在功能逻辑中使用 */


      var ViewParams = exports('ViewParams', function ViewParams() {
        /** 界面唯一标识 */
        this.uuid = null;
        /** 预制路径 */

        this.prefabPath = null;
        /** 传递给打开界面的参数 */

        this.params = null;
        /** 窗口事件 */

        this.callbacks = null;
        /** 是否在使用状态 */

        this.valid = true;
        /** 界面根节点 */

        this.node = null;
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DelegateComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component, oops;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      oops = module.oops;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "d8f1fGRD7dBzIeBSkOpd/Py", "DelegateComponent", undefined);

      var ccclass = _decorator.ccclass;
      /** 窗口事件触发组件 */

      var DelegateComponent = exports('DelegateComponent', (_dec = ccclass('DelegateComponent'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DelegateComponent, _Component);

        function DelegateComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 视图参数 */

          _this.viewParams = null;
          return _this;
        }

        var _proto = DelegateComponent.prototype;
        /** 窗口添加 */

        _proto.add = function add() {
          // 触发窗口组件上添加到父节点后的事件
          this.applyComponentsFunction(this.node, "onAdded", this.viewParams.params);

          if (typeof this.viewParams.callbacks.onAdded === "function") {
            this.viewParams.callbacks.onAdded(this.node, this.viewParams.params);
          }
        }
        /** 删除节点，该方法只能调用一次，将会触发onBeforeRemoved回调 */
        ;

        _proto.remove = function remove(isDestroy) {
          var _this2 = this;

          if (this.viewParams.valid) {
            // 触发窗口组件上移除之前的事件
            this.applyComponentsFunction(this.node, "onBeforeRemove", this.viewParams.params); //  通知外部对象窗口组件上移除之前的事件（关闭窗口前的关闭动画处理）

            if (typeof this.viewParams.callbacks.onBeforeRemove === "function") {
              this.viewParams.callbacks.onBeforeRemove(this.node, function () {
                _this2.removed(_this2.viewParams, isDestroy);
              });
            } else {
              this.removed(this.viewParams, isDestroy);
            }
          }
        }
        /** 窗口组件中触发移除事件与释放窗口对象 */
        ;

        _proto.removed = function removed(viewParams, isDestroy) {
          viewParams.valid = false;

          if (typeof viewParams.callbacks.onRemoved === "function") {
            viewParams.callbacks.onRemoved(this.node, viewParams.params);
          }

          if (isDestroy) {
            this.node.destroy(); // 释放界面相关资源

            oops.res.release(viewParams.prefabPath);
          } else {
            this.node.removeFromParent();
          }
        };

        _proto.onDestroy = function onDestroy() {
          // 触发窗口组件上窗口移除之后的事件
          this.applyComponentsFunction(this.node, "onRemoved", this.viewParams.params); // 通知外部对象窗口移除之后的事件
          // if (typeof this.viewParams.callbacks!.onRemoved === "function") {
          //     this.viewParams.callbacks!.onRemoved(this.node, this.viewParams.params);
          // }

          this.viewParams = null;
        };

        _proto.applyComponentsFunction = function applyComponentsFunction(node, funName, params) {
          for (var i = 0; i < node.components.length; i++) {
            var component = node.components[i];
            var func = component[funName];

            if (func) {
              func.call(component, params);
            }
          }
        };

        return DelegateComponent;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DrawMeshSector.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Material, MeshRenderer, macro, Vec3, gfx, utils, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Material = module.Material;
      MeshRenderer = module.MeshRenderer;
      macro = module.macro;
      Vec3 = module.Vec3;
      gfx = module.gfx;
      utils = module.utils;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "ea0c13ef6VL451GZLWgDtle", "DrawMeshSector", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 绘制扇形网格 */

      var DrawMeshSector = exports('DrawMeshSector', (_dec = ccclass('DrawSectorMesh'), _dec2 = property({
        type: Material
      }), _dec3 = property({
        tooltip: "外圈半径"
      }), _dec4 = property({
        tooltip: "内圈半径"
      }), _dec5 = property({
        tooltip: "扇形角度"
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DrawMeshSector, _Component);

        function DrawMeshSector() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "mat", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "radius", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "innerRadius", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "angledegree", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = DrawMeshSector.prototype;

        _proto.start = function start() {
          this.createMesh();
        };

        _proto.createMesh = function createMesh() {
          var model = this.addComponent(MeshRenderer);
          var segments = Math.floor(this.angledegree / 4) + 1; // 三角形个数（平滑度）

          var positions = []; // 顶点位置数据
          // 组装顶点数据

          var vertices_count = segments * 2 + 2; // vertices(顶点)的个数与triangles（索引三角形顶点数）匹配

          var vertices = new Array(vertices_count);
          var angleRad = this.angledegree * macro.RAD; // 角度转弧度

          var angleCur = angleRad;
          var angledelta = angleRad / segments; // 每个三角形的弧度

          for (var i = 0; i < vertices_count; i += 2) {
            // 扇形每二个三角形之间共用2个顶点，所有生成时每次循环生成二个顶点
            var cosA = Math.cos(angleCur);
            var sinA = Math.sin(angleCur);
            vertices[i] = new Vec3(this.radius * cosA, 0, this.radius * sinA); // 已知扇形外圈半径为斜边求x、z值，得到第一个顶点位置（外圈半径顶点）

            vertices[i + 1] = new Vec3(this.innerRadius * cosA, 0, this.innerRadius * sinA); // 已知扇形内圈半径为斜边求x、z值，得到第二个顶点位置（内圈半径顶点）

            angleCur -= angledelta;
            positions.push(vertices[i].x);
            positions.push(vertices[i].y);
            positions.push(vertices[i].z);
            positions.push(vertices[i + 1].x);
            positions.push(vertices[i + 1].y);
            positions.push(vertices[i + 1].z);
          } // 组装三角形数据


          var indice_count = segments * 6; // 扇形外圈与扇形内圈会生成一个四边形，即二个三角形，6个顶点索引

          var indices = new Array(indice_count);

          for (var i = 0, vi = 0; i < indice_count; i += 6, vi += 2) {
            // i为三角形顶点索引号，vi为顶点位置索引
            indices[i] = vi;
            indices[i + 1] = vi + 3;
            indices[i + 2] = vi + 1;
            indices[i + 3] = vi + 2;
            indices[i + 4] = vi + 3;
            indices[i + 5] = vi;
          } // 组装UV数据


          var uvs = [];

          for (var i = 0; i < vertices_count; i++) {
            var u = vertices[i].x / this.radius / 2 + 0.5;
            var v = vertices[i].z / this.radius / 2 + 0.5;
            uvs.push(u, v);
          }

          var primitiveMode = gfx.PrimitiveMode.TRIANGLE_FAN;
          var attributes = [{
            name: gfx.AttributeName.ATTR_NORMAL,
            format: gfx.Format.RGB32F
          }];
          var IGeometry = {
            positions: positions,
            indices: indices,
            uvs: uvs,
            primitiveMode: primitiveMode,
            // 默认值效果一样，需要研究作用
            attributes: attributes // 默认值效果一样，需要研究作用

          };
          var mesh = utils.createMesh(IGeometry);
          model.mesh = mesh;
          model.material = this.mat;
        };

        return DrawMeshSector;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mat", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "radius", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "innerRadius", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "angledegree", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ECS.ts", ['cc', './ECSComp.ts', './ECSEntity.ts', './ECSMatcher.ts', './ECSModel.ts', './ECSSystem.ts'], function (exports) {
  var cclegacy, ECSComp, ECSEntity, ECSMatcher, ECSModel, ECSSystem, ECSRootSystem, ECSComblockSystem;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ECSComp = module.ECSComp;
    }, function (module) {
      ECSEntity = module.ECSEntity;
    }, function (module) {
      ECSMatcher = module.ECSMatcher;
    }, function (module) {
      ECSModel = module.ECSModel;
    }, function (module) {
      ECSSystem = module.ECSSystem;
      ECSRootSystem = module.ECSRootSystem;
      ECSComblockSystem = module.ECSComblockSystem;
    }],
    execute: function () {
      exports('ecs', void 0);

      cclegacy._RF.push({}, "be87fT76plLkaUKEYpkuV0n", "ECS", undefined);
      /** Entity-Component-System（实体-组件-系统）框架 */


      var ecs;

      (function (_ecs) {
        /** 实体 - 一个概念上的定义，指的是游戏世界中的一个独特物体，是一系列组件的集合 */

        /** 组件 - 一堆数据的集合，即不存在任何的行为，只用来存储状态 */

        /** 系统 - 关注实体上组件数据变化，处理游戏逻辑 */

        /** 根系统 - 驱动游戏中所有系统工作 */

        /** 处理游戏逻辑系统对象 - 继承此对象实现自定义业务逻辑 */

        /** 实体 - 一个概念上的定义，指的是游戏世界中的一个独特物体，是一系列组件的集合 */
        var Entity = _ecs.Entity = ECSEntity;
        var Comp = _ecs.Comp = ECSComp;
        var System = _ecs.System = ECSSystem;
        var RootSystem = _ecs.RootSystem = ECSRootSystem;
        var ComblockSystem = _ecs.ComblockSystem = ECSComblockSystem; //#region 接口

        /** 组件接口 */

        /** 实体匹配器接口 */

        /**
         * 监听组件首次添加到实体上时，在ComblockSystem上实现这个接口
         * 1. entityEnter会在update方法之前执行，实体进入后，不会再次进入entityEnter方法中
         * 2. 当实体从当前System移除，下次再次符合条件进入System也会执行上述流程
         * @example
        export class RoleUpgradeSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
            filter(): ecs.IMatcher {
                return ecs.allOf(RoleUpgradeComp, RoleModelLevelComp);
            }
              entityEnter(e: Role): void {
                e.remove(RoleUpgradeComp);
            }
        }
         */

        /** 监听组件从实体上移除时，在ComblockSystem上实现这个接口 */

        /** 监听系统第一次执行update处理实体时，在ComblockSystem上实现这个接口 */

        /** 监听系统执行update处理实体时，在ComblockSystem上实现这个接口 */
        //#endregion

        /**
         * 注册组件到ecs系统中
         * @param name   由于js打包会改变类名，所以这里必须手动传入组件的名称
         * @param canNew 标识是否可以new对象。想继承自Cocos Creator的组件就不能去new，需要写成@ecs.register('name', false)
         * @example
        // 注册实体
        @ecs.register('Role')
        export class Role extends ecs.Entity {
          }
          // 注册数据组件
        @ecs.register('RoleModel')
        export class RoleModelComp extends ecs.Comp {
            id: number = -1;
              reset() {
                this.id =  -1;
            }
        }
          // 注册显示对象组件
        @ccclass('RoleViewComp')
        @ecs.register('RoleView', false)
        export class RoleViewComp extends CCComp {
            @property({ type: sp.Skeleton, tooltip: '角色动画' })
            spine: sp.Skeleton = null!;
              onLoad(){
                
            }
        }
         */

        function register(name, canNew) {
          if (canNew === void 0) {
            canNew = true;
          }

          return function (ctor) {
            // 注册实体
            if (ctor.tid == undefined) {
              ECSModel.entityCtors.set(ctor, name);
            } // 注册组件
            else {
                if (ctor.tid === -1) {
                  ctor.tid = ECSModel.compTid++;
                  ctor.compName = name;

                  if (canNew) {
                    ECSModel.compCtors.push(ctor);
                    ECSModel.compPools.set(ctor.tid, []);
                  } else {
                    ECSModel.compCtors.push(null);
                  }

                  ECSModel.compAddOrRemove.set(ctor.tid, []);
                } else {
                  throw new Error("\u91CD\u590D\u6CE8\u518C\u7EC4\u4EF6\uFF1A " + name + ".");
                }
              }
          };
        }

        _ecs.register = register;

        function getEntity(ctor) {
          // 获取实体对象名
          var entityName = ECSModel.entityCtors.get(ctor);
          if (entityName == undefined) console.error(ctor.name + " \u5B9E\u4F53\u6CA1\u6709\u6CE8\u518C"); // 获取实体对象池

          var entitys = ECSModel.entityPool.get(entityName) || [];
          var entity = entitys.pop(); // 缓存中没有同类实体，则创建一个新的

          if (!entity) {
            entity = new ctor();
            entity.eid = ECSModel.eid++; // 实体唯一编号

            entity.name = entityName;
          } // 触发实体初始化逻辑


          if (entity.init) entity.init();else console.error(ctor.name + " \u5B9E\u4F53\u7F3A\u5C11 init \u65B9\u6CD5\u521D\u59CB\u5316\u9ED8\u8BA4\u7EC4\u4EF6");
          ECSModel.eid2Entity.set(entity.eid, entity);
          return entity;
        }

        _ecs.getEntity = getEntity;

        function query(matcher) {
          var group = ECSModel.groups.get(matcher.mid);

          if (!group) {
            group = ECSModel.createGroup(matcher);
            ECSModel.eid2Entity.forEach(group.onComponentAddOrRemove, group);
          }

          return group.matchEntities;
        }

        _ecs.query = query;

        function clear() {
          ECSModel.eid2Entity.forEach(function (entity) {
            entity.destroy();
          });
          ECSModel.groups.forEach(function (group) {
            group.clear();
          });
          ECSModel.compAddOrRemove.forEach(function (callbackLst) {
            callbackLst.length = 0;
          });
          ECSModel.eid2Entity.clear();
          ECSModel.groups.clear();
        }

        _ecs.clear = clear;

        function getEntityByEid(eid) {
          return ECSModel.eid2Entity.get(eid);
        }

        _ecs.getEntityByEid = getEntityByEid;

        function activeEntityCount() {
          return ECSModel.eid2Entity.size;
        }

        _ecs.activeEntityCount = activeEntityCount;
        /** 创建实体 */

        function createEntity() {
          var entity = new Entity();
          entity.eid = ECSModel.eid++; // 实体id也是有限的资源

          ECSModel.eid2Entity.set(entity.eid, entity);
          return entity;
        }
        /**
         * 指定一个组件创建实体，返回组件对象。
         * @param ctor 
         */


        function createEntityWithComp(ctor) {
          var entity = createEntity();
          return entity.add(ctor);
        } //#region 过滤器

        /**
         * 表示只关心这些组件的添加和删除动作。虽然实体可能有这些组件之外的组件，但是它们的添加和删除没有被关注，所以不会存在对关注之外的组件
         * 进行添加操作引发Group重复添加实体。
         * @param args 
         * @example
         * ecs.allOf(AComponent, BComponent, CComponent);
         */


        function allOf() {
          var _ECSMatcher;

          return (_ECSMatcher = new ECSMatcher()).allOf.apply(_ECSMatcher, arguments);
        }

        _ecs.allOf = allOf;

        function anyOf() {
          var _ECSMatcher2;

          return (_ECSMatcher2 = new ECSMatcher()).anyOf.apply(_ECSMatcher2, arguments);
        }

        _ecs.anyOf = anyOf;

        function onlyOf() {
          var _ECSMatcher3;

          return (_ECSMatcher3 = new ECSMatcher()).onlyOf.apply(_ECSMatcher3, arguments);
        }

        _ecs.onlyOf = onlyOf;

        function excludeOf() {
          var _ECSMatcher4;

          return (_ECSMatcher4 = new ECSMatcher()).excludeOf.apply(_ECSMatcher4, arguments);
        }

        _ecs.excludeOf = excludeOf;

        function getSingleton(ctor) {
          if (!ECSModel.tid2comp.has(ctor.tid)) {
            var comp = createEntityWithComp(ctor);
            ECSModel.tid2comp.set(ctor.tid, comp);
          }

          return ECSModel.tid2comp.get(ctor.tid);
        }

        _ecs.getSingleton = getSingleton;

        function addSingleton(obj) {
          var tid = obj.constructor.tid;

          if (!ECSModel.tid2comp.has(tid)) {
            ECSModel.tid2comp.set(tid, obj);
          }
        }

        _ecs.addSingleton = addSingleton;
      })(ecs || (ecs = exports('ecs', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ECSComp.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3d017ZhAZRH4bPfpLr5++8F", "ECSComp", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-09-01 18:00:28
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-05 14:03:54
       */

      /** 
       * 组件抽象类
       * 注：建议组件里面只放数据可能在实际写代码会碰到一些比较麻烦的问题，如果是单纯对组件内的数据操作可以在组件里面写方法
       */


      var ECSComp = exports('ECSComp', function ECSComp() {
        /** 拥有该组件的实体 */
        this.ent = void 0;
        /**
         * 是否可回收组件对象，默认情况下都是可回收的
         * 注：如果该组件对象是由ecs系统外部创建的，则不可回收，需要用户自己手动进行回收
         */

        this.canRecycle = true;
      });
      /** 组件的类型编号，-1表示未给该组件分配编号 */

      ECSComp.tid = -1;
      /** 组件名 */

      ECSComp.compName = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ECSEntity.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ECSMask.ts', './ECSModel.ts'], function (exports) {
  var _createClass, cclegacy, ECSMask, ECSModel;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ECSMask = module.ECSMask;
    }, function (module) {
      ECSModel = module.ECSModel;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1fb62WC3PZPvLhjoZQfrREJ", "ECSEntity", undefined); //#region 辅助方法

      /**
       * 实体身上组件有增删操作，广播通知对应的观察者
       * @param entity 实体对象
       * @param componentTypeId 组件类型id
       */


      function broadcastCompAddOrRemove(entity, componentTypeId) {
        var events = ECSModel.compAddOrRemove.get(componentTypeId);

        for (var i = events.length - 1; i >= 0; i--) {
          events[i](entity);
        } // 判断是不是删了单例组件


        if (ECSModel.tid2comp.has(componentTypeId)) {
          ECSModel.tid2comp["delete"](componentTypeId);
        }
      }
      /**
       * 创建组件对象
       * @param ctor
       */


      function createComp(ctor) {
        var cct = ECSModel.compCtors[ctor.tid];

        if (!cct) {
          throw Error("\u6CA1\u6709\u627E\u5230\u8BE5\u7EC4\u4EF6\u7684\u6784\u9020\u51FD\u6570\uFF0C\u68C0\u67E5" + ctor.compName + "\u662F\u5426\u4E3A\u4E0D\u53EF\u6784\u9020\u7684\u7EC4\u4EF6");
        }

        var comps = ECSModel.compPools.get(ctor.tid);
        var component = comps.pop() || new cct();
        return component;
      }
      /**
       * 销毁实体
       * 
       * 缓存销毁的实体，下次新建实体时会优先从缓存中拿。
       * @param entity 
       */


      function destroyEntity(entity) {
        if (ECSModel.eid2Entity.has(entity.eid)) {
          var entitys = ECSModel.entityPool.get(entity.name);

          if (entitys == null) {
            entitys = [];
            ECSModel.entityPool.set(entity.name, entitys);
          }

          entitys.push(entity);
          ECSModel.eid2Entity["delete"](entity.eid);
        } else {
          console.warn('试图销毁不存在的实体');
        }
      } //#endregion

      /** ECS实体对象 */


      var ECSEntity = exports('ECSEntity', /*#__PURE__*/function () {
        function ECSEntity() {
          /** 实体唯一标识，不要手动修改 */
          this.eid = -1;
          /** 实体对象名 */

          this.name = "";
          /** 组件过滤数据 */

          this.mask = new ECSMask();
          /** 当前实体身上附加的组件构造函数 */

          this.compTid2Ctor = new Map();
          /** 配合 entity.remove(Comp, false)， 记录组件实例上的缓存数据，在添加时恢复原数据 */

          this.compTid2Obj = new Map();
          this._parent = null;
          this._children = null;
        }

        var _proto = ECSEntity.prototype;
        /**
         * 添加子实体
         * @param entity 被添加的实体对象
         */

        _proto.addChild = function addChild(entity) {
          entity._parent = this;
          this.children.set(entity.eid, entity);
        }
        /**
         * 移除子实体
         * @param entity 被移除的实体对象
         * @returns 
         */
        ;

        _proto.removeChild = function removeChild(entity) {
          if (this.children == null) return;
          this.children["delete"](entity.eid);

          if (this.children.size == 0) {
            this._children = null;
          }
        }
        /**
         * 根据组件类动态创建组件，并通知关心的系统。如果实体存在了这个组件，那么会先删除之前的组件然后添加新的
         * 
         * 注意：不要直接new Component，new来的Component不会从Component的缓存池拿缓存的数据
         * @param componentTypeId   组件类
         * @param isReAdd           true-表示用户指定这个实体可能已经存在了该组件，那么再次add组件的时候会先移除该组件然后再添加一遍。false-表示不重复添加组件
         */
        ;

        _proto.add = function add(ctor, isReAdd) {
          if (isReAdd === void 0) {
            isReAdd = false;
          }

          if (typeof ctor === 'function') {
            var compTid = ctor.tid;

            if (ctor.tid === -1) {
              throw Error('组件未注册！');
            }

            if (this.compTid2Ctor.has(compTid)) {
              // 判断是否有该组件，如果有则先移除
              if (isReAdd) {
                this.remove(ctor);
              } else {
                console.log("\u5DF2\u7ECF\u5B58\u5728\u7EC4\u4EF6\uFF1A" + ctor.compName); // @ts-ignore

                return this[ctor.compName];
              }
            }

            this.mask.set(compTid);
            var comp;

            if (this.compTid2Obj.has(compTid)) {
              comp = this.compTid2Obj.get(compTid);
              this.compTid2Obj["delete"](compTid);
            } else {
              // 创建组件对象
              comp = createComp(ctor);
            } // 将组件对象直接附加到实体对象身上，方便直接获取
            // @ts-ignore


            this[ctor.compName] = comp;
            this.compTid2Ctor.set(compTid, ctor);
            comp.ent = this; // 广播实体添加组件的消息

            broadcastCompAddOrRemove(this, compTid);
            return comp;
          } else {
            var tmpCtor = ctor.constructor;
            var _compTid = tmpCtor.tid; // console.assert(compTid !== -1 || !compTid, '组件未注册！');
            // console.assert(this.compTid2Ctor.has(compTid), '已存在该组件！');

            if (_compTid === -1 || _compTid == null) {
              throw Error('组件未注册');
            }

            if (this.compTid2Ctor.has(_compTid)) {
              throw Error('已经存在该组件');
            }

            this.mask.set(_compTid); //@ts-ignore

            this[tmpCtor.compName] = ctor;
            this.compTid2Ctor.set(_compTid, tmpCtor); //@ts-ignore

            ctor.ent = this; //@ts-ignore

            ctor.canRecycle = false;
            broadcastCompAddOrRemove(this, _compTid);
            return this;
          }
        }
        /**
         * 批量添加组件
         * @param ctors 组件类
         * @returns 
         */
        ;

        _proto.addComponents = function addComponents() {
          for (var _len = arguments.length, ctors = new Array(_len), _key = 0; _key < _len; _key++) {
            ctors[_key] = arguments[_key];
          }

          for (var _i = 0, _ctors = ctors; _i < _ctors.length; _i++) {
            var _ctor = _ctors[_i];
            this.add(_ctor);
          }

          return this;
        }
        /**
         * 获取一个组件实例
         * @param ctor 组件类
         */
        ;

        _proto.get = function get(ctor) {
          // @ts-ignore
          return this[ctor.compName];
        }
        /**
         * 组件是否在实体存在内
         * @param ctor 组件类
         */
        ;

        _proto.has = function has(ctor) {
          if (typeof ctor == "number") {
            return this.mask.has(ctor);
          } else {
            return this.compTid2Ctor.has(ctor.tid);
          }
        }
        /**
         * 从实体上删除指定组件
         * @param ctor      组件构造函数或者组件Tag
         * @param isRecycle 是否回收该组件对象。对于有些组件上有大量数据，当要描述移除组件但是不想清除组件上的数据是可以
         * 设置该参数为false，这样该组件对象会缓存在实体身上，下次重新添加组件时会将该组件对象添加回来，不会重新从组件缓存
         * 池中拿一个组件来用。
         */
        ;

        _proto.remove = function remove(ctor, isRecycle) {
          if (isRecycle === void 0) {
            isRecycle = true;
          }

          var hasComp = false; //@ts-ignore

          var componentTypeId = ctor.tid; //@ts-ignore

          var compName = ctor.compName;

          if (this.mask.has(componentTypeId)) {
            hasComp = true; //@ts-ignore

            var comp = this[ctor.compName]; //@ts-ignore

            comp.ent = null;

            if (isRecycle) {
              comp.reset();

              if (comp.canRecycle) {
                ECSModel.compPools.get(componentTypeId).push(comp);
              }
            } else {
              this.compTid2Obj.set(componentTypeId, comp);
            }
          }

          if (hasComp) {
            //@ts-ignore
            this[compName] = null;
            this.mask["delete"](componentTypeId);
            this.compTid2Ctor["delete"](componentTypeId);
            broadcastCompAddOrRemove(this, componentTypeId);
          }
        };

        _proto._remove = function _remove(comp) {
          this.remove(comp, false);
        }
        /** 销毁实体，实体会被回收到实体缓存池中 */
        ;

        _proto.destroy = function destroy() {
          var _this = this;

          if (this._children) {
            this._children.forEach(function (e) {
              _this.removeChild(e);

              e.destroy();
            });
          }

          this.compTid2Ctor.forEach(this._remove, this);
          destroyEntity(this);
          this.compTid2Obj.clear();
        };

        _createClass(ECSEntity, [{
          key: "parent",
          get:
          /** 父实体 */
          function get() {
            return this._parent;
          }
        }, {
          key: "children",
          get:
          /** 子实体集合 */
          function get() {
            if (this._children == null) {
              this._children = new Map();
            }

            return this._children;
          }
        }]);

        return ECSEntity;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ECSGroup.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c21a23o9P5FNJamcMmoYWfs", "ECSGroup", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-09-01 18:00:28
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-05 14:21:54
       */


      var ECSGroup = exports('ECSGroup', /*#__PURE__*/function () {
        function ECSGroup(matcher) {
          /** 实体筛选规则 */
          this.matcher = void 0;
          this._matchEntities = new Map();
          this._entitiesCache = null;
          /**
           * 当前group中实体的数量
           * 
           * 注：不要手动修改这个属性值。
           * 注：其实可以通过this._matchEntities.size获得实体数量，但是需要封装get方法。为了减少一次方法的调用所以才直接创建一个count属性
           */

          this.count = 0;
          this._enteredEntities = null;
          this._removedEntities = null;
          this.matcher = matcher;
        }

        var _proto = ECSGroup.prototype;

        _proto.onComponentAddOrRemove = function onComponentAddOrRemove(entity) {
          if (this.matcher.isMatch(entity)) {
            // Group只关心指定组件在实体身上的添加和删除动作。
            this._matchEntities.set(entity.eid, entity);

            this._entitiesCache = null;
            this.count++;

            if (this._enteredEntities) {
              this._enteredEntities.set(entity.eid, entity);

              this._removedEntities["delete"](entity.eid);
            }
          } else if (this._matchEntities.has(entity.eid)) {
            // 如果Group中有这个实体，但是这个实体已经不满足匹配规则，则从Group中移除该实体
            this._matchEntities["delete"](entity.eid);

            this._entitiesCache = null;
            this.count--;

            if (this._enteredEntities) {
              this._enteredEntities["delete"](entity.eid);

              this._removedEntities.set(entity.eid, entity);
            }
          }
        };

        _proto.watchEntityEnterAndRemove = function watchEntityEnterAndRemove(enteredEntities, removedEntities) {
          this._enteredEntities = enteredEntities;
          this._removedEntities = removedEntities;
        };

        _proto.clear = function clear() {
          var _this$_enteredEntitie, _this$_removedEntitie;

          this._matchEntities.clear();

          this._entitiesCache = null;
          this.count = 0;
          (_this$_enteredEntitie = this._enteredEntities) == null ? void 0 : _this$_enteredEntitie.clear();
          (_this$_removedEntitie = this._removedEntities) == null ? void 0 : _this$_removedEntitie.clear();
        };

        _createClass(ECSGroup, [{
          key: "matchEntities",
          get:
          /**
           * 符合规则的实体
           */
          function get() {
            if (this._entitiesCache === null) {
              this._entitiesCache = Array.from(this._matchEntities.values());
            }

            return this._entitiesCache;
          }
        }, {
          key: "entity",
          get:
          /** 获取matchEntities中第一个实体 */
          function get() {
            return this.matchEntities[0];
          }
        }]);

        return ECSGroup;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ECSMask.ts", ['cc', './ECSModel.ts'], function (exports) {
  var cclegacy, ECSModel;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ECSModel = module.ECSModel;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d18694PPbtGs5Ipgo/vaJBX", "ECSMask", undefined);

      var ECSMask = exports('ECSMask', /*#__PURE__*/function () {
        function ECSMask() {
          this.mask = void 0;
          this.size = 0;
          var length = Math.ceil(ECSModel.compTid / 31);
          this.mask = new Uint32Array(length);
          this.size = length;
        }

        var _proto = ECSMask.prototype;

        _proto.set = function set(num) {
          // https://stackoverflow.com/questions/34896909/is-it-correct-to-set-bit-31-in-javascript
          // this.mask[((num / 32) >>> 0)] |= ((1 << (num % 32)) >>> 0);
          this.mask[num / 31 >>> 0] |= 1 << num % 31;
        };

        _proto["delete"] = function _delete(num) {
          this.mask[num / 31 >>> 0] &= ~(1 << num % 31);
        };

        _proto.has = function has(num) {
          return !!(this.mask[num / 31 >>> 0] & 1 << num % 31);
        };

        _proto.or = function or(other) {
          for (var i = 0; i < this.size; i++) {
            // &操作符最大也只能对2^30进行操作，如果对2^31&2^31会得到负数。当然可以(2^31&2^31) >>> 0，这样多了一步右移操作。
            if (this.mask[i] & other.mask[i]) {
              return true;
            }
          }

          return false;
        };

        _proto.and = function and(other) {
          for (var i = 0; i < this.size; i++) {
            if ((this.mask[i] & other.mask[i]) != this.mask[i]) {
              return false;
            }
          }

          return true;
        };

        _proto.clear = function clear() {
          for (var i = 0; i < this.size; i++) {
            this.mask[i] = 0;
          }
        };

        return ECSMask;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ECSMatcher.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ECSMask.ts', './ECSModel.ts'], function (exports) {
  var _construct, _createForOfIteratorHelperLoose, _createClass, _inheritsLoose, cclegacy, ECSMask, ECSModel;

  return {
    setters: [function (module) {
      _construct = module.construct;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ECSMask = module.ECSMask;
    }, function (module) {
      ECSModel = module.ECSModel;
    }],
    execute: function () {
      cclegacy._RF.push({}, "37e8arlqPlN7amZYyHFvBIp", "ECSMatcher", undefined);

      var macherId = 1;
      /**
       * 筛选规则间是“与”的关系
       * 比如：ecs.Macher.allOf(...).excludeOf(...)表达的是allOf && excludeOf，即实体有“这些组件” 并且 “没有这些组件”
       */

      var ECSMatcher = exports('ECSMatcher', /*#__PURE__*/function () {
        function ECSMatcher() {
          this.rules = [];
          this._indices = null;
          this.isMatch = void 0;
          this.mid = -1;
          this._key = null;
          this.mid = macherId++;
        }
        /**
         * 匹配器关注的组件索引。在创建Group时，Context根据组件id去给Group关联组件的添加和移除事件。
         */


        var _proto = ECSMatcher.prototype;
        /**
         * 组件间是或的关系，表示关注拥有任意一个这些组件的实体。
         * @param args 组件索引
         */

        _proto.anyOf = function anyOf() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          this.rules.push(_construct(AnyOf, args));
          this.bindMatchMethod();
          return this;
        }
        /**
         * 组件间是与的关系，表示关注拥有所有这些组件的实体。
         * @param args 组件索引
         */
        ;

        _proto.allOf = function allOf() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          this.rules.push(_construct(AllOf, args));
          this.bindMatchMethod();
          return this;
        }
        /**
         * 表示关注只拥有这些组件的实体
         * 
         * 注意：
         *  不是特殊情况不建议使用onlyOf。因为onlyOf会监听所有组件的添加和删除事件。
         * @param args 组件索引
         */
        ;

        _proto.onlyOf = function onlyOf() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          this.rules.push(_construct(AllOf, args));
          var otherTids = [];

          for (var _iterator = _createForOfIteratorHelperLoose(ECSModel.compCtors), _step; !(_step = _iterator()).done;) {
            var ctor = _step.value;

            if (args.indexOf(ctor) < 0) {
              otherTids.push(ctor);
            }
          }

          this.rules.push(_construct(ExcludeOf, otherTids));
          this.bindMatchMethod();
          return this;
        }
        /**
         * 不包含指定的任意一个组件
         * @param args 
         */
        ;

        _proto.excludeOf = function excludeOf() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          this.rules.push(_construct(ExcludeOf, args));
          this.bindMatchMethod();
          return this;
        };

        _proto.bindMatchMethod = function bindMatchMethod() {
          if (this.rules.length === 1) {
            this.isMatch = this.isMatch1;
          } else if (this.rules.length === 2) {
            this.isMatch = this.isMatch2;
          } else {
            this.isMatch = this.isMatchMore;
          }
        };

        _proto.isMatch1 = function isMatch1(entity) {
          return this.rules[0].isMatch(entity);
        };

        _proto.isMatch2 = function isMatch2(entity) {
          return this.rules[0].isMatch(entity) && this.rules[1].isMatch(entity);
        };

        _proto.isMatchMore = function isMatchMore(entity) {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.rules), _step2; !(_step2 = _iterator2()).done;) {
            var rule = _step2.value;

            if (!rule.isMatch(entity)) {
              return false;
            }
          }

          return true;
        };

        _proto.clone = function clone() {
          var newMatcher = new ECSMatcher();
          newMatcher.mid = macherId++;
          this.rules.forEach(function (rule) {
            return newMatcher.rules.push(rule);
          });
          return newMatcher;
        };

        _createClass(ECSMatcher, [{
          key: "key",
          get: function get() {
            if (!this._key) {
              var s = '';

              for (var i = 0; i < this.rules.length; i++) {
                s += this.rules[i].getKey();

                if (i < this.rules.length - 1) {
                  s += ' && ';
                }
              }

              this._key = s;
            }

            return this._key;
          }
        }, {
          key: "indices",
          get: function get() {
            var _this = this;

            if (this._indices === null) {
              this._indices = [];
              this.rules.forEach(function (rule) {
                Array.prototype.push.apply(_this._indices, rule.indices);
              });
            }

            return this._indices;
          }
        }]);

        return ECSMatcher;
      }());

      var BaseOf = /*#__PURE__*/function () {
        function BaseOf() {
          this.indices = [];
          this.mask = new ECSMask();
          var componentTypeId = -1;

          for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
          }

          var len = args.length;

          for (var i = 0; i < len; i++) {
            if (typeof args[i] === "number") {
              componentTypeId = args[i];
            } else {
              componentTypeId = args[i].tid;
            }

            if (componentTypeId == -1) {
              throw Error('存在没有注册的组件！');
            }

            this.mask.set(componentTypeId);

            if (this.indices.indexOf(componentTypeId) < 0) {
              // 去重
              this.indices.push(componentTypeId);
            }
          }

          if (len > 1) {
            this.indices.sort(function (a, b) {
              return a - b;
            }); // 对组件类型id进行排序，这样关注相同组件的系统就能共用同一个group
          }
        }

        var _proto2 = BaseOf.prototype;

        _proto2.toString = function toString() {
          return this.indices.join('-'); // 生成group的key
        };

        return BaseOf;
      }();
      /**
       * 用于描述包含任意一个这些组件的实体
       */


      var AnyOf = /*#__PURE__*/function (_BaseOf) {
        _inheritsLoose(AnyOf, _BaseOf);

        function AnyOf() {
          return _BaseOf.apply(this, arguments) || this;
        }

        var _proto3 = AnyOf.prototype;

        _proto3.isMatch = function isMatch(entity) {
          // @ts-ignore
          return this.mask.or(entity.mask);
        };

        _proto3.getKey = function getKey() {
          return 'anyOf:' + this.toString();
        };

        return AnyOf;
      }(BaseOf);
      /**
       * 用于描述包含了“这些”组件的实体，这个实体除了包含这些组件还可以包含其他组件
       */


      var AllOf = /*#__PURE__*/function (_BaseOf2) {
        _inheritsLoose(AllOf, _BaseOf2);

        function AllOf() {
          return _BaseOf2.apply(this, arguments) || this;
        }

        var _proto4 = AllOf.prototype;

        _proto4.isMatch = function isMatch(entity) {
          // @ts-ignore
          return this.mask.and(entity.mask);
        };

        _proto4.getKey = function getKey() {
          return 'allOf:' + this.toString();
        };

        return AllOf;
      }(BaseOf);
      /**
       * 不包含指定的任意一个组件
       */


      var ExcludeOf = /*#__PURE__*/function (_BaseOf3) {
        _inheritsLoose(ExcludeOf, _BaseOf3);

        function ExcludeOf() {
          return _BaseOf3.apply(this, arguments) || this;
        }

        var _proto5 = ExcludeOf.prototype;

        _proto5.getKey = function getKey() {
          return 'excludeOf:' + this.toString();
        };

        _proto5.isMatch = function isMatch(entity) {
          // @ts-ignore
          return !this.mask.or(entity.mask);
        };

        return ExcludeOf;
      }(BaseOf);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ECSModel.ts", ['cc', './ECSGroup.ts'], function (exports) {
  var cclegacy, ECSGroup;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ECSGroup = module.ECSGroup;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1d60egM6r9Gta4Op3VABSGM", "ECSModel", undefined);
      /** 组件类型 */

      /** 实体构造器接口 */

      /** 组件构造器接口 */

      /** ECS框架内部数据 */


      var ECSModel = exports('ECSModel', /*#__PURE__*/function () {
        function ECSModel() {}
        /**
         * 创建group，每个group只关心对应组件的添加和删除
         * @param matcher 实体筛选器
         */


        ECSModel.createGroup = function createGroup(matcher) {
          var group = ECSModel.groups.get(matcher.mid);

          if (!group) {
            group = new ECSGroup(matcher);
            ECSModel.groups.set(matcher.mid, group);
            var careComponentTypeIds = matcher.indices;

            for (var i = 0; i < careComponentTypeIds.length; i++) {
              ECSModel.compAddOrRemove.get(careComponentTypeIds[i]).push(group.onComponentAddOrRemove.bind(group));
            }
          }

          return group;
        };

        return ECSModel;
      }());
      /** 实体自增id */

      ECSModel.eid = 1;
      /** 实体造函数 */

      ECSModel.entityCtors = new Map();
      /** 实体对象缓存池 */

      ECSModel.entityPool = new Map();
      /** 通过实体id查找实体对象 */

      ECSModel.eid2Entity = new Map();
      /** 组件类型id */

      ECSModel.compTid = 0;
      /** 组件缓存池 */

      ECSModel.compPools = new Map();
      /** 组件构造函数 */

      ECSModel.compCtors = [];
      /**
       * 每个组件的添加和删除的动作都要派送到“关心”它们的group上。goup对当前拥有或者之前（删除前）拥有该组件的实体进行组件规则判断。判断该实体是否满足group
       * 所期望的组件组合。
       */

      ECSModel.compAddOrRemove = new Map();
      /** 编号获取组件 */

      ECSModel.tid2comp = new Map();
      /**
       * 缓存的group
       * 
       * key是组件的筛选规则，一个筛选规则对应一个group
       */

      ECSModel.groups = new Map();

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ECSSystem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ECSModel.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _createClass, cclegacy, ECSModel;

  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ECSModel = module.ECSModel;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9261fRWg2RBY5kxbFJsY1QC", "ECSSystem", undefined);
      /** 继承此类实现具体业务逻辑的系统 */


      var ECSComblockSystem = exports('ECSComblockSystem', /*#__PURE__*/function () {
        /** 构造函数 */
        function ECSComblockSystem() {
          this.group = void 0;
          this.dt = 0;
          this.enteredEntities = null;
          this.removedEntities = null;
          this.hasEntityEnter = false;
          this.hasEntityRemove = false;
          this.hasUpdate = false;
          this.tmpExecute = null;
          this.execute = void 0;
          var hasOwnProperty = Object.hasOwnProperty;
          var prototype = Object.getPrototypeOf(this);
          var hasEntityEnter = hasOwnProperty.call(prototype, 'entityEnter');
          var hasEntityRemove = hasOwnProperty.call(prototype, 'entityRemove');
          var hasFirstUpdate = hasOwnProperty.call(prototype, 'firstUpdate');
          var hasUpdate = hasOwnProperty.call(prototype, 'update');
          this.hasEntityEnter = hasEntityEnter;
          this.hasEntityRemove = hasEntityRemove;
          this.hasUpdate = hasUpdate;

          if (hasEntityEnter || hasEntityRemove) {
            this.enteredEntities = new Map();
            this.removedEntities = new Map();
            this.execute = this.execute1;
            this.group = ECSModel.createGroup(this.filter());
            this.group.watchEntityEnterAndRemove(this.enteredEntities, this.removedEntities);
          } else {
            this.execute = this.execute0;
            this.group = ECSModel.createGroup(this.filter());
          }

          if (hasFirstUpdate) {
            this.tmpExecute = this.execute;
            this.execute = this.updateOnce;
          }
        }
        /** 系统实始化 */


        var _proto = ECSComblockSystem.prototype;

        _proto.init = function init() {}
        /** 系统释放事件 */
        ;

        _proto.onDestroy = function onDestroy() {}
        /** 是否存在实体 */
        ;

        _proto.hasEntity = function hasEntity() {
          return this.group.count > 0;
        }
        /**
         * 先执行entityEnter，最后执行firstUpdate
         * @param dt 
         * @returns 
         */
        ;

        _proto.updateOnce = function updateOnce(dt) {
          if (this.group.count === 0) {
            return;
          }

          this.dt = dt; // 处理刚进来的实体

          if (this.enteredEntities.size > 0) {
            var entities = this.enteredEntities.values();

            for (var _iterator = _createForOfIteratorHelperLoose(entities), _step; !(_step = _iterator()).done;) {
              var entity = _step.value;
              this.entityEnter(entity);
            }

            this.enteredEntities.clear();
          } // 只执行firstUpdate


          for (var _iterator2 = _createForOfIteratorHelperLoose(this.group.matchEntities), _step2; !(_step2 = _iterator2()).done;) {
            var _entity = _step2.value;
            this.firstUpdate(_entity);
          }

          this.execute = this.tmpExecute;
          this.execute(dt);
          this.tmpExecute = null;
        }
        /**
         * 只执行update
         * @param dt 
         * @returns 
         */
        ;

        _proto.execute0 = function execute0(dt) {
          if (this.group.count === 0) return;
          this.dt = dt; // 执行update

          if (this.hasUpdate) {
            for (var _iterator3 = _createForOfIteratorHelperLoose(this.group.matchEntities), _step3; !(_step3 = _iterator3()).done;) {
              var entity = _step3.value;
              this.update(entity);
            }
          }
        }
        /**
         * 先执行entityRemove，再执行entityEnter，最后执行update
         * @param dt 
         * @returns 
         */
        ;

        _proto.execute1 = function execute1(dt) {
          if (this.removedEntities.size > 0) {
            if (this.hasEntityRemove) {
              var entities = this.removedEntities.values();

              for (var _iterator4 = _createForOfIteratorHelperLoose(entities), _step4; !(_step4 = _iterator4()).done;) {
                var entity = _step4.value;
                this.entityRemove(entity);
              }
            }

            this.removedEntities.clear();
          }

          if (this.group.count === 0) return;
          this.dt = dt; // 处理刚进来的实体

          if (this.enteredEntities.size > 0) {
            if (this.hasEntityEnter) {
              var entities = this.enteredEntities.values();

              for (var _iterator5 = _createForOfIteratorHelperLoose(entities), _step5; !(_step5 = _iterator5()).done;) {
                var _entity2 = _step5.value;
                this.entityEnter(_entity2);
              }
            }

            this.enteredEntities.clear();
          } // 执行update


          if (this.hasUpdate) {
            for (var _iterator6 = _createForOfIteratorHelperLoose(this.group.matchEntities), _step6; !(_step6 = _iterator6()).done;) {
              var _entity3 = _step6.value;
              this.update(_entity3);
            }
          }
        }
        /**
         * 实体过滤规则
         * 
         * 根据提供的组件过滤实体。
         */
        ;

        return ECSComblockSystem;
      }());
      /** 根System，对游戏中的System遍历从这里开始，一个System组合中只能有一个RootSystem，可以有多个并行的RootSystem */

      var ECSRootSystem = exports('ECSRootSystem', /*#__PURE__*/function () {
        function ECSRootSystem() {
          this.executeSystemFlows = [];
          this.systemCnt = 0;
        }

        var _proto2 = ECSRootSystem.prototype;

        _proto2.add = function add(system) {
          if (system instanceof ECSSystem) {
            // 将嵌套的System都“摊平”，放在根System中进行遍历，减少execute的频繁进入退出。
            Array.prototype.push.apply(this.executeSystemFlows, system.comblockSystems);
          } else {
            this.executeSystemFlows.push(system);
          }

          this.systemCnt = this.executeSystemFlows.length;
          return this;
        };

        _proto2.init = function init() {
          this.executeSystemFlows.forEach(function (sys) {
            return sys.init();
          });
        };

        _proto2.execute = function execute(dt) {
          for (var i = 0; i < this.systemCnt; i++) {
            // @ts-ignore
            this.executeSystemFlows[i].execute(dt);
          }
        };

        _proto2.clear = function clear() {
          this.executeSystemFlows.forEach(function (sys) {
            return sys.onDestroy();
          });
        };

        return ECSRootSystem;
      }());
      /** 系统组合器，用于将多个相同功能模块的系统逻辑上放在一起，系统也可以嵌套系统 */

      var ECSSystem = exports('ECSSystem', /*#__PURE__*/function () {
        function ECSSystem() {
          this._comblockSystems = [];
        }

        var _proto3 = ECSSystem.prototype;

        _proto3.add = function add(system) {
          if (system instanceof ECSSystem) {
            Array.prototype.push.apply(this._comblockSystems, system._comblockSystems);
            system._comblockSystems.length = 0;
          } else {
            this._comblockSystems.push(system);
          }

          return this;
        };

        _createClass(ECSSystem, [{
          key: "comblockSystems",
          get: function get() {
            return this._comblockSystems;
          }
        }]);

        return ECSSystem;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Effect2DFollow3D.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './MathUtil.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Vec3, Component, oops, MathUtil;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      MathUtil = module.MathUtil;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "f04f92UNY1J34UPA0VrEIsH", "Effect2DFollow3D", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 2D节点跟随3D节点 */

      var Effect2DFollow3D = exports('Effect2DFollow3D', (_dec = ccclass("Effect2DFollow3D"), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Effect2DFollow3D, _Component);

        function Effect2DFollow3D() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 3D世界节点 */

          _initializerDefineProperty(_this, "node3d", _descriptor, _assertThisInitialized(_this));
          /** 2D界面界面 */


          _initializerDefineProperty(_this, "nodeUi", _descriptor2, _assertThisInitialized(_this));
          /** 距离 */


          _initializerDefineProperty(_this, "distance", _descriptor3, _assertThisInitialized(_this));
          /** 3D摄像机 */


          _this.camera = null;
          _this.pos = new Vec3();
          return _this;
        }

        var _proto = Effect2DFollow3D.prototype;
        /**
         * 设3D定位参考点，并更新位置
         * @param node 3D世界节点
         */

        _proto.setTarget = function setTarget(node) {
          this.node3d = node;
        };

        _proto.start = function start() {
          var scale = this.zoom();
          this.node.setScale(scale, scale, 1);
        };

        _proto.lateUpdate = function lateUpdate(dt) {
          var scale = this.zoom();
          scale = MathUtil.lerp(this.node.scale.x, scale, 0.1);
          this.node.setScale(scale, scale, 1);
        };

        _proto.zoom = function zoom() {
          this.camera.convertToUINode(this.node3d.worldPosition, oops.gui.game, this.pos);
          this.nodeUi.setPosition(this.pos); // @ts-ignore

          Vec3.transformMat4(this.pos, this.node3d.worldPosition, this.camera._camera.matView);
          var ratio = this.distance / Math.abs(this.pos.z);
          var value = Math.floor(ratio * 100) / 100;
          return value;
        };

        return Effect2DFollow3D;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "node3d", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeUi", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "distance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EffectDelayRelease.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EffectSingleCase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Component, EffectSingleCase;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      EffectSingleCase = module.EffectSingleCase;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "01359fvxlFJZKx7BLUcTSWS", "EffectDelayRelease", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 延时释放特效 */

      var EffectDelayRelease = exports('EffectDelayRelease', (_dec = ccclass('EffectDelayRelease'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EffectDelayRelease, _Component);

        function EffectDelayRelease() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 延时释放时间(单位秒) */

          _initializerDefineProperty(_this, "delay", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = EffectDelayRelease.prototype;

        _proto.onEnable = function onEnable() {
          this.scheduleOnce(this.onDelay, this.delay);
        };

        _proto.onDelay = function onDelay() {
          EffectSingleCase.instance.put(this.node);
        };

        return EffectDelayRelease;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "delay", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EffectEvent.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "445875CzyRKaLiSXTYH66lm", "EffectEvent", undefined);
      /** 特效管理模块事件 */


      var EffectEvent = exports('EffectEvent', /*#__PURE__*/function (EffectEvent) {
        EffectEvent["Put"] = "EffectEvent_Put";
        return EffectEvent;
      }({}));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EffectFinishedRelease.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './EffectEvent.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, sp, Animation, ParticleSystem, Component, oops, EffectEvent;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
      Animation = module.Animation;
      ParticleSystem = module.ParticleSystem;
      Component = module.Component;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      EffectEvent = module.EffectEvent;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "a751fmayL5JMYH0D4uJoK5H", "EffectFinishedRelease", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 动画播放完释放特效 - Animation、ParticleSystem */

      var EffectFinishedRelease = exports('EffectFinishedRelease', (_dec = ccclass('EffectFinishedRelease'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EffectFinishedRelease, _Component);

        function EffectFinishedRelease() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 动画最大播放时间 */

          _this.maxDuration = 0;
          return _this;
        }

        var _proto = EffectFinishedRelease.prototype;

        _proto.onEnable = function onEnable() {
          var _this2 = this; // SPINE动画


          var spine = this.getComponent(sp.Skeleton);

          if (spine) {
            // 播放第一个动画
            var json = spine.skeletonData.skeletonJson.animations;

            for (var name in json) {
              spine.setCompleteListener(this.onRecovery.bind(this));
              spine.setAnimation(0, name, false);
              break;
            }
          } else {
            // COCOS动画
            var anims = this.node.getComponentsInChildren(Animation);

            if (anims.length > 0) {
              anims.forEach(function (animator) {
                var _animator$defaultClip;

                var aniName = (_animator$defaultClip = animator.defaultClip) == null ? void 0 : _animator$defaultClip.name;

                if (aniName) {
                  var aniState = animator.getState(aniName);

                  if (aniState) {
                    var duration = aniState.duration;
                    _this2.maxDuration = duration > _this2.maxDuration ? duration : _this2.maxDuration;
                  }
                }

                animator.play();
              });
              this.scheduleOnce(this.onRecovery.bind(this), this.maxDuration);
            } // 粒子动画
            else if (ParticleSystem) {
                var particles = this.node.getComponentsInChildren(ParticleSystem);
                particles.forEach(function (particle) {
                  particle.clear();
                  particle.stop();
                  particle.play();
                  var duration = particle.duration;
                  _this2.maxDuration = duration > _this2.maxDuration ? duration : _this2.maxDuration;
                });
                this.scheduleOnce(this.onRecovery.bind(this), this.maxDuration);
              }
          }
        };

        _proto.onRecovery = function onRecovery() {
          if (this.node.parent) oops.message.dispatchEvent(EffectEvent.Put, this.node);
        };

        return EffectFinishedRelease;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EffectSingleCase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './ViewUtil.ts', './EffectEvent.ts', './EffectFinishedRelease.ts'], function (exports) {
  var _asyncToGenerator, _createClass, _inheritsLoose, _regeneratorRuntime, cclegacy, NodePool, sp, Animation, ParticleSystem, Component, Prefab, oops, ViewUtil, EffectEvent, EffectFinishedRelease;

  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _createClass = module.createClass;
      _inheritsLoose = module.inheritsLoose;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      NodePool = module.NodePool;
      sp = module.sp;
      Animation = module.Animation;
      ParticleSystem = module.ParticleSystem;
      Component = module.Component;
      Prefab = module.Prefab;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      ViewUtil = module.ViewUtil;
    }, function (module) {
      EffectEvent = module.EffectEvent;
    }, function (module) {
      EffectFinishedRelease = module.EffectFinishedRelease;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bf338Z+oYxIUbd4bPREw9Ud", "EffectSingleCase", undefined);
      /** 效果数据 */


      var EffectData = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EffectData, _Component);

        function EffectData() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.type = null;
          return _this;
        }

        return EffectData;
      }(Component);
      /** 特效参数 */

      /** 动画特效对象池管理器 */


      var EffectSingleCase = exports('EffectSingleCase', /*#__PURE__*/function () {
        function EffectSingleCase() {
          /** 全局动画播放速度 */
          this._speed = 1;
          /** 不同类型的对象池集合 */

          this.effects = new Map();
          this.effects_use = new Map();
          oops.message.on(EffectEvent.Put, this.onHandler, this);
        }

        var _proto = EffectSingleCase.prototype;

        _proto.onHandler = function onHandler(event, args) {
          if (event == EffectEvent.Put) {
            this.put(args);
          }
        }
        /** 加载资源并现实特效 */
        ;

        _proto.loadAndShow = function loadAndShow(name, parent, params) {
          var _this2 = this;

          return new Promise( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
            var np, node;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  np = _this2.effects.get(name);

                  if (np == undefined) {
                    oops.res.load(name, Prefab, function (err, prefab) {
                      if (err) {
                        console.error("\u540D\u4E3A\u3010" + name + "\u3011\u7684\u7279\u6548\u8D44\u6E90\u52A0\u8F7D\u5931\u8D25");
                        return;
                      }

                      var node = _this2.show(name, parent, params);

                      resolve(node);
                    });
                  } else {
                    node = _this2.show(name, parent, params);
                    resolve(node);
                  }

                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));
        }
        /** 
         * 显示预制对象 
         * @param name    预制对象名称
         * @param parent  父节点
         * @param pos     位置
         */
        ;

        _proto.show = function show(name, parent, params) {
          var np = this.effects.get(name);

          if (np == null) {
            np = new NodePool();
            this.effects.set(name, np);
          }

          var node;

          if (np.size() == 0) {
            node = ViewUtil.createPrefabNode(name);
            node.addComponent(EffectData).type = name;

            if (params && params.isPlayFinishedRelease) {
              node.addComponent(EffectFinishedRelease);
            }
          } else {
            node = np.get();
            node.getComponent(EffectFinishedRelease);
          }

          this.setSpeed(node);
          if (params && params.pos) node.position = params.pos;
          if (parent) node.parent = parent; // 记录缓冲池中放出的节点

          this.effects_use.set(node, true);
          return node;
        }
        /**
         * 回收对象
         * @param name  预制对象名称
         * @param node  节点
         */
        ;

        _proto.put = function put(node) {
          var name = node.getComponent(EffectData).type;
          var np = this.effects.get(name);

          if (np) {
            // 回收使用的节点
            this.effects_use["delete"](node); // 回到到池中

            np.put(node);
          }
        }
        /**
         * 清除对象池数据
         * @param name  参数为空时，清除所有对象池数据;指定名时，清楚指定数据
         */
        ;

        _proto.clear = function clear(name) {
          if (name) {
            var np = this.effects.get(name);
            np.clear();
          } else {
            this.effects.forEach(function (np) {
              np.clear();
            });
            this.effects.clear();
          }
        }
        /** 设置动画速度 */
        ;

        _proto.setSpeed = function setSpeed(node) {
          var _this3 = this; // SPINE动画


          var spine = node.getComponent(sp.Skeleton);

          if (spine) {
            spine.timeScale = this.speed;
          } else {
            // COCOS动画
            var anims = node.getComponentsInChildren(Animation);

            if (anims.length > 0) {
              anims.forEach(function (animator) {
                var _animator$defaultClip;

                var aniName = (_animator$defaultClip = animator.defaultClip) == null ? void 0 : _animator$defaultClip.name;

                if (aniName) {
                  var aniState = animator.getState(aniName);

                  if (aniState) {
                    aniState.speed = _this3.speed;
                  }
                }
              });
            } // 粒子动画
            else if (ParticleSystem) {
                var particles = node.getComponentsInChildren(ParticleSystem);
                particles.forEach(function (particle) {
                  particle.simulationSpeed = _this3.speed;
                });
              }
          }
        };

        _createClass(EffectSingleCase, [{
          key: "speed",
          get: function get() {
            return this._speed;
          },
          set: function set(value) {
            var _this4 = this;

            this._speed = value;
            this.effects_use.forEach(function (value, key) {
              _this4.setSpeed(key);
            });
          }
        }], [{
          key: "instance",
          get: function get() {
            if (this._instance == null) {
              this._instance = new EffectSingleCase();
            }

            return this._instance;
          }
        }]);

        return EffectSingleCase;
      }());
      EffectSingleCase._instance = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EncryptUtil.ts", ['cc', './index.js'], function (exports) {
  var cclegacy, CryptoES;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CryptoES = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "46d12Bx4JdKnIYHhcvNk6S1", "EncryptUtil", undefined);
      /** 
       * CryptoES 加密库封装 
       * https://github.com/entronad/crypto-es
       * 
       * 安装第三方库生效
       * npm install -g yarn
       * yarn add crypto-es
       */


      var EncryptUtil = exports('EncryptUtil', /*#__PURE__*/function () {
        function EncryptUtil() {}
        /**
         * MD5加密
         * @param msg 加密信息
         */


        EncryptUtil.md5 = function md5(msg) {
          return CryptoES.MD5(msg).toString();
        }
        /** 初始化加密库 */
        ;

        EncryptUtil.initCrypto = function initCrypto(key, iv) {
          this.key = key;
          this.iv = CryptoES.enc.Hex.parse(iv);
        }
        /**
         * AES 加密
         * @param msg 加密信息
         * @param key aes加密的key 
         * @param iv  aes加密的iv
         */
        ;

        EncryptUtil.aesEncrypt = function aesEncrypt(msg, key, iv) {
          return CryptoES.AES.encrypt(msg, this.key, {
            iv: this.iv,
            format: this.JsonFormatter
          }).toString();
        }
        /**
         * AES 解密
         * @param str 解密字符串
         * @param key aes加密的key 
         * @param iv  aes加密的iv
         */
        ;

        EncryptUtil.aesDecrypt = function aesDecrypt(str, key, iv) {
          var decrypted = CryptoES.AES.decrypt(str, this.key, {
            iv: this.iv,
            format: this.JsonFormatter
          });
          return decrypted.toString(CryptoES.enc.Utf8);
        };

        return EncryptUtil;
      }());
      EncryptUtil.key = null;
      EncryptUtil.iv = null;
      EncryptUtil.JsonFormatter = {
        stringify: function stringify(cipherParams) {
          var jsonObj = {
            ct: cipherParams.ciphertext.toString(CryptoES.enc.Base64)
          };

          if (cipherParams.iv) {
            jsonObj.iv = cipherParams.iv.toString();
          }

          if (cipherParams.salt) {
            jsonObj.s = cipherParams.salt.toString();
          }

          return JSON.stringify(jsonObj);
        },
        parse: function parse(jsonStr) {
          var jsonObj = JSON.parse(jsonStr);
          var cipherParams = CryptoES.lib.CipherParams.create({
            ciphertext: CryptoES.enc.Base64.parse(jsonObj.ct)
          });

          if (jsonObj.iv) {
            cipherParams.iv = CryptoES.enc.Hex.parse(jsonObj.iv);
          }

          if (jsonObj.s) {
            cipherParams.salt = CryptoES.enc.Hex.parse(jsonObj.s);
          }

          return cipherParams;
        }
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EventDispatcher.ts", ['cc', './MessageManager.ts'], function (exports) {
  var cclegacy, MessageEventData;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      MessageEventData = module.MessageEventData;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c680af5iPNKeIO4cArf/90m", "EventDispatcher", undefined);
      /* 事件对象基类，继承该类将拥有发送和接送事件的能力 */


      var EventDispatcher = exports('EventDispatcher', /*#__PURE__*/function () {
        function EventDispatcher() {
          this._msg = null;
        }

        var _proto = EventDispatcher.prototype;
        /**
         * 注册全局事件
         * @param event     事件名
         * @param listener  处理事件的侦听器函数
         * @param object    侦听函数绑定的作用域对象
         */

        _proto.on = function on(event, listener, object) {
          if (this._msg == null) {
            this._msg = new MessageEventData();
          }

          this._msg.on(event, listener, object);
        }
        /**
         * 移除全局事件
         * @param event      事件名
         */
        ;

        _proto.off = function off(event) {
          if (this._msg) {
            this._msg.off(event);
          }
        }
        /** 
         * 触发全局事件 
         * @param event      事件名
         * @param args       事件参数
         */
        ;

        _proto.dispatchEvent = function dispatchEvent(event, args) {
          if (args === void 0) {
            args = null;
          }

          if (this._msg == null) {
            this._msg = new MessageEventData();
          }

          this._msg.dispatchEvent(event, args);
        }
        /**
         * 销毁事件对象
         */
        ;

        _proto.destroy = function destroy() {
          if (this._msg) {
            this._msg.clear();
          }

          this._msg = null;
        };

        return EventDispatcher;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EventMessage.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "beea7u9xnJD4rMj6ua/LTcF", "EventMessage", undefined);
      /*
       * @Author: dgflash
       * @Date: 2021-07-03 16:13:17
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-02 11:03:08
       */

      /**
       * 全局事件监听方法
       * @param event      事件名
       * @param args       事件参数
       */

      /** 框架内部全局事件  */


      var EventMessage = exports('EventMessage', /*#__PURE__*/function (EventMessage) {
        EventMessage["GAME_ENTER"] = "EventMessage.GAME_ENTER";
        EventMessage["GAME_EXIT"] = "EventMessage.GAME_EXIT";
        EventMessage["GAME_RESIZE"] = "EventMessage.GAME_RESIZE";
        return EventMessage;
      }({}));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FlashSpine.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, sp, Material, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
      Material = module.Material;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "61de7pPhiNF5plXR5pVKfXu", "FlashSpine", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FlashSpine = exports('default', (_dec = ccclass('FlashSpine'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FlashSpine, _Component);

        function FlashSpine() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.duration = 0.5;
          _this._median = 0;
          _this._time = 0;
          _this._material = null;
          _this._skeleton = null;
          return _this;
        }

        var _proto = FlashSpine.prototype;

        _proto.onLoad = function onLoad() {
          this._median = this.duration / 2; // 获取材质

          this._skeleton = this.node.getComponent(sp.Skeleton);
          this._material = this._skeleton.customMaterial; // 设置材质对应的属性

          this._material.setProperty("u_rate", 1);
        };

        _proto.update = function update(dt) {
          if (this._time > 0) {
            this._time -= dt;
            this._time = this._time < 0 ? 0 : this._time;
            var rate = Math.abs(this._time - this._median) * 2 / this.duration;
            var mat = new Material();
            mat.copy(this._material);
            this._skeleton.customMaterial = mat;
            mat.setProperty("u_rate", rate);
          }
        };

        _proto.clickFlash = function clickFlash() {
          this._time = this.duration;
        };

        return FlashSpine;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FlashSprite.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Sprite, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "a7a9eXWbUpJ3rONqlgUYCY/", "FlashSprite", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FlashSprite = exports('default', (_dec = ccclass('FlashSprite'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FlashSprite, _Component);

        function FlashSprite() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.duration = 0.5;
          _this._median = 0;
          _this._time = 0;
          _this._material = null;
          return _this;
        }

        var _proto = FlashSprite.prototype;

        _proto.onLoad = function onLoad() {
          this._median = this.duration / 2; // 获取材质

          this._material = this.node.getComponent(Sprite).getMaterial(0); // 设置材质对应的属性

          this._material.setProperty("u_rate", 1);
        };

        _proto.update = function update(dt) {
          if (this._time > 0) {
            this._time -= dt;
            this._time = this._time < 0 ? 0 : this._time;
            var rate = Math.abs(this._time - this._median) * 2 / this.duration;

            this._material.setProperty("u_rate", rate);
          }
        };

        _proto.clickFlash = function clickFlash() {
          this._time = this.duration;
        };

        return FlashSprite;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FreeFlightCamera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, math, KeyCode, CCFloat, input, Input, game, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      math = module.math;
      KeyCode = module.KeyCode;
      CCFloat = module.CCFloat;
      input = module.input;
      Input = module.Input;
      game = module.game;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "6c841mU+4JNvqwHy5tJsJh0", "FreeFlightCamera", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var Vec2 = math.Vec2,
          Vec3 = math.Vec3,
          Quat = math.Quat;
      var v2_1 = new Vec2();
      var v2_2 = new Vec2();
      var v3_1 = new Vec3();
      var qt_1 = new Quat();
      var KEYCODE = {
        W: 'W'.charCodeAt(0),
        S: 'S'.charCodeAt(0),
        A: 'A'.charCodeAt(0),
        D: 'D'.charCodeAt(0),
        Q: 'Q'.charCodeAt(0),
        E: 'E'.charCodeAt(0),
        SHIFT: KeyCode.SHIFT_LEFT
      };
      var FreeFlightCamera = exports('FreeFlightCamera', (_dec = ccclass("FreeFlightCamera"), _dec2 = menu('oops/camera/FreeFlightCamera'), _dec3 = property({
        type: CCFloat,
        tooltip: "移动速度"
      }), _dec4 = property({
        type: CCFloat,
        tooltip: "按Shift键后的速度"
      }), _dec5 = property({
        type: CCFloat,
        slide: true,
        range: [0.05, 0.5, 0.01],
        tooltip: "移动后惯性效果"
      }), _dec6 = property({
        type: CCFloat,
        tooltip: "旋转速度"
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FreeFlightCamera, _Component);

        function FreeFlightCamera() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "moveSpeed", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "moveSpeedShiftScale", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "damp", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rotateSpeed", _descriptor4, _assertThisInitialized(_this));

          _this._euler = new Vec3();
          _this._velocity = new Vec3();
          _this._position = new Vec3();
          _this._speedScale = 1;
          return _this;
        }

        var _proto = FreeFlightCamera.prototype;

        _proto.onLoad = function onLoad() {
          input.on(Input.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          Vec3.copy(this._euler, this.node.eulerAngles);
          Vec3.copy(this._position, this.node.position);
        };

        _proto.onDestroy = function onDestroy() {
          input.off(Input.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        };

        _proto.update = function update(dt) {
          // position
          Vec3.transformQuat(v3_1, this._velocity, this.node.rotation);
          Vec3.scaleAndAdd(this._position, this._position, v3_1, this.moveSpeed * this._speedScale);
          Vec3.lerp(v3_1, this.node.position, this._position, dt / this.damp); // 向量线性插值产生位移惯性效果

          this.node.setPosition(v3_1); // rotation

          Quat.fromEuler(qt_1, this._euler.x, this._euler.y, this._euler.z);
          Quat.slerp(qt_1, this.node.rotation, qt_1, dt / this.damp); // 四元素线性插值产生旋转惯性效果

          this.node.setRotation(qt_1);
        };

        _proto.onMouseWheel = function onMouseWheel(event) {
          var delta = -event.getScrollY() * this.moveSpeed * 0.1; // 向下滚动时增量为正

          Vec3.transformQuat(v3_1, Vec3.UNIT_Z, this.node.rotation);
          Vec3.scaleAndAdd(this._position, this.node.position, v3_1, delta);
        };

        _proto.onKeyDown = function onKeyDown(event) {
          var v = this._velocity;

          if (event.keyCode === KEYCODE.SHIFT) {
            this._speedScale = this.moveSpeedShiftScale;
          } else if (event.keyCode === KEYCODE.W) {
            if (v.z === 0) {
              v.z = -1;
            }
          } else if (event.keyCode === KEYCODE.S) {
            if (v.z === 0) {
              v.z = 1;
            }
          } else if (event.keyCode === KEYCODE.A) {
            if (v.x === 0) {
              v.x = -1;
            }
          } else if (event.keyCode === KEYCODE.D) {
            if (v.x === 0) {
              v.x = 1;
            }
          } else if (event.keyCode === KEYCODE.Q) {
            if (v.y === 0) {
              v.y = -1;
            }
          } else if (event.keyCode === KEYCODE.E) {
            if (v.y === 0) {
              v.y = 1;
            }
          }
        };

        _proto.onKeyUp = function onKeyUp(event) {
          var v = this._velocity;

          if (event.keyCode === KEYCODE.SHIFT) {
            this._speedScale = 1;
          } else if (event.keyCode === KEYCODE.W) {
            if (v.z < 0) {
              v.z = 0;
            }
          } else if (event.keyCode === KEYCODE.S) {
            if (v.z > 0) {
              v.z = 0;
            }
          } else if (event.keyCode === KEYCODE.A) {
            if (v.x < 0) {
              v.x = 0;
            }
          } else if (event.keyCode === KEYCODE.D) {
            if (v.x > 0) {
              v.x = 0;
            }
          } else if (event.keyCode === KEYCODE.Q) {
            if (v.y < 0) {
              v.y = 0;
            }
          } else if (event.keyCode === KEYCODE.E) {
            if (v.y > 0) {
              v.y = 0;
            }
          }
        };

        _proto.onTouchStart = function onTouchStart(e) {
          game.canvas.requestPointerLock();
        };

        _proto.onTouchMove = function onTouchMove(e) {
          e.getStartLocation(v2_1);

          if (v2_1.x > game.canvas.width * 0.4) {
            // rotation
            e.getDelta(v2_2);
            this._euler.y -= v2_2.x * this.rotateSpeed * 0.1; // 上下旋转

            this._euler.x += v2_2.y * this.rotateSpeed * 0.1; // 左右旋转
          } else {
            // position
            e.getLocation(v2_2);
            Vec2.subtract(v2_2, v2_2, v2_1);
            this._velocity.x = v2_2.x * 0.01;
            this._velocity.z = -v2_2.y * 0.01;
          }
        };

        _proto.onTouchEnd = function onTouchEnd(e) {
          if (document.exitPointerLock) {
            document.exitPointerLock();
          }

          e.getStartLocation(v2_1);

          if (v2_1.x < game.canvas.width * 0.4) {
            // position
            this._velocity.x = 0;
            this._velocity.z = 0;
          }
        };

        return FreeFlightCamera;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeedShiftScale", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "damp", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.2;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rotateSpeed", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameCollision.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ccenum, Collider, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ccenum = module.ccenum;
      Collider = module.Collider;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "8edaam8WhdBEYR4guslfNh/", "GameCollision", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 碰撞物体类型 */

      var CollisionType = exports('CollisionType', /*#__PURE__*/function (CollisionType) {
        CollisionType[CollisionType["Role"] = 0] = "Role";
        CollisionType[CollisionType["Ballistic"] = 1] = "Ballistic";
        CollisionType[CollisionType["Wall"] = 2] = "Wall";
        return CollisionType;
      }({}));
      ccenum(CollisionType);
      /** 碰撞器与触发器 */

      var GameCollision = exports('GameCollision', (_dec = ccclass('GameCollision'), _dec2 = property({
        type: CollisionType,
        tooltip: '碰撞物体类型'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameCollision, _Component);

        function GameCollision() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.Event_TriggerEnter = "onTriggerEnter";
          _this.Event_TriggerStay = "onTriggerStay";
          _this.Event_TriggerExit = "onTriggerExit";
          _this.Event_CollisionEnter = "onCollisionEnter";
          _this.Event_CollisionStay = "onCollisionStay";
          _this.Event_CollisionExit = "onCollisionExit";
          _this.collider = null;

          _initializerDefineProperty(_this, "type", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = GameCollision.prototype;

        _proto.onLoad = function onLoad() {
          this.collider = this.getComponent(Collider);

          if (this.collider.isTrigger) {
            this.collider.on(this.Event_TriggerEnter, this.onTrigger, this);
            this.collider.on(this.Event_TriggerStay, this.onTrigger, this);
            this.collider.on(this.Event_TriggerExit, this.onTrigger, this);
          } else {
            this.collider.on(this.Event_CollisionEnter, this.onCollision, this);
            this.collider.on(this.Event_CollisionStay, this.onCollision, this);
            this.collider.on(this.Event_CollisionExit, this.onCollision, this);
          }
        };

        _proto.onTrigger = function onTrigger(event) {
          switch (event.type) {
            case this.Event_TriggerEnter:
              this.onTriggerEnter(event);
              break;

            case this.Event_TriggerStay:
              this.onTriggerStay(event);
              break;

            case this.Event_TriggerExit:
              this.onTriggerExit(event);
              break;
          }
        };

        _proto.onTriggerEnter = function onTriggerEnter(event) {};

        _proto.onTriggerStay = function onTriggerStay(event) {};

        _proto.onTriggerExit = function onTriggerExit(event) {};

        _proto.onCollision = function onCollision(event) {
          switch (event.type) {
            case this.Event_CollisionEnter:
              this.onCollisionEnter(event);
              break;

            case this.Event_CollisionStay:
              this.onCollisionStay(event);
              break;

            case this.Event_CollisionExit:
              this.onCollisionExit(event);
              break;
          }
        };

        _proto.onCollisionEnter = function onCollisionEnter(event) {};

        _proto.onCollisionStay = function onCollisionStay(event) {};

        _proto.onCollisionExit = function onCollisionExit(event) {};

        return GameCollision;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return CollisionType.Ballistic;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventDispatcher.ts', './ViewUtil.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, _decorator, isValid, Component, EventDispatcher, ViewUtil;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      isValid = module.isValid;
      Component = module.Component;
    }, function (module) {
      EventDispatcher = module.EventDispatcher;
    }, function (module) {
      ViewUtil = module.ViewUtil;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "9e3f8Q8IgZD9ZsZJ7OrkxWd", "GameComponent", undefined);

      var ccclass = _decorator.ccclass;
      /** 游戏显示对象组件模板 */

      var GameComponent = exports('GameComponent', (_dec = ccclass("GameComponent"), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameComponent, _Component);

        function GameComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._eventDispatcher = null; // 事件是否绑定node的active

          _this._isBindMessageActive = false;
          /** 自动释放资源 */

          _this.dynamicsAssets = [];
          /** 摊平的节点集合（不能重名） */

          _this.nodes = new Map();
          return _this;
        }

        var _proto = GameComponent.prototype;
        /** 绑定node active属性，即只有active为true才会响应事件 */

        _proto.bindMessageActive = function bindMessageActive() {
          this._isBindMessageActive = true;
        }
        /** 解绑node active属性，无论node是否可见都会响应事件 */
        ;

        _proto.unbindMessageActive = function unbindMessageActive() {
          this._isBindMessageActive = false;
        };
        /** 通过节点名获取预制上的节点，整个预制不能有重名节点 */


        _proto.get = function get(name) {
          return this.nodes.get(name);
        };

        _proto.onLoad = function onLoad() {
          ViewUtil.nodeTreeInfoLite(this.node, this.nodes);
        }
        /** 添加自动释放的资源 */
        ;

        _proto.addAutoReleaseAsset = function addAutoReleaseAsset(asset) {
          if (isValid(asset)) {
            asset.addRef();
            this.dynamicsAssets.push(asset);
          }
        }
        /** 添加自动释放的资源数组 */
        ;

        _proto.addAutoReleaseAssets = function addAutoReleaseAssets(assets) {
          var _this2 = this;

          assets.forEach(function (asset) {
            _this2.addAutoReleaseAsset(asset);
          });
        }
        /**
         * 注册全局事件
         * @param event       事件名
         * @param listener   处理事件的侦听器函数
         * @param object    侦听函数绑定的this对象
         */
        ;

        _proto.on = function on(event, listener, object) {
          var _this3 = this;

          this.eventDispatcher.on(event, function (event, args) {
            if (!_this3.isValid) {
              if (_this3._eventDispatcher) {
                _this3._eventDispatcher.destroy();

                _this3._eventDispatcher = null;
              }

              return;
            }

            if (_this3._isBindMessageActive) {
              if (_this3.node.active) {
                listener.call(object, event, args);
              }
            } else {
              listener.call(object, event, args);
            }
          }, object);
        }
        /**
         * 移除全局事件
         * @param event      事件名
         */
        ;

        _proto.off = function off(event) {
          if (this._eventDispatcher) {
            this._eventDispatcher.off(event);
          }
        }
        /** 
         * 触发全局事件 
         * @param event      事件名
         * @param args       事件参数
         */
        ;

        _proto.dispatchEvent = function dispatchEvent(event, args) {
          if (args === void 0) {
            args = null;
          }

          this.eventDispatcher.dispatchEvent(event, args);
        };

        _proto.onDestroy = function onDestroy() {
          // 释放消息对象
          if (this._eventDispatcher) {
            this._eventDispatcher.destroy();

            this._eventDispatcher = null;
          } // 节点引用数据清除


          this.nodes.clear(); // 自动释放资源

          this.dynamicsAssets.forEach(function (asset) {
            asset.decRef();
          });
          this.dynamicsAssets.splice(0, this.dynamicsAssets.length);
        };

        _createClass(GameComponent, [{
          key: "eventDispatcher",
          get: function get() {
            if (!this._eventDispatcher) {
              this._eventDispatcher = new EventDispatcher();
            }

            return this._eventDispatcher;
          }
        }]);

        return GameComponent;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts'], function (exports) {
  var _createClass, cclegacy, oops;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      oops = module.oops;
    }],
    execute: function () {
      cclegacy._RF.push({}, "54585zBsmtGfZEDczLG3SH5", "GameConfig", undefined);
      /* 游戏配置解析，对应 resources/config/config.json 配置 */


      var GameConfig = exports('GameConfig', /*#__PURE__*/function () {
        function GameConfig(config) {
          this._data = null;
          var data = config.json;
          this._data = Object.freeze(data);
          oops.log.logConfig(this._data, "游戏配置");
        }

        _createClass(GameConfig, [{
          key: "version",
          get:
          /** 客户端版本号配置 */
          function get() {
            return this._data["config"]["version"];
          }
          /** 包名 */

        }, {
          key: "package",
          get: function get() {
            return this._data["config"]["package"];
          }
          /** 游戏每秒传输帧数 */

        }, {
          key: "frameRate",
          get: function get() {
            return this._data.config.frameRate;
          }
          /** 本地存储内容加密 key */

        }, {
          key: "localDataKey",
          get: function get() {
            return this._data.config.localDataKey;
          }
          /** 本地存储内容加密 iv */

        }, {
          key: "localDataIv",
          get: function get() {
            return this._data.config.localDataIv;
          }
          /** Http 服务器地址 */

        }, {
          key: "httpServer",
          get: function get() {
            return this._data.config.httpServer;
          }
          /** Http 请求超时时间 */

        }, {
          key: "httpTimeout",
          get: function get() {
            return this._data.config.httpTimeout;
          }
          /** 获取当前客户端支持的语言类型 */

        }, {
          key: "language",
          get: function get() {
            return this._data.language.type || ["zh"];
          }
          /** 获取当前客户端支持的语言 Json 配置路径 */

        }, {
          key: "languagePathJson",
          get: function get() {
            return this._data.language.path.json || "language/json";
          }
          /** 获取当前客户端支持的语言纹理配置路径 */

        }, {
          key: "languagePathTexture",
          get: function get() {
            return this._data.language.path.texture || "language/texture";
          }
          /** 是否启用远程资源 */

        }, {
          key: "bundleEnable",
          get: function get() {
            return this._data.bundle.enable;
          }
          /** 远程资源服务器地址 */

        }, {
          key: "bundleServer",
          get: function get() {
            return this._data.bundle.server;
          }
          /** 远程资源名 */

        }, {
          key: "bundleName",
          get: function get() {
            return this._data.bundle.name;
          }
          /** 远程资源版本号 */

        }, {
          key: "bundleVersion",
          get: function get() {
            return this._data.bundle.version;
          }
        }, {
          key: "data",
          get:
          /** 游戏配置数据 */
          function get() {
            return this._data;
          }
        }]);

        return GameConfig;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameEvent.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "28ac0rWU79HGpJWrnyK01Gn", "GameEvent", undefined);
      /*
       * @Author: dgflash
       * @Date: 2021-11-23 15:28:39
       * @LastEditors: dgflash
       * @LastEditTime: 2022-01-26 16:42:00
       */

      /** 游戏事件 */


      var GameEvent = exports('GameEvent', /*#__PURE__*/function (GameEvent) {
        GameEvent["GameServerConnected"] = "GameServerConnected";
        GameEvent["LoginSuccess"] = "LoginSuccess";
        return GameEvent;
      }({}));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['cc'], function (exports) {
  var cclegacy, game, Game;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      game = module.game;
      Game = module.Game;
    }],
    execute: function () {
      cclegacy._RF.push({}, "73fa0CEfOhMdJUoZwoFIIZV", "GameManager", undefined);

      var timeScale = 1;
      /** 游戏世界管理 */

      var GameManager = exports('GameManager', /*#__PURE__*/function () {
        function GameManager(root) {
          /** 界面根节点 */
          this.root = void 0;
          this.root = root;
          this.gameTimeScaleExtend();
        }
        /** 设置游戏动画速度（不支持 Native 模式） */


        var _proto = GameManager.prototype;

        _proto.setTimeScale = function setTimeScale(scale) {
          timeScale = scale;
        }
        /** 只支持web整体加速 */
        ;

        _proto.gameTimeScaleExtend = function gameTimeScaleExtend() {
          //@ts-ignore
          game._calculateDT = function (now) {
            if (!now) now = performance.now(); //@ts-ignore

            this._deltaTime = now > this._startTime ? (now - this._startTime) / 1000 : 0; //@ts-ignore

            if (this._deltaTime > Game.DEBUG_DT_THRESHOLD) {
              //@ts-ignore
              this._deltaTime = this.frameTime / 1000;
            } //@ts-ignore


            this._startTime = now; //@ts-ignore

            return this._deltaTime * timeScale;
          };
        };

        return GameManager;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameQueryConfig.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './StringUtil.ts'], function (exports) {
  var _createClass, cclegacy, sys, oops, StringUtil;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      StringUtil = module.StringUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d09acUxcU5Hg4kUjKxVEWLy", "GameQueryConfig", undefined);
      /**
       * 获取和处理浏览器地址栏参数
       * @example
       * config.query.data.username
       */


      var GameQueryConfig = exports('GameQueryConfig', /*#__PURE__*/function () {
        /** 构造函数 */
        function GameQueryConfig() {
          this._data = null;

          if (!sys.isBrowser) {
            this._data = {};
            return;
          }

          this._data = this.parseUrl();

          if (!this._data["username"]) {
            this._data["username"] = StringUtil.guid();
          }

          oops.log.logConfig(this._data, "查询参数");
        }

        var _proto = GameQueryConfig.prototype;

        _proto.parseUrl = function parseUrl() {
          if (typeof window !== "object") return {};
          if (!window.document) return {};
          var url = window.document.location.href.toString();
          var u = url.split("?");

          if (typeof u[1] == "string") {
            u = u[1].split("&");
            var get = {};

            for (var i = 0, l = u.length; i < l; ++i) {
              var j = u[i];
              var x = j.indexOf("=");

              if (x < 0) {
                continue;
              }

              var key = j.substring(0, x);
              var value = j.substring(x + 1);
              get[decodeURIComponent(key)] = value && decodeURIComponent(value);
            }

            return get;
          } else {
            return {};
          }
        };

        _createClass(GameQueryConfig, [{
          key: "debug",
          get:
          /** 调试模式开关 */
          function get() {
            return this._data["debug"];
          }
          /** 玩家帐号名 */

        }, {
          key: "username",
          get: function get() {
            return this._data["username"];
          }
          /** 语言 */

        }, {
          key: "lang",
          get: function get() {
            return this._data["lang"] || "zh";
          }
        }, {
          key: "data",
          get:
          /** 浏览器地址栏原始参数 */
          function get() {
            return this._data;
          }
        }]);

        return GameQueryConfig;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameUIConfig.ts", ['cc', './LayerManager.ts'], function (exports) {
  var cclegacy, LayerType;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      LayerType = module.LayerType;
    }],
    execute: function () {
      var _UIConfigData;

      cclegacy._RF.push({}, "14663z2+5JJIYupyDayZnc3", "GameUIConfig", undefined);
      /** 界面唯一标识（方便服务器通过编号数据触发界面打开） */


      var UIID = exports('UIID', /*#__PURE__*/function (UIID) {
        UIID[UIID["Loading"] = 1] = "Loading";
        UIID[UIID["Window"] = 2] = "Window";
        UIID[UIID["Netinstable"] = 3] = "Netinstable";
        UIID[UIID["Login"] = 4] = "Login";
        UIID[UIID["Claim"] = 5] = "Claim";
        return UIID;
      }({}));
      /** 打开界面方式的配置数据 */

      var UIConfigData = exports('UIConfigData', (_UIConfigData = {}, _UIConfigData[UIID.Loading] = {
        layer: LayerType.UI,
        prefab: "gui/loading/loading"
      }, _UIConfigData[UIID.Netinstable] = {
        layer: LayerType.PopUp,
        prefab: "common/prefab/netinstable"
      }, _UIConfigData[UIID.Window] = {
        layer: LayerType.Dialog,
        prefab: "common/prefab/window"
      }, _UIConfigData[UIID.Login] = {
        layer: LayerType.UI,
        prefab: "gui/login/login"
      }, _UIConfigData[UIID.Claim] = {
        layer: LayerType.UI,
        prefab: "gui/claim/claim"
      }, _UIConfigData));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, UITransform, Camera, view, math, screen, ResolutionPolicy, Component, oops;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      Camera = module.Camera;
      view = module.view;
      math = module.math;
      screen = module.screen;
      ResolutionPolicy = module.ResolutionPolicy;
      Component = module.Component;
    }, function (module) {
      oops = module.oops;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "9461cd/dGNEGK5I5J24xY6L", "GUI", undefined);

      var ccclass = _decorator.ccclass,
          menu = _decorator.menu;
      /** 游戏界面屏幕自适应管理 */

      var GUI = exports('GUI', (_dec = ccclass('GUI'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GUI, _Component);

        function GUI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 界面层矩形信息组件 */

          _this.transform = void 0;
          /** 游戏二维摄像机 */

          _this.camera = void 0;
          /** 是否为竖屏显示 */

          _this.portrait = void 0;
          /** 竖屏设计尺寸 */

          _this.portraitDrz = null;
          /** 横屏设计尺寸 */

          _this.landscapeDrz = null;
          return _this;
        }

        var _proto = GUI.prototype;

        _proto.onLoad = function onLoad() {
          this.init();
        }
        /** 初始化引擎 */
        ;

        _proto.init = function init() {
          this.transform = this.getComponent(UITransform);
          this.camera = this.getComponentInChildren(Camera);

          if (view.getDesignResolutionSize().width > view.getDesignResolutionSize().height) {
            this.landscapeDrz = view.getDesignResolutionSize();
            this.portraitDrz = new math.Size(this.landscapeDrz.height, this.landscapeDrz.width);
          } else {
            this.portraitDrz = view.getDesignResolutionSize();
            this.landscapeDrz = new math.Size(this.portraitDrz.height, this.portraitDrz.width);
          }

          this.resize();
        }
        /** 游戏画布尺寸变化 */
        ;

        _proto.resize = function resize() {
          var dr;

          if (view.getDesignResolutionSize().width > view.getDesignResolutionSize().height) {
            dr = this.landscapeDrz;
          } else {
            dr = this.portraitDrz;
          }

          var s = screen.windowSize;
          var rw = s.width;
          var rh = s.height;
          var finalW = rw;
          var finalH = rh;

          if (rw / rh > dr.width / dr.height) {
            // 如果更长，则用定高
            finalH = dr.height;
            finalW = finalH * rw / rh;
            this.portrait = false;
          } else {
            // 如果更短，则用定宽
            finalW = dr.width;
            finalH = finalW * rh / rw;
            this.portrait = true;
          } // 手工修改canvas和设计分辨率，这样反复调用也能生效。


          view.setDesignResolutionSize(finalW, finalH, ResolutionPolicy.UNKNOWN);
          this.transform.width = finalW;
          this.transform.height = finalH;
          oops.log.logView(dr, "设计尺寸");
          oops.log.logView(s, "屏幕尺寸");
        };

        return GUI;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/home.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "168b9pZwqNKA6zWlU+NnqvJ", "home", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var home = exports('home', (_dec = ccclass('home'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(home, _Component);

        function home() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = home.prototype;

        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  console.log("111111111111");

                case 1:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));

          function start() {
            return _start.apply(this, arguments);
          }

          return start;
        }();

        _proto.update = /*#__PURE__*/function () {
          var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(deltaTime) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));

          function update(_x) {
            return _update.apply(this, arguments);
          }

          return update;
        }();

        return home;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HttpRequest.ts", ['cc'], function (exports) {
  var cclegacy, error, warn;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      error = module.error;
      warn = module.warn;
    }],
    execute: function () {
      cclegacy._RF.push({}, "806e5t8UetFy4spn89dnuan", "HttpRequest", undefined);

      var urls = {}; // 当前请求地址集合

      var reqparams = {}; // 请求参数

      /** 请求事件 */

      var HttpEvent = exports('HttpEvent', /*#__PURE__*/function (HttpEvent) {
        HttpEvent["NO_NETWORK"] = "http_request_no_network";
        HttpEvent["UNKNOWN_ERROR"] = "http_request_unknown_error";
        HttpEvent["TIMEOUT"] = "http_request_timout";
        return HttpEvent;
      }({}));
      /** HTTP请求 */

      var HttpRequest = exports('HttpRequest', /*#__PURE__*/function () {
        function HttpRequest() {
          /** 服务器地址 */
          this.server = "http://127.0.0.1/";
          /** 请求超时时间 */

          this.timeout = 10000;
        }

        var _proto = HttpRequest.prototype;
        /**
         * HTTP GET请求
         * @param name                  协议名
         * @param completeCallback      请求完整回调方法
         * @param errorCallback         请求失败回调方法
         * @example
        var complete = function(response){
            console.log(response);
        }
        var error = function(response){
            console.log(response);
        }
        oops.http.get(name, complete, error);
         */

        _proto.get = function get(name, completeCallback, errorCallback) {
          this.sendRequest(name, null, false, completeCallback, errorCallback);
        }
        /**
         * HTTP GET请求
         * @param name                  协议名
         * @param params                查询参数
         * @param completeCallback      请求完整回调方法
         * @param errorCallback         请求失败回调方法
         * @example
        var param = '{"uid":12345}'
        var complete = function(response){
            var jsonData = JSON.parse(response);
            var data = JSON.parse(jsonData.Data);
            console.log(data.Id);
        }
        var error = function(response){
            console.log(response);
        }
        oops.http.getWithParams(name, param, complete, error);
         */
        ;

        _proto.getWithParams = function getWithParams(name, params, completeCallback, errorCallback) {
          this.sendRequest(name, params, false, completeCallback, errorCallback);
        }
        /**
         * HTTP GET请求非文本格式数据
         * @param name                  协议名
         * @param completeCallback      请求完整回调方法
         * @param errorCallback         请求失败回调方法
         */
        ;

        _proto.getByArraybuffer = function getByArraybuffer(name, completeCallback, errorCallback) {
          this.sendRequest(name, null, false, completeCallback, errorCallback, 'arraybuffer', false);
        }
        /**
         * HTTP GET请求非文本格式数据
         * @param name                  协议名
         * @param params                查询参数
         * @param completeCallback      请求完整回调方法
         * @param errorCallback         请求失败回调方法
         */
        ;

        _proto.getWithParamsByArraybuffer = function getWithParamsByArraybuffer(name, params, completeCallback, errorCallback) {
          this.sendRequest(name, params, false, completeCallback, errorCallback, 'arraybuffer', false);
        }
        /**
         * HTTP POST请求
         * @param name                  协议名
         * @param params                查询参数
         * @param completeCallback      请求完整回调方法
         * @param errorCallback         请求失败回调方法
         * @example
        var param = '{"LoginCode":"donggang_dev","Password":"e10adc3949ba59abbe56e057f20f883e"}'
        var complete = function(response){
            var jsonData = JSON.parse(response);
            var data = JSON.parse(jsonData.Data);
            console.log(data.Id);
        }
        var error = function(response){
            console.log(response);
        }
        oops.http.post(name, param, complete, error);
         */
        ;

        _proto.post = function post(name, params, completeCallback, errorCallback) {
          this.sendRequest(name, params, true, completeCallback, errorCallback);
        }
        /** 取消请求中的请求 */
        ;

        _proto.abort = function abort(name) {
          var xhr = urls[this.server + name];

          if (xhr) {
            xhr.abort();
          }
        }
        /**
         * 获得字符串形式的参数
         */
        ;

        _proto.getParamString = function getParamString(params) {
          var result = "";

          for (var name in params) {
            var data = params[name];

            if (data instanceof Object) {
              for (var key in data) result += key + "=" + data[key] + "&";
            } else {
              result += name + "=" + data + "&";
            }
          }

          return result.substr(0, result.length - 1);
        }
        /** 
         * Http请求 
         * @param name(string)              请求地址
         * @param params(JSON)              请求参数
         * @param isPost(boolen)            是否为POST方式
         * @param callback(function)        请求成功回调
         * @param errorCallback(function)   请求失败回调
         * @param responseType(string)      响应类型
         */
        ;

        _proto.sendRequest = function sendRequest(name, params, isPost, completeCallback, errorCallback, responseType, isOpenTimeout, timeout) {
          var _this = this;

          if (isOpenTimeout === void 0) {
            isOpenTimeout = true;
          }

          if (timeout === void 0) {
            timeout = this.timeout;
          }

          if (name == null || name == '') {
            error("请求地址不能为空");
            return;
          }

          var url, newUrl, paramsStr;

          if (name.toLocaleLowerCase().indexOf("http") == 0) {
            url = name;
          } else {
            url = this.server + name;
          }

          if (params) {
            paramsStr = this.getParamString(params);
            if (url.indexOf("?") > -1) newUrl = url + "&" + paramsStr;else newUrl = url + "?" + paramsStr;
          } else {
            newUrl = url;
          }

          if (urls[newUrl] != null && reqparams[newUrl] == paramsStr) {
            warn("\u5730\u5740\u3010" + url + "\u3011\u5DF2\u6B63\u5728\u8BF7\u6C42\u4E2D\uFF0C\u4E0D\u80FD\u91CD\u590D\u8BF7\u6C42");
            return;
          }

          var xhr = new XMLHttpRequest(); // 防重复请求功能

          urls[newUrl] = xhr;
          reqparams[newUrl] = paramsStr;

          if (isPost) {
            xhr.open("POST", url);
          } else {
            xhr.open("GET", newUrl);
          }

          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"); // xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

          var data = {};
          data.url = url;
          data.params = params; // 请求超时

          if (isOpenTimeout) {
            xhr.timeout = timeout;

            xhr.ontimeout = function () {
              _this.deleteCache(newUrl);

              data.event = HttpEvent.TIMEOUT;
              if (errorCallback) errorCallback(data);
            };
          }

          xhr.onloadend = function (a) {
            if (xhr.status == 500) {
              _this.deleteCache(newUrl);

              if (errorCallback == null) return;
              data.event = HttpEvent.NO_NETWORK; // 断网

              if (errorCallback) errorCallback(data);
            }
          };

          xhr.onerror = function () {
            _this.deleteCache(newUrl);

            if (errorCallback == null) return;

            if (xhr.readyState == 0 || xhr.readyState == 1 || xhr.status == 0) {
              data.event = HttpEvent.NO_NETWORK; // 断网 
            } else {
              data.event = HttpEvent.UNKNOWN_ERROR; // 未知错误
            }

            if (errorCallback) errorCallback(data);
          };

          xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            _this.deleteCache(newUrl);

            if (xhr.status == 200) {
              if (completeCallback) {
                if (responseType == 'arraybuffer') {
                  // 加载非文本格式
                  xhr.responseType = responseType;
                  if (completeCallback) completeCallback(xhr.response);
                } else {
                  // 加载非文本格式
                  var data = JSON.parse(xhr.response);

                  if (data.code != null) {
                    /** 服务器错误码处理 */
                    if (data.code == 0) {
                      if (completeCallback) completeCallback(data.data);
                    } else {
                      if (errorCallback) errorCallback(data);
                    }
                  } else {
                    if (completeCallback) completeCallback(data);
                  }
                }
              }
            }
          };

          if (params == null || params == "") {
            xhr.send();
          } else {
            xhr.send(paramsStr); // 根据服务器接受数据方式做选择
            // xhr.send(JSON.stringify(params));
          }
        };

        _proto.deleteCache = function deleteCache(url) {
          delete urls[url];
          delete reqparams[url];
        };

        return HttpRequest;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IControl.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "58450TyE3JB069KO8P5+hl4", "IControl", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-06-21 12:05:14
       * @LastEditors: dgflash
       * @LastEditTime: 2022-07-20 14:04:27
       */

      /** 行为控制接口 */


      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ImageUtil.ts", ['cc'], function (exports) {
  var cclegacy, Color, Texture2D;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Texture2D = module.Texture2D;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ebdf3rRnEdIYpKgGdW8gSmZ", "ImageUtil", undefined);
      /**
       * 图像工具
       */


      var ImageUtil = exports('ImageUtil', /*#__PURE__*/function () {
        function ImageUtil() {}
        /**
         * 获取纹理中指定像素的颜色，原点为左上角，从像素 (1, 1) 开始。
         * @param texture 纹理
         * @param x x 坐标
         * @param y y 坐标
         * @example
        // 获取纹理左上角第一个像素的颜色
        const color = ImageUtil.getPixelColor(texture, 1, 1);
        cc.color(50, 100, 123, 255);
         */


        ImageUtil.getPixelColor = function getPixelColor(texture, x, y) {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.width = texture.width;
          canvas.height = texture.height;
          var image = texture.getHtmlElementObj();
          ctx.drawImage(image, 0, 0, texture.width, texture.height);
          var imageData = ctx.getImageData(0, 0, texture.width, texture.height);
          var pixelIndex = (y - 1) * texture.width * 4 + (x - 1) * 4;
          var pixelData = imageData.data.slice(pixelIndex, pixelIndex + 4);
          var color = new Color(pixelData[0], pixelData[1], pixelData[2], pixelData[3]);
          image.remove();
          canvas.remove();
          return color;
        }
        /**
         * 将图像转为 Base64 字符（仅 png、jpg 或 jpeg 格式资源）（有问题）
         * @param url 图像地址
         * @param callback 完成回调
         */
        ;

        ImageUtil.imageToBase64 = function imageToBase64(url, callback) {
          return new Promise(function (res) {
            var _exec;

            var extname = (_exec = /\.png|\.jpg|\.jpeg/.exec(url)) == null ? void 0 : _exec[0]; //@ts-ignore

            if (['.png', '.jpg', '.jpeg'].includes(extname)) {
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext('2d');
              var image = new Image();
              image.src = url;

              image.onload = function () {
                canvas.height = image.height;
                canvas.width = image.width;
                ctx.drawImage(image, 0, 0);
                extname = extname === '.jpg' ? 'jpeg' : extname.replace('.', '');
                var dataURL = canvas.toDataURL("image/" + extname);
                callback && callback(dataURL);
                res(dataURL);
                image.remove();
                canvas.remove();
              };
            } else {
              console.warn('Not a jpg/jpeg or png resource!');
              callback && callback("");
              res("");
            }
          });
        }
        /**
         * 将 Base64 字符转为 cc.Texture2D 资源（有问题）
         * @param base64 Base64 字符
         */
        ;

        ImageUtil.base64ToTexture = function base64ToTexture(base64) {
          var image = document.createElement('img');
          image.src = base64;
          var texture = new Texture2D(); //@ts-ignore

          texture.initWithElement(image);
          image.remove();
          return texture;
        }
        /**
         * 将 Base64 字符转为二进制数据（有问题）
         * @param base64 Base64 字符
         */
        ;

        ImageUtil.base64ToBlob = function base64ToBlob(base64) {
          var strings = base64.split(','); //@ts-ignore

          var type = /image\/\w+|;/.exec(strings[0])[0];
          var data = window.atob(strings[1]);
          var arrayBuffer = new ArrayBuffer(data.length);
          var uint8Array = new Uint8Array(arrayBuffer);

          for (var i = 0; i < data.length; i++) {
            uint8Array[i] = data.charCodeAt(i) & 0xff;
          }

          return new Blob([uint8Array], {
            type: type
          });
        };

        return ImageUtil;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/index.ts", ['cc', './BehaviorTree.ts', './BranchNode.ts', './Decorator.ts', './BTreeNode.ts', './Priority.ts', './Sequence.ts', './Task.ts', './Selector.ts'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      exports('BehaviorTree', module.BehaviorTree);
    }, function (module) {
      exports('BranchNode', module.BranchNode);
    }, function (module) {
      exports('Decorator', module.Decorator);
    }, function (module) {
      exports('BTreeNode', module.BTreeNode);
    }, function (module) {
      exports('Priority', module.Priority);
    }, function (module) {
      exports('Sequence', module.Sequence);
    }, function (module) {
      exports('Task', module.Task);
    }, function (module) {
      exports('Selector', module.Selector);
    }],
    execute: function () {
      cclegacy._RF.push({}, "96257XYurdITbWhyEf7Qlbn", "index", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Initialize.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ECS.ts', './InitRes.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ecs, InitResComp, InitResSystem;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ecs = module.ecs;
    }, function (module) {
      InitResComp = module.InitResComp;
      InitResSystem = module.InitResSystem;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "ffbceQs6Z9IoI5z6mt1avMw", "Initialize", undefined);
      /**
       * 游戏进入初始化模块
       * 1、热更新
       * 2、加载默认资源
       */


      var Initialize = exports('Initialize', (_dec = ecs.register('Initialize'), _dec(_class = /*#__PURE__*/function (_ecs$Entity) {
        _inheritsLoose(Initialize, _ecs$Entity);

        function Initialize() {
          return _ecs$Entity.apply(this, arguments) || this;
        }

        var _proto = Initialize.prototype;

        _proto.init = function init() {
          // 初始化游戏公共资源
          this.add(InitResComp);
        };

        return Initialize;
      }(ecs.Entity)) || _class));
      var EcsInitializeSystem = exports('EcsInitializeSystem', /*#__PURE__*/function (_ecs$System) {
        _inheritsLoose(EcsInitializeSystem, _ecs$System);

        function EcsInitializeSystem() {
          var _this;

          _this = _ecs$System.call(this) || this;

          _this.add(new InitResSystem());

          return _this;
        }

        return EcsInitializeSystem;
      }(ecs.System));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InitRes.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './AsyncQueue.ts', './ECS.ts', './GameUIConfig.ts', './LoadingViewComp.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, oops, AsyncQueue, ecs, UIID, LoadingViewComp;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      AsyncQueue = module.AsyncQueue;
    }, function (module) {
      ecs = module.ecs;
    }, function (module) {
      UIID = module.UIID;
    }, function (module) {
      LoadingViewComp = module.LoadingViewComp;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "2ee0c8+7R9EFKQb+OPn9mlk", "InitRes", undefined);
      /** 初始化游戏公共资源 */


      var InitResComp = exports('InitResComp', (_dec = ecs.register('InitRes'), _dec(_class = /*#__PURE__*/function (_ecs$Comp) {
        _inheritsLoose(InitResComp, _ecs$Comp);

        function InitResComp() {
          return _ecs$Comp.apply(this, arguments) || this;
        }

        var _proto = InitResComp.prototype;

        _proto.reset = function reset() {};

        return InitResComp;
      }(ecs.Comp)) || _class));
      var InitResSystem = exports('InitResSystem', /*#__PURE__*/function (_ecs$ComblockSystem) {
        _inheritsLoose(InitResSystem, _ecs$ComblockSystem);

        function InitResSystem() {
          return _ecs$ComblockSystem.apply(this, arguments) || this;
        }

        var _proto2 = InitResSystem.prototype;

        _proto2.filter = function filter() {
          return ecs.allOf(InitResComp);
        };

        _proto2.entityEnter = function entityEnter(e) {
          var queue = new AsyncQueue();
          /** 加载远程资源配置 */

          this.loadBundle(queue); // 加载自定义资源

          this.loadCustom(queue); // 加载多语言包加载多语言包

          this.loadLanguage(queue); // 加载公共资源

          this.loadCommon(queue); // 加载游戏内容加载进度提示界面

          this.onComplete(queue, e);
          queue.play();
        }
        /** 加载远程资源配置 */
        ;

        _proto2.loadBundle = function loadBundle(queue) {
          queue.push( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(next, params, args) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  // 设置默认加载的外部资源包名
                  oops.res.defaultBundleName = oops.config.game.bundleName; // 加载外部资源包

                  if (!oops.config.game.bundleEnable) {
                    _context.next = 7;
                    break;
                  }

                  console.log("启用远程资源运行游戏");
                  _context.next = 5;
                  return oops.res.loadBundle(oops.config.game.bundleServer, oops.config.game.bundleVersion);

                case 5:
                  _context.next = 9;
                  break;

                case 7:
                  _context.next = 9;
                  return oops.res.loadBundle(oops.config.game.bundleName);

                case 9:
                  next();

                case 10:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));
        }
        /** 加载自定义内容（可选） */
        ;

        _proto2.loadCustom = function loadCustom(queue) {
          queue.push( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(next, params, args) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  // 加载多语言对应字体
                  oops.res.load("language/font/" + oops.language.current, next);

                case 1:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          })));
        }
        /** 加载化语言包（可选） */
        ;

        _proto2.loadLanguage = function loadLanguage(queue) {
          queue.push(function (next, params, args) {
            // 设置默认语言
            var lan = oops.storage.get("language");

            if (lan == null) {
              lan = "zh";
              oops.storage.set("language", lan);
            } // 加载语言包资源


            oops.language.setLanguage(lan, next);
          });
        }
        /** 加载公共资源（必备） */
        ;

        _proto2.loadCommon = function loadCommon(queue) {
          queue.push(function (next, params, args) {
            oops.res.loadDir("common", next);
          });
        }
        /** 加载完成进入游戏内容加载界面 */
        ;

        _proto2.onComplete = function onComplete(queue, e) {
          queue.complete = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var node;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return oops.gui.openAsync(UIID.Loading);

                case 2:
                  node = _context3.sent;
                  if (node) e.add(node.getComponent(LoadingViewComp));
                  e.remove(InitResComp);

                case 5:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));
        };

        return InitResSystem;
      }(ecs.ComblockSystem));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JsonOb.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "000b00Lx19Ke4hAFc9/Qlnh", "JsonOb", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-09-01 18:00:28
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-06 17:18:05
       */

      /**
       * 实现动态绑定的核心部分，
       * 每次修改属性值，都会调用对应函数，并且获取值的路径
       */


      var OP = Object.prototype;
      var types = {
        obj: '[object Object]',
        array: '[object Array]'
      };
      var OAM = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];
      /**
       * 实现属性拦截的类
       */

      var JsonOb = exports('JsonOb', /*#__PURE__*/function () {
        function JsonOb(obj, callback) {
          this._callback = void 0;

          if (OP.toString.call(obj) !== types.obj && OP.toString.call(obj) !== types.array) {
            console.error('请传入一个对象或数组');
          }

          this._callback = callback;
          this.observe(obj);
        }

        var _proto = JsonOb.prototype;
        /**对象属性劫持 */

        _proto.observe = function observe(obj, path) {
          var _this = this;

          if (OP.toString.call(obj) === types.array) {
            this.overrideArrayProto(obj, path);
          } // @ts-ignore  注：避免API生成工具报错


          Object.keys(obj).forEach(function (key) {
            var self = _this; // @ts-ignore

            var oldVal = obj[key];
            var pathArray = path && path.slice();

            if (pathArray) {
              pathArray.push(key);
            } else {
              pathArray = [key];
            }

            Object.defineProperty(obj, key, {
              get: function get() {
                return oldVal;
              },
              set: function set(newVal) {
                //cc.log(newVal);
                if (oldVal !== newVal) {
                  if (OP.toString.call(newVal) === '[object Object]') {
                    self.observe(newVal, pathArray);
                  }

                  self._callback(newVal, oldVal, pathArray);

                  oldVal = newVal;
                }
              }
            }); // @ts-ignore

            if (OP.toString.call(obj[key]) === types.obj || OP.toString.call(obj[key]) === types.array) {
              // @ts-ignore
              _this.observe(obj[key], pathArray);
            }
          }, this);
        }
        /**
         * 对数组类型进行动态绑定
         * @param array 
         * @param path 
         */
        ;

        _proto.overrideArrayProto = function overrideArrayProto(array, path) {
          // 保存原始 Array 原型  
          var originalProto = Array.prototype; // 通过 Object.create 方法创建一个对象，该对象的原型是Array.prototype  

          var overrideProto = Object.create(Array.prototype);
          var self = this;
          var result; // 遍历要重写的数组方法  

          OAM.forEach(function (method) {
            Object.defineProperty(overrideProto, method, {
              value: function value() {
                var oldVal = this.slice(); //调用原始原型上的方法  

                result = originalProto[method].apply(this, arguments); //继续监听新数组  

                self.observe(this, path);

                self._callback(this, oldVal, path);

                return result;
              }
            });
          }); // 最后 让该数组实例的 __proto__ 属性指向 假的原型 overrideProto  

          array['__proto__'] = overrideProto;
        };

        return JsonOb;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/JsonUtil.ts", ['cc', './Oops.ts'], function (exports) {
  var cclegacy, JsonAsset, oops;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      JsonAsset = module.JsonAsset;
    }, function (module) {
      oops = module.oops;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1a24ank4nRC46jfzaIfOmtQ", "JsonUtil", undefined);
      /** 资源路径 */


      var path = "config/game/";
      /** 数据缓存 */

      var data = new Map();
      /** JSON数据表工具 */

      var JsonUtil = exports('JsonUtil', /*#__PURE__*/function () {
        function JsonUtil() {}
        /**
         * 通知资源名从缓存中获取一个Json数据表
         * @param name  资源名
         */


        JsonUtil.get = function get(name) {
          if (data.has(name)) return data.get(name);
        }
        /**
         * 通知资源名加载Json数据表
         * @param name      资源名
         * @param callback  资源加载完成回调
         */
        ;

        JsonUtil.load = function load(name, callback) {
          if (data.has(name)) callback(data.get(name));else {
            var url = path + name;
            oops.res.load(url, JsonAsset, function (err, content) {
              if (err) {
                console.warn(err.message);
                callback(null);
              } else {
                data.set(name, content.json);
                callback(content.json);
              }
            });
          }
        }
        /**
         * 异步加载Json数据表
         * @param name 资源名
         */
        ;

        JsonUtil.loadAsync = function loadAsync(name) {
          return new Promise(function (resolve, reject) {
            if (data.has(name)) {
              resolve(data.get(name));
            } else {
              var url = path + name;
              oops.res.load(url, JsonAsset, function (err, content) {
                if (err) {
                  console.warn(err.message);
                  resolve(null);
                } else {
                  data.set(name, content.json);
                  resolve(content.json);
                }
              });
            }
          });
        }
        /**
         * 通过指定资源名释放资源
         * @param name 资源名
         */
        ;

        JsonUtil.release = function release(name) {
          var url = path + name;
          data["delete"](name);
          oops.res.release(url);
        };

        return JsonUtil;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LabelChange.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LabelNumber.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, LabelNumber;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      LabelNumber = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "fff0fLwVNhNe59VirWTCPFJ", "LabelChange", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      /** 数值变化动画标签组件 */

      var LabelChange = exports('LabelChange', (_dec = ccclass("LabelChange"), _dec2 = menu('ui/label/LabelChange'), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_LabelNumber) {
        _inheritsLoose(LabelChange, _LabelNumber);

        function LabelChange() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _LabelNumber.call.apply(_LabelNumber, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "isInteger", _descriptor, _assertThisInitialized(_this));

          _this.duration = 0; // 持续时间

          _this.callback = void 0; // 完成回调

          _this.isBegin = false; // 是否开始

          _this.speed = 0; // 变化速度

          _this.end = 0;
          return _this;
        }

        var _proto = LabelChange.prototype; // 最终值

        /**
         * 变化到某值,如果从当前开始的begin传入null
         * @param {number} duration 
         * @param {number} end 
         * @param {Function} [callback]
         */

        _proto.changeTo = function changeTo(duration, end, callback) {
          if (duration == 0) {
            if (callback) callback();
            return;
          }

          this.playAnim(duration, this.num, end, callback);
        }
        /**
         * 变化值,如果从当前开始的begin传入null
         * @param {number} duration 
         * @param {number} value 
         * @param {Function} [callback] 
         * @memberof LabelChange
         */
        ;

        _proto.changeBy = function changeBy(duration, value, callback) {
          if (duration == 0) {
            if (callback) callback();
            return;
          }

          this.playAnim(duration, this.num, this.num + value, callback);
        }
        /** 立刻停止 */
        ;

        _proto.stop = function stop(excCallback) {
          if (excCallback === void 0) {
            excCallback = true;
          }

          this.num = this.end;
          this.isBegin = false;
          if (excCallback && this.callback) this.callback();
        }
        /** 播放动画 */
        ;

        _proto.playAnim = function playAnim(duration, begin, end, callback) {
          this.duration = duration;
          this.end = end;
          this.callback = callback;
          this.speed = (end - begin) / duration;
          this.num = begin;
          this.isBegin = true;
        }
        /** 是否已经结束 */
        ;

        _proto.isEnd = function isEnd(num) {
          if (this.speed > 0) {
            return num >= this.end;
          } else {
            return num <= this.end;
          }
        };

        _proto.update = function update(dt) {
          if (this.isBegin) {
            if (this.num == this.end) {
              this.isBegin = false;
              if (this.callback) this.callback();
              return;
            }

            var num = this.num + dt * this.speed;

            if (this.isInteger) {
              if (this.end < this.num) {
                num = Math.floor(num);
              } else {
                num = Math.ceil(num);
              }
            }
            /** 变化完成 */


            if (this.isEnd(num)) {
              num = this.end;
              this.isBegin = false;
              if (this.callback) this.callback();
            }

            this.num = num;
          }
        };

        return LabelChange;
      }(LabelNumber), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "isInteger", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LabelNumber.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, error, Label;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      error = module.error;
      Label = module.Label;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "f7b43F70BhPlrz4IPhZGmsL", "LabelNumber", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      /** 只能显示数字的标签组件 */

      var LabelNumber = exports('default', (_dec = ccclass("LabelNumber"), _dec2 = menu('ui/label/LabelNumber'), _dec3 = property({
        tooltip: "数字"
      }), _dec4 = property({
        tooltip: "数字"
      }), _dec5 = property({
        tooltip: "货币符号"
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Label) {
        _inheritsLoose(LabelNumber, _Label);

        function LabelNumber() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Label.call.apply(_Label, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_num", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "symbol", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LabelNumber.prototype;

        _proto.start = function start() {
          this.updateLabel();
        }
        /** 刷新文本 */
        ;

        _proto.updateLabel = function updateLabel() {
          if (typeof this._num != "number") {
            error("[LabelNumber] num不是一个合法数字");
          }

          this.string = this.num.toString() + this.symbol;
        };

        _createClass(LabelNumber, [{
          key: "num",
          get: function get() {
            return this._num;
          },
          set: function set(value) {
            this._num = value;
            this.updateLabel();
          }
        }]);

        return LabelNumber;
      }(Label), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_num", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "num", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "num"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "symbol", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LabelTime.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "57786GMN6RPbaAT9b9RmX18", "LabelTime", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var LabelTime = exports('default', (_dec = ccclass("LabelTime"), _dec2 = menu('ui/label/LabelTime'), _dec3 = property({
        tooltip: "到计时间总时间（单位秒）"
      }), _dec4 = property({
        tooltip: "天数数据格式化"
      }), _dec5 = property({
        tooltip: "时间格式化"
      }), _dec6 = property({
        tooltip: "是否有00"
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Label) {
        _inheritsLoose(LabelTime, _Label);

        function LabelTime() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Label.call.apply(_Label, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "countDown", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "dayFormat", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "timeFormat", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "zeroize", _descriptor4, _assertThisInitialized(_this));

          _this.dateDisable = void 0;
          _this.result = void 0;
          /** 每秒触发事件 */

          _this.onSecond = null;
          /** 倒计时完成事件 */

          _this.onComplete = null;
          return _this;
        }

        var _proto = LabelTime.prototype;

        _proto.replace = function replace(value) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          return value.replace(/\{(\d+)\}/g, function (m, i) {
            return args[i];
          });
        }
        /** 格式化字符串 */
        ;

        _proto.format = function format() {
          var c = this.countDown;
          var date = Math.floor(c / 86400);
          c = c - date * 86400;
          var hours = Math.floor(c / 3600);
          c = c - hours * 3600;
          var minutes = Math.floor(c / 60);
          c = c - minutes * 60;
          var seconds = c;
          this.dateDisable = this.dateDisable || false;

          if (date == 0 && hours == 0 && minutes == 0 && seconds == 0) {
            if (this.zeroize) {
              this.result = this.replace(this.timeFormat, "00", "00", "00");
            } else {
              this.result = this.replace(this.timeFormat, "0", "0", "0");
            }
          } else if (date > 0 && !this.dateDisable) {
            var dataFormat = this.dayFormat;
            var index = dataFormat.indexOf("{1}");

            if (hours == 0 && index > -1) {
              dataFormat = dataFormat.substring(0, index - 1);
            }

            var df = dataFormat;

            if (date > 1 && dataFormat.indexOf("days") < 0) {
              df = df.replace("day", "days");
            }

            if (date < 2) {
              df = df.replace("days", "day");
            }

            this.result = this.replace(df, date, hours); // 如果天大于1，则显示 "1 Day..."
          } else {
            hours += date * 24;

            if (this.zeroize) {
              this.result = this.replace(this.timeFormat, this.coverString(hours), this.coverString(minutes), this.coverString(seconds)); // 否则显示 "01:12:24"
            } else {
              this.result = this.replace(this.timeFormat, hours, minutes, seconds);
            }
          }

          this.string = this.result;
        }
        /** 个位数的时间数据将字符串补位 */
        ;

        _proto.coverString = function coverString(value) {
          if (value < 10) return "0" + value;
          return value.toString();
        }
        /** 设置时间能否由天数显示 */
        ;

        _proto.setDateDisable = function setDateDisable(flag) {
          this.dateDisable = flag;
        }
        /** 设置倒计时时间 */
        ;

        _proto.setTime = function setTime(second) {
          this.countDown = second; // 倒计时，初始化显示字符串

          this.timing_end();
          this.timing_start();
        };

        _proto.start = function start() {
          this.timing_start();
        };

        _proto.onScheduleSecond = function onScheduleSecond() {
          this.countDown--;
          this.format();
          if (this.onSecond) this.onSecond(this.node);

          if (this.countDown == 0) {
            this.onScheduleComplete();
          }
        };

        _proto.onScheduleComplete = function onScheduleComplete() {
          this.timing_end();
          if (this.onComplete) this.onComplete(this.node);
        }
        /** 开始计时 */
        ;

        _proto.timing_start = function timing_start() {
          this.schedule(this.onScheduleSecond, 1);
          this.format();
        };

        _proto.timing_end = function timing_end() {
          this.unscheduleAllCallbacks();
          this.format();
        };

        return LabelTime;
      }(Label), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "countDown", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1000;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "dayFormat", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "{0} day";
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "timeFormat", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "{0}:{1}:{2}";
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "zeroize", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Language.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EventDispatcher.ts', './Logger.ts', './LanguageData.ts', './LanguagePack.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, warn, EventDispatcher, Logger, LanguageData, LanguagePack;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      warn = module.warn;
    }, function (module) {
      EventDispatcher = module.EventDispatcher;
    }, function (module) {
      Logger = module.Logger;
    }, function (module) {
      LanguageData = module.LanguageData;
    }, function (module) {
      LanguagePack = module.LanguagePack;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3757cxZqLZObIdvP/gQ6Yuj", "Language", undefined);

      var LanguageEvent = exports('LanguageEvent', /*#__PURE__*/function (LanguageEvent) {
        LanguageEvent["CHANGE"] = "LanguageEvent.CHANGE";
        LanguageEvent["RELEASE_RES"] = "LanguageEvent.RELEASE_RES";
        return LanguageEvent;
      }({}));
      var DEFAULT_LANGUAGE = "zh";
      var LanguageManager = exports('LanguageManager', /*#__PURE__*/function (_EventDispatcher) {
        _inheritsLoose(LanguageManager, _EventDispatcher);

        function LanguageManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _EventDispatcher.call.apply(_EventDispatcher, [this].concat(args)) || this;
          _this._support = ["zh", "en", "tr"]; // 支持的语言

          _this._languagePack = new LanguagePack();
          return _this;
        }

        var _proto = LanguageManager.prototype;

        _proto.isExist = function isExist(lang) {
          return this.languages.indexOf(lang) > -1;
        }
        /**
         * 获取下一个语种
         */
        ;

        _proto.getNextLang = function getNextLang() {
          var supportLangs = this.languages;
          var index = supportLangs.indexOf(LanguageData.current);
          var newLanguage = supportLangs[(index + 1) % supportLangs.length];
          return newLanguage;
        }
        /**
         * 改变语种，会自动下载对应的语种，下载完成回调
         * @param language 
         */
        ;

        _proto.setLanguage = function setLanguage(language, callback) {
          var _this2 = this;

          if (!language) {
            language = DEFAULT_LANGUAGE;
          }

          language = language.toLowerCase();
          var index = this.languages.indexOf(language);

          if (index < 0) {
            warn("当前不支持该语种" + language + " 将自动切换到 zh 语种!");
            language = DEFAULT_LANGUAGE;
          }

          if (language === LanguageData.current) {
            callback(false);
            return;
          }

          this.loadLanguageAssets(language, function (lang) {
            Logger.logConfig("\u5F53\u524D\u8BED\u8A00\u4E3A\u3010" + language + "\u3011");
            LanguageData.current = language;

            _this2._languagePack.updateLanguage(language);

            _this2.dispatchEvent(LanguageEvent.CHANGE, lang);

            callback(true);
          });
        }
        /**
         * 根据data获取对应语种的字符
         * @param labId 
         * @param arr 
         */
        ;

        _proto.getLangByID = function getLangByID(labId) {
          return LanguageData.getLangByID(labId);
        }
        /**
         * 下载语言包素材资源
         * 包括语言json配置和语言纹理包
         * @param lang 
         * @param callback 
         */
        ;

        _proto.loadLanguageAssets = function loadLanguageAssets(lang, callback) {
          lang = lang.toLowerCase();
          return this._languagePack.loadLanguageAssets(lang, callback);
        }
        /**
         * 释放不需要的语言包资源
         * @param lang 
         */
        ;

        _proto.releaseLanguageAssets = function releaseLanguageAssets(lang) {
          lang = lang.toLowerCase();

          this._languagePack.releaseLanguageAssets(lang);

          this.dispatchEvent(LanguageEvent.RELEASE_RES, lang);
        };

        _createClass(LanguageManager, [{
          key: "supportLanguages",
          set: // 语言包  

          /** 设置多语言系统支持哪些语种 */
          function set(supportLanguages) {
            this._support = supportLanguages;
          }
          /** 语言包 */

        }, {
          key: "pack",
          get: function get() {
            return this._languagePack;
          }
          /**
           * 获取当前语种
           */

        }, {
          key: "current",
          get: function get() {
            return LanguageData.current;
          }
          /**
           * 获取支持的多语种数组
           */

        }, {
          key: "languages",
          get: function get() {
            return this._support;
          }
        }]);

        return LanguageManager;
      }(EventDispatcher));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LanguageData.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "27fb3sjD81JlIP2KFTSWUp4", "LanguageData", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-02-11 09:31:52
       * @LastEditors: dgflash
       * @LastEditTime: 2023-08-22 16:37:40
       */


      var LanguageData = exports('LanguageData', /*#__PURE__*/function () {
        function LanguageData() {}
        /** 
         * 通过多语言关键字获取语言文本 
         * 
         * 注：
         * 
         * 1、先获取language/json中的配置数据，如果没有者获取config/game/Language配置表中的多语言数据
         * 
         * 2、config/game/Language配置表可选使用，不用时不创建同名配置表即可
         * 
         * 3、config/game/Language配置表使用oops-plugin-excel-to-json插件生成，点击项目根目录下载update-oops-plugin-framework.bat或update-oops-plugin-framework.sh脚本下载插件
         */


        LanguageData.getLangByID = function getLangByID(labId) {
          var text = this.json[labId];

          if (text) {
            return text;
          }

          if (this.excel) {
            var record = this.excel[labId];

            if (record) {
              return record[this.current];
            }
          }

          return labId;
        };

        return LanguageData;
      }());
      /** 当前语言 */

      LanguageData.current = "";
      /** 语言JSON配置数据 */

      LanguageData.json = {};
      /** 语言EXCEL中的配置数据 */

      LanguageData.excel = null;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LanguageLabel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './LanguageData.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, _inheritsLoose, _assertThisInitialized, _createClass, cclegacy, _decorator, CCString, Label, RichText, TTFFont, warn, Component, oops, LanguageData;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      Label = module.Label;
      RichText = module.RichText;
      TTFFont = module.TTFFont;
      warn = module.warn;
      Component = module.Component;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      LanguageData = module.LanguageData;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class4, _class5, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "110c8vEd5NEPL/N9meGQnaX", "LanguageLabel", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var LangLabelParamsItem = exports('LangLabelParamsItem', (_dec = ccclass("LangLabelParamsItem"), _dec(_class = (_class2 = function LangLabelParamsItem() {
        _initializerDefineProperty(this, "key", _descriptor, this);

        _initializerDefineProperty(this, "value", _descriptor2, this);
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "key", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      })), _class2)) || _class));
      var LanguageLabel = exports('LanguageLabel', (_dec2 = ccclass("LanguageLabel"), _dec3 = menu('ui/language/LanguageLabel'), _dec4 = property({
        type: LangLabelParamsItem,
        displayName: "params"
      }), _dec5 = property({
        type: LangLabelParamsItem,
        displayName: "params"
      }), _dec6 = property({
        serializable: true
      }), _dec7 = property({
        type: CCString,
        serializable: true
      }), _dec2(_class4 = _dec3(_class4 = (_class5 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LanguageLabel, _Component);

        function LanguageLabel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_params", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_dataID", _descriptor4, _assertThisInitialized(_this));
          /** 初始字体尺寸 */


          _this.initFontSize = 0;
          _this._needUpdate = false;
          return _this;
        }

        var _proto = LanguageLabel.prototype;
        /** 更新语言 */

        _proto.language = function language() {
          this._needUpdate = true;
        };

        _proto.onLoad = function onLoad() {
          this._needUpdate = true;
        }
        /**
         * 修改多语言参数，采用惰性求值策略
         * @param key 对于i18n表里面的key值
         * @param value 替换的文本
         */
        ;

        _proto.setVars = function setVars(key, value) {
          var haskey = false;

          for (var i = 0; i < this._params.length; i++) {
            var element = this._params[i];

            if (element.key === key) {
              element.value = value;
              haskey = true;
            }
          }

          if (!haskey) {
            var ii = new LangLabelParamsItem();
            ii.key = key;
            ii.value = value;

            this._params.push(ii);
          }

          this._needUpdate = true;
        };

        _proto.update = function update() {
          if (this._needUpdate) {
            this.updateContent();
            this._needUpdate = false;
          }
        };

        _proto.updateContent = function updateContent() {
          var label = this.getComponent(Label);
          var richtext = this.getComponent(RichText);
          var path = oops.language.pack.json + "/" + oops.language.current;
          var font = oops.res.get(path, TTFFont);

          if (label) {
            if (font && !label.useSystemFont) {
              label.font = font;
            }

            label.string = this.string;
            this.initFontSize = label.fontSize;
          } else if (richtext) {
            if (font && !richtext.useSystemFont) {
              richtext.font = font;
            }

            this.initFontSize = richtext.fontSize;
            richtext.string = this.string;
            this.initFontSize = richtext.fontSize;
          } else {
            warn("[LanguageLabel], 该节点没有cc.Label || cc.RichText组件");
          }
        };

        _createClass(LanguageLabel, [{
          key: "params",
          get: function get() {
            return this._params || [];
          },
          set: function set(value) {
            this._params = value;
            {
              this._needUpdate = true;
            }
          }
        }, {
          key: "dataID",
          get: function get() {
            return this._dataID || "";
          },
          set: function set(value) {
            this._dataID = value;
            {
              this._needUpdate = true;
            }
          }
        }, {
          key: "string",
          get: function get() {
            var _string = LanguageData.getLangByID(this._dataID);

            if (_string && this._params.length > 0) {
              this._params.forEach(function (item) {
                _string = _string.replace("%{" + item.key + "}", item.value);
              });
            }

            if (!_string) {
              warn("[LanguageLabel] 未找到语言标识，使用dataID替换");
              _string = this._dataID;
            }

            return _string;
          }
        }]);

        return LanguageLabel;
      }(Component), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "_params", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _applyDecoratedDescriptor(_class5.prototype, "params", [_dec5], Object.getOwnPropertyDescriptor(_class5.prototype, "params"), _class5.prototype), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "_dataID", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _applyDecoratedDescriptor(_class5.prototype, "dataID", [_dec7], Object.getOwnPropertyDescriptor(_class5.prototype, "dataID"), _class5.prototype)), _class5)) || _class4) || _class4));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LanguagePack.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Logger.ts', './Oops.ts', './JsonUtil.ts', './LanguageData.ts', './LanguageLabel.ts', './LanguageSpine.ts', './LanguageSprite.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, director, error, JsonAsset, TTFFont, Logger, oops, JsonUtil, LanguageData, LanguageLabel, LanguageSpine, LanguageSprite;

  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
      error = module.error;
      JsonAsset = module.JsonAsset;
      TTFFont = module.TTFFont;
    }, function (module) {
      Logger = module.Logger;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      JsonUtil = module.JsonUtil;
    }, function (module) {
      LanguageData = module.LanguageData;
    }, function (module) {
      LanguageLabel = module.LanguageLabel;
    }, function (module) {
      LanguageSpine = module.LanguageSpine;
    }, function (module) {
      LanguageSprite = module.LanguageSprite;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2ffebyj59xIc4v4BZty8SDm", "LanguagePack", undefined);

      var LanguagePack = exports('LanguagePack', /*#__PURE__*/function () {
        function LanguagePack() {
          /** JSON资源目录 */
          this.json = "language/json";
          /** 纹理资源目录 */

          this.texture = "language/texture";
          /** SPINE资源目录 */

          this.spine = "language/spine";
        }

        var _proto = LanguagePack.prototype;
        /**
         * 刷新语言文字
         * @param lang 
         */

        _proto.updateLanguage = function updateLanguage(lang) {
          var rootNodes = director.getScene().children;

          for (var i = 0; i < rootNodes.length; ++i) {
            // 更新所有的LanguageLabel节点
            var labels = rootNodes[i].getComponentsInChildren(LanguageLabel);

            for (var j = 0; j < labels.length; j++) {
              labels[j].language();
            } // 更新所有的LanguageSprite节点


            var sprites = rootNodes[i].getComponentsInChildren(LanguageSprite);

            for (var _j = 0; _j < sprites.length; _j++) {
              sprites[_j].language();
            } // 更新所有的LanguageSpine节点


            var spines = rootNodes[i].getComponentsInChildren(LanguageSpine);

            for (var _j2 = 0; _j2 < spines.length; _j2++) {
              spines[_j2].language();
            }
          }
        }
        /**
         * 下载对应语言包资源
         * @param lang 语言标识
         * @param callback 下载完成回调
         */
        ;

        _proto.loadLanguageAssets = /*#__PURE__*/function () {
          var _loadLanguageAssets = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(lang, callback) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.loadTexture(lang);

                case 2:
                  _context.next = 4;
                  return this.loadSpine(lang);

                case 4:
                  _context.next = 6;
                  return this.loadJson(lang);

                case 6:
                  _context.next = 8;
                  return this.loadTable(lang);

                case 8:
                  callback(lang);

                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function loadLanguageAssets(_x, _x2) {
            return _loadLanguageAssets.apply(this, arguments);
          }

          return loadLanguageAssets;
        }()
        /** 多语言Excel配置表数据 */
        ;

        _proto.loadTable = function loadTable(lang) {
          return new Promise( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return JsonUtil.loadAsync("Language");

                case 2:
                  LanguageData.excel = _context2.sent;

                  if (LanguageData.excel) {
                    Logger.logConfig("config/game/Language", "下载语言包 excel 资源");
                  }

                  resolve(null);

                case 5:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          })));
        }
        /** 纹理多语言资源 */
        ;

        _proto.loadTexture = function loadTexture(lang) {
          var _this = this;

          return new Promise(function (resolve, reject) {
            var path = _this.texture + "/" + lang;
            oops.res.loadDir(path, function (err, assets) {
              if (err) {
                error(err);
                resolve(null);
                return;
              }

              Logger.logConfig(path, "下载语言包 textures 资源");
              resolve(null);
            });
          });
        }
        /** Json格式多语言资源 */
        ;

        _proto.loadJson = function loadJson(lang) {
          var _this2 = this;

          return new Promise(function (resolve, reject) {
            var path = _this2.json + "/" + lang;
            oops.res.load(path, JsonAsset, function (err, asste) {
              if (err) {
                error(err);
                resolve(null);
                return;
              }

              LanguageData.json = asste.json;
              Logger.logConfig(path, "下载语言包 json 资源");
              oops.res.load(path, TTFFont, function (err) {
                if (err == null) Logger.logConfig(path, "下载语言包 ttf 资源");
                resolve(null);
              });
            });
          });
        }
        /** SPINE动画多语言资源 */
        ;

        _proto.loadSpine = function loadSpine(lang) {
          var _this3 = this;

          return new Promise(function (resolve, reject) {
            var path = _this3.spine + "/" + lang;
            oops.res.loadDir(path, function (err, assets) {
              if (err) {
                error(err);
                resolve(null);
                return;
              }

              Logger.logConfig(path, "下载语言包 spine 资源");
              resolve(null);
            });
          });
        }
        /**
         * 释放某个语言的语言包资源包括json
         * @param lang 
         */
        ;

        _proto.releaseLanguageAssets = function releaseLanguageAssets(lang) {
          var langTexture = this.texture + "/" + lang;
          oops.res.releaseDir(langTexture);
          Logger.logView(langTexture, "释放语言 texture 资源");
          var langJson = this.json + "/" + lang;
          oops.res.release(langJson);
          Logger.logView(langJson, "释放语言文字资源");
          var langSpine = this.spine + "/" + lang;
          oops.res.release(langSpine);
          Logger.logView(langSpine, "释放语言 spine 资源");
        };

        return LanguagePack;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LanguageSpine.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './LanguageData.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, CCString, sp, Component, oops, LanguageData;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      sp = module.sp;
      Component = module.Component;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      LanguageData = module.LanguageData;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "53e25hqV6VEJqayXfz6Qam2", "LanguageSpine", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var LanguageSpine = exports('LanguageSpine', (_dec = ccclass("LanguageSpine"), _dec2 = menu('ui/language/LanguageSpine'), _dec3 = property({
        serializable: true
      }), _dec4 = property({
        type: CCString,
        serializable: true
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LanguageSpine, _Component);

        function LanguageSpine() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_dataID", _descriptor, _assertThisInitialized(_this));
          /** 默认动画名 */


          _this._defaultAnimation = "";
          return _this;
        }

        var _proto = LanguageSpine.prototype;

        _proto.onLoad = function onLoad() {
          var spine = this.getComponent(sp.Skeleton);
          this._defaultAnimation = spine.animation;
        };

        _proto.start = function start() {
          this.updateSpine();
        }
        /** 更新语言 */
        ;

        _proto.language = function language() {
          this.updateSpine();
        };

        _proto.updateSpine = function updateSpine() {
          // 获取语言标记
          var path = "language/spine/" + LanguageData.current + "/" + this.dataID;
          var res = oops.res.get(path, sp.SkeletonData);

          if (res) {
            var spine = this.getComponent(sp.Skeleton);
            spine.skeletonData = res;
            spine.setAnimation(0, this._defaultAnimation, true);
          } else {
            console.error("[LanguageSpine] 资源不存在 " + path);
          }
        };

        _createClass(LanguageSpine, [{
          key: "dataID",
          get: function get() {
            return this._dataID || "";
          },
          set: function set(value) {
            this._dataID = value;
            {
              this.updateSpine();
            }
          }
        }]);

        return LanguageSpine;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_dataID", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "dataID", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "dataID"), _class2.prototype)), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LanguageSprite.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './LanguageData.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, CCString, SpriteFrame, Sprite, UITransform, Component, oops, LanguageData;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      LanguageData = module.LanguageData;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "11b96k/RIZF57Loehxyl6Hs", "LanguageSprite", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var LanguageSprite = exports('LanguageSprite', (_dec = ccclass("LanguageSprite"), _dec2 = menu('ui/language/LanguageSprite'), _dec3 = property({
        serializable: true
      }), _dec4 = property({
        type: CCString,
        serializable: true
      }), _dec5 = property({
        tooltip: "是否设置为图片原始资源大小"
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LanguageSprite, _Component);

        function LanguageSprite() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_dataID", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "isRawSize", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LanguageSprite.prototype;

        _proto.start = function start() {
          this.updateSprite();
        }
        /** 更新语言 */
        ;

        _proto.language = function language() {
          this.updateSprite();
        };

        _proto.updateSprite = function updateSprite() {
          // 获取语言标记
          var path = "language/texture/" + LanguageData.current + "/" + this.dataID + "/spriteFrame";
          var res = oops.res.get(path, SpriteFrame);

          if (res) {
            var spcomp = this.getComponent(Sprite);
            spcomp.spriteFrame = res;
            /** 修改节点为原始图片资源大小 */

            if (this.isRawSize) {
              var _spcomp$getComponent; //@ts-ignore


              var rawSize = res._originalSize;
              (_spcomp$getComponent = spcomp.getComponent(UITransform)) == null ? void 0 : _spcomp$getComponent.setContentSize(rawSize);
            }
          } else {
            console.error("[LanguageSprite] 资源不存在 " + path);
          }
        };

        _createClass(LanguageSprite, [{
          key: "dataID",
          get: function get() {
            return this._dataID || "";
          },
          set: function set(value) {
            this._dataID = value;
            {
              this.updateSprite();
            }
          }
        }]);

        return LanguageSprite;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_dataID", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "dataID", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "dataID"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isRawSize", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayerDialog.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Defines.ts', './LayerPopup.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ViewParams, LayerPopUp;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ViewParams = module.ViewParams;
    }, function (module) {
      LayerPopUp = module.LayerPopUp;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dcad5w8wHlEDJpIKJ4gUxEP", "LayerDialog", undefined);
      /** 模式弹窗数据 */

      /*
       * 模式弹窗层，该层的窗口同时只能显示一个，删除以后会自动从队列当中取一个弹窗，直到队列为空
       */


      var LayerDialog = exports('LayerDialog', /*#__PURE__*/function (_LayerPopUp) {
        _inheritsLoose(LayerDialog, _LayerPopUp);

        function LayerDialog() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _LayerPopUp.call.apply(_LayerPopUp, [this].concat(args)) || this;
          /** 窗口调用参数队列 */

          _this.params = [];
          /** 当前窗口数据 */

          _this.current = void 0;
          return _this;
        }

        var _proto = LayerDialog.prototype;

        _proto.add = function add(config, params, callbacks) {
          this.black.enabled = true;

          if (this.current && this.current.valid) {
            var uuid = this.getUuid(config.prefab);
            this.params.push({
              config: config,
              params: params,
              callbacks: callbacks
            });
            return uuid;
          }

          return this.show(config, params, callbacks);
        };

        _proto.show = function show(config, params, callbacks) {
          var _this2 = this;

          var prefabPath = config.prefab;
          var uuid = this.getUuid(prefabPath);
          var viewParams = this.ui_nodes.get(uuid);

          if (viewParams == null) {
            viewParams = new ViewParams();
            viewParams.uuid = this.getUuid(prefabPath);
            viewParams.prefabPath = prefabPath;
            viewParams.valid = true;
            this.ui_nodes.set(viewParams.uuid, viewParams);
          }

          viewParams.callbacks = callbacks != null ? callbacks : {};
          var onRemove_Source = viewParams.callbacks.onRemoved;

          viewParams.callbacks.onRemoved = function (node, params) {
            if (onRemove_Source) {
              onRemove_Source(node, params);
            }

            setTimeout(function () {
              _this2.next();
            }, 0);
          };

          viewParams.params = params || {};
          this.current = viewParams;
          this.load(viewParams, config.bundle);
          return uuid;
        };

        _proto.setBlackDisable = function setBlackDisable() {
          if (this.params.length == 0) this.black.enabled = false;
        };

        _proto.next = function next() {
          if (this.params.length > 0) {
            var param = this.params.shift();
            this.show(param.config, param.params, param.callbacks);
          }
        };

        return LayerDialog;
      }(LayerPopUp));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayerManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GUI.ts', './DelegateComponent.ts', './LayerDialog.ts', './LayerNotify.ts', './LayerPopup.ts', './LayerUI.ts', './UIMap.ts'], function (exports) {
  var _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, warn, Node, Layers, Widget, Camera, GUI, DelegateComponent, LayerDialog, LayerNotify, LayerPopUp, LayerUI, UIMap;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      warn = module.warn;
      Node = module.Node;
      Layers = module.Layers;
      Widget = module.Widget;
      Camera = module.Camera;
    }, function (module) {
      GUI = module.GUI;
    }, function (module) {
      DelegateComponent = module.DelegateComponent;
    }, function (module) {
      LayerDialog = module.LayerDialog;
    }, function (module) {
      LayerNotify = module.LayerNotify;
    }, function (module) {
      LayerPopUp = module.LayerPopUp;
    }, function (module) {
      LayerUI = module.LayerUI;
    }, function (module) {
      UIMap = module.UIMap;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7ba675xFGdHqIOykTysNzEu", "LayerManager", undefined);
      /** 界面层类型 */


      var LayerType = exports('LayerType', /*#__PURE__*/function (LayerType) {
        LayerType["Game"] = "LayerGame";
        LayerType["UI"] = "LayerUI";
        LayerType["PopUp"] = "LayerPopUp";
        LayerType["Dialog"] = "LayerDialog";
        LayerType["System"] = "LayerSystem";
        LayerType["Notify"] = "LayerNotify";
        LayerType["Guide"] = "LayerGuide";
        return LayerType;
      }({}));
      /** 
       * 界面配置结构体
       * @example
      // 界面唯一标识
      export enum UIID {
          Loading = 1,
          Window,
          Netinstable
      }
        // 打开界面方式的配置数据
      export var UIConfigData: { [key: number]: UIConfig } = {
          [UIID.Loading]: { layer: LayerType.UI, prefab: "loading/prefab/loading", bundle: "resources" },
          [UIID.Netinstable]: { layer: LayerType.PopUp, prefab: "common/prefab/netinstable" },
          [UIID.Window]: { layer: LayerType.Dialog, prefab: "common/prefab/window" }
      }
       */

      var LayerManager = exports('LayerManager', /*#__PURE__*/function () {
        var _proto = LayerManager.prototype;
        /**
         * 初始化所有UI的配置对象
         * @param configs 配置对象
         */

        _proto.init = function init(configs) {
          this.configs = configs;
        }
        /**
         * 渐隐飘过提示
         * @param content 文本表示
         * @param useI18n 是否使用多语言
         * @example 
         * oops.gui.toast("提示内容");
         */
        ;

        _proto.toast = function toast(content, useI18n) {
          if (useI18n === void 0) {
            useI18n = false;
          }

          this.notify.show(content, useI18n);
        }
        /**
         * 设置界面配置
         * @param uiId   要设置的界面id
         * @param config 要设置的配置
         */
        ;

        _proto.setConfig = function setConfig(uiId, config) {
          this.configs[uiId] = config;
        }
        /**
         * 设置界面地图配置
         * @param data 界面地图数据
         */
        ;

        _proto.setUIMap = function setUIMap(data) {
          if (this.uiMap == null) {
            this.uiMap = new UIMap();
          }

          this.uiMap.init(this, data);
        }
        /**
         * 同步打开一个窗口
         * @param uiId          窗口唯一编号
         * @param uiArgs        窗口参数
         * @param callbacks     回调对象
         * @example
        var uic: UICallbacks = {
            onAdded: (node: Node, params: any) => {
                var comp = node.getComponent(LoadingViewComp) as ecs.Comp;
            }
            onRemoved:(node: Node | null, params: any) => {
                        
            }
        };
        oops.gui.open(UIID.Loading, null, uic);
         */
        ;

        _proto.open = function open(uiId, uiArgs, callbacks) {
          if (uiArgs === void 0) {
            uiArgs = null;
          }

          var config = this.configs[uiId];

          if (config == null) {
            warn("\u6253\u5F00\u7F16\u53F7\u4E3A\u3010" + uiId + "\u3011\u7684\u754C\u9762\u5931\u8D25\uFF0C\u914D\u7F6E\u4FE1\u606F\u4E0D\u5B58\u5728");
            return;
          }

          switch (config.layer) {
            case LayerType.UI:
              this.ui.add(config, uiArgs, callbacks);
              break;

            case LayerType.PopUp:
              this.popup.add(config, uiArgs, callbacks);
              break;

            case LayerType.Dialog:
              this.dialog.add(config, uiArgs, callbacks);
              break;

            case LayerType.System:
              this.system.add(config, uiArgs, callbacks);
              break;
          }
        }
        /**
         * 异步打开一个窗口
         * @param uiId          窗口唯一编号
         * @param uiArgs        窗口参数
         * @example 
         * var node = await oops.gui.openAsync(UIID.Loading);
         */
        ;

        _proto.openAsync = /*#__PURE__*/function () {
          var _openAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(uiId, uiArgs) {
            var _this = this;

            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (uiArgs === void 0) {
                    uiArgs = null;
                  }

                  return _context.abrupt("return", new Promise(function (resolve, reject) {
                    var callbacks = {
                      onAdded: function onAdded(node, params) {
                        resolve(node);
                      }
                    };

                    _this.open(uiId, uiArgs, callbacks);
                  }));

                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));

          function openAsync(_x, _x2) {
            return _openAsync.apply(this, arguments);
          }

          return openAsync;
        }()
        /**
         * 缓存中是否存在指定标识的窗口
         * @param uiId 窗口唯一标识
         * @example
         * oops.gui.has(UIID.Loading);
         */
        ;

        _proto.has = function has(uiId) {
          var config = this.configs[uiId];

          if (config == null) {
            warn("\u7F16\u53F7\u4E3A\u3010" + uiId + "\u3011\u7684\u754C\u9762\u5931\u8D25\uFF0C\u914D\u7F6E\u4FE1\u606F\u4E0D\u5B58\u5728");
            return false;
          }

          var result = false;

          switch (config.layer) {
            case LayerType.UI:
              result = this.ui.has(config.prefab);
              break;

            case LayerType.PopUp:
              result = this.popup.has(config.prefab);
              break;

            case LayerType.Dialog:
              result = this.dialog.has(config.prefab);
              break;

            case LayerType.System:
              result = this.system.has(config.prefab);
              break;
          }

          return result;
        }
        /**
         * 移除指定标识的窗口
         * @param uiId         窗口唯一标识
         * @param isDestroy    移除后是否释放
         * @example
         * oops.gui.remove(UIID.Loading);
         */
        ;

        _proto.remove = function remove(uiId, isDestroy) {
          if (isDestroy === void 0) {
            isDestroy = true;
          }

          var config = this.configs[uiId];

          if (config == null) {
            warn("\u5220\u9664\u7F16\u53F7\u4E3A\u3010" + uiId + "\u3011\u7684\u754C\u9762\u5931\u8D25\uFF0C\u914D\u7F6E\u4FE1\u606F\u4E0D\u5B58\u5728");
            return;
          }

          switch (config.layer) {
            case LayerType.UI:
              this.ui.remove(config.prefab, isDestroy);
              break;

            case LayerType.PopUp:
              this.popup.remove(config.prefab, isDestroy);
              break;

            case LayerType.Dialog:
              this.dialog.remove(config.prefab, isDestroy);
              break;

            case LayerType.System:
              this.system.remove(config.prefab, isDestroy);
              break;
          }
        }
        /**
         * 删除一个通过this框架添加进来的节点
         * @param node          窗口节点
         * @param isDestroy     移除后是否释放
         * @example
         * oops.gui.removeByNode(cc.Node);
         */
        ;

        _proto.removeByNode = function removeByNode(node, isDestroy) {
          if (isDestroy === void 0) {
            isDestroy = false;
          }

          if (node instanceof Node) {
            var comp = node.getComponent(DelegateComponent);

            if (comp && comp.viewParams) {
              // @ts-ignore 注：不对外使用
              node.parent.removeByUuid(comp.viewParams.uuid, isDestroy);
            } else {
              warn("\u5F53\u524D\u5220\u9664\u7684node\u4E0D\u662F\u901A\u8FC7\u754C\u9762\u7BA1\u7406\u5668\u6DFB\u52A0\u5230\u821E\u53F0\u4E0A");
              node.destroy();
            }
          }
        }
        /**
         * 清除所有窗口
         * @param isDestroy 移除后是否释放
         * @example
         * oops.gui.clear();
         */
        ;

        _proto.clear = function clear(isDestroy) {
          if (isDestroy === void 0) {
            isDestroy = false;
          }

          this.ui.clear(isDestroy);
          this.popup.clear(isDestroy);
          this.dialog.clear(isDestroy);
          this.system.clear(isDestroy);
        }
        /**
         * 构造函数
         * @param root  界面根节点
         */
        ;

        function LayerManager(root) {
          /** 界面根节点 */
          this.root = void 0;
          /** 界面摄像机 */

          this.camera = void 0;
          /** 游戏界面特效层 */

          this.game = void 0;
          /** 新手引导层 */

          this.guide = void 0;
          /** 界面地图 */

          this.uiMap = void 0;
          /** 界面层 */

          this.ui = void 0;
          /** 弹窗层 */

          this.popup = void 0;
          /** 只能弹出一个的弹窗 */

          this.dialog = void 0;
          /** 游戏系统提示弹窗  */

          this.system = void 0;
          /** 消息提示控制器，请使用show方法来显示 */

          this.notify = void 0;
          /** UI配置 */

          this.configs = {};
          this.root = root;
          this.camera = this.root.getComponentInChildren(Camera);
          this.game = this.create_node(LayerType.Game);
          this.ui = new LayerUI(LayerType.UI);
          this.popup = new LayerPopUp(LayerType.PopUp);
          this.dialog = new LayerDialog(LayerType.Dialog);
          this.system = new LayerDialog(LayerType.System);
          this.notify = new LayerNotify(LayerType.Notify);
          this.guide = this.create_node(LayerType.Guide);
          root.addChild(this.game);
          root.addChild(this.ui);
          root.addChild(this.popup);
          root.addChild(this.dialog);
          root.addChild(this.system);
          root.addChild(this.notify);
          root.addChild(this.guide);
        }

        _proto.create_node = function create_node(name) {
          var node = new Node(name);
          node.layer = Layers.Enum.UI_2D;
          var w = node.addComponent(Widget);
          w.isAlignLeft = w.isAlignRight = w.isAlignTop = w.isAlignBottom = true;
          w.left = w.right = w.top = w.bottom = 0;
          w.alignMode = 2;
          w.enabled = true;
          return node;
        };

        _createClass(LayerManager, [{
          key: "portrait",
          get:
          /** 是否为竖屏显示 */
          function get() {
            return this.root.getComponent(GUI).portrait;
          }
        }]);

        return LayerManager;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayerNotify.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './Notify.ts', './Defines.ts', './DelegateComponent.ts', './LayerUI.ts'], function (exports) {
  var _inheritsLoose, cclegacy, error, instantiate, oops, Notify, ViewParams, DelegateComponent, LayerUI;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      error = module.error;
      instantiate = module.instantiate;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      Notify = module.Notify;
    }, function (module) {
      ViewParams = module.ViewParams;
    }, function (module) {
      DelegateComponent = module.DelegateComponent;
    }, function (module) {
      LayerUI = module.LayerUI;
    }],
    execute: function () {
      cclegacy._RF.push({}, "da14ax+B2xNsL2taQFOh7we", "LayerNotify", undefined);

      var ToastPrefabPath = 'common/prefab/notify';
      /*
       * 滚动消息提示层
       */

      var LayerNotify = exports('LayerNotify', /*#__PURE__*/function (_LayerUI) {
        _inheritsLoose(LayerNotify, _LayerUI);

        function LayerNotify() {
          return _LayerUI.apply(this, arguments) || this;
        }

        var _proto = LayerNotify.prototype;
        /**
         * 显示toast
         * @param content 文本表示
         * @param useI18n 是否使用多语言
         */

        _proto.show = function show(content, useI18n) {
          var viewParams = new ViewParams();
          viewParams.uuid = this.getUuid(ToastPrefabPath);
          viewParams.prefabPath = ToastPrefabPath;
          viewParams.params = {
            content: content,
            useI18n: useI18n
          };
          viewParams.callbacks = {};
          viewParams.valid = true;
          this.ui_nodes.set(viewParams.uuid, viewParams);
          this.load(viewParams);
        };

        _proto.load = function load(viewParams) {
          var _this = this; // 获取预制件资源


          oops.res.load(viewParams.prefabPath, function (err, res) {
            if (err) {
              error(err);
            }

            var childNode = instantiate(res);
            viewParams.node = childNode;
            var comp = childNode.addComponent(DelegateComponent);
            comp.viewParams = viewParams;

            _this.createNode(viewParams);
          });
        };

        _proto.createNode = function createNode(viewParams) {
          var childNode = _LayerUI.prototype.createNode.call(this, viewParams);

          var toastCom = childNode.getComponent(Notify);
          childNode.active = true;
          toastCom.toast(viewParams.params.content, viewParams.params.useI18n);
          return childNode;
        };

        return LayerNotify;
      }(LayerUI));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayerPopup.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LayerUI.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Layers, BlockInputEvents, LayerUI;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Layers = module.Layers;
      BlockInputEvents = module.BlockInputEvents;
    }, function (module) {
      LayerUI = module.LayerUI;
    }],
    execute: function () {
      cclegacy._RF.push({}, "25d07BQBCFADaSsh/I3GrTX", "LayerPopup", undefined);
      /*
       * 弹窗层，允许同时弹出多个窗口，弹框参数可以查看 PopViewParams
       */


      var LayerPopUp = exports('LayerPopUp', /*#__PURE__*/function (_LayerUI) {
        _inheritsLoose(LayerPopUp, _LayerUI);

        function LayerPopUp(name) {
          var _this;

          _this = _LayerUI.call(this, name) || this;
          _this.black = void 0;

          _this.init();

          return _this;
        }

        var _proto = LayerPopUp.prototype;

        _proto.init = function init() {
          this.layer = Layers.Enum.UI_2D;
          this.black = this.addComponent(BlockInputEvents);
          this.black.enabled = false;
        }
        /**
         * 添加一个预制件节点到PopUp层容器中，该方法将返回一个唯一uuid来标识该操作节点
         * @param prefabPath 预制件路径
         * @param params     传给组件onAdded、onRemoved方法的参数。
         * @param popParams  弹出界面的设置定义，详情见PopViewParams
         */
        ;

        _proto.add = function add(config, params, popParams) {
          this.black.enabled = true;
          return _LayerUI.prototype.add.call(this, config, params, popParams);
        };

        _proto.remove = function remove(prefabPath, isDestroy) {
          _LayerUI.prototype.remove.call(this, prefabPath, isDestroy);

          this.setBlackDisable();
        };

        _proto.removeByUuid = function removeByUuid(prefabPath, isDestroy) {
          _LayerUI.prototype.removeByUuid.call(this, prefabPath, isDestroy);

          this.setBlackDisable();
        };

        _proto.setBlackDisable = function setBlackDisable() {
          this.black.enabled = false;
        };

        _proto.clear = function clear(isDestroy) {
          _LayerUI.prototype.clear.call(this, isDestroy);

          this.black.enabled = false;
          this.active = false;
        };

        return LayerPopUp;
      }(LayerUI));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayerUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './Defines.ts', './DelegateComponent.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, warn, error, instantiate, isValid, Widget, Node, oops, ViewParams, DelegateComponent;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      warn = module.warn;
      error = module.error;
      instantiate = module.instantiate;
      isValid = module.isValid;
      Widget = module.Widget;
      Node = module.Node;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      ViewParams = module.ViewParams;
    }, function (module) {
      DelegateComponent = module.DelegateComponent;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bc8b86Br9dGeKxeLijkyJKE", "LayerUI", undefined);
      /** 界面层对象 */


      var LayerUI = exports('LayerUI', /*#__PURE__*/function (_Node) {
        _inheritsLoose(LayerUI, _Node);
        /**
         * UI基础层，允许添加多个预制件节点
         * @param name 该层名
         * @param container 容器Node
         */


        function LayerUI(name) {
          var _this;

          _this = _Node.call(this, name) || this;
          /** 界面节点集合 */

          _this.ui_nodes = new Map();
          /** 被移除的界面缓存数据 */

          _this.ui_cache = new Map();

          var widget = _this.addComponent(Widget);

          widget.isAlignLeft = widget.isAlignRight = widget.isAlignTop = widget.isAlignBottom = true;
          widget.left = widget.right = widget.top = widget.bottom = 0;
          widget.alignMode = 2;
          widget.enabled = true;
          return _this;
        }
        /** 构造一个唯一标识UUID */


        var _proto = LayerUI.prototype;

        _proto.getUuid = function getUuid(prefabPath) {
          var uuid = this.name + "_" + prefabPath;
          return uuid.replace(/\//g, "_");
        }
        /**
         * 添加一个预制件节点到层容器中，该方法将返回一个唯一`uuid`来标识该操作节点
         * @param prefabPath 预制件路径
         * @param params     自定义参数
         * @param callbacks  回调函数对象，可选
         */
        ;

        _proto.add = function add(config, params, callbacks) {
          var prefabPath = config.prefab;
          var uuid = this.getUuid(prefabPath);
          var viewParams = this.ui_nodes.get(uuid);

          if (viewParams && viewParams.valid) {
            warn("\u8DEF\u5F84\u4E3A\u3010" + prefabPath + "\u3011\u7684\u9884\u5236\u91CD\u590D\u52A0\u8F7D");
            return "";
          }

          if (viewParams == null) {
            viewParams = new ViewParams();
            viewParams.uuid = uuid;
            viewParams.prefabPath = prefabPath;
            this.ui_nodes.set(viewParams.uuid, viewParams);
          }

          viewParams.params = params != null ? params : {};
          viewParams.callbacks = callbacks != null ? callbacks : {};
          viewParams.valid = true;
          this.load(viewParams, config.bundle);
          return uuid;
        }
        /**
         * 加载界面资源
         * @param viewParams 显示参数
         * @param bundle     远程资源包名，如果为空就是默认本地资源包
         */
        ;

        _proto.load = function load(viewParams, bundle) {
          var _this2 = this;

          var vp = this.ui_nodes.get(viewParams.uuid);

          if (vp && vp.node) {
            this.createNode(vp);
          } else {
            // 优先加载配置的指定资源包中资源，如果没配置则加载默认资源包资源
            bundle = bundle || oops.res.defaultBundleName;
            oops.res.load(bundle, viewParams.prefabPath, function (err, res) {
              if (err) {
                error(err);
              }

              var childNode = instantiate(res);
              viewParams.node = childNode;
              var comp = childNode.addComponent(DelegateComponent);
              comp.viewParams = viewParams;

              _this2.createNode(viewParams);
            });
          }
        }
        /**
         * 创建界面节点
         * @param viewParams  视图参数
         */
        ;

        _proto.createNode = function createNode(viewParams) {
          viewParams.valid = true;
          var comp = viewParams.node.getComponent(DelegateComponent);
          comp.add();
          viewParams.node.parent = this;
          return viewParams.node;
        }
        /**
         * 根据预制件路径删除，预制件如在队列中也会被删除，如果该预制件存在多个也会一起删除
         * @param prefabPath   预制路径
         * @param isDestroy    移除后是否释放
         */
        ;

        _proto.remove = function remove(prefabPath, isDestroy) {
          // 验证是否删除后台缓存界面
          if (isDestroy) this.removeCache(prefabPath); // 界面移出舞台

          var children = this.__nodes();

          for (var i = 0; i < children.length; i++) {
            var viewParams = children[i].viewParams;

            if (viewParams.prefabPath === prefabPath) {
              if (isDestroy) {
                // 直接释放界面
                this.ui_nodes["delete"](viewParams.uuid);
              } else {
                // 不释放界面，缓存起来待下次使用
                this.ui_cache.set(viewParams.prefabPath, viewParams);
              }

              children[i].remove(isDestroy);
              viewParams.valid = false;
            }
          }
        }
        /**
         * 根据唯一标识删除节点，如果节点还在队列中也会被删除
         * @param uuid  唯一标识
         */
        ;

        _proto.removeByUuid = function removeByUuid(uuid, isDestroy) {
          var viewParams = this.ui_nodes.get(uuid);

          if (viewParams) {
            if (isDestroy) this.ui_nodes["delete"](viewParams.uuid);
            var childNode = viewParams.node;
            var comp = childNode.getComponent(DelegateComponent);
            comp.remove(isDestroy);
          }
        }
        /** 
         * 删除缓存的界面，当缓存界面被移除舞台时，可通过此方法删除缓存界面
         */
        ;

        _proto.removeCache = function removeCache(prefabPath) {
          var viewParams = this.ui_cache.get(prefabPath);

          if (viewParams) {
            this.ui_nodes["delete"](viewParams.uuid);
            this.ui_cache["delete"](prefabPath);
            var childNode = viewParams.node;
            childNode.destroy();
          }
        }
        /**
         * 根据唯一标识获取节点，如果节点不存在或者还在队列中，则返回null 
         * @param uuid  唯一标识
         */
        ;

        _proto.getByUuid = function getByUuid(uuid) {
          var children = this.__nodes();

          for (var _iterator = _createForOfIteratorHelperLoose(children), _step; !(_step = _iterator()).done;) {
            var comp = _step.value;

            if (comp.viewParams && comp.viewParams.uuid === uuid) {
              return comp.node;
            }
          }

          return null;
        }
        /**
         * 根据预制件路径获取当前显示的该预制件的所有Node节点数组
         * @param prefabPath 
         */
        ;

        _proto.get = function get(prefabPath) {
          var arr = [];

          var children = this.__nodes();

          for (var _iterator2 = _createForOfIteratorHelperLoose(children), _step2; !(_step2 = _iterator2()).done;) {
            var comp = _step2.value;

            if (comp.viewParams.prefabPath === prefabPath) {
              arr.push(comp.node);
            }
          }

          return arr;
        }
        /**
         * 判断当前层是否包含 uuid或预制件路径对应的Node节点
         * @param prefabPathOrUUID 预制件路径或者UUID
         */
        ;

        _proto.has = function has(prefabPathOrUUID) {
          var children = this.__nodes();

          for (var _iterator3 = _createForOfIteratorHelperLoose(children), _step3; !(_step3 = _iterator3()).done;) {
            var comp = _step3.value;

            if (comp.viewParams.uuid === prefabPathOrUUID || comp.viewParams.prefabPath === prefabPathOrUUID) {
              return true;
            }
          }

          return false;
        }
        /**
         * 获取当前层包含指定正则匹配的Node节点。
         * @param prefabPathReg 匹配预制件路径的正则表达式对象
         */
        ;

        _proto.find = function find(prefabPathReg) {
          var arr = [];

          var children = this.__nodes();

          for (var _iterator4 = _createForOfIteratorHelperLoose(children), _step4; !(_step4 = _iterator4()).done;) {
            var comp = _step4.value;

            if (prefabPathReg.test(comp.viewParams.prefabPath)) {
              arr.push(comp.node);
            }
          }

          return arr;
        }
        /** 获取当前层所有窗口事件触发组件 */
        ;

        _proto.__nodes = function __nodes() {
          var result = [];
          var children = this.children;

          for (var i = 0; i < children.length; i++) {
            var comp = children[i].getComponent(DelegateComponent);

            if (comp && comp.viewParams && comp.viewParams.valid && isValid(comp)) {
              result.push(comp);
            }
          }

          return result;
        }
        /** 层节点数量 */
        ;

        _proto.size = function size() {
          return this.children.length;
        }
        /**
         * 清除所有节点，队列当中的也删除
         * @param isDestroy  移除后是否释放
         */
        ;

        _proto.clear = function clear(isDestroy) {
          var _this3 = this; // 清除所有显示的界面


          this.ui_nodes.forEach(function (value, key) {
            _this3.removeByUuid(value.uuid, isDestroy);

            value.valid = false;
          });
          this.ui_nodes.clear(); // 清除缓存中的界面

          if (isDestroy) {
            this.ui_cache.forEach(function (value, prefabPath) {
              _this3.removeCache(prefabPath);
            });
          }
        };

        return LayerUI;
      }(Node));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayerUtil.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b7a864Zpb5N4Zm7onWE1i9D", "LayerUtil", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-09-01 18:00:28
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-02 12:05:38
       */

      /** 游戏摄像机层数据 */


      var LayerItem = exports('LayerItem', /*#__PURE__*/function () {
        function LayerItem(value, name) {
          this._value = void 0;
          this._name = void 0;
          this._value = value;
          this._name = name;
        }

        _createClass(LayerItem, [{
          key: "value",
          get: function get() {
            return this._value;
          }
        }, {
          key: "name",
          get: function get() {
            return this._name;
          }
        }, {
          key: "mask",
          get: function get() {
            return 1 << this._value;
          }
        }]);

        return LayerItem;
      }());
      /***
       * 游戏摄像机层管理工具
       */

      var LayerUtil = exports('LayerUtil', /*#__PURE__*/function () {
        function LayerUtil() {}
        /**
         * 设置节点层
         * @param item 层数据
         * @param node 节点
         */


        LayerUtil.setNodeLayer = function setNodeLayer(item, node) {
          node.layer = item.mask;
          node.children.forEach(function (n) {
            n.layer = item.mask;
            LayerUtil.setNodeLayer(item, n);
          });
        };

        return LayerUtil;
      }());
      /** 地图对象层 */

      LayerUtil.MAP = new LayerItem(0, 'MAP');
      /** 替身对象层 */

      LayerUtil.AVATAR = new LayerItem(1, 'AVATAR');
      LayerUtil.IGNORE_RAYCAST = new LayerItem(20, 'IGNORE_RAYCAST');
      LayerUtil.GIZMOS = new LayerItem(21, 'GIZMOS');
      /** 编辑器对象层 */

      LayerUtil.EDITOR = new LayerItem(22, 'EDITOR');
      /** 三维对象层 */

      LayerUtil.UI_3D = new LayerItem(23, 'UI_3D');
      LayerUtil.SCENE_GIZMO = new LayerItem(24, 'SCENE_GIZMO');
      /** 二维对象层 */

      LayerUtil.UI_2D = new LayerItem(25, 'UI_2D');
      /** 引擎分析工具层 */

      LayerUtil.PROFILTER = new LayerItem(28, 'PROFILTER');
      /** 默认对象层 */

      LayerUtil.DEFAULT = new LayerItem(30, 'DEFAULT');

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoadingIndicator.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "95143M/82NCOLKGzw14JlmS", "LoadingIndicator", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 加载延时提示动画 */

      var LoadingIndicator = exports('LoadingIndicator', (_dec = ccclass("LoadingIndicator"), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LoadingIndicator, _Component);

        function LoadingIndicator() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "loading", _descriptor, _assertThisInitialized(_this));

          _this.loading_rotate = 0;
          return _this;
        }

        var _proto = LoadingIndicator.prototype;

        _proto.update = function update(dt) {
          this.loading_rotate += dt * 220;
          this.loading.setRotationFromEuler(0, 0, -this.loading_rotate % 360);

          if (this.loading_rotate > 360) {
            this.loading_rotate -= 360;
          }
        };

        return LoadingIndicator;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "loading", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoadingViewComp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './ECS.ts', './CCVMParentComp.ts', './GameUIConfig.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, oops, ecs, CCVMParentComp, UIID;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      ecs = module.ecs;
    }, function (module) {
      CCVMParentComp = module.CCVMParentComp;
    }, function (module) {
      UIID = module.UIID;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "92429ykTnxFCrcGyW58JWjj", "LoadingViewComp", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 游戏资源加载 */

      var LoadingViewComp = exports('LoadingViewComp', (_dec = ccclass('LoadingViewComp'), _dec2 = ecs.register('LoadingView', false), _dec(_class = _dec2(_class = /*#__PURE__*/function (_CCVMParentComp) {
        _inheritsLoose(LoadingViewComp, _CCVMParentComp);

        function LoadingViewComp() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _CCVMParentComp.call.apply(_CCVMParentComp, [this].concat(args)) || this;
          /** VM 组件绑定数据 */

          _this.data = {
            /** 加载资源当前进度 */
            finished: 0,

            /** 加载资源最大进度 */
            total: 0,

            /** 加载资源进度比例值 */
            progress: "0",

            /** 加载流程中提示文本 */
            prompt: ""
          };
          _this.progress = 0;
          return _this;
        }

        var _proto = LoadingViewComp.prototype;

        _proto.reset = function reset() {
          // 获取用户信息的多语言提示文本
          this.data.prompt = oops.language.getLangByID("loading_load_player"); // 进入自定义游戏内容界面

          oops.gui.open(UIID.Login); // 关闭加载界面

          oops.gui.remove(UIID.Loading);
        };

        _proto.start = function start() {
          this.enter();
        };

        _proto.enter = function enter() {
          this.loadRes();
        }
        /** 加载资源 */
        ;

        _proto.loadRes = /*#__PURE__*/function () {
          var _loadRes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  this.data.progress = 0;
                  _context.next = 3;
                  return this.loadCustom();

                case 3:
                  this.loadGameRes();

                case 4:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function loadRes() {
            return _loadRes.apply(this, arguments);
          }

          return loadRes;
        }()
        /** 加载游戏本地JSON数据（自定义内容） */
        ;

        _proto.loadCustom = function loadCustom() {
          // 加载游戏本地JSON数据的多语言提示文本
          this.data.prompt = oops.language.getLangByID("loading_load_json");
        }
        /** 加载初始游戏内容资源 */
        ;

        _proto.loadGameRes = function loadGameRes() {
          // 加载初始游戏内容资源的多语言提示文本
          this.data.prompt = oops.language.getLangByID("loading_load_game");
          oops.res.loadDir("game", this.onProgressCallback.bind(this), this.onCompleteCallback.bind(this));
        }
        /** 加载进度事件 */
        ;

        _proto.onProgressCallback = function onProgressCallback(finished, total, item) {
          this.data.finished = finished;
          this.data.total = total;
          var progress = finished / total;

          if (progress > this.progress) {
            this.progress = progress;
            this.data.progress = (progress * 100).toFixed(2);
          }
        }
        /** 加载完成事件 */
        ;

        _proto.onCompleteCallback = function onCompleteCallback() {
          this.ent.remove(LoadingViewComp);
        };

        return LoadingViewComp;
      }(CCVMParentComp)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Logger.ts", ['cc'], function (exports) {
  var cclegacy, log;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      log = module.log;
    }],
    execute: function () {
      cclegacy._RF.push({}, "479cdJANP5KaJgU+8z0DdSE", "Logger", undefined);
      /** 日志类型 */


      var LogType = exports('LogType', /*#__PURE__*/function (LogType) {
        LogType[LogType["Net"] = 1] = "Net";
        LogType[LogType["Model"] = 2] = "Model";
        LogType[LogType["Business"] = 4] = "Business";
        LogType[LogType["View"] = 8] = "View";
        LogType[LogType["Config"] = 16] = "Config";
        LogType[LogType["Trace"] = 32] = "Trace";
        return LogType;
      }({}));
      var names = {
        "1": "网络日志",
        "2": "数据日志",
        "4": "业务日志",
        "8": "视图日志",
        "16": "配置日志",
        "32": "标准日志"
      };
      /** 
       * 日志管理 
       * @example
      oops.log.trace("默认标准日志");
      oops.log.logConfig("灰色配置日志");
      oops.log.logNet("橙色网络日志");
      oops.log.logModel("紫色数据日志");
      oops.log.logBusiness("蓝色业务日志");
      oops.log.logView("绿色视图日志");
       */

      var Logger = exports('Logger', /*#__PURE__*/function () {
        function Logger() {}

        Logger.init = function init() {
          this.tags = LogType.Net | LogType.Model | LogType.Business | LogType.View | LogType.Config | LogType.Trace;
        }
        /** 
         * 设置显示的日志类型，默认值为不显示任何类型日志
         * @example
        oops.log.setTags(LogType.View|LogType.Business)
         */
        ;

        Logger.setTags = function setTags(tag) {
          if (tag === void 0) {
            tag = null;
          }

          if (tag) {
            this.tags = tag;
          }
        }
        /**
         * 记录开始计时
         * @param describe  标题描述
         * @example
        oops.log.start();
        ...
        省略N行代码
        ...
        oops.log.end();
         */
        ;

        Logger.start = function start(describe) {
          if (describe === void 0) {
            describe = "Time";
          }

          console.time(describe);
        }
        /**
         * 打印范围内时间消耗
         * @param describe  标题描述
         * @example
        oops.log.start();
        ...
        省略N行代码
        ...
        oops.log.end();
         */
        ;

        Logger.end = function end(describe) {
          if (describe === void 0) {
            describe = "Time";
          }

          console.timeEnd(describe);
        }
        /**
         * 打印表格
         * @param msg       日志消息
         * @param describe  标题描述
         * @example
        var object:any = {uid:1000, name:"oops"};
        oops.log.table(object);
         */
        ;

        Logger.table = function table(msg, describe) {
          if (!this.isOpen(LogType.Trace)) {
            return;
          }

          console.table(msg);
        }
        /**
         * 打印标准日志
         * @param msg       日志消息
         */
        ;

        Logger.trace = function trace(msg, color) {
          if (color === void 0) {
            color = "color:#000000;";
          } // 标记没有打开，不打印该日志


          if (!this.isOpen(LogType.Trace)) {
            return;
          }

          var backLog = console.log || log;
          backLog.call(null, "%c%s%s", color, this.getDateString(), msg);
        }
        /**
         * 打印网络层日志
         * @param msg       日志消息
         * @param describe  标题描述
         */
        ;

        Logger.logNet = function logNet(msg, describe) {
          this.orange(LogType.Net, msg, describe);
        }
        /**
         * 打印数据层日志
         * @param msg       日志消息
         * @param describe  标题描述
         */
        ;

        Logger.logModel = function logModel(msg, describe) {
          this.violet(LogType.Model, msg, describe);
        }
        /**
         * 打印业务层日志
         * @param msg       日志消息
         * @param describe  标题描述
         */
        ;

        Logger.logBusiness = function logBusiness(msg, describe) {
          this.blue(LogType.Business, msg, describe);
        }
        /**
         * 打印视图日志
         * @param msg       日志消息
         * @param describe  标题描述
         */
        ;

        Logger.logView = function logView(msg, describe) {
          this.green(LogType.View, msg, describe);
        }
        /** 打印配置日志 */
        ;

        Logger.logConfig = function logConfig(msg, describe) {
          this.gray(LogType.Config, msg, describe);
        } // 橙色
        ;

        Logger.orange = function orange(tag, msg, describe) {
          this.print(tag, msg, "color:#ee7700;", describe);
        } // 紫色
        ;

        Logger.violet = function violet(tag, msg, describe) {
          this.print(tag, msg, "color:Violet;", describe);
        } // 蓝色
        ;

        Logger.blue = function blue(tag, msg, describe) {
          this.print(tag, msg, "color:#3a5fcd;", describe);
        } // 绿色
        ;

        Logger.green = function green(tag, msg, describe) {
          this.print(tag, msg, "color:green;", describe);
        } // 灰色
        ;

        Logger.gray = function gray(tag, msg, describe) {
          this.print(tag, msg, "color:gray;", describe);
        };

        Logger.isOpen = function isOpen(tag) {
          return (this.tags & tag) != 0;
        }
        /**
         * 输出日志
         * @param tag       日志类型
         * @param msg       日志内容
         * @param color     日志文本颜色
         * @param describe  日志标题描述
         */
        ;

        Logger.print = function print(tag, msg, color, describe) {
          // 标记没有打开，不打印该日志
          if (!this.isOpen(tag)) {
            return;
          }

          var backLog = console.log || log;
          var type = names[tag];

          if (describe) {
            backLog.call(null, "%c%s%s%s:%s%o", color, this.getDateString(), '[' + type + ']', this.stack(5), describe, msg);
          } else {
            backLog.call(null, "%c%s%s%s:%o", color, this.getDateString(), '[' + type + ']', this.stack(5), msg);
          }
        };

        Logger.stack = function stack(index) {
          var e = new Error();
          var lines = e.stack.split("\n");
          var result = [];
          lines.forEach(function (line) {
            line = line.substring(7);
            var lineBreak = line.split(" ");

            if (lineBreak.length < 2) {
              result.push(lineBreak[0]);
            } else {
              var _result$push;

              result.push((_result$push = {}, _result$push[lineBreak[0]] = lineBreak[1], _result$push));
            }
          });
          var list = [];
          var splitList = [];

          if (index < result.length - 1) {
            var value;

            for (var a in result[index]) {
              var splitList = a.split(".");

              if (splitList.length == 2) {
                list = splitList.concat();
              } else {
                value = result[index][a];
                var start = value.lastIndexOf("/");
                var end = value.lastIndexOf(".");

                if (start > -1 && end > -1) {
                  var r = value.substring(start + 1, end);
                  list.push(r);
                } else {
                  list.push(value);
                }
              }
            }
          }

          if (list.length == 1) {
            return "[" + list[0] + ".ts]";
          } else if (list.length == 2) {
            return "[" + list[0] + ".ts->" + list[1] + "]";
          }

          return "";
        };

        Logger.getDateString = function getDateString() {
          var d = new Date();
          var str = d.getHours().toString();
          var timeStr = "";
          timeStr += (str.length == 1 ? "0" + str : str) + ":";
          str = d.getMinutes().toString();
          timeStr += (str.length == 1 ? "0" + str : str) + ":";
          str = d.getSeconds().toString();
          timeStr += (str.length == 1 ? "0" + str : str) + ":";
          str = d.getMilliseconds().toString();
          if (str.length == 1) str = "00" + str;
          if (str.length == 2) str = "0" + str;
          timeStr += str;
          timeStr = "[" + timeStr + "]";
          return timeStr;
        };

        return Logger;
      }()); // @ts-ignore

      Logger.tags = 0;
      Logger.init();

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './Main.ts', './claim.ts', './claim_pet.ts', './home.ts', './sui.ts', './SingletonModuleComp.ts', './GameEvent.ts', './GameUIConfig.ts', './TablePromptWindow.ts', './Initialize.ts', './InitRes.ts', './LoadingViewComp.ts', './Oops.ts', './Root.ts', './AudioEffect.ts', './AudioManager.ts', './AudioMusic.ts', './EventDispatcher.ts', './EventMessage.ts', './MessageManager.ts', './ResLoader.ts', './Logger.ts', './RandomManager.ts', './StorageManager.ts', './Timer.ts', './TimerManager.ts', './GameCollision.ts', './GameComponent.ts', './GameManager.ts', './GUI.ts', './Defines.ts', './DelegateComponent.ts', './LayerDialog.ts', './LayerManager.ts', './LayerNotify.ts', './LayerPopup.ts', './LayerUI.ts', './UIMap.ts', './CommonPrompt.ts', './LoadingIndicator.ts', './Notify.ts', './ArrayUtil.ts', './CameraUtil.ts', './EncryptUtil.ts', './ImageUtil.ts', './JsonUtil.ts', './LayerUtil.ts', './MathUtil.ts', './ObjectUtil.ts', './PhysicsUtil.ts', './PlatformUtil.ts', './RegexUtil.ts', './RotateUtil.ts', './StringUtil.ts', './Vec3Util.ts', './ViewUtil.ts', './Ambilight.ts', './FlashSpine.ts', './FlashSprite.ts', './SpineFinishedRelease.ts', './NavLine.ts', './DrawMeshSector.ts', './Effect2DFollow3D.ts', './EffectDelayRelease.ts', './EffectEvent.ts', './EffectFinishedRelease.ts', './EffectSingleCase.ts', './MoveRigidBody.ts', './MoveTo.ts', './MoveTranslate.ts', './AnimatorAnimation.ts', './AnimatorCustomization.ts', './AnimatorDragonBones.ts', './AnimatorSkeletal.ts', './AnimatorSpine.ts', './AnimatorSpineSecondary.ts', './AnimatorBase.ts', './AnimatorCondition.ts', './AnimatorController.ts', './AnimatorParams.ts', './AnimatorState.ts', './AnimatorStateLogic.ts', './AnimatorTransition.ts', './BTreeNode.ts', './BehaviorTree.ts', './BranchNode.ts', './Decorator.ts', './IControl.ts', './Priority.ts', './Selector.ts', './Sequence.ts', './Task.ts', './index.ts', './FreeFlightCamera.ts', './OrbitCamera.ts', './AsyncQueue.ts', './Collection.ts', './ECS.ts', './ECSComp.ts', './ECSEntity.ts', './ECSGroup.ts', './ECSMask.ts', './ECSMatcher.ts', './ECSModel.ts', './ECSSystem.ts', './Badge.ts', './RoundRectMask.ts', './ButtonEffect.ts', './ButtonSimple.ts', './ButtonTouchLong.ts', './LabelChange.ts', './LabelNumber.ts', './LabelTime.ts', './Language.ts', './LanguageData.ts', './LanguageLabel.ts', './LanguagePack.ts', './LanguageSpine.ts', './LanguageSprite.ts', './JsonOb.ts', './StringFormat.ts', './VMBase.ts', './VMCompsEdit.ts', './VMCustom.ts', './VMEnv.ts', './VMEvent.ts', './VMLabel.ts', './VMModify.ts', './VMParent.ts', './VMProgress.ts', './VMState.ts', './ViewModel.ts', './BhvButtonGroup.ts', './BhvFrameIndex.ts', './BhvRollNumber.ts', './BhvSwitchPage.ts', './HttpRequest.ts', './NetInterface.ts', './NetManager.ts', './NetNode.ts', './NetProtocolPako.ts', './NetProtocolProtobuf.ts', './WebSock.ts', './RtToModel.ts', './RtToSprite.ts', './CCComp.ts', './CCVMParentComp.ts', './BuildTimeConstants.ts', './Config.ts', './GameConfig.ts', './GameQueryConfig.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Main.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './Root.ts', './ECS.ts', './GameUIConfig.ts', './SingletonModuleComp.ts', './Initialize.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, profiler, oops, Root, ecs, UIConfigData, smc, Initialize, EcsInitializeSystem;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      profiler = module.profiler;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      Root = module.Root;
    }, function (module) {
      ecs = module.ecs;
    }, function (module) {
      UIConfigData = module.UIConfigData;
    }, function (module) {
      smc = module.smc;
    }, function (module) {
      Initialize = module.Initialize;
      EcsInitializeSystem = module.EcsInitializeSystem;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "0eec0s4qrZF7onPlYBrD+y+", "Main", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Main = exports('Main', (_dec = ccclass('Main'), _dec(_class = /*#__PURE__*/function (_Root) {
        _inheritsLoose(Main, _Root);

        function Main() {
          return _Root.apply(this, arguments) || this;
        }

        var _proto = Main.prototype;

        _proto.start = function start() {
          profiler.showStats();
        };

        _proto.run = function run() {
          smc.initialize = ecs.getEntity(Initialize);
        };

        _proto.initGui = function initGui() {
          oops.gui.init(UIConfigData);
        };

        _proto.initEcsSystem = function initEcsSystem() {
          oops.ecs.add(new EcsInitializeSystem());
        };

        return Main;
      }(Root)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MathUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8c615ZS4PRMPKPA9ZqKjiJC", "MathUtil", undefined);
      /** 数学工具 */


      var MathUtil = exports('MathUtil', /*#__PURE__*/function () {
        function MathUtil() {}
        /**
         * 获得随机方向
         * @param x -1为左，1为右
         * @returns 
         */


        MathUtil.sign = function sign(x) {
          if (x > 0) {
            return 1;
          }

          if (x < 0) {
            return -1;
          }

          return 0;
        }
        /**
         * 随时间变化进度值
         * @param start 初始值
         * @param end   结束值
         * @param t     时间
         */
        ;

        MathUtil.progress = function progress(start, end, t) {
          return start + (end - start) * t;
        }
        /**
         * 插值
         * @param numStart 开始数值
         * @param numEnd   结束数值
         * @param t        时间
         */
        ;

        MathUtil.lerp = function lerp(numStart, numEnd, t) {
          if (t > 1) {
            t = 1;
          } else if (t < 0) {
            t = 0;
          }

          return numStart * (1 - t) + numEnd * t;
        }
        /**
         * 角度插值
         * @param angle1 角度1
         * @param angle2 角度2
         * @param t      时间
         */
        ;

        MathUtil.lerpAngle = function lerpAngle(current, target, t) {
          current %= 360;
          target %= 360;
          var dAngle = target - current;

          if (dAngle > 180) {
            target = current - (360 - dAngle);
          } else if (dAngle < -180) {
            target = current + (360 + dAngle);
          }

          return (MathUtil.lerp(current, target, t) % 360 + 360) % 360;
        }
        /**
         * 按一定的速度从一个角度转向令一个角度
         * @param current 当前角度
         * @param target  目标角度
         * @param speed   速度
         */
        ;

        MathUtil.angleTowards = function angleTowards(current, target, speed) {
          current %= 360;
          target %= 360;
          var dAngle = target - current;

          if (dAngle > 180) {
            target = current - (360 - dAngle);
          } else if (dAngle < -180) {
            target = current + (360 + dAngle);
          }

          var dir = target - current;

          if (speed > Math.abs(dir)) {
            return target;
          }

          return ((current + speed * Math.sign(dir)) % 360 + 360) % 360;
        }
        /**
         * 获取方位内值，超过时获取对应边界值
         * @param value     值
         * @param minLimit  最小值
         * @param maxLimit  最大值
         */
        ;

        MathUtil.clamp = function clamp(value, minLimit, maxLimit) {
          if (value < minLimit) {
            return minLimit;
          }

          if (value > maxLimit) {
            return maxLimit;
          }

          return value;
        }
        /**
         * 获得一个值的概率
         * @param value 值
         */
        ;

        MathUtil.probability = function probability(value) {
          return Math.random() < value;
        };

        return MathUtil;
      }());
      /**
       * 角度转弧度
       */

      MathUtil.deg2Rad = Math.PI / 180;
      /**
       * 弧度转角度
       */

      MathUtil.rad2Deg = 180 / Math.PI;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MessageManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, warn, log;

  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      warn = module.warn;
      log = module.log;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a401fY+wj9NsqOACoZ7Zy/R", "MessageManager", undefined);

      var EventData = function EventData() {
        this.event = void 0;
        this.listener = void 0;
        this.object = void 0;
      };
      /**
       * 批量注册、移除全局事件对象
       */


      var MessageEventData = exports('MessageEventData', /*#__PURE__*/function () {
        function MessageEventData() {
          this.events = {};
        }

        var _proto = MessageEventData.prototype;
        /**
         * 注册全局事件
         * @param event      事件名
         * @param listener   处理事件的侦听器函数
         * @param object     侦听函数绑定的作用域对象
         */

        _proto.on = function on(event, listener, object) {
          var list = this.events[event];

          if (list == null) {
            list = [];
            this.events[event] = list;
          }

          var data = new EventData();
          data.event = event;
          data.listener = listener;
          data.object = object;
          list.push(data);
          MessageManager.Instance.on(event, listener, object);
        }
        /**
        * 移除全局事件
         * @param event     事件名
         */
        ;

        _proto.off = function off(event) {
          var ebs = this.events[event];

          if (!ebs) {
            return;
          }

          for (var _iterator = _createForOfIteratorHelperLoose(ebs), _step; !(_step = _iterator()).done;) {
            var eb = _step.value;
            MessageManager.Instance.off(event, eb.listener, eb.object);
          }

          delete this.events[event];
        }
        /** 
         * 触发全局事件 
         * @param event(string)      事件名
         * @param args(any)          事件参数
         */
        ;

        _proto.dispatchEvent = function dispatchEvent(event, arg) {
          if (arg === void 0) {
            arg = null;
          }

          MessageManager.Instance.dispatchEvent(event, arg);
        }
        /** 清除所有的全局事件监听 */
        ;

        _proto.clear = function clear() {
          for (var event in this.events) {
            this.off(event);
          }
        };

        return MessageEventData;
      }());
      /** 
       * 全局消息管理
       * @example 
      // 注册持续监听的全局事件
      export class RoleViewComp extends Component{
          onLoad(){
              // 监听全局事件
              oops.message.on(GameEvent.GameServerConnected, this.onHandler, this);
          }
          
          protected onDestroy() {
              // 对象释放时取消注册的全局事件
              oops.message.off(GameEvent.GameServerConnected, this.onHandler, this);
          }
          
          private onHandler(event: string, args: any) {
              switch (event) {
                  case GameEvent.GameServerConnected:
                      console.log("处理游戏服务器连接成功后的逻辑");
                      break;
              }
          }
      }
        // 注册只触发一次的全局事件
      export class RoleViewComp extends Component{
          onLoad(){
              // 监听一次事件，事件响应后，该监听自动移除
              oops.message.once(GameEvent.GameServerConnected, this.onHandler, this);
          }
          
          private onHandler(event: string, args: any) {
              switch (event) {
                  case GameEvent.GameServerConnected:
                      console.log("处理游戏服务器连接成功后的逻辑");
                      break;
              }
          }
      }
       */

      var MessageManager = exports('MessageManager', /*#__PURE__*/function () {
        function MessageManager() {
          this.events = {};
        }

        var _proto2 = MessageManager.prototype;
        /**
         * 注册全局事件
         * @param event      事件名
         * @param listener   处理事件的侦听器函数
         * @param object     侦听函数绑定的作用域对象
         */

        _proto2.on = function on(event, listener, object) {
          if (!event || !listener) {
            warn("\u6CE8\u518C\u3010" + event + "\u3011\u4E8B\u4EF6\u7684\u4FA6\u542C\u5668\u51FD\u6570\u4E3A\u7A7A");
            return;
          }

          var list = this.events[event];

          if (list == null) {
            list = [];
            this.events[event] = list;
          }

          var length = list.length;

          for (var i = 0; i < length; i++) {
            var bin = list[i];

            if (bin.listener == listener && bin.object == object) {
              warn("\u540D\u4E3A\u3010" + event + "\u3011\u7684\u4E8B\u4EF6\u91CD\u590D\u6CE8\u518C\u4FA6\u542C\u5668");
            }
          }

          var data = new EventData();
          data.event = event;
          data.listener = listener;
          data.object = object;
          list.push(data);
        }
        /**
         * 监听一次事件，事件响应后，该监听自动移除
         * @param event     事件名
         * @param listener  事件触发回调方法
         * @param object    侦听函数绑定的作用域对象
         */
        ;

        _proto2.once = function once(event, listener, object) {
          var _this = this;

          var _listener2 = function _listener($event, $args) {
            _this.off(event, _listener2, object);

            _listener2 = null;
            listener.call(object, $event, $args);
          };

          this.on(event, _listener2, object);
        }
        /**
         * 移除全局事件
         * @param event     事件名
         * @param listener  处理事件的侦听器函数
         * @param object    侦听函数绑定的作用域对象
         */
        ;

        _proto2.off = function off(event, listener, object) {
          var list = this.events[event];

          if (!list) {
            log("\u540D\u4E3A\u3010" + event + "\u3011\u7684\u4E8B\u4EF6\u4E0D\u5B58\u5728");
            return;
          }

          var length = list.length;

          for (var i = 0; i < length; i++) {
            var bin = list[i];

            if (bin.listener == listener && bin.object == object) {
              list.splice(i, 1);
              break;
            }
          }

          if (list.length == 0) {
            delete this.events[event];
          }
        }
        /** 
         * 触发全局事件 
         * @param event(string)      事件名
         * @param args(any)          事件参数
         */
        ;

        _proto2.dispatchEvent = function dispatchEvent(event, args) {
          if (args === void 0) {
            args = null;
          }

          var list = this.events[event];

          if (list != null) {
            var temp = list.concat();
            var length = temp.length;

            for (var i = 0; i < length; i++) {
              var eventBin = temp[i];
              eventBin.listener.call(eventBin.object, event, args);
            }
          }
        };

        return MessageManager;
      }());
      MessageManager.Instance = new MessageManager();

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MoveRigidBody.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Vec3, RigidBody, EPSILON, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      RigidBody = module.RigidBody;
      EPSILON = module.EPSILON;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "4e8cedkWeJDEZoUMtauac/M", "MoveRigidBody", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var v3_0 = new Vec3();
      var v3_1 = new Vec3();
      /** 
       * 物理方式移动
       * 1. 施加线性数度
       * 2. 施加阻尼
       * 3. 施加重力
       * 4. 控制移动速度或速度比率
       */

      var MoveRigidBody = exports('MoveRigidBody', (_dec = ccclass('MoveRigidBody'), _dec2 = property({
        tooltip: '阻尼'
      }), _dec3 = property({
        tooltip: '重力'
      }), _dec4 = property({
        tooltip: '移动速度'
      }), _dec5 = property({
        tooltip: '速度比率'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MoveRigidBody, _Component);

        function MoveRigidBody() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "damping", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "gravity", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_speed", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_ratio", _descriptor4, _assertThisInitialized(_this));

          _this._rigidBody = null;
          _this._grounded = true; // 是否着地

          _this._curMaxSpeed = 0; // 当前最大速度

          _this._prevAngleY = 0; // 之前的Y角度值

          _this._stateX = 0;
          _this._stateZ = 0;
          _this._velocity = new Vec3();
          return _this;
        }

        var _proto = MoveRigidBody.prototype;

        _proto.start = function start() {
          this._rigidBody = this.getComponent(RigidBody);
          this._prevAngleY = this.node.eulerAngles.y;
        }
        /** 刚体停止移动 */
        ;

        _proto.stop = function stop() {
          this._stateX = 0;
          this._stateZ = 0;

          this._rigidBody.clearVelocity(); // 清除移动速度

        };

        _proto.update = function update(dt) {
          // 施加重力
          this.applyGravity(); // 施加阻尼

          this.applyDamping(dt); // 未落地无法移动

          if (!this.grounded) return; // 施加移动

          this.applyLinearVelocity(v3_0, 1);
        }
        /** 施加重力 */
        ;

        _proto.applyGravity = function applyGravity() {
          var g = this.gravity;
          var m = this._rigidBody.mass;
          v3_1.set(0, m * g, 0);

          this._rigidBody.applyForce(v3_1);
        }
        /** 施加阻尼 */
        ;

        _proto.applyDamping = function applyDamping(dt) {
          // 获取线性速度
          this._rigidBody.getLinearVelocity(v3_1);

          if (v3_1.lengthSqr() > EPSILON) {
            v3_1.multiplyScalar(Math.pow(1.0 - this.damping, dt));

            this._rigidBody.setLinearVelocity(v3_1);
          }
        }
        /**
         * 施加移动
         * @param {Vec3} dir        方向
         * @param {number} speed    移动数度
         */
        ;

        _proto.applyLinearVelocity = function applyLinearVelocity(dir, speed) {
          if (this._stateX || this._stateZ) {
            v3_0.set(this._stateX, 0, this._stateZ);
            v3_0.normalize(); // 获取线性速度

            this._rigidBody.getLinearVelocity(v3_1);

            Vec3.scaleAndAdd(v3_1, v3_1, dir, speed);
            var ms = this._curMaxSpeed;
            var len = v3_1.lengthSqr();
            var ratio = 1;

            if (len > ms) {
              if (Math.abs(this.node.eulerAngles.y - this._prevAngleY) >= 10) {
                ratio = 2;
              }

              this._prevAngleY = this.node.eulerAngles.y;
              v3_1.normalize();
              v3_1.multiplyScalar(ms / ratio);
            }

            this._rigidBody.setLinearVelocity(v3_1);
          }
        };

        _createClass(MoveRigidBody, [{
          key: "speed",
          get: function get() {
            return this._speed;
          },
          set: function set(value) {
            this._speed = value;
            this._curMaxSpeed = value * this.ratio;
          }
        }, {
          key: "ratio",
          get: function get() {
            return this._ratio;
          },
          set: function set(value) {
            this._ratio = value;
            this._curMaxSpeed = this.speed * value;
          }
        }, {
          key: "grounded",
          get:
          /** 是否着地 */
          function get() {
            return this._grounded;
          }
        }, {
          key: "velocity",
          get:
          /** 移动方向 */
          function get() {
            return this._velocity;
          },
          set: function set(value) {
            this._velocity = value;
            var x = value.x;
            var z = value.z;

            if (x > 0 && this._stateX < 0 || x < 0 && this._stateX > 0 || z > 0 && this._stateZ < 0 || z < 0 && this._stateZ > 0) {
              this._rigidBody.clearVelocity(); // 当前跟之前方向不一致则清除速度,避免惯性太大

            }

            this._stateX = x;
            this._stateZ = z;
          }
        }]);

        return MoveRigidBody;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "damping", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gravity", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -10;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "speed"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_ratio", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "ratio", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "ratio"), _class2.prototype)), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MoveTo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Timer.ts', './Vec3Util.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Node, Vec3, Component, Timer, Vec3Util;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      Timer = module.Timer;
    }, function (module) {
      Vec3Util = module.Vec3Util;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "5e22a+qWUpI6ZHSVRRj2DYT", "MoveTo", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 移动到指定目标位置 */

      var MoveTo = exports('MoveTo', (_dec = ccclass('MoveTo'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MoveTo, _Component);

        function MoveTo() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 目标位置 */

          _this.target = null;
          /** 移动方向 */

          _this.velocity = Vec3Util.zero;
          /** 移动速度（每秒移动的像素距离） */

          _this.speed = 0;
          /** 是否计算将 Y 轴带入计算 */

          _this.hasYAxis = true;
          /** 坐标标（默认本地坐标） */

          _this.ns = Node.NodeSpace.LOCAL;
          /** 偏移距离 */

          _this.offset = 0;
          /** 偏移向量 */

          _this.offsetVector = null;
          /** 移动开始 */

          _this.onStart = null;
          /** 移动完成回调 */

          _this.onComplete = null;
          /** 距离变化时 */

          _this.onChange = null;
          /** 延时触发器 */

          _this.timer = new Timer();
          /** 终点备份 */

          _this.end = null;
          return _this;
        }

        var _proto = MoveTo.prototype;

        _proto.update = function update(dt) {
          var end;
          console.assert(this.speed > 0, "移动速度必须要大于零");

          if (this.target instanceof Node) {
            end = this.ns == Node.NodeSpace.WORLD ? this.target.worldPosition : this.target.position;
          } else {
            end = this.target;
          } // 移动目标节点被释放时


          if (end == null) {
            this.exit();
            return;
          } // 目标移动后，重计算移动方向与移动到目标点的速度


          if (this.end == null || !this.end.strictEquals(end)) {
            var _this$onChange;

            var target = end.clone();

            if (this.offsetVector) {
              target = target.add(this.offsetVector);
            }

            if (this.hasYAxis == false) target.y = 0; // 移动方向与移动数度

            var start = this.ns == Node.NodeSpace.WORLD ? this.node.worldPosition : this.node.position;
            this.velocity = Vec3Util.sub(target, start).normalize(); // 移动时间与目标偏位置计算

            var distance = Vec3.distance(start, target) - this.offset; // 目标位置修改事件

            (_this$onChange = this.onChange) == null ? void 0 : _this$onChange.call(this);

            if (distance <= 0) {
              this.exit();
              return;
            } else {
              var _this$onStart;

              (_this$onStart = this.onStart) == null ? void 0 : _this$onStart.call(this);
              this.timer.step = distance / this.speed;
              this.end = end.clone();
            }
          }

          if (this.speed > 0) {
            var trans = Vec3Util.mul(this.velocity, this.speed * dt);
            if (this.ns == Node.NodeSpace.WORLD) this.node.worldPosition = Vec3Util.add(this.node.worldPosition, trans);else this.node.position = Vec3Util.add(this.node.position, trans);
          } // 移动完成事件


          if (this.timer.update(dt)) {
            if (this.offset == 0) {
              if (this.ns == Node.NodeSpace.WORLD) this.node.worldPosition = this.end;else this.node.position = this.end;
            }

            this.exit();
          }
        };

        _proto.exit = function exit() {
          var _this$onComplete;

          (_this$onComplete = this.onComplete) == null ? void 0 : _this$onComplete.call(this);
          this.destroy();
        };

        return MoveTo;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MoveTranslate.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Vec3Util.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Vec3, Node, Component, Vec3Util;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      Vec3Util = module.Vec3Util;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "e626612zClLO4OZDEWvT+fr", "MoveTranslate", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 角色坐标方式移动 */

      var MoveTranslate = exports('MoveTranslate', (_dec = ccclass('MoveTranslate'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MoveTranslate, _Component);

        function MoveTranslate() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 移动方向 */

          _this.velocity = Vec3Util.zero;
          /** 移动速度 */

          _this.speed = 0;
          _this.vector = new Vec3();
          return _this;
        }

        var _proto = MoveTranslate.prototype;

        _proto.update = function update(dt) {
          if (this.speed > 0) {
            Vec3.multiplyScalar(this.vector, this.velocity, this.speed * dt);
            this.node.translate(this.vector, Node.NodeSpace.WORLD);
          }
        };

        return MoveTranslate;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NavLine.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, MeshRenderer, Vec3, Vec2, v2, macro, Component, Color;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      MeshRenderer = module.MeshRenderer;
      Vec3 = module.Vec3;
      Vec2 = module.Vec2;
      v2 = module.v2;
      macro = module.macro;
      Component = module.Component;
      Color = module.Color;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

      cclegacy._RF.push({}, "41dce0XCUNII74J0zSeaDUf", "NavLine", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var NavLine = exports('NavLine', (_dec = ccclass('NavLine - 导航钱组件'), _dec2 = property({
        type: Node,
        displayName: "玩家模型节点"
      }), _dec3 = property({
        type: MeshRenderer,
        displayName: "箭头网格",
        tooltip: "拖MeshRenderer组件到这里"
      }), _dec4 = property({
        displayName: "导航线颜色"
      }), _dec5 = property({
        displayName: "执行间隔",
        tooltip: "多少帧执行一次，数值越大动画越流程，建议3-5",
        min: 1
      }), _dec6 = property({
        displayName: "箭头速度",
        tooltip: "控制材质texture位移，数值越大动画播放越快",
        min: 0.1
      }), _dec7 = property({
        displayName: "箭头密度",
        tooltip: "控制箭头的密度，数值越大越密",
        min: 0.1
      }), _dec8 = property({
        displayName: "角度变化",
        tooltip: "箭头是否有 x 欧拉角度变化，有高度的地形引导开启"
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(NavLine, _Component);

        function NavLine() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "player", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "mesh", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "color", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "interval", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "speed", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "density", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "xEuler", _descriptor7, _assertThisInitialized(_this));
          /* 材质 */


          _this.mat = null;
          /* 导航线是否启动 */

          _this.inited = false;
          _this.distance = 0;
          _this.frame = 0;
          _this.start_pos = new Vec3();
          _this.target_pos = new Vec3();
          _this.tOffset = new Vec2(1, 1);
          return _this;
        }

        var _proto = NavLine.prototype;

        _proto.start = function start() {
          this.mat = this.mesh.material;
          this.mat.setProperty("textureMoveSpeed", v2(0, this.speed)); // 根据需求也可以是 x 轴，动画移动

          this.hide();
        }
        /** 开始提示 */
        ;

        _proto.show = function show(pos) {
          this.node.setRotationFromEuler(0, this.player.eulerAngles.y, 0);
          this.mesh.node.active = true;
          this.frame = 0;
          this.inited = true;
          this.mat.setProperty("mainColor", this.color);
          this.start_pos.set(this.player.worldPosition);
          this.target_pos.set(pos);
          this.setDistance();
        }
        /** 结束提示 */
        ;

        _proto.hide = function hide() {
          this.inited = false;
          this.mesh.node.active = false;
        }
        /** 距离实时计算 */
        ;

        _proto.setDistance = function setDistance() {
          // 目标与
          this.distance = Vec3.distance(this.target_pos, this.player.worldPosition);
          this.node.setScale(this.node.scale.x, this.node.scale.y, this.distance);
          this.node.setWorldPosition(this.player.worldPosition);
          this.tOffset.y = this.distance * this.density;
          this.mat.setProperty("tilingOffset", this.tOffset);
          if (this.xEuler) this.rotation(this.start_pos, this.target_pos);
        }
        /** 旋转朝向 */
        ;

        _proto.rotation = function rotation(start, end) {
          // 角色转动的角度, 相对Z轴，逆时针为正方向
          var angle = Math.asin(Math.sin(Math.abs(end.y - start.y) / this.distance)) * macro.DEG % 360;
          var x = end.y - start.y > 0 ? -angle : angle;
          this.node.setRotationFromEuler(x, this.player.eulerAngles.y, 0);
        };

        _proto.update = function update(dt) {
          if (this.inited) {
            this.frame++;

            if (this.frame >= this.interval) {
              this.setDistance();
              this.frame = 0;
            }
          }
        };

        return NavLine;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "player", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mesh", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "color", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(255, 0, 0, 255);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "interval", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "density", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "xEuler", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetInterface.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d9f8b+CV69FyKwnUdCjOtad", "NetInterface", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-09-01 18:00:28
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-09 18:31:18
       */

      /*
       * 网络相关接口定义
       */

      /** 请求协议 */

      /** 响应协议 */

      /** 回调对象 */

      /** 请求对象 */

      /** 协议辅助接口 */

      /** Socket接口 */

      /** 网络提示接口 */


      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetManager.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d8cd5el6GBGTYTW+N8b8EuJ", "NetManager", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-09-01 18:00:28
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-09 18:10:50
       */

      /*
       * 网络节点管理类
       */


      var NetManager = exports('NetManager', /*#__PURE__*/function () {
        function NetManager() {
          this._channels = {};
        }
        /** 网络管理单例对象 */


        NetManager.getInstance = function getInstance() {
          if (!this._instance) {
            this._instance = new NetManager();
          }

          return this._instance;
        }
        /**
         * 添加网络节点
         * @param node       网络节点
         * @param channelId  通道编号
         * @example
        // 游戏服务器心跳协议
        class GameProtocol extends NetProtocolPako { 
            // 自定义心跳协议
            getHearbeat(): NetData { 
                return '{"action":"LoginAction","method":"heart","data":"null","callback":"LoginAction_heart"}';
            }
        }
            
        var net = new NetNodeGame();
        var ws = new WebSock();        // WebSocket 网络连接对象
        var gp = new GameProtocol();   // 网络通讯协议对象
        var gt = new NetGameTips()     // 网络提示对象
        net.init(ws, gp, gt);
        NetManager.getInstance().setNetNode(net, NetChannelType.Game);
         */
        ;

        var _proto = NetManager.prototype;

        _proto.setNetNode = function setNetNode(node, channelId) {
          if (channelId === void 0) {
            channelId = 0;
          }

          this._channels[channelId] = node;
        }
        /** 移除Node */
        ;

        _proto.removeNetNode = function removeNetNode(channelId) {
          delete this._channels[channelId];
        }
        /**
         * 网络节点连接服务器
         * @param options      连接参数
         * @param channelId    通道编号
         * @example
        var options = {
            url: 'ws://127.0.0.1:3000',
            autoReconnect: 0            // -1 永久重连，0不自动重连，其他正整数为自动重试次数
        }
        NetManager.getInstance().connect(options, NetChannelType.Game);
         */
        ;

        _proto.connect = function connect(options, channelId) {
          if (channelId === void 0) {
            channelId = 0;
          }

          if (this._channels[channelId]) {
            return this._channels[channelId].connect(options);
          }

          return false;
        }
        /** 节点连接发送数据*/
        ;

        _proto.send = function send(buf, force, channelId) {
          if (force === void 0) {
            force = false;
          }

          if (channelId === void 0) {
            channelId = 0;
          }

          var node = this._channels[channelId];

          if (node) {
            return node.send(buf, force);
          }

          return -1;
        }
        /**
         * 发起请求，并在在结果返回时调用指定好的回调函数
         * @param reqProtocol 请求协议
         * @param rspObject   回调对象
         * @param showTips    是否触发请求提示
         * @param force       是否强制发送
         * @param channelId   通道编号
         * @example
        let protocol: IRequestProtocol = {
            action: action,
            method: method,
            data: JSON.stringify(data),
            isCompress: this.isCompress,
            channelid: netConfig.channelid
        }
        return this.request(protocol, rspObject, showTips, force);
         */
        ;

        _proto.request = function request(reqProtocol, rspObject, showTips, force, channelId) {
          if (showTips === void 0) {
            showTips = true;
          }

          if (force === void 0) {
            force = false;
          }

          if (channelId === void 0) {
            channelId = 0;
          }

          var node = this._channels[channelId];

          if (node) {
            node.request(reqProtocol, rspObject, showTips, force);
          }
        }
        /**
         * 同request功能一致，但在request之前会先判断队列中是否已有rspCmd，如有重复的则直接返回
         * @param reqProtocol 请求协议
         * @param rspObject   回调对象
         * @param showTips    是否触发请求提示
         * @param force       是否强制发送
         * @param channelId   通道编号
         * @example
        let protocol: IRequestProtocol = {
            action: action,
            method: method,
            data: JSON.stringify(data),
            isCompress: this.isCompress,
            channelid: netConfig.channelid
        }
        return this.request(protocol, rspObject, showTips, force);
         */
        ;

        _proto.requestUnique = function requestUnique(reqProtocol, rspObject, showTips, force, channelId) {
          if (showTips === void 0) {
            showTips = true;
          }

          if (force === void 0) {
            force = false;
          }

          if (channelId === void 0) {
            channelId = 0;
          }

          var node = this._channels[channelId];

          if (node) {
            return node.requestUnique(reqProtocol, rspObject, showTips, force);
          }

          return false;
        }
        /**
         * 节点网络断开
         * @param code        关闭码
         * @param reason      关闭原因
         * @param channelId   通道编号
         * @example 
         * NetManager.getInstance().close(undefined, undefined, NetChannelType.Game);
         */
        ;

        _proto.close = function close(code, reason, channelId) {
          if (channelId === void 0) {
            channelId = 0;
          }

          if (this._channels[channelId]) {
            return this._channels[channelId].closeSocket(code, reason);
          }
        };

        return NetManager;
      }());
      NetManager._instance = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetNode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Logger.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, error, warn, Logger;

  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      error = module.error;
      warn = module.warn;
    }, function (module) {
      Logger = module.Logger;
    }],
    execute: function () {
      cclegacy._RF.push({}, "57f0fB90kNBUJ98yyu+jxjx", "NetNode", undefined);
      /*
      *   CocosCreator网络节点基类，以及网络相关接口定义
      *   1. 网络连接、断开、请求发送、数据接收等基础功能
      *   2. 心跳机制
      *   3. 断线重连 + 请求重发
      *   4. 调用网络屏蔽层
      */


      var NetNodeStateStrs = ["已关闭", "连接中", "验证中", "可传输数据"];
      /** 网络提示类型枚举 */

      var NetTipsType = exports('NetTipsType', /*#__PURE__*/function (NetTipsType) {
        NetTipsType[NetTipsType["Connecting"] = 0] = "Connecting";
        NetTipsType[NetTipsType["ReConnecting"] = 1] = "ReConnecting";
        NetTipsType[NetTipsType["Requesting"] = 2] = "Requesting";
        return NetTipsType;
      }({}));
      /** 网络状态枚举 */

      var NetNodeState = exports('NetNodeState', /*#__PURE__*/function (NetNodeState) {
        NetNodeState[NetNodeState["Closed"] = 0] = "Closed";
        NetNodeState[NetNodeState["Connecting"] = 1] = "Connecting";
        NetNodeState[NetNodeState["Checking"] = 2] = "Checking";
        NetNodeState[NetNodeState["Working"] = 3] = "Working";
        return NetNodeState;
      }({})); // 可传输数据

      /** 网络连接参数 */

      /** 网络节点 */

      var NetNode = exports('NetNode', /*#__PURE__*/function () {
        function NetNode() {
          this._connectOptions = null;
          this._autoReconnect = 0;
          this._isSocketInit = false; // Socket是否初始化过

          this._isSocketOpen = false; // Socket是否连接成功过

          this._state = NetNodeState.Closed; // 节点当前状态

          this._socket = null; // Socket对象（可能是原生socket、websocket、wx.socket...)

          this._networkTips = null; // 网络提示ui对象（请求提示、断线重连提示等）

          this._protocolHelper = null; // 包解析对象

          this._connectedCallback = null; // 连接完成回调

          this._disconnectCallback = null; // 断线回调

          this._callbackExecuter = null; // 回调执行

          this._keepAliveTimer = null; // 心跳定时器

          this._receiveMsgTimer = null; // 接收数据定时器

          this._reconnectTimer = null; // 重连定时器

          this._heartTime = 10000; // 心跳间隔

          this._receiveTime = 6000000; // 多久没收到数据断开

          this._reconnetTimeOut = 8000000; // 重连间隔

          this._requests = Array(); // 请求列表

          this._listener = {};
        }

        var _proto = NetNode.prototype; // 监听者列表

        /********************** 网络相关处理 *********************/

        _proto.init = function init(socket, protocol, networkTips, execFunc) {
          if (networkTips === void 0) {
            networkTips = null;
          }

          if (execFunc === void 0) {
            execFunc = null;
          }

          Logger.logNet("\u7F51\u7EDC\u521D\u59CB\u5316");
          this._socket = socket;
          this._protocolHelper = protocol;
          this._networkTips = networkTips;
          this._callbackExecuter = execFunc ? execFunc : function (callback, buffer) {
            callback.callback.call(callback.target, buffer);
          };
        }
        /**
         * 请求连接服务器
         * @param options 连接参数
         */
        ;

        _proto.connect = function connect(options) {
          if (this._socket && this._state == NetNodeState.Closed) {
            if (!this._isSocketInit) {
              this.initSocket();
            }

            this._state = NetNodeState.Connecting;

            if (!this._socket.connect(options)) {
              this.updateNetTips(NetTipsType.Connecting, false);
              return false;
            }

            if (this._connectOptions == null && typeof options.autoReconnect == "number") {
              this._autoReconnect = options.autoReconnect;
            }

            this._connectOptions = options;
            this.updateNetTips(NetTipsType.Connecting, true);
            return true;
          }

          return false;
        };

        _proto.initSocket = function initSocket() {
          var _this = this;

          if (this._socket) {
            this._socket.onConnected = function (event) {
              _this.onConnected(event);
            };

            this._socket.onMessage = function (msg) {
              _this.onMessage(msg);
            };

            this._socket.onError = function (event) {
              _this.onError(event);
            };

            this._socket.onClosed = function (event) {
              _this.onClosed(event);
            };

            this._isSocketInit = true;
          }
        };

        _proto.updateNetTips = function updateNetTips(tipsType, isShow) {
          if (this._networkTips) {
            if (tipsType == NetTipsType.Requesting) {
              this._networkTips.requestTips(isShow);
            } else if (tipsType == NetTipsType.Connecting) {
              this._networkTips.connectTips(isShow);
            } else if (tipsType == NetTipsType.ReConnecting) {
              this._networkTips.reconnectTips(isShow);
            }
          }
        }
        /** 网络连接成功 */
        ;

        _proto.onConnected = function onConnected(event) {
          var _this2 = this;

          Logger.logNet("网络已连接");
          this._isSocketOpen = true; // 如果设置了鉴权回调，在连接完成后进入鉴权阶段，等待鉴权结束

          if (this._connectedCallback !== null) {
            this._state = NetNodeState.Checking;

            this._connectedCallback(function () {
              _this2.onChecked();
            });
          } else {
            this.onChecked();
          }

          Logger.logNet("\u7F51\u7EDC\u5DF2\u8FDE\u63A5\u5F53\u524D\u72B6\u6001\u4E3A\u3010" + NetNodeStateStrs[this._state] + "\u3011");
        }
        /** 连接验证成功，进入工作状态 */
        ;

        _proto.onChecked = function onChecked() {
          Logger.logNet("连接验证成功，进入工作状态");
          this._state = NetNodeState.Working; // 关闭连接或重连中的状态显示

          this.updateNetTips(NetTipsType.Connecting, false);
          this.updateNetTips(NetTipsType.ReConnecting, false); // 重发待发送信息

          var requests = this._requests.concat();

          if (requests.length > 0) {
            Logger.logNet("\u8BF7\u6C42\u3010" + this._requests.length + "\u3011\u4E2A\u5F85\u53D1\u9001\u7684\u4FE1\u606F");

            for (var i = 0; i < requests.length;) {
              var req = requests[i];

              this._socket.send(req.buffer);

              if (req.rspObject == null || req.rspCmd != "") {
                requests.splice(i, 1);
              } else {
                ++i;
              }
            } // 如果还有等待返回的请求，启动网络请求层


            this.updateNetTips(NetTipsType.Requesting, this._requests.length > 0);
          }
        }
        /** 接收到一个完整的消息包 */
        ;

        _proto.onMessage = function onMessage(msg) {
          // Logger.logNet(`接受消息状态为【${NetNodeStateStrs[this._state]}】`);
          var json = JSON.parse(msg); // 进行头部的校验（实际包长与头部长度是否匹配）

          if (!this._protocolHelper.checkResponsePackage(json)) {
            error("\u6821\u9A8C\u63A5\u53D7\u6D88\u606F\u6570\u636E\u5F02\u5E38");
            return;
          } // 处理相应包数据


          if (!this._protocolHelper.handlerResponsePackage(json)) {
            if (this._networkTips) this._networkTips.responseErrorCode(json.code);
          } // 接受到数据，重新定时收数据计时器


          this.resetReceiveMsgTimer(); // 重置心跳包发送器

          this.resetHearbeatTimer(); // 触发消息执行

          var rspCmd = this._protocolHelper.getPackageId(json);

          Logger.logNet("\u63A5\u53D7\u5230\u547D\u4EE4\u3010" + rspCmd + "\u3011\u7684\u6D88\u606F"); // 优先触发request队列

          if (this._requests.length > 0) {
            for (var reqIdx in this._requests) {
              var req = this._requests[reqIdx];

              if (req.rspCmd == rspCmd && req.rspObject) {
                Logger.logNet("\u89E6\u53D1\u8BF7\u6C42\u547D\u4EE4\u3010" + rspCmd + "\u3011\u7684\u56DE\u8C03");

                this._callbackExecuter(req.rspObject, json.data);

                this._requests.splice(parseInt(reqIdx), 1);

                break;
              }
            }

            if (this._requests.length == 0) {
              this.updateNetTips(NetTipsType.Requesting, false);
            } else {
              Logger.logNet("\u8BF7\u6C42\u961F\u5217\u4E2D\u8FD8\u6709\u3010" + this._requests.length + "\u3011\u4E2A\u8BF7\u6C42\u5728\u7B49\u5F85");
            }
          }

          var listeners = this._listener[rspCmd];

          if (null != listeners) {
            for (var _iterator = _createForOfIteratorHelperLoose(listeners), _step; !(_step = _iterator()).done;) {
              var rsp = _step.value;
              Logger.logNet("\u89E6\u53D1\u76D1\u542C\u547D\u4EE4\u3010" + rspCmd + "\u3011\u7684\u56DE\u8C03");

              this._callbackExecuter(rsp, json.data);
            }
          }
        };

        _proto.onError = function onError(event) {
          error(event);
        };

        _proto.onClosed = function onClosed(event) {
          var _this3 = this;

          this.clearTimer(); // 执行断线回调，返回false表示不进行重连

          if (this._disconnectCallback && !this._disconnectCallback()) {
            Logger.logNet("\u65AD\u5F00\u8FDE\u63A5");
            return;
          } // 自动重连


          if (this.isAutoReconnect()) {
            this.updateNetTips(NetTipsType.ReConnecting, true);
            this._reconnectTimer = setTimeout(function () {
              _this3._socket.close();

              _this3._state = NetNodeState.Closed;

              _this3.connect(_this3._connectOptions);

              if (_this3._autoReconnect > 0) {
                _this3._autoReconnect -= 1;
              }
            }, this._reconnetTimeOut);
          } else {
            this._state = NetNodeState.Closed;
          }
        }
        /**
         * 断开网络
         * @param code      关闭码
         * @param reason    关闭原因
         */
        ;

        _proto.close = function close(code, reason) {
          this.clearTimer();
          this._listener = {};
          this._requests.length = 0;

          if (this._networkTips) {
            this._networkTips.connectTips(false);

            this._networkTips.reconnectTips(false);

            this._networkTips.requestTips(false);
          }

          if (this._socket) {
            this._socket.close(code, reason);
          } else {
            this._state = NetNodeState.Closed;
          }
        }
        /**
         * 只是关闭Socket套接字（仍然重用缓存与当前状态）
         * @param code      关闭码
         * @param reason    关闭原因
         */
        ;

        _proto.closeSocket = function closeSocket(code, reason) {
          if (this._socket) {
            this._socket.close(code, reason);
          }
        }
        /**
         * 发起请求，如果当前处于重连中，进入缓存列表等待重连完成后发送
         * @param buf       网络数据
         * @param force     是否强制发送
         */
        ;

        _proto.send = function send(buf, force) {
          if (force === void 0) {
            force = false;
          }

          if (this._state == NetNodeState.Working || force) {
            return this._socket.send(buf);
          } else if (this._state == NetNodeState.Checking || this._state == NetNodeState.Connecting) {
            this._requests.push({
              buffer: buf,
              rspCmd: "",
              rspObject: null
            });

            Logger.logNet("\u5F53\u524D\u72B6\u6001\u4E3A\u3010" + NetNodeStateStrs[this._state] + "\u3011,\u7E41\u5FD9\u5E76\u7F13\u51B2\u53D1\u9001\u6570\u636E");
            return 0;
          } else {
            error("\u5F53\u524D\u72B6\u6001\u4E3A\u3010" + NetNodeStateStrs[this._state] + "\u3011,\u8BF7\u6C42\u9519\u8BEF");
            return -1;
          }
        }
        /**
         * 发起请求，并进入缓存列表
         * @param reqProtocol 请求协议
         * @param rspObject   回调对象
         * @param showTips    是否触发请求提示
         * @param force       是否强制发送
         * @param channelId   通道编号
         */
        ;

        _proto.request = function request(reqProtocol, rspObject, showTips, force) {
          if (showTips === void 0) {
            showTips = true;
          }

          if (force === void 0) {
            force = false;
          }

          var rspCmd = this._protocolHelper.handlerRequestPackage(reqProtocol);

          this.base_request(reqProtocol, rspCmd, rspObject, showTips, force);
        }
        /**
         * 唯一request，确保没有同一响应的请求（避免一个请求重复发送，netTips界面的屏蔽也是一个好的方法）
         * @param reqProtocol 请求协议
         * @param rspObject   回调对象
         * @param showTips    是否触发请求提示
         * @param force       是否强制发送
         * @param channelId   通道编号
         */
        ;

        _proto.requestUnique = function requestUnique(reqProtocol, rspObject, showTips, force) {
          if (showTips === void 0) {
            showTips = true;
          }

          if (force === void 0) {
            force = false;
          }

          var rspCmd = this._protocolHelper.handlerRequestPackage(reqProtocol);

          for (var i = 0; i < this._requests.length; ++i) {
            if (this._requests[i].rspCmd == rspCmd) {
              Logger.logNet("\u547D\u4EE4\u3010" + rspCmd + "\u3011\u91CD\u590D\u8BF7\u6C42");
              return false;
            }
          }

          this.base_request(reqProtocol, rspCmd, rspObject, showTips, force);
          return true;
        };

        _proto.base_request = function base_request(reqProtocol, rspCmd, rspObject, showTips, force) {
          if (showTips === void 0) {
            showTips = true;
          }

          if (force === void 0) {
            force = false;
          }

          var buf = JSON.stringify(reqProtocol);

          if (this._state == NetNodeState.Working || force) {
            this._socket.send(buf);
          }

          Logger.logNet("\u961F\u5217\u547D\u4EE4\u4E3A\u3010" + rspCmd + "\u3011\u7684\u8BF7\u6C42\uFF0C\u7B49\u5F85\u8BF7\u6C42\u6570\u636E\u7684\u56DE\u8C03"); // 进入发送缓存列表

          this._requests.push({
            buffer: buf,
            rspCmd: rspCmd,
            rspObject: rspObject
          }); // 启动网络请求层


          if (showTips) {
            this.updateNetTips(NetTipsType.Requesting, true);
          }
        }
        /********************** 回调相关处理 *********************/

        /**
         * 设置一个唯一的服务器推送监听
         * @param cmd       命令字串
         * @param callback  回调方法
         * @param target    目标对象
         */
        ;

        _proto.setResponeHandler = function setResponeHandler(cmd, callback, target) {
          if (callback == null) {
            error("\u547D\u4EE4\u4E3A\u3010" + cmd + "\u3011\u8BBE\u7F6E\u54CD\u5E94\u5904\u7406\u7A0B\u5E8F\u9519\u8BEF");
            return false;
          }

          this._listener[cmd] = [{
            target: target,
            callback: callback
          }];
          return true;
        }
        /**
         * 可添加多个同类返回消息的监听
         * @param cmd       命令字串
         * @param callback  回调方法
         * @param target    目标对象
         * @returns 
         */
        ;

        _proto.addResponeHandler = function addResponeHandler(cmd, callback, target) {
          if (callback == null) {
            error("\u547D\u4EE4\u4E3A\u3010" + cmd + "\u3011\u6DFB\u52A0\u54CD\u5E94\u5904\u7406\u7A0B\u5E8F\u9519\u8BEF");
            return false;
          }

          var rspObject = {
            target: target,
            callback: callback
          };

          if (null == this._listener[cmd]) {
            this._listener[cmd] = [rspObject];
          } else {
            var index = this.getNetListenersIndex(cmd, rspObject);

            if (-1 == index) {
              this._listener[cmd].push(rspObject);
            }
          }

          return true;
        }
        /**
         * 删除一个监听中指定子回调
         * @param cmd       命令字串
         * @param callback  回调方法
         * @param target    目标对象
         */
        ;

        _proto.removeResponeHandler = function removeResponeHandler(cmd, callback, target) {
          if (null != this._listener[cmd] && callback != null) {
            var index = this.getNetListenersIndex(cmd, {
              target: target,
              callback: callback
            });

            if (-1 != index) {
              this._listener[cmd].splice(index, 1);
            }
          }
        }
        /**
         * 清除所有监听或指定命令的监听
         * @param cmd  命令字串（默认不填为清除所有）
         */
        ;

        _proto.cleanListeners = function cleanListeners(cmd) {
          if (cmd === void 0) {
            cmd = "";
          }

          if (cmd == "") {
            this._listener = {};
          } else {
            delete this._listener[cmd];
          }
        };

        _proto.getNetListenersIndex = function getNetListenersIndex(cmd, rspObject) {
          var index = -1;

          for (var i = 0; i < this._listener[cmd].length; i++) {
            var iterator = this._listener[cmd][i];

            if (iterator.callback == rspObject.callback && iterator.target == rspObject.target) {
              index = i;
              break;
            }
          }

          return index;
        }
        /********************** 心跳、超时相关处理 *********************/
        ;

        _proto.resetReceiveMsgTimer = function resetReceiveMsgTimer() {
          var _this4 = this;

          if (this._receiveMsgTimer !== null) {
            clearTimeout(this._receiveMsgTimer);
          }

          this._receiveMsgTimer = setTimeout(function () {
            warn("接收消息定时器关闭网络连接");

            _this4._socket.close();
          }, this._receiveTime);
        };

        _proto.resetHearbeatTimer = function resetHearbeatTimer() {
          var _this5 = this;

          if (this._keepAliveTimer !== null) {
            clearTimeout(this._keepAliveTimer);
          }

          this._keepAliveTimer = setTimeout(function () {
            Logger.logNet("网络节点保持活跃发送心跳信息");

            _this5.send(_this5._protocolHelper.getHearbeat());
          }, this._heartTime);
        };

        _proto.clearTimer = function clearTimer() {
          if (this._receiveMsgTimer !== null) {
            clearTimeout(this._receiveMsgTimer);
          }

          if (this._keepAliveTimer !== null) {
            clearTimeout(this._keepAliveTimer);
          }

          if (this._reconnectTimer !== null) {
            clearTimeout(this._reconnectTimer);
          }
        }
        /** 是否自动重连接 */
        ;

        _proto.isAutoReconnect = function isAutoReconnect() {
          return this._autoReconnect != 0;
        }
        /** 拒绝重新连接 */
        ;

        _proto.rejectReconnect = function rejectReconnect() {
          this._autoReconnect = 0;
          this.clearTimer();
        };

        return NetNode;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetProtocolPako.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "88ae0lIg5BFWb1O1E8/Etwi", "NetProtocolPako", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-04-21 13:45:51
       * @LastEditors: dgflash
       * @LastEditTime: 2022-04-21 13:51:33
       */


      var unzip = function unzip(str) {
        var charData = str.split('').map(function (x) {
          return x.charCodeAt(0);
        });
        var binData = new Uint8Array(charData); //@ts-ignore

        var data = pako.inflate(binData, {
          to: 'string'
        });
        return data;
      };

      var zip = function zip(str) {
        //@ts-ignore
        var binaryString = pako.gzip(str, {
          to: 'string'
        });
        return binaryString;
      };
      /** Pako.js 数据压缩协议 */


      var NetProtocolPako = exports('NetProtocolPako', /*#__PURE__*/function () {
        function NetProtocolPako() {}

        var _proto = NetProtocolPako.prototype;

        _proto.getHeadlen = function getHeadlen() {
          return 0;
        };

        _proto.getHearbeat = function getHearbeat() {
          return "";
        };

        _proto.getPackageLen = function getPackageLen(msg) {
          return msg.toString().length;
        };

        _proto.checkResponsePackage = function checkResponsePackage(respProtocol) {
          return true;
        };

        _proto.handlerResponsePackage = function handlerResponsePackage(respProtocol) {
          if (respProtocol.code == 1) {
            if (respProtocol.isCompress) {
              respProtocol.data = unzip(respProtocol.data);
            }

            respProtocol.data = JSON.parse(respProtocol.data);
            return true;
          } else {
            return false;
          }
        };

        _proto.handlerRequestPackage = function handlerRequestPackage(reqProtocol) {
          var rspCmd = reqProtocol.action + "_" + reqProtocol.method;
          reqProtocol.callback = rspCmd;

          if (reqProtocol.isCompress) {
            reqProtocol.data = zip(reqProtocol.data);
          }

          return rspCmd;
        };

        _proto.getPackageId = function getPackageId(respProtocol) {
          return respProtocol.callback;
        };

        return NetProtocolPako;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetProtocolProtobuf.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5714auyGttOSrOXeVsvIAUz", "NetProtocolProtobuf", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-04-21 13:48:44
       * @LastEditors: dgflash
       * @LastEditTime: 2022-04-21 14:11:25
       */

      /** Protobuf.js 数据压缩协议 */


      var NetProtocolProtobuf = exports('NetProtocolProtobuf', /*#__PURE__*/function () {
        function NetProtocolProtobuf() {}

        var _proto = NetProtocolProtobuf.prototype;

        _proto.getHeadlen = function getHeadlen() {
          return 0;
        };

        _proto.getHearbeat = function getHearbeat() {
          return "";
        };

        _proto.getPackageLen = function getPackageLen(msg) {
          return msg.toString().length;
        };

        _proto.checkResponsePackage = function checkResponsePackage(respProtocol) {
          return true;
        };

        _proto.handlerResponsePackage = function handlerResponsePackage(respProtocol) {
          if (respProtocol.code == 1) {
            if (respProtocol.isCompress) ;
            respProtocol.data = JSON.parse(respProtocol.data);
            return true;
          } else {
            return false;
          }
        };

        _proto.handlerRequestPackage = function handlerRequestPackage(reqProtocol) {
          var rspCmd = reqProtocol.action + "_" + reqProtocol.method;
          reqProtocol.callback = rspCmd;
          if (reqProtocol.isCompress) ;
          return rspCmd;
        };

        _proto.getPackageId = function getPackageId(respProtocol) {
          return respProtocol.callback;
        };

        return NetProtocolProtobuf;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Notify.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LanguageLabel.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Animation, Component, LanguageLabel;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Animation = module.Animation;
      Component = module.Component;
    }, function (module) {
      LanguageLabel = module.LanguageLabel;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "01391Mp6X1Gn554rkzavN4K", "Notify", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 滚动消息提示组件  */

      var Notify = exports('Notify', (_dec = ccclass('Notify'), _dec2 = property(Label), _dec3 = property(Animation), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Notify, _Component);

        function Notify() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "lab_content", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "animation", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Notify.prototype;

        _proto.onLoad = function onLoad() {
          if (this.animation) this.animation.on(Animation.EventType.FINISHED, this.onFinished, this);
        };

        _proto.onFinished = function onFinished() {
          this.node.destroy();
        }
        /**
         * 显示提示
         * @param msg       文本
         * @param useI18n   设置为 true 时，使用多语言功能 msg 参数为多语言 key
         */
        ;

        _proto.toast = function toast(msg, useI18n) {
          var label = this.lab_content.getComponent(LanguageLabel);

          if (useI18n) {
            label.enabled = true;
            label.dataID = msg;
          } else {
            label.enabled = false;
            this.lab_content.string = msg;
          }
        };

        return Notify;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lab_content", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ObjectUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "86827QLFSRM7Zojsx0WqWuQ", "ObjectUtil", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-07-26 15:29:57
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-02 12:07:54
       */

      /** 对象工具 */


      var ObjectUtil = exports('ObjectUtil', /*#__PURE__*/function () {
        function ObjectUtil() {}
        /**
         * 判断指定的值是否为对象
         * @param value 值
         */


        ObjectUtil.isObject = function isObject(value) {
          return Object.prototype.toString.call(value) === '[object Object]';
        }
        /**
         * 深拷贝
         * @param target 目标
         */
        ;

        ObjectUtil.deepCopy = function deepCopy(target) {
          if (target == null || typeof target !== 'object') {
            return target;
          }

          var result = null;

          if (target instanceof Date) {
            result = new Date();
            result.setTime(target.getTime());
            return result;
          }

          if (target instanceof Array) {
            result = [];

            for (var i = 0, length = target.length; i < length; i++) {
              result[i] = this.deepCopy(target[i]);
            }

            return result;
          }

          if (target instanceof Object) {
            result = {};

            for (var key in target) {
              if (target.hasOwnProperty(key)) {
                result[key] = this.deepCopy(target[key]);
              }
            }

            return result;
          }

          console.warn("\u4E0D\u652F\u6301\u7684\u7C7B\u578B\uFF1A" + result);
        }
        /**
         * 拷贝对象
         * @param target 目标
         */
        ;

        ObjectUtil.copy = function copy(target) {
          return JSON.parse(JSON.stringify(target));
        };

        return ObjectUtil;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Oops.ts", ['cc', './ECS.ts', './HttpRequest.ts', './NetManager.ts', './Config.ts', './MessageManager.ts', './ResLoader.ts', './Logger.ts', './RandomManager.ts', './StorageManager.ts'], function (exports) {
  var cclegacy, ecs, HttpRequest, NetManager, Config, MessageManager, ResLoader, Logger, RandomManager, StorageManager;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ecs = module.ecs;
    }, function (module) {
      HttpRequest = module.HttpRequest;
    }, function (module) {
      NetManager = module.NetManager;
    }, function (module) {
      Config = module.Config;
    }, function (module) {
      MessageManager = module.MessageManager;
    }, function (module) {
      ResLoader = module.ResLoader;
    }, function (module) {
      Logger = module.Logger;
    }, function (module) {
      RandomManager = module.RandomManager;
    }, function (module) {
      StorageManager = module.StorageManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "cbae5wzfSZGzZMuyeAetSfg", "Oops", undefined);
      /** 框架版本号 */


      var version = exports('version', "1.1.3");
      /** 框架核心模块访问入口 */

      var oops = exports('oops', function oops() {});
      /** ----------核心模块---------- */

      /** 日志管理 */

      oops.log = Logger;
      /** 游戏配置 */

      oops.config = new Config();
      /** 全局消息 */

      oops.message = MessageManager.Instance;
      /** 随机工具 */

      oops.random = RandomManager.instance;
      /** 本地存储 */

      oops.storage = new StorageManager();
      /** 游戏时间管理 */

      oops.timer = void 0;
      /** 游戏音乐管理 */

      oops.audio = void 0;
      /** 二维界面管理 */

      oops.gui = void 0;
      /** 三维游戏世界管理 */

      oops.game = void 0;
      /** 资源管理 */

      oops.res = new ResLoader();
      /** ----------可选模块---------- */

      /** 多语言模块 */

      oops.language = void 0;
      /** HTTP */

      oops.http = new HttpRequest();
      /** WebSocket */

      oops.tcp = new NetManager();
      /** ECS */

      oops.ecs = new ecs.RootSystem();

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OrbitCamera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Vec3, Quat, Node, input, Input, lerp, Component, Vec2;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Node = module.Node;
      input = module.input;
      Input = module.Input;
      lerp = module.lerp;
      Component = module.Component;
      Vec2 = module.Vec2;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

      cclegacy._RF.push({}, "4e454G/OQ1NB7tjzAUf269U", "OrbitCamera", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var tempVec3 = new Vec3();
      var tempVec3_2 = new Vec3();
      var tempQuat = new Quat();
      var DeltaFactor = 1 / 200;
      /** 
       * 轨道摄影机
       * 1、触摸自由旋转
       * 2、镜头远近鼠标滚轮调节
       * 3、固定为第三人称摄像机
       */

      var OrbitCamera = exports('OrbitCamera', (_dec = ccclass('OrbitCamera'), _dec2 = property({
        tooltip: "是否启动触摸控制"
      }), _dec3 = property({
        tooltip: "是否开启启用缩放半径（鼠标滚轮控制摄像机与目标距离）"
      }), _dec4 = property({
        tooltip: "摄像机与目标的半径缩放速度",
        visible: function visible() {
          //@ts-ignore
          return this.enableScaleRadius === true;
        }
      }), _dec5 = property({
        tooltip: "摄像机与目标的半径最小值",
        visible: function visible() {
          //@ts-ignore
          return this.enableScaleRadius === true;
        }
      }), _dec6 = property({
        tooltip: "摄像机与目标的半径最大值",
        visible: function visible() {
          //@ts-ignore
          return this.enableScaleRadius === true;
        }
      }), _dec7 = property({
        tooltip: "自动旋转是否开启"
      }), _dec8 = property({
        tooltip: "自动旋转速度",
        visible: function visible() {
          //@ts-ignore
          return this.autoRotate === true;
        }
      }), _dec9 = property({
        tooltip: "旋转速度"
      }), _dec10 = property({
        tooltip: "跟随速度"
      }), _dec11 = property({
        tooltip: "X轴旋转范围（人物上下看的角度控制）"
      }), _dec12 = property({
        tooltip: "摄像机与目标的距离（以玩家为中心环绕球半径）"
      }), _dec13 = property({
        type: Node,
        tooltip: "跟随目标"
      }), _dec14 = property({
        type: Vec3,
        tooltip: "目标旋转偏移量（初始旋转向量）"
      }), _dec15 = property({
        tooltip: "是否跟随目标 Y 轴旋转"
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(OrbitCamera, _Component);

        function OrbitCamera() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "enableTouch", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "enableScaleRadius", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "radiusScaleSpeed", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "minRadius", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "maxRadius", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "autoRotate", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "autoRotateSpeed", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rotateSpeed", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "followSpeed", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "xRotationRange", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_targetRadius", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_target", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_startRotation", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "followTargetRotationY", _descriptor14, _assertThisInitialized(_this));

          _this._center = new Vec3(); // 摄像机视口方向量

          _this._targetCenter = new Vec3(); // 摄像机中心点位置（目标位置）

          _this._touched = false; // 是否触摸屏幕

          _this._targetRotation = new Vec3(); // 目标旋转向量

          _this._rotation = new Quat(); // 摄像机旋转四元素

          _this._radius = 10;
          return _this;
        }

        var _proto = OrbitCamera.prototype; // 当前玩家与目标半径距离

        _proto.start = function start() {
          if (this.enableTouch) {
            input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
            input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
            input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          }

          if (this.enableScaleRadius) {
            input.on(Input.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          }

          if (this.target) this.resetTargetRotation(); // 根据欧拉角信息计算摄像机四元数，旋转顺序为 YZX

          Quat.fromEuler(this._rotation, this._targetRotation.x, this._targetRotation.y, this._targetRotation.z);

          if (this.target) {
            this._targetCenter.set(this.target.worldPosition);

            this._center.set(this._targetCenter);
          }

          this._radius = this.radius;
          this.limitRotation();
        }
        /** 重置摄像机到初始位置 */
        ;

        _proto.resetTargetRotation = function resetTargetRotation() {
          var targetRotation = this._targetRotation.set(this._startRotation);

          if (this.followTargetRotationY) {
            targetRotation = tempVec3_2.set(targetRotation);
            Quat.toEuler(tempVec3, this.target.worldRotation);
            targetRotation.add(tempVec3);
          }
        }
        /** 限制 X 轴旋转（上下看） */
        ;

        _proto.limitRotation = function limitRotation() {
          var rotation = this._targetRotation;

          if (rotation.x < this.xRotationRange.x) {
            rotation.x = this.xRotationRange.x;
          } else if (rotation.x > this.xRotationRange.y) {
            rotation.x = this.xRotationRange.y;
          }

          rotation.z = 0;
        } //#region Touch
        ;

        _proto.onTouchStart = function onTouchStart() {
          this._touched = true;
        };

        _proto.onTouchMove = function onTouchMove(event) {
          if (!this._touched) return;
          var delta = event.touch.getDelta();
          Quat.fromEuler(tempQuat, this._targetRotation.x, this._targetRotation.y, this._targetRotation.z);
          Quat.rotateX(tempQuat, tempQuat, -delta.y * DeltaFactor);
          Quat.rotateY(tempQuat, tempQuat, -delta.x * DeltaFactor);
          Quat.toEuler(this._targetRotation, tempQuat);
          this.limitRotation();
        };

        _proto.onTouchEnd = function onTouchEnd() {
          this._touched = false;
        } //#endregion
        ;

        _proto.onMouseWheel = function onMouseWheel(event) {
          var scrollY = event.getScrollY();
          this._targetRadius += this.radiusScaleSpeed * -Math.sign(scrollY); // 滚轮向前为负，滚轮向后为正

          this._targetRadius = Math.min(this.maxRadius, Math.max(this.minRadius, this._targetRadius));
        };

        _proto.update = function update(dt) {
          var targetRotation = this._targetRotation; // 是否摄像机围绕 Y 轴自动旋转

          if (this.autoRotate && !this._touched) {
            targetRotation.y += this.autoRotateSpeed * dt;
          }

          if (this.target) {
            // 重置摄像机中心点
            this._targetCenter.set(this.target.worldPosition); // 是否跟随 Y 轴目标旋转


            if (this.followTargetRotationY) {
              targetRotation = tempVec3_2.set(targetRotation);
              Quat.toEuler(tempVec3, this.target.worldRotation);
              targetRotation.y += tempVec3.y; // 运行时，只变化 Y 旋转
            }
          }

          Quat.fromEuler(tempQuat, targetRotation.x, targetRotation.y, targetRotation.z); // 获取目标对象的旋转四元素（人物面向与摄像机一至）

          Quat.slerp(this._rotation, this._rotation, tempQuat, dt * 7 * this.rotateSpeed); // 旋转线性插值（平滑摄像机视口旋转）

          Vec3.lerp(this._center, this._center, this._targetCenter, dt * 5 * this.followSpeed); // 摄像机跟随位移线性插值（平滑摄像机节点位置移动）

          this._radius = lerp(this._radius, this._targetRadius, dt * 5); // 摄像机与目标距离半径线性插值（镜头平滑前后移动)

          Vec3.transformQuat(tempVec3, Vec3.FORWARD, this._rotation); // 计算摄像机旋转后的方向量

          Vec3.multiplyScalar(tempVec3, tempVec3, this._radius); // 计算摄像机与目标半径向量

          tempVec3.add(this._center); // 计算摄像机与目标偏移后的位置

          this.node.position = tempVec3; // 设置摄像机位置

          this.node.lookAt(this._center); // 设置摄像机视口方向
        }
        /** 摄像机立即跟随到制定目标的位置 */
        ;

        _proto.follow = function follow() {
          var targetRotation = this._targetRotation;

          if (this.target) {
            // 重置摄像机中心点
            this._targetCenter.set(this.target.worldPosition); // 是否跟随 Y 轴目标旋转


            if (this.followTargetRotationY) {
              targetRotation = tempVec3_2.set(targetRotation);
              Quat.toEuler(tempVec3, this.target.worldRotation);
              targetRotation.y += tempVec3.y; // 运行时，只变化 Y 旋转
            }
          }

          Quat.fromEuler(tempQuat, targetRotation.x, targetRotation.y, targetRotation.z); // 获取目标对象的旋转四元素（人物面向与摄像机一至）

          this._rotation = tempQuat;
          this._center = this._targetCenter;
          this._radius = this._targetRadius;
          Vec3.transformQuat(tempVec3, Vec3.FORWARD, this._rotation); // 计算摄像机旋转后的方向量

          Vec3.multiplyScalar(tempVec3, tempVec3, this._radius); // 计算摄像机与目标半径向量

          tempVec3.add(this._center); // 计算摄像机与目标偏移后的位置

          this.node.position = tempVec3; // 设置摄像机位置

          this.node.lookAt(this._center); // 设置摄像机视口方向
        };

        _createClass(OrbitCamera, [{
          key: "radius",
          get: function get() {
            return this._targetRadius;
          },
          set: function set(v) {
            this._targetRadius = v;
          }
        }, {
          key: "target",
          get: function get() {
            return this._target;
          },
          set: function set(v) {
            this._target = v;

            this._targetRotation.set(this._startRotation);

            this._targetCenter.set(v.worldPosition);
          }
        }, {
          key: "targetRotation",
          get: function get() {
            {
              this._startRotation.set(this._targetRotation);
            }
            return this._startRotation;
          },
          set: function set(v) {
            this._targetRotation.set(v);

            this._startRotation.set(v);
          }
        }]);

        return OrbitCamera;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enableTouch", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "enableScaleRadius", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "radiusScaleSpeed", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "minRadius", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "maxRadius", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "autoRotate", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "autoRotateSpeed", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 90;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "rotateSpeed", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "followSpeed", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "xRotationRange", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(5, 70);
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_targetRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "radius", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "radius"), _class2.prototype), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_target", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "target", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "target"), _class2.prototype), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_startRotation", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "targetRotation", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "targetRotation"), _class2.prototype), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "followTargetRotationY", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PhysicsUtil.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c1584nuvI9HtJ5IHcmFEBzR", "PhysicsUtil", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-07-21 17:30:59
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-02 14:40:28
       */

      /** 物理分组数据 */


      var GroupItem = exports('GroupItem', /*#__PURE__*/function () {
        /**
         * 构造函数
         * @param value 分组值
         * @param name  分组名
         */
        function GroupItem(value, name) {
          this._value = void 0;
          this._name = void 0;
          this._value = value;
          this._name = name;
        }

        _createClass(GroupItem, [{
          key: "value",
          get:
          /** 分组值 */
          function get() {
            return this._value;
          }
        }, {
          key: "name",
          get:
          /** 分组名 */
          function get() {
            return this._name;
          }
          /** 碰撞掩码 */

        }, {
          key: "mask",
          get: function get() {
            return 1 << this._value;
          }
        }]);

        return GroupItem;
      }());
      /***
       * 为了方便使用，将编辑器中的物理分组定义到代码。如果编辑器中有修改，确保同步到这里。
       */

      var PhysicsUtil = exports('PhysicsUtil', /*#__PURE__*/function () {
        function PhysicsUtil() {}

        PhysicsUtil.setNodeLayer = function setNodeLayer(item, node) {
          node.layer = item.mask;
          node.children.forEach(function (n) {
            n.layer = item.mask;
            PhysicsUtil.setNodeLayer(item, n);
          });
        };

        return PhysicsUtil;
      }());
      /** 默认物理分组 */

      PhysicsUtil.DEFAULT = new GroupItem(0, 'DEFAULT');
      /** 能通过屏幕触摸中发出的射线检查到的游戏对象 */

      PhysicsUtil.GAME_OBJECT_SELECT = new GroupItem(1, 'GAME_OBJECT_SELECT');
      /** 玩家自己 */

      PhysicsUtil.GAME_OWNER = new GroupItem(2, 'GAME_OWNER');

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlatformUtil.ts", ['cc'], function (exports) {
  var cclegacy, native, sys;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      native = module.native;
      sys = module.sys;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c08229jnmdPP5vR721N6GG9", "PlatformUtil", undefined);
      /** 平台数据 */


      var PlatformUtil = exports('PlatformUtil', /*#__PURE__*/function () {
        function PlatformUtil() {}
        /** 是否为安卓系统 */


        PlatformUtil.isNativeAndroid = function isNativeAndroid() {
          if (typeof native == "undefined") return false;
          if (sys.isNative && sys.platform === sys.Platform.ANDROID) return true;
          return false;
        }
        /** 是否为苹果系统 */
        ;

        PlatformUtil.isNativeIOS = function isNativeIOS() {
          if (typeof native == "undefined") return false;
          if (sys.isNative && sys.os === sys.OS.IOS) return true;
          return false;
        }
        /** 获取平台名 */
        ;

        PlatformUtil.getPlateform = function getPlateform() {
          if (this.isNativeAndroid()) return 'android';else if (this.isNativeIOS()) return 'ios';else return 'h5';
        } // static isIOSWebview() {
        //     //@ts-ignore
        //     if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sdkLoginOut)
        //         return true
        //     else
        //         return false
        // }
        ;

        return PlatformUtil;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Priority.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BranchNode.ts'], function (exports) {
  var _inheritsLoose, cclegacy, BranchNode;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BranchNode = module.BranchNode;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f7555DSpj9LbYpRDi8/UKdN", "Priority", undefined);
      /** 优先 */


      var Priority = exports('Priority', /*#__PURE__*/function (_BranchNode) {
        _inheritsLoose(Priority, _BranchNode);

        function Priority() {
          return _BranchNode.apply(this, arguments) || this;
        }

        var _proto = Priority.prototype;

        _proto.success = function success() {
          _BranchNode.prototype.success.call(this);

          this._control.success();
        };

        _proto.fail = function fail() {
          _BranchNode.prototype.fail.call(this);

          this._actualTask += 1;

          if (this._actualTask < this.children.length) {
            this._run(this._blackboard);
          } else {
            this._control.fail();
          }
        };

        return Priority;
      }(BranchNode));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RandomManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3e09eJBwfZBsLPqFszZLvMS", "RandomManager", undefined);
      /** 引擎 utils.ts 中有一些基础数学方法 */

      /** 随机管理 */


      var RandomManager = exports('RandomManager', /*#__PURE__*/function () {
        function RandomManager() {
          /** 是否运行在客户端环境 */
          this.isClient = true;
          /** 是否为全局伪随机 */

          this.isGlobal = false;
          this.random = null;
        }

        var _proto = RandomManager.prototype;

        _proto.getRandom = function getRandom() {
          return this.isGlobal ? Math.random() : this.random();
        }
        /** 设置随机种子 */
        ;

        _proto.setSeed = function setSeed(seed) {
          if (this.isClient) {
            //注：seedrandom.min.js文件在Cocos Creator中导入为插件生效
            //@ts-ignore
            if (Math.seedrandom) {
              if (this.isGlobal) //@ts-ignore
                new Math.seedrandom(seed, {
                  global: true
                });else //@ts-ignore
                this.random = new Math.seedrandom(seed);
            }
          } else {
            var seedrandom = require('seedrandom');

            if (this.isGlobal) new seedrandom(seed, {
              global: true
            });else this.random = new seedrandom(seed);
          }
        }
        /**
         * 生成指定范围的随机浮点数
         * @param min   最小值
         * @param max   最大值
         * @param type  类型
         */
        ;

        _proto.getRandomFloat = function getRandomFloat(min, max) {
          if (min === void 0) {
            min = 0;
          }

          if (max === void 0) {
            max = 1;
          }

          return this.getRandom() * (max - min) + min;
        }
        /**
         * 生成指定范围的随机整数
         * @param min   最小值
         * @param max   最大值
         * @param type  类型
         * @example
        var min = 1;
        var max = 10;
        // [min,max) 得到一个两数之间的随机整数,这个值不小于min（如果min不是整数的话，得到一个向上取整的 min），并且小于（但不等于）max  
        RandomManager.instance.getRandomInt(min, max, 1);
          // [min,max] 得到一个两数之间的随机整数，包括两个数在内,这个值比min大（如果min不是整数，那就不小于比min大的整数），但小于（但不等于）max
        RandomManager.instance.getRandomInt(min, max, 2);
          // (min,max) 得到一个两数之间的随机整数
        RandomManager.instance.getRandomInt(min, max, 3);
         */
        ;

        _proto.getRandomInt = function getRandomInt(min, max, type) {
          if (type === void 0) {
            type = 2;
          }

          min = Math.ceil(min);
          max = Math.floor(max);

          switch (type) {
            case 1:
              // [min,max) 得到一个两数之间的随机整数,这个值不小于min（如果min不是整数的话，得到一个向上取整的 min），并且小于（但不等于）max  
              return Math.floor(this.getRandom() * (max - min)) + min;

            case 2:
              // [min,max] 得到一个两数之间的随机整数，包括两个数在内,这个值比min大（如果min不是整数，那就不小于比min大的整数），但小于（但不等于）max
              return Math.floor(this.getRandom() * (max - min + 1)) + min;

            case 3:
              // (min,max) 得到一个两数之间的随机整数
              return Math.floor(this.getRandom() * (max - min - 1)) + min + 1;
          }

          return 0;
        }
        /**
         * 根据最大值，最小值范围生成随机数数组
         * @param min   最小值
         * @param max   最大值
         * @param n     随机个数
         * @param type  类型
         * @example
        var a = RandomManager.instance.getRandomByMinMaxList(50, 100, 5)
        console.log("随机的数字", a);
         */
        ;

        _proto.getRandomByMinMaxList = function getRandomByMinMaxList(min, max, n) {
          var result = [];

          for (var i = 0; i < n; i++) {
            result.push(this.getRandomInt(min, max));
          }

          return result;
        }
        /**
         * 获取数组中随机对象
         * @param objects 对象数组
         * @param n 随机个数
         * @example
        var b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var r = RandomManager.instance.getRandomByObjectList(b, 5);
        console.log("原始的对象", b);
        console.log("随机的对象", r);
         */
        ;

        _proto.getRandomByObjectList = function getRandomByObjectList(objects, n) {
          var temp = objects.slice();
          var result = [];

          for (var i = 0; i < n; i++) {
            var index = this.getRandomInt(0, objects.length, n);
            result.push(temp.splice(index, 1)[0]);
          }

          return result;
        }
        /**
         * 定和随机分配
         * @param n     随机数量
         * @param sum   随机元素合
         * @example
        var c = RandomManager.instance.getRandomBySumList(5, -100);
        console.log("定和随机分配", c);
         */
        ;

        _proto.getRandomBySumList = function getRandomBySumList(n, sum) {
          var residue = sum;
          var value = 0;
          var result = [];

          for (var i = 0; i < n; i++) {
            value = this.getRandomInt(0, residue, 3);

            if (i == n - 1) {
              value = residue;
            } else {
              residue -= value;
            }

            result.push(value);
          }

          return result;
        };

        _createClass(RandomManager, null, [{
          key: "instance",
          get:
          /** 随机数管理单例对象 */
          function get() {
            if (this._instance == null) {
              this._instance = new RandomManager();
              this._instance.random = Math.random;
            }

            return this._instance;
          }
        }]);

        return RandomManager;
      }());
      RandomManager._instance = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RegexUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dec9bVPigFCmKy5NVk+0y7h", "RegexUtil", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-07-26 15:29:57
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-02 12:08:25
       */

      /** 正则工具 */


      var RegexUtil = exports('RegexUtil', /*#__PURE__*/function () {
        function RegexUtil() {}
        /**
         * 判断字符是否为双字节字符（如中文字符）
         * @param string 原字符串
         */


        RegexUtil.isDoubleWord = function isDoubleWord(string) {
          return /[^\x00-\xff]/.test(string);
        };

        return RegexUtil;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResLoader.ts", ['cc'], function (exports) {
  var cclegacy, assetManager, error, js, Asset, resources;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      assetManager = module.assetManager;
      error = module.error;
      js = module.js;
      Asset = module.Asset;
      resources = module.resources;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1a2e4jFffpHrYjrpxbnC760", "ResLoader", undefined); // (error: Error | null, asset: T) => void;  (error: Error | null, asset: T[], urls: string[]) => void;

      /** 
       * 游戏资管理 
       * 1、加载默认resources文件夹中资源
       * 2、加载默认bundle远程资源
       * 3、主动传递bundle名时，优先加载传递bundle名资源包中的资源
       */


      var ResLoader = exports('ResLoader', /*#__PURE__*/function () {
        function ResLoader() {
          /** 全局默认加载的资源包名 */
          this.defaultBundleName = "resources";
        }

        var _proto = ResLoader.prototype;

        _proto.loadRemote = function loadRemote(url) {
          var options = null;
          var onComplete = null;

          if ((arguments.length <= 1 ? 0 : arguments.length - 1) == 2) {
            options = arguments.length <= 1 ? undefined : arguments[1];
            onComplete = arguments.length <= 2 ? undefined : arguments[2];
          } else {
            onComplete = arguments.length <= 1 ? undefined : arguments[1];
          }

          assetManager.loadRemote(url, options, onComplete);
        }
        /**
         * 加载资源包
         * @param url       资源地址
         * @param complete  完成事件
         * @param v         资源MD5版本号
         * @example
        var serverUrl = "http://192.168.1.8:8080/";         // 服务器地址
        var md5 = "8e5c0";                                  // Cocos Creator 构建后的MD5字符
        await oops.res.loadBundle(serverUrl,md5);
         */
        ;

        _proto.loadBundle = function loadBundle(url, v) {
          return new Promise(function (resolve, reject) {
            assetManager.loadBundle(url, {
              version: v
            }, function (err, bundle) {
              if (err) {
                return error(err);
              }

              resolve(bundle);
            });
          });
        }
        /**
         * 加载一个资源
         * @param bundleName    远程包名
         * @param paths         资源路径
         * @param type          资源类型
         * @param onProgress    加载进度回调
         * @param onComplete    加载完成回调
         * @example
        oops.res.load("spine_path", sp.SkeletonData, (err: Error | null, sd: sp.SkeletonData) => {
        });
         */
        ;

        _proto.load = function load(bundleName, paths, type, onProgress, onComplete) {
          var args = null;

          if (typeof paths === "string" || paths instanceof Array) {
            args = this.parseLoadResArgs(paths, type, onProgress, onComplete);
            args.bundle = bundleName;
          } else {
            args = this.parseLoadResArgs(bundleName, paths, type, onProgress);
            args.bundle = this.defaultBundleName;
          }

          this.loadByArgs(args);
        };

        _proto.loadAsync = function loadAsync(bundleName, paths, type) {
          var _this = this;

          return new Promise(function (resolve, reject) {
            _this.load(bundleName, paths, type, function (err, asset) {
              if (err) {
                error(err.message);
              }

              resolve(asset);
            });
          });
        }
        /**
         * 加载文件夹中的资源
         * @param bundleName    远程包名
         * @param dir           文件夹名
         * @param type          资源类型
         * @param onProgress    加载进度回调
         * @param onComplete    加载完成回调
         * @example
        // 加载进度事件
        var onProgressCallback = (finished: number, total: number, item: any) => {
        console.log("资源加载进度", finished, total);
        }
        // 加载完成事件
        var onCompleteCallback = () => {
        console.log("资源加载完成");
        }
        oops.res.loadDir("game", onProgressCallback, onCompleteCallback);
         */
        ;

        _proto.loadDir = function loadDir(bundleName, dir, type, onProgress, onComplete) {
          var args = null;

          if (typeof dir === "string") {
            args = this.parseLoadResArgs(dir, type, onProgress, onComplete);
            args.bundle = bundleName;
          } else {
            args = this.parseLoadResArgs(bundleName, dir, type, onProgress);
            args.bundle = this.defaultBundleName;
          }

          args.dir = args.paths;
          this.loadByArgs(args);
        }
        /**
         * 通过资源相对路径释放资源
         * @param path          资源路径
         * @param bundleName    远程资源包名
         */
        ;

        _proto.release = function release(path, bundleName) {
          if (bundleName == null) bundleName = this.defaultBundleName;
          var bundle = assetManager.getBundle(bundleName);

          if (bundle) {
            var asset = bundle.get(path);

            if (asset) {
              this.releasePrefabtDepsRecursively(asset._uuid);
            }
          }
        }
        /**
         * 通过相对文件夹路径删除所有文件夹中资源
         * @param path          资源文件夹路径
         * @param bundleName    远程资源包名
         */
        ;

        _proto.releaseDir = function releaseDir(path, bundleName) {
          var _this2 = this;

          if (bundleName == null) bundleName = this.defaultBundleName;
          var bundle = assetManager.getBundle(bundleName);

          if (bundle) {
            var infos = bundle.getDirWithPath(path);

            if (infos) {
              infos.map(function (info) {
                _this2.releasePrefabtDepsRecursively(info.uuid);
              });
            }

            if (path == "" && bundleName != "resources") {
              assetManager.removeBundle(bundle);
            }
          }
        }
        /** 释放预制依赖资源 */
        ;

        _proto.releasePrefabtDepsRecursively = function releasePrefabtDepsRecursively(uuid) {
          var asset = assetManager.assets.get(uuid);
          assetManager.releaseAsset(asset); // Cocos引擎内部已处理子关联资源的释放
          // if (asset instanceof Prefab) {
          //     var uuids: string[] = assetManager.dependUtil.getDepsRecursively(uuid)!;
          //     uuids.forEach(uuid => {
          //         var asset = assetManager.assets.get(uuid)!;
          //         asset.decRef();
          //     });
          // }
        }
        /**
         * 获取资源
         * @param path          资源路径
         * @param type          资源类型
         * @param bundleName    远程资源包名
         */
        ;

        _proto.get = function get(path, type, bundleName) {
          if (bundleName == null) bundleName = this.defaultBundleName;
          var bundle = assetManager.getBundle(bundleName);
          return bundle.get(path, type);
        }
        /** 打印缓存中所有资源信息 */
        ;

        _proto.dump = function dump() {
          assetManager.assets.forEach(function (value, key) {
            console.log(assetManager.assets.get(key));
          });
          console.log("\u5F53\u524D\u8D44\u6E90\u603B\u6570:" + assetManager.assets.count);
        };

        _proto.parseLoadResArgs = function parseLoadResArgs(paths, type, onProgress, onComplete) {
          var pathsOut = paths;
          var typeOut = type;
          var onProgressOut = onProgress;
          var onCompleteOut = onComplete;

          if (onComplete === undefined) {
            var isValidType = js.isChildClassOf(type, Asset);

            if (onProgress) {
              onCompleteOut = onProgress;

              if (isValidType) {
                onProgressOut = null;
              }
            } else if (onProgress === undefined && !isValidType) {
              onCompleteOut = type;
              onProgressOut = null;
              typeOut = null;
            }

            if (onProgress !== undefined && !isValidType) {
              onProgressOut = type;
              typeOut = null;
            }
          }

          return {
            paths: pathsOut,
            type: typeOut,
            onProgress: onProgressOut,
            onComplete: onCompleteOut
          };
        };

        _proto.loadByBundleAndArgs = function loadByBundleAndArgs(bundle, args) {
          if (args.dir) {
            bundle.loadDir(args.paths, args.type, args.onProgress, args.onComplete);
          } else {
            if (typeof args.paths == 'string') {
              bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            } else {
              bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            }
          }
        };

        _proto.loadByArgs = function loadByArgs(args) {
          var _this3 = this;

          if (args.bundle) {
            if (assetManager.bundles.has(args.bundle)) {
              var bundle = assetManager.bundles.get(args.bundle);
              this.loadByBundleAndArgs(bundle, args);
            } else {
              // 自动加载bundle
              assetManager.loadBundle(args.bundle, function (err, bundle) {
                if (!err) {
                  _this3.loadByBundleAndArgs(bundle, args);
                }
              });
            }
          } else {
            this.loadByBundleAndArgs(resources, args);
          }
        };

        return ResLoader;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Root.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Language.ts', './BuildTimeConstants.ts', './GameConfig.ts', './GameQueryConfig.ts', './Oops.ts', './AudioManager.ts', './EventMessage.ts', './GameManager.ts', './GUI.ts', './LayerManager.ts', './TimerManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, JsonAsset, game, director, Game, log, sys, view, Component, LanguageManager, BuildTimeConstants, GameConfig, GameQueryConfig, version, oops, AudioManager, EventMessage, GameManager, GUI, LayerManager, TimerManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      JsonAsset = module.JsonAsset;
      game = module.game;
      director = module.director;
      Game = module.Game;
      log = module.log;
      sys = module.sys;
      view = module.view;
      Component = module.Component;
    }, function (module) {
      LanguageManager = module.LanguageManager;
    }, function (module) {
      BuildTimeConstants = module.BuildTimeConstants;
    }, function (module) {
      GameConfig = module.GameConfig;
    }, function (module) {
      GameQueryConfig = module.GameQueryConfig;
    }, function (module) {
      version = module.version;
      oops = module.oops;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EventMessage = module.EventMessage;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      GUI = module.GUI;
    }, function (module) {
      LayerManager = module.LayerManager;
    }, function (module) {
      TimerManager = module.TimerManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "90b9cOmlmBCnpCpEpgvdrQr", "Root", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 框架显示层根节点 */

      var Root = exports('Root', (_dec = property({
        type: Node,
        tooltip: "游戏层"
      }), _dec2 = property({
        type: Node,
        tooltip: "界面层"
      }), (_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Root, _Component);

        function Root() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 游戏层节点 */

          _initializerDefineProperty(_this, "game", _descriptor, _assertThisInitialized(_this));
          /** 界面层节点 */


          _initializerDefineProperty(_this, "gui", _descriptor2, _assertThisInitialized(_this));
          /** 持久根节点 */


          _this.persistRootNode = null;
          return _this;
        }

        var _proto = Root.prototype;

        _proto.onLoad = function onLoad() {
          var _this2 = this;

          console.log("Oops Framework v" + version);
          this.enabled = false;
          var config_name = "config";
          oops.res.load(config_name, JsonAsset, function () {
            var config = oops.res.get(config_name);
            oops.config.btc = new BuildTimeConstants();
            oops.config.query = new GameQueryConfig();
            oops.config.game = new GameConfig(config);
            oops.http.server = oops.config.game.httpServer; // Http 服务器地址

            oops.http.timeout = oops.config.game.httpTimeout; // Http 请求超时时间

            oops.storage.init(oops.config.game.localDataKey, oops.config.game.localDataIv); // 初始化本地存储加密

            game.frameRate = oops.config.game.frameRate; // 初始化每秒传输帧数

            _this2.enabled = true;

            _this2.init();

            _this2.run();
          });
        };

        _proto.update = function update(dt) {
          oops.ecs.execute(dt);
        }
        /** 初始化游戏界面 */
        ;

        _proto.initGui = function initGui() {}
        /** 初始化游戏业务模块 */
        ;

        _proto.initEcsSystem = function initEcsSystem() {}
        /** 加载完引擎配置文件后执行 */
        ;

        _proto.run = function run() {};

        _proto.init = function init() {
          // 创建持久根节点
          this.persistRootNode = new Node("PersistRootNode");
          director.addPersistRootNode(this.persistRootNode); // 创建音频模块

          oops.audio = this.persistRootNode.addComponent(AudioManager);
          oops.audio.load(); // 创建时间模块

          oops.timer = this.persistRootNode.addComponent(TimerManager);
          oops.language = new LanguageManager();
          oops.game = new GameManager(this.game);
          oops.gui = new LayerManager(this.gui);
          this.initGui();
          this.initEcsSystem();
          oops.ecs.init(); // 游戏显示事件

          game.on(Game.EVENT_SHOW, function () {
            log("Game.EVENT_SHOW");
            oops.timer.load(); // 平台不需要在退出时精准计算时间，直接暂时游戏时间

            oops.audio.resumeAll();
            director.resume();
            game.resume();
            oops.message.dispatchEvent(EventMessage.GAME_ENTER);
          }); // 游戏隐藏事件

          game.on(Game.EVENT_HIDE, function () {
            log("Game.EVENT_HIDE");
            oops.timer.save(); // 平台不需要在退出时精准计算时间，直接暂时游戏时间

            oops.audio.pauseAll();
            director.pause();
            game.pause();
            oops.message.dispatchEvent(EventMessage.GAME_EXIT);
          }); // 游戏尺寸修改事件

          var c_gui = this.gui.addComponent(GUI);

          if (sys.isMobile == false) {
            view.setResizeCallback(function () {
              c_gui.resize();
              oops.message.dispatchEvent(EventMessage.GAME_RESIZE);
            });
          }
        };

        return Root;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "game", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "gui", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class)));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RotateUtil.ts", ['cc', './Vec3Util.ts'], function (exports) {
  var cclegacy, Quat, Vec3, toRadian, Vec3Util;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Quat = module.Quat;
      Vec3 = module.Vec3;
      toRadian = module.toRadian;
    }, function (module) {
      Vec3Util = module.Vec3Util;
    }],
    execute: function () {
      cclegacy._RF.push({}, "103324kr75Hi5d7RZCcRt3P", "RotateUtil", undefined);
      /** 旋转工具 */


      var RotateUtil = exports('RotateUtil', /*#__PURE__*/function () {
        function RotateUtil() {}
        /**
         * 自由旋转
         * @param target     旋转目标
         * @param axis       围绕旋转的轴
         * @param rad        旋转弧度
         */


        RotateUtil.rotateAround = function rotateAround(target, axis, rad) {
          var quat = new Quat();
          Quat.rotateAround(quat, target.getRotation(), axis.normalize(), rad);
          target.setRotation(quat);
        }
        /**
         * 参考瞄准目标,使当前物体围绕瞄准目标旋转
         * 1、先通过弧度计算旋转四元数
         * 2、通过旋转中心点或当前目标点向量相减计算出移动方向
         * 3、计算起始向量旋转后的向量
         * 4、计算旋转后的坐标点
         * @param lookAt  瞄准目标
         * @param target        旋转目标
         * @param axis          围绕旋转的轴(例：Vec3.UP为Y轴)
         * @param rad           旋转弧度(例：delta.x * 1e-2)
         */
        ;

        RotateUtil.rotateAroundTarget = function rotateAroundTarget(lookAt, target, axis, rad) {
          // 计算坐标
          var point_lookAt = lookAt.worldPosition; // 锚点坐标

          var point_target = target.worldPosition; // 目标坐标

          var quat = new Quat();
          var vec3 = new Vec3(); // 算出坐标点的旋转四元数

          Quat.fromAxisAngle(quat, axis, rad); // 计算旋转点和现有点的向量

          Vec3.subtract(vec3, point_target, point_lookAt); // 计算将向量做旋转操作后的向量

          Vec3.transformQuat(vec3, vec3, quat); // 计算目标旋转后的点

          Vec3.add(vec3, point_lookAt, vec3);
          target.setWorldPosition(vec3); // 计算目标朝向瞄准点

          Quat.rotateAround(quat, target.worldRotation, axis, rad);
          Quat.normalize(quat, quat);
          target.setWorldRotation(quat);
        }
        /**
         * 获取心半径边上的位置
         * @param center    圆心
         * @param radius    半径
         * @param angle     角度
         */
        ;

        RotateUtil.circularEdgePosition = function circularEdgePosition(center, radius, angle) {
          var edge = Vec3Util.z.multiplyScalar(radius); // 距离圆心Z抽的距离

          var dir = Vec3Util.sub(edge, center); // 初始圆心与目标位置的方向

          var vec3 = new Vec3();
          var quat = new Quat(); // 算出坐标点的旋转四元数

          Quat.fromAxisAngle(quat, Vec3.UP, toRadian(angle)); // 计算将向量做旋转操作后的向量

          Vec3.transformQuat(vec3, dir, quat); // 计算目标旋转后的点

          Vec3.add(vec3, center, vec3);
          return vec3;
        };

        return RotateUtil;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RoundRectMask.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Mask, CCFloat, UITransform, game, Game, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Mask = module.Mask;
      CCFloat = module.CCFloat;
      UITransform = module.UITransform;
      game = module.game;
      Game = module.Game;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "da0f8CBQkZDqaekNuERqKjA", "RoundRectMask", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          disallowMultiple = _decorator.disallowMultiple,
          requireComponent = _decorator.requireComponent,
          menu = _decorator.menu;
      var RoundRectMask = exports('RoundRectMask', (_dec = ccclass('RoundRectMask'), _dec2 = executeInEditMode(true), _dec3 = disallowMultiple(true), _dec4 = requireComponent(Mask), _dec5 = menu('渲染组件/圆角遮罩'), _dec6 = property({
        type: CCFloat,
        tooltip: '圆角半径:\n0-1之间为最小边长比例值, \n>1为具体像素值'
      }), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RoundRectMask, _Component);

        function RoundRectMask() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this; // 圆角半径

          _initializerDefineProperty(_this, "propRadius", _descriptor, _assertThisInitialized(_this));

          _this.mask = null;
          return _this;
        }

        var _proto = RoundRectMask.prototype;

        _proto.onEnable = function onEnable() {
          this.mask = this.getComponent(Mask);
          this.updateMask(this.radius);
        };

        _proto.updateMask = function updateMask(r) {
          var _radius = r >= 0 ? r : 0;

          if (_radius < 1) {
            var uiTransform = this.node.getComponent(UITransform);
            _radius = Math.min((uiTransform == null ? void 0 : uiTransform.width) || 0, (uiTransform == null ? void 0 : uiTransform.width) || 0) * _radius;
          }

          if (this.mask) {
            // @ts-ignore.
            this.mask['radius'] = _radius; // @ts-ignore.

            this.mask['onDraw'] = this.onDraw.bind(this.mask);
            this.mask['_updateGraphics'] = this._updateGraphics.bind(this.mask);
            this.mask.type = Mask.Type.GRAPHICS_RECT;
          }
        };

        _proto._updateGraphics = function _updateGraphics() {
          // @ts-ignore.
          var graphics = this._graphics;

          if (!graphics) {
            return;
          }

          this.onDraw(graphics);
        }
        /**
         * mask 用于绘制罩子的函数.
         * this 指向mask 对象,需要特别注意.
         * @param graphics
         */
        ;

        _proto.onDraw = function onDraw(graphics) {
          var uiTransform = this.node.getComponent(UITransform);
          graphics.clear();
          var width = uiTransform.width;
          var height = uiTransform.height;
          var x = -width * uiTransform.anchorX;
          var y = -height * uiTransform.anchorY;
          graphics.roundRect(x, y, width, height, this.radius || 0);

          if (game.renderType === Game.RENDER_TYPE_CANVAS) {
            graphics.stroke();
          } else {
            graphics.fill();
          }
        };

        _createClass(RoundRectMask, [{
          key: "radius",
          get: function get() {
            return this.propRadius;
          },
          set: function set(r) {
            this.propRadius = r;
            this.updateMask(r);
          }
        }]);

        return RoundRectMask;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "propRadius", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _class2)) || _class) || _class) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RtToModel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Camera, MeshRenderer, RenderTexture, view, gfx, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Camera = module.Camera;
      MeshRenderer = module.MeshRenderer;
      RenderTexture = module.RenderTexture;
      view = module.view;
      gfx = module.gfx;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "dbd7dMQYutDs7I7uj+3zIiU", "RtToModel", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 三维摄像机内容显示到模型上 */

      var RtToModel = exports('RtToModel', (_dec = ccclass('RtToModel'), _dec2 = property(Camera), _dec3 = property(MeshRenderer), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RtToModel, _Component);

        function RtToModel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "camara", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "model", _descriptor2, _assertThisInitialized(_this));

          _this.rt = new RenderTexture();
          return _this;
        }

        var _proto = RtToModel.prototype;

        _proto.start = function start() {
          var size = view.getVisibleSize();
          var colorAttachment = new gfx.ColorAttachment();
          var depthStencilAttachment = new gfx.DepthStencilAttachment();
          var pi = new gfx.RenderPassInfo([colorAttachment], depthStencilAttachment, []);
          this.rt.reset({
            width: size.width,
            height: size.height,
            passInfo: pi
          });
          this.camara.targetTexture = this.rt;
          var mat = this.model.material;
          mat.setProperty('mainTexture', this.rt);
        };

        _proto.onDestroy = function onDestroy() {
          this.rt.destroy();
        };

        return RtToModel;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "camara", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "model", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RtToSprite.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Camera, Sprite, Node, RenderTexture, UITransform, gfx, SpriteFrame, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Camera = module.Camera;
      Sprite = module.Sprite;
      Node = module.Node;
      RenderTexture = module.RenderTexture;
      UITransform = module.UITransform;
      gfx = module.gfx;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "f608cdDWBNEKLILVNBcQYvf", "RtToSprite", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 三维模型显示到二维精灵上 */

      var RtToSprite = exports('RtToSprite', (_dec = ccclass('RtToSprite'), _dec2 = property({
        type: Camera,
        tooltip: "渲染模型的三维摄像机"
      }), _dec3 = property({
        type: Sprite,
        tooltip: "显示模型的二维精灵组件"
      }), _dec4 = property({
        tooltip: "是否触摸控制旋转"
      }), _dec5 = property({
        type: Node,
        tooltip: "三维模型",
        visible: function visible() {
          //@ts-ignore
          return this.rotation === true;
        }
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RtToSprite, _Component);

        function RtToSprite() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "camera", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "sprite", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rotation", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "model", _descriptor4, _assertThisInitialized(_this));

          _this.rt = new RenderTexture();
          _this.touched = false;
          return _this;
        }

        var _proto = RtToSprite.prototype; // 是否触摸节点

        _proto.start = function start() {
          var size = this.sprite.getComponent(UITransform);
          this.refreshRenderTexture(size.width, size.height);

          if (this.rotation) {
            this.sprite.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.sprite.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.sprite.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.sprite.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          }
        };

        _proto.onTouchStart = function onTouchStart(event) {
          this.touched = true;
        };

        _proto.onTouchMove = function onTouchMove(event) {
          if (this.touched) {
            var eulerAngles = this.model.eulerAngles;
            var deltaX = event.touch.getDelta().x;
            eulerAngles.y += -deltaX;
            this.model.eulerAngles = eulerAngles;
          }
        };

        _proto.onTouchEnd = function onTouchEnd(event) {
          this.touched = false;
        }
        /** 刷新纹理内容 */
        ;

        _proto.refreshRenderTexture = function refreshRenderTexture(w, h) {
          var colorAttachment = new gfx.ColorAttachment();
          var depthStencilAttachment = new gfx.DepthStencilAttachment();
          var pi = new gfx.RenderPassInfo([colorAttachment], depthStencilAttachment, []);
          this.rt.reset({
            width: w,
            height: h,
            passInfo: pi
          });
          var spriteframe = this.sprite.spriteFrame;
          var sp = new SpriteFrame();
          sp.reset({
            originalSize: spriteframe.originalSize,
            rect: spriteframe.rect,
            offset: spriteframe.offset,
            isRotate: spriteframe.rotated,
            borderTop: spriteframe.insetTop,
            borderLeft: spriteframe.insetLeft,
            borderBottom: spriteframe.insetBottom,
            borderRight: spriteframe.insetRight
          });
          this.camera.targetTexture = this.rt;
          sp.texture = this.rt;
          this.sprite.spriteFrame = sp;
        };

        _proto.onDestroy = function onDestroy() {
          if (this.rotation) {
            this.sprite.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.sprite.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.sprite.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.sprite.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          }

          this.rt.destroy();
        };

        return RtToSprite;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rotation", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "model", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Selector.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BranchNode.ts'], function (exports) {
  var _inheritsLoose, cclegacy, BranchNode;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BranchNode = module.BranchNode;
    }],
    execute: function () {
      cclegacy._RF.push({}, "90470XqT/FGHo/PRQktLcYy", "Selector", undefined);
      /** 
       * 逻辑或关系
       * 只要子节点有一个返回true，则停止执行其它子节点，并且Selector返回true。如果所有子节点都返回false，则Selector返回false。
       */


      var Selector = exports('Selector', /*#__PURE__*/function (_BranchNode) {
        _inheritsLoose(Selector, _BranchNode);

        function Selector() {
          return _BranchNode.apply(this, arguments) || this;
        }

        var _proto = Selector.prototype;

        _proto.success = function success() {
          _BranchNode.prototype.success.call(this);

          this._control.success();
        };

        _proto.fail = function fail() {
          _BranchNode.prototype.fail.call(this);

          this._actualTask += 1;

          if (this._actualTask < this.children.length) {
            this._run(this._blackboard);
          } else {
            this._control.fail();
          }
        };

        _proto._run = function _run(blackboard) {
          if (this._nodeRunning) {
            this._nodeRunning.run(this._blackboard);
          } else {
            _BranchNode.prototype._run.call(this);
          }
        };

        return Selector;
      }(BranchNode));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Sequence.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BranchNode.ts'], function (exports) {
  var _inheritsLoose, cclegacy, BranchNode;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BranchNode = module.BranchNode;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1ef80bgYZBPXqCDIpzHpbBJ", "Sequence", undefined);
      /** 
       * 逻辑与关系
       * 只要有一个子节点返回false，则停止执行其它子节点，并且Sequence返回false。如果所有子节点都返回true，则Sequence返回true。
       */


      var Sequence = exports('Sequence', /*#__PURE__*/function (_BranchNode) {
        _inheritsLoose(Sequence, _BranchNode);

        function Sequence(nodes) {
          return _BranchNode.call(this, nodes) || this;
        }

        var _proto = Sequence.prototype;

        _proto.success = function success() {
          _BranchNode.prototype.success.call(this);

          this._actualTask += 1;

          if (this._actualTask < this.children.length) {
            this._run(this._blackboard);
          } else {
            this._control.success();
          }
        };

        _proto.fail = function fail() {
          _BranchNode.prototype.fail.call(this);

          this._control.fail();
        };

        _proto._run = function _run(blackboard) {
          if (this._nodeRunning) {
            this._nodeRunning.run(this._blackboard);
          } else {
            _BranchNode.prototype._run.call(this);
          }
        };

        return Sequence;
      }(BranchNode));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SingletonModuleComp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ECS.ts'], function (exports) {
  var _inheritsLoose, cclegacy, ecs;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ecs = module.ecs;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "17a56vOVQFMMarANxr6JvP7", "SingletonModuleComp", undefined);
      /** 游戏单例业务模块 */


      var SingletonModuleComp = exports('SingletonModuleComp', (_dec = ecs.register('SingletonModule'), _dec(_class = /*#__PURE__*/function (_ecs$Comp) {
        _inheritsLoose(SingletonModuleComp, _ecs$Comp);

        function SingletonModuleComp() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ecs$Comp.call.apply(_ecs$Comp, [this].concat(args)) || this;
          /** 游戏初始化模块 */

          _this.initialize = null;
          return _this;
        }

        var _proto = SingletonModuleComp.prototype;

        _proto.reset = function reset() {};

        return SingletonModuleComp;
      }(ecs.Comp)) || _class));
      var smc = exports('smc', ecs.getSingleton(SingletonModuleComp));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpineFinishedRelease.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, sp, Component, oops;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
      Component = module.Component;
    }, function (module) {
      oops = module.oops;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "9589eKB/RZKXpxoYhz5SyC7", "SpineFinishedRelease", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 动画播放完隐藏特效 */

      var SpineFinishedRelease = exports('SpineFinishedRelease', (_dec = ccclass('SpineFinishedRelease'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SpineFinishedRelease, _Component);

        function SpineFinishedRelease() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "isDestroy", _descriptor, _assertThisInitialized(_this));

          _this.spine = void 0;
          _this.resPath = null;
          return _this;
        }

        var _proto = SpineFinishedRelease.prototype;
        /** 设置路径 */

        _proto.setResPath = function setResPath(path) {
          this.resPath = path;
        };

        _proto.onLoad = function onLoad() {
          var _this2 = this;

          this.spine = this.getComponent(sp.Skeleton);
          this.spine.setCompleteListener(this.onSpineComplete.bind(this));

          if (this.resPath) {
            oops.res.load(this.resPath, sp.SkeletonData, function (err, sd) {
              if (err) {
                console.error("\u52A0\u8F7D\u3010" + _this2.resPath + "\u3011\u7684 SPINE \u8D44\u6E90\u4E0D\u5B58\u5728");
                return;
              }

              _this2.spine.skeletonData = sd;

              _this2.spine.setAnimation(0, "animation", false);
            });
          } else {
            this.spine.setAnimation(0, "animation", false);
          }
        };

        _proto.onSpineComplete = function onSpineComplete() {
          if (this.isDestroy) {
            this.node.destroy();
          } else {
            this.node.removeFromParent();
          }
        };

        return SpineFinishedRelease;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "isDestroy", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StorageManager.ts", ['cc', './env', './EncryptUtil.ts'], function (exports) {
  var cclegacy, sys, PREVIEW, EncryptUtil;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }, function (module) {
      PREVIEW = module.PREVIEW;
    }, function (module) {
      EncryptUtil = module.EncryptUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ed226gLF85Oyr+WhA9TJZLX", "StorageManager", undefined);
      /** 本地存储 */


      var StorageManager = exports('StorageManager', /*#__PURE__*/function () {
        function StorageManager() {
          this._key = null;
          this._iv = null;
          this._id = "";
        }

        var _proto = StorageManager.prototype;
        /**
         * 初始化密钥
         * @param key aes加密的key 
         * @param iv  aes加密的iv
         */

        _proto.init = function init(key, iv) {
          EncryptUtil.initCrypto(key, iv);
          this._key = EncryptUtil.md5(key);
          this._iv = EncryptUtil.md5(iv);
        }
        /**
         * 设置用户唯一标识
         * @param id 
         */
        ;

        _proto.setUser = function setUser(id) {
          this._id = id;
        }
        /**
         * 存储本地数据
         * @param key 存储key
         * @param value 存储值
         * @returns 
         */
        ;

        _proto.set = function set(key, value) {
          var keywords = key + "_" + this._id;

          if (null == key) {
            console.error("存储的key不能为空");
            return;
          }

          {
            keywords = EncryptUtil.md5(keywords);
          }

          if (null == value) {
            console.warn("存储的值为空，则直接移除该存储");
            this.remove(key);
            return;
          }

          if (typeof value === 'function') {
            console.error("储存的值不能为方法");
            return;
          }

          if (typeof value === 'object') {
            try {
              value = JSON.stringify(value);
            } catch (e) {
              console.error("\u89E3\u6790\u5931\u8D25\uFF0Cstr = " + value);
              return;
            }
          } else if (typeof value === 'number') {
            value = value + "";
          }

          if (null != this._key && null != this._iv) {
            value = EncryptUtil.aesEncrypt("" + value, this._key, this._iv);
          }

          sys.localStorage.setItem(keywords, value);
        }
        /**
         * 获取指定关键字的数据
         * @param key          获取的关键字
         * @param defaultValue 获取的默认值
         * @returns 
         */
        ;

        _proto.get = function get(key, defaultValue) {
          if (defaultValue === void 0) {
            defaultValue = "";
          }

          if (null == key) {
            console.error("存储的key不能为空");
            return null;
          }

          key = key + "_" + this._id;
          {
            key = EncryptUtil.md5(key);
          }
          var str = sys.localStorage.getItem(key);

          if (null != str && '' !== str && !PREVIEW && null != this._key && null != this._iv) {
            str = EncryptUtil.aesDecrypt(str, this._key, this._iv);
          }

          if (null === str) {
            return defaultValue;
          }

          return str;
        }
        /** 获取指定关键字的数值 */
        ;

        _proto.getNumber = function getNumber(key, defaultValue) {
          if (defaultValue === void 0) {
            defaultValue = 0;
          }

          var r = this.get(key);

          if (r == "0") {
            return Number(r);
          }

          return Number(r) || defaultValue;
        }
        /** 获取指定关键字的布尔值 */
        ;

        _proto.getBoolean = function getBoolean(key) {
          var r = this.get(key);
          return Boolean(r) || false;
        }
        /** 获取指定关键字的JSON对象 */
        ;

        _proto.getJson = function getJson(key, defaultValue) {
          var r = this.get(key);
          return r && JSON.parse(r) || defaultValue;
        }
        /**
         * 删除指定关键字的数据
         * @param key 需要移除的关键字
         * @returns 
         */
        ;

        _proto.remove = function remove(key) {
          if (null == key) {
            console.error("存储的key不能为空");
            return;
          }

          var keywords = key + "_" + this._id;
          {
            keywords = EncryptUtil.md5(keywords);
          }
          sys.localStorage.removeItem(keywords);
        }
        /** 清空整个本地存储 */
        ;

        _proto.clear = function clear() {
          sys.localStorage.clear();
        };

        return StorageManager;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StringFormat.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "85fe8Gc6h5Ava+JsdbBs8cR", "StringFormat", undefined);
      /**
       * 数值格式化函数, 通过语义解析自动设置值的范围
       *     //整数
       * 1:def(0)//显示一个默认值
       */


      var StringFormat = /*#__PURE__*/function () {
        function StringFormat() {}

        var _proto = StringFormat.prototype;

        _proto.deal = function deal(value, format) {
          if (format === '') return value;
          format = format.toLowerCase().trim(); // 不区分大小

          var match_func = format.match(/^[a-z|A-Z]+/gi); // 匹配到 format 中的 函数名

          var match_num = format.match(/\d+$/gi); //匹配到 format 中的参数

          var func = '';
          var num = 0;
          var res = '';
          if (match_func) func = match_func[0];
          if (match_num) num = parseInt(match_num[0]);

          if (typeof value == 'number') {
            switch (func) {
              case 'int':
                res = this["int"](value);
                break;

              case 'fix':
                res = this.fix(value, num);
                break;

              case 'kmbt':
                res = this.KMBT(value);
                break;

              case 'per':
                res = this.per(value, num);
                break;

              case 'sep':
                res = this.sep(value);
                break;
            }
          } else {
            switch (func) {
              case 'limit':
                res = this.limit(value, num);
                break;
            }

            res = value;
          }

          return res;
        } // 将数字按分号显示
        ;

        _proto.sep = function sep(value) {
          var num = Math.round(value).toString();
          return num.replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
        } // 将数字按分显示 00:00 显示 （ms制）
        ;

        _proto.time_m = function time_m(value) {//todo
        } // 将数字按秒显示 00:00:00 显示 （ms制）
        ;

        _proto.time_s = function time_s(value) {//todo
        } // 将数字按 0:00:00:000 显示 （ms制）
        ;

        _proto.time_ms = function time_ms(value) {//todo
        } // 将时间戳显示为详细的内容
        ;

        _proto.timeStamp = function timeStamp(value) {
          //todo
          return new Date(value).toString();
        }
        /** [value:int] 将取值0~1 变成 1~100,可以指定修饰的小数位数 */
        ;

        _proto.per = function per(value, fd) {
          return Math.round(value * 100).toFixed(fd);
        }
        /** [value:int] 将取值变成整数 */
        ;

        _proto["int"] = function int(value) {
          return Math.round(value);
        }
        /** [value:fix2]数值转换为小数*/
        ;

        _proto.fix = function fix(value, fd) {
          return value.toFixed(fd);
        }
        /** [value:limit3]字符串长度限制 */
        ;

        _proto.limit = function limit(value, count) {
          return value.substring(0, count);
        }
        /** 将数字缩短显示为KMBT单位 大写,目前只支持英文 */
        ;

        _proto.KMBT = function KMBT(value, lang) {
          //10^4=万, 10^8=亿,10^12=兆,10^16=京，
          var counts = [1000, 1000000, 1000000000, 1000000000000];
          var units = ['', 'K', 'M', 'B', 'T'];
          return this.compressUnit(value, counts, units, 2);
        } //压缩任意单位的数字，后缀加上单位文字
        ;

        _proto.compressUnit = function compressUnit(value, valueArr, unitArr, fixNum) {
          if (fixNum === void 0) {
            fixNum = 2;
          }

          var counts = valueArr;
          var units = unitArr;
          var res = "";
          var index;

          for (index = 0; index < counts.length; index++) {
            var e = counts[index];

            if (value < e) {
              if (index > 0) {
                res = (value / counts[index - 1]).toFixed(fixNum);
              } else {
                res = value.toFixed(0);
              }

              break;
            }
          }

          return res + units[index];
        };

        return StringFormat;
      }();
      /**格式化处理函数 */


      var StringFormatFunction = exports('StringFormatFunction', new StringFormat());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StringUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "aa8435LSBtAR5HPsje6IJ2w", "StringUtil", undefined);
      /** 字符串工具 */


      var StringUtil = exports('StringUtil', /*#__PURE__*/function () {
        function StringUtil() {}
        /** 获取一个唯一标识的字符串 */


        StringUtil.guid = function guid() {
          var guid = "";

          for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
          }

          return guid;
        }
        /**
         * 转美式计数字符串
         * @param value 数字
         * @example
         * 123456789 = 123,456,789
         */
        ;

        StringUtil.numberTotPermil = function numberTotPermil(value) {
          return value.toLocaleString();
        }
        /** 
         * 转英文单位计数
         * @param value 数字
         * @param fixed 保留小数位数
         * @example
         * 12345 = 12.35K
         */
        ;

        StringUtil.numberToThousand = function numberToThousand(value, fixed) {
          if (fixed === void 0) {
            fixed = 2;
          }

          var k = 1000;
          var sizes = ['', 'K', 'M', 'G'];

          if (value < k) {
            return value.toString();
          } else {
            var i = Math.floor(Math.log(value) / Math.log(k));
            var r = value / Math.pow(k, i);
            return r.toFixed(fixed) + sizes[i];
          }
        }
        /** 
         * 转中文单位计数
         * @param value 数字
         * @param fixed 保留小数位数
         * @example
         * 12345 = 1.23万
         */
        ;

        StringUtil.numberToTenThousand = function numberToTenThousand(value, fixed) {
          if (fixed === void 0) {
            fixed = 2;
          }

          var k = 10000;
          var sizes = ['', '万', '亿', '万亿'];

          if (value < k) {
            return value.toString();
          } else {
            var i = Math.floor(Math.log(value) / Math.log(k));
            return (value / Math.pow(k, i)).toFixed(fixed) + sizes[i];
          }
        }
        /**
         * 时间格式化
         * @param date  时间对象
         * @param fmt   格式化字符(yyyy-MM-dd hh:mm:ss S)
         */
        ;

        StringUtil.format = function format(date, fmt) {
          var o = {
            "M+": date.getMonth() + 1,
            // 月份 
            "d+": date.getDate(),
            // 日 
            "h+": date.getHours(),
            // 小时 
            "m+": date.getMinutes(),
            // 分 
            "s+": date.getSeconds(),
            // 秒 
            "q+": Math.floor((date.getMonth() + 3) / 3),
            // 季度 
            "S": date.getMilliseconds() // 毫秒 

          };

          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
          }

          for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
              fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
          }

          return fmt;
        }
        /**
         * "," 分割字符串成数组
         * @param str 字符串
         */
        ;

        StringUtil.stringToArray1 = function stringToArray1(str) {
          if (str == "") {
            return [];
          }

          return str.split(",");
        }
        /** 
         * "|" 分割字符串成数组 
         * @param str 字符串
         */
        ;

        StringUtil.stringToArray2 = function stringToArray2(str) {
          if (str == "") {
            return [];
          }

          return str.split("|");
        }
        /** 
         * ":" 分割字符串成数组
         * @param str 字符串
         */
        ;

        StringUtil.stringToArray3 = function stringToArray3(str) {
          if (str == "") {
            return [];
          }

          return str.split(":");
        }
        /** 
         * ";" 分割字符串成数组 
         * @param str 字符串
         */
        ;

        StringUtil.stringToArray4 = function stringToArray4(str) {
          if (str == "") {
            return [];
          }

          return str.split(";");
        }
        /**
         * 字符串截取
         * @param str     字符串
         * @param n       截取长度
         * @param showdot 是否把截取的部分用省略号代替
         */
        ;

        StringUtil.sub = function sub(str, n, showdot) {
          if (showdot === void 0) {
            showdot = false;
          }

          var r = /[^\x00-\xff]/g;

          if (str.replace(r, "mm").length <= n) {
            return str;
          }

          var m = Math.floor(n / 2);

          for (var i = m; i < str.length; i++) {
            if (str.substr(0, i).replace(r, "mm").length >= n) {
              if (showdot) {
                return str.substr(0, i) + "...";
              } else {
                return str.substr(0, i);
              }
            }
          }

          return str;
        }
        /**
         * 计算字符串长度，中文算两个字节
         * @param str 字符串
         */
        ;

        StringUtil.stringLen = function stringLen(str) {
          var realLength = 0,
              len = str.length,
              charCode = -1;

          for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;else realLength += 2;
          }

          return realLength;
        };

        return StringUtil;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/sui.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts', './GameUIConfig.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Component, sys, oops, UIID;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      sys = module.sys;
    }, function (module) {
      oops = module.oops;
    }, function (module) {
      UIID = module.UIID;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "07276frGtVEnq6cJys7KUSO", "sui", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var sui = exports('sui', (_dec = ccclass('sui'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(sui, _Component);

        function sui() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = sui.prototype;

        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var obelisk;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  console.log("1");
                  obelisk = window.obelisk;
                  console.log(obelisk);

                case 4:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));

          function start() {
            return _start.apply(this, arguments);
          }

          return start;
        }();

        _proto.sui_account_create = /*#__PURE__*/function () {
          var _sui_account_create = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var _sui2, decode, keypair, wallet, code;

            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  // @ts-ignore
                  _sui2 = window.sui;
                  decode = JSON.parse(sys.localStorage.getItem('withinfinity-userWalletData'));

                  if (decode == null) {
                    keypair = new _sui2.Ed25519Keypair();
                    wallet = keypair["export"]();
                    code = JSON.stringify(wallet);
                    sys.localStorage.setItem('withinfinity-userWalletData', code);
                    oops.gui.open(UIID.Claim);
                    oops.gui.remove(UIID.Login);
                  } else {
                    oops.gui.open(UIID.Claim);
                    oops.gui.remove(UIID.Login);
                  }

                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));

          function sui_account_create() {
            return _sui_account_create.apply(this, arguments);
          }

          return sui_account_create;
        }();

        _proto.update = function update(deltaTime) {};

        return sui;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TablePromptWindow.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './JsonUtil.ts'], function (exports) {
  var _createClass, cclegacy, JsonUtil;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      JsonUtil = module.JsonUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1e3d7uann5MRokAL2wULm9y", "TablePromptWindow", undefined);
      /** 演示oops-plugin-excel-to-json插件生成的配置表数据结构（可删除） */


      var TablePromptWindow = exports('TablePromptWindow', /*#__PURE__*/function () {
        function TablePromptWindow() {
          this.data = void 0;
          this.id = 0;
          this.id1 = 0;
          this.id2 = 0;
        }

        var _proto = TablePromptWindow.prototype;

        _proto.init = function init(id, id1, id2) {
          var table = JsonUtil.get(TablePromptWindow.TableName);
          this.data = table[id][id1][id2];
          this.id = id;
          this.id1 = id1;
          this.id2 = id2;
        };

        _createClass(TablePromptWindow, [{
          key: "title",
          get: function get() {
            return this.data.title;
          }
        }, {
          key: "describe",
          get: function get() {
            return this.data.describe;
          }
        }, {
          key: "array",
          get: function get() {
            return this.data.array;
          }
        }, {
          key: "hp",
          get: function get() {
            return this.data.hp;
          }
        }]);

        return TablePromptWindow;
      }());
      TablePromptWindow.TableName = "PromptWindow";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Task.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BTreeNode.ts'], function (exports) {
  var _inheritsLoose, cclegacy, BTreeNode;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BTreeNode = module.BTreeNode;
    }],
    execute: function () {
      cclegacy._RF.push({}, "95087QhEU1G1LWnM2D7haTQ", "Task", undefined);
      /** 任务行为节点 */


      var Task = exports('Task', /*#__PURE__*/function (_BTreeNode) {
        _inheritsLoose(Task, _BTreeNode);

        function Task() {
          return _BTreeNode.apply(this, arguments) || this;
        }

        var _proto = Task.prototype;

        _proto.run = function run(blackboard) {};

        return Task;
      }(BTreeNode));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Timer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6021fct1uhJsImEuhdFWC0f", "Timer", undefined);
      /*
       * @Author: dgflash
       * @Date: 2023-01-19 11:09:38
       * @LastEditors: dgflash
       * @LastEditTime: 2023-01-19 14:28:05
       */

      /** 
       * 定时跳动组件 
       * @example
          export class Test extends Component {
              // 创建一个定时跳动组件
              private timer: Timer = new Timer(1);
                update(dt: number) {
                  if (this.timer.update(this.dt)) {
                      console.log(每一秒触发一次);
                  }
              }
          }
       */


      var Timer = exports('Timer', /*#__PURE__*/function () {
        function Timer(step) {
          if (step === void 0) {
            step = 0;
          }

          this.callback = null;
          this._elapsedTime = 0;
          this._step = -1;
          this.step = step;
        }

        var _proto = Timer.prototype;

        _proto.update = function update(dt) {
          if (this.step <= 0) return false;
          this._elapsedTime += dt;

          if (this._elapsedTime >= this._step) {
            var _this$callback;

            this._elapsedTime -= this._step;
            (_this$callback = this.callback) == null ? void 0 : _this$callback.call(this);
            return true;
          }

          return false;
        };

        _proto.reset = function reset() {
          this._elapsedTime = 0;
        };

        _proto.stop = function stop() {
          this._elapsedTime = 0;
          this.step = -1;
        };

        _createClass(Timer, [{
          key: "elapsedTime",
          get: function get() {
            return this._elapsedTime;
          }
        }, {
          key: "step",
          get:
          /** 触发间隔时间（秒） */
          function get() {
            return this._step;
          },
          set: function set(step) {
            this._step = step; // 每次修改时间

            this._elapsedTime = 0; // 逝去时间
          }
        }, {
          key: "progress",
          get: function get() {
            return this._elapsedTime / this._step;
          }
        }]);

        return Timer;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TimerManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './StringUtil.ts', './Timer.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Component, StringUtil, Timer;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
    }, function (module) {
      StringUtil = module.StringUtil;
    }, function (module) {
      Timer = module.Timer;
    }],
    execute: function () {
      cclegacy._RF.push({}, "73600VLsIBLOKhOhd7td4P8", "TimerManager", undefined);
      /** 时间管理 */


      var TimerManager = exports('TimerManager', /*#__PURE__*/function (_Component) {
        _inheritsLoose(TimerManager, _Component);

        function TimerManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /** 倒计时数据 */

          _this.times = {};
          /** 当前游戏进入的时间毫秒值 */

          _this.initTime = new Date().getTime();
          /** 服务器时间与本地时间同步 */

          _this.serverTime = 0;
          return _this;
        }

        var _proto = TimerManager.prototype;

        _proto.update = function update(dt) {
          // 后台管理倒计时完成事件
          for (var key in this.times) {
            var data = this.times[key];
            var timer = data.timer;

            if (timer.update(dt)) {
              if (data.object[data.field] > 0) {
                data.object[data.field]--; // 倒计时结束触发

                if (data.object[data.field] == 0) {
                  this.onTimerComplete(data);
                } // 触发每秒回调事件  
                else if (data.onSecond) {
                    data.onSecond.call(data.object);
                  }
              }
            }
          }
        }
        /** 触发倒计时完成事件 */
        ;

        _proto.onTimerComplete = function onTimerComplete(data) {
          if (data.onComplete) data.onComplete.call(data.object);
          if (data.event) this.node.dispatchEvent(data.event);
          delete this.times[data.id];
        }
        /**
         * 在指定对象上注册一个倒计时的回调管理器
         * @param object        注册定时器的对象
         * @param field         时间字段
         * @param onSecond      每秒事件
         * @param onComplete    倒计时完成事件
         * @returns 
         * @example
        export class Test extends Component {
            private timeId!: string;
            
            start() {
                // 在指定对象上注册一个倒计时的回调管理器
                this.timeId = oops.timer.register(this, "countDown", this.onSecond, this.onComplete);
            }
            
            private onSecond() {
                console.log("每秒触发一次");
            }
              private onComplete() {
                console.log("倒计时完成触发");
            }
        }
         */
        ;

        _proto.register = function register(object, field, onSecond, onComplete) {
          var timer = new Timer();
          timer.step = 1;
          var data = {};
          data.id = StringUtil.guid();
          data.timer = timer;
          data.object = object; // 管理对象

          data.field = field; // 时间字段

          data.onSecond = onSecond; // 每秒事件

          data.onComplete = onComplete; // 倒计时完成事件

          this.times[data.id] = data;
          return data.id;
        }
        /** 
         * 在指定对象上注销一个倒计时的回调管理器 
         * @param id         时间对象唯一表示
         * @example
        export class Test extends Component {
            private timeId!: string;
              start() {
                this.timeId = oops.timer.register(this, "countDown", this.onSecond, this.onComplete);
            }
              onDestroy() {
                // 在指定对象上注销一个倒计时的回调管理器
                oops.timer.unRegister(this.timeId);
            }
        }
         */
        ;

        _proto.unRegister = function unRegister(id) {
          if (this.times[id]) delete this.times[id];
        }
        /**
         * 服务器时间与本地时间同步
         * @param val   服务器时间刻度
         * 
         */
        ;

        _proto.setServerTime = function setServerTime(val) {
          if (val) {
            this.serverTime = val;
          }

          return this.serverTime;
        };

        _proto.getServerTime = function getServerTime() {
          return this.serverTime + this.getTime();
        }
        /**
         * 格式化日期显示
         * @param format 格式化字符串（例：yyyy-MM-dd hh:mm:ss）
         * @param date   时间对象
         */
        ;

        _proto.format = function format(_format, date) {
          var o = {
            "M+": date.getMonth() + 1,
            // month 
            "d+": date.getDate(),
            // day 
            "h+": date.getHours(),
            // hour 
            "m+": date.getMinutes(),
            // minute 
            "s+": date.getSeconds(),
            // second 
            "q+": Math.floor((date.getMonth() + 3) / 3),
            // quarter 
            "S": date.getMilliseconds() // millisecond 

          };

          if (/(y+)/.test(_format)) {
            _format = _format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
          }

          for (var k in o) {
            if (new RegExp("(" + k + ")").test(_format)) {
              _format = _format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
          }

          return _format;
        }
        /** 获取游戏开始到现在逝去的时间 */
        ;

        _proto.getTime = function getTime() {
          return this.getLocalTime() - this.initTime;
        }
        /** 获取本地时间刻度 */
        ;

        _proto.getLocalTime = function getLocalTime() {
          return Date.now();
        }
        /** 游戏最小化时记录时间数据 */
        ;

        _proto.save = function save() {
          for (var key in this.times) {
            this.times[key].startTime = this.getTime();
          }
        }
        /** 游戏最大化时回复时间数据 */
        ;

        _proto.load = function load() {
          for (var key in this.times) {
            var interval = Math.floor((this.getTime() - (this.times[key].startTime || this.getTime())) / 1000);
            var data = this.times[key];
            data.object[data.field] = data.object[data.field] - interval;

            if (data.object[data.field] < 0) {
              data.object[data.field] = 0;
              this.onTimerComplete(data);
            }

            this.times[key].startTime = null;
          }
        };

        return TimerManager;
      }(Component));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIMap.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1bd03ggtItIIajoqd0I4VGL", "UIMap", undefined);
      /*
       * @Author: dgflash
       * @Date: 2022-06-14 19:35:16
       * @LastEditors: dgflash
       * @LastEditTime: 2022-09-02 13:27:20
       */

      /** 界面关系树节点 */


      var TreeNode = function TreeNode() {
        this.id = void 0;
        /** 父节点编号 */

        this.pid = void 0;
        /** 父节点 */

        this.parent = null;
        /** 子节点 */

        this.child = [];
        /** 界面名 */

        this.name = void 0;
        /** 界面代号（用于同一界面有多条路径时） */

        this.panel = void 0;
      };
      /** 用于树形结构两节点之间的寻路功能 */


      var UIMap = exports('UIMap', /*#__PURE__*/function () {
        function UIMap() {
          /** UI层级管理器 */
          this.manager = void 0;
          /** 界面节点树 */

          this.nodes = new Map();
        }

        var _proto = UIMap.prototype;
        /** 创建UI关系树 */

        _proto.init = function init(manager, data) {
          var _this = this;

          this.manager = manager; // 解析数据

          for (var key in data) {
            var d = data[key];
            var n = new TreeNode();
            n.id = parseInt(key);
            n.pid = d.parent;
            n.name = d.name;
            n.panel = d.panel;
            this.nodes.set(n.id, n);
          } // 设置节点关系


          this.nodes.forEach(function (value, key) {
            value.parent = _this.nodes.get(value.pid);
            if (value.parent) value.parent.child.push(value);
          });
        }
        /**
         * 树节点寻路
         * @param startId 起始节点编号
         * @param endId   结束节点编号
         * @returns 
         */
        ;

        _proto.pathFinding = function pathFinding(startId, endId) {
          var _this2 = this;

          var start = this.nodes.get(startId);
          var end = this.nodes.get(endId);
          var close = this.findUp(start);
          var open = this.findUp(end);
          close.forEach(function (value) {
            _this2.manager.remove(value.id, true);
          });
          open.forEach(function (value) {
            _this2.manager.open(value.id);
          });
          return {
            paths_close: close,
            paths_open: open
          };
        }
        /** 向上寻找子节点直到根节点停止，并返回节点路径数组 */
        ;

        _proto.findUp = function findUp(start) {
          var paths = [];
          var current = start;

          while (current.parent != null) {
            // 父级为空时为根节点
            paths.push(current);
            current = current.parent;
          }

          return paths;
        }
        /** 释放所有节点 */
        ;

        _proto.release = function release() {
          this.nodes.clear();
        };

        return UIMap;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Vec3Util.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MathUtil.ts'], function (exports) {
  var _createClass, cclegacy, Vec3, Mat4, MathUtil;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Mat4 = module.Mat4;
    }, function (module) {
      MathUtil = module.MathUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "38947ih8d5EQ7HG4buug+SR", "Vec3Util", undefined);
      /** 向量工具 */


      var Vec3Util = exports('Vec3Util', /*#__PURE__*/function () {
        function Vec3Util() {}
        /**
         * 随时间变化进度值
         * @param start  起始位置
         * @param end    结束位置
         * @param t      进度[0，1]
         */


        Vec3Util.progress = function progress(start, end, t) {
          var current = new Vec3();
          current.x = MathUtil.progress(start.x, end.x, t);
          current.y = MathUtil.progress(start.y, end.y, t);
          current.z = MathUtil.progress(start.z, end.z, t);
          return current;
        }
        /**
         * 求两个三维向量的和
         * @param pos1  向量1
         * @param pos2  向量2
         */
        ;

        Vec3Util.add = function add(pos1, pos2) {
          var outPos = new Vec3();
          Vec3.add(outPos, pos1, pos2);
          return outPos;
        }
        /**
         * 求两个三维向量的差
         * @param pos1  向量1
         * @param pos2  向量2
         */
        ;

        Vec3Util.sub = function sub(pos1, pos2) {
          var outPos = new Vec3();
          Vec3.subtract(outPos, pos1, pos2);
          return outPos;
        }
        /**
         * 三维向量乘以常量
         * @param pos     向量
         * @param scalar  常量
         */
        ;

        Vec3Util.mul = function mul(pos, scalar) {
          var outPos = new Vec3();
          Vec3.multiplyScalar(outPos, pos, scalar);
          return outPos;
        }
        /**
         * 三维向量除常量
         * @param pos     向量
         * @param scalar  常量
         */
        ;

        Vec3Util.div = function div(pos, scalar) {
          var outPos = new Vec3();
          outPos.x = pos.x / scalar;
          outPos.y = pos.y / scalar;
          outPos.z = pos.z / scalar;
          return outPos;
        }
        /**
         * 判断两个三维向量的值是否相等
         * @param pos1  向量1
         * @param pos2  向量2
         */
        ;

        Vec3Util.equals = function equals(pos1, pos2) {
          if (pos1.x == pos2.x && pos1.y == pos2.y && pos1.z == pos2.z) {
            return true;
          }

          return false;
        }
        /**
         * 三维向量的模
         * @param pos  向量
         */
        ;

        Vec3Util.magnitude = function magnitude(pos) {
          return pos.length();
        }
        /**
         * 三维向量归一化
         * @param pos  向量
         */
        ;

        Vec3Util.normalize = function normalize(pos) {
          var outPos = new Vec3(pos.x, pos.y, pos.z);
          return outPos.normalize();
        }
        /**
         * 获得位置1，到位置2的方向
         * @param pos1  向量1
         * @param pos2  向量2
         */
        ;

        Vec3Util.direction = function direction(pos1, pos2) {
          var outPos = new Vec3();
          Vec3.subtract(outPos, pos2, pos1);
          return outPos.normalize();
        }
        /**
         * 获得两点间的距离
         * @param pos1  向量1
         * @param pos2  向量2
         */
        ;

        Vec3Util.distance = function distance(pos1, pos2) {
          return Vec3.distance(pos1, pos2);
        }
        /**
         * 插值运算
         * @param posStart  开始俏步
         * @param posEnd    结束位置
         * @param t         时间
         */
        ;

        Vec3Util.lerp = function lerp(posStart, posEnd, t) {
          return this.bezierOne(t, posStart, posEnd);
        }
        /**
         * 球面插值
         * @param from  起点
         * @param to    终点
         * @param t     时间
         */
        ;

        Vec3Util.slerp = function slerp(from, to, t) {
          if (t <= 0) {
            return from;
          } else if (t >= 1) {
            return to;
          }

          var dir = this.rotateTo(from, to, Vec3.angle(from, to) / Math.PI * 180 * t);
          var lenght = to.length() * t + from.length() * (1 - t);
          return dir.normalize().multiplyScalar(lenght);
        }
        /**
         * 向量旋转一个角度
         * @param from  起点
         * @param to    终点
         * @param angle 角并
         */
        ;

        Vec3Util.rotateTo = function rotateTo(from, to, angle) {
          //如果两个方向角度为0，则返回目标
          if (Vec3.angle(from, to) == 0) {
            return to;
          }

          var axis = new Vec3(); // 获得旋转轴

          Vec3.cross(axis, from, to);
          axis.normalize();
          var radian = angle * Math.PI / 180; // 获得弧度

          var rotateMatrix = new Mat4();
          rotateMatrix.rotate(radian, axis);
          return new Vec3(from.x * rotateMatrix.m00 + from.y * rotateMatrix.m04 + from.z * rotateMatrix.m08, from.x * rotateMatrix.m01 + from.y * rotateMatrix.m05 + from.z * rotateMatrix.m09, from.x * rotateMatrix.m02 + from.y * rotateMatrix.m06 + from.z * rotateMatrix.m10);
        }
        /**
         * 一次贝塞尔即为线性插值函数
         * @param t 
         * @param posStart 
         * @param posEnd 
         * @returns 
         */
        ;

        Vec3Util.bezierOne = function bezierOne(t, posStart, posEnd) {
          if (t > 1) {
            t = 1;
          } else if (t < 0) {
            t = 0;
          }

          var pStart = posStart.clone();
          var pEnd = posEnd.clone();
          return pStart.multiplyScalar(1 - t).add(pEnd.multiplyScalar(t));
        }
        /**
         * 二次贝塞尔曲线
         * @param t 
         * @param posStart 
         * @param posCon 
         * @param posEnd 
         * @returns 
         */
        ;

        Vec3Util.bezierTwo = function bezierTwo(t, posStart, posCon, posEnd) {
          if (t > 1) {
            t = 1;
          } else if (t < 0) {
            t = 0;
          }

          var n = 1 - t;
          var tt = t * t;
          var pStart = posStart.clone();
          var pos = new Vec3();
          var pCon = posCon.clone();
          var pEnd = posEnd.clone();
          pos.add(pStart.multiplyScalar(n * n));
          pos.add(pCon.multiplyScalar(2 * n * t));
          pos.add(pEnd.multiplyScalar(tt));
          return pos;
        }
        /**
         * 三次贝塞尔
         * @param t 
         * @param posStart 
         * @param posCon1 
         * @param posCon2 
         * @param posEnd 
         * @returns 
         */
        ;

        Vec3Util.bezierThree = function bezierThree(t, posStart, posCon1, posCon2, posEnd) {
          if (t > 1) {
            t = 1;
          } else if (t < 0) {
            t = 0;
          }

          var n = 1 - t;
          var nn = n * n;
          var nnn = nn * n;
          var tt = t * t;
          var ttt = tt * t;
          var pStart = posStart.clone();
          var pos = posStart.clone();
          var pCon1 = posCon1.clone();
          var pCon2 = posCon2.clone();
          var pEnd = posEnd.clone();
          pos.add(pStart.multiplyScalar(nnn));
          pos.add(pCon1.multiplyScalar(3 * nn * t));
          pos.add(pCon2.multiplyScalar(3 * n * tt));
          pos.add(pEnd.multiplyScalar(ttt));
          return pos;
        }
        /**
         * 点乘
         * @param dir1 方向量1
         * @param dir2 方向量2
         */
        ;

        Vec3Util.dot = function dot(dir1, dir2) {
          var tempDir1 = dir1;
          var tempDir2 = dir2;
          return tempDir1.x * tempDir2.x + tempDir1.y * tempDir2.y + tempDir1.z * tempDir2.z;
        }
        /**
         * 叉乘
         * @param dir1 方向量1
         * @param dir2 方向量2
         */
        ;

        Vec3Util.cross = function cross(dir1, dir2) {
          var i = new Vec3(1, 0, 0);
          var j = new Vec3(0, 1, 0);
          var k = new Vec3(0, 0, 1);
          var tempDir1 = new Vec3(dir1.x, dir1.y, dir1.z);
          var tempDir2 = new Vec3(dir2.x, dir2.y, dir2.z);
          var iv = i.multiplyScalar(tempDir1.y * tempDir2.z - tempDir2.y * tempDir1.z);
          var jv = j.multiplyScalar(tempDir2.x * tempDir1.z - tempDir1.x * tempDir2.z);
          var kv = k.multiplyScalar(tempDir1.x * tempDir2.y - tempDir2.x * tempDir1.y);
          return iv.add(jv).add(kv);
        }
        /**
         * 获得两个方向向量的角度
         * @param dir1 方向量1
         * @param dir2 方向量2
         */
        ;

        Vec3Util.angle = function angle(dir1, dir2) {
          var dotValue = this.dot(dir1.clone().normalize(), dir2.clone().normalize());
          return Math.acos(dotValue) / Math.PI * 180 * Math.sign(dotValue);
        }
        /**
         * 获得方向a到方向b的角度（带有方向的角度）
         * @param a 角度a
         * @param b 角度b
         */
        ;

        Vec3Util.dirAngle = function dirAngle(a, b) {
          var c = Vec3Util.cross(a, b);
          var angle = Vec3Util.angle(a, b); // a 到 b 的夹角

          var sign = Math.sign(Vec3Util.dot(c.normalize(), Vec3Util.cross(b.normalize(), a.normalize())));
          return angle * sign;
        };

        _createClass(Vec3Util, null, [{
          key: "x",
          get:
          /**
           * X轴
           */
          function get() {
            return new Vec3(1, 0, 0);
          }
          /**
           * Y轴
           */

        }, {
          key: "y",
          get: function get() {
            return new Vec3(0, 1, 0);
          }
          /**
           * Z轴
           */

        }, {
          key: "z",
          get: function get() {
            return new Vec3(0, 0, 1);
          }
          /**
           * 左向量
           */

        }, {
          key: "left",
          get: function get() {
            return new Vec3(-1, 0, 0);
          }
          /**
           * 右向量
           */

        }, {
          key: "right",
          get: function get() {
            return new Vec3(1, 0, 0);
          }
          /**
           * 上向量
           */

        }, {
          key: "up",
          get: function get() {
            return new Vec3(0, 1, 0);
          }
          /**
           * 下向量
           */

        }, {
          key: "down",
          get: function get() {
            return new Vec3(0, -1, 0);
          }
          /**
           * 前向量
           */

        }, {
          key: "forward",
          get: function get() {
            return new Vec3(0, 0, 1);
          }
          /**
           * 后向量
           */

        }, {
          key: "back",
          get: function get() {
            return new Vec3(0, 0, -1);
          }
          /**
           * 1向量
           */

        }, {
          key: "one",
          get: function get() {
            return new Vec3(1, 1, 1);
          }
          /**
           * 0向量
           */

        }, {
          key: "zero",
          get: function get() {
            return new Vec3(0, 0, 0);
          }
        }]);

        return Vec3Util;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ViewModel.ts", ['cc', './JsonOb.ts'], function (exports) {
  var cclegacy, director, JsonOb;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
    }, function (module) {
      JsonOb = module.JsonOb;
    }],
    execute: function () {
      cclegacy._RF.push({}, "54f75k4X+RP0qaXOzrfZysL", "ViewModel", undefined);

      var VM_EMIT_HEAD = 'VC:';
      /** 通过 .  路径设置值 */

      function setValueFromPath(obj, path, value, tag) {
        if (tag === void 0) {
          tag = '';
        }

        var props = path.split('.');

        for (var i = 0; i < props.length; i++) {
          var propName = props[i];

          if (propName in obj === false) {
            console.error('[' + propName + '] not find in ' + tag + '.' + path);
            break;
          }

          if (i == props.length - 1) {
            obj[propName] = value;
          } else {
            obj = obj[propName];
          }
        }
      }
      /** 通过 . 路径 获取值 */


      function getValueFromPath(obj, path, def, tag) {
        if (tag === void 0) {
          tag = '';
        }

        var props = path.split('.');

        for (var i = 0; i < props.length; i++) {
          var propName = props[i];

          if (propName in obj === false) {
            console.error('[' + propName + '] not find in ' + tag + '.' + path);
            return def;
          }

          obj = obj[propName];
        }

        if (obj === null || typeof obj === "undefined") obj = def; //如果g == null 则返回一个默认值

        return obj;
      }
      /**
       * ModelViewer 类
       */


      var ViewModel = /*#__PURE__*/function () {
        function ViewModel(data, tag) {
          this.$data = void 0; // 索引值用的标签

          this._tag = null;
          /** 激活状态, 将会通过 director.emit 发送值变动的信号, 适合需要屏蔽的情况 */

          this.active = true;
          /** 是否激活根路径回调通知, 不激活的情况下 只能监听末端路径值来判断是否变化 */

          this.emitToRootPath = false;
          new JsonOb(data, this._callback.bind(this));
          this.$data = data;
          this._tag = tag;
        }

        var _proto = ViewModel.prototype; // 回调函数 请注意 回调的 path 数组是 引用类型，禁止修改

        _proto._callback = function _callback(n, o, path) {
          if (this.active == true) {
            var name = VM_EMIT_HEAD + this._tag + '.' + path.join('.');
            director.emit(name, n, o, [this._tag].concat(path)); // 通知末端路径

            if (this.emitToRootPath) director.emit(VM_EMIT_HEAD + this._tag, n, o, path); // 通知主路径

            if (path.length >= 2) {
              for (var i = 0; i < path.length - 1; i++) {
                var e = path[i]; //log('中端路径');
              }
            }
          }
        } // 通过路径设置数据的方法
        ;

        _proto.setValue = function setValue(path, value) {
          setValueFromPath(this.$data, path, value, this._tag);
        } // 获取路径的值
        ;

        _proto.getValue = function getValue(path, def) {
          return getValueFromPath(this.$data, path, def, this._tag);
        };

        return ViewModel;
      }();
      /**
       * VM 对象管理器(工厂)
       */


      var VMManager = /*#__PURE__*/function () {
        function VMManager() {
          this._mvs = new Map();
          this.setObjValue = setValueFromPath;
          this.getObjValue = getValueFromPath;
        }

        var _proto2 = VMManager.prototype;
        /**
         * 绑定一个数据，并且可以由VM所管理（绑定的数据只能是值类型）
         * @param data 需要绑定的数据
         * @param tag 对应该数据的标签(用于识别为哪个VM，不允许重复)
         * @param activeRootObject 激活主路径通知，可能会有性能影响，一般不使用
         */

        _proto2.add = function add(data, tag, activeRootObject) {
          if (tag === void 0) {
            tag = 'global';
          }

          if (activeRootObject === void 0) {
            activeRootObject = false;
          }

          var vm = new ViewModel(data, tag);

          var has = this._mvs.get(tag);

          if (tag.includes('.')) {
            console.error('cant write . in tag:', tag);
            return;
          }

          if (has) {
            console.error('already set VM tag:' + tag);
            return;
          }

          vm.emitToRootPath = activeRootObject;

          this._mvs.set(tag, vm);
        }
        /**
         * 移除并且销毁 VM 对象
         * @param tag 
         */
        ;

        _proto2.remove = function remove(tag) {
          this._mvs["delete"](tag);
        }
        /**
         * 获取绑定的数据
         * @param tag 数据tag
         */
        ;

        _proto2.get = function get(tag) {
          var res = this._mvs.get(tag);

          return res;
        }
        /**
         * 通过全局路径,而不是 VM 对象来 设置值
         * @param path - 全局取值路径
         * @param value - 需要增加的值
         */
        ;

        _proto2.addValue = function addValue(path, value) {
          path = path.trim(); //防止空格,自动剔除

          var rs = path.split('.');

          if (rs.length < 2) {
            console.error('Cant find path:' + path);
          }

          var vm = this.get(rs[0]);

          if (!vm) {
            console.error('Cant Set VM:' + rs[0]);
            return;
          }

          var resPath = rs.slice(1).join('.');
          vm.setValue(resPath, vm.getValue(resPath) + value);
        }
        /**
         * 通过全局路径,而不是 VM 对象来 获取值
         * @param path - 全局取值路径
         * @param def - 如果取不到值的返回的默认值
         */
        ;

        _proto2.getValue = function getValue(path, def) {
          path = path.trim(); // 防止空格,自动剔除

          var rs = path.split('.');

          if (rs.length < 2) {
            console.error('Get Value Cant find path:' + path);
            return;
          }

          var vm = this.get(rs[0]);

          if (!vm) {
            console.error('Cant Get VM:' + rs[0]);
            return;
          }

          return vm.getValue(rs.slice(1).join('.'), def);
        }
        /**
         * 通过全局路径,而不是 VM 对象来 设置值
         * @param path - 全局取值路径
         * @param value - 需要设置的值
         */
        ;

        _proto2.setValue = function setValue(path, value) {
          path = path.trim(); // 防止空格,自动剔除

          var rs = path.split('.');

          if (rs.length < 2) {
            console.error('Set Value Cant find path:' + path);
            return;
          }

          var vm = this.get(rs[0]);

          if (!vm) {
            console.error('Cant Set VM:' + rs[0]);
            return;
          }

          vm.setValue(rs.slice(1).join('.'), value);
        };
        /** 等同于 director.on */


        _proto2.bindPath = function bindPath(path, callback, target, useCapture) {
          path = path.trim(); // 防止空格,自动剔除

          if (path == '') {
            console.error(target.node.name, '节点绑定的路径为空');
            return;
          }

          if (path.split('.')[0] === '*') {
            console.error(path, '路径不合法,可能错误覆盖了 VMParent 的onLoad 方法, 或者父节点并未挂载 VMParent 相关的组件脚本');
            return;
          } // @ts-ignore


          director.on(VM_EMIT_HEAD + path, callback, target, useCapture);
        }
        /** 等同于 director.off */
        ;

        _proto2.unbindPath = function unbindPath(path, callback, target) {
          path = path.trim(); //防止空格,自动剔除

          if (path.split('.')[0] === '*') {
            console.error(path, '路径不合法,可能错误覆盖了 VMParent 的onLoad 方法, 或者父节点并未挂载 VMParent 相关的组件脚本');
            return;
          } // @ts-ignore


          director.off(VM_EMIT_HEAD + path, callback, target);
        }
        /** 冻结所有标签的 VM，视图将不会受到任何信息 */
        ;

        _proto2.inactive = function inactive() {
          this._mvs.forEach(function (mv) {
            mv.active = false;
          });
        }
        /** 激活所有标签的 VM*/
        ;

        _proto2.active = function active() {
          this._mvs.forEach(function (mv) {
            mv.active = false;
          });
        };

        return VMManager;
      }(); //   整数、小数、时间、缩写

      /**
       *  VM管理对象,使用文档: 
       *  https://github.com/wsssheep/cocos_creator_mvvm_tools/blob/master/docs/ViewModelScript.md
       */


      var VM = exports('VM', new VMManager());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ViewUtil.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Oops.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, UITransform, v3, Size, Prefab, instantiate, Animation, AnimationClip, oops;

  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      UITransform = module.UITransform;
      v3 = module.v3;
      Size = module.Size;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Animation = module.Animation;
      AnimationClip = module.AnimationClip;
    }, function (module) {
      oops = module.oops;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f607cCjAEZHVKVZ/FyRs5bA", "ViewUtil", undefined);
      /** 显示对象工具 */


      var ViewUtil = exports('ViewUtil', /*#__PURE__*/function () {
        function ViewUtil() {}
        /**
         * 把Node当前的节点树结构根据Node命名转成一个js对象,重名的组件会覆盖，
         * Node的name不应该包含空格键，否则将跳过
         * @param parent 被遍历的Node组件
         * @param obj    绑定的js对象 (可选)
         */


        ViewUtil.nodeTreeInfoLite = function nodeTreeInfoLite(parent, obj) {
          var map = obj || new Map();
          var items = parent.children;

          for (var i = 0; i < items.length; i++) {
            var _node = items[i];

            if (_node.name.indexOf(" ") < 0) {
              map.set(_node.name, _node);
            }

            ViewUtil.nodeTreeInfoLite(_node, map);
          }

          return map;
        }
        /**
         * 正则搜索节点名字,符合条件的节点将会返回
         * @param reg     正则表达式
         * @param parent  要搜索的父节点
         * @param nodes   返回的数组（可选）
         */
        ;

        ViewUtil.findNodes = function findNodes(reg, parent, nodes) {
          var ns = nodes || [];
          var items = parent.children;

          for (var i = 0; i < items.length; i++) {
            var _name = items[i].name;

            if (reg.test(_name)) {
              ns.push(items[i]);
            }

            ViewUtil.findNodes(reg, items[i], ns);
          }

          return ns;
        };
        /**
         * 节点之间坐标互转
         * @param a         A节点
         * @param b         B节点
         * @param aPos      A节点空间中的相对位置
         */


        ViewUtil.calculateASpaceToBSpacePos = function calculateASpaceToBSpacePos(a, b, aPos) {
          var world = a.getComponent(UITransform).convertToWorldSpaceAR(aPos);
          var space = b.getComponent(UITransform).convertToNodeSpaceAR(world);
          return space;
        }
        /**
         * 屏幕转空间坐标
         * @param event 触摸事件
         * @param space 转到此节点的坐标空间
         */
        ;

        ViewUtil.calculateScreenPosToSpacePos = function calculateScreenPosToSpacePos(event, space) {
          var uil = event.getUILocation();
          var worldPos = v3(uil.x, uil.y);
          var mapPos = space.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
          return mapPos;
        }
        /**
         * 显示对象等比缩放
         * @param targetWidth       目标宽
         * @param targetHeight      目标高
         * @param defaultWidth      默认宽
         * @param defaultHeight     默认高
         */
        ;

        ViewUtil.uniformScale = function uniformScale(targetWidth, targetHeight, defaultWidth, defaultHeight) {
          var widthRatio = defaultWidth / targetWidth;
          var heightRatio = defaultHeight / targetHeight;
          var ratio;
          widthRatio < heightRatio ? ratio = widthRatio : ratio = heightRatio;
          var size = new Size(Math.floor(targetWidth * ratio), Math.floor(targetHeight * ratio));
          return size;
        }
        /**
         * 从资源缓存中找到预制资源名并创建一个显示对象
         * @param path 资源路径
         */
        ;

        ViewUtil.createPrefabNode = function createPrefabNode(path) {
          var p = oops.res.get(path, Prefab);
          var n = instantiate(p);
          return n;
        }
        /**
         * 加载预制并创建预制节点
         * @param path 资源路径
         */
        ;

        ViewUtil.createPrefabNodeAsync = function createPrefabNodeAsync(path) {
          var _this = this;

          return new Promise( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  oops.res.load(path, Prefab, function (err, content) {
                    if (err) {
                      console.error("\u540D\u4E3A\u3010" + path + "\u3011\u7684\u8D44\u6E90\u52A0\u8F7D\u5931\u8D25");
                      return;
                    }

                    var node = _this.createPrefabNode(path);

                    resolve(node);
                  });

                case 1:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));
        }
        /**
         * 加载预制节点
         * @param path          资源路径
         * @param callback      资源加载完成回调
         */
        ;

        ViewUtil.loadPrefabNode = function loadPrefabNode(path, callback) {
          var _this2 = this;

          oops.res.load(path, Prefab, function (err, content) {
            if (err) {
              console.error("\u540D\u4E3A\u3010" + path + "\u3011\u7684\u8D44\u6E90\u52A0\u8F7D\u5931\u8D25");
              return;
            }

            var node = _this2.createPrefabNode(path);

            callback(node);
          });
        }
        /**
         * 添加节点动画
         * @param path              资源路径
         * @param node              目标节点
         * @param onlyOne           是否唯一
         * @param isDefaultClip     是否播放默认动画剪辑
         */
        ;

        ViewUtil.addNodeAnimation = function addNodeAnimation(path, node, onlyOne, isDefaultClip) {
          if (onlyOne === void 0) {
            onlyOne = true;
          }

          if (isDefaultClip === void 0) {
            isDefaultClip = false;
          }

          if (!node || !node.isValid) {
            return;
          }

          var anim = node.getComponent(Animation);

          if (anim == null) {
            anim = node.addComponent(Animation);
          }

          var clip = oops.res.get(path, AnimationClip);

          if (!clip) {
            return;
          }

          if (onlyOne && anim.getState(clip.name) && anim.getState(clip.name).isPlaying) {
            return;
          }

          if (isDefaultClip) {
            anim.defaultClip = clip;
            anim.play();
            return;
          } // 播放完成后恢复播放默认动画


          anim.once(Animation.EventType.FINISHED, function () {
            if (anim.defaultClip) {
              anim.play();
            }
          }, this);

          if (anim.getState(clip.name)) {
            anim.play(clip.name);
            return;
          }

          anim.createState(clip, clip.name);
          anim.play(clip.name);
        };

        return ViewUtil;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VMBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ViewModel.ts', './VMEnv.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, log, Component, VM, VMEnv;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      log = module.log;
      Component = module.Component;
    }, function (module) {
      VM = module.VM;
    }, function (module) {
      VMEnv = module.VMEnv;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "2f6f36IvUdPO7xynnVTPgzb", "VMBase", undefined);

      var ccclass = _decorator.ccclass,
          help = _decorator.help;
      /**
       * watchPath 的基础，只提供绑定功能 和 对应的数据更新函数
       */

      var VMBase = exports('VMBase', (_dec = help('https://gitee.com/dgflash/oops-framework/blob/master/doc/mvvm/VMBase.md'), ccclass(_class = _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(VMBase, _Component);

        function VMBase() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /**VM管理 */

          _this.VM = VM;
          /** watch 单路径  */

          _this.watchPath = '';
          /** 是否启用模板多路径模式 */

          _this.templateMode = false;
          /** watch 多路径 */

          _this.watchPathArr = [];
          /** 储存模板多路径的值 */

          _this.templateValueArr = [];
          return _this;
        }

        var _proto = VMBase.prototype;
        /**
         * 如果需要重写onLoad 方法，请根据顺序调用 super.onLoad()，执行默认方法
         */

        _proto.onLoad = function onLoad() {
          var _this2 = this;

          if (VMEnv.editor) return; // 提前拆分、并且解析路径

          var paths = this.watchPath.split('.');

          for (var i = 1; i < paths.length; i++) {
            var p = paths[i]; // 如果发现了路径使用了 * ，则自动去自己的父节点查找自己所在 index 值

            if (p == '*') {
              var index = this.node.parent.children.findIndex(function (n) {
                return n === _this2.node;
              });
              if (index <= 0) index = 0;
              paths[i] = index.toString();
              break;
            }
          } // 替换掉原路径


          this.watchPath = paths.join('.'); // 提前进行路径数组 的 解析

          var pathArr = this.watchPathArr;

          if (pathArr.length >= 1) {
            for (var _i = 0; _i < pathArr.length; _i++) {
              var path = pathArr[_i];

              var _paths = path.split('.');

              for (var _i2 = 1; _i2 < _paths.length; _i2++) {
                var _p = _paths[_i2];

                if (_p == '*') {
                  var _index = this.node.parent.children.findIndex(function (n) {
                    return n === _this2.node;
                  });

                  if (_index <= 0) _index = 0;
                  _paths[_i2] = _index.toString();
                  break;
                }
              }

              this.watchPathArr[_i] = _paths.join('.');
            }
          }

          if (this.watchPath == '' && this.watchPathArr.join('') == '') {
            log('可能未设置路径的节点:', this.node.parent.name + '.' + this.node.name);
          }
        };

        _proto.onEnable = function onEnable() {
          if (VMEnv.editor) return;

          if (this.templateMode) {
            this.setMultPathEvent(true);
          } else if (this.watchPath != '') {
            this.VM.bindPath(this.watchPath, this.onValueChanged, this);
          }

          this.onValueInit(); // 激活时,调用值初始化
        };

        _proto.onDisable = function onDisable() {
          if (VMEnv.editor) return;

          if (this.templateMode) {
            this.setMultPathEvent(false);
          } else if (this.watchPath != '') {
            this.VM.unbindPath(this.watchPath, this.onValueChanged, this);
          }
        } // 多路径监听方式
        ;

        _proto.setMultPathEvent = function setMultPathEvent(enabled) {
          if (enabled === void 0) {
            enabled = true;
          }

          if (VMEnv.editor) return;
          var arr = this.watchPathArr;

          for (var i = 0; i < arr.length; i++) {
            var path = arr[i];

            if (enabled) {
              this.VM.bindPath(path, this.onValueChanged, this);
            } else {
              this.VM.unbindPath(path, this.onValueChanged, this);
            }
          }
        };

        _proto.onValueInit = function onValueInit() {// 虚方法
        }
        /**
         * 值变化事件
         * @param n       新值
         * @param o       旧值
         * @param pathArr 对象路径数组
         */
        ;

        _proto.onValueChanged = function onValueChanged(n, o, pathArr) {};

        return VMBase;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VMCompsEdit.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './VMEnv.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, CCString, Enum, Node, log, Component, VMEnv;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      Enum = module.Enum;
      Node = module.Node;
      log = module.log;
      Component = module.Component;
    }, function (module) {
      VMEnv = module.VMEnv;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

      cclegacy._RF.push({}, "2359eFXKF5HFYS74K7Y17/U", "VMCompsEdit", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          menu = _decorator.menu,
          help = _decorator.help;

      var ACTION_MODE = /*#__PURE__*/function (ACTION_MODE) {
        ACTION_MODE[ACTION_MODE["SEARCH_COMPONENT"] = 0] = "SEARCH_COMPONENT";
        ACTION_MODE[ACTION_MODE["ENABLE_COMPONENT"] = 1] = "ENABLE_COMPONENT";
        ACTION_MODE[ACTION_MODE["REPLACE_WATCH_PATH"] = 2] = "REPLACE_WATCH_PATH";
        ACTION_MODE[ACTION_MODE["DELETE_COMPONENT"] = 3] = "DELETE_COMPONENT";
        return ACTION_MODE;
      }(ACTION_MODE || {});
      /**
       * 用于搜索的MV 组件列表，挂载在父节点后，
       * 会遍历搜索下面的所有MV组件, 并且显示其观察值的路径
       */


      var MVCompsEdit = exports('default', (_dec = menu('ModelViewer/Edit-Comps (快速组件操作)'), _dec2 = help('https://gitee.com/dgflash/oops-framework/blob/master/doc/mvvm/VMCompsEdit.md'), _dec3 = property({
        type: [CCString]
      }), _dec4 = property({
        type: Enum(ACTION_MODE)
      }), _dec5 = property({
        tooltip: '勾选后,会自动查找 find list 中填写的组件',
        visible: function visible() {
          // @ts-ignore
          return this.actionType === ACTION_MODE.SEARCH_COMPONENT;
        }
      }), _dec6 = property({
        tooltip: '勾选后,会批量激活 find list 中填写的组件',
        visible: function visible() {
          // @ts-ignore
          return this.actionType === ACTION_MODE.ENABLE_COMPONENT;
        }
      }), _dec7 = property({
        tooltip: '勾选后,会批量关闭 find list 中填写的组件',
        visible: function visible() {
          // @ts-ignore
          return this.actionType === ACTION_MODE.ENABLE_COMPONENT;
        }
      }), _dec8 = property({
        tooltip: '允许删除节点的组件,确定需要移除请勾选,防止误操作',
        visible: function visible() {
          // @ts-ignore
          return this.actionType === ACTION_MODE.DELETE_COMPONENT;
        }
      }), _dec9 = property({
        tooltip: '勾选后,会批量删除 find list 中填写的组件',
        displayName: '[ X DELETE X ]',
        visible: function visible() {
          // @ts-ignore
          return this.allowDelete && this.actionType === ACTION_MODE.DELETE_COMPONENT;
        }
      }), _dec10 = property({
        tooltip: '勾选后,会批量替换掉指定的路径',
        visible: function visible() {
          // @ts-ignore
          return this.actionType === ACTION_MODE.REPLACE_WATCH_PATH;
        }
      }), _dec11 = property({
        tooltip: '匹配的路径,匹配规则: 搜索开头为 game的路径',
        visible: function visible() {
          // @ts-ignore
          return this.actionType === ACTION_MODE.REPLACE_WATCH_PATH;
        }
      }), _dec12 = property({
        tooltip: '替换的路径,将匹配到的路径替换',
        visible: function visible() {
          // @ts-ignore
          return this.actionType === ACTION_MODE.REPLACE_WATCH_PATH;
        }
      }), _dec13 = property({
        tooltip: '是否搜集绑定VM组件的节点?',
        visible: function visible() {
          // @ts-ignore
          return this.actionType === ACTION_MODE.SEARCH_COMPONENT;
        }
      }), _dec14 = property({
        type: [Node],
        readonly: true,
        tooltip: '收集到绑定了VM组件相关的节点，可以自己跳转过去',
        visible: function visible() {
          // @ts-ignore
          return this.canCollectNodes && this.actionType === ACTION_MODE.SEARCH_COMPONENT;
        }
      }), ccclass(_class = executeInEditMode(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MVCompsEdit, _Component);

        function MVCompsEdit() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "findList", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "actionType", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "allowDelete", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "targetPath", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "replacePath", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "canCollectNodes", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "collectNodes", _descriptor7, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MVCompsEdit.prototype;

        _proto.onLoad = function onLoad() {
          if (VMEnv.editor) return;
          var path = this.getNodePath(this.node);
          console.error('you forget delete MVEditFinder,[path]', path);
        };

        _proto.setComponents = function setComponents(state) {
          var _this2 = this;

          var array = this.findList;
          var title = '搜索到当前节点下面的组件';

          switch (state) {
            case 0:
              title = '搜索到当前节点下面的组件';
              break;

            case 1:
              title = '激活以下节点的组件';
              break;

            case 2:
              title = '关闭以下节点的组件';
              break;

            case 3:
              title = '删除以下节点的组件';
              break;

            case 4:
              title = '替换以下节点的路径';
              break;
          }

          log(title);
          log('______________________');
          array.forEach(function (name) {
            _this2.searchComponent(name, state);
          });
          log('______________________');
        }
        /**
         * 
         * @param className 
         * @param state 0-查找节点组件 1-激活节点组件 2-关闭节点组件 3-移除节点组件
         */
        ;

        _proto.searchComponent = function searchComponent(className, state) {
          var _this3 = this;

          if (state === void 0) {
            state = 0;
          }
          /**收集节点清空 */


          this.collectNodes = [];
          var comps = this.node.getComponentsInChildren(className);
          if (comps == null || comps.length < 1) return;
          log('[' + className + ']:');
          comps.forEach(function (v) {
            var ext = '';

            if (state <= 3) {
              //区分模板模式路径
              if (v.templateMode === true) {
                ext = v.watchPathArr ? ':[Path:' + v.watchPathArr.join('|') + ']' : '';
              } else {
                ext = v.watchPath ? ':[Path:' + v.watchPath + ']' : '';
              }
            }

            log(_this3.getNodePath(v.node) + ext);

            switch (state) {
              case 0:
                //寻找组件
                if (_this3.canCollectNodes) {
                  if (_this3.collectNodes.indexOf(v.node) === -1) {
                    _this3.collectNodes.push(v.node);
                  }
                }

                break;

              case 1:
                // 激活组件
                v.enabled = true;
                break;

              case 2:
                // 关闭组件
                v.enabled = false;
                break;

              case 3:
                // 删除组件
                v.node.removeComponent(v);
                break;

              case 4:
                // 替换指定路径
                var targetPath = _this3.targetPath;
                var replacePath = _this3.replacePath;

                if (v.templateMode === true) {
                  for (var i = 0; i < v.watchPathArr.length; i++) {
                    var path = v.watchPathArr[i];
                    v.watchPathArr[i] = _this3.replaceNodePath(path, targetPath, replacePath);
                  }
                } else {
                  v.watchPath = _this3.replaceNodePath(v.watchPath, targetPath, replacePath);
                }

            }
          });
        };

        _proto.replaceNodePath = function replaceNodePath(path, search, replace) {
          var pathArr = path.split('.');
          var searchArr = search.split('.');
          var replaceArr = replace.split('.');
          var match = true;

          for (var i = 0; i < searchArr.length; i++) {
            //未匹配上
            if (pathArr[i] !== searchArr[i]) {
              match = false;
              break;
            }
          } //匹配成功准备替换路径


          if (match === true) {
            for (var _i = 0; _i < replaceArr.length; _i++) {
              pathArr[_i] = replaceArr[_i];
            }

            log(' 路径更新:', path, '>>>', pathArr.join('.'));
          }

          return pathArr.join('.');
        };

        _proto.getNodePath = function getNodePath(node) {
          var parent = node;
          var array = [];

          while (parent) {
            var p = parent.getParent();

            if (p) {
              array.push(parent.name);
              parent = p;
            } else {
              break;
            }
          }

          return array.reverse().join('/');
        };

        _createClass(MVCompsEdit, [{
          key: "findTrigger",
          get: function get() {
            return false;
          },
          set: function set(v) {
            this.setComponents(0);
          }
        }, {
          key: "enableTrigger",
          get: function get() {
            return false;
          },
          set: function set(v) {
            this.setComponents(1);
          }
        }, {
          key: "disableTrigger",
          get: function get() {
            return false;
          },
          set: function set(v) {
            this.setComponents(2);
          }
        }, {
          key: "deleteTrigger",
          get: function get() {
            return false;
          },
          set: function set(v) {
            this.setComponents(3);
          }
        }, {
          key: "replaceTrigger",
          get: function get() {
            return false;
          },
          set: function set(v) {
            this.setComponents(4);
          }
        }]);

        return MVCompsEdit;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "findList", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ["VMBase", "VMParent"];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "actionType", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ACTION_MODE.SEARCH_COMPONENT;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "findTrigger", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "findTrigger"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableTrigger", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "enableTrigger"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disableTrigger", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "disableTrigger"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "allowDelete", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "deleteTrigger", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteTrigger"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replaceTrigger", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "replaceTrigger"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "targetPath", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'game';
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "replacePath", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '*';
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "canCollectNodes", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "collectNodes", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VMCustom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './VMBase.ts', './VMEnv.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Toggle, VMBase, VMEnv;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Toggle = module.Toggle;
    }, function (module) {
      VMBase = module.VMBase;
    }, function (module) {
      VMEnv = module.VMEnv;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "ce662fwsSVPLKpmHx+KocFu", "VMCustom", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          menu = _decorator.menu,
          help = _decorator.help;
      /** 自动检查识别的数组,你可以准备自己的组件放上去自动识别 */

      var COMP_ARRAY_CHECK = [['BhvFrameIndex', 'index', false], ['BhvGroupToggle', 'index', false], ['BhvRollNumber', 'targetValue', false], // 组件名、默认属性、controller值
      ['cc.Label', 'string', false], ['cc.RichText', 'string', false], ['cc.EditBox', 'string', true], ['cc.Slider', 'progress', true], ['cc.ProgressBar', 'progress', false], ['cc.Toggle', 'isChecked', true]];
      /**
       * [VM-Custom]
       * 自定义数值监听, 可以快速对该节点上任意一个组件上的属性进行双向绑定
       */

      var VMCustom = exports('VMCustom', (_dec = menu('ModelViewer/VM-Custom (自定义VM)'), _dec2 = help('https://gitee.com/dgflash/oops-framework/blob/master/doc/mvvm/VMCustom.md'), _dec3 = property({
        tooltip: '激活controller,以开启双向绑定，否则只能接收消息'
      }), _dec4 = property({
        tooltip: "监视对象路径"
      }), _dec5 = property({
        tooltip: '绑定组件的名字'
      }), _dec6 = property({
        tooltip: '组件上需要监听的属性'
      }), _dec7 = property({
        tooltip: '刷新间隔频率(只影响脏检查的频率)',
        step: 0.01,
        range: [0, 1],
        visible: function visible() {
          // @ts-ignore
          return this.controller === true;
        }
      }), ccclass(_class = executeInEditMode(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_VMBase) {
        _inheritsLoose(VMCustom, _VMBase);

        function VMCustom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _VMBase.call.apply(_VMBase, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "controller", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "watchPath", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "componentName", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "componentProperty", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "refreshRate", _descriptor5, _assertThisInitialized(_this));
          /** 计时器 */


          _this._timer = 0;
          /** 监听的组件对象 */

          _this._watchComponent = null;
          /** 是否能监听组件的数据 */

          _this._canWatchComponent = false;
          /** 检查的值 */

          _this._oldValue = null;
          return _this;
        }

        var _proto = VMCustom.prototype;

        _proto.onLoad = function onLoad() {
          _VMBase.prototype.onLoad.call(this); // 只在运行时检查组件是否缺失可用


          this.checkEditorComponent(); //编辑器检查

          if (VMEnv.editor) return;
          this._watchComponent = this.node.getComponent(this.componentName);
          this.checkComponentState();
        };

        _proto.onRestore = function onRestore() {
          this.checkEditorComponent();
        };

        _proto.start = function start() {
          //从 watch 的路径中获取一个初始值
          this.onValueInit();
        } // 挂在对应节点后，自动获取组件属性和名字
        ;

        _proto.checkEditorComponent = function checkEditorComponent() {
          if (VMEnv.editor) return;
          var checkArray = COMP_ARRAY_CHECK;

          for (var i = 0; i < checkArray.length; i++) {
            var params = checkArray[i];
            var comp = this.node.getComponent(params[0]);

            if (comp) {
              if (this.componentName == '') this.componentName = params[0];
              if (this.componentProperty == '') this.componentProperty = params[1];
              if (params[2] !== null) this.controller = params[2];
              break;
            }
          }
        };

        _proto.checkComponentState = function checkComponentState() {
          this._canWatchComponent = false;

          if (!this._watchComponent) {
            console.error('未设置需要监听的组件');
            return;
          }

          if (!this.componentProperty) {
            console.error('未设置需要监听的组件 的属性');
            return;
          }

          if (this.componentProperty in this._watchComponent === false) {
            console.error('需要监听的组件的属性不存在');
            return;
          }

          this._canWatchComponent = true;
        };

        _proto.getComponentValue = function getComponentValue() {
          return this._watchComponent[this.componentProperty];
        };

        _proto.setComponentValue = function setComponentValue(value) {
          // 如果遇到 Toggle 组件就调用上面的方法解决
          if (this.componentName == "cc.Toggle") {
            this.node.getComponent(Toggle).isChecked = value;
          } else {
            this._watchComponent[this.componentProperty] = value;
          }
        }
        /** 初始化获取数据 */
        ;

        _proto.onValueInit = function onValueInit() {
          if (VMEnv.editor) return; //更新信息

          this.setComponentValue(this.VM.getValue(this.watchPath));
        }
        /** [可重写]组件的值发生变化后，触发更新此值 */
        ;

        _proto.onValueController = function onValueController(newValue, oldValue) {
          this.VM.setValue(this.watchPath, newValue);
        }
        /** [可重写]初始化改变数据 */
        ;

        _proto.onValueChanged = function onValueChanged(n, o, pathArr) {
          this.setComponentValue(n);
        };

        _proto.update = function update(dt) {
          // 脏检查（组件是否存在，是否被激活）
          if (VMEnv.editor) return; //if (this.templateMode == true) return; //todo 模板模式下不能计算  

          if (!this.controller) return;
          if (!this._canWatchComponent || this._watchComponent['enabled'] === false) return; //刷新频率检查

          this._timer += dt;
          if (this._timer < this.refreshRate) return;
          this._timer = 0;
          var oldValue = this._oldValue;
          var newValue = this.getComponentValue();
          if (this._oldValue === newValue) return;
          this._oldValue = this.getComponentValue();
          this.onValueController(newValue, oldValue);
        };

        return VMCustom;
      }(VMBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "controller", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "watchPath", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "componentName", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "componentProperty", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "refreshRate", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      })), _class2)) || _class) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VMEnv.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './env'], function (exports) {
  var _createClass, cclegacy, EDITOR;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      EDITOR = module.EDITOR;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fdf72Q91PdCXpPQ+62s1ufi", "VMEnv", undefined);
      /** VM组件环境验证 */


      var VMEnv = exports('VMEnv', /*#__PURE__*/function () {
        function VMEnv() {}

        _createClass(VMEnv, null, [{
          key: "editor",
          get:
          /** 编辑状态 */
          function get() {
            // @ts-ignore
            return EDITOR;
          }
        }]);

        return VMEnv;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VMEvent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './VMBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCString, Enum, EventHandler, VMBase;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      Enum = module.Enum;
      EventHandler = module.EventHandler;
    }, function (module) {
      VMBase = module.VMBase;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

      cclegacy._RF.push({}, "a9ce7kf8XZJeLPlT2iWn2zD", "VMEvent", undefined); // +普通 label 更新数据的情况,label.string = xxx;
      // +frameIndex 插件，通过number 数值设置 BhvFrameIndex 来切换当前贴图
      // +spriteFrame 直接替换贴图的情况 , 
      //  读取本地路径 data.spriteFrame = $res:/pic/com1
      //  读取网页路径 data.spriteFrame = $url:http:xxxxxxxxxx.png
      // +特殊条件控制 
      // 比较条件:,如果传入值 > /< />= /<= /== 某值时，执行的action类型


      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          menu = _decorator.menu,
          help = _decorator.help;

      var FILTER_MODE = /*#__PURE__*/function (FILTER_MODE) {
        FILTER_MODE[FILTER_MODE["none"] = 0] = "none";
        FILTER_MODE[FILTER_MODE["=="] = 1] = "==";
        FILTER_MODE[FILTER_MODE["!="] = 2] = "!=";
        FILTER_MODE[FILTER_MODE[">"] = 3] = ">";
        FILTER_MODE[FILTER_MODE[">="] = 4] = ">=";
        FILTER_MODE[FILTER_MODE["<"] = 5] = "<";
        FILTER_MODE[FILTER_MODE["<="] = 6] = "<=";
        return FILTER_MODE;
      }(FILTER_MODE || {}); // 正常计算，比较>=

      /**
       *  [VM-Event]
       * 提供  ViewModel 的相关基础功能,
       * 如果值发生变化将会调用对应的函数方法
       */


      var VMEvent = exports('default', (_dec = menu('ModelViewer/VM-EventCall(调用函数)'), _dec2 = help('https://gitee.com/dgflash/oops-framework/blob/master/doc/mvvm/VMEvent.md'), _dec3 = property({
        tooltip: '使用模板模式，可以使用多路径监听'
      }), _dec4 = property({
        tooltip: '监听获取值的路径',
        visible: function visible() {
          // @ts-ignore
          return this.templateMode === false;
        }
      }), _dec5 = property({
        tooltip: '触发一次后会自动关闭该事件'
      }), _dec6 = property({
        tooltip: '监听获取值的多条路径,这些值的改变都会通过这个函数回调,请使用 pathArr 区分获取的值 ',
        type: [CCString],
        visible: function visible() {
          // @ts-ignore
          return this.templateMode === true;
        }
      }), _dec7 = property({
        tooltip: '过滤模式，会根据条件过滤掉时间的触发',
        type: Enum(FILTER_MODE)
      }), _dec8 = property({
        visible: function visible() {
          // @ts-ignore
          return this.filterMode !== FILTER_MODE.none;
        }
      }), _dec9 = property([EventHandler]), ccclass(_class = executeInEditMode(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_VMBase) {
        _inheritsLoose(VMEvent, _VMBase);

        function VMEvent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _VMBase.call.apply(_VMBase, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "templateMode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "watchPath", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "triggerOnce", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "watchPathArr", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "filterMode", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "compareValue", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "changeEvents", _descriptor7, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = VMEvent.prototype;

        _proto.onValueInit = function onValueInit() {};

        _proto.onValueChanged = function onValueChanged(newVar, oldVar, pathArr) {
          var res = this.conditionCheck(newVar, this.compareValue);
          if (!res) return;

          if (Array.isArray(this.changeEvents)) {
            this.changeEvents.forEach(function (v) {
              v.emit([newVar, oldVar, pathArr]);
            });
          } // 激活一次后，自动关闭组件


          if (this.triggerOnce === true) {
            this.enabled = false;
          }
        }
        /** 条件检查 */
        ;

        _proto.conditionCheck = function conditionCheck(a, b) {
          var cod = FILTER_MODE;

          switch (this.filterMode) {
            case cod.none:
              return true;

            case cod["=="]:
              if (a == b) return true;
              break;

            case cod["!="]:
              if (a != b) return true;
              break;

            case cod["<"]:
              if (a < b) return true;
              break;

            case cod[">"]:
              if (a > b) return true;
              break;

            case cod[">="]:
              if (a >= b) return true;
              break;

            case cod["<"]:
              if (a < b) return true;
              break;

            case cod["<="]:
              if (a <= b) return true;
              break;
          }

          return false;
        };

        return VMEvent;
      }(VMBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "templateMode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "watchPath", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "triggerOnce", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "watchPathArr", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "filterMode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return FILTER_MODE.none;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "compareValue", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "changeEvents", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VMLabel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './StringFormat.ts', './VMBase.ts', './VMEnv.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCString, error, StringFormatFunction, VMBase, VMEnv;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      error = module.error;
    }, function (module) {
      StringFormatFunction = module.StringFormatFunction;
    }, function (module) {
      VMBase = module.VMBase;
    }, function (module) {
      VMEnv = module.VMEnv;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "545c05XsG9GDJispEGWKvYv", "VMLabel", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu,
          executeInEditMode = _decorator.executeInEditMode,
          help = _decorator.help;
      var LABEL_TYPE = {
        CC_LABEL: 'cc.Label',
        CC_RICH_TEXT: 'cc.RichText',
        CC_EDIT_BOX: 'cc.EditBox'
      };
      /**
       *  [VM-Label]
       *  专门处理 Label 相关 的组件，如 ccLabel,ccRichText,ccEditBox
       *  可以使用模板化的方式将数据写入,可以处理字符串格式等
       *  todo 加入stringFormat 可以解析转换常见的字符串格式
       */

      var VMLabel = exports('default', (_dec = menu('ModelViewer/VM-Label(文本VM)'), _dec2 = help('https://gitee.com/dgflash/oops-framework/blob/master/doc/mvvm/VMLabel.md'), _dec3 = property({
        tooltip: '是否启用模板代码,只能在运行时之前设置,\n将会动态解析模板语法 {{0}},并且自动设置监听的路径'
      }), _dec4 = property({
        visible: function visible() {
          // @ts-ignore
          return this.templateMode === false;
        }
      }), _dec5 = property({
        readonly: true
      }), _dec6 = property({
        type: [CCString],
        visible: function visible() {
          // @ts-ignore
          return this.templateMode === true;
        }
      }), ccclass(_class = executeInEditMode(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_VMBase) {
        _inheritsLoose(VMLabel, _VMBase);

        function VMLabel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _VMBase.call.apply(_VMBase, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "templateMode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "watchPath", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "labelType", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "watchPathArr", _descriptor4, _assertThisInitialized(_this));
          /** 按照路径参数顺序保存的 值的数组（固定）*/


          _this.templateValueArr = [];
          /** 保存着字符模板格式的数组 (只会影响显示参数) */

          _this.templateFormatArr = [];
          /** 源字符串 */

          _this.originText = null;
          return _this;
        }

        var _proto = VMLabel.prototype;

        _proto.onRestore = function onRestore() {
          this.checkLabel();
        };

        _proto.onLoad = function onLoad() {
          _VMBase.prototype.onLoad.call(this);

          this.checkLabel();
          if (VMEnv.editor) return;

          if (this.templateMode) {
            this.originText = this.getLabelValue();
            this.parseTemplate();
          }
        };

        _proto.start = function start() {
          if (VMEnv.editor) return;
          this.onValueInit();
        } // 解析模板 获取初始格式化字符串格式 的信息
        ;

        _proto.parseTemplate = function parseTemplate() {
          var regexAll = /\{\{(.+?)\}\}/g; // 匹配： 所有的{{value}}

          var regex = /\{\{(.+?)\}\}/; // 匹配： {{value}} 中的 value

          var res = this.originText.match(regexAll); // 匹配结果数组

          if (res == null) return;

          for (var i = 0; i < res.length; i++) {
            var e = res[i];
            var arr = e.match(regex);
            var matchName = arr[1]; // let paramIndex = parseInt(matchName) || 0;

            var matchInfo = matchName.split(':')[1] || '';
            this.templateFormatArr[i] = matchInfo;
          }
        }
        /**获取解析字符串模板后得到的值 */
        ;

        _proto.getReplaceText = function getReplaceText() {
          if (!this.originText) return "";
          var regexAll = /\{\{(.+?)\}\}/g; // 匹配： 所有的{{value}}

          var regex = /\{\{(.+?)\}\}/; // 匹配： {{value}} 中的 value

          var res = this.originText.match(regexAll); // 匹配结果数组 [{{value}}，{{value}}，{{value}}]

          if (res == null) return ''; // 未匹配到文本

          var str = this.originText; // 原始字符串模板 "name:{{0}} 或 name:{{0:fix2}}"

          for (var i = 0; i < res.length; i++) {
            var e = res[i];
            var getValue = void 0;
            var arr = e.match(regex); // 匹配到的数组 [{{value}}, value]

            var indexNum = parseInt(arr[1] || '0') || 0; // 取出数组的 value 元素 转换成整数

            var format = this.templateFormatArr[i]; // 格式化字符 的 配置参数

            getValue = this.templateValueArr[indexNum];
            str = str.replace(e, this.getValueFromFormat(getValue, format)); //从路径缓存值获取数据
          }

          return str;
        }
        /** 格式化字符串 */
        ;

        _proto.getValueFromFormat = function getValueFromFormat(value, format) {
          return StringFormatFunction.deal(value, format);
        }
        /** 初始化获取数据 */
        ;

        _proto.onValueInit = function onValueInit() {
          //更新信息
          if (this.templateMode === false) {
            this.setLabelValue(this.VM.getValue(this.watchPath)); //
          } else {
            var max = this.watchPathArr.length;

            for (var i = 0; i < max; i++) {
              this.templateValueArr[i] = this.VM.getValue(this.watchPathArr[i], '?');
            }

            this.setLabelValue(this.getReplaceText()); // 重新解析
          }
        }
        /** 监听数据发生了变动的情况 */
        ;

        _proto.onValueChanged = function onValueChanged(n, o, pathArr) {
          if (this.templateMode === false) {
            this.setLabelValue(n);
          } else {
            var path = pathArr.join('.'); // 寻找缓存位置

            var index = this.watchPathArr.findIndex(function (v) {
              return v === path;
            });

            if (index >= 0) {
              //如果是所属的路径，就可以替换文本了
              this.templateValueArr[index] = n; // 缓存值

              this.setLabelValue(this.getReplaceText()); // 重新解析文本
            }
          }
        };

        _proto.setLabelValue = function setLabelValue(value) {
          var component = this.getComponent(this.labelType);
          component.string = value + '';
        };

        _proto.getLabelValue = function getLabelValue() {
          var component = this.getComponent(this.labelType);
          return component.string;
        };

        _proto.checkLabel = function checkLabel() {
          var checkArray = ['cc.Label', 'cc.RichText', 'cc.EditBox'];

          for (var i = 0; i < checkArray.length; i++) {
            var e = checkArray[i];
            var comp = this.node.getComponent(e);

            if (comp) {
              this.labelType = e;
              return true;
            }
          }

          error('没有挂载任何label组件');
          return false;
        };

        return VMLabel;
      }(VMBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "templateMode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "watchPath", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "labelType", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return LABEL_TYPE.CC_LABEL;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "watchPathArr", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VMModify.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './VMBase.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Enum, VMBase;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
    }, function (module) {
      VMBase = module.VMBase;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "7d2a4voaOJJGJZRWFPG6Bk7", "VMModify", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu,
          help = _decorator.help;
      /** 限制值边界范围的模式 */

      var CLAMP_MODE = /*#__PURE__*/function (CLAMP_MODE) {
        CLAMP_MODE[CLAMP_MODE["MIN"] = 0] = "MIN";
        CLAMP_MODE[CLAMP_MODE["MAX"] = 1] = "MAX";
        CLAMP_MODE[CLAMP_MODE["MIN_MAX"] = 2] = "MIN_MAX";
        return CLAMP_MODE;
      }(CLAMP_MODE || {});
      /**
       * [VM-Modify]
       * 动态快速的修改模型的数值,使用按钮 绑定该组件上的函数，即可动态调用
       * 修改 Model 的值
       */


      var VMModify = exports('default', (_dec = menu('ModelViewer/VM-Modify(修改Model)'), _dec2 = help('https://gitee.com/dgflash/oops-framework/blob/master/doc/mvvm/VMModify.md'), _dec3 = property({
        tooltip: "监视对象路径"
      }), _dec4 = property({
        tooltip: "是不启用取值范围限制"
      }), _dec5 = property({
        type: Enum(CLAMP_MODE),
        visible: function visible() {
          // @ts-ignore
          return this.valueClamp === true;
        }
      }), _dec6 = property({
        visible: function visible() {
          // @ts-ignore
          return this.valueClamp === true && this.valueClampMode !== CLAMP_MODE.MAX;
        }
      }), _dec7 = property({
        visible: function visible() {
          // @ts-ignore
          return this.valueClamp === true && this.valueClampMode !== CLAMP_MODE.MIN;
        }
      }), ccclass(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_VMBase) {
        _inheritsLoose(VMModify, _VMBase);

        function VMModify() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _VMBase.call.apply(_VMBase, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "watchPath", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueClamp", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueClampMode", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueMin", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueMax", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = VMModify.prototype; // 限制最终结果的取值范围

        _proto.clampValue = function clampValue(res) {
          var min = this.valueMin;
          var max = this.valueMax;
          if (this.valueClamp == false) return res;

          switch (this.valueClampMode) {
            case CLAMP_MODE.MIN_MAX:
              if (res > max) res = max;
              if (res < min) res = min;
              break;

            case CLAMP_MODE.MIN:
              if (res < min) res = min;
              break;

            case CLAMP_MODE.MAX:
              if (res > max) res = max;
              break;
          }

          return res;
        }
        /** 加整数 */
        ;

        _proto.vAddInt = function vAddInt(e, data) {
          this.vAdd(e, data, true);
        }
        /** 减整数 */
        ;

        _proto.vSubInt = function vSubInt(e, data) {
          this.vSub(e, data, true);
        }
        /** 乘整数 */
        ;

        _proto.vMulInt = function vMulInt(e, data) {
          this.vMul(e, data, true);
        }
        /** 除整数 */
        ;

        _proto.vDivInt = function vDivInt(e, data) {
          this.vDiv(e, data, true);
        }
        /** 加 */
        ;

        _proto.vAdd = function vAdd(e, data, _int) {
          if (_int === void 0) {
            _int = false;
          }

          var a = parseFloat(data);
          var res = this.VM.getValue(this.watchPath, 0) + a;

          if (_int) {
            res = Math.round(res);
          }

          this.VM.setValue(this.watchPath, this.clampValue(res));
        }
        /** 减 */
        ;

        _proto.vSub = function vSub(e, data, _int2) {
          if (_int2 === void 0) {
            _int2 = false;
          }

          var a = parseFloat(data);
          var res = this.VM.getValue(this.watchPath, 0) - a;

          if (_int2) {
            res = Math.round(res);
          }

          this.VM.setValue(this.watchPath, this.clampValue(res));
        }
        /** 乘 */
        ;

        _proto.vMul = function vMul(e, data, _int3) {
          if (_int3 === void 0) {
            _int3 = false;
          }

          var a = parseFloat(data);
          var res = this.VM.getValue(this.watchPath, 0) * a;

          if (_int3) {
            res = Math.round(res);
          }

          this.VM.setValue(this.watchPath, this.clampValue(res));
        }
        /** 除 */
        ;

        _proto.vDiv = function vDiv(e, data, _int4) {
          if (_int4 === void 0) {
            _int4 = false;
          }

          var a = parseFloat(data);
          var res = this.VM.getValue(this.watchPath, 0) / a;

          if (_int4) {
            res = Math.round(res);
          }

          this.VM.setValue(this.watchPath, this.clampValue(res));
        }
        /** 字符串赋值 */
        ;

        _proto.vString = function vString(e, data) {
          var a = data;
          this.VM.setValue(this.watchPath, a);
        }
        /** 整数赋值 */
        ;

        _proto.vNumberInt = function vNumberInt(e, data) {
          this.vNumber(e, data, true);
        }
        /** 数字赋值 */
        ;

        _proto.vNumber = function vNumber(e, data, _int5) {
          if (_int5 === void 0) {
            _int5 = false;
          }

          var a = parseFloat(data);

          if (_int5) {
            a = Math.round(a);
          }

          this.VM.setValue(this.watchPath, this.clampValue(a));
        };

        return VMModify;
      }(VMBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "watchPath", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "valueClamp", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "valueClampMode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return CLAMP_MODE.MIN_MAX;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "valueMin", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "valueMax", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VMParent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameComponent.ts', './ViewModel.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, GameComponent, VM;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      GameComponent = module.GameComponent;
    }, function (module) {
      VM = module.VM;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "15ccciO+ZRH476sPKD/LvB7", "VMParent", undefined);

      var ccclass = _decorator.ccclass,
          help = _decorator.help,
          executionOrder = _decorator.executionOrder;
      /**
       * 提供VM环境，控制旗下所有VM节点
       * 一般用于 非全局的 VM绑定,VM 环境与 组件紧密相连
       * （Prefab 模式绑定）
       * VMParent 必须必其他组件优先执行
       * v0.1 修复bug ，现在可以支持 Parent 嵌套 （但是注意性能问题，不要频繁嵌套）
       */

      var VMParent = exports('default', (_dec = executionOrder(-1), _dec2 = help('https://gitee.com/dgflash/oops-framework/blob/master/doc/mvvm/VMParent.md'), ccclass(_class = _dec(_class = _dec2(_class = /*#__PURE__*/function (_GameComponent) {
        _inheritsLoose(VMParent, _GameComponent);

        function VMParent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _GameComponent.call.apply(_GameComponent, [this].concat(args)) || this;
          /** 绑定的标签，可以通过这个tag 获取 当前的 vm 实例 */

          _this.tag = '_temp';
          /** 需要绑定的私有数据 */

          _this.data = {};
          /**VM 管理 */

          _this.VM = VM;
          return _this;
        }

        var _proto = VMParent.prototype;
        /**
         * [注意]不能直接覆盖此方法，如果需要覆盖。
         * 只能在该方法内部调用父类的实现 
         *   ```ts
         *       onLoad(){
         *           super.onLoad();
         *       }
         *   ``` 
         * 
         */

        _proto.onLoad = function onLoad() {
          if (this.data == null) return;
          this.tag = '_temp' + '<' + this.node.uuid.replace('.', '') + '>';
          VM.add(this.data, this.tag); // log(VM['_mvs'],this.tag)
          //搜寻所有节点：找到 watch path

          var comps = this.getVMComponents(); // console.group();

          for (var i = 0; i < comps.length; i++) {
            var comp = comps[i];
            this.replaceVMPath(comp, this.tag);
          } // console.groupEnd()


          this.onBind();

          _GameComponent.prototype.onLoad.call(this);
        }
        /**在 onLoad 完成 和 start() 之前调用，你可以在这里进行初始化数据等操作 */
        ;

        _proto.onBind = function onBind() {}
        /**在 onDestroy() 后调用,此时仍然可以获取绑定的 data 数据*/
        ;

        _proto.onUnBind = function onUnBind() {};

        _proto.replaceVMPath = function replaceVMPath(comp, tag) {
          // @ts-ignore
          var path = comp['watchPath']; // @ts-ignore

          if (comp['templateMode'] == true) {
            // @ts-ignore
            var pathArr = comp['watchPathArr'];

            if (pathArr) {
              for (var i = 0; i < pathArr.length; i++) {
                var _path = pathArr[i];
                pathArr[i] = _path.replace('*', tag);
              }
            }
          } else {
            // VMLabel
            // 遇到特殊 path 就优先替换路径
            if (path.split('.')[0] === '*') {
              // @ts-ignore
              comp['watchPath'] = path.replace('*', tag);
            }
          }
        }
        /** 未优化的遍历节点，获取VM 组件 */
        ;

        _proto.getVMComponents = function getVMComponents() {
          var _this2 = this;

          var comps = this.node.getComponentsInChildren('VMBase');
          var parents = this.node.getComponentsInChildren('VMParent').filter(function (v) {
            return v.uuid !== _this2.uuid;
          }); // 过滤掉自己
          //过滤掉不能赋值的parent

          var filters = [];
          parents.forEach(function (node) {
            filters = filters.concat(node.getComponentsInChildren('VMBase'));
          });
          comps = comps.filter(function (v) {
            return filters.indexOf(v) < 0;
          });
          return comps;
        }
        /**
         * [注意]不能覆盖此方法，如果需要覆盖。
         * 需要在该方法内部调用父类的实现，再定义自己的方法
         * ```ts
         *   onDestroy(){
         *       super.onDestroy();
         *   }
         * ```
         */
        ;

        _proto.onDestroy = function onDestroy() {
          this.onUnBind(); // 解除全部引用

          VM.remove(this.tag);
          this.data = null;

          _GameComponent.prototype.onDestroy.call(this);
        };

        return VMParent;
      }(GameComponent)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VMProgress.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './StringFormat.ts', './VMCustom.ts', './VMEnv.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCString, StringFormatFunction, VMCustom, VMEnv;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
    }, function (module) {
      StringFormatFunction = module.StringFormatFunction;
    }, function (module) {
      VMCustom = module.VMCustom;
    }, function (module) {
      VMEnv = module.VMEnv;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "2a50eqI7JZNV5Sh0y/Qd9C6", "VMProgress", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu,
          help = _decorator.help;
      var VMProgress = exports('default', (_dec = menu('ModelViewer/VM-Progress (VM-进度条)'), _dec2 = help('https://gitee.com/dgflash/oops-framework/blob/master/doc/mvvm/VMProgress.md'), _dec3 = property({
        visible: false,
        override: true
      }), _dec4 = property({
        type: [CCString],
        tooltip: '第一个值是min 值，第二个值 是 max 值，会计算出两者的比例'
      }), _dec5 = property({
        visible: function visible() {
          // @ts-ignore
          return this.componentProperty === 'string';
        },
        tooltip: '字符串格式化，和 VMLabel 的字段一样，需要填入对应的格式化字符串'
      }), ccclass(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_VMCustom) {
        _inheritsLoose(VMProgress, _VMCustom);

        function VMProgress() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _VMCustom.call.apply(_VMCustom, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "watchPath", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "watchPathArr", _descriptor2, _assertThisInitialized(_this));

          _this.templateMode = true;

          _initializerDefineProperty(_this, "stringFormat", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = VMProgress.prototype;

        _proto.onLoad = function onLoad() {
          if (this.watchPathArr.length < 2 || this.watchPathArr[0] == '[min]' || this.watchPathArr[1] == '[max]') {
            console.error('VMProgress must have two values!');
          }

          _VMCustom.prototype.onLoad.call(this);
        };

        _proto.start = function start() {
          if (VMEnv.editor) return;
          this.onValueInit();
        };

        _proto.onValueInit = function onValueInit() {
          var max = this.watchPathArr.length;

          for (var i = 0; i < max; i++) {
            this.templateValueArr[i] = this.VM.getValue(this.watchPathArr[i]);
          }

          var value = this.templateValueArr[0] / this.templateValueArr[1];
          this.setComponentValue(value);
        };

        _proto.setComponentValue = function setComponentValue(value) {
          if (this.stringFormat !== '') {
            var res = StringFormatFunction.deal(value, this.stringFormat);

            _VMCustom.prototype.setComponentValue.call(this, res);
          } else {
            _VMCustom.prototype.setComponentValue.call(this, value);
          }
        };

        _proto.onValueController = function onValueController(n, o) {
          var value = Math.round(n * this.templateValueArr[1]);
          if (Number.isNaN(value)) value = 0;
          this.VM.setValue(this.watchPathArr[0], value);
        }
        /** 初始化改变数据 */
        ;

        _proto.onValueChanged = function onValueChanged(n, o, pathArr) {
          if (this.templateMode === false) return;
          var path = pathArr.join('.'); // 寻找缓存位置

          var index = this.watchPathArr.findIndex(function (v) {
            return v === path;
          });

          if (index >= 0) {
            // 如果是所属的路径，就可以替换文本了
            this.templateValueArr[index] = n; //缓存值
          }

          var value = this.templateValueArr[0] / this.templateValueArr[1];
          if (value > 1) value = 1;
          if (value < 0 || Number.isNaN(value)) value = 0;
          this.setComponentValue(value);
        };

        return VMProgress;
      }(VMCustom), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "watchPath", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "watchPathArr", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ['[min]', '[max]'];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "stringFormat", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VMState.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './VMBase.ts', './ViewModel.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Enum, CCInteger, Node, Button, Sprite, UIRenderer, color, UIOpacity, VMBase, VM;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      CCInteger = module.CCInteger;
      Node = module.Node;
      Button = module.Button;
      Sprite = module.Sprite;
      UIRenderer = module.UIRenderer;
      color = module.color;
      UIOpacity = module.UIOpacity;
    }, function (module) {
      VMBase = module.VMBase;
    }, function (module) {
      VM = module.VM;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

      cclegacy._RF.push({}, "47052uw/Y5O1LXaLObj4ARx", "VMState", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu,
          help = _decorator.help;
      /** 比较条件 */

      var CONDITION = /*#__PURE__*/function (CONDITION) {
        CONDITION[CONDITION["=="] = 0] = "==";
        CONDITION[CONDITION["!="] = 1] = "!=";
        CONDITION[CONDITION[">"] = 2] = ">";
        CONDITION[CONDITION[">="] = 3] = ">=";
        CONDITION[CONDITION["<"] = 4] = "<";
        CONDITION[CONDITION["<="] = 5] = "<=";
        CONDITION[CONDITION["range"] = 6] = "range";
        return CONDITION;
      }(CONDITION || {});

      var ACTION = /*#__PURE__*/function (ACTION) {
        ACTION[ACTION["NODE_ACTIVE"] = 0] = "NODE_ACTIVE";
        ACTION[ACTION["NODE_VISIBLE"] = 1] = "NODE_VISIBLE";
        ACTION[ACTION["NODE_OPACITY"] = 2] = "NODE_OPACITY";
        ACTION[ACTION["NODE_COLOR"] = 3] = "NODE_COLOR";
        ACTION[ACTION["COMPONENT_CUSTOM"] = 4] = "COMPONENT_CUSTOM";
        ACTION[ACTION["SPRITE_GRAYSCALE"] = 5] = "SPRITE_GRAYSCALE";
        ACTION[ACTION["BUTTON_INTERACTABLE"] = 6] = "BUTTON_INTERACTABLE";
        return ACTION;
      }(ACTION || {}); // 满足条件的节点cc.BUTTON组件,


      var CHILD_MODE_TYPE = /*#__PURE__*/function (CHILD_MODE_TYPE) {
        CHILD_MODE_TYPE[CHILD_MODE_TYPE["NODE_INDEX"] = 0] = "NODE_INDEX";
        CHILD_MODE_TYPE[CHILD_MODE_TYPE["NODE_NAME"] = 1] = "NODE_NAME";
        return CHILD_MODE_TYPE;
      }(CHILD_MODE_TYPE || {});
      /**
       * [VM-State]
       * 监听数值状态,根据数值条件设置节点是否激活
       */


      var VMState = exports('default', (_dec = menu('ModelViewer/VM-State (VM状态控制)'), _dec2 = help('https://github.com/wsssheep/cocos_creator_mvvm_tools/blob/master/docs/VMState.md'), _dec3 = property({
        tooltip: '遍历子节点,根据子节点的名字或名字转换为值，判断值满足条件 来激活'
      }), _dec4 = property({
        type: Enum(CONDITION)
      }), _dec5 = property({
        type: Enum(CHILD_MODE_TYPE),
        tooltip: '遍历子节点,根据子节点的名字转换为值，判断值满足条件 来激活',
        visible: function visible() {
          // @ts-ignore
          return this.foreachChildMode === true;
        }
      }), _dec6 = property({
        displayName: 'Value: a',
        visible: function visible() {
          // @ts-ignore
          return this.foreachChildMode === false;
        }
      }), _dec7 = property({
        displayName: 'Value: b',
        visible: function visible() {
          // @ts-ignore
          return this.foreachChildMode === false && this.condition === CONDITION.range;
        }
      }), _dec8 = property({
        type: Enum(ACTION),
        tooltip: '一旦满足条件就对节点执行操作'
      }), _dec9 = property({
        visible: function visible() {
          // @ts-ignore
          return this.valueAction === ACTION.NODE_OPACITY;
        },
        range: [0, 255],
        type: CCInteger,
        displayName: 'Action Opacity'
      }), _dec10 = property({
        visible: function visible() {
          // @ts-ignore
          return this.valueAction === ACTION.NODE_COLOR;
        },
        displayName: 'Action Color'
      }), _dec11 = property({
        visible: function visible() {
          // @ts-ignore
          return this.valueAction === ACTION.COMPONENT_CUSTOM;
        },
        displayName: 'Component Name'
      }), _dec12 = property({
        visible: function visible() {
          // @ts-ignore
          return this.valueAction === ACTION.COMPONENT_CUSTOM;
        },
        displayName: 'Component Property'
      }), _dec13 = property({
        visible: function visible() {
          // @ts-ignore
          return this.valueAction === ACTION.COMPONENT_CUSTOM;
        },
        displayName: 'Default Value'
      }), _dec14 = property({
        visible: function visible() {
          // @ts-ignore
          return this.valueAction === ACTION.COMPONENT_CUSTOM;
        },
        displayName: 'Action Value'
      }), _dec15 = property({
        type: [Node],
        tooltip: '需要执行条件的节点，如果不填写则默认会执行本节点以及本节点的所有子节点 的状态'
      }), ccclass(_class = _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_VMBase) {
        _inheritsLoose(VMState, _VMBase);

        function VMState() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _VMBase.call.apply(_VMBase, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "watchPath", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "foreachChildMode", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "condition", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "foreachChildType", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueA", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueB", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueAction", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueActionOpacity", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueActionColor", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueComponentName", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueComponentProperty", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueComponentDefaultValue", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "valueComponentActionValue", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "watchNodes", _descriptor14, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = VMState.prototype;

        _proto.onLoad = function onLoad() {
          _VMBase.prototype.onLoad.call(this); // 如果数组里没有监听值，那么默认把所有子节点给监听了


          if (this.watchNodes.length == 0) {
            if (this.valueAction !== ACTION.NODE_ACTIVE && this.foreachChildMode === false) {
              this.watchNodes.push(this.node);
            }

            this.watchNodes = this.watchNodes.concat(this.node.children);
          }
        };

        _proto.start = function start() {
          if (this.enabled) {
            this.onValueInit();
          }
        } // 当值初始化时
        ;

        _proto.onValueInit = function onValueInit() {
          var value = VM.getValue(this.watchPath);
          this.checkNodeFromValue(value);
        } // 当值被改变时
        ;

        _proto.onValueChanged = function onValueChanged(newVar, oldVar, pathArr) {
          this.checkNodeFromValue(newVar);
        } // 检查节点值更新
        ;

        _proto.checkNodeFromValue = function checkNodeFromValue(value) {
          var _this2 = this;

          if (this.foreachChildMode) {
            this.watchNodes.forEach(function (node, index) {
              var v = _this2.foreachChildType === CHILD_MODE_TYPE.NODE_INDEX ? index : node.name;

              var check = _this2.conditionCheck(value, v); // log('遍历模式', value, node.name, check);


              _this2.setNodeState(node, check);
            });
          } else {
            var check = this.conditionCheck(value, this.valueA, this.valueB);
            this.setNodesStates(check);
          }
        } // 更新 多个节点 的 状态
        ;

        _proto.setNodesStates = function setNodesStates(checkState) {
          var _this3 = this;

          var nodes = this.watchNodes;
          var check = checkState;
          nodes.forEach(function (node) {
            _this3.setNodeState(node, check);
          });
        }
        /** 更新单个节点的状态 */
        ;

        _proto.setNodeState = function setNodeState(node, checkState) {
          var n = this.valueAction;
          var check = checkState;

          switch (n) {
            case ACTION.NODE_ACTIVE:
              node.active = check ? true : false;
              break;

            case ACTION.NODE_VISIBLE:
              {
                var opacity = node.getComponent(UIOpacity);
                if (opacity == null) opacity = node.addComponent(UIOpacity);

                if (opacity) {
                  opacity.opacity = check ? 255 : 0;
                }

                break;
              }

            case ACTION.NODE_OPACITY:
              {
                var _opacity = node.getComponent(UIOpacity);

                if (_opacity == null) _opacity = node.addComponent(UIOpacity);

                if (_opacity) {
                  _opacity.opacity = check ? this.valueActionOpacity : 255;
                }

                break;
              }

            case ACTION.NODE_COLOR:
              {
                var uir = node.getComponent(UIRenderer);

                if (uir) {
                  uir.color = check ? this.valueActionColor : color(255, 255, 255);
                }

                break;
              }

            case ACTION.COMPONENT_CUSTOM:
              var comp = node.getComponent(this.valueComponentName);
              if (comp == null) return;

              if (this.valueComponentProperty in comp) {
                comp[this.valueComponentProperty] = check ? this.valueComponentActionValue : this.valueComponentDefaultValue;
              }

              break;

            case ACTION.SPRITE_GRAYSCALE:
              {
                var sprite = node.getComponent(Sprite);

                if (sprite) {
                  sprite.grayscale = check;
                }

                break;
              }

            case ACTION.BUTTON_INTERACTABLE:
              {
                var _sprite = node.getComponent(Button);

                if (_sprite) {
                  _sprite.interactable = check;
                }

                break;
              }
          }
        }
        /** 条件检查 */
        ;

        _proto.conditionCheck = function conditionCheck(v, a, b) {
          var cod = CONDITION;

          switch (this.condition) {
            case cod["=="]:
              if (v == a) return true;
              break;

            case cod["!="]:
              if (v != a) return true;
              break;

            case cod["<"]:
              if (v < a) return true;
              break;

            case cod[">"]:
              if (v > a) return true;
              break;

            case cod[">="]:
              if (v >= a) return true;
              break;

            case cod["<"]:
              if (v < a) return true;
              break;

            case cod["<="]:
              if (v <= a) return true;
              break;

            case cod["range"]:
              if (v >= a && v <= b) return true;
              break;
          }

          return false;
        };

        return VMState;
      }(VMBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "watchPath", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "foreachChildMode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "condition", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return CONDITION["=="];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "foreachChildType", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return CHILD_MODE_TYPE.NODE_INDEX;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "valueA", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "valueB", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "valueAction", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ACTION.NODE_ACTIVE;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "valueActionOpacity", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "valueActionColor", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return color(155, 155, 155);
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "valueComponentName", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "valueComponentProperty", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "valueComponentDefaultValue", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "valueComponentActionValue", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "watchNodes", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WebSock.ts", ['cc', './Logger.ts'], function (exports) {
  var cclegacy, Logger;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Logger = module.Logger;
    }],
    execute: function () {
      cclegacy._RF.push({}, "70df2VbIU9B66Fr+op8FKJp", "WebSock", undefined);
      /**
       * WebSocket 封装
       * 1. 连接/断开相关接口
       * 2. 网络异常回调
       * 3. 数据发送与接收
       */


      var WebSock = exports('WebSock', /*#__PURE__*/function () {
        function WebSock() {
          this._ws = null; // websocket对象

          /** 网络连接成功事件 */

          this.onConnected = null;
          /** 接受到网络数据事件 */

          this.onMessage = null;
          /** 网络错误事件 */

          this.onError = null;
          /** 网络断开事件 */

          this.onClosed = null;
        }

        var _proto = WebSock.prototype;
        /** 请求连接 */

        _proto.connect = function connect(options) {
          var _this = this;

          if (this._ws) {
            if (this._ws.readyState === WebSocket.CONNECTING) {
              Logger.logNet("websocket connecting, wait for a moment...");
              return false;
            }
          }

          var url = null;

          if (options.url) {
            url = options.url;
          } else {
            var ip = options.ip;
            var port = options.port;
            var protocol = options.protocol;
            url = protocol + "://" + ip + ":" + port;
          }

          this._ws = new WebSocket(url);
          this._ws.binaryType = options.binaryType ? options.binaryType : "arraybuffer";

          this._ws.onmessage = function (event) {
            var onMessage = _this.onMessage;
            onMessage(event.data);
          };

          this._ws.onopen = this.onConnected;
          this._ws.onerror = this.onError;
          this._ws.onclose = this.onClosed;
          return true;
        }
        /**
         * 发送数据 
         * @param buffer 网络数据
         */
        ;

        _proto.send = function send(buffer) {
          if (this._ws && this._ws.readyState == WebSocket.OPEN) {
            this._ws.send(buffer);

            return 1;
          }

          return -1;
        }
        /**
         * 网络断开
         * @param code      关闭码
         * @param reason    关闭原因
         */
        ;

        _proto.close = function close(code, reason) {
          if (this._ws) {
            this._ws.close(code, reason);
          }
        };

        return WebSock;
      }());

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
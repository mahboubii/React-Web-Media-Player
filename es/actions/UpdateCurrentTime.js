function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var updateCurrentTime = function updateCurrentTime(state, action) {
  return _extends({}, state, {
    currentTime: action.payload.currentTime
  });
};

export default updateCurrentTime;
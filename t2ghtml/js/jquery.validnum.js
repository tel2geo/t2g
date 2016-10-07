// JQUERY PROTOTYPE FOR VALIDATING THE FRENCH PHONE NUMBER
// COPYRIGHT - 2014 - 2017
// LICENSE : GNU GPL3
// AUTHOR: THIBAUT LOMBARD
$(function() {
  var $, defaultFormat, formatBackPhoneNumber, formatPastePhoneNumber, formatPhoneNumber, hasTextSelected, reFormatPhoneNumber, restrictAlphaNumeric, restrictNumeric, restrictPhoneNumber,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $ = jQuery;

  $.validnum = {};

  $.validnum.fn = {};

  $.fn.validnum = function() {
    var args, method;

    method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return $.validnum.fn[method].apply(this, args);
  };

  restrictNumeric = function(e) {
    var $target, input;

    $target = $(e.target);
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  };

  restrictAlphaNumeric = function(e) {
    var $target, input;

    $target = $(e.target);
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\sA-Za-z]/.test(input);
  };

  hasTextSelected = function($target) {
    var _ref;

    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== $target.prop('selectionEnd')) {
      return true;
    }
    if (typeof document !== "undefined" && document !== null ? (_ref = document.selection) != null ? typeof _ref.createRange === "function" ? _ref.createRange().text : void 0 : void 0 : void 0) {
      return true;
    }
    return false;
  };

  $.validnum.fn.restrictNumeric = function() {
    this.on('keypress', restrictNumeric);
    return this;
  };

  $.validnum.fn.restrictAlphaNumeric = function() {
    this.on('keypress', restrictAlphaNumeric);
    return this;
  };

  $.validnum.fn.hasTextSelected = hasTextSelected;

  $ = jQuery;

  hasTextSelected = $.validnum.fn.hasTextSelected;

  $.validnum.fn.format_number = function() {
    var length;

    length = $(this).data('validnum_length');
    if (length != null) {
      $(this).attr('maxLength', length);
    }
    this.validnum('restrictNumeric');
    return this;
  };

  $.validnum.fn.validate_number = function() {
    var $this, length, val;

    $this = $(this);
    val = $this.val();
    length = $this.data('validnum_length');
    if ((length != null) && (typeof length === 'number') && (val.length !== length)) {
      return false;
    }
    if ((length != null) && typeof length === 'string' && length !== '') {
      if (isNaN(parseInt(length, 10))) {
        return false;
      }
      if (val.length !== parseInt(length, 10)) {
        return false;
      }
    }
    return /^\d+$/.test(val);
  };

  $ = jQuery;

  hasTextSelected = $.validnum.fn.hasTextSelected;

  
  reFormatPhoneNumber = function(phoneNumberString) {
    var areaCode, last8, phoneNumber, text, _ref;

    phoneNumber = phoneNumberString.replace(/\D/g, '').match(/^(\d{0,2})?(\d{0,8})?$/);
    _ref = phoneNumber, phoneNumber = _ref[0], areaCode = _ref[1], last8 = _ref[2];
    text = '';
    if (areaCode != null) {
      text += "(" + areaCode;
    }
    if ((areaCode != null ? areaCode.length : void 0) === 2) {
      text += ")";
    }
   
    if (last8 != null) {
      text += "" + last8;
    }
    return text;
  };
 

  restrictPhoneNumber = function(e) {
    var $target, digit, value;

    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected($target)) {
      return;
    }
    value = $target.val() + digit;
    value = value.replace(/\D/g, '');
    if (value.length > 10) {
      return false;
    }
  };

  formatPhoneNumber = function(e) {
    var $target, digit, text, val;

    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val() + digit;
    text = reFormatPhoneNumber(val);
    e.preventDefault();
    return $target.val(text);
  };

  formatBackPhoneNumber = function(e) {
    var $target, value;

    if (e.meta) {
      return;
    }
    $target = $(e.currentTarget);
    value = $target.val();
    if (e.which !== 8) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (/\(\d$/.test(value)) {
      e.preventDefault();
      return $target.val('');
    } else if (/\d\)(\s)+$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\d\)(\s)*$/, ''));
    } else if (/\d(\s|\-)+$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\d(\s|\-)+$/, ''));
    }
  };

  formatPastePhoneNumber = function(e) {
    var _this = this;

    return setTimeout(function() {
      var $target, text, val;

      $target = $(e.currentTarget);
      val = $target.val();
      text = reFormatPhoneNumber(val);
      return $target.val(text);
    });
  };

  $.validnum.fn.format_phone_number = function() {
    this.validnum('restrictNumeric');
    this.on('keypress', restrictPhoneNumber);
    this.on('keypress', formatPhoneNumber);
    this.on('keydown', formatBackPhoneNumber);
    this.on('paste', formatPastePhoneNumber);
    return this;
  };

  $.validnum.fn.validate_phone_number = function() {
    var val;

    val = $(this).val();
    if (val == null) {
      return false;
    }
    val = val.replace(/\(|\)|\s+|-/g, '');
    if (!/^\d+$/.test(val)) {
      return false;
    }
    return val.replace(/\D/g, '').length === 10;
  };

  $ = jQuery;

  hasTextSelected = $.validnum.fn.hasTextSelected;

  

}).call(this);

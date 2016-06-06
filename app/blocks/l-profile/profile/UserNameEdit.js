goog.provide('tr.lProfile.UserNameEdit');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');

/**
* User name edit component
* @constructor
* @extends {goog.ui.Component}
*/
tr.lProfile.UserNameEdit = function() {
	goog.base(this);

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.nameInfoElements_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.nameInfoText_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.nameInfoEditButton_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.nameEditElements_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.nameEditTextfield_ = null;

	/**
	* Dom element
	* @type {Element}
	* @private
	*/
	this.nameEditConfirmButton_ = null;
	};

goog.inherits(tr.lProfile.UserNameEdit, goog.ui.Component);

goog.scope(function() {
	var UserNameEdit = tr.lProfile.UserNameEdit;

	/**
	* CSS-class enum
	* @enum {string}
	*/
	UserNameEdit.CssClass = {
		ROOT: 'b-user-name',
		NAME_INFO_ELEMENTS: 'b-user-name__info-elements',
		NAME_INFO_TEXT: 'b-user-name__text',
		NAME_INFO_EDIT_BUTTON: 'b-user-name__edit-button',
		NAME_EDIT_ELEMENTS: 'b-user-name__edit-elements',
		NAME_EDIT_TEXTFIELD: 'b-edit-elements__edit-input',
		NAME_EDIT_CONFIRM_BUTTON: 'b-edit-elements__confirm-button',
		HIDDEN: 'g-hidden'
	};

	/** 
	*@override
	*/
	UserNameEdit.prototype.decorateInternal = function(element) {
		goog.base(this, 'decorateInternal', element);

		this.nameInfoElements_ = goog.dom.getElementByClass(
			UserNameEdit.CssClass.NAME_INFO_ELEMENTS,
			element
			);

		this.nameInfoText_ = goog.dom.getElementByClass(
			UserNameEdit.CssClass.NAME_INFO_TEXT,
			element
			);

		this.nameInfoEditButton_ = goog.dom.getElementByClass(
			UserNameEdit.CssClass.NAME_INFO_EDIT_BUTTON,
			element
			);

		this.nameEditElements_ = goog.dom.getElementByClass(
			UserNameEdit.CssClass.NAME_EDIT_ELEMENTS,
			element
			);

		this.nameEditTextfield_ = goog.dom.getElementByClass(
			UserNameEdit.CssClass.NAME_EDIT_TEXTFIELD,
			element
			);

		this.nameEditConfirmButton_ = goog.dom.getElementByClass(
			UserNameEdit.CssClass.NAME_EDIT_CONFIRM_BUTTON,
			element
			);
	};

	/**
	* @override
	*/ 
	UserNameEdit.prototype.enterDocument = function() {
		goog.base(this, 'enterDocument');

		var handler = this.getHandler();

		handler.listen(
			this.nameInfoEditButton_,
			goog.events.EventType.CLICK,
			this.editButtonPressHandler_
			);

		handler.listen(
			this.nameEditConfirmButton_,
			goog.events.EventType.CLICK,
			this.confirmButtonPressHandler_
			);

		handler.listen(
			this.nameEditTextfield_,
			goog.events.EventType.KEYDOWN,
			this.textfieldKeyPressHandler_
			);

	};

	/**
	* @private
	*/ 
	UserNameEdit.prototype.editButtonPressHandler_ = function() {
		this.nameEditTextfield_.value = this.nameInfoText_.innerText.trim();
		this.toggleNameElements_();
	};

	/**
	* @private
	*/ 
	UserNameEdit.prototype.confirmButtonPressHandler_ = function() {
		var val_ = this.nameEditTextfield_.value.trim();

		if (val_) {
			this.nameInfoText_.innerText = val_;
		}

		this.toggleNameElements_(); 
	};

	/**
	* @private
	*/ 
	UserNameEdit.prototype.toggleNameElements_ = function() {
		goog.dom.classlist.toggle(
			this.nameInfoElements_,
			UserNameEdit.CssClass.HIDDEN
			);

		goog.dom.classlist.toggle(
			this.nameEditElements_,
			UserNameEdit.CssClass.HIDDEN
			);
	};

	/**
	* @private
	*/ 
	UserNameEdit.prototype.textfieldKeyPressHandler_ = function(key) {

		if (key.keyCode == 13) {
			this.confirmButtonPressHandler_();
			return;
		}

		if (key.keyCode == 27) {
			this.toggleNameElements_();
			return;
		}
	};

});
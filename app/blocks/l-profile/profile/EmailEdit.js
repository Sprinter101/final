goog.provide('tr.lProfile.EmailEdit');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');

tr.lProfile.EmailEdit = function() {
  goog.base(this);

  this.emailInfoText_ = null;
  this.emailInfoEditButton_ = null;
  this.emailEditElements_ = null;
  this.emailEditTextfield_ = null;
  this.emailEditConfirmButton_ = null;
};

goog.inherits(tr.lProfile.EmailEdit, goog.ui.Component);

goog.scope(function() {
  var EmailEdit = tr.lProfile.EmailEdit;

  EmailEdit.CssClass = {
    ROOT: 'b-contact-email',
    EMAIL_INFO_TEXT: 'b-contact-email__email',
    EMAIL_INFO_EDIT_BUTTON: 'b-contact-email__edit-button',
    EMAIL_EDIT_ELEMENTS: 'b-contact-email__edit-elements',
    EMAIL_EDIT_TEXTFIELD: 'b-contact-email__edit-input',
    EMAIL_EDIT_CONFIRM_BUTTON: 'b-contact-email__confirm-button',
    HIDDEN: 'g-hidden'
  };

  EmailEdit.prototype.decorateInternal = function(element) {
    goog.base(this, 'decorateInternal', element);

    this.emailInfoText_ = goog.dom.getElementByClass(
        EmailEdit.CssClass.EMAIL_INFO_TEXT,
        element
    );

    this.emailInfoEditButton_ = goog.dom.getElementByClass(
        EmailEdit.CssClass.EMAIL_INFO_EDIT_BUTTON,
        element
    );

    this.emailEditElements_ = goog.dom.getElementByClass(
        EmailEdit.CssClass.EMAIL_EDIT_ELEMENTS,
        element
    );

    this.emailEditTextfield_ = goog.dom.getElementByClass(
        EmailEdit.CssClass.EMAIL_EDIT_TEXTFIELD,
        element
    );

    this.emailEditConfirmButton_ = goog.dom.getElementByClass(
        EmailEdit.CssClass.EMAIL_EDIT_CONFIRM_BUTTON,
        element
    );
  };

  EmailEdit.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var handler = this.getHandler();

    handler.listen(
      this.emailInfoEditButton_,
      goog.events.EventType.CLICK,
      this.editButtonPressHandler_
    );

    handler.listen(
      this.emailEditConfirmButton_,
      goog.events.EventType.CLICK,
      this.confirmButtonPressHandler_
    );

    handler.listen(
      this.emailEditTextfield_,
      goog.events.EventType.KEYDOWN,
      this.textfieldKeyPressHandler_
    );

  };

  EmailEdit.prototype.editButtonPressHandler_ = function() {
    this.emailEditTextfield_.value = this.emailInfoText_.innerText.trim();
    this.toggleEmailElements_();
  };

  EmailEdit.prototype.confirmButtonPressHandler_ = function() {
    var val_ = this.emailEditTextfield_.value.trim();

    if (val_) {
      this.emailInfoText_.innerText = val_;
    }

    this.toggleEmailElements_(); 
  };

  EmailEdit.prototype.toggleEmailElements_ = function() {
    goog.dom.classlist.toggle(
      this.emailInfoText_,
      EmailEdit.CssClass.HIDDEN
    );

    goog.dom.classlist.toggle(
      this.emailInfoEditButton_,
      EmailEdit.CssClass.HIDDEN
    );

    goog.dom.classlist.toggle(
      this.emailEditElements_,
      EmailEdit.CssClass.HIDDEN
    );
  };

  EmailEdit.prototype.textfieldKeyPressHandler_ = function(key) {

    if (key.keyCode == 13) {
      this.confirmButtonPressHandler_();
      return;
    }

    if (key.keyCode == 27) {
      this.toggleEmailElements_();
      return;
    }
  };

});
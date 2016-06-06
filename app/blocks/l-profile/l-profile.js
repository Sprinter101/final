goog.provide('tr.lProfile');

goog.require('tr.lProfile.UserNameEdit');
goog.require('tr.lProfile.EmailEdit'); 

/**
 * creates instances of tr.lProfile.UserNameEdit and tr.lProfile.EmailEdit
 */
jQuery(function() {
	var userNameElementsBlock = goog.dom.getElementByClass(
    tr.lProfile.UserNameEdit.CssClass.ROOT
  );

	var userEmailElementsBlock = goog.dom.getElementByClass(
    tr.lProfile.EmailEdit.CssClass.ROOT
  );

  userNameEdit = new tr.lProfile.UserNameEdit();
  userNameEdit.decorate(userNameElementsBlock);

  EmailEdit = new tr.lProfile.EmailEdit();
  EmailEdit.decorate(userEmailElementsBlock);
});
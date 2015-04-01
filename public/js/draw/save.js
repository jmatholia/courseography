function saveClicked() { // create the modal, correct way to do this?
	'use strict';

	var div = document.createElement('div');
    div.setAttribute('id', 'save-modal');

	var jdiv = jQuery('<div>', {
	    id: 'save-modal',
	    rel: 'external'
	})

	if (savedAs === '') {
		// jdiv.attr('text', 'Save graph as: ');
		var input = document.createElement('input'); 
	    input.setAttribute('id', 'save-name');
	    input.setAttribute('class', 'save-name');
	    input.setAttribute('name', 'save-name');
	    input.setAttribute('placeholder', 'filename');
	    input.setAttribute('size', '30');
	    input.setAttribute('autocomplete', 'off');
	    input.setAttribute('type', 'text');
	    var sbutton = document.createElement('div');
	    sbutton.setAttribute('id', 'save-modal-button');
	    sbutton.setAttribute('class', 'button');
	    sbutton.innerHTML = 'Save';

	    jdiv.append(input);
	    jdiv.append(sbutton);

		openModal('Save As', jdiv);
	} else {
		// jdiv.attr('text', 'Saving graph ' + savedAs + ' ...');
		openModal('Save', jdiv);
	}
}
function saveClicked() { // create the modal, correct way to do this?
    'use strict';

    var jdiv = jQuery('<div>', {
        id: 'save-modal',
        rel: 'external'
    });

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
        sbutton.addEventListener('click', saveGraph, false);

        openModal('Save As', jdiv);
    } else {
        // jdiv.attr('text', 'Saving graph ' + savedAs + ' ...');
        openModal('Save', jdiv);
        saveGraph();
    }
}

function saveGraph() {
    'use strict';

    if (savedAs === '') {
        savedAs = document.getElementById('save-name').value;
        if (savedAs.length > 0 && savedAs.indexOf(' ') == -1) { // non empty and no spaces
            document.getElementById('save-modal').innerHTML = 'Saving ' + savedAs + ' ...';
        } else {
            savedAs = '';
        }
    }

    if (savedAs !== '') {
        // remove any incomplete paths or regions


        // convert svg elems to json

        // make request
        $.ajax({
            url: 'save',
            async: false,
            method: 'post',
            data: JSON.stringify({'x': 3, 'y': 6}),
            success: function (data) { 
                        console.log('Ajax request sent!'); 
                        console.log();
                    },
            error: function (xhr, status, error) {
                        console.log('Error with Ajax request!');
                        console.log(status);
                        console.log(error);
                   }
       });
        document.getElementById('save-modal').innerHTML = 'Finished saving ' + savedAs + '!';
       // automatically close modal ?
   }
}
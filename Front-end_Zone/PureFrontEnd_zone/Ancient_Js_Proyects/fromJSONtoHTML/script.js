var formCreator = function(formContainerSelector) {
    formCreator.formContainer = document.querySelector(formContainerSelector);
    return formCreator;
}

formCreator.processJSON = function() {
    let index = 1;
    var request = new XMLHttpRequest();
    var formCreatorContext = this;
    request.open("GET", "./data.json");
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status == 200) {
            var formData = JSON.parse(this.responseText);
            var htmlMarkup = document.createElement('div');
            htmlMarkup.classList.add('form-container');
            var form = document.createElement('form');
            form.setAttribute('autocomplete', 'off')
            form.classList.add('form-itself');
            htmlMarkup.insertAdjacentElement('afterbegin', form);

            formData[0].formConfiguration.sections.forEach(section => {
                var actualSection = document.createElement('div');
                var inputsActualSection = [];
                actualSection.classList.add('form-section');
                actualSection.innerHTML = "<h3 class='section-title'>" + section.title + "</h3>"
                section.ids_asociated.forEach(inputAsociated => {
                    for (var k = 1; k < formData.length; k++) {
                        if (formData[k].attributes.id === inputAsociated) {
                            inputsActualSection.push(formData[k]);
                        }
                    }
                });

                form.insertAdjacentElement('beforeend', formCreatorContext.getSectionMarkup(actualSection, inputsActualSection, '0'));
                index = index + 1;
                console.log(index)
            });
            formCreatorContext.formContainer.insertAdjacentElement('afterbegin', htmlMarkup);
            formCreatorContext.renderStyle();
            formCreatorContext.makeFormAccesible();
        }
    }
    request.send();
}

formCreator.getSectionMarkup = function(sectionElement, formData, index) {
    for (var i = 0; i < formData.length; i++) {
        var elementToInsert = document.createElement('div');
        elementToInsert.classList.add('form-element');
        switch (formData[i].HTMLElementName) {
            case 'input':
                if (formData[i].attributes.type === "checkbox") { //Caso especial en el que sea un checkbox
                    var optionListLength = formData[i].optionsList.length;
                    for (var j = 0; j < optionListLength; j++) {
                        elementToInsert.classList.add('form-element--checkbox');
                        var optionCheckContainer = document.createElement('div');
                        var checkOption = this.createElementWithTagAndAttributes(formData[i].HTMLElementName, formData[i].attributes);
                        checkOption.setAttribute('tabindex', index)
                        var checkBoxId = formData[i].attributes.id + (optionListLength - j);
                        checkOption.id = checkBoxId;
                        var labelOption = document.createElement('label');
                        labelOption.setAttribute('for', checkBoxId)
                        labelOption.innerText = formData[i].optionsList[j];
                        optionCheckContainer.insertAdjacentElement('afterbegin', labelOption);
                        optionCheckContainer.insertAdjacentElement('afterbegin', checkOption);
                        elementToInsert.insertAdjacentElement('afterbegin', optionCheckContainer)
                    }
                    elementToInsert.insertAdjacentHTML('afterbegin', "<h4>" + formData[i].label + "</h4>")
                } else {
                    var input = this.createElementWithTagAndAttributes(formData[i].HTMLElementName, formData[i].attributes);
                    input.setAttribute('tabindex', index);
                    input.oninput = this.moveLabelsAndComprobeIntegrity.bind(this);
                    var label = document.createElement('label');
                    if (input.type === "date") { label.classList.add('label-up') };
                    label.innerText = formData[i].label;
                    label.classList.add('normal-label')
                    label.setAttribute('for', formData[i].attributes['id']);
                    elementToInsert.appendChild(input);
                    elementToInsert.appendChild(label);
                }
                break;
            case 'button':
                var button = this.createElementWithTagAndAttributes(formData[i].HTMLElementName, formData[i].attributes);
                button.innerText = formData[i].textButton;
                button.setAttribute("onclick", formData[i].onclickFunction) //this.fromStringToFunction(formData[i].onclickFunction);
                elementToInsert.appendChild(button);
                break;
            default:
        }
        var messageInfo = document.createElement('span');
        messageInfo.classList.add('message-err-info');
        messageInfo.classList.add('display-none');
        messageInfo.innerText = (formData[i].errorMessage === undefined) ? 'Dato introducido incorrecto' : formData[i].errorMessage;
        elementToInsert.insertAdjacentElement('beforeend', messageInfo);
        sectionElement.insertAdjacentElement('beforeend', elementToInsert);
    }

    return sectionElement;


}

formCreator.moveLabelsAndComprobeIntegrity = function(event) {
    var input = event.target;
    if ((input.type === "date") || (input.type === 'checkbox')) return;
    if (input.value === "") {
        input.nextSibling.classList.remove('label-up')
    } else {
        input.nextSibling.classList.add('label-up')
    }

    this.comprobeDataFormIntegrity(input);
}

formCreator.comprobeDataFormIntegrity = function(input) {
    var messageErrorElement = input.parentElement.querySelector('.message-err-info');

    if (input.validity.patternMismatch) {
        messageErrorElement.classList.remove('display-none');
    } else if (input.validity.tooShort) {
        messageErrorElement.classList.remove('display-none');
    } else {
        messageErrorElement.classList.add('display-none');
    }
};

formCreator.addOnKeyDownFuncionality = function(event) {

}


formCreator.createElementWithTagAndAttributes = function(tagName, objectAttributes) {
    var element = document.createElement(tagName);
    for (attr in objectAttributes) {
        element.setAttribute(attr, objectAttributes[attr]);
    }
    return element;

}

formCreator.renderStyle = function() {
    var styleRules;
}



formCreator.makeFormAccesible = function() {

};

formCreator('body'); //Se configura el elemento donde quiere insertarse el objeto instanciado java






formCreator.processJSON();
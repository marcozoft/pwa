var divButtonAddApplication = document.createElement('div');
divButtonAddApplication.setAttribute('id',"prompt");
divButtonAddApplication.setAttribute('class'," prompt hide bg-light border-top");
divButtonAddApplication.setAttribute('style',"z-index: 999999;position: fixed;width: 100%;");
divButtonAddApplication.innerHTML = `
    <div class="font-weight-bold">Agregar a pantalla de inicio</div>
    <small>Esta aplicacion puede ser instalada en su celular.</small>
    <div class="text-right">
        <button id="buttonCancel" type="button" class="font-weight-bold text-muted btn-sm btn btn-link">No, gracias</button>
        <button id="buttonAdd" type="button" class="font-weight-bold text-primary btn-sm btn btn-link">AGREGAR</button>
    </div>
		 
`;
document.body.firstChild.before(divButtonAddApplication);


// // Declare general function to change status prompt
const promptToggle = (element, toAdd, toRemove) => {
	element.classList.add(toAdd);
	element.classList.remove(toRemove);
};  

// Declare general function to get or set status into storage
const statusPromptButtonInstall = {
	get: () => {
		return localStorage.getItem('statusPromptButtonInstall') || null;
	},
	set: (status) => {
		localStorage.setItem('statusPromptButtonInstall', status);
		return;
	}
}

const prompt = document.querySelector('#prompt');
const buttonAdd = document.querySelector('#buttonAdd');
const buttonCancel = document.querySelector('#buttonCancel');


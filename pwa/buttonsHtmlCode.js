console.log("firstchild",document.body.firstChild);

var divButtonNotification = document.createElement('div');
divButtonNotification.setAttribute('id',"promptNotification");
divButtonNotification.setAttribute('class'," prompt hide bg-light border-top");
divButtonNotification.setAttribute('style',"z-index: 999999;position: fixed;width: 100%;");
divButtonNotification.innerHTML = `

<div class="font-weight-bold">Mostrar notificaciones</div>
<small>Desea recibir notificaciones de esta aplicacion</small>
<div class="text-right">
    <button id="buttonDenied" type="button" class="font-weight-bold text-muted btn-sm btn btn-link">Bloquear</button>
    <button id="buttonAccept" type="button" class="font-weight-bold text-primary btn-sm btn btn-link">Permitir</button>
    
</div>
`;

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
document.body.firstChild.before(divButtonNotification);



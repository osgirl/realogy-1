(function(){

    var confirm = document.getElementById('confirm');
    var confirmMessage = document.getElementById('confirmMessage');
    var confirmOK = document.getElementById('confirmOK');
    var confirmCancel = document.getElementById('confirmCancel');

    var alert = document.getElementById('alert');
    var alertMessage = document.getElementById('alertMessage');
    var alertOK = document.getElementById('alertOK');

    function Popup(){}

    Popup.prototype.requestAlert = function(serviceRequest) {
        return new Promise(function(resolve, reject){
            alertMessage.innerHTML = serviceRequest.requestVO.popupData.message;
            alert.classList.remove('hidden');
            alertOK.addEventListener('click', function handler(event){
                alertOK.removeEventListener('click', handler);
                alert.classList.add('hidden');
                reject(serviceRequest);
            });
        });
    };

    Popup.prototype.requestConfirm = function(serviceRequest) {
        return new Promise(function(resolve, reject){
            confirmMessage.innerHTML = serviceRequest.requestVO.popupData.message;
            confirm.classList.remove('hidden');
            confirmOK.addEventListener('click', ok);
            confirmCancel.addEventListener('click', cancel);

            function ok(event) {
                confirmOK.removeEventListener('click', ok);
                confirmCancel.removeEventListener('click', cancel);
                confirm.classList.add('hidden');
                resolve(serviceRequest);
            }
            function cancel(event) {
                confirmOK.removeEventListener('click', ok);
                confirmCancel.removeEventListener('click', cancel);
                confirm.classList.add('hidden');
                reject(serviceRequest);
            }
        });
    };

    view.components.Popup = Popup;

}());
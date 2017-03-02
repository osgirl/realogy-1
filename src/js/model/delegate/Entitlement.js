(function(){

    function Entitlement() {}

    Entitlement.prototype.signInWithCredentials = function(requestVO) {
        return new Promise(function(resolve, reject){
            var body = '<credentials> \
                            <emailAddress>' + requestVO.getRequestData().username + '</emailAddress> \
                            <password>' + requestVO.getRequestData().password + '</password> \
                        </credentials>';

            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open("POST", "http://localhost:8080/entitlement/SignInWithCredentials", true);
            xmlHttpRequest.onreadystatechange = function() {
                if (xmlHttpRequest.readyState === 4) {
                    if(xmlHttpRequest.status === 200) {
                        requestVO.setResultData(xmlHttpRequest.responseXML);
                        resolve(requestVO);
                    } else {
                        requestVO.setResultData(xmlHttpRequest.responseXML);
                        reject(requestVO);
                    }
                }
            };
            xmlHttpRequest.addEventListener("error", function(error){requestVO.setResultData(error);reject(requestVO);});
            xmlHttpRequest.send(body);
        });
    };

    model.delegate.Entitlement = Entitlement;

})();
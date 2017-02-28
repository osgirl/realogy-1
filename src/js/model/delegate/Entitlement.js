(function(){

    function Entitlement() {}

    Entitlement.prototype.signInWithCredentials = function(requestVO) {
        return new Promise(function(resolve, reject){
            var requestData = requestVO.getRequestData();
            var body = '<credentials> \
                            <emailAddress>' + requestData.getData().username + '</emailAddress> \
                            <password>' + requestData.getData().password + '</password> \
                        </credentials>';

            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open("POST", "http://localhost:8080/entitlement/SignInWithCredentials", true);
            xmlHttpRequest.onreadystatechange = function() {
                if (xmlHttpRequest.readyState === 4) {
                    if(xmlHttpRequest.status === 200) {
                        requestVO.setResultData(new model.vo.ResultData(xmlHttpRequest.responseXML, null));
                        resolve(requestVO);
                    } else {
                        requestVO.setResultData(new model.vo.ResultData(null, xmlHttpRequest.responseXML));
                        reject(requestVO);
                    }
                }
            };
            xmlHttpRequest.addEventListener("error", function(error){
                requestVO.setResultData(new model.vo.ResultData(null, error));
                reject(requestVO);
            });
            xmlHttpRequest.send(body);
        });
    };

    model.delegate.Entitlement = Entitlement;

})();
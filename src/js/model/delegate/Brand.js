(function(){

    function Brand() {
    }

    Brand.prototype.get = function(requestVO) {
        return new Promise(function(resolve, reject){
            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open("GET", "http://localhost:8080/brands", true);
            xmlHttpRequest.onreadystatechange = function() {
                if (xmlHttpRequest.readyState === 4) {
                    try {
                        var data = JSON.parse(xmlHttpRequest.response);
                    } catch (error) {
                        requestVO.setResultData(error);
                        reject(requestVO);
                        return;
                    }
                    if(xmlHttpRequest.status === 200) {
                        requestVO.setResultData(data);
                        resolve(requestVO);
                    } else {
                        requestVO.setResultData(data);
                        reject(requestVO);
                    }
                }
            };
            xmlHttpRequest.addEventListener("error", function(error){
                requestVO.setResultData(error);
                reject(requestVO);
            });
            xmlHttpRequest.send();
        });
    };

    model.delegate.Brand = Brand;

})();
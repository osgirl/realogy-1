(function(){

    function Brand(delegate) {
        this.delegate = delegate;
        document.getElementById("brandAdd").addEventListener("click", this.brand_save.bind(this));
    }

    Brand.prototype.brand_save = function(event) {
        console.log(event);
    };

    Brand.prototype.brandGet_success = function(requestVO) {
        var data = requestVO.getResultData();
        for(var i=0; i<data.length; i++) {
            console.log(data[i]);

            var p = document.createElement("p");
            p.innerHTML = data[i].name;
        }
    };

    Brand.prototype.onhashchange = function(event) {
        var hash = location.hash.slice(2);
        if(hash.indexOf("/brand") == -1) return;
        switch(hash) {
            case "/brands":
                this.delegate.service(new model.vo.RequestVO(null, AppConstants.GET_BRANDS));
                break;
        }
    };

    view.components.Brand = Brand;

})();
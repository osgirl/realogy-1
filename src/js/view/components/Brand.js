(function(){

    function Brand(delegate) {
        this.delegate = delegate;
        document.getElementById("brandAdd").addEventListener("click", this.brand_save.bind(this));
        this.list = document.getElementById("brandList");
        this.deleteList = document.getElementById("brandDeleteList");
    }

    Brand.prototype.brand_save = function(event) {
        var data = document.getElementById("brand").value;
        if(data.trim() != "") {
            this.delegate.service(new model.vo.RequestVO(data, AppConstants.POST_BRANDS));
        }
    };

    Brand.prototype.brandGet_success = function(requestVO) {
        var data = requestVO.getResultData();
        for(var i=0; i<data.length; i++) {
            var ul = document.createElement("ul");
            ul.innerHTML = data[i].name;
            this.list.appendChild(ul);

            ul = document.createElement("ul");
            ul.innerHTML = "Delete";
            this.deleteList.appendChild(ul);
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
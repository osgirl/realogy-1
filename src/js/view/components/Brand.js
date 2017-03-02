(function(){

    function Brand(delegate) {
        this.delegate = delegate;
        document.getElementById("brandAdd").addEventListener("click", this.post.bind(this));
        this.list = document.getElementById("brandList");
        this.deleteList = document.getElementById("brandDeleteList");
    }

    Brand.prototype.post = function(event) {
        var data = document.getElementById("brand").value;
        if(data.trim() != "") {
            this.delegate.service(new model.vo.RequestVO(data, AppConstants.POST_BRANDS));
        }
    };

    Brand.prototype.post_success = function(requestVO) {
        document.getElementById("brand").value = "";
        var data = requestVO.getResultData();
        this.addNode(data);
    };

    Brand.prototype.get_success = function(requestVO) {
        var data = requestVO.getResultData();
        for(var i=0; i<data.length; i++) {
            this.addNode(data[i]);
        }
    };

    Brand.prototype.addNode = function(data) {
        var self = this;
        var li = document.createElement("li");
        li.setAttribute("id", "brand_" + data.id);
        li.innerHTML = data.name;
        this.list.appendChild(li);

        li = document.createElement("li");
        li.setAttribute("id", "brand_delete_" + data.id);
        li.innerHTML = "Delete";
        this.deleteList.appendChild(li);

        li.addEventListener("click", function(id){
            return function(event) {
                Brand.prototype.delete.call(self, id);
            };
        }(data.id));
    };

    Brand.prototype.delete = function(id) {
        this.delegate.service(new model.vo.RequestVO(id, AppConstants.DELETE_BRANDS));
    };

    Brand.prototype.delete_success = function(requestVO) {
        var element = document.getElementById("brand_" + requestVO.getRequestData());
        element.parentNode.removeChild(element);
        element = document.getElementById("brand_delete_" + requestVO.getRequestData());
        element.parentNode.removeChild(element);
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
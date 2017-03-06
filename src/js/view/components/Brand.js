(function(){

    function Brand() {
        var self = this;
        this.element = document.getElementById("brand_list");
        document.getElementById("brandAdd").addEventListener("click", function(event){
            var name = document.getElementById("brand").value;
            if(name.trim() != "") {
                Brand.prototype.post.call(self, {name: name, event: event});
            }
        });
    }

    Brand.prototype.initializeBrand = function () {
        this.get();
    };

    Brand.prototype.get = function() {
        this.delegate.service(new model.vo.RequestVO(null, AppConstants.GET));
    };

    Brand.prototype.post = function(data) {
        this.delegate.service(new model.vo.RequestVO(data, AppConstants.POST));
    };

    Brand.prototype.delete = function(data) {
        this.delegate.requestConfirm(new model.vo.RequestVO(data, AppConstants.DELETE), "Are you sure you want to delete?");
    };

    Brand.prototype.result = function(requestVO) {
        switch (requestVO.getRequestType()) {
            case AppConstants.GET:
                this.element.innerHTML = "";
                var data = requestVO.getResultData();
                for(var i=0; i<data.length; i++) {
                    this.appendChild(data[i]);
                }
                break;
            case AppConstants.POST:
                document.getElementById("brand").value = "";
                var data = requestVO.getResultData();
                this.appendChild(data);
                break;
            case AppConstants.DELETE:
                var data = requestVO.getRequestData();
                this.removeChild(data);
                break;
        }
    };

    Brand.prototype.fault = function(requestVO) {
        console.error(requestVO);
    };

    Brand.prototype.appendChild = function(data) {
        var self = this;
        var li = document.createElement("li");
        li.innerHTML = "<p>" + data.name + "</p>";

        var p = document.createElement("p");
        p.setAttribute("class", "edit");
        p.innerHTML = "Delete";
        li.appendChild(p);

        p.addEventListener("click", function(event){
            Brand.prototype.delete.call(self, {id: data.id, event: event});
        });

        this.element.appendChild(li);
    };

    Brand.prototype.removeChild = function(data) {
        var element = data.event.target;
        var grandparent = element.parentNode.parentNode;
        grandparent.removeChild(element.parentNode);
    };

    Brand.prototype.onhashchange = function(event) {
        var hash = location.hash.slice(2);
        if(hash.indexOf("/brand") == -1) return;
        switch(hash) {
            case "/brands":
                break;
        }
    };

    Brand.prototype.setDelegate = function(delegate) {
        this.delegate = delegate;
    };

    view.components.Brand = Brand;

})();
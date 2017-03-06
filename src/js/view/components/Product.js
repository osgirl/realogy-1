(function(){

    function Product() {
        this.element = document.getElementById("product");
        this.brands = new Array();
        // if($( "#product" ).accordion( "instance" )) {
        //     $('#product').accordion("refresh");
        // }
    }

    Product.prototype.initializeProduct = function() {
        this.get();
    };

    Product.prototype.get = function() {
        this.delegate.service(new model.vo.RequestVO(null, AppConstants.GET));
    };

    Product.prototype.result = function(requestVO) {
        switch (requestVO.getRequestType()) {
            case AppConstants.GET:
                var data = requestVO.getResultData();
                for(var i=0; i<data.length; i++) {
                    //this.appendChild(data[i]);
                }
                break;
        }
    };

    Product.prototype.render = function(requestVO) {
        switch (requestVO.getRequestType()) {
            case AppConstants.GET:
                var data = requestVO.getResultData();
                for(var i=0; i<data.length; i++) {
                    //this.appendBrand(data[i]);
                }
                break;
        }
    };

    Product.prototype.appendBrand = function(data) {
        // var option = document.createElement("option");
        // option.setAttribute("value", data.id);
        // option.setAttribute("id", "brandSelect_" + data.id);
        // option.appendChild(document.createTextNode(data.name));
        // this.brandSelect.appendChild(option);
        // products section
        var h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode(data.name));
        this.element.appendChild(h3);

        var div = document.createElement("div");
        var ul = document.createElement("ul");
        ul.setAttribute("id", "product_brand_" + data.id);
        div.appendChild(ul);

        this.element.appendChild(div);
    };

    Product.prototype.appendChild = function(data) {
        //var h3 = document.createElement("h3");
    };

    Product.prototype.fault = function(requestVO) {
        console.error(requestVO);
    };

    Product.prototype.setDelegate = function(delegate) {
        this.delegate = delegate;
    };

    Product.prototype.get_success = function(requestVO) {
        var self = this;
        this.data = requestVO.getResultData();
        for(var i=0; i<this.data.length; i++) {
            var ul1 = document.getElementById("accordion_brand_" + this.data[i].brandId + "_products");
            var li = document.createElement("li");
            li.setAttribute("id", "accordion_brand_" + this.data[i].brandId + "_product_" + this.data[i].id);
            li.appendChild(document.createTextNode(this.data[i].name));
            ul1.appendChild(li);

            var ul2 = document.getElementById("accordion_brand_" + this.data[i].brandId + "_category");
            li = document.createElement("li");
            li.setAttribute("id", "accordion_brand_" + this.data[i].brandId +"_category_" + this.data[i].id);
            li.appendChild(document.createTextNode(this.data[i].category));
            ul2.appendChild(li);

            var ul3 = document.getElementById("accordion_brand_" + this.data[i].brandId + "_delete");
            li = document.createElement("li");
            li.setAttribute("id", "accordion_brand_" + this.data[i].brandId + "_delete_" + this.data[i].id);
            li.appendChild(document.createTextNode("Delete"));
            li.addEventListener("click", function(id, brandId){
                return function(event) {
                    console.log('delete to', {id: id, brandId: brandId});
                    self.delegate.requestConfirm(new model.vo.RequestVO({id: id, brandId: brandId}, AppConstants.DELETE_PRODUCTS), "Are you sure you want to delete?");
                }
            }(this.data[i].id, this.data[i].brandId));
            ul3.appendChild(li);
        }
        this.activate();
    };

    Product.prototype.delete_success = function(requestVO) {
        var product = requestVO.getRequestData();

        var target = document.getElementById("accordion_brand_" + product.brandId + "_product_" + product.id);
        target.parentNode.removeChild(target);

        target = document.getElementById("accordion_brand_" + product.brandId + "_category_" + product.id);
        target.parentNode.removeChild(target);

        target = document.getElementById("accordion_brand_" + product.brandId + "_delete_" + product.id);
        target.parentNode.removeChild(target);
    };

    Product.prototype.setBrands = function(requestVO) {
        var data = requestVO.getResultData();
        for(var i=0; i<data.length; i++) {
            this.appendBrand(data[i]);
        }
    };

    Product.prototype.deleteBrand = function(id) {
        var element = document.getElementById("brandSelect_" + id);
        element.parentNode.removeChild(element);
    };

    Product.prototype.onhashchange = function(event) {
        var hash = location.hash.slice(2);
        if(hash.indexOf("/products") == -1) return;
        switch(hash) {
            case "/products":
                if(this.data == null) this.delegate.service(new model.vo.RequestVO(null, AppConstants.GET_PRODUCTS));
                break;
        }
    };

    Product.prototype.activate = function() {
        $('#product').accordion({
            heightStyle: "content",
            collapsible:true,
            beforeActivate: function(event, ui) {
                // The accordion believes a panel is being opened
                if (ui.newHeader[0]) {
                    var currHeader  = ui.newHeader;
                    var currContent = currHeader.next('.ui-accordion-content');
                    // The accordion believes a panel is being closed
                } else {
                    var currHeader  = ui.oldHeader;
                    var currContent = currHeader.next('.ui-accordion-content');
                }
                // Since we've changed the default behavior, this detects the actual status
                var isPanelSelected = currHeader.attr('aria-selected') == 'true';

                // Toggle the panel's header
                currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));

                // Toggle the panel's icon
                currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);

                // Toggle the panel's content
                currContent.toggleClass('accordion-content-active',!isPanelSelected)
                if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }

                return false; // Cancels the default action
            }
        });
    };

    view.components.Product = Product;

})();

(function(){

    function Product() {
        var self = this;
        this.element = document.getElementById("product");
        this.brandSelect = document.getElementById("brand_select");
        this.h3 = new Object();
        this.div = new Object();

        document.getElementById("productAdd").addEventListener("click", function(event) {
            var productId = document.getElementById("productId").value;
            var category = document.getElementById("category_select");
            var brand = document.getElementById("brand_select");

            if(productId.trim() != "" && category.selectedIndex != 0 && brand.selectedIndex != 0) {
                Product.prototype.service.call(self, {
                    name: productId,
                    brand: {id: parseInt(brand.options[brand.selectedIndex].value), name: brand.options[brand.selectedIndex].text},
                    category: {id: parseInt(category.options[category.selectedIndex].value), name: category.options[category.selectedIndex].text},
                    event: event
                }, AppConstants.POST);
            }
        });
        // if($( "#product" ).accordion( "instance" )) {
        //     $('#product').accordion("refresh");
        // }
    }

    Product.prototype.service = function(data, type) {
        this.delegate.service(new model.vo.RequestVO(data, type));
    };

    Product.prototype.requestConfirm = function(data) {
        this.delegate.requestConfirm(new model.vo.RequestVO(data, AppConstants.DELETE), "Are you sure you want to delete?");
    };

    Product.prototype.reset = function() {
        document.getElementById("productId").value = "";
        document.getElementById("category_select").selectedIndex = 0;
        document.getElementById("brand_select").selectedIndex = 0;
    };

    Product.prototype.result = function(requestVO) {
        switch (requestVO.getRequestType()) {
            case AppConstants.GET:
                var data = requestVO.getResultData();
                for(var i=0; i<data.length; i++) {
                    this.appendChild(data[i]);
                }
                break;
            case AppConstants.POST:
                var data = requestVO.getResultData();
                this.appendChild(data);
                break;
            case AppConstants.DELETE:
                var data = requestVO.getRequestData();
                this.removeChild(data);
                break;
        }
        this.reset();
    };

    Product.prototype.appendChild = function(data) {
        var self = this;
        var li = document.createElement("li");

        var p = document.createElement("p");
        p.appendChild(document.createTextNode(data.name));
        li.appendChild(p);

        p = document.createElement("p");
        p.appendChild(document.createTextNode(data.category.name));
        li.appendChild(p);

        p = document.createElement("p");
        p.setAttribute("class", "edit");
        p.appendChild(document.createTextNode("Delete"));
        p.addEventListener("click", function(event){
            Product.prototype.requestConfirm.call(self, {id: data.id, event: event});
        });
        li.appendChild(p);

        this.div[data.brand.id].firstChild.appendChild(li);
    };

    Product.prototype.removeChild = function(data) {
        var li = data.event.target.parentNode;
        li.parentNode.removeChild(li);
    };

    Product.prototype.appendBrands = function(requestVO) {
        switch (requestVO.getRequestType()) {
            case AppConstants.GET:
                var data = requestVO.getResultData();
                for(var i=0; i<data.length; i++) {
                    this.appendBrand(data[i]);
                }
                this.activate();
                this.service(null, AppConstants.GET);
                break;
        }
    };

    Product.prototype.appendBrand = function(data) {
        var option = document.createElement("option");
        option.setAttribute("value", data.id);
        option.appendChild(document.createTextNode(data.name));
        this.brandSelect.appendChild(option);

        var h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode(data.name));
        this.element.appendChild(h3);
        this.h3[data.id] = h3;

        var div = document.createElement("div");
        var ul = document.createElement("ul");
        div.appendChild(ul);
        this.div[data.id] = div;

        this.element.appendChild(div);
    };

    Product.prototype.fault = function(requestVO) {
        console.error(requestVO);
    };

    Product.prototype.setDelegate = function(delegate) {
        this.delegate = delegate;
    };

    Product.prototype.onhashchange = function(event) {
        var hash = location.hash.slice(2);
        if(hash.indexOf("/products") == -1) return;
        switch(hash) {
            case "/products":
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

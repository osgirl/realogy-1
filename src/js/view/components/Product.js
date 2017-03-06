(function(){

    function Product(delegate) {
        this.delegate = delegate;
        this.brandSelect = document.getElementById("brandSelect");
        this.element = document.getElementById("accordion");
    }

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

    Product.prototype.appendBrand = function(brand) {
        var option = document.createElement("option");
        option.setAttribute("value", brand.id);
        option.setAttribute("id", "brandSelect_" + brand.id);
        option.appendChild(document.createTextNode(brand.name));
        this.brandSelect.appendChild(option);

        // products section
        var h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode(brand.name));
        this.element.appendChild(h3);

        // div with 3 ul's
        var div = document.createElement("div");
        var ul1 = document.createElement("ul");
        ul1.setAttribute("id", "accordion_brand_" + brand.id + "_products");
        ul1.setAttribute("class", "column");
        div.appendChild(ul1);

        var ul2 = document.createElement("ul");
        ul2.setAttribute("id", "accordion_brand_" + brand.id + "_category");
        ul2.setAttribute("class", "column");
        div.appendChild(ul2);

        var ul3 = document.createElement("ul");
        ul3.setAttribute("id", "accordion_brand_" + brand.id + "_delete");
        ul3.setAttribute("class", "column edit");
        div.appendChild(ul3);

        this.element.appendChild(div);

        if($( "#accordion" ).accordion( "instance" )) {
            $('#accordion').accordion("refresh");
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
        $('#accordion').accordion({
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

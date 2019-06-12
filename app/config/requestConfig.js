var urllocal = "http://10.0.2.2:8000"
var urlpro = "http://ec2-54-167-227-21.compute-1.amazonaws.com:8000"
export var url = urllocal;

export let request = {
    users: {
        get : url + "/api/users/",
        login : url + "/api/users/login",
        productadd: url + "/api/users/productadd",
        cart : {
            products : url + "/api/users/cart/products/",
            incremnet : url + "/api/users/cart/increment/"
        }
    },
    product: {
        all: url + "/product/all",
        related : url + "/product/related/",
        search: url + "/product/search/",
        promotions : {
            all : url + "/product/promotion/all"
        }
    },
    adress : {
        search : url + "/adress/search"
    },
    promotion : {
        all : url + "/promotion/all"
    },
    category: {
        subcategory: url + "/category/categorywithsubcategory"
    },
    cardcredit : {
        register : url + "/cardcredit/create/"
    },
    checkout : {
        calculationfee : url + "/checkout/calculationfee",
    },
    colors: {
        category: url + "/colors/categorywithcolors"
    }
};
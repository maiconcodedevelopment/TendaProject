var urllocal = "http://10.0.2.2:8000"
var urlpro = "http://ec2-54-167-227-21.compute-1.amazonaws.com:8000"
export var url = urllocal;

export let request = {
    users: {
        login : url + "/api/users/login",
        productadd: url + "/api/users/productadd"
    },
    product: {
        all: url + "/product/all",
        related : url + "/product/related/",
        search: url + "/product/search",
        promotions : {
            all : url + "/product/promotion/all"
        }
    },
    promotion : {
        all : url + "/promotion/all"
    },
    category: {
        subcategory: url + "/category/categorywithsubcategory"
    },
    colors: {
        category: url + "/colors/categorywithcolors"
    }
};
var url = "http://10.0.2.2:8000";

export let request = {
    users: {
        productadd: url + "/api/users/productadd"
    },
    product: {
        all: url + "/product/all"
    },
    category: {
        subcategory: url + "/category/categorywithsubcategory"
    },
    colors: {
        category: url + "/colors/categorywithcolors"
    }
};
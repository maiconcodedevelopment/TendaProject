import {
  initialStateProducts
} from "./state";
import {
  requestProducts,
  requestCategoryProducts
} from "./request";
import {
  ProductsModel
} from "../../model/ProductsModel";

export default function actionProducts(state = initialStateProducts, action) {
  console.log(action);

  switch (action.type) {
    case "REQUEST_PRODUCTS":
      requestProducts().then(json => {
        return Object.assign(state.products, json);
      });
      return state;
      break;

    case "REQUEST_SEARCH_PRODUCTS":
      return {
        ...state,
        searchProducts : action.payload
      }
      break;

    case "REQUEST_GET_PRODUCT":
      // let product = state.products.filter(product => product.id === action.payload)
      return {
        ...state
      }
      break;

    case "REQUEST_PROMOTIONS_PRODUCT":
      return {
        ...state,
        promotionsProduct : action.payload
      }
      break;
    
    case "REQUEST_PROMOTIONS_MAIN":

      return{
        ...state,
        promotions : action.payload
      }
      break;
    case "REQUEST_PRODUCTS_CATEGORY":
      const {
        categorys
      } = state;

      let resetcategorys = categorys.map(category => ({
        ...category,
        active: false
      }));

      let category = resetcategorys.filter(
        category => category.id === action.payload.id
      )[0];
      let newcategory = {
        ...category,
        active: true
      };

      const newcategorys = resetcategorys.map(category =>
        category.id === newcategory.id ? newcategory : category
      );

      console.log(newcategorys);

      return {
        ...state,
        categorys: newcategorys,
        products: action.payload.products
      };
      break;
    case "REQUEST_ADD_PRODUCT":
      let {
        products,
        promotionsProduct,
        searchProducts
      } = state;

      var productsArrayState = []
      var productsPromotionArrayState = []
      var searchProductsArrayState = []

      if (searchProducts.length > 0 ){

        let productSearchState = searchProducts.filter(product => product.id === action.payload)

        if(productSearchState.length > 0){

          productSearchState = productSearchState[0]

          let searchAddProducts = {
            ...productSearchState,
            like : !productSearchState.like 
          }
  
          searchProductsArrayState = state.searchProducts.map(product => product.id === searchAddProducts.id ? searchAddProducts : product )
        } 
      
        
      }

      if (products.length > 0 ) {
         let productsState = products.filter(
          product => product.id === action.payload
        );

        if(productsState.length > 0){
          
          productsState = productsState[0]

          let productlike = {
            ...productsState,
            like: !productsState.like
          };
  
          productsArrayState = state.products.map(product =>
            product.id === productlike.id ? productlike : product
          );
        }
     

      }

      if(promotionsProduct.length > 0 ){

        if (promotionsProduct.filter(
          promotion => promotion.product.id === action.payload
        ).length > 0) {

          let productsPromotionState = state.promotionsProduct.filter(
            promotion => promotion.product.id === action.payload
          )[0]
          
          let productPromotionlike = {
            ...productsPromotionState,
            product : {
              ...productsPromotionState.product,
              like : !productsPromotionState.product.like
            }
          }
  
          productsPromotionArrayState = promotionsProduct.map(promotion =>
            promotion.product.id === productPromotionlike.product.id ? productPromotionlike : promotion
          )

        }else{

          productsPromotionArrayState = promotionsProduct
        }


        
      }


      return {
        ...state,
        products: productsArrayState,
        promotionsProduct : productsPromotionArrayState,
        searchProducts : searchProductsArrayState,
      };
      break;

    case "REQUEST_ADD_PRODUTO_SEARCH":

      return {
        ...state
      }
      break;
    case "FILTER_ADD_INCREMENT_PRODUCTS":
      
      return{
        ...state,
        products : [...state.products,...action.payload]
      }
      break;

    case "FILTER_ADD_PRODUCTS":
      return {
        ...state,
        products: action.payload
      };
      break;
    case "FILTER_PRICE":
      return {
        ...state,
        filter: {
          ...state.filter,
          price: {
            ...state.filter.price,
            start: action.payload.start,
            end: action.payload.end
          }
        }
      };
      break;

    case "FILTER_RESET_CATEGORY":

      return{
        ...state,
        categorys : state.categorys.map(category => category.id === action.payload ? { ...category , active : true } : { ...category , active : false } )
      }
      break;

    case "FILTER_ADD_CATEGORY":

      let newlistcategorys = state.categorys.map(category =>
        category.id === action.payload ? {
          ...category,
          active: !category.active
        } :
        category
      );

      let categoryselement = newlistcategorys.filter(
        category => category.id === action.payload && !category.active
      );

      let categorycolor = categoryselement;

      var listColorCategory = state.filter.colors;
      var listTypesCategory = state.filter.types;

      if (state.filter.types.length > 0 && categoryselement.length > 0) {
        categoryselement = categoryselement[0];

        let newlistSubcategory = state.types
          .filter(itemtype => itemtype.idcategory == categoryselement.id)
          .map(type => type.data)[0]
          .filter(type => type.active);

        listTypesCategory = state.filter.types.filter(item => {
          return (
            newlistSubcategory.filter(
              category => category.id === item.id && category.active
            ).length === 0
          );
        });

        for (const key in state.filter.types) {

          for (const keycategory in newlistSubcategory) {
            if (keycategory.id === key.id) {
              
            }
          }
        }

      }

      if (state.filter.colors.length > 0 && categorycolor.length) {
        categorycolor = categorycolor[0];

        const newListColor = state.colors.filter(
          color => color.idcategory === categorycolor.id
        );
        listColorCategory = state.filter.colors.filter(
          item =>
          newListColor.filter(c => c.id === item.id && c.active).length === 0
        );

      }

      return {
        ...state,
        categorys: newlistcategorys,
        filter: {
          ...state.filter,
          colors: listColorCategory,
          types: listTypesCategory
        }
      };
      break;
    case "FILTER_ADD_TYPES":

      if (state.categorys.filter(category => category.active).length === 0) {
        return {
          ...state,
          types: []
        };
      }

      if (state.types.length > 0) {
        let algu = action.payload.map(itemtype => {
          if ( state.types.filter(type => type.idcategory === itemtype.idcategory).length > 0) {

            let stateData = itemtype.data;

            const stateType = state.types
              .filter(type => type.idcategory === itemtype.idcategory)
              .map(item => item.data)[0];

            let statehere = stateType.filter(
              item => stateData.filter(data => data.id === item.id).length > 0
            );

            if (statehere.length === 0) {
              return {
                ...itemtype
              };
            }

            return {
              ...itemtype,
              data: statehere
            };
          } else {
            return {
              ...itemtype
            };
          }
        });

        return {
          ...state,
          types: algu
        };
      }

      return {
        ...state,
        types: action.payload
      };
      break;

    case "FILTER_TYPE_ADD":
      const types = state.types.map(itemtype => {
        return {
          ...itemtype,
          data: itemtype.data.map(item =>
            item.id === action.payload ? {
              ...item,
              active: !item.active
            } :
            item
          )
        };
      });

      const type = types
        .filter(
          itemtype =>
          itemtype.data.filter(item => item.id === action.payload).length > 0
        )
        .map(item => item.data)[0]
        .filter(item => item.id == action.payload)[0];

      if (state.filter.types.length > 0) {
        let filtertypes = state.filter.types.find(
            type => type.id === action.payload
          ) ?
          true :
          false;

        if (filtertypes) {
          filtertypes = state.filter.types.filter(
            type => type.id !== action.payload
          );

          return {
            ...state,
            types,
            filter: {
              ...state.filter,
              types: filtertypes
            }
          };
        }
      }

      return {
        ...state,
        types,
        filter: {
          ...state.filter,
          types: [...state.filter.types, type]
        }
      };
      break;
    case "FILTER_ADD_COLORS":
      if (state.categorys.filter(category => category.active).length === 0) {
        return {
          ...state,
          colors: []
        };
      }

      if (state.filter.colors.length > 0) {
        const GM = action.payload;
      }

      return {
        ...state,
        colors: action.payload
      };
      break;
    case "FILER_COLOR_ADD":
      const colors = state.colors.map(color =>
        color.id == action.payload ? {
          ...color,
          active: !color.active
        } :
        color
      );

      const color = colors.filter(color => color.id == action.payload)[0];

      if (state.filter.colors.length > 0) {
        let filtercolors = state.filter.colors.find(
            color => color.id == action.payload
          ) ?
          true :
          false;

        if (filtercolors) {
          filtercolors = state.filter.colors.filter(
            color => color.id !== action.payload
          );

          return {
            ...state,
            colors,
            filter: {
              ...state.filter,
              colors: filtercolors
            }
          };
        }
      }

      return {
        ...state,
        colors,
        filter: {
          ...state.filter,
          colors: [...state.filter.colors, color]
        }
      };
      break;

    default:
      return state;
  }
}

export const productAll = quantity => ({
  type: "REQUEST_PRODUCTS",
  payload: quantity
});

export const getProductId = id => ({
  type: "REQUEST_GET_PRODUCT",
  payload: id
})

export const searchAddProducts = products => ({
  type : "REQUEST_SEARCH_PRODUCTS",
  payload : products
})

export const categoryProductAll = (categoryId, products) => ({
  type: "REQUEST_PRODUCTS_CATEGORY",
  payload: {
    id: categoryId,
    products
  }
});

export const promotionsAddProduct = promotions => ({
  type : "REQUEST_PROMOTIONS_PRODUCT",
  payload : promotions
})

export const promotionsMain = promotions => ({
  type : "REQUEST_PROMOTIONS_MAIN",
  payload : promotions
})

export const userAddProduct = id => ({
  type: "REQUEST_ADD_PRODUCT",
  payload: id
});

//filter
export const filterAddIncrementProduct = products => ({
  type : "FILTER_ADD_INCREMENT_PRODUCTS",
  payload : products
})

export const filterResetCategory = category => ({
  type : "FILTER_RESET_CATEGORY",
  payload : category
})


export const filterAddProducts = products => ({
  type: "FILTER_ADD_PRODUCTS",
  payload: products
});

export const filterUpdatePrice = price => ({
  type: "FILTER_PRICE",
  payload: price
});

export const filterAddCategory = id => ({
  type: "FILTER_ADD_CATEGORY",
  payload: id
});

//types
export const filterAddTypes = types => ({
  type: "FILTER_ADD_TYPES",
  payload: types
});

export const filterAddType = type => ({
  type: "FILTER_TYPE_ADD",
  payload: type
});

//colors
export const filterAddColors = colors => ({
  type: "FILTER_ADD_COLORS",
  payload: colors
});

export const filterAddColor = color => ({
  type: "FILER_COLOR_ADD",
  payload: color
});
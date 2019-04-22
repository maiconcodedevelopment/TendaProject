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
      console.log(action);
      let {
        products
      } = state;
      let product = products.filter(
        product => product.id === action.payload
      )[0];
      let productlike = {
        ...product,
        like: !product.like
      };
      const newproducts = state.products.map(product =>
        product.id === productlike.id ? productlike : product
      );
      return {
        ...state,
        products: newproducts
      };
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

    case "FILTER_ADD_CATEGORY":
      console.log("agora sim");
      console.log(action.payload);

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

        console.log(newlistSubcategory);

        listTypesCategory = state.filter.types.filter(item => {
          return (
            newlistSubcategory.filter(
              category => category.id === item.id && category.active
            ).length === 0
          );
        });

        for (const key in state.filter.types) {
          console.log("yes category here !!");
          console.log(newlistSubcategory);
          for (const keycategory in newlistSubcategory) {
            if (keycategory.id === key.id) {
              console.log("sim");
            }
          }
        }

        console.log(listTypesCategory);
        console.log("sim asgora sim chegou");
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

        console.log("colors list");
        console.log(newListColor);
        console.log(listColorCategory);
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
      console.log(action.payload);

      if (state.categorys.filter(category => category.active).length === 0) {
        return {
          ...state,
          types: []
        };
      }

      if (state.types.length > 0) {
        let algu = action.payload.map(itemtype => {
          if (
            state.types.filter(type => type.idcategory === itemtype.idcategory)
            .length > 0
          ) {
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

            console.log(stateData);
            console.log(statehere);
            console.log("start here");

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

          console.log(filtercolors);

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
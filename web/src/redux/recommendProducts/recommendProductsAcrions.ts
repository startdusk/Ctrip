import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START"; // 正在调用推荐信息API
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
  "FETCH_RECOMMEND_PRODUCTS_SUCCESS"; // 成功调用推荐信息API
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL"; // 失败调用推荐信息API

interface FetchRecommendProductsStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductsSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
  payload: any;
}

interface FetchRecommendProductsFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
  payload: any;
}

export type RecommendProductAction =
  | FetchRecommendProductsFailAction
  | FetchRecommendProductsStartAction
  | FetchRecommendProductsSuccessAction;

export const fetchRecommendProductsStartActionCreator =
  (): FetchRecommendProductsStartAction => {
    return {
      type: FETCH_RECOMMEND_PRODUCTS_START,
    };
  };

export const fetchRecommendProductsSuccessActionCreator = (
  data: any
): FetchRecommendProductsSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data,
  };
};

export const fetchRecommendProductsFailActionCreator = (
  data: any
): FetchRecommendProductsFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: data,
  };
};

// thunk 可以返回一个函数，而不一定是js对象
// 在一个thunk action中可以完成一些列连续的action操作
// 并且可以处理异步逻辑
// 业务逻辑可以从ui层面挪到这里，代码分层会更清晰
export const giveMeDataActionCreator =
  (): ThunkAction<void, RootState, unknown, RecommendProductAction> =>
  async (dispatch, getState) => {
    dispatch(fetchRecommendProductsStartActionCreator());
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/productCollections"
      );

      dispatch(
        fetchRecommendProductsSuccessActionCreator(
          camelcaseKeys(data, { deep: true })
        )
      );
    } catch (err: any) {
      dispatch(fetchRecommendProductsFailActionCreator(err));
    }
  };

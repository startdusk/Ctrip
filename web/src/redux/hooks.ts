// 避免state与组件深度绑定，提取state绑定到useSelector中，给useSelector加上state类型
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";

import { RootState } from "./store";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

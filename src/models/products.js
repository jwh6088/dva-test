import { createQuery,deleteQuery,updateQuery,searchQuery } from '../services/products'

export default {
  namespace: 'products',
  state: {
    tableList:[]
  },
  effects: {
    // 新增
    *create({ payload: formData }, { put,call }){
      const list = yield call(createQuery, formData);
      yield put({ type: 'reducerGetList', list});
    },
    // 删除
    *remove({ payload: id }, { put,call }){
      const list = yield call(deleteQuery, id);
      yield put({ type: 'reducerGetList', list});
    },
    // 更新
    *update({ payload: record }, { put,call }){
      const list = yield call(updateQuery, record);
      yield put({ type: 'reducerGetList', list});
    },
    // 查询
    *search({ payload: params }, { put,call }){
      const list = yield call(searchQuery, params);
      yield put({ type: 'reducerGetList', list});
    }
  },
  reducers: {
    // 更新列表
    'reducerGetList'(state, data) {
      return { ...state, tableList:data.list};
    },
  },
};
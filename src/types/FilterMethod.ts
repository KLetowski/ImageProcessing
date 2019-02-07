import { types, Instance, flow, applySnapshot } from 'mobx-state-tree';
import axios, { AxiosResponse } from 'axios';

export const Filter = types
  .model('Filter', {
    id: types.number,
    title: types.string,
    imageSource: types.string,
    mask: types.array(types.number),
    type: types.string,
    description: types.string
  })
  .actions(self => ({}));

export type FilterType = Instance<typeof Filter>;

export const FilterMethods = types
  .model('FilterMethod', {
    methods: types.array(Filter)
  })
  .actions(self => ({
    loadData: flow(function* loadData(url: string) {
      const response: AxiosResponse = yield axios.get('/data.json');
      applySnapshot(self.methods, response.data);
    })
  }));

export type FilterMethodType = Instance<typeof FilterMethods>;

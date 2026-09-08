import type * as ListModule from '@/common/modules/list';
import type * as TmdbModule from '@/common/modules/tmdb';

export declare namespace IApi {
  export namespace Single {
    export interface Response {
      id: number;
      name: string;
    }
  }

  export namespace Search {
    export type Response = ListModule.Types.IApi.Response<Single.Response>;
  }
}

export declare namespace IEntity {
  export interface SearchParams {
    query: string;
    page?: number;
  }
}

export declare namespace IQuery {
  export interface List {
    results: TmdbModule.Types.IEntity.Keyword[];
    meta: ListModule.Types.IEntity.Meta;
  }
}

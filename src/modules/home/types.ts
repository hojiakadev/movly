import * as ListModule from '@/common/modules/list';

export declare namespace IApi {
  export namespace List {
    export interface Response {
      data: {
        content: Movie[];
      };
    }
  }

  export namespace Single {
    export interface Response {
      data: IEntity.Movie;
    }
  }

  export interface Movie {}
}

export declare namespace IEntity {
  export interface Movie {
    adult: boolean;
    id: number;
    video: false;
    title: string;
    overview: string;
    voteCount: number;
    genreIds: number[];
    popularity: number;
    posterPath: string;
    voteAverage: number;
    releaseDate: string;
    backdropPath: string;
    originalTitle: string;
    originalLanguage: string;
  }
}

export declare namespace IQuery {
  export interface List {
    dates: { maximum: string; minimum: string };
    results: IEntity.Movie[];
    meta: ListModule.Types.IEntity.Meta;
  }

  export interface Single {
    id: number;
  }
}

import * as ListModule from '@/common/modules/list';

export namespace IApi {
  export namespace Regions {
    export interface Response {
      results: Region[];
    }
  }

  export interface Region {
    iso_3166_1: string;
    native_name: string;
    english_name: string;
  }

  export namespace Genres {
    export interface Response {
      genres: Genre[];
    }
  }

  export interface Genre {
    id: number;
    name: string;
  }

  export namespace Single {
    export interface Response {
      data: IEntity.Movie;
    }
  }
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

  export interface Genre {
    id: number;
    name: string;
  }

  export interface Region {
    id: number;
    iso: string;
    nativeName: string;
    englishName: string;
  }
}

export declare namespace IQuery {
  export interface Regions {
    results: IEntity.Region[];
  }

  export interface Genres {
    genres: IEntity.Genre[];
  }

  export interface Single {
    id: number;
  }

  export interface List {
    dates: { maximum: string; minimum: string };
    results: IEntity.Movie[];
    meta: ListModule.Types.IEntity.Meta;
  }
}

export declare namespace IForm {
  export interface Filter {
    genres?: number[];
    type?: 'all' | 'movie' | 'tv';
    release_year?: 'all' | string;
    page?: number;
  }
}

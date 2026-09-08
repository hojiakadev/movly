import type * as TmdbModule from '@/common/modules/tmdb';

export declare namespace IApi {
  export namespace Single {
    export interface Response extends Collection {
      parts: Part[];
    }
  }

  export interface Collection {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
  }

  export interface Part {
    id: number;
    adult: boolean;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    media_type: string;
  }
}

export declare namespace IEntity {
  export interface Collection {
    id: number;
    name: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
  }

  /** Movie summary embedded in `/collection/{id}` under `parts`. */
  export interface Part {
    id: number;
    adult: boolean;
    title: string;
    originalTitle: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    popularity: number;
    genreIds: number[];
    mediaType: string;
  }

  export interface CollectionDetails extends Collection {
    parts: Part[];
  }
}

export declare namespace IQuery {
  export interface Images {
    posters: TmdbModule.Types.IEntity.Image[];
    backdrops: TmdbModule.Types.IEntity.Image[];
  }
}

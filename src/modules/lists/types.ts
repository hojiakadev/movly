export declare namespace IApi {
  export namespace Single {
    export interface Response {
      id: number;
      name: string;
      description: string;
      favorite_count: number;
      item_count: number;
      iso_639_1: string;
      poster_path: string | null;
      created_by: string;
      items: Item[];
    }
  }

  export namespace ItemStatus {
    export interface Response {
      id: number;
      item_present: boolean;
    }
  }

  export interface Item {
    id: number;
    media_type: string;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
  }
}

export declare namespace IEntity {
  /** Movie/tv summary contained in a list. */
  export interface Item {
    id: number;
    mediaType: string;
    title: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
    releaseDate: string;
    voteAverage: number;
  }

  export interface List {
    id: number;
    name: string;
    description: string;
    favoriteCount: number;
    itemCount: number;
    iso6391: string;
    posterPath: string;
    createdBy: string;
    items: Item[];
  }

  export interface ItemStatus {
    id: number;
    itemPresent: boolean;
  }
}

export declare namespace IQuery {
  export type Single = IEntity.List;
}

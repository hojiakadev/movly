import type * as ListModule from '@/common/modules/list';
import type * as TmdbModule from '@/common/modules/tmdb';

export declare namespace IApi {
  export namespace List {
    export type Response = ListModule.Types.IApi.Response<Person>;
  }

  export namespace Single {
    export interface Response extends Person {
      also_known_as: string[];
      biography: string;
      birthday: string | null;
      deathday: string | null;
      homepage: string | null;
      imdb_id: string | null;
      place_of_birth: string | null;
    }
  }

  export namespace TaggedImages {
    export type Response = ListModule.Types.IApi.Response<unknown>;
  }

  export interface Person {
    adult: boolean;
    gender: number;
    id: number;
    known_for?: unknown[];
    known_for_department: string;
    name: string;
    original_name?: string;
    popularity: number;
    profile_path: string | null;
  }

  /** Raw, snake_cased `/search/person` query. */
  export interface SearchRequest {
    query: string;
    page?: number;
    language?: string;
    include_adult?: boolean;
  }
}

export declare namespace IEntity {
  export interface Person {
    id: number;
    name: string;
    adult: boolean;
    gender: number;
    popularity: number;
    profilePath: string;
    knownForDepartment: string;
    originalName: string;
    knownFor: KnownFor[];
  }

  export interface PersonDetails extends Person {
    alsoKnownAs: string[];
    biography: string;
    birthday: string;
    deathday: string;
    homepage: string;
    imdbId: string;
    placeOfBirth: string;
  }

  /** `known_for` entries embedded in `/person/popular` results. */
  export interface KnownFor {
    id: number;
    mediaType: MediaType;
    title: string;
    posterPath: string;
    backdropPath: string;
    overview: string;
    releaseDate: string;
    voteAverage: number;
  }

  export type MediaType = 'movie' | 'tv';

  export interface CreditBase {
    id: number;
    creditId: string;
    mediaType: MediaType;
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
    adult: boolean;
    /** tv only */
    episodeCount?: number;
  }

  export interface CastCredit extends CreditBase {
    character: string;
    order: number;
  }

  export interface CrewCredit extends CreditBase {
    job: string;
    department: string;
  }

  export interface Credits {
    id: number;
    cast: CastCredit[];
    crew: CrewCredit[];
  }

  export interface TaggedImageMedia {
    id: number;
    title: string;
    posterPath: string;
    backdropPath: string;
    mediaType: MediaType;
  }

  export interface TaggedImage extends TmdbModule.Types.IEntity.Image {
    id: string;
    imageType: string;
    mediaType: string;
    media: TaggedImageMedia;
  }

  export interface SearchParams extends ListModule.Types.IEntity.Params {
    query: string;
    includeAdult?: boolean;
  }
}

export declare namespace IQuery {
  export interface List {
    results: IEntity.Person[];
    meta: ListModule.Types.IEntity.Meta;
  }

  export interface TaggedImages {
    results: IEntity.TaggedImage[];
    meta: ListModule.Types.IEntity.Meta;
  }
}

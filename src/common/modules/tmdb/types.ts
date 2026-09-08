import type * as ListModule from '@/common/modules/list';

/**
 * TMDB building blocks that are shared between several feature modules
 * (movies, tv, people, collections, ...). Feature modules must reuse these
 * instead of re-declaring identical shapes.
 */
export declare namespace IEntity {
  export interface Genre {
    id: number;
    name: string;
  }

  export interface Keyword {
    id: number;
    name: string;
  }

  export interface Company {
    id: number;
    name: string;
    logoPath: string;
    originCountry: string;
  }

  export interface Country {
    iso31661: string;
    name: string;
  }

  export interface Language {
    iso6391: string;
    name: string;
    englishName: string;
  }

  /** Lightweight collection reference embedded in movie details. */
  export interface CollectionRef {
    id: number;
    name: string;
    posterPath: string;
    backdropPath: string;
  }

  export interface Cast {
    id: number;
    adult: boolean;
    gender: number;
    name: string;
    originalName: string;
    character: string;
    creditId: string;
    order: number;
    popularity: number;
    profilePath: string;
    knownForDepartment: string;
  }

  export interface Crew {
    id: number;
    adult: boolean;
    gender: number;
    name: string;
    originalName: string;
    job: string;
    department: string;
    creditId: string;
    popularity: number;
    profilePath: string;
    knownForDepartment: string;
  }

  export interface Credits {
    id: number;
    cast: Cast[];
    crew: Crew[];
  }

  export interface Image {
    filePath: string;
    width: number;
    height: number;
    aspectRatio: number;
    voteAverage: number;
    voteCount: number;
    iso6391: string;
  }

  export interface Images {
    id: number;
    backdrops: Image[];
    posters: Image[];
    logos: Image[];
    profiles: Image[];
    stills: Image[];
  }

  export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    publishedAt: string;
    iso6391: string;
    iso31661: string;
  }

  export interface Review {
    id: string;
    author: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    url: string;
    rating: number | null;
    username: string;
    avatarPath: string;
  }

  export interface ExternalIds {
    imdbId: string;
    wikidataId: string;
    facebookId: string;
    instagramId: string;
    twitterId: string;
    tiktokId: string;
    youtubeId: string;
    freebaseId: string;
    tvdbId: number | null;
    tvrageId: number | null;
  }

  export interface WatchProvider {
    providerId: number;
    providerName: string;
    logoPath: string;
    displayPriority: number;
  }

  export interface WatchProviderRegion {
    link: string;
    flatrate: WatchProvider[];
    buy: WatchProvider[];
    rent: WatchProvider[];
    ads: WatchProvider[];
    free: WatchProvider[];
  }

  export interface WatchProviders {
    id: number;
    results: Record<string, WatchProviderRegion>;
  }

  /** TMDB `/translations` entry — distinct from the app's own i18n translation module. */
  export interface Translation {
    iso31661: string;
    iso6391: string;
    name: string;
    englishName: string;
    data: Record<string, string>;
  }

  export interface Translations {
    id: number;
    translations: Translation[];
  }

  export interface AccountStates {
    id: number;
    favorite: boolean;
    watchlist: boolean;
    rated: number | null;
  }
}

export declare namespace IQuery {
  export interface Reviews {
    results: IEntity.Review[];
    meta: ListModule.Types.IEntity.Meta;
  }

  export interface Keywords {
    results: IEntity.Keyword[];
  }

  export interface Genres {
    results: IEntity.Genre[];
  }
}

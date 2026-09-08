import type * as ListModule from '@/common/modules/list';
import type * as TmdbModule from '@/common/modules/tmdb';

export declare namespace IApi {
  export namespace List {
    export type Response = ListModule.Types.IApi.Response<Show>;
  }

  export namespace Single {
    export interface Response extends Show {
      created_by: unknown[];
      episode_run_time: number[];
      genres: { id: number; name: string }[];
      homepage: string;
      in_production: boolean;
      languages: string[];
      last_air_date: string;
      last_episode_to_air: unknown;
      next_episode_to_air: unknown;
      networks: unknown[];
      number_of_episodes: number;
      number_of_seasons: number;
      production_companies: unknown[];
      production_countries: unknown[];
      seasons: unknown[];
      spoken_languages: unknown[];
      status: string;
      tagline: string;
      type: string;
    }
  }

  export interface Show {
    adult: boolean;
    backdrop_path: string | null;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
  }

  /** Raw, snake_cased `/discover/tv` query — produced by `Mappers.DiscoverRequest`. */
  export interface DiscoverRequest {
    page?: number;
    language?: string;
    sort_by?: string;
    include_adult?: boolean;
    include_null_first_air_dates?: boolean;
    first_air_date_year?: number;
    'first_air_date.gte'?: string;
    'first_air_date.lte'?: string;
    'air_date.gte'?: string;
    'air_date.lte'?: string;
    'vote_average.gte'?: number;
    'vote_average.lte'?: number;
    'vote_count.gte'?: number;
    'vote_count.lte'?: number;
    'with_runtime.gte'?: number;
    'with_runtime.lte'?: number;
    with_genres?: string;
    without_genres?: string;
    with_companies?: string;
    without_companies?: string;
    with_keywords?: string;
    without_keywords?: string;
    with_networks?: string;
    with_original_language?: string;
    with_origin_country?: string;
    with_status?: string;
    with_type?: string;
    with_watch_providers?: string;
    with_watch_monetization_types?: string;
    watch_region?: string;
    screened_theatrically?: boolean;
    timezone?: string;
  }
}

export declare namespace IEntity {
  export interface Show {
    id: number;
    adult: boolean;
    name: string;
    originalName: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
    firstAirDate: string;
    genreIds: number[];
    originalLanguage: string;
    originCountry: string[];
    popularity: number;
    voteAverage: number;
    voteCount: number;
  }

  /** `created_by` entry — a trimmed down `Cast`-like credit. */
  export interface Creator {
    id: number;
    creditId: string;
    name: string;
    profilePath: string;
    gender: number;
  }

  export interface ShowDetails extends Show {
    createdBy: Creator[];
    episodeRunTime: number[];
    genres: TmdbModule.Types.IEntity.Genre[];
    homepage: string;
    inProduction: boolean;
    languages: string[];
    lastAirDate: string;
    lastEpisodeToAir: Episode | null;
    nextEpisodeToAir: Episode | null;
    networks: TmdbModule.Types.IEntity.Company[];
    numberOfEpisodes: number;
    numberOfSeasons: number;
    productionCompanies: TmdbModule.Types.IEntity.Company[];
    productionCountries: TmdbModule.Types.IEntity.Country[];
    spokenLanguages: TmdbModule.Types.IEntity.Language[];
    status: string;
    tagline: string;
    type: string;
    seasons: Season[];
  }

  export interface Season {
    id: number;
    airDate: string;
    episodeCount: number;
    name: string;
    overview: string;
    posterPath: string;
    seasonNumber: number;
    voteAverage: number;
  }

  export interface SeasonDetails extends Season {
    episodes: Episode[];
  }

  export interface Episode {
    id: number;
    name: string;
    overview: string;
    airDate: string;
    episodeNumber: number;
    seasonNumber: number;
    runtime: number;
    stillPath: string;
    voteAverage: number;
    voteCount: number;
    productionCode: string;
    episodeType: string;
    showId: number;
  }

  export interface EpisodeDetails extends Episode {
    crew: TmdbModule.Types.IEntity.Crew[];
    guestStars: TmdbModule.Types.IEntity.Cast[];
  }

  export interface ContentRating {
    iso31661: string;
    rating: string;
    descriptors: string[];
  }

  /**
   * Full camelCased `/discover/tv` parameter set. The UI only exposes the
   * subset described by `IForm.Filter`; everything else stays available for
   * programmatic use (e.g. "shows by network", "shows by keyword").
   */
  export interface DiscoverParams extends ListModule.Types.IEntity.Params {
    sortBy?: string;
    includeAdult?: boolean;
    includeNullFirstAirDates?: boolean;
    firstAirDateYear?: number;
    firstAirDateGte?: string;
    firstAirDateLte?: string;
    airDateGte?: string;
    airDateLte?: string;
    voteAverageGte?: number;
    voteAverageLte?: number;
    voteCountGte?: number;
    voteCountLte?: number;
    runtimeGte?: number;
    runtimeLte?: number;
    withGenres?: number[];
    withoutGenres?: number[];
    withCompanies?: number[];
    withoutCompanies?: number[];
    withKeywords?: number[];
    withoutKeywords?: number[];
    withNetworks?: number[];
    withOriginalLanguage?: string;
    withOriginCountry?: string;
    withStatus?: number[];
    withType?: number[];
    withWatchProviders?: number[];
    withWatchMonetizationTypes?: string[];
    watchRegion?: string;
    screenedTheatrically?: boolean;
    timezone?: string;
  }

  export interface SearchParams extends ListModule.Types.IEntity.Params {
    query: string;
    includeAdult?: boolean;
    firstAirDateYear?: number;
    year?: number;
  }
}

export declare namespace IQuery {
  export interface List {
    results: IEntity.Show[];
    meta: ListModule.Types.IEntity.Meta;
  }
}

export declare namespace IForm {
  /** Filters exposed in the TV page UI / route search params. */
  export interface Filter {
    page: number;
    genres: number[];
    year?: number;
    sortBy: string;
    voteAverageGte?: number;
    voteCountGte?: number;
    originalLanguage?: string;
    includeAdult: boolean;
    query?: string;
  }
}

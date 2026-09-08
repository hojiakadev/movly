import type * as ListModule from '@/common/modules/list';
import type * as TmdbModule from '@/common/modules/tmdb';

export declare namespace IApi {
  export namespace List {
    export interface Response extends ListModule.Types.IApi.Response<Movie> {
      dates?: { maximum: string; minimum: string };
    }
  }

  export namespace Single {
    export interface Response extends Movie {
      belongs_to_collection: unknown;
      budget: number;
      genres: { id: number; name: string }[];
      homepage: string;
      imdb_id: string;
      origin_country: string[];
      production_companies: unknown[];
      production_countries: unknown[];
      revenue: number;
      runtime: number;
      spoken_languages: unknown[];
      status: string;
      tagline: string;
    }
  }

  export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  /** Raw, snake_cased `/discover/movie` query — produced by `Mappers.DiscoverRequest`. */
  export interface DiscoverRequest {
    page?: number;
    language?: string;
    region?: string;
    sort_by?: string;
    include_adult?: boolean;
    include_video?: boolean;
    certification?: string;
    certification_country?: string;
    'certification.gte'?: string;
    'certification.lte'?: string;
    primary_release_year?: number;
    'primary_release_date.gte'?: string;
    'primary_release_date.lte'?: string;
    year?: number;
    'release_date.gte'?: string;
    'release_date.lte'?: string;
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
    with_cast?: string;
    with_crew?: string;
    with_people?: string;
    with_original_language?: string;
    with_origin_country?: string;
    with_release_type?: string;
    with_watch_providers?: string;
    with_watch_monetization_types?: string;
    watch_region?: string;
  }
}

export declare namespace IEntity {
  export interface Movie {
    id: number;
    adult: boolean;
    video: boolean;
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

  export interface MovieDetails extends Movie {
    budget: number;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    homepage: string;
    imdbId: string;
    genres: TmdbModule.Types.IEntity.Genre[];
    originCountry: string[];
    spokenLanguages: TmdbModule.Types.IEntity.Language[];
    productionCompanies: TmdbModule.Types.IEntity.Company[];
    productionCountries: TmdbModule.Types.IEntity.Country[];
    belongsToCollection: TmdbModule.Types.IEntity.CollectionRef | null;
  }

  export interface ReleaseDate {
    certification: string;
    iso6391: string;
    note: string;
    releaseDate: string;
    type: number;
  }

  export interface ReleaseDatesByCountry {
    iso31661: string;
    releaseDates: ReleaseDate[];
  }

  /**
   * Full camelCased `/discover/movie` parameter set. The UI only exposes the
   * subset described by `IForm.Filter`; everything else stays available for
   * programmatic use (e.g. "movies by keyword", "movies by company").
   */
  export interface DiscoverParams extends ListModule.Types.IEntity.Params {
    sortBy?: string;
    includeAdult?: boolean;
    includeVideo?: boolean;
    certification?: string;
    certificationCountry?: string;
    certificationGte?: string;
    certificationLte?: string;
    primaryReleaseYear?: number;
    primaryReleaseDateGte?: string;
    primaryReleaseDateLte?: string;
    year?: number;
    releaseDateGte?: string;
    releaseDateLte?: string;
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
    withCast?: number[];
    withCrew?: number[];
    withPeople?: number[];
    withOriginalLanguage?: string;
    withOriginCountry?: string;
    withReleaseType?: number[];
    withWatchProviders?: number[];
    withWatchMonetizationTypes?: string[];
    watchRegion?: string;
  }

  export interface SearchParams extends ListModule.Types.IEntity.Params {
    query: string;
    includeAdult?: boolean;
    primaryReleaseYear?: number;
    year?: number;
  }
}

export declare namespace IQuery {
  export interface List {
    dates: { maximum: string; minimum: string };
    results: IEntity.Movie[];
    meta: ListModule.Types.IEntity.Meta;
  }
}

export declare namespace IForm {
  /** Filters exposed in the Movies page UI / route search params. */
  export interface Filter {
    page: number;
    genres: number[];
    year?: number;
    sortBy: string;
    voteAverageGte?: number;
    voteCountGte?: number;
    runtimeLte?: number;
    originalLanguage?: string;
    includeAdult: boolean;
    query?: string;
  }
}

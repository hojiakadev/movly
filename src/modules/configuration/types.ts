import type * as TmdbModule from '@/common/modules/tmdb';

export declare namespace IApi {
  export namespace Configuration {
    export interface Response {
      images: {
        base_url: string;
        secure_base_url: string;
        backdrop_sizes: string[];
        logo_sizes: string[];
        poster_sizes: string[];
        profile_sizes: string[];
        still_sizes: string[];
      };
      change_keys: string[];
    }
  }

  export interface Job {
    department: string;
    jobs: string[];
  }

  export interface Timezone {
    iso_3166_1: string;
    zones: string[];
  }

  export interface WatchProviderRegionOption {
    iso_3166_1: string;
    english_name: string;
    native_name: string;
  }

  export interface WatchProvidersRequest {
    language?: string;
    watch_region?: string;
  }
}

export declare namespace IEntity {
  export interface ImagesConfiguration {
    baseUrl: string;
    secureBaseUrl: string;
    backdropSizes: string[];
    logoSizes: string[];
    posterSizes: string[];
    profileSizes: string[];
    stillSizes: string[];
  }

  export interface Configuration {
    images: ImagesConfiguration;
    changeKeys: string[];
  }

  export interface Job {
    department: string;
    jobs: string[];
  }

  export interface Timezone {
    iso31661: string;
    zones: string[];
  }

  export interface WatchProviderRegionOption {
    iso31661: string;
    englishName: string;
    nativeName: string;
  }

  export interface WatchProvidersParams {
    watchRegion?: string;
    language?: string;
  }
}

export declare namespace IQuery {
  export interface Countries {
    results: TmdbModule.Types.IEntity.Country[];
  }

  export interface Languages {
    results: TmdbModule.Types.IEntity.Language[];
  }

  export interface Jobs {
    results: IEntity.Job[];
  }

  export interface PrimaryTranslations {
    results: string[];
  }

  export interface Timezones {
    results: IEntity.Timezone[];
  }

  export interface WatchProviders {
    results: TmdbModule.Types.IEntity.WatchProvider[];
  }

  export interface ProviderRegions {
    results: IEntity.WatchProviderRegionOption[];
  }
}

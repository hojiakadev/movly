import type * as TmdbModule from '@/common/modules/tmdb';

export declare namespace IApi {
  export namespace Single {
    export interface Response {
      id: number;
      name: string;
      logo_path: string | null;
      origin_country: string;
      description: string;
      headquarters: string;
      homepage: string;
      parent_company: unknown;
    }
  }

  export namespace AlternativeNames {
    export interface Response {
      id: number;
      results: AlternativeName[];
    }
  }

  export interface AlternativeName {
    name: string;
    type: string;
  }
}

export declare namespace IEntity {
  export interface CompanyDetails extends TmdbModule.Types.IEntity.Company {
    description: string;
    headquarters: string;
    homepage: string;
    parentCompany: TmdbModule.Types.IEntity.Company | null;
  }

  export interface AlternativeName {
    name: string;
    type: string;
  }
}

export declare namespace IQuery {
  export interface AlternativeNames {
    results: IEntity.AlternativeName[];
  }
}

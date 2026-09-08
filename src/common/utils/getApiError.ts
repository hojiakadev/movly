import { get } from 'radash';

interface IError {
  code: string;
  message: string;
  validations: string[];
}

const getApiError = (error: any): IError => {
  const data: any = get(error, 'response.data') || {};

  // TMDB replies with `{ success, status_code, status_message }` on failure,
  // while the project's own services reply with `{ code, errorMessage: [] }`.
  const code: string = get(data, 'code') || String(get(data, 'status_code') ?? '');
  const message: string =
    get(data, 'errorMessage.0') ||
    get(data, 'status_message') ||
    get(error, 'message') ||
    'Something went wrong. Please try again.';

  return {
    code,
    message,
    validations: (get(data, 'errorMessage') || []) as string[]
  };
};

export default getApiError;

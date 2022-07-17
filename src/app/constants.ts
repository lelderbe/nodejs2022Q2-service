export enum Errors {
  INVALID_UUID = 'Invalid id format',
  WRONG_PASSWORD = 'Wrong old password',
  USER_NOT_FOUND = 'User not found',
  ARTIST_NOT_FOUND = 'Artist not found',
  ALBUM_NOT_FOUND = 'Album not found',
  TRACK_NOT_FOUND = 'Track not found',
  LOGIN_ALREADY_EXISTS = 'Login already exists',
  INCORRECT_CREDENTIALS = 'Incorrect login or password',
  NOT_AUTHORIZED = 'Access token is missing or invalid',
}

export const UUID_VERSION = 4;

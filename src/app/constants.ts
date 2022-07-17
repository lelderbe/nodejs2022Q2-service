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
  TRACK_NOT_EXISTS = "Track with such id doesn't exist",
  ARTIST_NOT_EXISTS = "Artist with such id doesn't exist",
  ALBUM_NOT_EXISTS = "Album with such id doesn't exist",
}

export const UUID_VERSION = 4;

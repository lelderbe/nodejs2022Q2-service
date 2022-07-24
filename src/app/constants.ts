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
  ARTIST_NOT_EXISTS = "Artist with such id doesn't exist",
  ALBUM_NOT_EXISTS = "Album with such id doesn't exist",
  TRACK_NOT_EXISTS = "Track with such id doesn't exist",
  ARTIST_ADDED_TO_FAVORITES = 'Artist added to favorites',
  ALBUM_ADDED_TO_FAVORITES = 'Album added to favorites',
  TRACK_ADDED_TO_FAVORITES = 'Track added to favorites',
}

export const UUID_VERSION = 4;

export const FAVORITE_TECH_ID = 'e335ad78-2372-4500-af32-b363ba5ae713';

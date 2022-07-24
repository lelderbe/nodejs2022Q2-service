import { BadRequestException } from '@nestjs/common';
import { Errors } from '../app/constants';
import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

const uuidValidateV4 = (uuid: string) => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

export const validateUUIDv4 = (uuid: string) => {
  if (!uuidValidateV4(uuid)) {
    throw new BadRequestException(Errors.INVALID_UUID);
  }
};

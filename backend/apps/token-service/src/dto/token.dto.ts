export default interface CreateTokenDto {
  token: string;
  userId: string;
  expiredAt?: Date;
}

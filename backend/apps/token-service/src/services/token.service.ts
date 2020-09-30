import TokenModel from "../models/token.model";
import tokenConnection from "../database/token.connection";
import IToken from "../interfaces/token.interface";
import CreateTokenDto from "../dto/token.dto";
import dotenv from "dotenv";

dotenv.config();
tokenConnection();

export const createToken = async (
  createTokenData: CreateTokenDto
): Promise<IToken> => {
  const token = new TokenModel(createTokenData);
  return await token.save();
};

export const findToken = async (token: string): Promise<IToken | null> => {
  return await TokenModel.findOne({ token }).exec();
};

export const updateToken = async (
  newTokenData: any,
  tokenId: string
): Promise<IToken | null> => {
  return await TokenModel.findByIdAndUpdate(tokenId, newTokenData, {
    new: true,
  }).exec();
};

export const deleteToken = async (token: string): Promise<boolean> => {
  await TokenModel.findOneAndDelete({ token }).exec();
  return true;
};

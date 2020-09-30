import { model } from "mongoose";
import TokenSchema from "../schemas/token.schema";
import IToken from "../interfaces/token.interface";

const TokenModel = model<IToken>("Token", TokenSchema);

export default TokenModel;

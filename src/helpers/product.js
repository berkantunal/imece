import _ from 'lodash';
import { jsonDecode } from '.';

export const getMinPrice = async tierPrice => {
  const decodedTierPrice = jsonDecode(tierPrice);
  const price = await _.minBy(decodedTierPrice, priceOpt => priceOpt.price);

  return price.price;
};

export const getMaxRequiredUserCount = async tierPrice => {
  const decodedTierPrice = jsonDecode(tierPrice);
  const price = await _.maxBy(decodedTierPrice, priceOpt => priceOpt.requiredUserCount);

  return price.requiredUserCount;
};

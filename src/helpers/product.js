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

export const getCurrentPrice = (tierPrice, subscriberCount = 0) => {
  if (!tierPrice) {
    return false;
  }

  const decodedTierPrice = jsonDecode(tierPrice);
  let lastPriceOpt = { requiredUserCount: 0 };
  let currentPriceOpt = _.find(decodedTierPrice, priceOpt => {
    if (
      lastPriceOpt.requiredUserCount >= subscriberCount &&
      subscriberCount < priceOpt.requiredUserCount
    ) {
      return true;
    }

    lastPriceOpt = priceOpt;
    return false;
  });

  if (!currentPriceOpt) {
    currentPriceOpt = lastPriceOpt;
  }

  return currentPriceOpt && currentPriceOpt.price ? currentPriceOpt.price : 0;
};

export const getPrice = (price, payRate) => (price / 100) * payRate;

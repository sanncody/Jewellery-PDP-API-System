// Calculation Logic

/*
Base Price =
    (metal_price_per_gram * product_weight)
  + making_charges
  + (diamond_price_per_carat * diamond_carat)

Tax Amount =
    base_price * tax_percentage / 100

Final Price =
    base_price + tax_amount - exchange_discount

*/

const calculatePrice = ({
    metalPricePerGram,
    baseWeight,
    makingCharges,
    diamondPricePerCarat,
    diamondCarat,
    taxPercentage,
    exchangeDiscount
}) => {

    // Metal price
    const metalCost = metalPricePerGram * baseWeight;

    // Diamond price
    const diamondCost = diamondPricePerCarat * diamondCarat;

    // Base price
    const basePrice = Number(metalCost + makingCharges + diamondCost);

    // Tax
    const taxAmount = (basePrice * taxPercentage) / 100;

    // Final price
    const finalPrice = basePrice + taxAmount - exchangeDiscount;

    return {
        metalCost,
        diamondCost,
        makingCharges,
        basePrice,
        taxAmount,
        exchangeDiscount,
        finalPrice: Number(finalPrice.toFixed(2))
    };
};

module.exports = calculatePrice;

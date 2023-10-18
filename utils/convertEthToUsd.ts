import axios from "axios";

const fetchEthToUsdExchangeRate = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "ethereum",
          vs_currencies: "usd",
        },
      }
    );

    // Extract the ETH to USD exchange rate from the response
    const ethToUsdRate = response.data.ethereum.usd;

    return ethToUsdRate;
  } catch (error) {
    console.error("Error fetching ETH to USD exchange rate:", error);
    return null;
  }
};

// Example usage
export const convertEthToUsd = async (ethAmount: number) => {
  const ethToUsdRate = await fetchEthToUsdExchangeRate();

  if (ethToUsdRate !== null) {
    const usdAmount = ethAmount * ethToUsdRate;
    return usdAmount.toFixed(2); // Return the result rounded to 2 decimal places
  } else {
    return null;
  }
};

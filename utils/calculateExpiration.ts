import { ExpirationOptions } from "@/components/OfferModal";

export const calculateExpirationDate = (selectedExpiration: string) => {
  const currentTimestamp = Date.now();
  const durationInMilliseconds = ExpirationOptions[selectedExpiration] * 1000;
  const expirationTimestamp = currentTimestamp + durationInMilliseconds;

  const expirationDate = new Date(expirationTimestamp);
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = expirationDate.toLocaleDateString(
    undefined,
    dateOptions
  );
  const formattedTime = expirationDate.toLocaleTimeString(
    undefined,
    timeOptions
  );

  return { formattedDate, formattedTime };
};

export function formatText(text: string): string {
  // Convert the input to a number and remove any existing commas
  const number = parseFloat(text.replace(/,/g, ""));

  // Check if the parsed number is valid
  if (isNaN(number)) {
    return text; // Return original text if it's not a valid number
  }

  // Split the number into integer and decimal parts
  const [integerPart, decimalPart] = number.toString().split(".");

  // Add commas to the integer part
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Combine the formatted integer part with the decimal part (if it exists)
  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
}

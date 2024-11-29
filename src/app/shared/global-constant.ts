export class GlobalConstant {
  // Messages
  public static genericError: string =
    'Something went wrong. Please try again later.';

    public static unauthorized: string = "You are not authorized to access this page please signup"

  // Regex Patterns
  public static nameRegex: string = '^[a-zA-Z0-9 ]+$'; // Allows alphanumeric characters and spaces.

  public static emailRegex: string =
    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'; // Standard email validation.

  public static contactNumberRegex: string = '^[0-9]{10}$'; // Matches exactly 10 digits.

  // Variables
  public static error: string = 'error';
}

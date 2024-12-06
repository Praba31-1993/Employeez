// Validate UserId - Check if it's empty
export function validateUserId(userId :any) {
    if (!userId) {
      return "User ID is required.";
    }
    return "";
  }
  
  // Validate Password - At least one uppercase, one special character, and minimum 8 characters
  export function validatePassword(password:any) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!password) {
      return "Password is required.";
    } 
    return "";
  }
  
  // Validate Email - Basic email pattern check
  export function validateEmail(email :any) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required.";
    } else if (!emailPattern.test(email)) {
      return "Invalid email format.";
    }
    return "";
  }
  
  // Validate Mobile Number - Check if it's a 10-digit number
  export function validateMobileNumber(mobileNumber :any) {
    const mobilePattern = /^\d{10}$/;
    if (!mobileNumber) {
      return "Mobile number is required.";
    } else if (!mobilePattern.test(mobileNumber)) {
      return "Mobile number must be a 10-digit number.";
    }
    return "";
  }
  
  // Validate OTP - Check if it's a 6-digit number
  export function validateOTP(otp:any) {
    const otpPattern = /^\d{6}$/;
    if (!otp) {
      return "OTP is required.";
    } else if (!otpPattern.test(otp)) {
      return "OTP must be a 6-digit number.";
    }
    return "";
  }

  // Validate Fields
  export function validateField(value: any): string {
    if (!value) {
      return "Field is required.";
    }
    return "";
  }
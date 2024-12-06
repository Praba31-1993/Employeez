export const Messages = {
    // Success Messages
    success: {
      submitted: "Successfully Submitted.",
      saved: "Changes have been saved successfully.",
      deleted: "Item has been deleted successfully.",
      updated: "Information has been updated successfully.",
      loaded: "Data loaded successfully.",
      approved:"Approved Successfuly",
      rejected:"Approved Rejected",
      restored:"Successfully Restored all item !"
    },
  
    // Validation Error Messages
    validationErrors: {
      userId: {
        required: "User ID is required."
      },
      password: {
        required: "Password is required.",
        invalidFormat: "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long."
      },
      email: {
        required: "Email is required.",
        invalidFormat: "Invalid email format."
      },
      mobileNumber: {
        required: "Mobile number is required.",
        invalidFormat: "Mobile number must be a 10-digit number."
      },
      otp: {
        required: "OTP is required.",
        invalidFormat: "OTP must be a 6-digit number."
      },
      general: "Please fill out all required fields correctly."
    },
  
    // Error Messages
    error: {
      server: "An error occurred on the server. Please try again later.",
      network: "Network error. Please check your internet connection.",
      unauthorized: "You are not authorized to perform this action.",
      notFound: "The requested resource could not be found.",
      timeout: "The request timed out. Please try again.",
      unknown: "An unknown error occurred. Please contact support."
    },
  
    // Warning Messages
    warning: {
      unsavedChanges: "You have unsaved changes. Are you sure you want to leave?",
      deleteConfirmation: "Are you sure you want to delete this item? This action cannot be undone.",
      sessionExpiry: "Your session is about to expire. Please save your work.",
      limitExceeded: "You have exceeded the allowed limit. Please review your input."
    },
  
    // Informational Messages
    info: {
      loading: "Loading data, please wait...",
      noData: "No data available to display.",
      maintenance: "The system is undergoing maintenance. Some features may be unavailable.",
      updateAvailable: "A new update is available. Please refresh the page.",
      welcome: "Welcome! Let’s get started.",
      passwordHint: "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long."
    }
  };
  
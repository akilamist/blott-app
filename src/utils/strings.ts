
const Strings = {
    greeting: (firstName: string) => `Hey ${firstName}`, // Example with dynamic string
    news: {
      source: "Source",
      date: "Date",
      headline: "Headline",
    },
    permissions: {
      notificationTitle: "Notification Permission",
      notificationMessage: "This app needs access to your notifications to keep you informed about updates.",
      notificationButtonNeutral: "Ask Me Later",
      notificationButtonNegative: "Cancel",
      notificationButtonPositive: "OK",
    },
    errors: {
      failedToLoadNews: "Failed to load news",
      validationError: "Please enter both your first and last names.",
      saveError: "Failed to save your name. Please try again.",
    },
    buttons: {
      continue: "Continue",
      requestPermission: "Request Permission",
    },
    permissionsScreen: {
        title: "Get the most out of Blott ✅",
        subTitle: "Allow notifications to stay in the loop with your payments, requests,and groups.",
        buttonTitle: "Continue"
    },
    legalNameScreen: {
        title: "Your legal name",
        subTitle: "We need to know a bit about you so that we can create your account.",
        buttonTitle: "Continue"
    },
  };
  
  export default Strings;
  
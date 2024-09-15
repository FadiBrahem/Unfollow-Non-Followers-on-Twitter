Unfollow Non-Followers on Twitter (X) Script

This script automates the process of unfollowing users on Twitter (now known as X) who do not follow you back. It supports multiple languages and allows customization to suit your preferences.
Features

    Unfollow Non-Followers: Automatically unfollows users who are not following you back.
    Language Support: Works with multiple languages (English, Spanish, Portuguese, Indonesian, Turkish).
    Customization Options:
        Unfollow followers if desired.
        Set delays between unfollow actions.
        Limit the number of unfollow actions per cycle or in total.
        Skip specific users from being unfollowed.

Table of Contents

    Prerequisites
    Usage Instructions
    Configuration Options
        Language Settings
        Unfollow Followers
        Timing Settings
        Unfollow Limits
        Skip Specific Users
    Important Notes
    Disclaimer

Prerequisites

    A web browser (Google Chrome, Firefox, etc.).
    Basic familiarity with opening the browser's JavaScript console.

Usage Instructions

    Access Your Following List:
        Go to Twitter (X) and navigate to your profile.
        Click on the "Following" tab to view the list of users you are following.
        URL format: https://twitter.com/your_username/following or https://x.com/your_username/following.

    Open the JavaScript Console:
        Press F12 or Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (macOS) to open the developer tools.
        Navigate to the Console tab.

    Paste the Script:
        Copy the entire script provided below.
        Paste it into the console and press Enter.

    Wait for Completion:
        The script will start unfollowing users based on your configuration.
        Monitor the console for progress updates.
        Do not close the browser or navigate away until the script finishes.

Configuration Options

You can customize the script by modifying the variables at the beginning of the code.
Language Settings

    Purpose: Ensures the script works with the language settings of your Twitter (X) interface.
    Variable: LANGUAGE
    Supported Languages:
        English ("EN")
        Spanish ("ES")
        Portuguese ("PT")
        Indonesian ("ID")
        Turkish ("TR")
    Example:

    javascript

    const LANGUAGE = "EN"; // Change to your preferred language code

Unfollow Followers

    Purpose: Option to unfollow users who are following you back.
    Variable: UNFOLLOW_FOLLOWERS
    Options:
        false: Only unfollow users who are not following you back.
        true: Unfollow everyone you are following (except skipped users).
    Example:

    javascript

    const UNFOLLOW_FOLLOWERS = false;

Timing Settings

    Purpose: Adjust the delay between unfollow actions.
    Variable: MS_PER_CYCLE
    Unit: Milliseconds
    Example:

    javascript

    const MS_PER_CYCLE = 10; // 10 milliseconds per cycle

Unfollow Limits

    Maximum Unfollow Actions Per Cycle:
        Variable: MAXIMUM_UNFOLLOW_ACTIONS_PER_CYCLE
        Purpose: Limit the number of unfollows in each cycle.
        Options: A positive integer or null for no limit.
        Example:

        javascript

    const MAXIMUM_UNFOLLOW_ACTIONS_PER_CYCLE = null;

Maximum Unfollow Actions Total:

    Variable: MAXIMUM_UNFOLLOW_ACTIONS_TOTAL
    Purpose: Limit the total number of unfollows.
    Options: A positive integer or null for no limit.
    Example:

    javascript

        const MAXIMUM_UNFOLLOW_ACTIONS_TOTAL = null;

Skip Specific Users

    Purpose: Prevent certain users from being unfollowed.
    Variable: SKIP_USERS
    Instructions:
        Add usernames (case-sensitive) to the array.
        Usernames should be strings enclosed in quotes.
    Example:

    javascript

    const SKIP_USERS = [
      "username1",
      "username2",
      "username3"
    ].map(user => user.toLowerCase());

Important Notes

    Browser Performance: Setting very low values for MS_PER_CYCLE may cause performance issues. Adjust accordingly.
    Twitter Rate Limits: Be cautious of Twitter's rate limits to avoid temporary bans.
    Use at Your Own Risk: Automating actions on Twitter may violate their terms of service.

Disclaimer

This script is provided for educational purposes. Use it responsibly and at your own risk. The author is not responsible for any consequences arising from its use.
Contributions

Feel free to contribute by:

    Adding support for more languages.
    Improving the efficiency of the script.
    Reporting issues or suggesting enhancements.

Note: Always ensure you comply with Twitter's (X's) terms of service when using automated scripts.
# Audioquorum-Frontend
React project for Audioquorum Website.

# Folder structure
```
src
 |- api: To manage all api requests
 |- assets: As the name suggests, all the static assets should reside here
 |- components: Shared components used across features are placed here
 |- config: All the app’s configurations are to be kept at this path eg. date format, default language, some master data set
 |- store: It holds all the redux resources at one place
   |- reducer: Reduces all the actions and applies corresponding changes to store
   |- action: Each action file includes feature based action-creators
 |- pages: Consists of different pages in your app
 |- styles: This module holds our application-level styles
 |- utils: All the utility/helper methods, validations, etc. that can be shared across our entire project are added here
```

_Apart from this you can create any folders if you want._

# Important Notes
- Commits and pull requests should be made with proper descriptive messages.
- Do NOT commit or push any sensitive info such as passwords or emails in the code. Such data should go in the .env file, and a sample empty entry for the same should be added for the same in .env.example
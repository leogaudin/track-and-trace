# 🌐 **Track-and-Trace − Development and Maintenance Guide**

The TnT codebase is divided into two major folders, [**Web**](https://github.com/leogaudin/track-and-trace/blob/main/web/) and [**Application**](https://github.com/leogaudin/track-and-trace/blob/main/application/), respectively handling the web dashboard and API, and the mobile scanning application.

This paper provides an overview of the main and essential parts of this codebase.

If you have any doubts important for the maintenance and development cycle of TnT, please contact [leo@gaudin.it](mailto:leo@gaudin.it).

# [**Web**](https://github.com/leogaudin/track-and-trace/blob/main/web/)

## [**Client**](https://github.com/leogaudin/track-and-trace/blob/main/web/client/)

The client folder stores the files for the front-end.

All further mentions of files are made using [`web/client/src`](https://github.com/leogaudin/track-and-trace/blob/main/web/client/src/) as the working directory, and the associated subpart if applicable.

The entry-point of the client is [`App.jsx`](https://github.com/leogaudin/track-and-trace/blob/main/web/client/src/App.jsx). It initialises the router for the Single Page Application with all its main pages.

### [**`components`**](https://github.com/leogaudin/track-and-trace/blob/main/web/client/src/components/)

The components folder stores all the files that are not a view or a page, and that are meant to be included in larger parts of the code.

It is organized in several sub-folders:

- [**`controls`**](https://github.com/leogaudin/track-and-trace/blob/main/web/client/src/components/controls/) : components that are meant to interact with others and manipulate external data.
- [**`customisation`**](https://github.com/leogaudin/track-and-trace/blob/main/web/client/src/components/customisation/) : components serving only an aesthetic purpose.
- [**`insights`**](https://github.com/leogaudin/track-and-trace/blob/main/web/client/src/components/insights/) : components delivering a visualization of internal data of some kind.
- [**`reusable`**](https://github.com/leogaudin/track-and-trace/blob/main/web/client/src/components/reusable/) : complex component bases that are likely to be reused several times across the codebase.

> All other components directly at the root of the folder are considered "main" components that do not fit in any of those categories. The amount of files at the root should be limited as much as possible.

### [**`constants`**](https://github.com/leogaudin/track-and-trace/blob/main/web/client/src/constants/)

The constants folder stores elements such as side navigation items, and the translation file in the language sub-folder.

### [**`pages`**](https://github.com/leogaudin/track-and-trace/blob/main/web/client/src/pages/)

The pages folder stores all React components that consist of a final page being able to be rendered as it is in the browser. It includes every part of the website that the end-user views themself as a page.

### [**`service`**](https://github.com/leogaudin/track-and-trace/blob/main/web/client/src/service/)

The service folder stores all the logic that can be coded into pure JavaScript and does not depend on the React ecosystem. It includes methods such as CSV parsing, geographic formulas, processing of statistics, etc.

### [**`context`**](https://github.com/leogaudin/track-and-trace/blob/main/web/client/src/context/)

The context folder stores the Context provider of the app. **Context is the set of variables that need to be accessible by any React component of any nature throughout the app** (e.g. the set of boxes pulled from the database).

## [**Server**](https://github.com/leogaudin/track-and-trace/blob/main/web/server/)

The server folder stores the files for the back-end/API.

It follows the **Model/Router/Controller** file structure.

### [**Models**](https://github.com/leogaudin/track-and-trace/blob/main/web/server/models/)

**Models specify the structure of the database objects**. For example, the Boxes model defines a box as containing a string property called `id`, an array property called `scans`, number properties called `schoolLongitude` and `schoolLatitude`, etc.

These models allow the Controllers to interact with an object of a particular type in the appropriate way, and ensure coherence later in the database.

### [**Routers**](https://github.com/leogaudin/track-and-trace/blob/main/web/server/routes/)

**Routers** only **associate a Controller function to an API endpoint**. For example, the Boxes router opens an endpoint for POST requests at /box, and executes the createBox function on this call.

### [**Controllers**](https://github.com/leogaudin/track-and-trace/blob/main/web/server/controllers/)

**Controllers specify all the logic that is going to be executed upon API calls** , taking into account everything mentioned in the previous two parts. Staying on our previous example of createBox, it it located in the boxes.ctrl.js file and calls the generic createOne function, with the Box model as a parameter.

#### [**`base`**](https://github.com/leogaudin/track-and-trace/blob/main/web/server/controllers/base/)

The base sub-folder includes all the generic functions that apply to various similar use cases across the API: the CRUD-type (_Create, Read, Update, Delete_) operations, API key checks, etc.

### [**`index.js`**](https://github.com/leogaudin/track-and-trace/blob/main/web/server/index.js)

index.js is the entry-point of the server, it is in charge of **starting the database**, and **defining/opening the various API endpoints**.

# [**Application**](https://github.com/leogaudin/track-and-trace/blob/main/application/)

The application folder stores the files for the scanner mobile application.

All further mentions of files are made using application/src as the working directory, and the associated subpart if applicable.

The entry-point of the application is App.tsx. It is the main view of the app.

## [**components**](https://github.com/leogaudin/track-and-trace/blob/main/application/src/components/)

The components folder stores all the components of the app and is divided in several sub-folders to order them by size, following the Atomic Design Pattern:

- [**`atoms`**](https://github.com/leogaudin/track-and-trace/blob/main/application/src/components/atoms/) : basic components serving only one use (e.g. a button, an icon).
- [**`molecules`**](https://github.com/leogaudin/track-and-trace/blob/main/application/src/components/molecules/) : groups of components that delivers functionality (e.g. a modal template, a popup).
- [**`organisms`**](https://github.com/leogaudin/track-and-trace/blob/main/application/src/components/organisms/) : groups of components delivering a unique functionality (e.g. the "Send scan" modal).
- [**`views`**](https://github.com/leogaudin/track-and-trace/blob/main/application/src/components/views/) : complex components that can be used on their own as a page displayed to the end-user.

## [**constants**](https://github.com/leogaudin/track-and-trace/blob/main/application/src/constants/)

The constants folder stores elements such as local storage keys (i.e. what value are we looking for when retrieving data stored previously in the internal storage).

## [**context**](https://github.com/leogaudin/track-and-trace/blob/main/application/src/context/)

The context folder stores the Context provider of the app. **Context is the set of variables that need to be accessible by any React component of any nature throughout the app** (e.g. the user permissions, the offline scans).

## **Other important files and commands**

All of the following files will be designated by their relative path from the application folder.

### **`run-android` and `run-iphone`**

The two scripts used for running the app on a local device. Please note that you may need to do some configuration following the [React Native documentation](https://reactnative.dev/).

### **`npx pod-install`**

This command needs to be executed anytime a new npm package is added, to include its native iOS code in the iOS application.

### **Bundling the app for testing/publishing**

#### **iOS**

1. Open [`ios/application.xcworkspace`](https://github.com/leogaudin/track-and-trace/blob/main/application/ios/application.xcworkspace) in Xcode.
2. In the top bar menu, navigate to **Product → Archive**.
3. At the end of the build, a window with the generated archives should be displayed. If not, navigate to **Window → Organizer → Archives**. Select the latest archive generated and click on **Distribute App**.
4. You might need to complete additional steps on App Store Connect depending on the case.

#### **Android**

1. Open the terminal and navigate to [`android/`](https://github.com/leogaudin/track-and-trace/blob/main/application/android/).

1. Run the command `./gradlew clean`.
2. Run the command `./gradlew bundleRelease`.
3. At the end of the build, the `.aab` file should be located in `android/app/build/outputs/bundle/release/app-release.aab`.
4. Upload this `.aab` file to your Google Play Console.

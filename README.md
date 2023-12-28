# Trio

>**Login / Sign-Up Form**
**Keyboard Handling**\
**Navigation Implementation**\
**Mock Authentication**\


# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install node dependencies

```bash
yarn
```

## Step 2: Install Pods

```bash
cd ios && pod install
```

## Step 3: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

## Step 4: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

```bash
yarn ios
```



## Folder structure
    .
    ├── ...
    ├── src
    │    ├── assets                  # static assets
    │    ├── components              # Independent tsx components
    │    ├── context                 # Application context API
    │    ├── navigation              # Navigation logic
    │    ├── network                 # Network configuration
    │    ├── scenes                  # App Screens
    │    ├── services                # API/Mock apis
    │    ├── theme                   # Colors & styles
    │    ├── utils                   # code utilites
    │    └── ...
    ├── App.tsx                      # Root component 
    ├── package.json                 # metadata & dependency tracker
    └── ...
    
    
## Approach
**Authentication**\
1. Once user opens app user sees Login screen.\
2. If user is already registered user will able to login using email and password, else user will navigate to signup screen and register.\
3. Input fields are validated before passing on.
4. Login/signup method is called from Auth Context\
5. Simulated login & signup api calls using **axios-mock-adapter** with a fake delay of 3 seconds\
```js
var mock = new MockAdapter(axiosHttp, { delayResponse: 3000 });

mock.onPost("/signup").reply((config: any) => {
    ...
});

mock.onPost("/login").reply((config: any) => {
    ...
});
```

6. Any errors thrown are gracefully shown prompted to user for couple of seconds.\
7. Account details are stored in non-persistant variable locally\
```js
let users: Array<IUser> = [
    {
        id: moment().unix(),
        name: 'Alex',
        email: 'alex@yopmail.com',
        password: 'secret@123'
    }
]
```

8. After successful authentication a dummy token is generated and token & profile is set in Auth Context, Which will be available through out the app.
```js
 const [token, setToken] = useState<string | null>(null);
 const [profile, setProfile] = useState<IProfile | null>(null);
```

9. Once the token is available user is navigated to main screen.
```js
{ !token ? 
	<Stack.Screen name="auth" component={AuthNavigator} /> :
	<Stack.Screen name="mainscreen" component={HomeNavigator} /> 
}
```
    
## External libraries
*[@react-navigation](https://github.com/react-navigation/react-navigation) # Naviagtion library\
*[axios](https://www.npmjs.com/package//axios) #Networking\
*[axios-retry](https://www.npmjs.com/package/axios-retry) #Retry helper library for axios\
*[lodash](https://www.npmjs.com/package/lodash) #utilty functions\
*[moment](https://www.npmjs.com/package/lodash) #Datetime helper\
*[react-native-svg](https://www.npmjs.com/package/lodash) #Display svg images\
*[axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter) #Mock rest api calls\

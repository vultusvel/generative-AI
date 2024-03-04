This is Chat GPT bot that generates images from OPEN AI dell. 

The user can save pictures in collections that he created himself and also save pictures locally. All information created by the user is sent and stored on Mongo DB.

Warning: Pictures that are generated from open ai only live for two hours, but you can upload these pictures locally to yourself.

How to run the app: 

First you need to create a key at OpenAI API key https://platform.openai.com/account/api-keys

Next, you need to create two .env files 
 - The first one should be in /server folder - OPEN_AI_KEY = "Your OPEN AI KEY" 
    Also you can create PORT="Your port"

 - The second one should be in /client/pet-project folder -  VITE_REACT_APP_FIREBASE_API_KEY = " Your OPEN AI KEY"



Install dependencies:

```bash
npm install
```
Run the server:
```bash
npm start
```

Run web:
```bash
npm run dev
```


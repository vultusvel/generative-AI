This is Chat GPT bot that generates images from OPEN AI dell. 

The user can save pictures in collections that he created himself and also save pictures locally. All information created by the user is sent and stored on Mongo DB.

Warning: Pictures that are generated from open ai only live for two hours, but you can download these pictures locally to your computer.

How to run the app: 

First you need to create a key at OpenAI API key https://platform.openai.com/account/api-keys

Next, you need to create two .env files 
 - The first one should be in /server folder

 In file should be:
   OPEN_AI_KEY = "Your OPEN AI KEY" 
   PORT="Your port"

 - The second one should be in /client/pet-project folder
  In file should be:
   VITE_REACT_APP_OPENAI_API_KEY = " Your OPEN AI KEY"
   VITE_REACT_APP_PORT: "Your port"


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


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
<img width="1503" alt="Screenshot 2024-03-04 at 04 14 42" src="https://github.com/vultusvel/generative-AI/assets/133922631/570a5567-0c22-43f0-a1c0-9036ca1ecfb9">
<img width="1220" alt="Screenshot 2024-03-04 at 20 22 15" src="https://github.com/vultusvel/generative-AI/assets/133922631/b5105f43-1001-45b0-b32e-18e331596efd">
<img width="1492" alt="Screenshot 2024-03-04 at 20 09 32" src="https://github.com/vultusvel/generative-AI/assets/133922631/cc83e288-ae5d-4224-a87a-653c699820df">
<img width="966" alt="Screenshot 2024-03-04 at 20 18 13" src="https://github.com/vultusvel/generative-AI/assets/133922631/d8fd69a0-a98f-410d-904a-0601fd70b4ec">




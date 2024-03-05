This is Chat GPT bot that generates images from OpenAi AI DALL-E. 

The user can save pictures in collections that he created himself and also save pictures locally. All information created by the user is sent and stored on MongoDB.

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
<img width="822" alt="Screenshot 2024-03-05 at 01 50 15" src="https://github.com/vultusvel/generative-AI/assets/133922631/ff2eb587-42c6-4250-bf55-27dda9d79c29">
<img width="1503" alt="Screenshot 2024-03-04 at 04 14 42" src="https://github.com/vultusvel/generative-AI/assets/133922631/570a5567-0c22-43f0-a1c0-9036ca1ecfb9">
<img width="1220" alt="Screenshot 2024-03-04 at 20 22 15" src="https://github.com/vultusvel/generative-AI/assets/133922631/b5105f43-1001-45b0-b32e-18e331596efd">
<img width="966" alt="Screenshot 2024-03-04 at 20 18 13" src="https://github.com/vultusvel/generative-AI/assets/133922631/d8fd69a0-a98f-410d-904a-0601fd70b4ec">
<img width="768" alt="Screenshot 2024-03-05 at 01 55 56" src="https://github.com/vultusvel/generative-AI/assets/133922631/c6dcde8e-752f-4074-96f1-1f9d9b1975d3">
<img width="1197" alt="Screenshot 2024-03-05 at 01 57 08" src="https://github.com/vultusvel/generative-AI/assets/133922631/f8d834d9-df3f-40ef-8f97-dc42bd625c94">
<img width="854" alt="Screenshot 2024-03-05 at 01 51 44" src="https://github.com/vultusvel/generative-AI/assets/133922631/5e4f9ea8-f186-484b-b46f-a6ef8b4ee365">








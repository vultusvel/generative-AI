import { useState } from 'react'
import axios from 'axios';

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "../App.css"
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator
} from "@chatscope/chat-ui-kit-react";
import ImageGenerate from './ImageGenerate';
import { Button, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import ClipLoader from 'react-spinners/ClipLoader';



const mess = `If you are agree please click to the button above.`
const mes2 = `So in the T-shirt you want: `

const systemMessage = {
    role: "system",
    content: `Your goal is to ask searching questions in order to understand what kind of print the user wants on their t-shirt.
  These questions are obligatory and should be asked first:
- What color do you want the T-shirt to be?
- What kind of print do you want on your T-shirt ? 

// In the end please draw a conclusion in order to understand what print should be drawn based on the data. 
// Your conclusion should always begin with this ${mes2}
// Try to make your final sentence short and clear
// If everything okay provide this message: ${mess}

The sentence should be constructed based on the information received from user:
first the color of the T-shirt the user wants, then information about the print 
For example:

bot: - What color do you want the T-shirt to be?
user: - i think red
bot: - What kind of print do you want on your T-shirt ?
user: - cactus
bot: So in the T-shirt you want: red T-shirt with cactus print. If you are agree please click to the button above.
`
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function ChatBot() {
    const [messages, setMessages] = useState<any>([
        {
            message: "Hello! I'm here to assist you. Could you please provide some details about what print would you like to see in the T-Shirt?",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [showRenderedComponent, setShowRenderedComponent] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSend = async (message: any) => {
        const newMessage = {
            message,
            direction: "outgoing",
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages: any) {
        let apiMessages = chatMessages.map((messageObject: any) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message };
        });
        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [systemMessage, ...apiMessages]
        };
        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        })
            .then(data => {
                return data.json();
            })
            .then(data => {
                setMessages([
                    ...chatMessages,
                    {
                        message: data.choices[0].message.content,
                        sender: "ChatGPT"
                    }
                ]);
                setIsTyping(false);
            });
    }


    const sendDataToServer = async () => {
        const toSend = messages[messages.length - 1];

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3003/api/data', { toSend });

            const responseData = response.data;
            const imageUrl = responseData.imageUrl;
            console.log('Data sent successfully!');
            setShowRenderedComponent(true);
            setImageUrl(imageUrl);
            setTimeout(() => {
                setLoading(false);
            }, 2000);

        } catch (error) {
            console.error('Error sending data:', error);
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                height: "700px",
                width: "700px",
                zIndex: 102,
                margin: "5% auto",
            }}
        >
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        scrollBehavior="smooth"
                        typingIndicator={
                            isTyping ? (
                                <TypingIndicator content="ChatGPT is typing" />
                            ) : null
                        }
                    >
                        {messages.map((message: any, i: any) => {
                            return <Message key={i} model={message} />;
                        })}

                    </MessageList>
                    <MessageInput
                        placeholder="Type message here"
                        onSend={handleSend}
                    />
                </ChatContainer>
            </MainContainer>
            <Button variant="outlined" onClick={() => { sendDataToServer(); handleClickOpen() }} sx={{ width: "100%" }}> {loading ? <ClipLoader loading color="#2196f3" size={24} /> : 'Click here'}</Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogContent dividers>
                    {showRenderedComponent && <ImageGenerate url={imageUrl} />}
                </DialogContent>
            </BootstrapDialog>
        </div>
    )
}

export default ChatBot

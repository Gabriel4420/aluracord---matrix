import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import { useState } from 'react'
import appConfig from '../config.json'
import Header from '../src/components/templates/Header'
import Head from 'next/head'
const MessageList = (props) => {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '20px',
      }}
    >
      {props.messages.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: ' flex-start',
                width: '100%',
              }}
            >
              <Image
                styleSheet={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  marginRight: '8px',
                }}
                src={`https://github.com/${localStorage.getItem(
                  'username',
                )}.png`}
              />
              <Box
                as="div"
                styleSheet={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  styleSheet={{
                    marginBottom: '5px',
                    width: '100%',
                    fontSize: '20px',
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="strong"
                >
                  {message.from}
                </Text>
                <Text
                  styleSheet={{
                    fontSize: '12px',
                    marginLeft: '-64px',
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </Box>
            </Box>
            <Box
              styleSheet={{
                fontSize: '14px',
                marginLeft: '58px',
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {message.text}
            </Box>
          </Text>
        )
      })}
    </Box>
  )
}

const Chat = () => {
  const [message, setMessage] = useState('')
  const [listMessages, setListMessages] = useState([])

  const handleNewMessage = (newMessage) => {
    const message = {
      id: listMessages.length + 1,
      from: `@${localStorage.getItem('username')}`,
      text: newMessage,
    }

    setListMessages([message, ...listMessages])
    setMessage('')
  }
  return (
    <>
      <Head>
        <title>AluraCord - Chat</title>
        <meta name="description" content="Clone Discord" />
        <link rel="icon" type="image" href="./assets/alura-logo.png" />
      </Head>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
          color: appConfig.theme.colors.neutrals['000'],
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            borderRadius: '5px',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: '100%',
            maxWidth: '95%',
            maxHeight: '95vh',
            padding: '32px',
          }}
        >
          <Header />
          <Box
            styleSheet={{
              position: 'relative',
              display: 'flex',
              flex: 1,
              height: '80%',
              backgroundColor: appConfig.theme.colors.neutrals[600],
              flexDirection: 'column',
              borderRadius: '5px',
              padding: '16px',
            }}
          >
            <MessageList messages={listMessages} />
            {/* {listMessages.map((MessageAtual) => {
                    return (
                        <li key={MessageAtual.id}>
                            {MessageAtual.de}: {MessageAtual.texto}
                        </li>
                    )
                })} */}
            <Box
              as="form"
              styleSheet={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField
                value={message}
                onChange={(event) => {
                  const valor = event.target.value
                  setMessage(valor)
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    handleNewMessage(message)
                  }
                }}
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                styleSheet={{
                  width: '100%',
                  border: '0',
                  resize: 'none',
                  borderRadius: '5px',
                  padding: '6px 8px',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  marginRight: '12px',
                  color: appConfig.theme.colors.neutrals[200],
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Chat

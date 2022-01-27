import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import { useState, useEffect } from 'react'
import appConfig from '../config.json'
import Header from '../src/components/templates/Header'
import Head from 'next/head'
import Footer from '../src/components/templates/Footer'
import { createClient } from '@supabase/supabase-js'

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
                  marginRight: '15px',
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Box
                as="div"
                styleSheet={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  width: '100%',
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
                marginLeft: '68px',
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
  const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5MzMxNSwiZXhwIjoxOTU4ODY5MzE1fQ.qVF8dQNIfD13wXLFg-n4AMN-XBO1Dsivf602NCQNH1M'
  const SUPABASE_URL = 'https://jzqpsrmygmutdcissxay.supabase.co'
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  useEffect(() => {
    supabaseClient
      .from('messages')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        console.log('Dados da consulta:', data)
        setListMessages(data)
      })
  }, [])
  const handleNewMessage = (newMessage) => {
    const message = {
      // id: listaDeMensagens.length + 1,
      from: `${localStorage.getItem('username')}`,
      text: newMessage,
    }

    supabaseClient
      .from('messages')
      .insert([
        // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
        message,
      ])
      .then(({ data }) => {
        console.log('Creating Message: ', data)
        setListMessages([data[0], ...listMessages])
      })

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
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default Chat

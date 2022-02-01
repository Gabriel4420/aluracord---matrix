import { Box, TextField } from '@skynexui/components'
import { useState, useEffect } from 'react'
import MessageList from '../src/components/MessageList'
import appConfig from '../config.json'
import Header from '../src/components/templates/Header'
import Head from 'next/head'
import Footer from '../src/components/templates/Footer'
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/buttonSendSticker'
const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
)
const listeningMessagesInRealTime = (addMessage) => {
  return supabaseClient
    .from('messages')
    .on('INSERT', (answerLive) => {
      setMessage(answerLive.new)
    })
    .subscribe()
}

const Chat = () => {
  const [message, setMessage] = useState('')
  const [listMessages, setListMessages] = useState([])

  useEffect(() => {
    supabaseClient
      .from('messages')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        console.log('Dados da consulta:', data)
        
        setListMessages(data)
        
      })

    const subscription = listeningMessagesInRealTime((newMessage) => {
      console.log('Nova mensagem:', newMessage)
      console.log('listaDeMensagens:', listMessages)
      // Quero reusar um valor de referencia (objeto/array)
      // Passar uma função pro setState

      // setListaDeMensagens([
      //     novaMensagem,
      //     ...listaDeMensagens
      // ])
      setListMessages((ActualValue) => {
        console.log('valorAtualDaLista:', ActualValue)
        return [newMessage, ...ActualValue]
      })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [listMessages])

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
              <ButtonSendSticker
                onStickerClick={(sticker) => {
                  // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                  handleNewMessage(':sticker: ' + sticker)
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

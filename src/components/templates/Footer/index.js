import React from 'react'
import { Box, Text, TextField, Image, Button } from '@skynexui/components'
const Footer = () => {
  return (
    <Box
      as="footer"
      styleSheet={{
        fontSize: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <Text styleSheet={{ margin: '10px' }}>
        Alura 2022 - All rights reserved
      </Text>
      <Text styleSheet={{ fontSize: '14px' }}>
        Develop by{' '}
        <a
          style={{ fontWeight: 'bold', color: 'white', textDecoration: 'none' }}
          href="https://gabriel4420.github.io"
          target="_blank"
          rel="noreferrer,noopener"
        >
          @Gabriel4420
        </a>
      </Text>
    </Box>
  )
}

export default Footer

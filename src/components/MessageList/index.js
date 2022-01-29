import { Box, Text, Image } from '@skynexui/components'

import appConfig from '../../../config.json'
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
              {message.text.startsWith(':sticker:') ? (
                <Image
                  src={message.text.replace(':sticker:', '')}
                  styleSheet={{
                    width: '100px',
                    height: '100px',
                  }}
                />
              ) : (
                message.text
              )}
            </Box>
          </Text>
        )
      })}
    </Box>
  )
}

export default MessageList

import { Box, Text, Button } from '@skynexui/components'
import { useRouter } from 'next/router'
const Header = () => {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.clear()
    router.push('/')
  }

  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="heading5">
          Chat - Bem vindo {localStorage.getItem('username')}
        </Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          onClick={handleLogout}
        />
      </Box>
    </>
  )
}

export default Header

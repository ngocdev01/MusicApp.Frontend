import { Link as RouterLink } from 'react-router-dom';
import notauthorized from './401.png'
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function NotAuthorizedPage() {
  return (
    <Box sx={{ backgroundColor: "#252525" }}>
      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" color='white' paragraph>
            Not Authorized!
          </Typography>

          <Typography sx={{ color: 'white' }} color='whitesmoke' paragraph>
            Sorry, you are not authorized to access this page. Please contact the administrator for assistance.
          </Typography>

          <Box
            component="img"
            src={notauthorized}
            sx={{ height: 500, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </Box>
  );
}

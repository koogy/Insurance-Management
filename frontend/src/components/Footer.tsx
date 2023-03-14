import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 2, sm: 8 }}
        py={{ xs: 2, sm: 4 }}
        bgcolor="#d2d2d2"
        color="black"
      >
        <Container maxWidth="lg">
          <Box textAlign="center" pt={{ xs: 1, sm: 2 }}>
            WIC &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
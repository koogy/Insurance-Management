import * as React from 'react';
import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const BannerLayoutRoot = styled('section')(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '60vh',
    minHeight: 400,
    maxHeight: 1000,
  },
}));

const Background = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -2,
});

interface BannerProps {
  description: string;
  quotation_button: boolean;
  image: string;
}

export default function Banner(props: BannerProps) {
  const sxBackground = {
    backgroundImage: `url(${props.image})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  };

  return (
    <BannerLayoutRoot>
      <Container
        sx={{
          ml: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Typography color="inherit" variant="h3" align="left">
          <b>Assurance prêt immobilier</b>
        </Typography>
        <Typography
          color="inherit"
          align="left"
          variant="inherit"
          sx={{ mb: 4, maxWidth: 400, marginBottom: 2, marginTop: 1 }}
        >
          {props.description}
        </Typography>
        {props.quotation_button && (
          <div style={{width: 'fit-content'}}>
            <Button
              color="primary"
              variant="contained"
              sx={{ maxWidth: 300, minHeight: 50 }}
              href="/quote"
            >
              Demander un devis
            </Button>
            <Typography
              variant="body2"
              color="inherit"
              align="left"
              sx={{ mt: 2 }}
            >
              Découvrez nos offres
            </Typography>
          </div>
        )}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'common.black',
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
      </Container>
    </BannerLayoutRoot>
  );
}

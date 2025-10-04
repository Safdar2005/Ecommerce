import React from 'react';
import { Container, Box } from '@mui/material';

import { Hero } from '../Components/Hero/Hero';
import { Popular } from '../Components/Popular/Popular';
import { Offers } from '../Components/Offers/Offers';
import { NewCollections } from '../Components/NewCollections/NewCollections';
import { NewsLetter } from '../Components/NewsLetter/NewsLetter';

export const Shop = () => {
  return (
    <Container maxWidth="xl" disableGutters>
      <Box component="section" sx={{ mb: 4 }}>
        <Hero />
      </Box>

      <Box component="section" sx={{ mb: 6, px: { xs: 2, sm: 3, md: 6 } }}>
        <Popular />
      </Box>

      <Box component="section" sx={{ mb: 6, px: { xs: 2, sm: 3, md: 6 } }}>
        <Offers />
      </Box>

      <Box component="section" sx={{ mb: 6, px: { xs: 2, sm: 3, md: 6 } }}>
        <NewCollections />
      </Box>

      <Box component="section" sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <NewsLetter />
      </Box>
    </Container>
  );
};

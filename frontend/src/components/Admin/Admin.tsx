import { Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import Banner from '../Banner';
import AdminContracts from './AdminContracts';
import AdminQuotes from './AdminQuotes';
import AdminStats from './AdminStats';
import AdminUsers from './AdminUsers';
import AdminRenewalContracts from "./AdminRenewalContracts";
import AdminAccidents from './AdminAccidents';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Admin() {
  const description = 'Page réservée uniquement pour le personnel agré.';
  const backgroundImage = '/police.jpg';
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Banner
        description={description}
        quotation_button={false}
        image={backgroundImage}
      />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Onglets"
            centered
          >
            <Tab label="Devis" {...a11yProps(0)} />
            <Tab label="Contrats" {...a11yProps(1)} />
            <Tab label="Sinistres" {...a11yProps(2)} />
            <Tab label="Renouvellement" {...a11yProps(3)} />
            <Tab label="Utilisateurs" {...a11yProps(4)} />
            <Tab label="Statistiques" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AdminQuotes />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AdminContracts />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AdminAccidents />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AdminRenewalContracts />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AdminUsers />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <AdminStats />
        </TabPanel>
      </Box>
    </div>
  );
}

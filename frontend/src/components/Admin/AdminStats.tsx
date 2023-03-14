import { useEffect, useState } from 'react';
import { parseURL } from '../../helpers/helperFunctions';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Contract } from '../Account/Contract';
import { Quote } from '../Account/UserQuote';
import { Container, Divider } from '@mui/material';
import '../../styles/Stats.css';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const monthNames = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

function getSignedContractsPerMonth(contracts: Contract[] | undefined) {
  if (contracts === undefined) {
    return;
  }

  contracts.sort(function (a, b) {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);

    return dateA.getTime() - dateB.getTime();
  });

  let quantity = new Map<string, number>();

  contracts.forEach((data) => {
    if (data.state === 'Confirmé') {
      const completeDate = new Date(data.updatedAt);
      const year = completeDate.getFullYear();
      const month = monthNames[completeDate.getMonth()];
      const key = month + ' ' + year;

      let amount = quantity.has(key)
        ? quantity.get(key)! + 1
        : 1;
        quantity.set(key, amount);
    }
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Nombre de contrats confirmés par mois',
      },
    },
    scales: {
      y: {
        suggestedMin: 0,
      },
    },
  };

  const labels = Array.from(quantity.keys());
  const data = {
    labels,
    datasets: [
      {
        label: 'Contrats',
        data: Array.from(quantity.values()),
        borderColor: 'rgb(200, 99, 190)',
        backgroundColor: 'rgba(200, 99, 190, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}

function getContractsProfitPerMonth(contracts: Contract[] | undefined) {
  if (contracts === undefined) {
    return;
  }

  contracts.sort(function (a, b) {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);

    return dateA.getTime() - dateB.getTime();
  });

  let prices = new Map<string, number>();

  contracts.forEach((data) => {
    if (data.state === 'Confirmé') {
      const completeDate = new Date(data.updatedAt);
      const year = completeDate.getFullYear();
      const month = monthNames[completeDate.getMonth()];
      const key = month + ' ' + year;

      let amount = prices.has(key)
        ? prices.get(key)! + data.premium
        : data.premium;
      prices.set(key, amount);
    }
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Recette par mois en €',
      },
    },
    scales: {
      y: {
        suggestedMin: 0,
      },
    },
  };

  const labels = Array.from(prices.keys());
  const data = {
    labels,
    datasets: [
      {
        label: 'Revenus',
        data: Array.from(prices.values()),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}

function getContractsState(contracts: Contract[] | undefined) {
  if (contracts === undefined) {
    return;
  }

  const dynamicColors = function () {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  let states = new Map<string, number>();
  let colors: string[] = [];
  let total: number = 0;

  contracts.forEach((data) => {
    let amount = states.has(data.state) ? states.get(data.state)! + 1 : 1;
    states.set(data.state, amount);
    colors.push(dynamicColors());
    total += 1;
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Répartition des statuts de contrat',
      },
    },
  };

  const pieData = {
    labels: Array.from(states.keys()),
    datasets: [
      {
        label: 'Statuts',
        data: Array.from(states.values()),
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div>
      <Pie data={pieData} options={options} />
      {total > 0 && (
        <table className='nice_stats'>
        <tr>
          {
            Array.from(states.keys()).map(state => (<td>{state}</td>))
          }
        </tr>
        <tr>
          {
            Array.from(states.values()).map(state => (<td>{(state/total*100).toFixed(2) + '%'}</td>))
          }
        </tr>
      </table>
      )}
    </div>
  );
}

function getCitiesAndProportions(
  array: Quote[] | Contract[],
  mapToCopy: Map<string, number> | undefined,
) {
  let cities: Map<string, number>;

  if (mapToCopy !== undefined) {
    cities = new Map(mapToCopy);

    cities.forEach((value: number, key: string) => cities.set(key, 0));
  } else {
    cities = new Map<string, number>();
  }

  array.forEach((data) => {
    let amount = cities.has(data.city) ? cities.get(data.city)! + 1 : 1;
    cities.set(data.city, amount);
  });

  return cities;
}

function getConversionRateByCities(
  quotes: Quote[] | undefined,
  contracts: Contract[] | undefined,
) {
  if (quotes === undefined || contracts === undefined) {
    return;
  }

  let quoteCities = getCitiesAndProportions(quotes, undefined);
  let contractCities = getCitiesAndProportions(
    contracts,
    quoteCities,
  );
  const labels = Array.from(quoteCities.keys());

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Conversion des devis en contrats selon les villes',
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1
        }
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Devis',
        data: Array.from(quoteCities.values()),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Contrats',
        data: Array.from(contractCities.values()),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default function AdminStats() {
  const [quoteData, setQuoteData] = useState<Quote[]>();
  const [contractData, setContractData] = useState<Contract[]>([]);
  const [isLoadingQuotes, setLoadingQuotes] = useState(true);
  const [isLoadingContracts, setLoadingContracts] = useState(true);

  useEffect(() => {
    fetch(parseURL('/api/quotes/list'))
      .then((response) => response.json())
      .then((data) => {
        setQuoteData(data);
        setLoadingQuotes(false);
      });
    fetch(parseURL('/api/contract/list'))
      .then((response) => response.json())
      .then((data) => {
        setContractData(data);
        setLoadingContracts(false);
      });
  }, []);

  if (isLoadingContracts && isLoadingQuotes) {
    return <p>Chargement en cours..</p>;
  }

  return (
    <Container maxWidth="md">
      {getConversionRateByCities(quoteData, contractData)}
      <Divider light />
      {getContractsState(contractData)}
      <Divider light />
      {getContractsProfitPerMonth(contractData)}
      <Divider light />
      {getSignedContractsPerMonth(contractData)}
    </Container>
  );
}

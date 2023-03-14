import Banner from './Banner';
import HowItWorks from './HowItWorks';
import Faq from './Faq';

export default function Home() {
  const description =
    "Chez WIC, nous vous offrons une gamme d'assurances de prêt immobilier adaptée à vos besoins";
  const backgroundImage = '/happy.jpg';

  return (
    <div>
      <Banner
        description={description}
        quotation_button={true}
        image={backgroundImage}
      />
      <HowItWorks />
      <Faq />
    </div>
  );
}

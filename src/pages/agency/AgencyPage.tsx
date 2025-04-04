import AgencyFeatures from '../../components/sections/agency page/AgencyFeatures';
import AgencyHero from '../../components/sections/agency page/AgencyHero';
import ChooseAgency from '../../components/sections/agency page/ChooseAgency';

export default function AgencyPage() {
  return (
    <div>
      <AgencyHero />
      <AgencyFeatures />
      <ChooseAgency />
    </div>
  );
}

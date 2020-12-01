import {createElement} from 'react';
// import JSONPretty from 'react-json-pretty';
import GenericSubpage from '../subpage/GenericSubpage';
import SeeAndDoSubpage from '../subpage/SeeAndDoSubpage';
import EatAndDrinkSubpage from '../subpage/EatAndDrinkSubpage';
import EventSubpage from '../subpage/EventSubpage';
import StudySubpage from '../subpage/StudySubpage';
import InfoSubpage from '../subpage/info/InfoSubpage';
import EventPage from '../event/EventPage';
import ArticlePage from '../article/ArticlePage';
import PlacePage from '../place/PlacePage';
import LocalGuidePage from '../myHelsinki/LocalGuidePage';
import ThemePage from '../theme/ThemePage';
import BasicPage from '../basicPage/BasicPage';
import InvestSubpage from '../subpage/InvestSubpage';
import BusinessSubpage from '../subpage/BusinessSubpage';
import ActivityPage from '../activity/ActivityPage';
import AboutPage from '../about/AboutPage';
import Homepage from '../homepage/Homepage';
import WorkSubpage from '../subpage/WorkSubpage';
import SectionPage from '../section/SectionPage';
import MediaSubpage from '../subpage/MediaSubpage';
import ContactSubpage from '../subpage/ContactSubpage';
import TravelIndustrySubpage from '../subpage/TravelIndustrySubpage';
import ActivitySubpage from '../subpage/ActivitySubpage';
import MyHelsinkiList from '../myHelsinki/MyHelsinkiList';

// const Dummy = (data) =>
//   <JSONPretty json={data}/>;

const typeToComponentMap = {
  sub_page: GenericSubpage,
  eat_drink_sub_page: EatAndDrinkSubpage,
  see_do_sub_page: SeeAndDoSubpage,
  event_sub_page: EventSubpage,
  study_sub_page: StudySubpage,
  info_page: InfoSubpage,
  place: PlacePage,
  article: ArticlePage,
  event: EventPage,
  my_helsinki_local_guide: LocalGuidePage,
  theme_page: ThemePage,
  basic_page: BasicPage,
  invest_sub_page: InvestSubpage,
  business_sub_page: BusinessSubpage,
  activity: ActivityPage,
  about: AboutPage,
  homepage: Homepage,
  work_sub_page: WorkSubpage,
  section: SectionPage,
  for_media_sub_page: MediaSubpage,
  contact: ContactSubpage,
  travel_industry: TravelIndustrySubpage,
  activity_sub_page: ActivitySubpage,
  my_helsinki_list: MyHelsinkiList,
};

const resolveContentType = content => (content ? content.type : undefined);

export default content => {
  // eslint-disable-line
  const type = resolveContentType(content);

  if (!type) {
    throw new Error('Could not determine content type');
  }

  if (!typeToComponentMap[type]) {
    throw new Error(`Could not render content of type ${type}`);
  }

  const component = typeToComponentMap[type];

  return createElement(component, {content});
};

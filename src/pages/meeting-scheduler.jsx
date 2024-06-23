import { graphql } from 'gatsby';

import '../styles/meeting-scheduler.scss';
import HeroTitle from '../components/Hero/HeroTitle/HeroTitle';
import { useTranslation } from 'react-i18next';

function MeetingSchedulerTemplate() {
	const { t } = useTranslation();

	return (
		<div className="scheduler-page">
			<HeroTitle title={t(`schedulerPage.hero.title`)} subtitle={t(`schedulerPage.hero.subtitle`)} />
		</div>
	);
}
export default MeetingSchedulerTemplate;

export const query = graphql`
	query ($language: String!) {
		locales: allLocale(filter: { language: { eq: $language } }) {
			edges {
				node {
					ns
					data
					language
				}
			}
		}
	}
`;

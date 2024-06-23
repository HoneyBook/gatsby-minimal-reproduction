import { graphql } from 'gatsby';
import FeaturedIn from '../components/FeaturedIn/FeaturedIn';

import '../styles/homepage-product.scss';

function LandingTemplate(): JSX.Element {
	return (
		<div className="product-home">
			<FeaturedIn />
		</div>
	);
}

export default LandingTemplate;

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

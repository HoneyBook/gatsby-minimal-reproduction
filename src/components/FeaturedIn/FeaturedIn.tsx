import { memo } from 'react';

import './featured-in.scss';

const featuredInItems = [
	{
		id: 'entrepreneur',
		imgUrl: 'v1510954356/marketing_site/home_page/logo-entrepreneur.png',
		alt: 'Entrepreneur',
	},
	{
		id: 'huffpost',
		imgUrl: 'v1510954356/marketing_site/home_page/logo-huffpost.png',
		alt: 'HuffPost',
	},
	{
		id: 'fortune',
		imgUrl: 'v1510954356/marketing_site/home_page/logo-fortune.png',
		alt: 'Fortune',
	},
	{
		id: 'fastcompany',
		imgUrl: 'v1510954356/marketing_site/home_page/logo-fast-company.png',
		alt: 'Fast Company',
	},
	{
		id: 'bustle',
		imgUrl: 'v1510954356/marketing_site/home_page/logo-bustle.png',
		alt: 'Bustle',
	},
];

const FeaturedIn = () => {
	return (
		<div className="featured-in">
			<ul className="featured-in__list">
				{featuredInItems.map((item) => (
					<li key={item.id} className="featured-in__list-item">
						{item.imgUrl}
					</li>
				))}
			</ul>
		</div>
	);
};

export default memo(FeaturedIn);

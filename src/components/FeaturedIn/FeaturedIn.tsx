import { memo } from 'react';

import './featured-in.scss';

const featuredInItems = [
	{
		id: 'entrepreneur',
		label: 'Entrepreneur',
	},
	{
		id: 'huffpost',
		label: 'HuffPost',
	},
	{
		id: 'fortune',
		label: 'Fortune',
	},
	{
		id: 'fastcompany',
		label: 'Fast Company',
	},
	{
		id: 'bustle',
		label: 'Bustle',
	},
];

const FeaturedIn = () => {
	return (
		<div className="featured-in">
			<ul className="featured-in__list">
				{featuredInItems.map((item) => (
					<li key={item.id} className="featured-in__list-item">
						{item.label}
					</li>
				))}
			</ul>
		</div>
	);
};

export default memo(FeaturedIn);

import { memo } from 'react';

import './hero-title.scss';

interface Props {
	customClass?: string;
	preTitle?: string;
	title?: string;
	subtitle?: string;
}

function HeroTitle({ customClass, title, subtitle, preTitle }: Props): JSX.Element {
	return (
		<div className={`hero__text-container ${customClass}`}>
			{preTitle && <h3 className="hero__text-container__pre-title">{preTitle}</h3>}
			{title && <h1 className="hero__text-container__title">{title}</h1>}
			{subtitle && <h2 className="hero__text-container__subtitle">{subtitle}</h2>}
		</div>
	);
}

export default memo(HeroTitle);

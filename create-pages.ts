/* eslint-env node */
import * as path from 'path';

import type { CreatePagesArgs } from 'gatsby';

const LandingTemplate = path.resolve('./src/pages/index.tsx');
const MeetingSchedulerTemplate = path.resolve('./src/pages/meeting-scheduler.jsx');

interface PageTemplate {
	path: string;
	matchPath?: string;
	component: string;
}

interface PageContext {}

interface Page extends PageTemplate {
	context: PageContext;
}

function createPages({ actions: { createPage } }: CreatePagesArgs): void {
	function createEachPage(pages: Page[]): void {
		// eslint-disable-next-line no-restricted-syntax
		for (const page of pages) {
			console.info('page.path:', page.path);

			createPage<PageContext>(page);
		}
	}

	const pagesList: Page[] = [
		{
			path: '/',
			component: LandingTemplate,
			context: {},
		},
		{
			path: '/meeting-scheduler',
			component: MeetingSchedulerTemplate,
			context: {},
		},
	];

	createEachPage(pagesList);
}

export default createPages;

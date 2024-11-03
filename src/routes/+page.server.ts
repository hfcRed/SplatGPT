import type { Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');
		const redirectTo = url.searchParams.get('redirect');

		if (theme) {
			cookies.set('theme', theme, { path: '/', maxAge: 60 * 60 * 24 * 365 });
		}

		redirect(303, redirectTo ?? '/');
	}
};

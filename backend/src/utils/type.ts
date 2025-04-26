export type story = {
	id: string;
	title: string;
	is_finish: boolean;
	auto_generated: boolean;
};

export type storyType = {
	title: string;
	story: string;
	genre: string[];
	choose_option: {
		id: number;
		option: string;
	}[];
};

export interface userType {
	id: number;
	name: string;
	email: string;
	password: string;
	token: string | null;
}

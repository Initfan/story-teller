export type option = {
	id: number;
	option: string;
};

export type detail = {
	id: number;
	story_text: string;
	choosen_option?: string;
};

type genre = {
	id: number;
	genre: string;
};

export interface storyInterface {
	id: number;
	user_id: number;
	title: string;
	is_finish: boolean;
	auto_generate: boolean;
	detail: detail[];
	option: option[];
	genre: genre[];
}

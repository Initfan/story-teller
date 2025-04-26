type storyOption = {
	id: number;
	deskripsi: string;
};

export interface storyInterface {
	id: number;
	title: string;
	genre: string;
	story_detail: string;
	option: string;
	is_finish: boolean;
}

type storyOption = {
	id: number;
	deskripsi: string;
};

export interface storyInterface {
	judul: string;
	genre: string[];
	cerita: string;
	pilihan_kelanjutan: storyOption[];
}

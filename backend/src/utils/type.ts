export type storyType = {
	judul: string;
	cerita: string;
	genre: string[];
	pilihan_kelanjutan: {
		id: number;
		deskripsi: string;
	}[];
};

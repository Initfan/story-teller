export const genres: string[] = [
	"aksi",
	"petualangan",
	"fiksi ilmiah",
	"misteri",
	"dunia lain",
];

export type storyType = {
	judul: string;
	cerita: string;
	genre: string[];
	pilihan_kelanjutan: {
		id: number;
		deskripsi: string;
	}[];
};

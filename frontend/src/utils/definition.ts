export const genres: string[] = [
	"aksi",
	"petualangan",
	"fiksi ilmiah",
	"misteri",
	"dunia lain",
];

export interface story {
	genre: string[];
	title: string;
	sinopsis: string;
	content: string;
}

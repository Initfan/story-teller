export interface storyType {
	judul: string;
	cerita: string;
	genre: string[];
	pilihan_kelanjutan: {
		id: number;
		deskripsi: string;
	}[];
}

export interface userType {
	id: number;
	name: string;
	email: string;
	password: string;
	token: string | null;
}

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

const model = genAI.getGenerativeModel({
	model: "gemini-2.0-flash",
	systemInstruction:
		"Kamu adalah seorang penulis dan pencerita yang hebat. kamu dikenal dengan karya-karya mu yang begitu indah. bisakah kamu menceritakan sebuah kisah untuk seseorang agar membuatnya bahagia akan ceritamu.",
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: "application/json",
};

export { model, generationConfig };

// import fetch from "node-fetch";
// interface Options {
//     from?: string;
//     to: string;
// }
// const translate = async (text: string, from: string, to: string) => {
//     const res = await fetch("http://127.0.0.1:5001/translate", {
//         method: "POST",
//         body: JSON.stringify({
//             q: text,
//             source: from,
//             target: to,
//             format: "text",
//             api_key: "",
//         }),
//         headers: { "Content-Type": "application/json" },
//     });
//     console.log(await res.json());
//     return (await res.json()) as any;
// };
// export async function translateTexts(texts: string[], { to, from }: Options) {
//     try {
//         const translatePromises = texts.map((text) => translate(text, from, to));
//         const response = await Promise.all(translatePromises);
//         const translatedTexts = response.map((res) => res.translatedText);
//         console.log(translatedTexts);
//         return translatedTexts;
//     } catch (error) {
//         console.log(error);
//     }
// }
// translateTexts(["Do you know me ?"], { from: "en", to: "fr" });
// console.log("hello");
//# sourceMappingURL=translator.js.map
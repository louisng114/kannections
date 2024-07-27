import axios from "axios";

const fetchKanji = async (jlpt) => {
    const BASE_URL = "http://localhost:3001/api/v1/kanji";

    // arrays to store results
    const idSet = new Set();
    const categoryObjectArray = [];
    let attempt = 0;

    // references for random categories
    const verbEndingsArray = ["う", "る", "む", "ぶ", "く", "す", "つ", "ぐ"];
    const kataganaArray = ["イ", "ウ", "カ", "キ", "ク", "コ", "ゴ", "サ", "シ", "ス", "セ", "ジ", "チ", "ツ", "ニ", "ャ", "ュ", "ョ", "ン"];

    const getFourKanji = (data, category) => {
        const kanjiArray = [];
        const categoryObject = {
            category,
            kanji : kanjiArray,
        };
        // attempt counter to prevent overattempting unworkable game
        let attempt = 0;

        while (kanjiArray.length < 4 && attempt < 10) {
            // get random index of Kanji
            const randomIndex = Math.floor(Math.random() * data.length);
 
            // add Kanji to array if not already selected
            if (!idSet.has(data[randomIndex].id)) {
                idSet.add(data[randomIndex].id);
                kanjiArray.push(data[randomIndex].kanji);
            }
            attempt++;
        }

        if (kanjiArray.length === 4) {
            categoryObjectArray.push(categoryObject);
        }
    };

    // get four Kanji with the same number of strokes
    const getKanjiByStroke = async (num) => {
        try {
            const response = await axios.get(BASE_URL, {
                params : {
                    minJlptLevel : `N${jlpt}`,
                    minStrokes : num,
                    maxStrokes : num,
                }
            });
            return getFourKanji(response.data.data, `Kanji with ${num} strokes`);
        } catch (error) {
            console.error(error);
        }
    }

    // get four Kanji containing given Katagana
    const getKanjiByOnyomi = async (char) => {
        try {
            const response = await axios.get(BASE_URL, {
                params : {
                    minJlptLevel : `N${jlpt}`,
                    onyomi : `${char}`,
                }
            });
            return getFourKanji(response.data.data, `Kanji with ${char} in its On'yomi`);
        } catch (error) {
            console.error(error);
        }
    }

    // get four Kanji used in words ending in the given hiragana
    const getVerb = async (char) => {
        const data = [];
        console.log("char:");
        console.log(char);

        try {
            // excludes numbers from the request
            if (char === "つ") {
                await axios.get(BASE_URL, {
                    params : {
                        maxJlptLevel : 'N4',
                        minJlptLevel : `N${jlpt}`,
                        kunyomi : `.${char}`,
                    }
                }).then((response) => {
                    data.push(...response.data.data);
                });
            } else {
                await axios.get(BASE_URL, {
                    params : {
                        minJlptLevel : `N${jlpt}`,
                        kunyomi : `.${char}`,
                    }
                }).then((response) => {
                    // removes 危(あや.うい) because it matches the pattern but is not a verb
                    const respData = response.data.data;
                    if (jlpt <= 3 && char === "う") {
                        for (let index in respData) {
                            if (respData[index].kanji ==="危") {
                                respData.splice(index, 1);
                                break;
                            }
                        }
                    }
                    data.push(...respData);
                });
            }

            await axios.get(BASE_URL, {
                params : {
                    minJlptLevel : `N${jlpt}`,
                    kunyomi : `._${char}`,
                }
            }).then((response) => {
                if (response.data.data) {
                    // removes 危(も.しくわ) because it matches the pattern but is not a verb
                    const respData = response.data.data;
                    if (jlpt <= 3 && char === "く") {
                        for (let index in respData) {
                            if (respData[index].kanji ==="若") {
                                respData.splice(index, 1);
                                break;
                            }
                        }
                    }
                    
                    data.push(...respData);
                }
            });

            await axios.get(BASE_URL, {
                params : {
                    minJlptLevel : `N${jlpt}`,
                    kunyomi : `.__${char}`,
                }
            }).then((response) => {
                if (response.data.data) {
                    data.push(...response.data.data);
                }
            });
            return getFourKanji(data, `Kanji used in verb ending in ${char}`);
        } catch (error) {
            console.error(error);
        }
    }

    // get four counter Kanji
    const getCounterKanji = async () => {
        try {
            const response = await axios.get(BASE_URL, {
                params : {
                    minJlptLevel : `N${jlpt}`,
                    meaning: "Counter for"
                }
            });
            return getFourKanji(response.data.data, "Counter Kanji");
        } catch (error) {
            console.error(error);
        }
    }

    // get four number Kanji
    const getNumberKanji = async () => {
        try {
            const response = await axios.get(BASE_URL, {
                params : {
                    minJlptLevel : "N5",
                    kunyomi: ".つ"
                }
            });
            response.data.data.push({ "id" : 9, "kanji" : "十"});
            response.data.data.push({ "id" : 110, "kanji" : "百"});
            response.data.data.push({ "id" : 21, "kanji" : "千"});
            response.data.data.push({ "id" : 56, "kanji" : "万"});
            response.data.data.push({ "id" : 79, "kanji" : "半"});
            return getFourKanji(response.data.data, "Number Kanji");
        } catch (error) {
            console.error(error);
        }
    }

    // generate categoryObjectArray
    while (categoryObjectArray.length < 4 && attempt < 50) {
        idSet.clear();
        categoryObjectArray.length = 0;

        let maxStroke = 10;
        switch (jlpt) {
            case 5:
                maxStroke = 10;
                break;
            case 4:
                maxStroke = 14;
                break;
            case 3:
                maxStroke = 16;
                break;
            case 2:
                maxStroke = 19;
                break;
            case 1:
                maxStroke = 21;
                break;
        }

        const randomStroke = Math.floor(Math.random() * (maxStroke - 2)) + 3;
        await getKanjiByStroke(randomStroke);

        if (jlpt === 5){
            await getNumberKanji();
        } else {
            await getCounterKanji();
        }
    
        const kataganaArrayLength = kataganaArray.length;
        const randomKataganaIndex = Math.floor(Math.random() * kataganaArrayLength);
        await getKanjiByOnyomi(kataganaArray[randomKataganaIndex]);

        // excludes "つ" and "ぐ" from verbEndingsArray when jlpt is 5;
        let verbEndingsArrayLength;
        if (jlpt === 5) {
            verbEndingsArrayLength = verbEndingsArray.length - 2;
        } else {
            verbEndingsArrayLength = verbEndingsArray.length;
        }
        const randomVerbEndingIndex = Math.floor(Math.random() * verbEndingsArrayLength);
        await getVerb(verbEndingsArray[randomVerbEndingIndex]);

        console.log(categoryObjectArray);

        attempt++;
    }

    if (attempt >= 50) {
        return null;
    }

    return categoryObjectArray;
};

export default fetchKanji;
import KannectionsApi from "../../../api";

const win = async (username, jlpt, perfect) => {
    let totalWins = 0;
    let perfectWins = 0;

    // gain achievements based on JLPT level
    if (jlpt <= 4) {
        KannectionsApi.gainAchivement(username, "l4");
        if (perfect) {
            KannectionsApi.gainAchivement(username, "pl4");
        }
    }

    if (jlpt <= 3) {
        KannectionsApi.gainAchivement(username, "l3");
        if (perfect) {
            KannectionsApi.gainAchivement(username, "pl3");
        }
    }

    if (jlpt <= 2) {
        KannectionsApi.gainAchivement(username, "l2");
        if (perfect) {
            KannectionsApi.gainAchivement(username, "pl2");
        }
    }

    if (jlpt === 1) {
        KannectionsApi.gainAchivement(username, "l1");
        if (perfect) {
            KannectionsApi.gainAchivement(username, "pl1");
        }
    }

    // gain win on user record
    totalWins = await KannectionsApi.gainWin(username);

    // gain perfect win on user record if perfect
    if (perfect) {
        perfectWins = await KannectionsApi.gainPerfectWin(username);
    }

    // gain achievements
    switch (totalWins) {
        case 1:
            KannectionsApi.gainAchivement(username, "w1");
            break;
        case 3:
            KannectionsApi.gainAchivement(username, "w3");
            break;
        case 5:
            KannectionsApi.gainAchivement(username, "w5");
            break;
        case 10:
            KannectionsApi.gainAchivement(username, "w10");
            break;
        case 30:
            KannectionsApi.gainAchivement(username, "w30");
            break;
        case 50:
            KannectionsApi.gainAchivement(username, "w50");
            break;
    }
    switch (perfectWins) {
        case 1:
            KannectionsApi.gainAchivement(username, "p1");
            break;
        case 3:
            KannectionsApi.gainAchivement(username, "p3");
            break;
        case 5:
            KannectionsApi.gainAchivement(username, "p5");
            break;
        case 10:
            KannectionsApi.gainAchivement(username, "p10");
            break;
        case 30:
            KannectionsApi.gainAchivement(username, "p30");
            break;
    }
};

export default win;
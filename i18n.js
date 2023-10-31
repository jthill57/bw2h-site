import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'

const fallbackLanguage = "en"

export const projectToken = "3dd29031916e4548b31f461add1919d4"; // YOUR PROJECT TOKEN
export const apiKey = "slper_1b1B9c67425c1cF3390a8D48e83111A6E3DCB19673e15BdA"; // YOUR API KEY
export const cdnBaseUrl = "https://cdn.simplelocalize.io";
export const environment = "_latest"; // or "_production"

const loadPath = `${cdnBaseUrl}/${projectToken}/${environment}/{{lng}}`;
const endpoint = `https://api.simplelocalize.io/api/v1/translations`;
const missingKeysPushInterval = 10_000; // 10 seconds

let missingKeysRequests = [];

const missingKeyHandler = (
    languages,
    namespace,
    key,
    fallbackValue) => {
    missingKeysRequests.push({
        key,
        //namespace: namespace, // uncomment if you use namespaces
        language: fallbackLanguage,
        text: fallbackValue
    });
};


const pushMissingKeys = () => {
    if (missingKeysRequests.length > 0) {
        console.log(`[SimpleLocalize] Pushing missing keys: ${missingKeysRequests.length}`);
        const requestBody = {
            content: missingKeysRequests
        }
        fetch(endpoint, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'X-SimpleLocalize-Token': apiKey
            },
            body: JSON.stringify(requestBody),
        })
        missingKeysRequests = [];
    }
}

// @refresh reset
setInterval(() => pushMissingKeys(), missingKeysPushInterval)

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: fallbackLanguage,
        backend: {
            loadPath: loadPath,
        },
        detection: {
            order: ['querystring', 'cookie'],
            lookupQuerystring: 'hl',
            lookupCookie: 'language',
            caches: ['cookie']
        },
        saveMissing: true,
        missingKeyHandler
    })

export default i18n;

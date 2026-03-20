import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement locales (.env)
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

// Point de terminaison API sécurisé pour Gemini
app.post('/api/generate-synthesis', async (req, res) => {
    try {
        const scores = req.body;
        const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            console.warn("Pas de clé API GEMINI trouvée sur le serveur.");
            return res.status(400).json({ error: "API Key manquante sur le serveur." });
        }

        const ai = new GoogleGenAI({ apiKey });

        const prompt = `Tu es un expert et un coach en investissement immobilier et marchand de biens. 
Un de tes apprenants vient de terminer un diagnostic pour évaluer son profil. Voici ses scores sur 100 pour 6 dimensions clés :
- Temps disponible : ${scores.temps || 0}/100
- Capital / Financement : ${scores.capital || 0}/100
- Compétences techniques/juridiques : ${scores.competences || 0}/100
- Réseau professionnel : ${scores.reseau || 0}/100
- Expérience immobilière : ${scores.experience || 0}/100
- Tolérance au risque : ${scores.risque || 0}/100

Analyse ces scores et fournis-lui une synthèse structurée sous format JSON. 
TRÈS IMPORTANT : Tu dois t'adresser directement à l'apprenant en utilisant le tutoiement ("tu", "ton", "ta") comme un coach bienveillant, motivant et direct.

Structure attendue :
{
  "profil": {
    "nom": "Nom du profil (ex: Explorateur, Opportuniste, Développeur)",
    "description": "Courte description de son profil et de son adéquation avec l'investissement. (Exemple: 'Tu as un profil d'Explorateur. Cela signifie que tu...')",
    "strategie": ["Ton premier point stratégique...", "Ton deuxième point...", "Ton troisième point..."]
  },
  "planAction": {
    "etape1": "Ton conseil personnalisé (en le tutoyant) pour l'étape 1 : Choisir un secteur d'analyse",
    "etape2": "Ton conseil personnalisé pour l'étape 2 : Analyser 10 biens",
    "etape3": "Ton conseil personnalisé pour l'étape 3 : Identifier 3 opportunités",
    "etape4": "Ton conseil personnalisé pour l'étape 4 : Présenter une opération"
  }
}

Exemples de Profils (adapte selon l'analyse des scores) :
- Profil "Explorateur" (faible expérience, faible capital) : stratégie axée sur de petits projets, achats simples, marges faibles mais rapides.
- Profil "Opportuniste" (compétences correctes, réseau existant) : stratégie axée sur de l'achat/revente de maisons ou appartements.
- Profil "Développeur" (capital élevé, réseau solide) : stratégie orientée division, immeubles, projets complexes.

Sois objectif, constructif et professionnel. Retourne uniquement le JSON complet, sans de balises markdown ni texte additionnel.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        if (response.text) {
            return res.json(JSON.parse(response.text));
        } else {
            return res.status(500).json({ error: "Réponse vide de l'IA" });
        }
    } catch (error) {
        console.error("Erreur API:", error);
        res.status(500).json({ error: "Erreur interne du serveur lors de la génération." });
    }
});

// En production, servir les fichiers statiques React du dossier dist
app.use(express.static(join(__dirname, 'dist')));

// Rediriger toutes les autres requêtes vers index.html (utile pour React Router si ajouté plus tard)
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Le port par défaut est 3001 pour ne pas entrer en conflit avec Vite (3000) en local
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur le port ${PORT}`);
});

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Coding Notebook"
      description="Personal coding notes and CDA course materials"
    >
      <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1>Coding Notebook</h1>

        <p>
          Bienvenue sur <strong>coding notebook</strong> ! C'est un site qui
          recense mes prise de notes. Je l'ai commencé durant mon année de
          préparation au diplôme
          <strong>
            {" "}
            CDA (Concepteur·ice Développeur·euse d’Applications)
          </strong>{" "}
          .
        </p>

        <h2>Ce qu'on peut y trouver</h2>
        <ul>
          <li>Concept de programmation orienté objet</li>
          <li>Différents langages et frameworks (Java, Python, Angular...)</li>
          <li>Fondamentaux web (HTTP, REST, APIs)</li>
          <li>Base de données et SQL</li>
          <li>Notes sur les frameworks et les bonnes pratiques</li>
          <li>Exemple de code</li>
        </ul>

        <p>
          Ceci est un projet évolutif qui se développera tout au long de ma
          formation et de mes futures expériences.
        </p>
      </main>
    </Layout>
  );
}

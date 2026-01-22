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
          Welcome to my personal coding notebook. This website contains
          structured notes taken during my
          <strong> CDA (Concepteur Développeur d’Applications)</strong>{" "}
          training.
        </p>

        <h2>What you will find here</h2>
        <ul>
          <li>Java and object-oriented programming concepts</li>
          <li>Web fundamentals (HTTP, REST, APIs)</li>
          <li>Databases and SQL</li>
          <li>Framework notes and best practices</li>
          <li>Code examples and explanations</li>
        </ul>

        <h2>How this notebook is organized</h2>
        <p>
          Each topic is written in Markdown and organized by category. The goal
          is to keep concepts clear, concise, and easy to revisit.
        </p>

        <p>
          This notebook is a living project and will evolve throughout my
          training and future professional experience.
        </p>
      </main>
    </Layout>
  );
}

import type { Metadata } from "next";
import { ContactBand, PageHero } from "../components";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Fichas de notificação e investigação em saúde do trabalhador disponíveis para download pelo CEREST Tianguá.",
};

const files = [
  ["Animais peçonhentos", "Ficha de investigação de acidentes por animais peçonhentos.", "https://drive.google.com/uc?export=download&id=1a3T03V9ud3UzyxI6eNysxtM0-ps05wsG"],
  ["Acidente de trabalho com exposição a material biológico", "Ficha de investigação para exposição ocupacional a material biológico.", "https://drive.google.com/uc?export=download&id=14gDkzLtv0Z7A39_JVRC7ZiMLaRwF45kA"],
  ["Acidente de trabalho grave", "Ficha de investigação de acidente de trabalho grave, fatal ou envolvendo crianças e adolescentes.", "https://drive.google.com/uc?export=download&id=17QzXrLOfkkMz5te9KGP-kXthbreE1MLv"],
  ["Câncer relacionado ao trabalho", "Ficha de investigação de câncer relacionado ao trabalho.", "https://drive.google.com/uc?export=download&id=1zDDcLKQZ-5Cabye2wOt63otM253WaGXs"],
  ["Dermatoses ocupacionais", "Ficha de investigação de dermatoses ocupacionais.", "https://drive.google.com/uc?export=download&id=1de3kzpid0qOMoro-LOzB_iyrX7VjFFPh"],
  ["LER/DORT", "Ficha de investigação de lesões por esforços repetitivos e distúrbios osteomusculares relacionados ao trabalho.", "https://drive.google.com/uc?export=download&id=1T26gEG77PO_-1DUznAg8eTzj790vBOJ6"],
  ["PAIR", "Ficha de investigação de perda auditiva induzida por ruído relacionada ao trabalho.", "https://drive.google.com/uc?export=download&id=1RcMFAztcpW-QH5D1BfyMGXgOKpSGJQTx"],
  ["Pneumoconioses", "Ficha de investigação de pneumoconioses relacionadas ao trabalho.", "https://drive.google.com/uc?export=download&id=1VVyCDInuQPS24anOzbRe3jOVviGjFwoN"],
  ["Transtornos mentais relacionados ao trabalho", "Ficha de investigação de transtornos mentais relacionados ao trabalho.", "https://drive.google.com/uc?export=download&id=1pxE1FeFeWaek4tBJ31vxwbQTNqIJXktl"],
  ["Violência interpessoal e autoprovocada", "Ficha de notificação individual de violência interpessoal e autoprovocada.", "https://drive.google.com/uc?export=download&id=1wRT0Wkg9zwXpn0cxVKBdYEnJALLPPM5R"],
  ["Intoxicação exógena", "Ficha de investigação de intoxicação exógena.", "https://drive.google.com/uc?export=download&id=1tjQBIPHYvR6CJKZlbFFO5kCnJiPsSysm"],
  ["Todas as fichas", "Arquivo completo com todas as fichas de notificação e investigação disponíveis.", "https://drive.google.com/uc?export=download&id=1oTU7v-wt83NxiGfPSxTfl-FyE_rSU67A"],
];

export default function Downloads() {
  return <>
    <PageHero label="Documentos públicos" title="Downloads" intro="Acesse fichas de notificação e investigação utilizadas na vigilância em saúde. Esta página será atualizada sempre que novos materiais forem disponibilizados." />
    <section className="section wrap downloads-section">
      <div className="downloads-intro">
        <div><span className="eyebrow">Fichas disponíveis</span><h2>Documentos para baixar e preencher</h2></div>
        <p>Selecione o documento necessário e clique em “Baixar PDF”. Para orientação sobre o preenchimento ou a notificação, fale com a equipe do CEREST.</p>
      </div>
      <div className="download-grid">
        {files.map(([title, description, url]) => <article className="download-card" key={url}>
          <div className="file-badge" aria-hidden="true">PDF</div>
          <div><h3>{title}</h3><p>{description}</p></div>
          <a className="download-link" href={url} target="_blank" rel="noopener noreferrer">Baixar PDF <span aria-hidden="true">↓</span></a>
        </article>)}
      </div>
    </section>
    <ContactBand />
  </>;
}

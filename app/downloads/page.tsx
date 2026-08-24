import type { Metadata } from "next";
import { ContactBand, PageHero } from "../components";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Fichas de notificação e investigação em saúde do trabalhador disponíveis para download pelo CEREST Tianguá.",
};

const files = [
  ["Animais peçonhentos", "Ficha de investigação de acidentes por animais peçonhentos.", "animais-peconhentos.pdf"],
  ["Acidente de trabalho com exposição a material biológico", "Ficha de investigação para exposição ocupacional a material biológico.", "acidente-trabalho-material-biologico.pdf"],
  ["Acidente de trabalho grave", "Ficha de investigação de acidente de trabalho grave, fatal ou envolvendo crianças e adolescentes.", "acidente-trabalho-grave.pdf"],
  ["Câncer relacionado ao trabalho", "Ficha de investigação de câncer relacionado ao trabalho.", "cancer-relacionado-trabalho.pdf"],
  ["Dermatoses ocupacionais", "Ficha de investigação de dermatoses ocupacionais.", "dermatoses-ocupacionais.pdf"],
  ["LER/DORT", "Ficha de investigação de lesões por esforços repetitivos e distúrbios osteomusculares relacionados ao trabalho.", "ler-dort.pdf"],
  ["PAIR", "Ficha de investigação de perda auditiva induzida por ruído relacionada ao trabalho.", "pair.pdf"],
  ["Pneumoconioses", "Ficha de investigação de pneumoconioses relacionadas ao trabalho.", "pneumoconioses.pdf"],
  ["Transtornos mentais relacionados ao trabalho", "Ficha de investigação de transtornos mentais relacionados ao trabalho.", "transtornos-mentais-relacionados-trabalho.pdf"],
  ["Violência interpessoal e autoprovocada", "Ficha de notificação individual de violência interpessoal e autoprovocada.", "violencia-interpessoal-autoprovocada.pdf"],
  ["Intoxicação exógena", "Ficha de investigação de intoxicação exógena.", "intoxicacao-exogena.pdf"],
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
        {files.map(([title, description, filename]) => <article className="download-card" key={filename}>
          <div className="file-badge" aria-hidden="true">PDF</div>
          <div><h3>{title}</h3><p>{description}</p></div>
          <a className="download-link" href={`/downloads/${filename}`} download>Baixar PDF <span aria-hidden="true">↓</span></a>
        </article>)}
      </div>
    </section>
    <ContactBand />
  </>;
}
